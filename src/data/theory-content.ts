// ==========================================
// NỘI DUNG LÝ THUYẾT - KHÁI QUÁT CHUNG
// ==========================================
export const KHAI_QUAT_CONTENT = {
  id: 'khai-quat',
  title: 'Khái quát chung',
  subtitle: 'Con người trong triết học Mác – Lênin',
  intro: 'Vấn đề con người là một trong những vấn đề trung tâm của triết học. Triết học Mác – Lênin đã đưa ra quan điểm khoa học và cách mạng nhất về con người.',
  sections: [
    {
      id: 'vi-tri',
      title: 'Vị trí nội dung trong triết học Mác – Lênin',
      content: 'Vấn đề con người, tha hóa và giải phóng con người thuộc phạm trù chủ nghĩa duy vật lịch sử — một trong ba bộ phận cấu thành triết học Mác – Lênin.',
      details: [
        'Là sự kế thừa và phát triển vượt bậc so với các quan điểm trước đó về con người',
        'Kết hợp duy vật biện chứng với duy vật lịch sử để nhận thức con người',
        'Đặt vấn đề con người trong mối quan hệ với lao động, xã hội và lịch sử',
        'Lần đầu tiên chỉ ra con đường hiện thực để giải phóng con người',
      ],
      remember: 'Con người được xem xét trong mối quan hệ với xã hội và lịch sử, không phải trừu tượng.',
    },
    {
      id: 'khai-niem',
      title: 'Khái niệm con người',
      content: 'Theo triết học Mác – Lênin, con người là thực thể thống nhất giữa mặt tự nhiên và mặt xã hội, trong đó mặt xã hội là bản chất.',
      details: [
        'Con người là sản phẩm của tự nhiên và của lịch sử xã hội',
        'Con người vừa là chủ thể, vừa là sản phẩm của lịch sử',
        'Con người là thực thể sinh học – xã hội – văn hóa',
        'Hoạt động thực tiễn (đặc biệt là lao động) là phương thức tồn tại cơ bản của con người',
      ],
      example: 'Một đứa trẻ sinh ra có bản năng tự nhiên (ăn, ngủ), nhưng phải sống trong xã hội, qua giáo dục và lao động mới trở thành "con người" đúng nghĩa — biết nói, biết tư duy, có đạo đức.',
      remember: 'Con người = Thực thể tự nhiên + Thực thể xã hội (bản chất)',
    },
    {
      id: 'ban-chat',
      title: 'Bản chất con người',
      content: '"Bản chất con người không phải là cái trừu tượng cố hữu của cá nhân riêng biệt. Trong tính hiện thực của nó, bản chất con người là tổng hòa các quan hệ xã hội."',
      details: [
        'Bản chất con người mang tính lịch sử – cụ thể, thay đổi theo thời đại',
        'Không có "bản tính người" trừu tượng, vĩnh hằng như các triết gia trước Mác quan niệm',
        'Con người trong mỗi thời đại khác nhau có bản chất khác nhau do quan hệ xã hội quy định',
        'Bản chất con người được hình thành và biểu hiện trong hoạt động thực tiễn',
      ],
      example: 'Một người sống trong xã hội phong kiến có tư duy, đạo đức, lối sống khác hẳn một người sống trong xã hội hiện đại — vì các quan hệ xã hội (gia đình, kinh tế, chính trị) đã thay đổi.',
      remember: 'Bản chất con người = Tổng hòa các quan hệ xã hội (Luận cương VI về Feuerbach, 1845)',
    },
    {
      id: 'y-nghia-nghien-cuu',
      title: 'Ý nghĩa nghiên cứu vấn đề',
      content: 'Nghiên cứu vấn đề con người, tha hóa và giải phóng con người có ý nghĩa to lớn cả về lý luận lẫn thực tiễn.',
      details: [
        'Lý luận: cung cấp thế giới quan, phương pháp luận khoa học để nhận thức con người',
        'Thực tiễn: xác định nguyên nhân gốc rễ của bất công để tìm phương hướng giải phóng',
        'Xây dựng chính sách phát triển con người toàn diện',
        'Đấu tranh chống mọi hình thức áp bức, bóc lột, tha hóa',
      ],
      remember: 'Hiểu đúng về con người → nhận ra tha hóa → tìm được con đường giải phóng.',
    },
  ],
  keywords: ['con người', 'bản chất con người', 'tổng hòa quan hệ xã hội', 'thực thể tự nhiên', 'thực thể xã hội', 'lao động', 'hoạt động thực tiễn', 'duy vật lịch sử'],
};

