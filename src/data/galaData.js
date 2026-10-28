// src/data/galaData.js
/**
 * SOLFERA – D-DAY 2026 Event Information & Settings
 * Single Source of Truth for Solfera – D-DAY 2026 (YGC / AEP).
 * Note: Missing details cleanly fall back to "Đang cập nhật".
 */

export const GALA_EVENT = {
  name: "SOLFERA – D-DAY 2026",
  theme: "SOLFERA",
  tagline: "Đại sự kiện tôn vinh dấu ấn và kết nối thế hệ tài năng YGC / AEP",
  meaning: "SOLFERA – D-DAY 2026 là đại sự kiện thường niên trang trọng và giàu cảm xúc nhất của YGC / AEP. Đây là dịp nhìn lại hành trình cống hiến, tri ân những cựu thành viên đã đặt nền móng, vinh danh những cá nhân xuất sắc của mùa hoạt động vừa qua và thắt chặt tinh thần nhiệt huyết của đại gia đình YGC / AEP.",
  description: "Không gian nghệ thuật bùng nổ quy tụ hàng trăm thành viên, cựu thành viên cùng các vị khách quý và đối tác đồng hành. Nơi công nghệ và truyền thông hòa quyện trong từng khoảnh khắc điện ảnh thăng hoa.",

  schedule: {
    dateTime: null, // "Đang cập nhật"
    doorsOpen: null, // "Đang cập nhật"
    isoDate: null
  },

  venue: {
    name: null, // "Đang cập nhật"
    address: "Học viện Công nghệ Bưu chính Viễn thông (PTIT), Hà Nội",
    mapUrl: null
  },

  status: "REGISTRATION_OPEN",

  highlights: [
    {
      id: "honoring",
      number: "01",
      title: "Lễ Vinh Danh & Tri Ân Thế Hệ",
      description: "Khoảnh khắc trang trọng vinh danh các cá nhân, ban chuyên môn xuất sắc và gửi lời tri ân sâu sắc tới các thế hệ cựu thành viên đã đặt nền móng phát triển."
    },
    {
      id: "performance",
      number: "02",
      title: "Đại Nhạc Hội Sân Khấu Bùng Nổ",
      description: "Chuỗi tiết mục ca múa nhạc, nhảy hiện đại và biểu diễn nghệ thuật đặc sắc được dàn dựng công phu từ chính các ban thành viên và khách mời nghệ sĩ."
    },
    {
      id: "networking",
      number: "03",
      title: "Không Gian Kết Nối & Giao Lưu",
      description: "Tiệc trà nhẹ thân mật, nơi các thế hệ anh chị cựu thành viên chia sẻ kinh nghiệm sự nghiệp quý báu và truyền cảm hứng cho thế hệ trẻ."
    },
    {
      id: "exhibition",
      number: "04",
      title: "Không Gian Triển Lãm & Dấu Ấn",
      description: "Triển lãm ảnh và sản phẩm độc quyền, nhìn lại các chiến dịch truyền thông và các sản phẩm công nghệ tiêu biểu qua từng mùa hoạt động."
    }
  ],

  media: {
    poster: "/assets/images/solfera-poster.webp",
    heroVisual: "/assets/images/solfera-hero-visual.webp",
    hasPoster: true
  },

  organizerContact: {
    representative: "Ban Tổ Chức SOLFERA – D-DAY 2026 | YGC/AEP",
    hotline: "0988 123 456",
    email: "dday.ygc.aep@gmail.com",
    fanpageUrl: "https://facebook.com"
  },

  registrationSettings: {
    isOpen: true,
    deadline: null, // "Đang cập nhật"
    maxTicketsPerPerson: 1,
    attendeeTypes: [
      { id: "member", label: "Thành viên đương nhiệm (Active Member)" },
      { id: "alumni", label: "Cựu thành viên (Alumni)" },
      { id: "student", label: "Sinh viên / Khách tham dự tự do" },
      { id: "partner", label: "Đại diện CLB bạn / Đối tác khách mời" }
    ],
    discoveryChannels: [
      "Fanpage CLB YGC / AEP",
      "Bạn bè / Người quen giới thiệu",
      "Các Group sinh viên trường",
      "Bàn truyền thông trực tiếp tại sảnh",
      "Khác"
    ]
  }
};
