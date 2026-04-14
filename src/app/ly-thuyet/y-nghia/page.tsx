'use client';

import Link from 'next/link';
import { ChevronRight, ArrowLeft, Tag } from 'lucide-react';
import { MotionDiv, StaggerContainer, StaggerItem, SectionHeading, GlassCard, KeywordBadge } from '@/components/ui/SharedComponents';
import { Y_NGHIA_CONTENT } from '@/data/theory-content';

export default function YNghiaPage() {
  const data = Y_NGHIA_CONTENT;

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 bg-grid opacity-10" />

      {/* Header */}
      <section className="pt-6 pb-4">
        <div className="section-container relative">
          <MotionDiv>
            <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
              <Link href="/ly-thuyet" className="hover:text-white/60 transition">Lý thuyết</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-emerald-400">Ý nghĩa</span>
            </div>
          </MotionDiv>

          <SectionHeading
            title={data.title}
            subtitle={data.intro}
            gradient="from-emerald-400 to-teal-400"
            centered={false}
          />
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="section-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {data.sections.map((section, index) => (
                <MotionDiv key={section.id} delay={index * 0.1}>
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{section.icon}</span>
                      <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/65 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </MotionDiv>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-6rem)] overflow-y-auto hidden-scrollbar pb-10">
              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-semibold text-white text-sm">Từ khóa</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.keywords.map((kw) => (
                    <KeywordBadge key={kw} text={kw} />
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h4 className="font-semibold text-white text-sm mb-4">✨ Điểm cốt lõi</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  Triết học Mác – Lênin không chỉ giải thích thế giới mà còn chỉ ra con đường cải tạo thế giới.
                  Vấn đề tha hóa và giải phóng vẫn mang tính thời đại — đặc biệt trong bối cảnh xã hội hiện đại.
                </p>
              </GlassCard>

              <Link href="/ly-thuyet/giai-phong">
                <GlassCard hover className="p-4 group">
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Giải phóng con người</span>
                  </div>
                </GlassCard>
              </Link>

              <Link href="/lien-he-thuc-tien">
                <GlassCard hover className="p-4 group border border-emerald-500/20">
                  <span className="text-xs text-emerald-400 uppercase tracking-wider">Tìm hiểu thêm</span>
                  <h4 className="font-semibold text-white mt-1 group-hover:text-emerald-400 transition-colors">
                    Liên hệ thực tiễn Việt Nam →
                  </h4>
                </GlassCard>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
