'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Tag, ArrowRight, ArrowLeft, Sun } from 'lucide-react';
import { MotionDiv, StaggerContainer, StaggerItem, SectionHeading, GlassCard, KeywordBadge } from '@/components/ui/SharedComponents';
import { GIAI_PHONG_CONTENT } from '@/data/theory-content';

export default function GiaiPhongPage() {
  const [activeTab, setActiveTab] = useState('khai-niem-gp');

  const tabs = [
    { id: 'khai-niem-gp', label: 'Khái niệm' },
    { id: 'noi-dung-gp', label: 'Nội dung' },
    { id: 'luc-luong', label: 'Lực lượng' },
    { id: 'con-duong', label: 'Con đường' },
    { id: 'dieu-kien', label: 'Điều kiện' },
  ];

  const data = GIAI_PHONG_CONTENT;
  const knSection = data.sections[0];
  const ndSection = data.sections[1];
  const llSection = data.sections[2];
  const cdSection = data.sections[3];
  const dkSection = data.sections[4];

  return (
    <div className="relative min-h-screen theme-liberation">
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 bg-grid opacity-10" />

      {/* Header */}
      <section className="pt-6 pb-4">
        <div className="section-container relative">
          <MotionDiv>
            <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
              <Link href="/ly-thuyet" className="hover:text-white/60 transition">Lý thuyết</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-amber-400">Giải phóng con người</span>
            </div>
          </MotionDiv>

          <SectionHeading
            title={data.title}
            subtitle={data.intro}
            gradient="from-amber-400 to-emerald-400"
            centered={false}
          />
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-14 z-30 mb-8">
        <div className="section-container">
          <div className="glass-card p-1 flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-1
                  ${activeTab === tab.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/20'
                    : 'text-white/50 hover:text-white/70 hover:bg-white/5'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="section-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* KHÁI NIỆM */}
                {activeTab === 'khai-niem-gp' && (
                  <motion.div key="kn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    {knSection.subsections?.map((sub) => (
                      <GlassCard key={sub.id} className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">{sub.title}</h3>
                        <p className="text-white/70 leading-relaxed">{sub.content}</p>
                      </GlassCard>
                    ))}
                    <GlassCard className="p-6 border border-amber-500/20 bg-amber-500/[0.03]">
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-semibold text-amber-400">Tầm nhìn của Marx</span>
                      </div>
                      <p className="text-white/80 italic leading-relaxed">
                        &ldquo;Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.&rdquo;
                      </p>
                      <p className="text-xs text-white/40 mt-2">— Tuyên ngôn Đảng Cộng sản, 1848</p>
                    </GlassCard>
                  </motion.div>
                )}

                {/* NỘI DUNG */}
                {activeTab === 'noi-dung-gp' && (
                  <motion.div key="nd" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    {ndSection.contents?.map((content) => (
                      <GlassCard key={content.id} className="p-6 border-l-4" style={{ borderLeftColor: content.color }}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{content.icon}</span>
                          <h3 className="text-lg font-semibold text-white">{content.title}</h3>
                        </div>
                        <p className="text-white/70 leading-relaxed mb-4">{content.content}</p>
                        <ul className="space-y-2">
                          {content.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                              <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: content.color }} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </GlassCard>
                    ))}
                  </motion.div>
                )}

                {/* LỰC LƯỢNG */}
                {activeTab === 'luc-luong' && (
                  <motion.div key="ll" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    {llSection.forces?.map((force) => (
                      <GlassCard key={force.id} className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-white">{force.title}</h3>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {force.role}
                          </span>
                        </div>
                        <p className="text-white/70 leading-relaxed">{force.content}</p>
                      </GlassCard>
                    ))}
                  </motion.div>
                )}

                {/* CON ĐƯỜNG */}
                {activeTab === 'con-duong' && (
                  <motion.div key="cd" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <GlassCard className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-6">Con đường giải phóng con người</h3>
                      <div className="space-y-6">
                        {cdSection.path?.map((step, i) => (
                          <div key={step.step} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                {step.step}
                              </div>
                              {i < (cdSection.path?.length ?? 0) - 1 && (
                                <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-amber-500/30 to-transparent" />
                              )}
                            </div>
                            <div className="pb-6">
                              <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                              <p className="text-sm text-white/60">{step.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                )}

                {/* ĐIỀU KIỆN */}
                {activeTab === 'dieu-kien' && (
                  <motion.div key="dk" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {dkSection.conditions?.map((cond) => (
                      <GlassCard key={cond.id} className="p-6 text-center">
                        <span className="text-3xl mb-3 block">{cond.icon}</span>
                        <h3 className="text-lg font-semibold text-white mb-2">{cond.title}</h3>
                        <p className="text-sm text-white/60 leading-relaxed">{cond.content}</p>
                      </GlassCard>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-32 lg:self-start lg:max-h-[calc(100vh-8rem)] overflow-y-auto hidden-scrollbar pb-10">
              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-amber-400" />
                  <h4 className="font-semibold text-white text-sm">Từ khóa</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.keywords.map((kw) => (
                    <KeywordBadge key={kw} text={kw} />
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h4 className="font-semibold text-white text-sm mb-4">🌅 Kết luận mini</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  Giải phóng con người là mục tiêu cao nhất của triết học Mác – Lênin. Nó đòi hỏi giải phóng toàn diện: kinh tế, chính trị, xã hội, và bản thân con người.
                  Lực lượng thực hiện là giai cấp công nhân và nhân dân dưới sự lãnh đạo của Đảng.
                </p>
              </GlassCard>

              <div className="flex flex-col gap-3">
                <Link href="/ly-thuyet/tha-hoa">
                  <GlassCard hover className="p-4 group">
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Tha hóa con người</span>
                    </div>
                  </GlassCard>
                </Link>
                <Link href="/ly-thuyet/y-nghia">
                  <GlassCard hover className="p-4 group">
                    <span className="text-xs text-white/40 uppercase tracking-wider">Tiếp theo</span>
                    <h4 className="font-semibold text-white mt-1 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                      Ý nghĩa lý luận & thực tiễn
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </h4>
                  </GlassCard>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
