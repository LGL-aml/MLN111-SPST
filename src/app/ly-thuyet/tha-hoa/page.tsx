'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Lightbulb, BookMarked, Tag, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import { MotionDiv, StaggerContainer, StaggerItem, SectionHeading, GlassCard, KeywordBadge } from '@/components/ui/SharedComponents';
import { THA_HOA_CONTENT } from '@/data/theory-content';

export default function ThaHoaPage() {
  const [activeTab, setActiveTab] = useState('khai-niem-tha-hoa');

  const tabs = [
    { id: 'khai-niem-tha-hoa', label: 'Khái niệm' },
    { id: 'bieu-hien', label: 'Biểu hiện' },
    { id: 'nguyen-nhan', label: 'Nguyên nhân' },
    { id: 'he-qua', label: 'Hệ quả' },
  ];

  const knSection = THA_HOA_CONTENT.sections[0];
  const bhSection = THA_HOA_CONTENT.sections[1];
  const nnSection = THA_HOA_CONTENT.sections[2];
  const hqSection = THA_HOA_CONTENT.sections[3];

  return (
    <div className="relative min-h-screen theme-alienation">
      {/* Dark atmospheric background */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 bg-grid opacity-10" />

      {/* Header */}
      <section className="pt-6 pb-4">
        <div className="section-container relative">
          <MotionDiv>
            <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
              <Link href="/ly-thuyet" className="hover:text-white/60 transition">Lý thuyết</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-red-400">Tha hóa con người</span>
            </div>
          </MotionDiv>

          <SectionHeading
            title={THA_HOA_CONTENT.title}
            subtitle={THA_HOA_CONTENT.intro}
            gradient="from-red-400 to-rose-300"
            centered={false}
          />

          {/* Flowchart: Quá trình tha hóa */}
          <MotionDiv delay={0.2} className="mb-10">
            <GlassCard className="p-6">
              <h4 className="text-sm font-semibold text-red-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Quá trình tha hóa
              </h4>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0">
                {THA_HOA_CONTENT.flowchart.map((step, i) => (
                  <div key={step.step} className="flex items-center gap-3 flex-1 w-full md:w-auto">
                    <div className="flex-1 text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-xs text-red-400 font-semibold mb-1">Bước {step.step}</div>
                      <div className="text-sm font-medium text-white/80">{step.label}</div>
                      <div className="text-xs text-white/40 mt-1">{step.description}</div>
                    </div>
                    {i < THA_HOA_CONTENT.flowchart.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-red-400/50 shrink-0 rotate-90 md:rotate-0" />
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </MotionDiv>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="sticky top-14 z-30 mb-8">
        <div className="section-container">
          <div className="glass-card p-1 flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-1
                  ${activeTab === tab.id
                    ? 'bg-red-500/20 text-red-300 border border-red-500/20'
                    : 'text-white/50 hover:text-white/70 hover:bg-white/5'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="pb-20">
        <div className="section-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* KHÁI NIỆM */}
                {activeTab === 'khai-niem-tha-hoa' && (
                  <motion.div key="kn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    {knSection.subsections?.map((sub, i) => (
                      <GlassCard key={sub.id} className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">{sub.title}</h3>
                        <p className="text-white/70 leading-relaxed">{sub.content}</p>
                        {sub.remember && (
                          <div className="mt-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                            <div className="flex items-center gap-2 mb-2">
                              <BookMarked className="w-4 h-4 text-red-400" />
                              <span className="text-sm font-semibold text-red-400">Ghi nhớ nhanh</span>
                            </div>
                            <p className="text-sm text-white/70 font-medium">{sub.remember}</p>
                          </div>
                        )}
                      </GlassCard>
                    ))}
                  </motion.div>
                )}

                {/* BIỂU HIỆN */}
                {activeTab === 'bieu-hien' && (
                  <motion.div key="bh" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    {bhSection.forms?.map((form) => (
                      <GlassCard key={form.id} className="p-6 border-l-4" style={{ borderLeftColor: form.color }}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{form.icon}</span>
                          <h3 className="text-lg font-semibold text-white">{form.title}</h3>
                        </div>
                        <p className="text-white/70 leading-relaxed mb-4">{form.content}</p>
                        {form.example && (
                          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="w-4 h-4 text-amber-400" />
                              <span className="text-sm font-semibold text-amber-400">Ví dụ</span>
                            </div>
                            <p className="text-sm text-white/60">{form.example}</p>
                          </div>
                        )}
                      </GlassCard>
                    ))}
                  </motion.div>
                )}

                {/* NGUYÊN NHÂN */}
                {activeTab === 'nguyen-nhan' && (
                  <motion.div key="nn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    {nnSection.causes?.map((cause) => (
                      <GlassCard key={cause.id} className={`p-6 ${cause.isRoot ? 'border-2 border-red-500/30 bg-red-500/[0.03]' : ''}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{cause.icon}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{cause.title}</h3>
                            {cause.isRoot && (
                              <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">
                                ★ Nguyên nhân gốc rễ
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-white/70 leading-relaxed">{cause.content}</p>
                      </GlassCard>
                    ))}
                  </motion.div>
                )}

                {/* HỆ QUẢ */}
                {activeTab === 'he-qua' && (
                  <motion.div key="hq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    {hqSection.consequences?.map((con) => (
                      <GlassCard key={con.id} className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl">{con.icon}</span>
                          <h3 className="text-lg font-semibold text-white">{con.title}</h3>
                        </div>
                        <ul className="space-y-2">
                          {con.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
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
                  <Tag className="w-4 h-4 text-red-400" />
                  <h4 className="font-semibold text-white text-sm">Từ khóa</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {THA_HOA_CONTENT.keywords.map((kw) => (
                    <KeywordBadge key={kw} text={kw} />
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h4 className="font-semibold text-white text-sm mb-4">📝 Kết luận mini</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  Tha hóa là hiện tượng lịch sử, gắn liền với chế độ tư hữu. Nó diễn ra trên mọi lĩnh vực và ảnh hưởng đến toàn xã hội.
                  Để xóa bỏ tha hóa, phải xóa bỏ nguyên nhân gốc rễ — chế độ tư hữu tư liệu sản xuất.
                </p>
              </GlassCard>

              <div className="flex flex-col gap-3">
                <Link href="/ly-thuyet/khai-quat">
                  <GlassCard hover className="p-4 group">
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Khái quát chung</span>
                    </div>
                  </GlassCard>
                </Link>
                <Link href="/ly-thuyet/giai-phong">
                  <GlassCard hover className="p-4 group">
                    <span className="text-xs text-white/40 uppercase tracking-wider">Tiếp theo</span>
                    <h4 className="font-semibold text-white mt-1 flex items-center gap-2 group-hover:text-amber-400 transition-colors">
                      Giải phóng con người
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