// ==========================================
// NỘI DUNG LÝ THUYẾT - THA HÓA CON NGƯỜI
// ==========================================
export const THA_HOA_CONTENT = {
  id: 'tha-hoa',
  title: 'Hiện tượng tha hóa con người',
  subtitle: 'Khi con người bị chi phối bởi chính sản phẩm mình tạo ra',
  intro: 'Tha hóa (Entfremdung / Alienation) là một trong những khái niệm trung tâm và sâu sắc nhất trong triết học Mác. Nó mô tả quá trình con người mất đi bản chất của mình trong xã hội tư bản.',
  sections: [
    {
      id: 'khai-niem-tha-hoa',
      title: 'Khái niệm tha hóa',
      subsections: [
        {
          id: 'dinh-nghia',
          title: 'Định nghĩa',
          content: 'Tha hóa là hiện tượng những sản phẩm do con người tạo ra (vật chất, tinh thần, thể chế) tách khỏi con người, trở thành lực lượng xa lạ, đối lập và chi phối, nô dịch lại chính con người.',
          remember: 'Con người tạo ra → sản phẩm tách khỏi → quay lại chi phối con người → THA HÓA',
        },
        {
          id: 'ban-chat-tha-hoa',
          title: 'Bản chất',
          content: 'Bản chất của tha hóa là sự đánh mất bản chất người: con người không còn là mục đích mà bị biến thành phương tiện; lao động sáng tạo bị biến thành cưỡng bức; quan hệ người bị thay bằng quan hệ vật.',
        },
        {
          id: 'dac-diem',
          title: 'Đặc điểm',
          content: 'Tha hóa có tính lịch sử (phát sinh, phát triển và sẽ bị xóa bỏ), tính toàn diện (diễn ra trên mọi lĩnh vực), và tính tất yếu trong xã hội có chế độ tư hữu.',
        },
      ],
    },
    {
      id: 'bieu-hien',
      title: 'Các hình thức biểu hiện',
      forms: [
        {
          id: 'lao-dong',
          title: 'Tha hóa trong lao động',
          icon: '⚙️',
          content: 'Lao động — vốn là hoạt động tự do, sáng tạo của con người — trở thành hoạt động cưỡng bức, xa lạ. Người lao động chỉ cảm thấy "ở nhà mình" khi không lao động, và cảm thấy xa lạ khi lao động.',
          example: 'Công nhân trong dây chuyền sản xuất lặp đi lặp lại một thao tác đơn giản suốt 10-12 tiếng, không sáng tạo, không hứng thú — lao động chỉ là phương tiện để kiếm tiền tồn tại.',
          color: '#ef4444',
        },
        {
          id: 'san-pham',
          title: 'Tha hóa trong sản phẩm lao động',
          icon: '📦',
          content: 'Sản phẩm do người lao động tạo ra không thuộc về họ mà thuộc về nhà tư bản. Sản phẩm càng nhiều, người tạo ra càng nghèo: "Công nhân sản xuất ra cung điện, nhưng họ ở trong túp lều."',
          example: 'Người thợ may may ra hàng nghìn bộ vest cao cấp nhưng bản thân chỉ mặc quần áo rẻ tiền. Thành quả lao động thuộc về chủ xưởng.',
          color: '#f97316',
        },
        {
          id: 'quan-he',
          title: 'Tha hóa trong quan hệ xã hội',
          icon: '🔗',
          content: 'Quan hệ giữa người với người bị "vật hóa" — biến thành quan hệ giữa các vật (hàng hóa, tiền tệ). Giá trị con người bị quy thành giá trị trao đổi; tình cảm bị thay bằng tính toán lợi ích.',
          example: 'Trong xã hội tư bản, đánh giá con người qua thu nhập, tài sản, chức vụ — chứ không phải qua phẩm chất, đạo đức, năng lực sáng tạo.',
          color: '#eab308',
        },
        {
          id: 'ban-chat-loai',
          title: 'Tha hóa bản chất con người (bản chất loài)',
          icon: '👤',
          content: 'Lao động tự do, sáng tạo — đặc trưng "loài" của con người — bị biến thành phương tiện tồn tại sinh học thuần túy. Con người bị hạ xuống mức tồn tại của động vật.',
          example: 'Con người vốn lao động để sáng tạo, để tự thể hiện. Nhưng trong tha hóa, lao động chỉ để ăn, uống, ngủ — tức tồn tại sinh học, như động vật.',
          color: '#a855f7',
        },
      ],
    },
    {
      id: 'nguyen-nhan',
      title: 'Nguyên nhân',
      causes: [
        {
          id: 'kinh-te',
          title: 'Nguyên nhân kinh tế',
          content: 'Sự phát triển của lực lượng sản xuất đến mức nhất định dẫn đến dư thừa sản phẩm → xuất hiện chiếm hữu tư nhân → bóc lột lao động.',
          icon: '💰',
        },
        {
          id: 'xa-hoi',
          title: 'Nguyên nhân xã hội',
          content: 'Phân công lao động xã hội tự phát, cố định, gắn con người vào một dạng hoạt động duy nhất, làm con người phiến diện hóa.',
          icon: '🏛️',
        },
        {
          id: 'lich-su',
          title: 'Nguyên nhân lịch sử',
          content: 'Tha hóa là sản phẩm lịch sử, gắn liền với giai đoạn phát triển nhất định của xã hội loài người khi có giai cấp và tư hữu.',
          icon: '📜',
        },
        {
          id: 'tu-huu',
          title: 'Vai trò của chế độ tư hữu',
          content: 'Chế độ tư hữu về tư liệu sản xuất là nguyên nhân gốc rễ, sâu xa nhất. Nó vừa là kết quả, vừa là phương tiện duy trì tha hóa lao động.',
          icon: '🔑',
          isRoot: true,
        },
      ],
    },
    {
      id: 'he-qua',
      title: 'Hệ quả',
      consequences: [
        {
          id: 'ca-nhan',
          title: 'Đối với cá nhân',
          items: [
            'Mất tự do, sáng tạo trong lao động',
            'Bị biến thành công cụ, phương tiện',
            'Nhân cách bị phiến diện hóa',
            'Mất ý nghĩa cuộc sống',
            'Sức khỏe thể chất, tinh thần suy kiệt',
          ],
          icon: '😔',
        },
        {
          id: 'xa-hoi-hq',
          title: 'Đối với xã hội',
          items: [
            'Phân hóa giàu nghèo ngày càng sâu sắc',
            'Xung đột giai cấp gay gắt',
            'Đạo đức, văn hóa bị suy thoái',
            'Quan hệ xã hội bị vật hóa, thực dụng',
            'Bất bình đẳng lan rộng',
          ],
          icon: '🌍',
        },
        {
          id: 'phat-trien',
          title: 'Đối với sự phát triển con người',
          items: [
            'Con người không phát triển toàn diện',
            'Năng lực sáng tạo bị kìm hãm',
            'Sự phát triển thiên lệch: vật chất ↑, tinh thần ↓',
            'Cản trở tiến bộ xã hội',
          ],
          icon: '📉',
        },
      ],
    },
  ],
  keywords: ['tha hóa', 'Entfremdung', 'lao động tha hóa', 'tư hữu', 'bóc lột', 'vật hóa', 'sản phẩm lao động', 'bản chất loài', 'phân công lao động'],
  flowchart: [
    { step: 1, label: 'Con người lao động', description: 'Con người tạo ra sản phẩm bằng sức lao động' },
    { step: 2, label: 'Sản phẩm tách khỏi', description: 'Sản phẩm bị nhà tư bản chiếm đoạt' },
    { step: 3, label: 'Trở thành lực lượng xa lạ', description: 'Sản phẩm trở thành tư bản, đối lập với người lao động' },
    { step: 4, label: 'Chi phối con người', description: 'Tư bản quay lại bóc lột, nô dịch chính người tạo ra nó' },
  ],
};

