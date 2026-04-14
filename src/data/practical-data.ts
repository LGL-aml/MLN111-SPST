import { PracticalTopic, ModernAlienation } from '@/types';

export const PRACTICAL_TOPICS: PracticalTopic[] = [
  {
    id: 'phat-trien-con-nguoi',
    title: 'Phát triển con người toàn diện',
    icon: '🌟',
    description: 'Đảng và Nhà nước Việt Nam luôn đặt con người ở trung tâm, coi phát triển con người là mục tiêu cao nhất.',
    details: [
      'Chiến lược phát triển kinh tế – xã hội 2021-2030 lấy con người là trung tâm',
      'Đầu tư giáo dục chiếm 20% ngân sách nhà nước',
      'Hệ thống y tế phủ sóng toàn quốc, bảo hiểm y tế toàn dân',
      'Chính sách đào tạo nghề, nâng cao chất lượng nguồn nhân lực',
    ],
    examples: [
      'Chương trình đào tạo 10.000 tiến sĩ',
      'Đề án phát triển nguồn nhân lực chất lượng cao',
    ],
  },
  {
    id: 'cong-bang-xa-hoi',
    title: 'Công bằng xã hội',
    icon: '⚖️',
    description: 'Việt Nam cam kết thực hiện công bằng xã hội, giảm bất bình đẳng, tạo cơ hội phát triển cho mọi người.',
    details: [
      'Chính sách xóa đói giảm nghèo đa chiều',
      'Chương trình 30a hỗ trợ huyện nghèo',
      'Chính sách ưu đãi vùng sâu, vùng xa, dân tộc thiểu số',
      'Hệ thống an sinh xã hội phủ rộng',
    ],
    examples: [
      'Tỷ lệ hộ nghèo giảm từ 58% (1993) xuống dưới 3% (2024)',
      'Chỉ số HDI Việt Nam liên tục tăng',
    ],
  },
  {
    id: 'vai-tro-lao-dong',
    title: 'Vai trò của lao động',
    icon: '🔧',
    description: 'Kế thừa quan điểm Mác, Việt Nam coi lao động là nền tảng, hướng tới lao động sáng tạo, có ý nghĩa.',
    details: [
      'Bộ luật Lao động bảo vệ quyền lợi người lao động',
      'Chính sách khuyến khích đổi mới sáng tạo, khởi nghiệp',
      'Phát triển kinh tế tri thức, lao động chất lượng cao',
      'Nâng cao năng suất lao động thông qua công nghệ',
    ],
    examples: [
      'Hệ sinh thái khởi nghiệp sáng tạo phát triển mạnh',
      'Cách mạng công nghiệp 4.0 được định hướng vì con người',
    ],
  },
  {
    id: 'giam-bat-binh-dang',
    title: 'Giảm bất bình đẳng',
    icon: '📊',
    description: 'Đấu tranh chống bất bình đẳng, tham nhũng, biểu hiện tha hóa trong xã hội hiện đại.',
    details: [
      'Chống tham nhũng quyết liệt, toàn diện',
      'Cải cách chế độ tiền lương, phân phối công bằng hơn',
      'Quản lý thuế để giảm khoảng cách giàu nghèo',
      'Chính sách hỗ trợ nhóm yếu thế trong xã hội',
    ],
    examples: [
      'Công cuộc "đốt lò" chống tham nhũng',
      'Chính sách hỗ trợ COVID-19 cho người lao động',
    ],
  },
  {
    id: 'xa-hoi-tot-dep',
    title: 'Xây dựng xã hội tốt đẹp hơn',
    icon: '🌱',
    description: 'Mục tiêu "dân giàu, nước mạnh, dân chủ, công bằng, văn minh" chính là cụ thể hóa tư tưởng giải phóng con người.',
    details: [
      'Kinh tế thị trường định hướng XHCN — mô hình sáng tạo',
      'Kết hợp tăng trưởng kinh tế với tiến bộ, công bằng xã hội',
      'Xây dựng nền dân chủ XHCN, nhà nước pháp quyền',
      'Phát triển văn hóa, giữ gìn bản sắc dân tộc',
    ],
    examples: [
      'Việt Nam đạt nhiều thành tựu phát triển được quốc tế ghi nhận',
      'Mô hình phát triển bền vững hài hòa kinh tế – xã hội – môi trường',
    ],
  },
];

