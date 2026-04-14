'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { MotionDiv, StaggerContainer, StaggerItem, SectionHeading, GlassCard } from '@/components/ui/SharedComponents';
import { THEORY_SECTIONS } from '@/data/constants';

const sectionIcons: Record<string, string> = {
  'khai-quat': '🧭',
  'tha-hoa': '⛓️',
  'giai-phong': '☀️',
  'y-nghia': '💎',
};

export default function TheoryPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <section className="section-padding">
        <div className="section-container relative">
          <SectionHeading
            badge="Lý thuyết"
            title="Nội dung bài học"
            subtitle="Khám phá từng phần kiến thức — được trình bày trực quan, dễ hiểu, với ví dụ thực tế."
            gradient="from-blue-400 via-purple-400 to-pink-400"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {THEORY_SECTIONS.map((section, index) => (
              <StaggerItem key={section.id}>
                <Link href={section.href}>
                  <GlassCard hover className="p-8 h-full group relative overflow-hidden">
                    {/* Background Gradient */}
                    <div
                      className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${section.color}, transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10">
                      {/* Icon & Number */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                          style={{ background: `${section.color}15` }}
                        >
                          {sectionIcons[section.id]}
                        </div>
                        <span className="text-5xl font-black text-white/5">{String(index + 1).padStart(2, '0')}</span>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">
                        {section.title}
                      </h3>
                      <p className="text-sm text-white/40 mb-3">{section.subtitle}</p>
                      <p className="text-sm text-white/50 leading-relaxed mb-4">{section.description}</p>

                      {/* CTA */}
                      <div className="flex items-center gap-1 text-sm font-medium" style={{ color: section.color }}>
                        Tìm hiểu chi tiết
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
