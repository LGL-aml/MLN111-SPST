'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen, Brain, Gamepad2, Globe, Compass, Network,
  ClipboardCheck, Lightbulb, ArrowRight, Sparkles, ChevronRight
} from 'lucide-react';
import { MotionDiv, StaggerContainer, StaggerItem, SectionHeading, GlassCard } from '@/components/ui/SharedComponents';
import { FEATURES, JOURNEY_STEPS, THEORY_SECTIONS } from '@/data/constants';

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Brain, Gamepad2, Globe, Compass, Network,
  ClipboardCheck, Lightbulb, Sparkles,
};

export default function HomePage() {
  return (
    <div className="relative">
      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section className="relative min-h-[calc(90vh-56px)] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="hero-orb hero-orb-1 animate-float" />
        <div className="hero-orb hero-orb-2 animate-float" style={{ animationDelay: '2s' }} />
        <div className="hero-orb hero-orb-3 animate-pulse-glow" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a1a]" />

        <div className="section-container relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <MotionDiv delay={0}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 mb-8">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Triết học Mác – Lênin • MLN111
              </span>
            </MotionDiv>

            {/* Title */}
            <MotionDiv delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-white">Hiện tượng </span>
                <span className="gradient-text-warm">tha hóa</span>
                <br />
                <span className="text-white">và </span>
                <span className="gradient-text-liberation">giải phóng</span>
                <span className="text-white"> con người</span>
              </h1>
            </MotionDiv>

            {/* Subtitle */}
            <MotionDiv delay={0.2}>
              <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
                Khám phá hành trình tư tưởng từ tha hóa đến tự do — học lý thuyết qua tương tác,
                quiz, và trò chơi sáng tạo.
              </p>
            </MotionDiv>

            {/* CTA Buttons */}
            <MotionDiv delay={0.3}>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/ly-thuyet" className="btn-primary text-base">
                  <BookOpen className="w-5 h-5" />
                  Bắt đầu học
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/quiz" className="btn-secondary text-base">
                  <Brain className="w-5 h-5" />
                  Làm Quiz
                </Link>
                <Link href="/tro-choi" className="btn-secondary text-base">
                  <Gamepad2 className="w-5 h-5" />
                  Chơi Game
                </Link>
                <Link href="/mindmap" className="btn-secondary text-base">
                  <Network className="w-5 h-5" />
                  Sơ đồ tư duy
                </Link>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* ==========================================
          FEATURES SECTION
          ========================================== */}
      <section className="section-padding relative">
        <div className="section-container">
          <SectionHeading
            badge="Tính năng"
            title="Học qua trải nghiệm"
            subtitle="Không đọc tài liệu đơn thuần — tương tác, khám phá, và ghi nhớ qua nhiều cách thức sáng tạo."
            gradient="from-blue-400 to-purple-400"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => {
              const Icon = iconMap[feature.icon] || BookOpen;
              return (
                <StaggerItem key={feature.href}>
                  <Link href={feature.href}>
                    <GlassCard hover className="p-6 h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-sm text-white/40">
                        Khám phá <ChevronRight className="w-3 h-3" />
                      </div>
                    </GlassCard>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ==========================================
          JOURNEY SECTION
          ========================================== */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="section-container relative">
          <SectionHeading
            badge="Hành trình học"
            title="5 bước chinh phục bài học"
            subtitle="Theo lộ trình từ lý thuyết đến thực hành, mỗi bước đều có tương tác và ghi nhớ."
            gradient="from-cyan-400 to-blue-400"
          />

          <div className="max-w-3xl mx-auto">
            {JOURNEY_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon] || Compass;
              return (
                <MotionDiv key={step.step} delay={index * 0.1}>
                  <div className="flex gap-6 mb-8 last:mb-0">
                    {/* Step Number & Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2"
                        style={{ borderColor: step.color, background: `${step.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: step.color }} />
                      </div>
                      {index < JOURNEY_STEPS.length - 1 && (
                        <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-white/10 to-transparent" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-8">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: step.color }}>
                          Bước {step.step}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-white/50">{step.description}</p>
                    </div>
                  </div>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          THEORY PREVIEW SECTION
          ========================================== */}
      <section className="section-padding relative">
        <div className="section-container">
          <SectionHeading
            badge="Nội dung chính"
            title="Cấu trúc bài học"
            subtitle="Bốn phần kiến thức xuyên suốt — từ khái quát chung, tha hóa, giải phóng, đến ý nghĩa thực tiễn."
            gradient="from-purple-400 to-pink-400"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {THEORY_SECTIONS.map((section) => (
              <StaggerItem key={section.id}>
                <Link href={section.href}>
                  <GlassCard hover className="p-6 group">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: `${section.color}15` }}
                      >
                        <span className="text-2xl">
                          {section.id === 'khai-quat' && '🧭'}
                          {section.id === 'tha-hoa' && '⛓️'}
                          {section.id === 'giai-phong' && '☀️'}
                          {section.id === 'y-nghia' && '💎'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-sm text-white/40 mb-2">{section.subtitle}</p>
                        <p className="text-sm text-white/50">{section.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/50 transition-colors shrink-0 mt-1" />
                    </div>
                  </GlassCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==========================================
          CTA SECTION
          ========================================== */}
      <section className="section-padding relative">
        <div className="section-container">
          <MotionDiv>
            <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />

              <div className="relative z-10">
                <h2 className="text-xl md:text-3xl font-bold text-white mb-4">
                  Sẵn sàng chinh phục bài học?
                </h2>
                <p className="text-white/50 mb-8 max-w-lg mx-auto">
                  Bắt đầu hành trình từ tha hóa đến giải phóng — hiểu sâu, nhớ lâu, và áp dụng vào cuộc sống.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/ly-thuyet" className="btn-primary">
                    <BookOpen className="w-5 h-5" />
                    Bắt đầu ngay
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/quiz" className="btn-secondary">
                    <Brain className="w-5 h-5" />
                    Kiểm tra kiến thức
                  </Link>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
