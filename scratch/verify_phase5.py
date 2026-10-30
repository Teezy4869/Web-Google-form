import sys, os

sys.stdout.reconfigure(encoding='utf-8')

print("=== VERIFYING PHASE 05 IMPLEMENTATION ===")
errors = []

# 1. Read clubData.js
with open('src/data/clubData.js', 'r', encoding='utf-8') as f:
    club_data = f.read()

# Check About Us fields
expected_about = [
    "GYC - Câu lạc bộ Thế hệ trẻ AEP",
    "Light up your way!",
    "GYC tự hào là một trong những tổ chức sinh viên đi đầu Viện Đào tạo Tiên tiến, Chất lượng cao & POHE trong lĩnh vực Tổ chức sự kiện, Truyền thông Đa phương tiện và Phát triển nguồn nhân lực."
]

for text in expected_about:
    if text not in club_data:
        errors.append(f"Missing expected About Us text in clubData.js: '{text}'")
    else:
        print(f"✓ Found About Us text in clubData.js: '{text[:60]}...'")

# Check Core Values in clubData.js
expected_values = [
    ("Tôn trọng", "Tôn trọng là nền tảng để mỗi thành viên GYC được lắng nghe, thấu hiểu và ghi nhận những giá trị riêng biệt, kiến tạo tập thể đoàn kết, cởi mở và gắn bó bền vững."),
    ("Chủ động", "Chủ động là tinh thần sẵn sàng học hỏi, tìm kiếm cơ hội để hành động thúc đẩy tập thể năng động, sáng tạo và không ngừng phát triển."),
    ("Trách nhiệm", "Trách nhiệm không chỉ là hoàn thành nhiệm vụ, mà còn là sự tận tâm, nghiêm túc và cam kết với mục tiêu chung tạo nên tập thể đáng tin cậy, vững mạnh."),
    ("Đồng hành", "Đồng hành là giá trị làm nên bản sắc “Gia đình – Yêu thương – Chia sẻ” của GYC, nơi mỗi thành viên luôn sẵn sàng hỗ trợ, tin tưởng, cùng học hỏi, cùng trưởng thành và cùng tạo nên những giá trị ý nghĩa.")
]

for title, desc in expected_values:
    if title not in club_data:
        errors.append(f"Missing Core Value title in clubData.js: '{title}'")
    else:
        print(f"✓ Found Core Value title: '{title}'")
    if desc not in club_data:
        errors.append(f"Missing Core Value description in clubData.js for '{title}'")
    else:
        print(f"✓ Found Core Value description for '{title}'")

# Check removal of old pillar titles from clubData.js pillars
old_pillars = ["Thực Chiến & Ứng Dụng", "Gắn Kết & Sẻ Chia", "Phát Triển Toàn Diện", "Mạng Lưới Kết Nối"]
for old in old_pillars:
    if f'"{old}"' in club_data:
        errors.append(f"Stale pillar title '{old}' still present in clubData.js")
    else:
        print(f"✓ Stale pillar '{old}' confirmed removed from clubData.js")

# 2. Check AboutSection.jsx
with open('src/components/home/AboutSection.jsx', 'r', encoding='utf-8') as f:
    about_jsx = f.read()

# Check Mission section removal
if 'mission-spotlight-card' in about_jsx:
    errors.append("mission-spotlight-card still present in AboutSection.jsx!")
else:
    print("✓ mission-spotlight-card confirmed REMOVED from AboutSection.jsx")

if 'Sứ Mệnh Cốt Lõi' in about_jsx:
    errors.append("'Sứ Mệnh Cốt Lõi' still present in AboutSection.jsx!")
else:
    print("✓ 'Sứ Mệnh Cốt Lõi' confirmed REMOVED from AboutSection.jsx")

if 'Bệ Phóng Vững Chắc Cho Khát Vọng Tuổi Trẻ' in about_jsx:
    errors.append("'Bệ Phóng Vững Chắc Cho Khát Vọng Tuổi Trẻ' still present in AboutSection.jsx!")
else:
    print("✓ Obsolete Mission title confirmed REMOVED from AboutSection.jsx")

# Check About Us header elements
if 'About us' not in about_jsx:
    errors.append("Tag 'About us' not found in AboutSection.jsx")
else:
    print("✓ Tag 'About us' found in AboutSection.jsx")

if 'Light up your way!' not in about_jsx:
    errors.append("Slogan 'Light up your way!' not found in AboutSection.jsx")
else:
    print("✓ Slogan 'Light up your way!' found in AboutSection.jsx")

# Check Core Values subtitle in AboutSection.jsx
if 'Những giá trị cốt lõi' not in about_jsx or 'hướng tới' not in about_jsx:
    errors.append("Core Values subtitle missing from AboutSection.jsx")
else:
    print("✓ Core Values subtitle found in AboutSection.jsx")

if not errors:
    print("\n🎉 ALL PHASE 05 ASSERTIONS PASSED SUCCESSFULLY!")
else:
    print("\n❌ PHASE 05 VERIFICATION FAILURES:")
    for err in errors:
        print(f"  - {err}")
    sys.exit(1)

