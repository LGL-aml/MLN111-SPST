import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

/* ─── Animation Variants ─── */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

/* ─── Daily quotes pool ─── */
const quotes = [
  {
    text: '"Tự do không phải là làm những gì mình muốn, mà là không phải làm những gì mình không muốn."',
    author: '— Jean-Jacques Rousseau',
  },
  {
    text: '"Các nhà triết học đã chỉ giải thích thế giới bằng nhiều cách khác nhau, vấn đề là cải tạo thế giới."',
    author: '— Karl Marx',
  },
  {
    text: '"Không có lý luận cách mạng thì không có phong trào cách mạng."',
    author: '— V.I. Lenin',
  },
];

const todayQuote = quotes[new Date().getDay() % quotes.length];

export default function Quiz() {
  return (
    <main className="pt-20 min-h-screen bg-surface">
      {/* ═══ HEADER SECTION ═══ */}
      <section className="py-16 md:py-20 text-center relative overflow-hidden">
        {/* Subtle decorative bg dots */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <motion.div
          className="container mx-auto px-6 relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-headline font-bold tracking-tighter text-on-background leading-[1.1] mb-5"
            variants={fadeInUp}
          >
            Chọn Chế Độ Quiz
          </motion.h1>
          <motion.p
            className="text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Chào mừng bạn đến với Học Viện Giải Phóng. Hãy lựa chọn phương thức
            rèn luyện kiến thức phù hợp với mục tiêu của bạn hôm nay.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══ QUIZ MODE CARDS ═══ */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {/* ── Card 1: Thi thử (Mock Exam) ── */}
            <motion.div
              className="group relative bg-surface-container-lowest border border-outline-variant/15 rounded-3xl p-8 md:p-10 overflow-hidden cursor-pointer"
              variants={scaleIn}
              whileHover={{
                y: -6,
                boxShadow: '0 24px 64px rgba(0,0,0,0.08)',
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              {/* Large background watermark icon */}
              <div className="absolute top-6 right-6 opacity-[0.06] pointer-events-none">
                <span
                  className="material-symbols-outlined text-[120px] text-on-surface"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  timer
                </span>
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon badge */}
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center mb-6 shadow-sm"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span
                    className="material-symbols-outlined text-2xl text-on-secondary-fixed"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    timer
                  </span>
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-on-surface mb-3">
                  Thi thử
                </h2>

                {/* Description */}
                <p className="text-on-surface-variant leading-relaxed mb-8 flex-grow">
                  Mô phỏng hệ thống thi thật, có giới hạn thời gian để rèn
                  luyện áp lực phòng thi và đánh giá năng lực thực tế.
                </p>

                {/* CTA Button */}
                <Link to="/quiz/exam">
                  <motion.button
                    className="w-full py-4 bg-primary text-on-primary font-bold tracking-wide text-base flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 8px 32px rgba(45,90,39,0.25)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/15"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Bắt đầu thi
                      <span className="material-symbols-outlined text-lg">
                        arrow_forward
                      </span>
                    </span>
                  </motion.button>
                </Link>

                {/* Bottom badge */}
                <div className="flex items-center gap-2 mt-5">
                  <span
                    className="material-symbols-outlined text-sm text-secondary-fixed-dim"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-on-surface-variant/70">
                    Chứng chỉ phòng thi nghiệm
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Card 2: Ôn tập (Review) ── */}
            <motion.div
              className="group relative bg-surface-container-lowest border border-outline-variant/15 rounded-3xl p-8 md:p-10 overflow-hidden cursor-pointer"
              variants={scaleIn}
              whileHover={{
                y: -6,
                boxShadow: '0 24px 64px rgba(0,0,0,0.08)',
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              {/* Large background watermark icon */}
              <div className="absolute top-6 right-6 opacity-[0.06] pointer-events-none">
                <span
                  className="material-symbols-outlined text-[120px] text-on-surface"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  settings
                </span>
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-secondary/5 to-transparent rounded-3xl" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon badge */}
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mb-6 shadow-sm"
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span
                    className="material-symbols-outlined text-2xl text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    psychology
                  </span>
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-on-surface mb-3">
                  Ôn tập
                </h2>

                {/* Description */}
                <p className="text-on-surface-variant leading-relaxed mb-8 flex-grow">
                  Làm bài và xem đáp án ngay, có AI hỗ trợ giải thích các khái
                  niệm triết học và xã hội phức tạp một cách trực quan.
                </p>

                {/* CTA Button */}
                <Link to="/quiz/review">
                  <motion.button
                    className="w-full py-4 bg-surface-container-highest border border-outline-variant/30 text-on-surface font-bold tracking-wide text-base flex items-center justify-center gap-2 relative overflow-hidden"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: 'var(--color-surface-bright)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Ôn tập ngay
                      <span
                        className="material-symbols-outlined text-lg text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        auto_awesome
                      </span>
                    </span>
                  </motion.button>
                </Link>

                {/* Bottom badge */}
                <div className="flex items-center gap-2 mt-5">
                  <span
                    className="material-symbols-outlined text-sm text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    smart_toy
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-on-surface-variant/70">
                    Hỗ trợ bởi AI Mentor
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DAILY QUOTE SECTION ═══ */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Forest background image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <motion.img
                className="absolute inset-0 w-full h-full object-cover"
                alt="Dense atmospheric forest with morning light filtering through tall trees"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmo_hmbm-dMpT9P7id-jVfSS8zsogVZ70dHpL2-QuofeDrzNIhXmKUBzTZyaryVdDAaD1p16ItLgwcwgWHIQyZJA_hHVwTaVP-gJ1sAB4UegnbWgx_VZXuXKIs-nw94JxoQ_UIlcMzNBqOi7YsHKW7yoSzTjxDEVVH5CpcYMwNFvyWPdmYRMZvsDxXGjZ2mNroKDeT3QlSRQ8yGKAVN0Sb1VpUHvqh9cweYfwsLpvdoy2FMOiAHYI5IUzFQGQn-r4nnsYM5ghfu_Ud"
                referrerPolicy="no-referrer"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              {/* Dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

              {/* Quote content */}
              <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10 max-w-2xl">
                <motion.span
                  className="inline-block px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold uppercase tracking-[0.2em] rounded-md mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Trích dẫn hôm nay
                </motion.span>
                <motion.p
                  className="text-xl md:text-2xl text-white font-headline font-medium leading-relaxed italic"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                >
                  {todayQuote.text}
                </motion.p>
                <motion.span
                  className="block mt-3 text-sm text-white/70 font-body"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  {todayQuote.author}
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
