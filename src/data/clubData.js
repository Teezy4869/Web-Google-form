// src/data/clubData.js
/**
 * YGC / AEP Club General Information & Brand Assets
 * Single Source of Truth for Organization identity, verified milestones, activities, and media configurations.
 */

export const CLUB_INFO = {
  name: "YGC / AEP",
  fullName: "CLB Truyền Thông & Công Nghệ Trẻ — YGC / AEP",
  tagline: "Khám phá tiềm năng — Bứt phá giới hạn",
  mission: "Ươm mầm và phát triển thế hệ trẻ đam mê công nghệ và truyền thông số; kiến tạo môi trường thực chiến chuyên nghiệp, kết nối cộng đồng và tạo ra những sản phẩm, sự kiện có sức ảnh hưởng tích cực.",
  description: "Được thành lập từ niềm đam mê chung của thế hệ sinh viên trẻ, YGC / AEP là cái nôi kết nối hai lĩnh vực tiên phong: Truyền thông sáng tạo và Công nghệ thông tin. Nơi các thành viên được trực tiếp tham gia xây dựng các dự án thực tế, làm chủ công nghệ mới và lưu giữ những dấu ấn thanh xuân rực rỡ.",
  
  // Verified Milestones & Numbers
  stats: [
    { label: "Năm hoạt động & phát triển", value: "9+ năm" },
    { label: "Thành viên & Cựu thành viên", value: "400+" },
    { label: "Sự kiện & Dự án đã tổ chức", value: "75+" },
    { label: "Đối tác & Doanh nghiệp đồng hành", value: "35+" }
  ],

  // 4 Core Cultural & Strategic Pillars
  pillars: [
    {
      id: "practical",
      title: "Thực Chiến & Ứng Dụng",
      description: "Trải nghiệm các dự án thực tế ngay từ những ngày đầu. Không lý thuyết suông, thành viên được trực tiếp bắt tay vào xây dựng sản phẩm và điều hành sự kiện quy mô lớn."
    },
    {
      id: "solidarity",
      title: "Gắn Kết & Sẻ Chia",
      description: "Văn hóa cởi mở, tôn trọng cá tính và luôn hỗ trợ lẫn nhau. Nơi những buổi dã ngoại, sinh hoạt chung và tâm sự đêm muộn trở thành những kỷ niệm thanh xuân không thể quên."
    },
    {
      id: "growth",
      title: "Phát Triển Toàn Diện",
      description: "Rèn luyện song hành cả kỹ năng chuyên môn sâu và kỹ năng mềm quan trọng: tư duy phản biện, kỹ năng lãnh đạo, giải quyết vấn đề và quản trị thời gian."
    },
    {
      id: "network",
      title: "Mạng Lưới Kết Nối",
      description: "Mạng lưới cựu thành viên thành đạt đang công tác tại các tập đoàn hàng đầu, mở ra cơ hội giao lưu, học hỏi và kết nối sự nghiệp bền vững."
    }
  ],

  // Key Activity Domains
  activities: [
    {
      id: "media_creative",
      title: "Truyền Thông & Sáng Tạo Nội Dung",
      category: "Lĩnh vực chuyên môn",
      description: "Lên chiến lược truyền thông đa kênh, sản xuất video viral, chụp ảnh phóng sự sự kiện và thiết kế bộ nhận diện thương hiệu số.",
      highlights: ["Quản trị kênh mạng xã hội hàng chục nghìn lượt theo dõi", "Sản xuất ấn phẩm Visual & Key Visual chuyên nghiệp"],
      imagePlaceholder: "[Placeholder: Hình ảnh hoạt động ban Truyền thông & Media]"
    },
    {
      id: "tech_software",
      title: "Công Nghệ & Giải Pháp Phần Mềm",
      category: "Lĩnh vực kỹ thuật",
      description: "Nghiên cứu công nghệ web hiện đại, phát triển hệ thống biểu mẫu, ứng dụng quản trị dữ liệu và các nền tảng trực tuyến hỗ trợ sự kiện.",
      highlights: ["Ứng dụng React, Vite và các công nghệ web tiên tiến", "Hệ thống quản lý check-in và số hóa vận hành sự kiện"],
      imagePlaceholder: "[Placeholder: Hình ảnh đội ngũ Kỹ thuật & Lập trình]"
    },
    {
      id: "event_staging",
      title: "Tổ Chức Sự Kiện & Đại Nhạc Hội",
      category: "Vận hành & Sân khấu",
      description: "Quy trình tổ chức chuyên nghiệp từ khâu lên kịch bản, âm thanh, ánh sáng, quản trị rủi ro đến điều phối hàng trăm khán giả trực tiếp.",
      highlights: ["Các chương trình giao lưu, workshop học thuật và đại nhạc hội", "Kinh nghiệm điều hành sân khấu thực tế"],
      imagePlaceholder: "[Placeholder: Hình ảnh sân khấu sự kiện trực tiếp]"
    },
    {
      id: "community_bonding",
      title: "Văn Hóa Gắn Kết & Teambuilding",
      category: "Đời sống thành viên",
      description: "Các chuyến đi dã ngoại, sinh nhật CLB và chuỗi hoạt động gắn kết nội bộ giúp các thế hệ thành viên luôn đồng lòng và yêu thương như gia đình.",
      highlights: ["Môi trường sinh viên thân thiện, tích cực và tràn đầy năng lượng", "Tôn trọng sự đa dạng và phát triển từng cá nhân"],
      imagePlaceholder: "[Placeholder: Hình ảnh teambuilding đại gia đình YGC / AEP]"
    }
  ],

  contact: {
    email: "contact.ygc.aep@gmail.com",
    hotline: "0988 123 456",
    fanpageUrl: "https://facebook.com",
    groupUrl: "https://zalo.me",
    address: "Học viện Công nghệ Bưu chính Viễn thông (PTIT), Hà Nội"
  }
};

/**
 * Media Source Configuration for Solfera / Hero
 */
export const CLUB_MEDIA = {
  heroVisual: {
    src: "/assets/images/solfera-hero-visual.webp",
    poster: "/assets/images/solfera-poster.webp",
    alt: "Solfera – D-DAY 2026 Key Visual Chính Thức"
  },
  logo: {
    src: "/assets/images/solfera-logo.webp",
    alt: "Solfera – D-DAY 2026 Logo"
  },
  coverBanner: {
    src: "/assets/images/solfera-cover-banner.webp",
    alt: "Solfera – D-DAY 2026 Cover Banner"
  }
};
