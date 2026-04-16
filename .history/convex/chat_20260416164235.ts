import { v } from "convex/values";
import { action, query } from "./_generated/server";
import { api } from "./_generated/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Id } from "./_generated/dataModel";

// Khởi tạo SDK với API Key từ biến môi trường của Convex
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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
        // 1. Tạo embedding cho câu hỏi bằng Gemini
        // "embedding-001" is broadly available on the v1beta API used by @google/generative-ai.
        const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
        const embeddingResult = await embeddingModel.embedContent(args.message);
        const queryEmbedding = embeddingResult.embedding.values;

        // 2. Tìm kiếm nội dung liên quan trong Database Convex
        const results = await ctx.vectorSearch("documents", "by_embedding", {
            vector: queryEmbedding,
            limit: 3,
        });

        // 3. Rút trích text từ kết quả
        const contextDocs = await Promise.all(
            results.map(async (r) => {
                const doc = await ctx.runQuery(api.chat.getDoc, { id: r._id as Id<"documents"> });
                return doc?.text || "";
            })
        );
        const contextText = contextDocs.filter(Boolean).join("\n\n");

        // 4. Prompt có ngữ cảnh RAG
        const prompt = `Đồng chí là Lenin 2.0, một trợ lý AI thông thái về triết học Mác-Lậnin, đặc biệt là chủ đề "Tha hóa và giải phóng con người".

Hãy trả lời câu hỏi của người dùng DỰA VÀO NGỮ CẢNH DƯỚI ĐÂY.
Nếu ngữ cảnh không chứa đủ thông tin để trả lời, hãy trung thực đáp: "Rất tiếc đồng chí, tài liệu hiện tại tôi được huấn luyện chưa đề cập chi tiết đến vấn đề này." KHÔNG tự bịa thêm kiến thức ngoài.
Hãy trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu, có thể dùng emoji để sinh động hơn.

NGỮ CẢNH TỪ TÀI LIỆU:
${contextText || "(Chưa có ngữ cảnh phù hợp được tìm thấy)"}

CÂU HỎi CỦA NGƯỜI DÙNG:
${args.message}

TRẢ LỜI:`;

        // 5. Gọi Gemini Flash để tạo câu trả lời
        const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const response = await chatModel.generateContent(prompt);

        return response.response.text();
    },
});
