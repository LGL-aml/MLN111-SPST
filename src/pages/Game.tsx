import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id, Doc } from "../../convex/_generated/dataModel";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  MonitorPlay,
  Users,
  LogIn,
  ScrollText,
  X,
  Trophy,
  Lightbulb,
  PlusCircle,
  Crown,
  Skull,
  Award,
  AlertTriangle,
  Zap,
  Copy,
  Check,
  RotateCcw,
  LogOut,
  ChevronRight,
  Brain,
} from "lucide-react";
import {
  SCENARIOS,
  RANDOM_EVENTS_DISPLAY,
} from "../gameData";
import { checkWinCondition, calculateScore } from "../../convex/gameData";

// ============================================================
// STAT BAR COMPONENT
// ============================================================
function StatBar({
  label,
  value,
  maxValue,
  color,
  bgColor,
  icon,
  danger,
}: {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  bgColor: string;
  icon: string;
  danger?: boolean;
}) {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="font-bold text-on-surface flex items-center gap-1.5">
          <span className="text-base">{icon}</span> {label}
        </span>
        <motion.span
          key={value}
          initial={{ scale: 1.4, color: danger ? "#ef4444" : undefined }}
          animate={{ scale: 1, color: undefined }}
          className={`font-mono font-bold text-base ${danger ? "text-red-500 animate-pulse" : "text-on-surface"}`}
        >
          {value}
        </motion.span>
      </div>
      <div className={`h-3 ${bgColor} rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full ${color}`}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ============================================================
// PLAYER STATS PANEL
// ============================================================
function PlayerStatsPanel({ player }: { player: Doc<"players"> }) {
  return (
    <div className="space-y-3">
      <StatBar
        label="Tiền"
        value={player.money}
        maxValue={100}
        color={player.money < 10 ? "bg-red-500" : "bg-amber-400"}
        bgColor="bg-amber-500/10"
        icon="💰"
        danger={player.money < 10}
      />
      <StatBar
        label="Tha hóa"
        value={player.alienation}
        maxValue={100}
        color={player.alienation > 70 ? "bg-red-500" : "bg-slate-500"}
        bgColor="bg-slate-500/10"
        icon="⚙️"
        danger={player.alienation > 70}
      />
      <StatBar
        label="Tự do"
        value={player.freedom}
        maxValue={100}
        color="bg-emerald-500"
        bgColor="bg-emerald-500/10"
        icon="🕊️"
      />
      {player.inSurvivalCrisis && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg text-xs font-bold"
        >
          <AlertTriangle className="w-4 h-4" /> KHỦNG HOẢNG SINH TỒN
        </motion.div>
      )}
      {!player.isAlive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg text-sm font-bold"
        >
          <Skull className="w-4 h-4" /> ĐÃ BỊ LOẠI
        </motion.div>
      )}
    </div>
  );
}

