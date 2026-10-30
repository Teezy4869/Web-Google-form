// src/data/galaData.js
/**
 * SOLFERA – D-DAY 2026 Event Information & Settings
 * Single Source of Truth for Solfera – D-DAY 2026 (Official Customer Revision - Pages 1-3).
 */

export const GALA_EVENT = {
  name: "D-DAY 2026: “SOLFERA”",
  officialEventName: "SOLFERA – D-DAY 2026",
  eventTitle: "Gala Night - Vòng Chung kết cuộc thi King & Queen D-DAY 2026",
  theme: "SOLFERA",
  seriesKicker: "CHUỖI SỰ KIỆN CHÀO SINH VIÊN",
  seriesTitle: "D-DAY 2026: “SOLFERA”",
  tagline: "Gala Night - Vòng Chung kết cuộc thi King & Queen D-DAY 2026",
  meaningHeading: "Ý nghĩa sự kiện",
  meaningStatement: "“Song of Triumph, Spark of Wisdom\"",
  meaningParagraph1: "Người trẻ mang trong mình ngọn lửa khát khao không bao giờ tắt - một trái tim đập nhịp cùng nghệ thuật và thơ ca. Mỗi bước đi của người trẻ là một tuyên ngôn kiêu hãnh: biến đam mê thành kiệt tác, biến tri thức thành hào quang, và tự tay viết nên một chương rực rỡ nhất của đời mình.",
  meaningParagraph2: "Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao & POHE. D-DAY 2026 sẽ kiến tạo một chân trời mới nơi các bạn tân sinh viên có thể tự do khám phá, trải nghiệm và phát huy tiềm năng của mình. Qua đó, thấm nhuần những giá trị cốt lõi làm nên bản sắc của bao thế hệ sinh viên AEP: năng động, sáng tạo, trẻ trung và nhiệt huyết.",
  meaning: "Người trẻ mang trong mình ngọn lửa khát khao không bao giờ tắt - một trái tim đập nhịp cùng nghệ thuật và thơ ca. Mỗi bước đi của người trẻ là một tuyên ngôn kiêu hãnh: biến đam mê thành kiệt tác, biến tri thức thành hào quang, và tự tay viết nên một chương rực rỡ nhất của đời mình.",
  description: "Không gian nghệ thuật đong đầy cảm xúc gửi gắm tới toàn bộ tân sinh viên AEP K68 nói riêng và sinh viên Đại học Kinh tế Quốc dân nói chung. Đêm nhạc hứa hẹn sẽ mang tới những màn trình diễn đầy ấn tượng của các cặp thí sinh cuộc thi King & Queen 2026 tài năng. Cùng với đó chính là sự xuất hiện bất ngờ của những vị Ca sĩ khách mời vô cùng đặc biệt.",

  // Official Event Timeline / Chuỗi sự kiện chính (Customer PDF Page 4)
  timeline: [
    {
      id: "teambuilding",
      title: "HOẠT ĐỘNG TEAM BUILDING",
      date: "18/10/2026"
    },
    {
      id: "king_queen",
      title: "CUỘC THI KING & QUEEN 2026",
      date: "16/09/2026 - 05/11/2026"
    },
    {
      id: "gala_night",
      title: "GALA NIGHT",
      date: "05/11/2026"
    }
  ],

  schedule: {
    dateTime: "18:30 Thứ Năm, ngày 05/11/2026",
    checkInTime: "18:00 - 18:30 Thứ Năm, ngày 05/11/2026",
    doorsOpen: "18:00 - 18:30 Thứ Năm, ngày 05/11/2026",
    isoDate: "2026-11-05T18:30:00+07:00"
  },

  venue: {
    name: "Hội trường A2, Tòa A2, Đại học Kinh tế Quốc dân",
    address: "207 Giải Phóng, Đồng Tâm, Hà Nội",
    fullLocation: "Hội trường A2, Tòa A2, Đại học Kinh tế Quốc dân, 207 Giải Phóng, Đồng Tâm, Hà Nội",
    mapUrl: "https://maps.google.com/?q=207+Giai+Phong+Dong+Tam+Hai+Ba+Trung+Ha+Noi"
  },

  status: "REGISTRATION_OPEN",

  media: {
    poster: "/assets/images/solfera-poster.webp",
    heroVisual: "/assets/images/solfera-hero-visual.webp",
    hasPoster: true
  },

  organizerContact: {
    representative: "Ban Tổ Chức GYC - Câu lạc bộ Thế hệ trẻ AEP",
    hotline: "098 325 9655",
    hotlineTel: "0983259655",
    email: "dday26.gyc@gmail.com",
    fanpageName: "GYC - Câu lạc bộ Thế hệ trẻ AEP",
    fanpageUrl: "https://www.facebook.com/gyc.aep?locale=vi_VN"
  },

  registrationSettings: {
    isOpen: true,
    deadline: null,
    maxTicketsPerPerson: 1,
    attendeeTypes: [
      { id: "member", label: "Thành viên đương nhiệm (Active Member)" },
      { id: "alumni", label: "Cựu thành viên (Alumni)" },
      { id: "student", label: "Sinh viên / Khách tham dự tự do" },
      { id: "partner", label: "Đại diện CLB bạn / Đối tác khách mời" }
    ],
    discoveryChannels: [
      "Fanpage CLB GYC / AEP",
      "Bạn bè / Người quen giới thiệu",
      "Các Group sinh viên trường",
      "Bàn truyền thông trực tiếp tại sảnh",
      "Khác"
    ]
  }
};