export const MODERN_ALIENATIONS: ModernAlienation[] = [
  {
    id: 'vat-chat',
    title: 'Chạy theo vật chất',
    icon: '💎',
    description: 'Con người đánh giá bản thân và người khác qua tài sản, thu nhập, hàng hiệu. Giá trị tinh thần bị suy giảm.',
    examples: [
      'Thước đo thành công = tiền bạc, xe sang, nhà đẹp',
      'Mua sắm không kiểm soát (shopaholic) để lấp đầy trống rỗng',
      'Tình cảm bị thương mại hóa',
    ],
  },
  {
    id: 'lao-dong',
    title: 'Lao động mất ý nghĩa sáng tạo',
    icon: '⚙️',
    description: 'Nhiều người đi làm chỉ vì tiền, không tìm thấy niềm vui hay ý nghĩa trong công việc.',
    examples: [
      '"Chủ nhật buồn vì ngày mai phải đi làm"',
      'Burnout (kiệt sức) trở thành vấn đề phổ biến',
      'Lao động lặp lại, đơn điệu trong dây chuyền, văn phòng',
    ],
  },
  {
    id: 'quan-he',
    title: 'Quan hệ thực dụng hóa',
    icon: '🔗',
    description: 'Quan hệ giữa người với người ngày càng mang tính lợi ích, tính toán, thiếu chân thành.',
    examples: [
      'Kết bạn vì lợi ích, "networking" thuần túy',
      'Mối quan hệ trên mạng thay thế tương tác thật',
      'Gia đình, tình yêu bị ảnh hưởng bởi tư duy "được – mất"',
    ],
  },
  {
    id: 'cong-nghe',
    title: 'Lệ thuộc công nghệ & mạng xã hội',
    icon: '📱',
    description: 'Con người tạo ra công nghệ nhưng bị công nghệ chi phối — biểu hiện rõ ràng nhất của tha hóa trong thế kỷ 21.',
    examples: [
      'Nghiện điện thoại, mạng xã hội, mất khả năng tập trung',
      'Sống ảo, đánh mất bản sắc thật trên không gian số',
      '"Thuật toán" quyết định bạn xem gì, mua gì, nghĩ gì',
      'FOMO (sợ bỏ lỡ) khiến đời sống tinh thần bất an',
    ],
  },
];

export const STUDENT_LESSONS = [
  {
    title: 'Nhận thức bản chất xã hội',
    description: 'Hiểu rằng bạn không chỉ là cá nhân đơn lẻ mà là thành viên của cộng đồng, xã hội — hành động của bạn ảnh hưởng đến tất cả.',
    icon: '🧠',
  },
  {
    title: 'Lao động sáng tạo có ý nghĩa',
    description: 'Hãy tìm công việc bạn đam mê, không chỉ "kiếm tiền". Lao động sáng tạo mới là bản chất đích thực của con người.',
    icon: '💡',
  },
  {
    title: 'Tránh tha hóa bản thân',
    description: 'Nhận diện những biểu hiện tha hóa: nghiện mạng xã hội, chạy theo vật chất, quan hệ giả tạo — và chủ động thoát ra.',
    icon: '🛡️',
  },
  {
    title: 'Đấu tranh vì công bằng',
    description: 'Tham gia tích cực vào xây dựng xã hội, lên tiếng chống bất công, tham nhũng, tiêu cực.',
    icon: '⚖️',
  },
  {
    title: 'Phát triển toàn diện',
    description: 'Không chỉ học giỏi mà cần rèn luyện thể chất, đạo đức, thẩm mỹ — phát triển đủ đức, trí, thể, mỹ.',
    icon: '🌱',
  },
];