// ============================================================
// RULES MODAL
// ============================================================
function RulesModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
            className="bg-surface rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-outline-variant"
          >
            <div className="bg-surface border-b border-outline-variant p-5 md:p-6 text-on-surface flex justify-between items-center shrink-0">
              <h2 className="text-xl md:text-2xl font-headline font-bold flex items-center gap-3 uppercase tracking-tight text-primary">
                <ScrollText className="w-6 h-6 md:w-7 md:h-7" /> Luật Chơi:
                Hành Trình Giải Phóng
              </h2>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-on-surface-variant custom-scrollbar">
              <div className="bg-primary/5 border-l-4 border-primary p-5 rounded-r-xl">
                <p className="text-on-surface leading-relaxed italic text-lg font-medium">
                  "Chào mừng bạn đến với mô phỏng xã hội hiện đại. Ở đây, bạn
                  không chỉ phải đấu tranh để sinh tồn mà còn phải giữ lấy bản
                  chất con người của mình trước guồng quay khắc nghiệt của nền
                  sản xuất."
                </p>
              </div>

              <section>
                <h3 className="font-bold text-xl md:text-2xl text-on-surface flex items-center gap-3 mb-6">
                  <span className="bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0">
                    1
                  </span>
                  Ba Chỉ Số Quyết Định Số Phận
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-surface p-6 rounded-2xl border border-amber-500/30 shadow-sm flex flex-col">
                    <div className="text-3xl mb-3">💰</div>
                    <h4 className="font-bold text-on-surface text-lg mb-2">
                      Tiền (Sinh tồn)
                    </h4>
                    <p className="text-base text-on-surface-variant mb-4 leading-relaxed">
                      Đại diện cho vật chất để duy trì sự sống cơ bản.
                    </p>
                    <div className="p-2 bg-red-500/10 text-red-500 dark:text-red-400 text-sm font-bold rounded-lg border border-red-500/20 uppercase text-center mt-auto">
                      Tiền = 0 → Game Over
                    </div>
                  </div>
                  <div className="bg-surface p-6 rounded-2xl border border-slate-500/30 shadow-sm flex flex-col">
                    <div className="text-3xl mb-3">⚙️</div>
                    <h4 className="font-bold text-on-surface text-lg mb-2">
                      Tha hóa
                    </h4>
                    <p className="text-base text-on-surface-variant mb-4 leading-relaxed">
                      Mức độ bị biến thành "công cụ" lao động.
                    </p>
                    <div className="p-2 bg-slate-500/10 text-slate-600 dark:text-slate-400 text-sm font-bold rounded-lg border border-slate-500/20 text-center mt-auto">
                      Tha hóa cao → Tự do giảm nhanh
                    </div>
                  </div>
                  <div className="bg-surface p-6 rounded-2xl border border-emerald-500/30 shadow-sm flex flex-col">
                    <div className="text-3xl mb-3">🕊️</div>
                    <h4 className="font-bold text-on-surface text-lg mb-2">
                      Tự do
                    </h4>
                    <p className="text-base text-on-surface-variant leading-relaxed mb-4">
                      Khả năng làm chủ bản thân và sức lao động.
                    </p>
                    <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold rounded-lg border border-emerald-500/20 text-center mt-auto">
                      Chỉ tăng khi Tiền {">"} 30
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-bold text-xl md:text-2xl text-on-surface flex items-center gap-3 mb-4">
                  <span className="bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0">
                    2
                  </span>
                  Cơ Chế Đặc Biệt
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <h4 className="font-bold text-on-surface mb-1">
                      🪤 Bẫy Sinh Tồn
                    </h4>
                    <p className="text-on-surface-variant">
                      Khi Tiền {"<"} 10: Khủng hoảng sinh tồn — mọi tăng Tự do
                      giảm 50%. Khi Tiền = 0: Game Over.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-500/5 border border-slate-500/20">
                    <h4 className="font-bold text-on-surface mb-1">
                      ⚙️ Cơ Chế Tha Hóa
                    </h4>
                    <p className="text-on-surface-variant">
                      Tha hóa càng cao → kiếm Tiền dễ hơn nhưng Tự do mất
                      nhanh hơn.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <h4 className="font-bold text-on-surface mb-1">
                      🕊️ Điều Kiện Tự Do
                    </h4>
                    <p className="text-on-surface-variant">
                      Tự do chỉ có thể tăng khi Tiền {">"} 30 — cần có nền
                      tảng vật chất trước.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                    <h4 className="font-bold text-on-surface mb-1">
                      🎲 Sự Kiện Ngẫu Nhiên
                    </h4>
                    <p className="text-on-surface-variant">
                      20% cơ hội xảy ra giữa các lượt: Bệnh tật (Tiền -15)
                      hoặc Hỏng thiết bị (Tiền -10).
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-bold text-xl md:text-2xl text-on-surface flex items-center gap-3 mb-4">
                  <span className="bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0">
                    3
                  </span>
                  Điều Kiện Chiến Thắng
                </h3>
                <p className="mb-5 text-on-surface-variant text-lg leading-relaxed">
                  Vượt qua <strong className="text-on-surface">5 tình huống</strong> và đạt trạng thái:
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-5 py-2.5 rounded-full font-bold shadow-sm">
                    🕊️ Tự do {">"} 70
                  </span>
                  <span className="bg-slate-500/10 border border-slate-500/20 text-slate-600 dark:text-slate-400 px-5 py-2.5 rounded-full font-bold shadow-sm">
                    ⚙️ Tha hóa {"<"} 30
                  </span>
                  <span className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-5 py-2.5 rounded-full font-bold shadow-sm">
                    💰 Tiền {">"} 20
                  </span>
                </div>
              </section>

              <section className="bg-surface-variant/30 p-6 md:p-8 rounded-3xl border border-outline-variant">
                <h3 className="font-bold text-xl md:text-2xl text-primary flex items-center gap-3 mb-5">
                  <Trophy className="w-7 h-7" /> Công Thức Tính Điểm
                </h3>
                <div className="bg-surface text-center py-6 rounded-2xl border-2 border-primary/20 font-mono text-2xl md:text-3xl font-bold text-on-surface mb-6 shadow-sm tracking-tight">
                  (Tự do × 10) - (Tha hóa × 5) + Tiền
                </div>
                <p className="text-sm text-outline italic">
                  * Nếu bằng điểm, người có chỉ số Tự do cao hơn sẽ được ưu tiên.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-xl md:text-2xl text-on-surface flex items-center gap-3 mb-6">
                  <Lightbulb className="w-7 h-7 text-amber-500" /> Mẹo Tư Duy
                  Biện Chứng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl border-l-[5px] border-primary bg-surface shadow-sm border border-outline-variant">
                    <h4 className="font-bold text-lg mb-2 text-on-surface">
                      Đừng mù quáng
                    </h4>
                    <p className="text-base text-on-surface-variant leading-relaxed">
                      Không phải lúc nào chọn "Tự do" ngay từ đầu cũng tốt. Bạn
                      cần Tiền để làm vốn sinh tồn.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl border-l-[5px] border-primary bg-surface shadow-sm border border-outline-variant">
                    <h4 className="font-bold text-lg mb-2 text-on-surface">
                      Chấp nhận đánh đổi
                    </h4>
                    <p className="text-base text-on-surface-variant leading-relaxed">
                      Đôi khi phải chịu "tha hóa" để tích lũy tư bản, rồi dùng
                      chính nó giành lại quyền tự quyết.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-outline-variant bg-surface-variant/30 flex justify-end shrink-0">
              <button
                onClick={onClose}
                className="bg-primary text-on-primary px-10 py-3 md:py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg shadow-primary/20"
              >
                Đã Hiểu, Sẵn Sàng!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// LOBBY VIEW
