import { GameItem, MemoryCard, TimelineItem } from '@/types';

// ==========================================
// GAME 1: PHÂN LOẠI KHÁI NIỆM
// ==========================================
export const CLASSIFY_ITEMS: GameItem[] = [
  // Tha hóa
  { id: 'c1', text: 'Lao động bị cưỡng bức', category: 'tha-hoa' },
  { id: 'c2', text: 'Sản phẩm chi phối người tạo ra', category: 'tha-hoa' },
  { id: 'c3', text: 'Quan hệ người bị vật hóa', category: 'tha-hoa' },
  { id: 'c4', text: 'Con người mất bản chất loài', category: 'tha-hoa' },

  // Giải phóng
  { id: 'c5', text: 'Phát triển tự do toàn diện', category: 'giai-phong' },
  { id: 'c6', text: 'Xóa bỏ chế độ tư hữu TLSX', category: 'giai-phong' },
  { id: 'c7', text: 'Lao động trở thành nhu cầu sống', category: 'giai-phong' },
  { id: 'c8', text: 'Xây dựng xã hội công bằng', category: 'giai-phong' },

  // Nguyên nhân
  { id: 'c9', text: 'Chế độ tư hữu về TLSX', category: 'nguyen-nhan' },
  { id: 'c10', text: 'Phân công lao động cố định', category: 'nguyen-nhan' },
  { id: 'c11', text: 'Sự bóc lột giá trị thặng dư', category: 'nguyen-nhan' },
  { id: 'c12', text: 'Sở hữu tư nhân về sản xuất', category: 'nguyen-nhan' },

  // Hệ quả
  { id: 'c13', text: 'Phân hóa giàu nghèo sâu sắc', category: 'he-qua' },
  { id: 'c14', text: 'Nhân cách bị phiến diện hóa', category: 'he-qua' },
  { id: 'c15', text: 'Xung đột giai cấp gay gắt', category: 'he-qua' },
  { id: 'c16', text: 'Sáng tạo bị kìm hãm', category: 'he-qua' },
];

export const CLASSIFY_CATEGORIES = [
  { id: 'tha-hoa', label: 'Tha hóa', color: '#ef4444', icon: '🔗' },
  { id: 'giai-phong', label: 'Giải phóng', color: '#10b981', icon: '✨' },
  { id: 'nguyen-nhan', label: 'Nguyên nhân', color: '#f59e0b', icon: '🔍' },
  { id: 'he-qua', label: 'Hệ quả', color: '#8b5cf6', icon: '📊' },
];

// ==========================================
// GAME 2: LẬT THẺ GHI NHỚ
// ==========================================
export const MEMORY_PAIRS: { concept: string; definition: string }[] = [
  {
    concept: 'Tha hóa',
    definition: 'Con người bị chi phối bởi sản phẩm mình tạo ra',
  },
  {
    concept: 'Bản chất con người',
    definition: 'Tổng hòa các quan hệ xã hội',
  },
  {
    concept: 'Giải phóng con người',
    definition: 'Xóa bỏ mọi áp bức, phát triển tự do toàn diện',
  },
  {
    concept: 'Chế độ tư hữu',
    definition: 'Nguyên nhân gốc rễ của tha hóa',
  },
  {
    concept: 'Giai cấp công nhân',
    definition: 'Lực lượng tiên phong trong giải phóng',
  },
  {
    concept: 'Tha hóa lao động',
    definition: 'Lao động trở thành cưỡng bức, xa lạ',
  },
];

export function generateMemoryCards(): MemoryCard[] {
  const cards: MemoryCard[] = [];
  MEMORY_PAIRS.forEach((pair, index) => {
    cards.push({
      id: `concept-${index}`,
      content: pair.concept,
      matchId: `def-${index}`,
      type: 'concept',
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: `def-${index}`,
      content: pair.definition,
      matchId: `concept-${index}`,
      type: 'definition',
      isFlipped: false,
      isMatched: false,
    });
  });
  // Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

// ==========================================
// GAME 3: SẮP XẾP TIẾN TRÌNH
// ==========================================
export const TIMELINE_ITEMS: TimelineItem[] = [
  { id: 't1', text: 'Chế độ tư hữu hình thành', order: 1 },
  { id: 't2', text: 'Bóc lột lao động xuất hiện', order: 2 },
  { id: 't3', text: 'Tha hóa con người xảy ra', order: 3 },
  { id: 't4', text: 'Mâu thuẫn giai cấp gay gắt', order: 4 },
  { id: 't5', text: 'Đấu tranh cách mạng nổ ra', order: 5 },
  { id: 't6', text: 'Xóa bỏ tư hữu, xây dựng CNXH', order: 6 },
  { id: 't7', text: 'Con người được giải phóng', order: 7 },
];

export const GAME_DESCRIPTIONS = [
  {
    id: 'classify',
    title: 'Phân loại khái niệm',
    description: 'Kéo thả các khái niệm vào đúng nhóm: Tha hóa, Giải phóng, Nguyên nhân hoặc Hệ quả.',
    icon: '🏷️',
    gradient: 'from-blue-500 to-purple-500',
    difficulty: 'Trung bình',
  },
  {
    id: 'memory',
    title: 'Lật thẻ ghi nhớ',
    description: 'Ghép cặp khái niệm với định nghĩa tương ứng. Hãy ghi nhớ vị trí các thẻ!',
    icon: '🃏',
    gradient: 'from-amber-500 to-orange-500',
    difficulty: 'Dễ',
  },
  {
    id: 'timeline',
    title: 'Sắp xếp tiến trình',
    description: 'Sắp xếp các sự kiện theo đúng trình tự từ tha hóa đến giải phóng.',
    icon: '📋',
    gradient: 'from-emerald-500 to-teal-500',
    difficulty: 'Dễ',
  },
];
