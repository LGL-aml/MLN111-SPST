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
    title: "KPI và kiệt sức (burnout)",
    description:
      "Công ty triển khai hệ thống KPI mới. Nếu bạn chấp nhận làm thêm ca đêm và nhận thêm đơn phụ, thu nhập sẽ tăng. Nhưng bạn gần như không còn thời gian cho bản thân, gia đình và cộng đồng.",
    context:
      "Tha hóa ngày nay không chỉ ở nhà máy mà còn trong guồng quay KPI: con người tự biến mình thành 'công cụ' để tồn tại. Đây là biểu hiện hiện đại của lao động bị cưỡng bức và máy móc hóa.",
    choiceA: {
      text: "Nhận thêm việc để tăng thu nhập",
      hint: "Tiền +12 | Tha hóa +15 | Tự do -10",
    },
    choiceB: {
      text: "Giảm ca, dành thời gian phục hồi và gắn kết",
      hint: "Tiền -8 | Tha hóa -10 | Tự do +12",
    },
    philosophicalNote:
      "Marx: khi lao động trở thành phương tiện sinh tồn thuần túy, đời sống người lao động bị thu hẹp về 'chức năng'.",
  },
  {
    id: 6,
    title: "Công đoàn và thương lượng tập thể",
    description:
      "Một nhóm công nhân đề nghị bạn tham gia tổ chức công đoàn cơ sở để thương lượng lương và giờ làm. Quản lý bóng gió rằng nếu bạn 'hợp tác' và báo danh sách người cầm đầu, bạn sẽ được thưởng và giữ vị trí ổn định.",
    context:
      "Quan hệ giữa người với người bị biến thành quan hệ lợi ích (tiền, thưởng, vị trí). Sự đoàn kết giai cấp là điều kiện để người lao động giành lại quyền làm chủ.",
    choiceA: {
      text: "Báo quản lý để đổi lấy thưởng và an toàn",
      hint: "Tiền +18 | Tha hóa +20 | Tự do -15",
    },
    choiceB: {
      text: "Tham gia công đoàn, thương lượng tập thể",
      hint: "Tiền -5 | Tha hóa -15 | Tự do +18",
    },
    philosophicalNote:
      "Lenin nhấn mạnh vai trò tổ chức: sức mạnh không chỉ ở ý chí cá nhân mà ở hành động tập thể có kỷ luật.",
  },
  {
    id: 7,
    title: "Hàng hóa và nhu cầu thật",
    description:
      "Bạn bị cuốn vào áp lực 'phải có' điện thoại mới để không bị tụt lại. Một khoản tín dụng tiêu dùng rất dễ vay, nhưng kéo theo gánh nợ và căng thẳng kéo dài.",
    context:
      "Đây là liên hệ với 'sùng bái hàng hóa': các quan hệ xã hội bị che khuất và thay thế bằng quan hệ với vật. Khi đời sống bị dẫn dắt bởi vật phẩm, tha hóa tăng còn tự do giảm.",
    choiceA: {
      text: "Vay mua đồ mới để 'giữ hình ảnh'",
      hint: "Tiền -15 | Tha hóa +10 | Tự do -5",
    },
    choiceB: {
      text: "Từ chối nợ xấu, đầu tư vào năng lực và cộng đồng",
      hint: "Tiền -5 | Tha hóa -10 | Tự do +15",
    },
    philosophicalNote:
      "Marx: khi vật (hàng hóa/tiền) thống trị con người, sản phẩm trở thành lực lượng đối lập với chính người tạo ra nó.",
  },
  {
    id: 8,
    title: "Hợp tác xã lao động",
    description:
      "Một nhóm bạn rủ bạn góp vốn nhỏ để lập hợp tác xã dịch vụ. Thu nhập ban đầu không cao và cần cùng nhau quản trị minh bạch. Trong khi đó, một công ty lớn mời bạn vào làm với lương tốt và quy trình chặt chẽ.",
    context:
      "Giải phóng con người không chỉ là ý thức mà còn là quan hệ sở hữu và tổ chức sản xuất. Mô hình hợp tác xã gợi mở hướng giảm tha hóa bằng sở hữu chung và quản trị dân chủ.",
    choiceA: {
      text: "Vào công ty lớn để có thu nhập ổn định",
      hint: "Tiền +20 | Tha hóa +10 | Tự do -10",
    },
    choiceB: {
      text: "Tham gia hợp tác xã, cùng làm chủ công việc",
      hint: "Tiền +5 | Tha hóa -15 | Tự do +20",
    },
    philosophicalNote:
      "Marx: mâu thuẫn cốt lõi là sản xuất xã hội hóa nhưng chiếm hữu tư nhân; thay đổi quan hệ sở hữu mở đường giảm tha hóa.",
  },
  {
    id: 9,
    title: "Tổ chức và đấu tranh chính trị",
    description:
      "Một phong trào đòi quyền lợi lao động lan rộng. Tham gia có thể khiến bạn bị gây khó dễ, giảm thu nhập ngắn hạn. Không tham gia, bạn vẫn có thể 'yên ổn' nhưng bất công tiếp diễn.",
    context:
      "Giải phóng không dừng ở đạo đức cá nhân mà là quá trình xã hội: thay đổi thiết chế và quan hệ quyền lực. Đây là bước chuyển từ chịu đựng sang hành động có ý thức.",
    choiceA: {
      text: "Giữ im lặng để tránh rủi ro",
      hint: "Tiền +10 | Tha hóa +10 | Tự do -5",
    },
    choiceB: {
      text: "Tham gia phong trào, cùng đòi thay đổi",
      hint: "Tiền -10 | Tha hóa -20 | Tự do +25",
    },
    philosophicalNote:
      "Lenin: ý thức tự phát không đủ; cần tổ chức và lý luận để biến bất mãn thành lực lượng thay đổi.",
  },
  {
    id: 10,
    title: "Bước nhảy tới giải phóng",
    description:
      "Xã hội đang ở một ngã rẽ lịch sử. Một phong trào đổi mới đang hình thành, đòi hỏi thay đổi cấu trúc sở hữu và phân phối. Tham gia có thể khiến bạn mất nhiều thứ trước mắt. Không tham gia, bạn giữ được sự ổn định nhưng mọi thứ vẫn như cũ.",
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
  effects: { money: number; alienation: number; freedom: number };
}

export const RANDOM_EVENTS_DISPLAY: Record<string, RandomEventDisplay> = {
  sickness: {
    id: "sickness",
    name: "Bệnh tật bất ngờ",
    description:
      "Bạn bị ốm nặng. Không có bảo hiểm y tế đầy đủ, chi phí điều trị rất cao.",
    icon: "🏥",
    effects: { money: -15, alienation: 0, freedom: 0 },
  },
  device_broken: {
    id: "device_broken",
    name: "Hỏng thiết bị",
    description:
      "Công cụ làm việc của bạn bị hỏng. Bạn phải tự bỏ tiền túi để sửa chữa hoặc thay mới.",
    icon: "🔧",
    effects: { money: -10, alienation: 0, freedom: 0 },
  },
};
