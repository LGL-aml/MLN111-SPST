import { mutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import {
  SCENARIO_EFFECTS,
  RANDOM_EVENTS,
  RANDOM_EVENT_CHANCE,
  calculateNewStats,
} from "./gameData";

export const startGame = mutation({
  args: { roomId: v.id("rooms"), playerId: v.id("players") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId);
    if (!room) throw new Error("Phòng không tồn tại!");

    const player = await ctx.db.get(args.playerId);
    if (!player || !player.isHost)
      throw new Error("Chỉ chủ phòng mới có thể bắt đầu!");

    if (room.status !== "lobby")
      throw new Error("Trò chơi đã bắt đầu rồi!");

    // Don't start if there are no non-host players in the room.
    const players = await ctx.db
      .query("players")
      .withIndex("by_roomId", (q) => q.eq("roomId", args.roomId))
      .take(50);
    const hasAnyPlayer = players.some((p) => !p.isHost);
    if (!hasAnyPlayer) {
      throw new Error("Cần ít nhất 1 người chơi để bắt đầu!");
    }

    await ctx.db.patch(room._id, {
      status: "playing",
      currentRound: 1,
      phase: "choosing",
    });
  },
});

export const submitChoice = mutation({
  args: {
    playerId: v.id("players"),
    choice: v.union(v.literal("A"), v.literal("B")),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId);
    if (!player) throw new Error("Người chơi không tồn tại!");
    if (!player.isAlive) throw new Error("Bạn đã bị loại!");
    if (player.hasSubmitted) throw new Error("Bạn đã chọn rồi!");

    const room = await ctx.db.get(player.roomId);
    if (!room || room.status !== "playing" || room.phase !== "choosing") {
      throw new Error("Không thể chọn lúc này!");
    }

    await ctx.db.patch(args.playerId, {
      currentChoice: args.choice,
      hasSubmitted: true,
    });

    // Check if all alive players have now submitted
    const allPlayers = await ctx.db
      .query("players")
      .withIndex("by_roomId", (q) => q.eq("roomId", player.roomId))
      .take(50);

    const allSubmitted = allPlayers
      .filter((p) => p.isAlive && !p.isHost)
      .every((p) => p.hasSubmitted || p._id === args.playerId);

    if (allSubmitted) {
      await processRound(ctx, player.roomId);
    }
  },
});

async function processRound(ctx: MutationCtx, roomId: Id<"rooms">) {
  const room = await ctx.db.get(roomId);
  if (!room) return;

  const roundIndex = room.currentRound - 1;
  if (roundIndex < 0 || roundIndex >= SCENARIO_EFFECTS.length) return;

  const effects = SCENARIO_EFFECTS[roundIndex];

  // Re-read all players to get latest state (including last submitter's choice)
  const players = await ctx.db
    .query("players")
    .withIndex("by_roomId", (q) => q.eq("roomId", roomId))
    .take(50);

  // Apply choice effects to each alive player
  for (const player of players) {
    if (!player.isAlive || !player.currentChoice) continue;

    const choiceEffects =
      player.currentChoice === "A" ? effects.choiceA : effects.choiceB;

    const newStats = calculateNewStats(
      {
        money: player.money,
        alienation: player.alienation,
        freedom: player.freedom,
        inSurvivalCrisis: player.inSurvivalCrisis,
      },
      choiceEffects
    );

    await ctx.db.patch(player._id, {
      money: newStats.money,
      alienation: newStats.alienation,
      freedom: newStats.freedom,
      inSurvivalCrisis: newStats.inSurvivalCrisis,
      isAlive: newStats.isAlive,
    });
  }

  // Roll for random event (20% chance)
  let randomEventId: string | null = null;
  if (Math.random() < RANDOM_EVENT_CHANCE) {
    const event =
      RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
    randomEventId = event.id;

    // Re-read players after choice processing
    const updatedPlayers = await ctx.db
      .query("players")
      .withIndex("by_roomId", (q) => q.eq("roomId", roomId))
      .take(50);

    for (const p of updatedPlayers) {
      if (!p.isAlive) continue;

      const eventStats = calculateNewStats(
        {
          money: p.money,
          alienation: p.alienation,
          freedom: p.freedom,
          inSurvivalCrisis: p.inSurvivalCrisis,
        },
        event.effects
      );

      await ctx.db.patch(p._id, {
        money: eventStats.money,
        alienation: eventStats.alienation,
        freedom: eventStats.freedom,
        inSurvivalCrisis: eventStats.inSurvivalCrisis,
        isAlive: eventStats.isAlive,
      });
    }
  }

  // Check if any (non-host) players are still alive
  // NOTE: The host is a moderator and should not keep the game running.
  const finalPlayers = await ctx.db
    .query("players")
    .withIndex("by_roomId", (q) => q.eq("roomId", roomId))
    .take(50);
  const anyAlive = finalPlayers.some((p) => p.isAlive && !p.isHost);

  if (!anyAlive) {
    await ctx.db.patch(roomId, {
      status: "finished",
      phase: "results",
      randomEvent: randomEventId,
    });
    return;
  }

  await ctx.db.patch(roomId, {
    phase: "results",
    randomEvent: randomEventId,
  });
}

export const forceProcessRound = mutation({
  args: { roomId: v.id("rooms"), playerId: v.id("players") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId);
    if (!room) throw new Error("Phòng không tồn tại!");

    const player = await ctx.db.get(args.playerId);
    if (!player || !player.isHost)
      throw new Error("Chỉ chủ phòng mới có thể dùng chức năng này!");

    if (room.status !== "playing" || room.phase !== "choosing") {
      throw new Error("Không thể kết thúc vòng lúc này!");
    }

    const players = await ctx.db
      .query("players")
      .withIndex("by_roomId", (q) => q.eq("roomId", args.roomId))
      .take(50);

    for (const p of players) {
      if (p.isHost || !p.isAlive) continue;
      if (p.hasSubmitted) continue;

      const autoChoice = Math.random() < 0.5 ? "A" : "B";
      await ctx.db.patch(p._id, {
        currentChoice: autoChoice,
        hasSubmitted: true,
      });
    }

    await processRound(ctx, args.roomId);
  },
});

export const nextRound = mutation({
  args: { roomId: v.id("rooms"), playerId: v.id("players") },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId);
    if (!room) throw new Error("Phòng không tồn tại!");

    const player = await ctx.db.get(args.playerId);
    if (!player || !player.isHost)
      throw new Error("Chỉ chủ phòng mới có thể tiếp tục!");

    if (room.phase !== "results")
      throw new Error("Chưa đến lượt chuyển vòng!");

    // Reset all players' choices
    const players = await ctx.db
      .query("players")
      .withIndex("by_roomId", (q) => q.eq("roomId", args.roomId))
      .take(50);

    for (const p of players) {
      await ctx.db.patch(p._id, {
        currentChoice: null,
        hasSubmitted: false,
      });
    }

    // If all non-host players are dead, end the game immediately.
    // This prevents the host UI from getting stuck at (0/0) submissions.
    const anyAlive = players.some((p) => p.isAlive && !p.isHost);
    if (!anyAlive) {
      await ctx.db.patch(args.roomId, {
        status: "finished",
        phase: "results",
        randomEvent: null,
      });
      return;
    }

    if (room.currentRound >= 10) {
      await ctx.db.patch(args.roomId, {
        status: "finished",
        phase: "results",
        randomEvent: null,
      });
    } else {
      await ctx.db.patch(args.roomId, {
        currentRound: room.currentRound + 1,
        phase: "choosing",
        randomEvent: null,
      });
    }
  },
});
