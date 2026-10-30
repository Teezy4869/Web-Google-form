// src/data/clubData.js
/**
 * YGC / AEP Club General Information & Brand Assets
 * Single Source of Truth for Organization identity, verified milestones, activities, and media configurations.
 */

export const CLUB_INFO = {
  name: "GYC",
  fullName: "GYC - Câu lạc bộ Thế hệ trẻ AEP",
  tagline: "Light up your way!",
  slogan: "Light up your way!",
  aboutTag: "About us",
  aboutTitle: "GYC - Câu lạc bộ Thế hệ trẻ AEP",
  description: "GYC tự hào là một trong những tổ chức sinh viên đi đầu Viện Đào tạo Tiên tiến, Chất lượng cao & POHE trong lĩnh vực Tổ chức sự kiện, Truyền thông Đa phương tiện và Phát triển nguồn nhân lực.",
  footerDescription: "Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao & POHE",
  
  // Verified Milestones & Numbers (Official Customer Revision - Page 4 & 5)
  stats: [
    { label: "Năm hoạt động & Phát triển", value: "14+" },
    { label: "Thành viên & Cựu thành viên", value: "600+" },
    { label: "Sự kiện đã tổ chức", value: "65+" },
    { label: "Đối tác & doanh nghiệp đồng hành", value: "60+" }
  ],

  // Official Core Values (Official Customer Revision - Page 6)
  coreValuesTitle: "Core values",
  coreValuesSubtitle: "Những giá trị cốt lõi GYC - Câu lạc bộ Thế hệ trẻ AEP hướng tới",
  pillars: [
    {
      id: "respect",
      title: "Tôn trọng",
      description: "Tôn trọng là nền tảng để mỗi thành viên GYC được lắng nghe, thấu hiểu và ghi nhận những giá trị riêng biệt, kiến tạo tập thể đoàn kết, cởi mở và gắn bó bền vững."
    },
    {
      id: "proactive",
      title: "Chủ động",
      description: "Chủ động là tinh thần sẵn sàng học hỏi, tìm kiếm cơ hội để hành động thúc đẩy tập thể năng động, sáng tạo và không ngừng phát triển."
    },
    {
      id: "responsibility",
      title: "Trách nhiệm",
      description: "Trách nhiệm không chỉ là hoàn thành nhiệm vụ, mà còn là sự tận tâm, nghiêm túc và cam kết với mục tiêu chung tạo nên tập thể đáng tin cậy, vững mạnh."
    },
    {
      id: "companionship",
      title: "Đồng hành",
      description: "Đồng hành là giá trị làm nên bản sắc “Gia đình – Yêu thương – Chia sẻ” của GYC, nơi mỗi thành viên luôn sẵn sàng hỗ trợ, tin tưởng, cùng học hỏi, cùng trưởng thành và cùng tạo nên những giá trị ý nghĩa."
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
    email: "dday26.gyc@gmail.com",
    hotline: "098 325 9655",
    hotlineTel: "0983259655",
    fanpageName: "GYC - Câu lạc bộ Thế hệ trẻ AEP",
    fanpageUrl: "https://www.facebook.com/gyc.aep?locale=vi_VN",
    address: "Hội trường A2, Tòa A2, Đại học Kinh tế Quốc dân, 207 Giải Phóng, Đồng Tâm, Hà Nội"
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
