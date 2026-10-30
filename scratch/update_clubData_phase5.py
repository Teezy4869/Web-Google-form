import sys

with open('src/data/clubData.js', 'r', encoding='utf-8') as f:
    content = f.read()

target_block = """export const CLUB_INFO = {
  name: "YGC / AEP",
  fullName: "CLB Truyền Thông & Công Nghệ Trẻ — YGC / AEP",
  tagline: "Khám phá tiềm năng — Bứt phá giới hạn",
  mission: "Ươm mầm và phát triển thế hệ trẻ đam mê công nghệ và truyền thông số; kiến tạo môi trường thực chiến chuyên nghiệp, kết nối cộng đồng và tạo ra những sản phẩm, sự kiện có sức ảnh hưởng tích cực.",
  description: "Được thành lập từ niềm đam mê chung của thế hệ sinh viên trẻ, YGC / AEP là cái nôi kết nối hai lĩnh vực tiên phong: Truyền thông sáng tạo và Công nghệ thông tin. Nơi các thành viên được trực tiếp tham gia xây dựng các dự án thực tế, làm chủ công nghệ mới và lưu giữ những dấu ấn thanh xuân rực rỡ.",
  
  // Verified Milestones & Numbers (Official Customer Revision - Page 4 & 5)
  stats: [
    { label: "Năm hoạt động & Phát triển", value: "14+" },
    { label: "Thành viên & Cựu thành viên", value: "600+" },
    { label: "Sự kiện đã tổ chức", value: "65+" },
    { label: "Đối tác & doanh nghiệp đồng hành", value: "60+" }
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
  ],"""

replacement_block = """export const CLUB_INFO = {
  name: "GYC",
  fullName: "GYC - Câu lạc bộ Thế hệ trẻ AEP",
  tagline: "Light up your way!",
  slogan: "Light up your way!",
  aboutTag: "About us",
  aboutTitle: "GYC - Câu lạc bộ Thế hệ trẻ AEP",
  description: "GYC tự hào là một trong những tổ chức sinh viên đi đầu Viện Đào tạo Tiên tiến, Chất lượng cao & POHE trong lĩnh vực Tổ chức sự kiện, Truyền thông Đa phương tiện và Phát triển nguồn nhân lực.",
  
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
  ],"""

content_norm = content.replace('\r\n', '\n')
target_norm = target_block.replace('\r\n', '\n')
replacement_norm = replacement_block.replace('\r\n', '\n')

if target_norm in content_norm:
    content_norm = content_norm.replace(target_norm, replacement_norm)
    if '\r\n' in content:
        content = content_norm.replace('\n', '\r\n')
    else:
        content = content_norm
    with open('src/data/clubData.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated CLUB_INFO in src/data/clubData.js")
else:
    print("ERROR: target_block not found in src/data/clubData.js")
    sys.exit(1)

