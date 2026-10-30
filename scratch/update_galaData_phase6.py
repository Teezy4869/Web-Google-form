import sys

with open('src/data/galaData.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_block = """  organizerContact: {
    representative: "Ban Tổ Chức GYC - Câu lạc bộ Thế hệ trẻ AEP",
    hotline: "0988 123 456",
    email: "dday.ygc.aep@gmail.com",
    fanpageUrl: "https://facebook.com"
  },"""

new_block = """  organizerContact: {
    representative: "Ban Tổ Chức GYC - Câu lạc bộ Thế hệ trẻ AEP",
    hotline: "098 325 9655",
    hotlineTel: "0983259655",
    email: "dday26.gyc@gmail.com",
    fanpageName: "GYC - Câu lạc bộ Thế hệ trẻ AEP",
    fanpageUrl: "https://facebook.com"
  },"""

content_norm = content.replace('\r\n', '\n')
old_norm = old_block.replace('\r\n', '\n')
new_norm = new_block.replace('\r\n', '\n')

if old_norm in content_norm:
    content_norm = content_norm.replace(old_norm, new_norm)
    if '\r\n' in content:
        content = content_norm.replace('\n', '\r\n')
    else:
        content = content_norm
    with open('src/data/galaData.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated organizerContact in src/data/galaData.js")
else:
    print("ERROR: old_block not found in src/data/galaData.js")
    sys.exit(1)

