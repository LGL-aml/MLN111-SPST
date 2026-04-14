import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Tha hóa & Giải phóng con người | Triết học Mác – Lênin',
  description: 'Website học tập sáng tạo về hiện tượng tha hóa con người và vấn đề giải phóng con người trong triết học Mác – Lênin. Quiz, trò chơi, sơ đồ tư duy tương tác.',
  keywords: ['triết học', 'Mác Lênin', 'tha hóa', 'giải phóng con người', 'MLN111'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen" style={{ background: '#0a0a1a' }}>
        <Header />
        {/* pt-14 matches the fixed header height (h-14 = 56px) */}
        <main className="pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

