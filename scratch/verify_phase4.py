import sys, os, re

sys.stdout.reconfigure(encoding='utf-8')

print("=== VERIFYING PHASE 04 IMPLEMENTATION ===")
errors = []

# 1. Read galaData.js
with open('src/data/galaData.js', 'r', encoding='utf-8') as f:
    gala_data = f.read()

expected_timeline = [
    ("HOẠT ĐỘNG TEAM BUILDING", "18/10/2026"),
    ("CUỘC THI KING & QUEEN 2026", "16/10/2026 - 05/11/2026"),
    ("GALA NIGHT", "05/11/2026")
]

for title, date in expected_timeline:
    if title not in gala_data:
        errors.append(f"Missing timeline title '{title}' in galaData.js")
    else:
        print(f"✓ Found timeline title: '{title}'")
    if date not in gala_data:
        errors.append(f"Missing timeline date '{date}' in galaData.js")
    else:
        print(f"✓ Found timeline date: '{date}'")

# Check timeline item count in galaData.js
matches = re.findall(r'id:\s*["\'](\w+)["\'],\s*title:\s*["\']([^"\']+)["\'],\s*date:\s*["\']([^"\']+)["\']', gala_data)
if len(matches) != 3:
    errors.append(f"Expected exactly 3 timeline items in galaData.js, found {len(matches)}")
else:
    print(f"✓ Exactly 3 timeline items confirmed: {[m[1] for m in matches]}")

# 2. Read clubData.js
with open('src/data/clubData.js', 'r', encoding='utf-8') as f:
    club_data = f.read()

expected_stats = [
    ("14+", "Năm hoạt động & Phát triển"),
    ("600+", "Thành viên & Cựu thành viên"),
    ("65+", "Sự kiện đã tổ chức"),
    ("60+", "Đối tác & doanh nghiệp đồng hành")
]

for val, lbl in expected_stats:
    if val not in club_data:
        errors.append(f"Missing stat value '{val}' in clubData.js")
    else:
        print(f"✓ Found stat value: '{val}'")
    if lbl not in club_data:
        errors.append(f"Missing stat label '{lbl}' in clubData.js")
    else:
        print(f"✓ Found stat label: '{lbl}'")

# 3. Check GalaSection.jsx
with open('src/components/home/GalaSection.jsx', 'r', encoding='utf-8') as f:
    gala_section = f.read()

if 'GALA_EVENT.timeline.map' not in gala_section:
    errors.append("GalaSection.jsx does not map over GALA_EVENT.timeline")
else:
    print("✓ GalaSection maps over GALA_EVENT.timeline dynamically")

# Check stale items removed from GalaSection
stale_gala_items = ["Thắp Lửa Đam Mê", "Gắn Kết Thế Hệ"]
for item in stale_gala_items:
    if item in gala_section:
        errors.append(f"Stale item '{item}' still present in GalaSection.jsx")
    else:
        print(f"✓ Stale item '{item}' confirmed REMOVED from GalaSection.jsx")

# 4. Check AboutSection.jsx
with open('src/components/home/AboutSection.jsx', 'r', encoding='utf-8') as f:
    about_section = f.read()

if 'CLUB_INFO.stats.map' not in about_section:
    errors.append("AboutSection.jsx does not map over CLUB_INFO.stats")
else:
    print("✓ AboutSection maps over CLUB_INFO.stats dynamically")

# 5. Check no stale stat values in src/
stale_stats = ['9+ năm', '400+', '75+', '35+']
for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.js', '.jsx', '.json')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                c = f.read()
                for s in stale_stats:
                    if s in c:
                        errors.append(f"Stale stat value '{s}' found in {path}")

if not errors:
    print("\n🎉 ALL PHASE 04 ASSERTIONS PASSED SUCCESSFULLY!")
else:
    print("\n❌ PHASE 04 VERIFICATION FAILURES:")
    for err in errors:
        print(f"  - {err}")
    sys.exit(1)
