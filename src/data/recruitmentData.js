// src/data/recruitmentData.js
// Source of truth for recruitment season content, departments, and form options

export const CLUB_INFO = {
  name: "TTV CLUB",
  fullName: "CLB Truyền Thông & Công Nghệ Trẻ (TTV_CLB)",
  season: "Mùa Tuyển Quân Mùa 9",
  tagline: "Khám phá tiềm năng — Bứt phá giới hạn",
  heroDescription: "Đơn đăng ký ứng tuyển thành viên CLB - Mùa 9. Nơi hội tụ những cá nhân đam mê sáng tạo, truyền thông và công nghệ để cùng nhau tạo nên những dấu ấn sinh viên rực rỡ.",
  stats: [
    { label: "Mùa tuyển quân đồng hành", value: "Gen 9" },
    { label: "Thành viên & Cựu thành viên", value: "400+" },
    { label: "Sự kiện & Dự án đã tổ chức", value: "75+" },
    { label: "Đối tác & Nhà tài trợ", value: "35+" }
  ],
  deadline: "2026-10-25T23:59:59", // ISO datetime for countdown
  contact: {
    email: "tuyendung.ttvclub@gmail.com",
    hotline: "0988 123 456 (Trưởng Ban Tuyển dụng)",
    fanpageUrl: "https://facebook.com",
    groupUrl: "https://zalo.me",
    address: "Học viện Công nghệ Bưu chính Viễn thông (PTIT), Hà Nội"
  }
};

export const RECRUITMENT_TIMELINE = [
  {
    step: "01",
    title: "Vòng 1: Đơn Đăng Ký (Application Form)",
    time: "03/10/2026 - 25/10/2026",
    status: "active",
    description: "Khám phá bản thân và thể hiện sự phù hợp với văn hóa CLB qua biểu mẫu ứng tuyển trực tuyến. Hãy tự tin chia sẻ góc nhìn và đam mê của bạn."
  },
  {
    step: "02",
    title: "Vòng 2: Phỏng Vấn & Đánh Giá Năng Lực",
    time: "28/10/2026 - 31/10/2026",
    status: "upcoming",
    description: "Buổi trò chuyện thân mật cùng Ban Chủ nhiệm và các Trưởng ban để hiểu sâu hơn về tính cách, tư duy giải quyết vấn đề và kỹ năng làm việc nhóm."
  },
  {
    step: "03",
    title: "Vòng 3: Onboarding & Lễ Kết Nạp Thành Viên",
    time: "05/11/2026",
    status: "upcoming",
    description: "Chào đón những mảnh ghép mới gia nhập đại gia đình TTV Mùa 9, tham gia chương trình đào tạo nội bộ và bắt tay vào những dự án thực chiến đầu tiên."
  }
];