// ==========================================
// NỘI DUNG LÝ THUYẾT - GIẢI PHÓNG CON NGƯỜI
// ==========================================
export const GIAI_PHONG_CONTENT = {
  id: 'giai-phong',
  title: 'Vấn đề giải phóng con người',
  subtitle: 'Hành trình từ tha hóa đến tự do',
  intro: 'Giải phóng con người là mục tiêu cao nhất, sâu sắc nhất trong toàn bộ học thuyết Mác – Lênin. Đó không chỉ là giải phóng chính trị mà là giải phóng toàn diện.',
  sections: [
    {
      id: 'khai-niem-gp',
      title: 'Khái niệm giải phóng con người',
      subsections: [
        {
          id: 'dinh-nghia-gp',
          title: 'Định nghĩa',
          content: 'Giải phóng con người là quá trình xóa bỏ mọi hình thức áp bức, bóc lột, tha hóa, tạo điều kiện để con người phát triển tự do, toàn diện, trở thành chủ nhân đích thực của tự nhiên, xã hội và bản thân.',
        },
        {
          id: 'ban-chat-gp',
          title: 'Bản chất',
          content: 'Giải phóng con người, về bản chất, là trả lại cho con người bản chất đích thực — lao động tự do, sáng tạo; quan hệ người với người chân chính; sự phát triển toàn diện mọi năng lực.',
        },
        {
          id: 'muc-tieu',
          title: 'Mục tiêu',
          content: '"Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người" — đây là mục tiêu cao nhất mà Marx hướng tới.',
        },
      ],
    },
    {
      id: 'noi-dung-gp',
      title: 'Nội dung giải phóng con người',
      contents: [
        {
          id: 'gp-kinh-te',
          title: 'Giải phóng kinh tế',
          icon: '💹',
          content: 'Xóa bỏ chế độ bóc lột, thiết lập sở hữu công cộng về tư liệu sản xuất, phát triển lực lượng sản xuất đến trình độ cao.',
          details: [
            'Xóa bỏ bóc lột giá trị thặng dư',
            'Thiết lập chế độ công hữu về TLSX',
            'Phát triển lực lượng sản xuất mạnh mẽ',
            'Phân phối theo lao động → theo nhu cầu',
          ],
          color: '#10b981',
        },
        {
          id: 'gp-chinh-tri',
          title: 'Giải phóng chính trị',
          icon: '⚖️',
          content: 'Xóa bỏ áp bức giai cấp, xây dựng nhà nước thực sự của dân, do dân, vì dân; tiến tới xã hội không nhà nước.',
          details: [
            'Xóa bỏ nhà nước tư sản áp bức',
            'Thiết lập chuyên chính vô sản (giai đoạn quá độ)',
            'Xây dựng nền dân chủ thực sự',
            'Tiến tới nhà nước tự tiêu vong',
          ],
          color: '#3b82f6',
        },
        {
          id: 'gp-xa-hoi',
          title: 'Giải phóng xã hội',
          icon: '🤝',
          content: 'Xóa bỏ mọi hình thức phân biệt giai cấp, bất bình đẳng xã hội, xây dựng xã hội công bằng, bình đẳng, văn minh.',
          details: [
            'Xóa bỏ giai cấp và đối kháng giai cấp',
            'Bình đẳng nam nữ, giữa các dân tộc',
            'Đảm bảo phúc lợi xã hội cho mọi người',
            'Xây dựng quan hệ xã hội chân chính',
          ],
          color: '#8b5cf6',
        },
        {
          id: 'gp-toan-dien',
          title: 'Giải phóng con người toàn diện',
          icon: '✨',
          content: 'Con người được phát triển tự do, toàn diện mọi năng lực thể chất, trí tuệ, thẩm mỹ, đạo đức; lao động trở thành nhu cầu sống thay vì phương tiện kiếm sống.',
          details: [
            'Phát triển toàn diện: đức, trí, thể, mỹ',
            'Lao động trở thành nhu cầu tự thân',
            'Thời gian tự do cho phát triển cá nhân',
            'Khắc phục sự đối lập lao động trí óc – chân tay',
          ],
          color: '#f59e0b',
        },
      ],
    },
    {
      id: 'luc-luong',
      title: 'Lực lượng thực hiện giải phóng',
      forces: [
        {
          id: 'cong-nhan',
          title: 'Giai cấp công nhân',
          role: 'Lực lượng tiên phong, lãnh đạo',
          content: 'Giai cấp công nhân là giai cấp đại diện cho phương thức sản xuất tiên tiến, có lợi ích gắn liền với giải phóng toàn xã hội, có tính tổ chức kỷ luật cao.',
        },
        {
          id: 'nhan-dan',
          title: 'Quần chúng nhân dân',
          role: 'Lực lượng chủ yếu, đông đảo',
          content: 'Nhân dân lao động là lực lượng chủ yếu, đông đảo nhất, là chủ thể sáng tạo lịch sử. Cách mạng là sự nghiệp của quần chúng.',
        },
        {
          id: 'dang',
          title: 'Đảng Cộng sản',
          role: 'Đội tiên phong, lãnh đạo',
          content: 'Đảng Cộng sản — trang bị bởi lý luận Mác – Lênin — lãnh đạo, tổ chức, vạch đường lối đúng đắn cho phong trào cách mạng.',
        },
      ],
    },
    {
      id: 'con-duong',
      title: 'Con đường giải phóng',
      path: [
        {
          step: 1,
          title: 'Cách mạng xã hội',
          content: 'Thông qua cách mạng để lật đổ chế độ áp bức, bóc lột phản động.',
        },
        {
          step: 2,
          title: 'Xóa bỏ chế độ tư hữu',
          content: 'Xóa bỏ tư hữu tư liệu sản xuất — nguyên nhân gốc rễ của tha hóa.',
        },
        {
          step: 3,
          title: 'Xây dựng CNXH',
          content: 'Xây dựng CNXH, phát triển kinh tế, văn hóa, xã hội vì con người.',
        },
        {
          step: 4,
          title: 'Tiến lên CNCS',
          content: 'Chủ nghĩa cộng sản — xã hội mà mỗi người phát triển tự do, toàn diện.',
        },
      ],
    },
    {
      id: 'dieu-kien',
      title: 'Điều kiện giải phóng con người',
      conditions: [
        {
          id: 'dk-kinh-te',
          title: 'Kinh tế',
          content: 'Lực lượng sản xuất phát triển cao, năng suất lao động tăng, tạo dư thừa vật chất cho phát triển con người.',
          icon: '📊',
        },
        {
          id: 'dk-chinh-tri',
          title: 'Chính trị',
          content: 'Giai cấp công nhân giành được chính quyền, xây dựng nhà nước kiểu mới, nền dân chủ thực sự.',
          icon: '🏛️',
        },
        {
          id: 'dk-xa-hoi',
          title: 'Xã hội',
          content: 'Xóa bỏ giai cấp, xây dựng quan hệ xã hội bình đẳng, công bằng, nhân văn.',
          icon: '🤝',
        },
        {
          id: 'dk-con-nguoi',
          title: 'Con người',
          content: 'Nâng cao trình độ giác ngộ, năng lực hoạt động thực tiễn và sáng tạo của mỗi người.',
          icon: '🌱',
        },
      ],
    },
  ],
  keywords: ['giải phóng con người', 'giải phóng kinh tế', 'giải phóng chính trị', 'giải phóng xã hội', 'giai cấp công nhân', 'Đảng Cộng sản', 'cách mạng xã hội', 'CNXH', 'phát triển toàn diện'],
};

