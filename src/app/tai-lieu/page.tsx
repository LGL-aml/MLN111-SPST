'use client';

import { BookOpen, FileText, Globe, Scroll } from 'lucide-react';
import { MotionDiv, StaggerContainer, StaggerItem, SectionHeading, GlassCard } from '@/components/ui/SharedComponents';
import { REFERENCES, TEAM_INFO } from '@/data/constants';

const typeIcons: Record<string, React.ElementType> = {
  book: BookOpen,
  article: FileText,
  document: Scroll,
  online: Globe,
};

const typeLabels: Record<string, string> = {
  book: 'Sách',
  article: 'Bài viết',
  document: 'Văn kiện',
  online: 'Trực tuyến',
};

export default function ReferencesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-15" />

      <section className="section-padding">
        <div className="section-container relative">
          <SectionHeading
            badge="Tài liệu"
            title="Nguồn tham khảo"
            subtitle="Danh sách tài liệu tham khảo và thông tin nhóm thực hiện"
            gradient="from-blue-400 to-indigo-400"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* References */}
            <div className="lg:col-span-2">
              <MotionDiv className="mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Danh mục tài liệu
                </h3>
              </MotionDiv>

              <StaggerContainer className="space-y-3">
                {REFERENCES.map((ref) => {
                  const Icon = typeIcons[ref.type] || BookOpen;
                  return (
                    <StaggerItem key={ref.id}>
                      <GlassCard className="p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white leading-snug">{ref.title}</h4>
                          <p className="text-xs text-white/50 mt-1">{ref.author} ({ref.year})</p>
                          {ref.publisher && (
                            <p className="text-xs text-white/35 mt-0.5">{ref.publisher}</p>
                          )}
                        </div>
                        <span className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/40 shrink-0">
                          {typeLabels[ref.type]}
                        </span>
                      </GlassCard>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>

            {/* Team Info */}
            <div className="space-y-6">
              <MotionDiv delay={0.2}>
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">📋 Thông tin sản phẩm</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-white/40">Môn học</span>
                      <p className="text-white/80 font-medium">{TEAM_INFO.subject}</p>
                    </div>
                    <div>
                      <span className="text-white/40">Đề tài</span>
                      <p className="text-white/80 font-medium">{TEAM_INFO.topic}</p>
                    </div>
                    <div>
                      <span className="text-white/40">Trường</span>
                      <p className="text-white/80">{TEAM_INFO.university}</p>
                    </div>
                    <div>
                      <span className="text-white/40">Giảng viên</span>
                      <p className="text-white/80">{TEAM_INFO.instructor}</p>
                    </div>
                    <div>
                      <span className="text-white/40">Năm học</span>
                      <p className="text-white/80">{TEAM_INFO.year}</p>
                    </div>
                  </div>
                </GlassCard>
              </MotionDiv>

              <MotionDiv delay={0.3}>
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">👥 Nhóm thực hiện</h3>
                  <ul className="space-y-2">
                    {TEAM_INFO.members.map((member, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-xs font-semibold text-white/60">
                          {i + 1}
                        </div>
                        {member}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </MotionDiv>

              <MotionDiv delay={0.4}>
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">🛠️ Công nghệ sử dụng</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'Lucide Icons', 'Recharts'].map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