export const DEPARTMENTS = [
  {
    id: "media_com",
    name: "Ban Truyền thông",
    shortDesc: "Lên chiến lược truyền thông tổng thể, định hình tiếng nói và lan tỏa hình ảnh của CLB đến cộng đồng sinh viên.",
    role: "Communication Planner, Social Media Manager",
    skills: [
      "Tư duy truyền thông nhạy bén, nắm bắt các xu hướng sinh viên",
      "Kỹ năng lập kế hoạch bài đăng, theo dõi tương tác và quản trị Fanpage",
      "Kỹ năng phối hợp liên ban nhịp nhàng"
    ],
    benefits: [
      "Trực tiếp quản trị các kênh truyền thông hàng chục nghìn lượt theo dõi",
      "Rèn luyện kỹ năng quản lý chiến dịch truyền thông đa kênh chuyên nghiệp"
    ],
    scenarioPrompt: "Nếu một chiến dịch truyền thông sắp tới ngày mở bán vé/đăng ký nhưng lượng tương tác ban đầu thấp hơn dự kiến 40%, bạn sẽ có những giải pháp cấp tốc nào?"
  },
  {
    id: "content",
    name: "Ban Nội dung",
    shortDesc: "Chắp bút cho những bài viết truyền cảm hứng, kịch bản chương trình, thông điệp truyền thông sâu sắc và cuốn hút.",
    role: "Content Creator, Copywriter, Scriptwriter",
    skills: [
      "Khả năng diễn đạt ngôn từ trôi chảy, hành văn sáng tạo và giàu cảm xúc",
      "Tư duy kể chuyện (Storytelling) và khả năng nghiên cứu đề tài sâu sắc",
      "Chỉn chu về ngữ pháp và chính tả"
    ],
    benefits: [
      "Nâng cao tư duy copywriting và kỹ năng viết kịch bản chuyên nghiệp",
      "Các bài viết được tiếp cận trực tiếp đến hàng nghìn sinh viên"
    ],
    scenarioPrompt: "Bạn sẽ làm thế nào để truyền tải một chủ đề học thuật hoặc công nghệ vốn khô khan thành một bài viết gần gũi, cuốn hút sinh viên?"
  },
  {
    id: "media_prod",
    name: "Ban Media",
    shortDesc: "Ghi lại những khoảnh khắc đắt giá qua lăng kính máy quay, sản xuất video phóng sự, recap và video ngắn viral.",
    role: "Photographer, Videographer, Video Editor",
    skills: [
      "Biết chụp ảnh hoặc quay video cơ bản (máy ảnh hoặc điện thoại chất lượng cao)",
      "Sử dụng các công cụ dựng video: CapCut, Premiere, After Effects",
      "Nhạy bén với góc máy, ánh sáng và nhịp điệu âm nhạc"
    ],
    benefits: [
      "Sử dụng và thực hành các trang thiết bị máy ảnh, ống kính chuyên dụng",
      "Xây dựng kho Portfolio sản phẩm hình ảnh và video chất lượng cao"
    ],
    scenarioPrompt: "Trong một sự kiện trực tiếp diễn ra rất nhanh và đông người, bạn làm thế nào để không bỏ lỡ các khoảnh khắc cảm xúc quan trọng của khách mời?"
  },
  {
    id: "design",
    name: "Ban Design",
    shortDesc: "Thổi hồn vào từng ấn phẩm truyền thông, bộ nhận diện sự kiện, key visual, infographic và ấn phẩm in ấn.",
    role: "Graphic Designer, UI/Visual Designer",
    skills: [
      "Sử dụng thành thạo Photoshop, Illustrator, Figma hoặc Canva nâng cao",
      "Tư duy thẩm mỹ tốt, nắm vững nguyên lý thị giác, màu sắc và typography",
      "Sáng tạo và tinh thần tiếp nhận góp ý chỉnh sửa tích cực"
    ],
    benefits: [
      "Sở hữu các ấn phẩm thiết kế thực tế xuất hiện trong các sự kiện lớn",
      "Được cọ xát với các đề bài thiết kế đa dạng từ digital đến in ấn"
    ],
    scenarioPrompt: "Nếu bản thiết kế Key Visual chính bị góp ý chưa làm nổi bật được thông điệp của sự kiện, bạn sẽ tiếp nhận và điều chỉnh ra sao?"
  },
  {
    id: "events",
    name: "Ban Sự kiện",
    shortDesc: "Bộ não tổ chức và linh hồn của các chương trình, workshop, cuộc thi và talkshow quy mô lớn của CLB.",
    role: "Event Planner, Stage Coordinator, Logistics Specialist",
    skills: [
      "Nhanh nhẹn, cẩn thận, có trách nhiệm và khả năng bao quát công việc",
      "Kỹ năng giao tiếp, hoạt náo và giải quyết tình huống phát sinh linh hoạt",
      "Thích ứng tốt với môi trường làm việc tốc độ cao"
    ],
    benefits: [
      "Trải nghiệm trọn vẹn quy trình tổ chức sự kiện từ khâu lên ý tưởng đến điều phối sân khấu",
      "Rèn luyện kỹ năng quản lý thời gian, quản trị rủi ro và làm việc nhóm dưới áp lực"
    ],
    scenarioPrompt: "Trong một sự kiện trực tiếp, diễn giả khách mời thông báo đến muộn 20 phút so với kịch bản, bạn sẽ xử lý khoảng thời gian trống này ra sao?"
  },
  {
    id: "hr",
    name: "Ban Nhân sự",
    shortDesc: "Chăm lo đời sống tinh thần, quản lý dữ liệu thành viên, tổ chức teambuilding nội bộ và gắn kết đại gia đình CLB.",
    role: "HR Specialist, Internal Culture Lead",
    skills: [
      "Tinh tế, biết lắng nghe, thấu hiểu tâm lý và gắn kết mọi người",
      "Kỹ năng quản lý dữ liệu, điểm danh và đánh giá hiệu quả thành viên",
      "Nhiệt huyết và đóng vai trò cầu nối nội bộ"
    ],
    benefits: [
      "Rèn luyện kỹ năng quản trị nhân sự, đánh giá hiệu suất và giải quyết mâu thuẫn",
      "Trở thành điểm tựa tinh thần được toàn bộ thành viên yêu quý và tin cậy"
    ],
    scenarioPrompt: "Nếu nhận thấy một thành viên mới trong ban có dấu hiệu ít tương tác và dần xa cách các buổi họp, bạn sẽ làm gì để hỗ trợ bạn ấy?"
  },
  {
    id: "finance",
    name: "Ban Tài chính",
    shortDesc: "Quản trị ngân sách dự án, dự trù chi phí sự kiện, thu chi minh bạch và tìm kiếm các nguồn lực tài trợ bền vững.",
    role: "Financial Analyst, Budget Controller, Sponsorship Coordinator",
    skills: [
      "Cẩn thận, tỉ mỉ, trung thực và có trách nhiệm cao với các con số",
      "Kỹ năng sử dụng Excel / Google Sheets quản lý thu chi",
      "Tư duy đàm phán và tối ưu hóa chi phí vận hành"
    ],
    benefits: [
      "Học hỏi kỹ năng quản lý dòng tiền dự án thực tế chuẩn chỉ",
      "Tự tin hơn trong kỹ năng lập kế hoạch tài chính và đàm phán hợp đồng"
    ],
    scenarioPrompt: "Khi lên dự toán cho một sự kiện lớn nhưng ngân sách dự kiến bị vượt quá 20% so với trần cho phép, bạn sẽ đề xuất cắt giảm hoặc tối ưu từ những hạng mục nào?"
  }
];

