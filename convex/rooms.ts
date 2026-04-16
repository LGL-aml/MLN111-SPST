import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { hostName: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    if (args.password !== "Admin@123") {
      throw new Error("Mật khẩu không chính xác!");
    }
    // Generate unique 5-digit room code
    let code: string;
    let existing;
    do {
      code = String(Math.floor(10000 + Math.random() * 90000));
      existing = await ctx.db
        .query("rooms")
        .withIndex("by_code", (q) => q.eq("code", code))
        .unique();
    } while (existing);

    const roomId = await ctx.db.insert("rooms", {
      code,
      status: "lobby",
      currentRound: 0,
      phase: "choosing",
      randomEvent: null,
    });

    const playerId = await ctx.db.insert("players", {
      name: args.hostName,
      roomId,
      isHost: true,
      money: 20,
      alienation: 20,
      freedom: 20,
      isAlive: true,
      inSurvivalCrisis: false,
      currentChoice: null,
      hasSubmitted: false,
    });

    return { roomId, playerId, code };
  },
});

export const join = mutation({
  args: { code: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .unique();

    if (!room) throw new Error("Không tìm thấy phòng với mã này!");
    if (room.status !== "lobby")
      throw new Error("Trò chơi đã bắt đầu, không thể tham gia!");

    const playerId = await ctx.db.insert("players", {
      name: args.name,
      roomId: room._id,
      isHost: false,
      money: 20,
      alienation: 20,
      freedom: 20,
      isAlive: true,
      inSurvivalCrisis: false,
      currentChoice: null,
      hasSubmitted: false,
    });

    return { roomId: room._id, playerId };
  },
});

export const get = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.roomId);
  },
});

export const getPlayers = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("players")
      .withIndex("by_roomId", (q) => q.eq("roomId", args.roomId))
      .take(50);
  },
});

export const getPlayer = query({
  args: { playerId: v.id("players") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.playerId);
  },
});

export const leave = mutation({
  args: { playerId: v.id("players") },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId);
    if (!player) return;

    const room = await ctx.db.get(player.roomId);

    // Host leaves: end/close the room depending on phase.
    if (player.isHost) {
      if (room) {
        if (room.status === "lobby") {
          const allPlayers = await ctx.db
            .query("players")
            .withIndex("by_roomId", (q) => q.eq("roomId", player.roomId))
            .take(200);
          for (const p of allPlayers) {
            await ctx.db.delete(p._id);
          }
          await ctx.db.delete(room._id);
          return;
        }

        // If the game already started, finish it so remaining players aren't stuck.
        await ctx.db.patch(room._id, {
          status: "finished",
          phase: "results",
          randomEvent: null,
        });
      }

      await ctx.db.delete(player._id);
      return;
    }

    // Non-host leaves:
    // - In lobby: remove them from the waiting list.
    // - In playing/finished: mark as eliminated so they don't block submissions.
    if (!room || room.status === "lobby") {
      await ctx.db.delete(player._id);
      return;
    }

    await ctx.db.patch(player._id, {
      isAlive: false,
      hasSubmitted: true,
      currentChoice: null,
    });
  },
});
