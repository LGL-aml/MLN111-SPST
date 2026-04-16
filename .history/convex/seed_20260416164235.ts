import { action, mutation } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { knowledgeChunks } from "./knowledgeBase";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Mutation hỗ trợ: lưu một document vào database
export const insertDoc = mutation({
    args: { text: v.string(), embedding: v.array(v.float64()) },
    handler: async (ctx, args) => {
        return await ctx.db.insert("documents", {
            text: args.text,
            embedding: args.embedding,
        });
    },
});

// Action chính: đọc từng chunk, tạo embedding, lưu vào DB
export const populateData = action({
    handler: async (ctx) => {
        // "embedding-001" is broadly available on the v1beta API used by @google/generative-ai.
        // ("text-embedding-004" can 404 depending on API version / availability.)
        const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });

        for (const text of knowledgeChunks) {

            const embeddingResult = await embeddingModel.embedContent(text);

            const embedding = embeddingResult.embedding.values;

            await ctx.runMutation(api.seed.insertDoc, { text, embedding });
        }

        return `Đã nạp thành công ${knowledgeChunks.length} chunks dữ liệu!`;
    },
});