// ============================================================
function LobbyView({
  onCreateRoom,
  onJoinRoom,
  error,
  loading,
}: {
  onCreateRoom: (name: string, password?: string) => void;
  onJoinRoom: (code: string, name: string) => void;
  error: string | null;
  loading: boolean;
}) {
  const [hostName, setHostName] = useState("");
  const [hostPassword, setHostPassword] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [joinName, setJoinName] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, bounce: 0.3 },
    },
  };
  const itemFadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, bounce: 0.2 },
    },
  };
  const itemFadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, bounce: 0.2 },
    },
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl w-full px-4 flex-grow flex flex-col justify-center pb-12"
    >
      <motion.div variants={itemFadeUp} className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-5 tracking-tight">
          Hành Trình{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
            className="text-primary italic inline-block"
          >
            Giải Phóng
          </motion.span>
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Mô phỏng xã hội hiện đại. Trải nghiệm sự tha hóa và tìm kiếm con
          đường tự do của chính bạn.
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto mb-6 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 px-5 py-3 rounded-xl text-center font-medium"
        >
          {error}
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {/* Host card */}
        <motion.div
          variants={itemFadeLeft}
          className="group bg-surface rounded-3xl p-8 lg:p-10 shadow-sm border border-outline-variant w-full md:w-1/2 flex flex-col items-center text-center hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-lg"
        >
          <div className="bg-primary/10 p-5 rounded-full mb-6 text-primary group-hover:scale-110 transition-transform">
            <MonitorPlay className="w-10 h-10" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-on-surface">
            Bạn là Quản Trò?
          </h2>
          <p className="text-on-surface-variant mb-8 text-base leading-relaxed">
            Tạo phòng chơi mới, hiển thị câu hỏi và điều khiển nhịp độ trò
            chơi trên màn hình lớn.
          </p>
          <div className="mt-auto w-full space-y-4">
            <input
              type="text"
              autoComplete="off"
              placeholder="Tên của bạn"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              className="w-full bg-surface-variant/30 border border-outline-variant text-on-surface py-4 px-6 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all text-center text-lg placeholder:text-outline"
            />
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Mật khẩu tạo phòng"
              value={hostPassword}
              onChange={(e) => setHostPassword(e.target.value)}
              className="w-full bg-surface-variant/30 border border-outline-variant text-on-surface py-4 px-6 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all text-center text-lg placeholder:text-outline"
            />
            <button
              onClick={() => hostName.trim() && hostPassword.trim() && onCreateRoom(hostName.trim(), hostPassword)}
              disabled={!hostName.trim() || !hostPassword.trim() || loading}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors flex justify-center items-center gap-3 shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusCircle className="w-6 h-6" />
              {loading ? "Đang tạo..." : "Tạo Phòng Mới"}
            </button>
          </div>
        </motion.div>

        {/* Player card */}
        <motion.div
          variants={itemFadeRight}
          className="group bg-surface rounded-3xl p-8 lg:p-10 shadow-sm border border-outline-variant w-full md:w-1/2 flex flex-col items-center text-center hover:border-amber-500/50 transition-all hover:-translate-y-2 hover:shadow-lg"
        >
          <div className="bg-amber-500/10 p-5 rounded-full mb-6 text-amber-500 group-hover:scale-110 transition-transform">
            <Users className="w-10 h-10" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-on-surface">
            Bạn là Người Chơi?
          </h2>
          <p className="text-on-surface-variant mb-8 text-base leading-relaxed">
            Nhập mã phòng từ màn hình của quản trò để tham gia vào hành trình
            giải phóng.
          </p>
          <div className="w-full flex flex-col gap-4 mt-auto">
            <input
              type="text"
              placeholder="Nhập mã phòng"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
              className="w-full bg-surface-variant/30 border border-outline-variant text-on-surface py-4 px-6 rounded-xl font-bold text-center text-xl tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-base placeholder:tracking-normal placeholder:font-normal placeholder:normal-case placeholder:text-outline"
            />
            <input
              type="text"
              autoComplete="off"
              placeholder="Nhập tên của bạn"
              value={joinName}
              onChange={(e) => setJoinName(e.target.value)}
              className="w-full bg-surface-variant/30 border border-outline-variant text-on-surface py-4 px-6 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-center text-lg placeholder:text-outline"
            />
            <button
              onClick={() =>
                joinCode.trim() &&
                joinName.trim() &&
                onJoinRoom(joinCode.trim(), joinName.trim())
              }
              disabled={!joinCode.trim() || !joinName.trim() || loading}
              className="w-full bg-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition-colors flex justify-center items-center gap-3 shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="w-6 h-6" />
              {loading ? "Đang tham gia..." : "Tham Gia Ngay"}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}