export const DEPARTMENT_OPTIONS = [
  "Ban Sự kiện",
  "Ban Nội dung",
  "Ban Tài chính",
  "Ban Nhân sự",
  "Ban Truyền thông",
  "Ban Media",
  "Ban Design"
];

export const SECONDARY_DEPARTMENT_OPTIONS = [
  "Không có nguyện vọng 2",
  ...DEPARTMENT_OPTIONS
];

export const TIME_COMMITMENT_OPTIONS = [
  "Dưới 5 giờ/tuần",
  "Từ 5 - 10 giờ/tuần",
  "Trên 10 giờ/tuần",
  "Linh hoạt theo kế hoạch dự án"
];

export const DISCOVERY_CHANNELS = [
  "Fanpage CLB",
  "Bạn bè/Người quen giới thiệu",
  "Các Group sinh viên",
  "Bàn trực Offline tại sảnh trường",
  "Khác"
];

export const COMMITMENT_TEXT = "Tôi xác nhận thông tin trên là chính xác và cam kết tuân thủ các quy định của CLB.";

export const FAQS = [
  {
    question: "Sinh viên năm mấy có thể tham gia ứng tuyển vào CLB?",
    answer: "Đợt tuyển quân mở rộng cho toàn bộ sinh viên, đặc biệt ưu tiên các bạn sinh viên năm nhất và năm hai có tinh thần học hỏi, nhiệt huyết và mong muốn gắn bó lâu dài."
  },
  {
    question: "Mình chưa có nhiều kinh nghiệm chuyên môn thì có cơ hội trúng tuyển không?",
    answer: "Chắc chắn có! TTV_CLB đánh giá cao nhất sự nhiệt tình, tính chủ động và tinh thần sẵn sàng học hỏi. CLB luôn có lộ trình đào tạo nội bộ bài bản cho thành viên mới sau khi gia nhập."
  },
  {
    question: "Mình có thể đăng ký đồng thời 2 Ban được không?",
    answer: "Bạn hoàn toàn có thể đăng ký Nguyện vọng 1 (Ban ưu tiên nhất) và Nguyện vọng 2 (Ban dự phòng). Nếu không vượt qua vòng tuyển của NV1, hồ sơ của bạn sẽ được chuyển sang xét duyệt tại NV2."
  },
  {
    question: "Hình thức phỏng vấn vòng 2 sẽ diễn ra như thế nào?",
    answer: "Buổi phỏng vấn được tổ chức trực tiếp tại trường trong không khí cởi mở, thân thiện nhằm lắng nghe định hướng của bạn và chia sẻ rõ hơn về văn hóa hoạt động của CLB."
  },
  {
    question: "Sau khi nộp đơn, bao lâu mình sẽ nhận được kết quả?",
    answer: "Email thông báo kết quả Vòng 1 và thư mời tham dự Vòng 2 sẽ được gửi đến hòm thư của bạn sau 48 - 72 giờ kể từ thời điểm đóng đơn."
  }
];
