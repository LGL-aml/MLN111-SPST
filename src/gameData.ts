export interface ScenarioDisplay {
  id: number;
  title: string;
  description: string;
  context: string;
  choiceA: { text: string; hint: string };
  choiceB: { text: string; hint: string };
  philosophicalNote: string;
}

export const SCENARIOS: ScenarioDisplay[] = [
  {
    id: 1,
    title: "Lao động trong nhà máy",
    description:
      "Bạn là một công nhân trong nhà máy sản xuất lớn. Mỗi ngày, bạn phải đứng máy 10 tiếng đồng hồ. Quản đốc vừa thông báo: tăng ca thêm 4 tiếng mỗi ngày trong tháng này để kịp đơn hàng xuất khẩu. Lương tăng ca sẽ được trả gấp 1.5 lần.",
    context:
      "Tình huống phản ánh hiện tượng lao động bị tha hóa: con người trở thành phụ tùng của máy móc, lao động không còn là hoạt động tự do mà là phương tiện sinh tồn.",
    choiceA: {
      text: "Chấp nhận tăng ca để kiếm thêm tiền",
      hint: "Tiền +15 | Tha hóa +10 | Tự do -5",
    },
    choiceB: {
      text: "Từ chối và vận động công nhân đòi quyền lợi",
      hint: "Tiền -5 | Tha hóa -5 | Tự do +10",
    },
    philosophicalNote:
      "Marx: 'Lao động tha hóa biến hoạt động sống của con người thành phương tiện duy trì sự tồn tại thể xác.'",
  },
  {
    id: 2,
    title: "Cơ hội thăng tiến",
    description:
      "Công ty đề xuất bạn lên vị trí quản lý tầng trung. Lương tăng gấp đôi, nhưng nhiệm vụ chính là giám sát và thúc ép đồng nghiệp cũ làm việc hiệu quả hơn. Bạn sẽ trở thành người thực thi kỷ luật lao động.",
    context:
      "Phản ánh sự phân hóa giai cấp trong chính nội bộ người lao động. Khi chấp nhận vai trò quản lý, bạn chuyển từ người bị bóc lột sang người thực thi sự bóc lột.",
    choiceA: {
      text: "Nhận chức quản lý, kiếm thêm thu nhập",
      hint: "Tiền +20 | Tha hóa +15 | Tự do -10",
    },
    choiceB: {
      text: "Từ chối, cùng đồng nghiệp xây dựng hợp tác xã",
      hint: "Tiền -10 | Tha hóa -10 | Tự do +15",
    },
    philosophicalNote:
      "Marx: 'Giai cấp tư sản không chỉ đã rèn những vũ khí sẽ giết mình mà còn tạo ra những người sử dụng vũ khí ấy.'",
  },
  {
    id: 3,
    title: "Giáo dục hay lao động?",
    description:
      "Một trung tâm giáo dục miễn phí mở cửa gần nơi bạn sống, dạy về quyền lao động, tư duy phản biện và kinh tế hợp tác. Nhưng tham gia nghĩa là phải nghỉ làm thêm 2 buổi/tuần, mất đi nguồn thu nhập phụ.",
    context:
      "Tri thức là điều kiện tiên quyết để giải phóng, nhưng người lao động lại thiếu thời gian và điều kiện tiếp cận. Đây là vòng xoáy tha hóa: càng lao động nhiều, càng ít cơ hội học hỏi.",
    choiceA: {
      text: "Bỏ qua, tiếp tục làm thêm kiếm tiền",
      hint: "Tiền +10 | Tha hóa +10 | Tự do -5",
    },
    choiceB: {
      text: "Tham gia học tập, đầu tư cho nhận thức",
      hint: "Tiền -10 | Tha hóa -10 | Tự do +15",
    },
    philosophicalNote:
      "Lenin: 'Không có lý luận cách mạng thì không có phong trào cách mạng.'",
  },
  {
    id: 4,
    title: "Khủng hoảng kinh tế",
    description:
      "Suy thoái kinh tế ập đến. Nhà máy cắt giảm 30% nhân sự. Vật giá leo thang. Cộng đồng xung quanh đang kiệt quệ. Bạn còn chút tiền tích lũy và phải đưa ra quyết định.",
    context:
      "Khủng hoảng kinh tế bộc lộ mâu thuẫn của chủ nghĩa tư bản: sản xuất xã hội hóa nhưng chiếm hữu tư nhân. Đây là lúc tình đoàn kết giai cấp được thử thách.",
    choiceA: {
      text: "Tích trữ tài nguyên, bảo vệ bản thân trước",
      hint: "Tiền +5 | Tha hóa +20 | Tự do -15",
    },
    choiceB: {
      text: "Chia sẻ tài nguyên, xây dựng liên đới cộng đồng",
      hint: "Tiền -15 | Tha hóa -10 | Tự do +25",
    },
    philosophicalNote:
      "Marx: 'Lịch sử không làm gì cả... Chính con người thực tại, sống động mới làm tất cả.'",
  },
  {
    id: 5,
    title: "Con đường cuối cùng",
    description:
      "Xã hội đang ở ngã rẽ lịch sử. Một phong trào đổi mới đang hình thành, đòi hỏi thay đổi cấu trúc sở hữu và phân phối. Tham gia có thể mất tất cả những gì bạn tích lũy. Không tham gia, bạn giữ được sự ổn định nhưng mọi thứ vẫn như cũ.",
    context:
      "Đây là lựa chọn giữa duy trì trật tự cũ hay đấu tranh cho một xã hội mới. Marx gọi đây là bước nhảy từ 'vương quốc của tất yếu' sang 'vương quốc của tự do'.",
    choiceA: {
      text: "Thỏa hiệp với hệ thống, giữ vị trí an toàn",
      hint: "Tiền +25 | Tha hóa +25 | Tự do -20",
    },
    choiceB: {
      text: "Tham gia phong trào đổi mới xã hội",
      hint: "Tiền -10 | Tha hóa -20 | Tự do +30",
    },
    philosophicalNote:
      "Marx & Engels: 'Những người vô sản không có gì để mất ngoài xiềng xích. Họ có cả một thế giới để giành lấy.'",
  },
];

export interface RandomEventDisplay {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const RANDOM_EVENTS_DISPLAY: Record<string, RandomEventDisplay> = {
  sickness: {
    id: "sickness",
    name: "Bệnh tật bất ngờ",
    description:
      "Bạn bị ốm nặng. Không có bảo hiểm y tế đầy đủ, chi phí điều trị rất cao.",
    icon: "🏥",
  },
  device_broken: {
    id: "device_broken",
    name: "Hỏng thiết bị",
    description:
      "Công cụ làm việc của bạn bị hỏng. Bạn phải tự bỏ tiền túi để sửa chữa hoặc thay mới.",
    icon: "🔧",
  },
};
