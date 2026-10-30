import sys

with open('src/data/clubData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add footerDescription after description
desc_target = '  description: "GYC tự hào là một trong những tổ chức sinh viên đi đầu Viện Đào tạo Tiên tiến, Chất lượng cao & POHE trong lĩnh vực Tổ chức sự kiện, Truyền thông Đa phương tiện và Phát triển nguồn nhân lực.",'

desc_replacement = desc_target + '\n  footerDescription: "Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao & POHE",'

if desc_target in content:
    content = content.replace(desc_target, desc_replacement)
    print("Added footerDescription to clubData.js")
else:
    print("ERROR: desc_target not found")
    sys.exit(1)

# Update contact object and remove Zalo groupUrl
old_contact = """  contact: {
    email: "contact.ygc.aep@gmail.com",
    hotline: "0988 123 456",
    fanpageUrl: "https://facebook.com",
    groupUrl: "https://zalo.me",
    address: "Hội trường A2, Tòa A2, Đại học Kinh tế Quốc dân, 207 Giải Phóng, Đồng Tâm, Hà Nội"
  }"""

new_contact = """  contact: {
    email: "dday26.gyc@gmail.com",
    hotline: "098 325 9655",
    hotlineTel: "0983259655",
    fanpageName: "GYC - Câu lạc bộ Thế hệ trẻ AEP",
    fanpageUrl: "https://facebook.com",
    address: "Hội trường A2, Tòa A2, Đại học Kinh tế Quốc dân, 207 Giải Phóng, Đồng Tâm, Hà Nội"
  }"""

content_norm = content.replace('\r\n', '\n')
old_contact_norm = old_contact.replace('\r\n', '\n')
new_contact_norm = new_contact.replace('\r\n', '\n')

if old_contact_norm in content_norm:
    content_norm = content_norm.replace(old_contact_norm, new_contact_norm)
    if '\r\n' in content:
        content = content_norm.replace('\n', '\r\n')
    else:
        content = content_norm
    with open('src/data/clubData.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated contact in src/data/clubData.js")
else:
    print("ERROR: old_contact not found")
    sys.exit(1)

