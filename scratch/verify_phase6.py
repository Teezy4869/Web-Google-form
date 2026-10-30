import sys, os

sys.stdout.reconfigure(encoding='utf-8')

print("=== VERIFYING PHASE 06 IMPLEMENTATION ===")
errors = []

# 1. Read galaData.js
with open('src/data/galaData.js', 'r', encoding='utf-8') as f:
    gala_data = f.read()

if "098 325 9655" not in gala_data:
    errors.append("Hotline '098 325 9655' missing from galaData.js")
else:
    print("✓ Hotline '098 325 9655' found in galaData.js")

if "dday26.gyc@gmail.com" not in gala_data:
    errors.append("Email 'dday26.gyc@gmail.com' missing from galaData.js")
else:
    print("✓ Email 'dday26.gyc@gmail.com' found in galaData.js")

if "GYC - Câu lạc bộ Thế hệ trẻ AEP" not in gala_data:
    errors.append("Fanpage name 'GYC - Câu lạc bộ Thế hệ trẻ AEP' missing from galaData.js")
else:
    print("✓ Fanpage name 'GYC - Câu lạc bộ Thế hệ trẻ AEP' found in galaData.js")

# 2. Read clubData.js
with open('src/data/clubData.js', 'r', encoding='utf-8') as f:
    club_data = f.read()

expected_footer_desc = "Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao & POHE"
if expected_footer_desc not in club_data:
    errors.append("footerDescription missing from clubData.js")
else:
    print("✓ footerDescription found in clubData.js")

if "098 325 9655" not in club_data:
    errors.append("Hotline missing from clubData.js")
else:
    print("✓ Hotline found in clubData.js")

if "dday26.gyc@gmail.com" not in club_data:
    errors.append("Email missing from clubData.js")
else:
    print("✓ Email found in clubData.js")

if "zalo.me" in club_data:
    errors.append("Stale 'zalo.me' link still found in clubData.js")
else:
    print("✓ Stale 'zalo.me' confirmed removed from clubData.js")

# 3. Read Footer.jsx
with open('src/components/common/Footer.jsx', 'r', encoding='utf-8') as f:
    footer_jsx = f.read()

if "Cộng Đồng Zalo" in footer_jsx:
    errors.append("Cộng Đồng Zalo button still in Footer.jsx!")
else:
    print("✓ 'Cộng Đồng Zalo' button confirmed REMOVED from Footer.jsx")

if "MessageCircle" in footer_jsx:
    errors.append("MessageCircle icon still imported in Footer.jsx!")
else:
    print("✓ MessageCircle icon confirmed REMOVED from Footer.jsx")

if "mailto:" not in footer_jsx:
    errors.append("mailto: link missing from Footer.jsx")
else:
    print("✓ mailto: link confirmed in Footer.jsx")

if "tel:" not in footer_jsx:
    errors.append("tel: link missing from Footer.jsx")
else:
    print("✓ tel: link confirmed in Footer.jsx")

# 4. Read RegisterPage.jsx
with open('src/pages/RegisterPage.jsx', 'r', encoding='utf-8') as f:
    register_jsx = f.read()

if "tel:" not in register_jsx:
    errors.append("tel: link missing from RegisterPage.jsx")
else:
    print("✓ tel: link confirmed in RegisterPage.jsx")

if "mailto:" not in register_jsx:
    errors.append("mailto: link missing from RegisterPage.jsx")
else:
    print("✓ mailto: link confirmed in RegisterPage.jsx")

# 5. Read AboutSection.jsx
with open('src/components/home/AboutSection.jsx', 'r', encoding='utf-8') as f:
    about_jsx = f.read()

stale_about_elements = [
    "Lĩnh Vực Hoạt Động",
    "Những Mảng Hoạt Động Kiến Tạo Dấu Ấn",
    "activity-list",
    "media_creative",
    "tech_software"
]

for el in stale_about_elements:
    if el in about_jsx:
        errors.append(f"Stale element '{el}' still in AboutSection.jsx!")
    else:
        print(f"✓ Stale element '{el}' confirmed REMOVED from AboutSection.jsx")

# 6. Check for stale contact numbers/emails in all src files
stale_items = [
    "0988 123 456",
    "0988123456",
    "dday.ygc.aep@gmail.com",
    "contact.ygc.aep@gmail.com",
    "Cộng Đồng Zalo"
]

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.js', '.jsx', '.json')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                c = f.read()
                for item in stale_items:
                    if item in c:
                        errors.append(f"Stale item '{item}' found in {path}")

if not errors:
    print("\n🎉 ALL PHASE 06 ASSERTIONS PASSED SUCCESSFULLY!")
else:
    print("\n❌ PHASE 06 VERIFICATION FAILURES:")
    for err in errors:
        print(f"  - {err}")
    sys.exit(1)

