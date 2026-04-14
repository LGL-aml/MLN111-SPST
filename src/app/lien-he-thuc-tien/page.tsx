'use client';

import { MotionDiv, StaggerContainer, StaggerItem, SectionHeading, GlassCard } from '@/components/ui/SharedComponents';
import { PRACTICAL_TOPICS, MODERN_ALIENATIONS, STUDENT_LESSONS } from '@/data/practical-data';

export default function PracticalPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.05) 0%, transparent 60%)' }} />

      {/* Hero */}
      <section className="pt-16 pb-8">
        <div className="section-container relative">
          <SectionHeading
            badge="Liên hệ thực tiễn"
            title="Vận dụng vào Việt Nam"
            subtitle="Triết học Mác – Lênin về tha hóa và giải phóng con người soi sáng con đường phát triển của Việt Nam và cuộc sống hiện đại."
            gradient="from-emerald-400 to-cyan-400"
          />
        </div>
      </section>

      {/* Vietnam Section */}
      <section className="pb-16">
        <div className="section-container relative">
          <MotionDiv className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">🇻🇳 Thực tiễn Việt Nam</h3>
            <p className="text-white/50">Việt Nam vận dụng sáng tạo chủ nghĩa Mác – Lênin vào con đường phát triển</p>
          </MotionDiv>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICAL_TOPICS.map((topic) => (
              <StaggerItem key={topic.id}>
                <GlassCard className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{topic.icon}</span>
                    <h4 className="text-lg font-semibold text-white">{topic.title}</h4>
                  </div>
                  <p className="text-sm text-white/60 mb-4 leading-relaxed">{topic.description}</p>

                  <ul className="space-y-2 mb-4">
                    {topic.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0 mt-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {topic.examples && (
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-xs text-emerald-400 font-semibold mb-1">Ví dụ:</p>
                      {topic.examples.map((ex, i) => (
                        <p key={i} className="text-xs text-white/50">• {ex}</p>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Modern Alienation */}
      <section className="pb-16">
        <div className="section-container relative">
          <MotionDiv className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">📱 Tha hóa trong đời sống hiện đại</h3>
            <p className="text-white/50">Nhận diện những biểu hiện mới của tha hóa trong xã hội hôm nay</p>
          </MotionDiv>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MODERN_ALIENATIONS.map((item) => (
              <StaggerItem key={item.id}>
                <GlassCard className="p-6 h-full border-l-4 border-l-red-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                  </div>
                  <p className="text-sm text-white/60 mb-4 leading-relaxed">{item.description}</p>
                  <ul className="space-y-1">
                    {item.examples.map((ex, i) => (
                      <li key={i} className="text-sm text-white/45 flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Student Lessons */}
      <section className="pb-20">
        <div className="section-container relative">
          <MotionDiv className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">🎓 Bài học cho sinh viên</h3>
            <p className="text-white/50">Những điều rút ra cho bản thân từ học thuyết về tha hóa và giải phóng con người</p>
          </MotionDiv>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:grid-cols-5">
            {STUDENT_LESSONS.map((lesson, i) => (
              <StaggerItem key={i}>
                <GlassCard className="p-5 h-full text-center">
                  <span className="text-3xl block mb-3">{lesson.icon}</span>
                  <h4 className="text-sm font-semibold text-white mb-2">{lesson.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{lesson.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
