'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Lightbulb, BookMarked, Tag, ArrowRight } from 'lucide-react';
import { MotionDiv, SectionHeading, GlassCard, KeywordBadge } from '@/components/ui/SharedComponents';
import { KHAI_QUAT_CONTENT } from '@/data/theory-content';

export default function KhaiQuatPage() {
  const [openSection, setOpenSection] = useState<string | null>(KHAI_QUAT_CONTENT.sections[0].id);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Header */}
      <section className="pt-6 pb-8">
        <div className="section-container relative">
          <MotionDiv>
            <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
              <Link href="/ly-thuyet" className="hover:text-white/60 transition">Lý thuyết</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-400">Khái quát chung</span>
            </div>
          </MotionDiv>

          <SectionHeading
            title={KHAI_QUAT_CONTENT.title}
            subtitle={KHAI_QUAT_CONTENT.intro}
            gradient="from-blue-400 to-cyan-400"
            centered={false}
          />
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="section-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
              {KHAI_QUAT_CONTENT.sections.map((section, index) => (
                <MotionDiv key={section.id} delay={index * 0.05}>
                  <GlassCard className="overflow-hidden">
                    {/* Section Header */}
                    <button
                      onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                          <p className="text-sm text-white/40 mt-0.5 line-clamp-1">{section.content}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: openSection === section.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-white/30" />
                      </motion.div>
                    </button>

                    {/* Section Content */}
                    <AnimatePresence>
                      {openSection === section.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 space-y-4">
                            <div className="h-px bg-white/5" />

                            {/* Main Content */}
                            <p className="text-white/70 leading-relaxed">{section.content}</p>

                            {/* Details List */}
                            {section.details && (
                              <ul className="space-y-2">
                                {section.details.map((detail, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Example Block */}
                            {section.example && (
                              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                                <div className="flex items-center gap-2 mb-2">
                                  <Lightbulb className="w-4 h-4 text-amber-400" />
                                  <span className="text-sm font-semibold text-amber-400">Ví dụ</span>
                                </div>
                                <p className="text-sm text-white/60 leading-relaxed">{section.example}</p>
                              </div>
                            )}

                            {/* Remember Block */}
                            {section.remember && (
                              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                <div className="flex items-center gap-2 mb-2">
                                  <BookMarked className="w-4 h-4 text-blue-400" />
                                  <span className="text-sm font-semibold text-blue-400">Ghi nhớ nhanh</span>
                                </div>
                                <p className="text-sm text-white/70 font-medium">{section.remember}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </MotionDiv>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-6rem)] overflow-y-auto hidden-scrollbar">
              {/* Keywords */}
              <MotionDiv delay={0.2}>
                <GlassCard className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-blue-400" />
                    <h4 className="font-semibold text-white text-sm">Từ khóa</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {KHAI_QUAT_CONTENT.keywords.map((kw) => (
                      <KeywordBadge key={kw} text={kw} />
                    ))}
                  </div>
                </GlassCard>
              </MotionDiv>

              {/* Quick Summary */}
              <MotionDiv delay={0.3}>
                <GlassCard className="p-6">
                  <h4 className="font-semibold text-white text-sm mb-4">📝 Tóm tắt nhanh</h4>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li>✅ Con người = thực thể tự nhiên + xã hội</li>
                    <li>✅ Bản chất = tổng hòa QHXH</li>
                    <li>✅ Lao động = hoạt động bản chất</li>
                    <li>✅ Bản chất mang tính lịch sử</li>
                  </ul>
                </GlassCard>
              </MotionDiv>

              {/* Next Section */}
              <MotionDiv delay={0.4}>
                <Link href="/ly-thuyet/tha-hoa">
                  <GlassCard hover className="p-6 group">
                    <span className="text-xs text-white/40 uppercase tracking-wider">Phần tiếp theo</span>
                    <h4 className="font-semibold text-white mt-1 group-hover:text-red-400 transition-colors flex items-center gap-2">
                      Tha hóa con người
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </h4>
                  </GlassCard>
                </Link>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
