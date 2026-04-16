import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    code: v.string(),
    status: v.union(
      v.literal("lobby"),
      v.literal("playing"),
      v.literal("finished")
    ),
    currentRound: v.number(),
    phase: v.union(v.literal("choosing"), v.literal("results")),
    randomEvent: v.union(v.string(), v.null()),
  }).index("by_code", ["code"]),

  players: defineTable({
    name: v.string(),
    roomId: v.id("rooms"),
    isHost: v.boolean(),
    money: v.number(),
    alienation: v.number(),
    freedom: v.number(),
    isAlive: v.boolean(),
    inSurvivalCrisis: v.boolean(),
    currentChoice: v.union(v.literal("A"), v.literal("B"), v.null()),
    hasSubmitted: v.boolean(),
  }).index("by_roomId", ["roomId"]),

  documents: defineTable({
    text: v.string(), // Nội dung đoạn lý thuyết
    embedding: v.array(v.float64()), // Vector biểu diễn ý nghĩa
  }).vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 768,
  }),

  quizQuestions: defineTable({
    questionId: v.number(),
    question: v.string(),
    options: v.array(v.string()),
    answer: v.string(), // "A", "B", "C", "D"
  }).index("by_questionId", ["questionId"]),
});
