import sys

with open('src/data/clubData.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_stats = """  // Verified Milestones & Numbers
  stats: [
    { label: "Năm hoạt động & phát triển", value: "9+ năm" },
    { label: "Thành viên & Cựu thành viên", value: "400+" },
    { label: "Sự kiện & Dự án đã tổ chức", value: "75+" },
    { label: "Đối tác & Doanh nghiệp đồng hành", value: "35+" }
  ],"""

new_stats = """  // Verified Milestones & Numbers (Official Customer Revision - Page 4 & 5)
  stats: [
    { label: "Năm hoạt động & Phát triển", value: "14+" },
    { label: "Thành viên & Cựu thành viên", value: "600+" },
    { label: "Sự kiện đã tổ chức", value: "65+" },
    { label: "Đối tác & doanh nghiệp đồng hành", value: "60+" }
  ],"""

# Normalize CRLF/LF for replacement
if old_stats.replace('\r\n', '\n') in content.replace('\r\n', '\n'):
    # Detect line ending
    newline = '\r\n' if '\r\n' in content else '\n'
    content = content.replace('\r\n', '\n')
    content = content.replace(old_stats.replace('\r\n', '\n'), new_stats.replace('\r\n', '\n'))
    if newline == '\r\n':
        content = content.replace('\n', '\r\n')
    with open('src/data/clubData.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated stats in src/data/clubData.js")
else:
    print("ERROR: old_stats not found in src/data/clubData.js")
    sys.exit(1)