// ============================================================
// WAITING ROOM VIEW
// ============================================================
function WaitingRoom({
  room,
  players,
  isHost,
  onStart,
  onLeave,
}: {
  room: Doc<"rooms">;
  players: Doc<"players">[];
  isHost: boolean;
  onStart: () => void;
  onLeave: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(room.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl w-full px-4 mx-auto"
    >
      <div className="bg-surface rounded-3xl p-8 shadow-sm border border-outline-variant">
        <div className="text-center mb-8">
          <h2 className="font-headline text-3xl font-bold text-on-surface mb-3">
            Phòng Chờ
          </h2>
          <p className="text-on-surface-variant">
            Chia sẻ mã phòng để mời bạn bè tham gia
          </p>
        </div>

        {/* Room Code */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="bg-primary/5 border-2 border-primary/30 rounded-2xl px-8 py-4">
            <span className="font-mono text-4xl font-bold text-primary tracking-[0.3em]">
              {room.code}
            </span>
          </div>
          <button
            onClick={copyCode}
            className="p-3 rounded-xl bg-surface-variant/50 hover:bg-surface-variant transition-colors text-on-surface-variant"
          >
            {copied ? (
              <Check className="w-6 h-6 text-emerald-500" />
            ) : (
              <Copy className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Player List */}
        <div className="mb-8">
          <h3 className="text-sm uppercase tracking-widest text-on-surface-variant font-bold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" /> Người chơi ({players.length})
          </h3>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {players.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-surface-variant/30 border border-outline-variant/50 px-5 py-3 rounded-xl"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      p.isHost
                        ? "bg-primary text-on-primary"
                        : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-on-surface flex-1">
                    {p.name}
                  </span>
                  {p.isHost && (
                    <span className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      <Crown className="w-3.5 h-3.5" /> Chủ phòng
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {isHost ? (
            <button
              onClick={onStart}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors flex justify-center items-center gap-3 shadow-lg shadow-primary/20 active:scale-95"
            >
              <Zap className="w-6 h-6" /> Bắt Đầu Trò Chơi
            </button>
          ) : (
            <div className="text-center py-4 text-on-surface-variant">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center justify-center gap-2 text-lg"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Đang chờ chủ phòng bắt đầu...
              </motion.div>
            </div>
          )}
          <button
            onClick={onLeave}
            className="w-full py-3 rounded-xl font-medium text-on-surface-variant hover:text-red-500 hover:bg-red-500/5 transition-colors flex justify-center items-center gap-2 border border-outline-variant/50"
          >
            <LogOut className="w-5 h-5" /> Rời phòng
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// GAMEPLAY VIEW (CHOOSING PHASE)
// ============================================================
function GameplayView({
  room,
  currentPlayer,
  players,
  onChoice,
}: {
  room: Doc<"rooms">;
  currentPlayer: Doc<"players">;
  players: Doc<"players">[];
  onChoice: (choice: "A" | "B") => void;
}) {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const scenario = SCENARIOS[room.currentRound - 1];
  if (!scenario) return null;

  const alivePlayers = players.filter((p) => p.isAlive && !p.isHost);
  const submittedCount = alivePlayers.filter((p) => p.hasSubmitted).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl w-full px-4 mx-auto"
    >
      {/* Round indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((r) => (
            <div
              key={r}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                r === room.currentRound
                  ? "bg-primary text-on-primary scale-110 shadow-lg shadow-primary/30"
                  : r < room.currentRound
                    ? "bg-primary/20 text-primary"
                    : "bg-surface-variant/50 text-outline"
              }`}
            >
              {r}
            </div>
          ))}
        </div>
        <div className="text-sm text-on-surface-variant font-medium">
          {submittedCount}/{alivePlayers.length} đã chọn
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Card (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            key={room.currentRound}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-surface rounded-3xl p-8 shadow-sm border border-outline-variant"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Tình huống {room.currentRound}/5
              </span>
            </div>
            <h3 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-4">
              {scenario.title}
            </h3>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-4">
              {scenario.description}
            </p>
            <p className="text-on-surface-variant/70 text-sm italic border-t border-outline-variant/50 pt-4">
              {scenario.context}
            </p>
          </motion.div>

          {/* Choices */}
          {currentPlayer.isHost ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-surface rounded-2xl p-8 border border-primary/30 text-center"
            >
              <Crown className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="text-primary text-lg font-medium">
                Bạn là Quản Trò
              </p>
              <p className="text-on-surface-variant text-sm mt-2">
                Đang chờ người chơi lựa chọn... ({submittedCount}/{alivePlayers.length})
              </p>
            </motion.div>
          ) : currentPlayer.isAlive && !currentPlayer.hasSubmitted ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChoice("A")}
                className="bg-surface rounded-2xl p-6 shadow-sm border-2 border-outline-variant hover:border-amber-500 transition-all text-left group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">
                    A
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                    Lựa chọn A
                  </span>
                </div>
                <p className="text-on-surface font-medium text-lg leading-relaxed mb-3">
                  {scenario.choiceA.text}
                </p>
                <p className="text-sm text-on-surface-variant/80 font-mono bg-surface-variant/30 px-3 py-1.5 rounded-lg">
                  {scenario.choiceA.hint}
                </p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChoice("B")}
                className="bg-surface rounded-2xl p-6 shadow-sm border-2 border-outline-variant hover:border-emerald-500 transition-all text-left group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">
                    B
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                    Lựa chọn B
                  </span>
                </div>
                <p className="text-on-surface font-medium text-lg leading-relaxed mb-3">
                  {scenario.choiceB.text}
                </p>
                <p className="text-sm text-on-surface-variant/80 font-mono bg-surface-variant/30 px-3 py-1.5 rounded-lg">
                  {scenario.choiceB.hint}
                </p>
              </motion.button>
            </div>
          ) : currentPlayer.isAlive ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-surface rounded-2xl p-8 border border-primary/30 text-center"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-primary text-lg font-medium"
              >
                Bạn đã chọn {currentPlayer.currentChoice}. Đang chờ người chơi
                khác...
              </motion.div>
              <p className="text-on-surface-variant text-sm mt-2">
                {submittedCount}/{alivePlayers.length} người đã chọn
              </p>
            </motion.div>
          ) : (
            <div className="bg-red-500/5 rounded-2xl p-8 border border-red-500/20 text-center">
              <Skull className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 dark:text-red-400 text-lg font-bold">
                Bạn đã bị loại khỏi trò chơi
              </p>
            </div>
          )}

          {/* Philosophy button */}
          <button
            onClick={() => setShowPhilosophy(!showPhilosophy)}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
          >
            <Brain className="w-4 h-4" />
            {showPhilosophy ? "Ẩn giải thích" : "Giải thích triết học"}
          </button>
          <AnimatePresence>
            {showPhilosophy && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-primary/5 border-l-4 border-primary p-5 rounded-r-xl">
                  <p className="text-on-surface italic leading-relaxed">
                    {scenario.philosophicalNote}
                  </p>
                  <div className="mt-3 text-sm text-on-surface-variant space-y-1">
                    <p>
                      <strong>Lựa chọn A</strong> đại diện cho sự thỏa hiệp với
                      hệ thống — ưu tiên sinh tồn vật chất nhưng đánh đổi bằng
                      sự tha hóa sâu hơn.
                    </p>
                    <p>
                      <strong>Lựa chọn B</strong> đại diện cho con đường giải
                      phóng — chấp nhận rủi ro vật chất để giành lại quyền tự
                      quyết và nhân phẩm.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Side Panel: Stats */}
        <div className="space-y-6">
          {!currentPlayer.isHost && (
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant">
              <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> Chỉ số của bạn
              </h3>
              <PlayerStatsPanel player={currentPlayer} />
            </div>
          )}

          {/* Other players */}
          <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant">
            <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" /> Người chơi
            </h3>
            <div className="space-y-2">
              {players.filter(p => !p.isHost).map((p) => (
                <div
                  key={p._id}
                  className={`flex items-center gap-2 text-sm py-1.5 ${!p.isAlive ? "opacity-40" : ""}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      p.isHost
                        ? "bg-primary text-on-primary"
                        : "bg-surface-variant text-on-surface-variant"
                    }`}
                  >
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-on-surface font-medium flex-1 truncate">
                    {p.name}
                  </span>
                  {p.hasSubmitted ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : !p.isAlive ? (
                    <Skull className="w-4 h-4 text-red-500" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-outline animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// ROUND RESULTS VIEW
// ============================================================
function RoundResultsView({
  room,
  players,
  currentPlayer,
  isHost,
  onNextRound,
}: {
  room: Doc<"rooms">;
  players: Doc<"players">[];
  currentPlayer: Doc<"players">;
  isHost: boolean;
  onNextRound: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(room.currentRound === 5 ? 8 : 5);

  useEffect(() => {
    if (isHost) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        onNextRound();
      }
    }
  }, [isHost, timeLeft, onNextRound]);

  const randomEvent = room.randomEvent
    ? RANDOM_EVENTS_DISPLAY[room.randomEvent]
    : null;

  const sortedPlayers = [...players]
    .filter((p) => !p.isHost)
    .sort((a, b) => {
      const scoreA = calculateScore(a);
      const scoreB = calculateScore(b);
      if (scoreB !== scoreA) return scoreB - scoreA;
      return b.freedom - a.freedom;
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl w-full px-4 mx-auto space-y-6"
    >
      <div className="text-center mb-4">
        <h2 className="font-headline text-3xl font-bold text-on-surface">
          Kết quả Vòng {room.currentRound}
        </h2>
      </div>

      {/* Random Event */}
      {randomEvent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/5 border border-red-500/30 rounded-2xl p-6 text-center"
        >
          <div className="text-4xl mb-3">{randomEvent.icon}</div>
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
            Sự kiện ngẫu nhiên: {randomEvent.name}
          </h3>
          <p className="text-on-surface-variant">{randomEvent.description}</p>
        </motion.div>
      )}

      {/* Your stats */}
      {!currentPlayer.isHost && (
        <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant">
          <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" /> Chỉ số hiện tại
          </h3>
          <PlayerStatsPanel player={currentPlayer} />
          <div className="mt-4 pt-4 border-t border-outline-variant/50 text-center">
            <span className="text-sm text-on-surface-variant">Điểm giải phóng: </span>
            <span className="font-mono font-bold text-xl text-primary">
              {calculateScore(currentPlayer)}
            </span>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant">
        <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" /> Bảng Xếp Hạng
        </h3>
        <div className="space-y-2">
          {sortedPlayers.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                p._id === currentPlayer._id
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-surface-variant/20"
              } ${!p.isAlive ? "opacity-40" : ""}`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  i === 0
                    ? "bg-amber-400 text-amber-900"
                    : i === 1
                      ? "bg-gray-300 text-gray-700"
                      : i === 2
                        ? "bg-amber-700 text-amber-100"
                        : "bg-surface-variant text-on-surface-variant"
                }`}
              >
                {i + 1}
              </span>
              <span className="font-bold text-on-surface flex-1">{p.name}</span>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-amber-500">💰{p.money}</span>
                <span className="text-slate-500">⚙️{p.alienation}</span>
                <span className="text-emerald-500">🕊️{p.freedom}</span>
              </div>
              <span className="font-bold text-primary ml-2">
                {calculateScore(p)}
              </span>
              {!p.isAlive && <Skull className="w-4 h-4 text-red-500" />}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next Round */}
      <div className="text-center">
        {isHost ? (
          <div className="bg-primary/10 border border-primary/30 text-primary px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3">
            {room.currentRound >= 5 ? "Đang đếm ngược tới kết quả cuối..." : "Đang chuẩn bị vòng tiếp theo..."} ({timeLeft}s)
          </div>
        ) : (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-on-surface-variant"
          >
            Đang chờ chủ phòng chuyển vòng...
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================
// FINAL RESULTS VIEW
// ============================================================
function FinalResultsView({
  players,
  currentPlayer,
  onPlayAgain,
}: {
  players: Doc<"players">[];
  currentPlayer: Doc<"players">;
  onPlayAgain: () => void;
}) {
  const isWinner = !currentPlayer.isHost && checkWinCondition(currentPlayer);

  const sortedPlayers = [...players]
    .filter((p) => !p.isHost)
    .sort((a, b) => {
      const scoreA = calculateScore(a);
      const scoreB = calculateScore(b);
      if (scoreB !== scoreA) return scoreB - scoreA;
      return b.freedom - a.freedom;
    });

  const winners = players.filter((p) => !p.isHost && checkWinCondition(p));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl w-full px-4 mx-auto space-y-8"
    >
      {/* Result Banner */}
      {!currentPlayer.isHost ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className={`rounded-3xl p-8 text-center shadow-lg ${
            isWinner
              ? "bg-emerald-500/10 border-2 border-emerald-500/30"
              : !currentPlayer.isAlive
                ? "bg-red-500/10 border-2 border-red-500/30"
                : "bg-amber-500/10 border-2 border-amber-500/30"
          }`}
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="text-6xl mb-4"
          >
            {isWinner ? "🕊️" : !currentPlayer.isAlive ? "💀" : "⚙️"}
          </motion.div>
          <h2
            className={`font-headline text-3xl md:text-4xl font-bold mb-3 ${
              isWinner
                ? "text-emerald-600 dark:text-emerald-400"
                : !currentPlayer.isAlive
                  ? "text-red-600 dark:text-red-400"
                  : "text-amber-600 dark:text-amber-400"
            }`}
          >
            {isWinner
              ? "Giải Phóng Thành Công!"
              : !currentPlayer.isAlive
                ? "Đã Bị Đào Thải"
                : "Vẫn Chưa Tự Do"}
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto leading-relaxed">
            {isWinner
              ? "Bạn đã vượt qua sự tha hóa và giành lại quyền tự do. 'Vương quốc của tự do' đã mở ra trước mắt bạn."
              : !currentPlayer.isAlive
                ? "Hệ thống đã nuốt chửng bạn. Không còn tiền, không còn cơ hội. Đây là bài học về bẫy sinh tồn trong xã hội tư bản."
                : "Bạn sống sót nhưng chưa thực sự tự do. Sự tha hóa vẫn đeo bám, và con đường giải phóng còn dài."}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="bg-primary/10 border-2 border-primary/30 rounded-3xl p-8 text-center shadow-lg"
        >
          <motion.div className="text-6xl mb-4">🏆</motion.div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3 text-primary">
            Trò Chơi Kết Thúc
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto leading-relaxed">
            Hành trình giải phóng đã khép lại. Cùng nhìn lại kết quả của các người chơi.
          </p>
        </motion.div>
      )}

      {/* Final Stats */}
      {!currentPlayer.isHost && (
        <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant">
          <h3 className="font-bold text-on-surface mb-4">Chỉ số cuối cùng</h3>
          <PlayerStatsPanel player={currentPlayer} />
          <div className="mt-4 pt-4 border-t border-outline-variant/50 flex items-center justify-between">
            <span className="text-on-surface-variant">Điểm Giải Phóng</span>
            <span className="font-mono font-bold text-2xl text-primary">
              {calculateScore(currentPlayer)}
            </span>
          </div>
        </div>
      )}

      {/* Winners */}
      {winners.length > 0 && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
          <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5" /> Người được giải phóng
          </h3>
          <div className="flex flex-wrap gap-3">
            {winners.map((w) => (
              <span
                key={w._id}
                className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full font-bold text-sm"
              >
                🕊️ {w.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Final Leaderboard */}
      <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant">
        <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" /> Bảng Xếp Hạng Cuối
          Cùng
        </h3>
        <div className="space-y-2">
          {sortedPlayers.map((p, i) => {
            const isWin = checkWinCondition(p);
            return (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl ${
                  p._id === currentPlayer._id
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-surface-variant/20"
                } ${!p.isAlive ? "opacity-40" : ""}`}
              >
                <span
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    i === 0
                      ? "bg-amber-400 text-amber-900 text-lg"
                      : i === 1
                        ? "bg-gray-300 text-gray-700"
                        : i === 2
                          ? "bg-amber-700 text-amber-100"
                          : "bg-surface-variant text-on-surface-variant"
                  }`}
                >
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-on-surface">{p.name}</span>
                    {p.isHost && (
                      <Crown className="w-3.5 h-3.5 text-primary" />
                    )}
                    {isWin && (
                      <span className="text-xs bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                        Giải phóng
                      </span>
                    )}
                    {!p.isAlive && (
                      <span className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full font-bold">
                        Loại
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono mt-1 text-on-surface-variant">
                    <span>💰 {p.money}</span>
                    <span>⚙️ {p.alienation}</span>
                    <span>🕊️ {p.freedom}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-primary font-mono">
                    {calculateScore(p)}
                  </div>
                  <div className="text-xs text-on-surface-variant">điểm</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Play Again */}
      <div className="text-center pb-8">
        <button
          onClick={onPlayAgain}
          className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 inline-flex items-center gap-3"
        >
          <LogOut className="w-6 h-6" /> Thoát (Quay lại sảnh chờ)
        </button>
      </div>
    </motion.div>
  );
}

// ============================================================
// MAIN GAME COMPONENT
// ============================================================
export default function Game() {
  const [showRules, setShowRules] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Session persistence
  const [playerId, setPlayerId] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem("gameSession");
      return stored ? JSON.parse(stored).playerId : null;
    } catch {
      return null;
    }
  });
  const [roomId, setRoomId] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem("gameSession");
      return stored ? JSON.parse(stored).roomId : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (playerId && roomId) {
      localStorage.setItem(
        "gameSession",
        JSON.stringify({ playerId, roomId })
      );
    }
  }, [playerId, roomId]);

  // Convex queries (conditional on having a session)
  const room = useQuery(
    api.rooms.get,
    roomId ? { roomId: roomId as Id<"rooms"> } : "skip"
  );
  const players = useQuery(
    api.rooms.getPlayers,
    roomId ? { roomId: roomId as Id<"rooms"> } : "skip"
  );
  const currentPlayer = useQuery(
    api.rooms.getPlayer,
    playerId ? { playerId: playerId as Id<"players"> } : "skip"
  );

  // Convex mutations
  const createRoomMutation = useMutation(api.rooms.create);
  const joinRoomMutation = useMutation(api.rooms.join);
  const startGameMutation = useMutation(api.game.startGame);
  const submitChoiceMutation = useMutation(api.game.submitChoice);
  const nextRoundMutation = useMutation(api.game.nextRound);

  // Reset session if room/player not found
  useEffect(() => {
    if (roomId && room === null) {
      clearSession();
    }
    if (playerId && currentPlayer === null) {
      clearSession();
    }
  }, [room, currentPlayer, roomId, playerId]);

  function clearSession() {
    localStorage.removeItem("gameSession");
    setPlayerId(null);
    setRoomId(null);
    setError(null);
  }

  async function handleCreateRoom(hostName: string, password?: string) {
    if (password !== "Admin@123") {
      setError("Mật khẩu chủ phòng không chính xác!");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const result = await createRoomMutation({ hostName, password });
      setPlayerId(result.playerId);
      setRoomId(result.roomId);
    } catch (e: any) {
      setError(e.message || "Không thể tạo phòng");
    } finally {
      setLoading(false);
    }
  }

  async function handleJoinRoom(code: string, name: string) {
    try {
      setLoading(true);
      setError(null);
      const result = await joinRoomMutation({ code, name });
      setPlayerId(result.playerId);
      setRoomId(result.roomId);
    } catch (e: any) {
      setError(e.message || "Không thể tham gia phòng");
    } finally {
      setLoading(false);
    }
  }

  async function handleStartGame() {
    try {
      setError(null);
      await startGameMutation({
        roomId: roomId as Id<"rooms">,
        playerId: playerId as Id<"players">,
      });
    } catch (e: any) {
      setError(e.message || "Không thể bắt đầu");
    }
  }

  async function handleSubmitChoice(choice: "A" | "B") {
    try {
      setError(null);
      await submitChoiceMutation({
        playerId: playerId as Id<"players">,
        choice,
      });
    } catch (e: any) {
      setError(e.message || "Không thể gửi lựa chọn");
    }
  }

  async function handleNextRound() {
    try {
      setError(null);
      await nextRoundMutation({
        roomId: roomId as Id<"rooms">,
        playerId: playerId as Id<"players">,
      });
    } catch (e: any) {
      setError(e.message || "Không thể chuyển vòng");
    }
  }

  // Determine which view to show
  const isHost = currentPlayer?.isHost ?? false;
  const isInRoom = roomId && playerId && room && currentPlayer;

  let content: React.ReactNode;

  if (!isInRoom) {
    content = (
      <LobbyView
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
        error={error}
        loading={loading}
      />
    );
  } else if (room.status === "lobby") {
    content = (
      <WaitingRoom
        room={room}
        players={players ?? []}
        isHost={isHost}
        onStart={handleStartGame}
        onLeave={clearSession}
      />
    );
  } else if (room.status === "playing" && room.phase === "choosing") {
    content = (
      <GameplayView
        room={room}
        currentPlayer={currentPlayer}
        players={players ?? []}
        onChoice={handleSubmitChoice}
      />
    );
  } else if (room.status === "playing" && room.phase === "results") {
    content = (
      <RoundResultsView
        room={room}
        players={players ?? []}
        currentPlayer={currentPlayer}
        isHost={isHost}
        onNextRound={handleNextRound}
      />
    );
  } else if (room.status === "finished") {
    content = (
      <FinalResultsView
        players={players ?? []}
        currentPlayer={currentPlayer}
        onPlayAgain={clearSession}
      />
    );
  } else {
    content = (
      <LobbyView
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
        error={error}
        loading={loading}
      />
    );
  }

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-start pt-24 pb-12 relative font-sans overflow-hidden">
      {/* Top controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-5xl mx-auto px-4 flex justify-between items-center mb-8 relative z-10"
      >
        {isInRoom && room.status !== "lobby" && (
          <div className="text-sm text-on-surface-variant">
            Phòng: <span className="font-mono font-bold">{room.code}</span>
          </div>
        )}
        <div className="ml-auto">
          <button
            onClick={() => setShowRules(true)}
            className="flex items-center gap-2 bg-surface border border-outline-variant text-on-surface-variant px-5 py-2.5 rounded-full hover:border-primary hover:text-primary transition-all font-bold shadow-sm hover:shadow-md active:scale-95"
          >
            <BookOpen className="w-5 h-5" />
            Luật Chơi
          </button>
        </div>
      </motion.div>

      {/* Error banner */}
      {error && isInRoom && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto mb-4 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 px-5 py-3 rounded-xl text-center font-medium text-sm"
        >
          {error}
        </motion.div>
      )}

      {content}

      <RulesModal show={showRules} onClose={() => setShowRules(false)} />
    </div>
  );
}
