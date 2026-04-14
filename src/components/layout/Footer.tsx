'use client';

import Link from 'next/link';
import { BookOpen, ArrowUp, Heart } from 'lucide-react';
import { TEAM_INFO, NAV_ITEMS } from '@/data/constants';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5">
      <div className="bg-dots absolute inset-0 pointer-events-none" />
      <div className="section-container relative">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">MLN111 – SPST</h3>
                <p className="text-xs text-white/40">Sản phẩm sáng tạo</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              {TEAM_INFO.topic} — sản phẩm học tập tương tác dành cho sinh viên.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Điều hướng</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.filter(item => !item.children).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Theory */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Lý thuyết</h4>
            <ul className="space-y-2">
              <li><Link href="/ly-thuyet/khai-quat" className="text-sm text-white/50 hover:text-white transition-colors">Khái quát chung</Link></li>
              <li><Link href="/ly-thuyet/tha-hoa" className="text-sm text-white/50 hover:text-white transition-colors">Tha hóa con người</Link></li>
              <li><Link href="/ly-thuyet/giai-phong" className="text-sm text-white/50 hover:text-white transition-colors">Giải phóng con người</Link></li>
              <li><Link href="/ly-thuyet/y-nghia" className="text-sm text-white/50 hover:text-white transition-colors">Ý nghĩa</Link></li>
            </ul>
          </div>

          {/* Team Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Thông tin</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>📚 {TEAM_INFO.subject}</li>
              <li>🎓 {TEAM_INFO.university}</li>
              <li>👨‍🏫 {TEAM_INFO.instructor}</li>
              <li>📅 Năm học {TEAM_INFO.year}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 flex items-center gap-1">
            Được xây dựng với <Heart className="w-3 h-3 text-red-400 inline" /> bởi nhóm sinh viên • {TEAM_INFO.year}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/30">Next.js • TypeScript • Tailwind CSS • Framer Motion</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:-translate-y-0.5"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