export const MINDMAP_DATA = {
  id: 'root',
  label: 'Tha hóa & Giải phóng con người',
  description: 'Triết học Mác – Lênin',
  color: '#6366f1',
  children: [
    {
      id: 'khai-quat',
      label: 'Khái quát chung',
      color: '#3b82f6',
      icon: '🧭',
      description: 'Vị trí, khái niệm, bản chất con người',
      children: [
        { id: 'kq-1', label: 'Vị trí trong triết học ML', description: 'Thuộc CNDV lịch sử', color: '#60a5fa' },
        { id: 'kq-2', label: 'Khái niệm con người', description: 'Thực thể tự nhiên + xã hội', color: '#60a5fa' },
        { id: 'kq-3', label: 'Bản chất con người', description: 'Tổng hòa các QHXH', color: '#60a5fa' },
        { id: 'kq-4', label: 'Ý nghĩa nghiên cứu', description: 'Lý luận + thực tiễn', color: '#60a5fa' },
      ],
    },
    {
      id: 'tha-hoa',
      label: 'Tha hóa con người',
      color: '#ef4444',
      icon: '⛓️',
      description: 'Khái niệm, biểu hiện, nguyên nhân, hệ quả',
      children: [
        {
          id: 'th-kn', label: 'Khái niệm', color: '#f87171',
          description: 'SP tách khỏi, chi phối con người',
          children: [
            { id: 'th-kn-1', label: 'Định nghĩa', description: 'Sản phẩm xa lạ, chi phối người tạo ra', color: '#fca5a5' },
            { id: 'th-kn-2', label: 'Bản chất', description: 'Mất bản chất người', color: '#fca5a5' },
            { id: 'th-kn-3', label: 'Đặc điểm', description: 'Lịch sử, toàn diện, tất yếu', color: '#fca5a5' },
          ],
        },
        {
          id: 'th-bh', label: 'Biểu hiện', color: '#f87171',
          description: '4 hình thức tha hóa',
          children: [
            { id: 'th-bh-1', label: 'Trong lao động', description: 'Lao động cưỡng bức, xa lạ', color: '#fca5a5' },
            { id: 'th-bh-2', label: 'Trong sản phẩm', description: 'SP tách khỏi, chi phối CN', color: '#fca5a5' },
            { id: 'th-bh-3', label: 'Trong quan hệ XH', description: 'Quan hệ người bị vật hóa', color: '#fca5a5' },
            { id: 'th-bh-4', label: 'Bản chất loài', description: 'Mất tính sáng tạo tự do', color: '#fca5a5' },
          ],
        },
        {
          id: 'th-nn', label: 'Nguyên nhân', color: '#f87171',
          description: 'Kinh tế, xã hội, lịch sử, tư hữu',
          children: [
            { id: 'th-nn-1', label: 'Kinh tế', description: 'Dư thừa → chiếm hữu tư nhân', color: '#fca5a5' },
            { id: 'th-nn-2', label: 'Xã hội', description: 'Phân công LĐ cố định', color: '#fca5a5' },
            { id: 'th-nn-3', label: '★ Tư hữu TLSX', description: 'Nguyên nhân gốc rễ', color: '#fca5a5' },
          ],
        },
        {
          id: 'th-hq', label: 'Hệ quả', color: '#f87171',
          description: 'Cá nhân, xã hội, phát triển',
        },
      ],
    },
    {
      id: 'giai-phong',
      label: 'Giải phóng con người',
      color: '#f59e0b',
      icon: '☀️',
      description: 'Nội dung, lực lượng, con đường, điều kiện',
      children: [
        {
          id: 'gp-kn', label: 'Khái niệm', color: '#fbbf24',
          description: 'Xóa bỏ áp bức, phát triển tự do',
        },
        {
          id: 'gp-nd', label: 'Nội dung', color: '#fbbf24',
          description: '4 nội dung giải phóng',
          children: [
            { id: 'gp-nd-1', label: 'Giải phóng kinh tế', description: 'Xóa bóc lột, công hữu TLSX', color: '#fde68a' },
            { id: 'gp-nd-2', label: 'Giải phóng chính trị', description: 'Dân chủ thực sự', color: '#fde68a' },
            { id: 'gp-nd-3', label: 'Giải phóng xã hội', description: 'Xóa bất bình đẳng', color: '#fde68a' },
            { id: 'gp-nd-4', label: 'GP toàn diện', description: 'Phát triển tự do mỗi người', color: '#fde68a' },
          ],
        },
        {
          id: 'gp-ll', label: 'Lực lượng', color: '#fbbf24',
          description: 'GC công nhân + nhân dân + Đảng',
        },
        {
          id: 'gp-cd', label: 'Con đường', color: '#fbbf24',
          description: 'CM xã hội → Xóa tư hữu → CNXH → CNCS',
        },
        {
          id: 'gp-dk', label: 'Điều kiện', color: '#fbbf24',
          description: 'Kinh tế, chính trị, xã hội, con người',
        },
      ],
    },
    {
      id: 'y-nghia',
      label: 'Ý nghĩa',
      color: '#10b981',
      icon: '💎',
      description: 'Lý luận, thực tiễn, liên hệ VN',
      children: [
        { id: 'yn-1', label: 'Ý nghĩa lý luận', description: 'PP luận khoa học', color: '#34d399' },
        { id: 'yn-2', label: 'Ý nghĩa thực tiễn', description: 'Kim chỉ nam cho CM', color: '#34d399' },
        { id: 'yn-3', label: 'Liên hệ Việt Nam', description: 'KTTT định hướng XHCN', color: '#34d399' },
      ],
    },
  ],
};
