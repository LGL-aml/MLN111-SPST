import { NavItem, FeatureItem, JourneyStep, Reference } from '@/types';

// ==========================================
// NAVIGATION
// ==========================================
export const NAV_ITEMS: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  {
    label: 'Lý thuyết',
    href: '/ly-thuyet',
    children: [
      { label: 'Khái quát chung', href: '/ly-thuyet/khai-quat' },
      { label: 'Tha hóa con người', href: '/ly-thuyet/tha-hoa' },
      { label: 'Giải phóng con người', href: '/ly-thuyet/giai-phong' },
      { label: 'Ý nghĩa', href: '/ly-thuyet/y-nghia' },
    ],
  },
  { label: 'Sơ đồ tư duy', href: '/mindmap' },
  { label: 'Quiz', href: '/quiz' },
  { label: 'Trò chơi', href: '/tro-choi' },
  { label: 'Liên hệ thực tiễn', href: '/lien-he-thuc-tien' },
  { label: 'Tài liệu', href: '/tai-lieu' },
];

// ==========================================
// FEATURES ON LANDING PAGE
// ==========================================
export const FEATURES: FeatureItem[] = [
  {
    icon: 'BookOpen',
    title: 'Lý thuyết trực quan',
    description: 'Nội dung học thuật được trình bày bằng sơ đồ, card, timeline — dễ hiểu, dễ nhớ.',
    href: '/ly-thuyet',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: 'Brain',
    title: 'Quiz ôn tập',
    description: 'Hệ thống câu hỏi trắc nghiệm theo chủ đề, tính điểm, có giải thích chi tiết.',
    href: '/quiz',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    icon: 'Gamepad2',
    title: 'Trò chơi ghi nhớ',
    description: 'Mini game phân loại, lật thẻ, sắp xếp — học mà chơi, chơi mà học.',
    href: '/tro-choi',
    gradient: 'from-orange-500 to-amber-400',
  },
  {
    icon: 'Globe',
    title: 'Liên hệ Việt Nam',
    description: 'Áp dụng lý luận vào thực tiễn Việt Nam và đời sống hiện đại.',
    href: '/lien-he-thuc-tien',
    gradient: 'from-emerald-500 to-teal-400',
  },
];

// ==========================================
// LEARNING JOURNEY STEPS
// ==========================================
export const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: 1,
    title: 'Khám phá lý thuyết',
    description: 'Tìm hiểu khái niệm con người, tha hóa và giải phóng trong triết học Mác – Lênin.',
    icon: 'Compass',
    color: '#3b82f6',
  },
  {
    step: 2,
    title: 'Xem sơ đồ tư duy',
    description: 'Tổng quan toàn bộ bài học qua sơ đồ tư duy tương tác.',
    icon: 'Network',
    color: '#8b5cf6',
  },
  {
    step: 3,
    title: 'Thực hành Quiz',
    description: 'Kiểm tra kiến thức với hệ thống câu hỏi đa dạng.',
    icon: 'ClipboardCheck',
    color: '#ec4899',
  },
  {
    step: 4,
    title: 'Chơi game ôn tập',
    description: 'Củng cố kiến thức qua các trò chơi tương tác thú vị.',
    icon: 'Gamepad2',
    color: '#f59e0b',
  },
  {
    step: 5,
    title: 'Liên hệ thực tiễn',
    description: 'Áp dụng tri thức vào bối cảnh Việt Nam và cuộc sống hôm nay.',
    icon: 'Lightbulb',
    color: '#10b981',
  },
];