// ==========================================
// NỘI DUNG LÝ THUYẾT - Ý NGHĨA
// ==========================================
export const Y_NGHIA_CONTENT = {
  id: 'y-nghia',
  title: 'Ý nghĩa lý luận và thực tiễn',
  subtitle: 'Giá trị trường tồn của học thuyết',
  intro: 'Học thuyết Mác – Lênin về tha hóa và giải phóng con người không chỉ có ý nghĩa trong quá khứ mà vẫn sống động và thiết thực trong thời đại ngày nay.',
  sections: [
    {
      id: 'y-nghia-ly-luan',
      title: 'Ý nghĩa lý luận',
      items: [
        'Cung cấp thế giới quan, phương pháp luận khoa học để nhận thức đúng về bản chất con người',
        'Chỉ ra nguyên nhân gốc rễ (chế độ tư hữu) của mọi bất công, áp bức',
        'Vạch ra con đường và điều kiện để giải phóng con người thực sự',
        'Phê phán những quan điểm duy tâm, siêu hình, trừu tượng về con người',
        'Đặt nền tảng cho khoa học xã hội hiện đại nghiên cứu về con người',
      ],
      icon: '📚',
    },
    {
      id: 'y-nghia-thuc-tien',
      title: 'Ý nghĩa thực tiễn',
      items: [
        'Là kim chỉ nam cho các cuộc cách mạng giải phóng dân tộc, giai cấp trên thế giới',
        'Định hướng cho việc xây dựng chế độ xã hội chủ nghĩa',
        'Cơ sở để phê phán chủ nghĩa tư bản và các bất công đương đại',
        'Hướng dẫn xây dựng chính sách phát triển con người toàn diện',
        'Tiếp tục soi sáng cuộc đấu tranh vì công bằng, dân chủ, tiến bộ trên toàn thế giới',
      ],
      icon: '🌏',
    },
    {
      id: 'lien-he-vn',
      title: 'Liên hệ Việt Nam',
      items: [
        'Đảng Cộng sản Việt Nam vận dụng sáng tạo quan điểm Mác – Lênin vào con đường phát triển dân tộc',
        'Mục tiêu "dân giàu, nước mạnh, dân chủ, công bằng, văn minh" chính là cụ thể hóa giải phóng con người',
        'Kinh tế thị trường định hướng XHCN: kết hợp phát triển kinh tế với công bằng xã hội',
        'Chính sách giáo dục, y tế, an sinh xã hội hướng đến phát triển con người toàn diện',
        'Nhận diện và đấu tranh chống tham nhũng, tiêu cực — các biểu hiện tha hóa mới',
      ],
      icon: '🇻🇳',
    },
    {
      id: 'ung-dung',
      title: 'Ứng dụng trong đời sống hôm nay',
      items: [
        'Nhận diện các biểu hiện tha hóa trong xã hội hiện đại: nghiện mạng xã hội, sống ảo, chạy theo vật chất...',
        'Tìm lại ý nghĩa lao động sáng tạo thay vì chỉ "làm việc để kiếm tiền"',
        'Xây dựng mối quan hệ chân thành, không thực dụng',
        'Phát triển bản thân toàn diện: học tập, rèn luyện, cống hiến',
        'Tham gia tích cực vào xây dựng xã hội công bằng, tiến bộ',
      ],
      icon: '💡',
    },
  ],
  keywords: ['ý nghĩa lý luận', 'ý nghĩa thực tiễn', 'Việt Nam', 'kinh tế thị trường định hướng XHCN', 'phát triển con người toàn diện'],
};
