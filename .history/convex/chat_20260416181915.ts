import { v } from "convex/values";
import { action, query } from "./_generated/server";
import { api } from "./_generated/api";
import { GoogleGenAI } from "@google/genai";
import type { Id } from "./_generated/dataModel";

function normalizeEmbedding(values: number[]): number[] {
  let sumSq = 0;
  for (const x of values) sumSq += x * x;
  const norm = Math.sqrt(sumSq);
  if (!Number.isFinite(norm) || norm === 0) return values;
  return values.map((x) => x / norm);
}

async function extractTextFromGenerateContentResponse(res: unknown): Promise<string> {
  const anyRes = res as any;
  // Some SDK versions expose a string property `text`, others expose an async method.
  if (typeof anyRes?.text === "function") {
    const t = await anyRes.text();
    return typeof t === "string" ? t : "";
  }
  if (typeof anyRes?.text === "string") return anyRes.text;
  return "";
}

// Query hỗ trợ: lấy document theo ID sau bước vector search
export const getDoc = query({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const answer = action({
  args: { message: v.string() },
  handler: async (ctx, args) => {
    if (!process.env.GEMINI_API_KEY) {
      return "⚠️ Chưa cấu hình GEMINI_API_KEY cho backend Convex. Hãy đặt biến môi trường GEMINI_API_KEY trong Convex Dashboard (hoặc dùng `npx convex env set GEMINI_API_KEY ...`) rồi thử lại.";
    }

    // Khởi tạo SDK với API Key từ biến môi trường của Convex.
    // Lưu ý: Model generation khả dụng phụ thuộc API key + API version.
    // Với key hiện tại, `gemini-1.5-flash` không khả dụng; dùng `gemini-2.0-flash` (v1beta) thay thế.
    const embedAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, apiVersion: "v1beta" });
    const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, apiVersion: "v1beta" });

    try {
      // 1) Tạo embedding cho câu hỏi (phải khớp model + dim với dữ liệu đã seed)
      const embeddingResult = await embedAi.models.embedContent({
        model: "gemini-embedding-001",
        contents: args.message,
        config: {
          outputDimensionality: 768,
          taskType: "RETRIEVAL_QUERY",
        },
      });

      const values = embeddingResult.embeddings?.[0]?.values;
      if (!values) {
        throw new Error("Embedding API did not return embedding values");
      }
      const queryEmbedding = normalizeEmbedding(values);

      // 2) Tìm kiếm nội dung liên quan trong Database Convex
      const results = await ctx.vectorSearch("documents", "by_embedding", {
        vector: queryEmbedding,
        limit: 3,
      });

      // 3) Rút trích text từ kết quả
      const contextDocs = await Promise.all(
        results.map(async (r) => {
          const doc = await ctx.runQuery(api.chat.getDoc, { id: r._id as Id<"documents"> });
          return doc?.text || "";
        }),
      );
      const contextText = contextDocs.filter(Boolean).join("\n\n");

      // 4) Prompt có ngữ cảnh RAG
      const prompt = `Đồng chí là Lenin 2.0, một trợ lý AI thông thái về triết học Mác–Lênin, đặc biệt là chủ đề "Tha hóa và giải phóng con người".

      PHẠM VI KIẾN THỨC:

Bạn được phép trả lời các câu hỏi thuộc triết học Mác–Lênin (ví dụ: tha hóa, lực lượng sản xuất, quan hệ sản xuất, lượng – chất, phủ định biện chứng,...).
Đặc biệt, bạn có dữ liệu chi tiết về chủ đề: “Hiện tượng tha hóa con người và vấn đề giải phóng con người”.

QUY TẮC TRẢ LỜI:

1. Nếu câu hỏi thuộc chủ đề:

“Hiện tượng tha hóa con người và giải phóng con người”

BẮT BUỘC chỉ trả lời dựa trên NGỮ CẢNH (CONTEXT) được cung cấp
KHÔNG được thêm kiến thức bên ngoài
Nếu context không đủ → trả lời:
"Rất tiếc đồng chí, tài liệu hiện tại tôi được huấn luyện chưa đề cập chi tiết đến vấn đề này."
Nếu ngữ cảnh không chứa đủ thông tin để trả lời, hãy trung thực đáp: "Rất tiếc đồng chí, tài liệu hiện tại tôi được huấn luyện chưa đề cập chi tiết đến vấn đề này." KHÔNG tự bịa thêm kiến thức ngoài.
Hãy trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu.

NGỮ CẢNH TỪ TÀI LIỆU:
${contextText || "(Chưa có ngữ cảnh phù hợp được tìm thấy)"}

CÂU HỎI CỦA NGƯỜI DÙNG:
${args.message}

TRẢ LỜI:`;

      // 5) Gọi Gemini để tạo câu trả lời
      const response = await genAi.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const text = (await extractTextFromGenerateContentResponse(response)).trim();
      if (!text) {
        return "Rất tiếc đồng chí, hiện tôi chưa tạo được câu trả lời phù hợp. Đồng chí thử hỏi lại ngắn gọn hơn nhé.";
      }
      return text;
    } catch (err) {
      console.error("chat.answer failed", err);

      const anyErr = err as any;
      const status: number | undefined =
        typeof anyErr?.status === "number" ? anyErr.status :
        typeof anyErr?.error?.code === "number" ? anyErr.error.code :
        undefined;

      // Quota / rate limit
      if (status === 429 || anyErr?.error?.status === "RESOURCE_EXHAUSTED") {
        return (
          "⚠️ Đồng chí đang bị giới hạn quota (Google Gemini API). " +
          "API key hiện tại có thể chưa bật billing / chưa có hạn mức Free Tier. " +
          "Hãy kiểm tra mục Quotas/Rate limit trong Google AI Studio, hoặc đổi API key / bật thanh toán rồi thử lại."
        );
      }

      // Model not available
      if (status === 404 || anyErr?.error?.status === "NOT_FOUND") {
        return (
          "⚠️ Model Gemini đang cấu hình không khả dụng với API key/API version hiện tại. " +
          "Đồng chí thử lại sau, hoặc đổi model/API key (có thể cần bật quyền truy cập model trong AI Studio)."
        );
      }

      return "❌ Rất tiếc đồng chí, hiện tôi gặp lỗi khi kết nối tới dịch vụ AI. Đồng chí thử lại sau ít phút.";
    }
  },
});