// ==========================================
// THEORY SECTIONS
// ==========================================
export const THEORY_SECTIONS = [
  {
    id: 'khai-quat',
    title: 'Khái quát chung',
    subtitle: 'Con người trong triết học Mác – Lênin',
    icon: 'Compass',
    color: '#3b82f6',
    gradient: 'from-blue-600 to-cyan-500',
    description: 'Vị trí nội dung, khái niệm con người và bản chất con người trong triết học Mác.',
    href: '/ly-thuyet/khai-quat',
  },
  {
    id: 'tha-hoa',
    title: 'Tha hóa con người',
    subtitle: 'Hiện tượng con người bị chi phối',
    icon: 'Unlink',
    color: '#ef4444',
    gradient: 'from-red-700 to-rose-500',
    description: 'Khái niệm, biểu hiện, nguyên nhân và hệ quả của hiện tượng tha hóa.',
    href: '/ly-thuyet/tha-hoa',
  },
  {
    id: 'giai-phong',
    title: 'Giải phóng con người',
    subtitle: 'Hành trình thoát khỏi tha hóa',
    icon: 'Sun',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-yellow-400',
    description: 'Nội dung, lực lượng, con đường và điều kiện giải phóng con người.',
    href: '/ly-thuyet/giai-phong',
  },
  {
    id: 'y-nghia',
    title: 'Ý nghĩa lý luận & thực tiễn',
    subtitle: 'Giá trị và ứng dụng',
    icon: 'Sparkles',
    color: '#10b981',
    gradient: 'from-emerald-500 to-green-400',
    description: 'Ý nghĩa lý luận, thực tiễn và liên hệ với Việt Nam.',
    href: '/ly-thuyet/y-nghia',
  },
];

// ==========================================
// REFERENCES
// ==========================================
export const REFERENCES: Reference[] = [
  {
    id: '1',
    title: 'Giáo trình Triết học Mác – Lênin',
    author: 'Bộ Giáo dục và Đào tạo',
    year: '2021',
    publisher: 'NXB Chính trị Quốc gia Sự thật',
    type: 'book',
  },
  {
    id: '2',
    title: 'Bản thảo kinh tế – triết học năm 1844',
    author: 'Karl Marx',
    year: '1844',
    publisher: 'NXB Chính trị Quốc gia Sự thật (bản dịch)',
    type: 'book',
  },
  {
    id: '3',
    title: 'Tư bản (Das Kapital)',
    author: 'Karl Marx',
    year: '1867',
    publisher: 'NXB Chính trị Quốc gia Sự thật (bản dịch)',
    type: 'book',
  },
  {
    id: '4',
    title: 'Hệ tư tưởng Đức',
    author: 'Karl Marx & Friedrich Engels',
    year: '1846',
    publisher: 'NXB Chính trị Quốc gia Sự thật (bản dịch)',
    type: 'book',
  },
  {
    id: '5',
    title: 'Luận cương về Feuerbach',
    author: 'Karl Marx',
    year: '1845',
    type: 'document',
  },
  {
    id: '6',
    title: 'Nhà nước và cách mạng',
    author: 'V.I. Lenin',
    year: '1917',
    publisher: 'NXB Chính trị Quốc gia Sự thật (bản dịch)',
    type: 'book',
  },
  {
    id: '7',
    title: 'Văn kiện Đại hội đại biểu toàn quốc lần thứ XIII',
    author: 'Đảng Cộng sản Việt Nam',
    year: '2021',
    publisher: 'NXB Chính trị Quốc gia Sự thật',
    type: 'document',
  },
  {
    id: '8',
    title: 'Triết học Mác – Lênin về con người và giải phóng con người',
    author: 'Nguyễn Ngọc Long, Nguyễn Hữu Vui',
    year: '2019',
    publisher: 'NXB Đại học Quốc gia Hà Nội',
    type: 'book',
  },
];

// ==========================================
// TEAM INFO
// ==========================================
export const TEAM_INFO = {
  subject: 'Triết học Mác – Lênin (MLN111)',
  topic: 'Hiện tượng tha hóa con người và vấn đề giải phóng con người',
  year: '2024 – 2025',
  university: 'Trường Đại học',
  instructor: 'Giảng viên hướng dẫn',
  members: [
    'Thành viên 1',
    'Thành viên 2',
    'Thành viên 3',
    'Thành viên 4',
  ],
};
