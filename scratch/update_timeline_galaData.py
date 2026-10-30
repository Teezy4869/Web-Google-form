import sys

with open('src/data/galaData.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = '  description: "Không gian nghệ thuật đong đầy cảm xúc gửi gắm tới toàn bộ tân sinh viên AEP K68 nói riêng và sinh viên Đại học Kinh tế Quốc dân nói chung. Đêm nhạc hứa hẹn sẽ mang tới những màn trình diễn đầy ấn tượng của các cặp thí sinh cuộc thi King & Queen 2026 tài năng. Cùng với đó chính là sự xuất hiện bất ngờ của những vị Ca sĩ khách mời vô cùng đặc biệt.",'

replacement = target + """\n
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
      date: "16/10/2026 - 05/11/2026"
    },
    {
      id: "gala_night",
      title: "GALA NIGHT",
      date: "05/11/2026"
    }
  ],"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/data/galaData.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully added timeline to src/data/galaData.js")
else:
    print("ERROR: target not found in src/data/galaData.js")
    sys.exit(1)
