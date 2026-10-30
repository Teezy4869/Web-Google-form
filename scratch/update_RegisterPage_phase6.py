import sys

with open('src/pages/RegisterPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """            <a
              href={CLUB_INFO.contact.fanpageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary register-support-btn"
            >
              <Facebook size={15} className="text-gold" />
              <span>Fanpage {CLUB_INFO.name}</span>
            </a>"""

replacement = """            <a
              href={GALA_EVENT.organizerContact.fanpageUrl || CLUB_INFO.contact.fanpageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary register-support-btn"
              aria-label="Fanpage GYC - Câu lạc bộ Thế hệ trẻ AEP"
            >
              <Facebook size={15} className="text-gold" />
              <span>Fanpage: {GALA_EVENT.organizerContact.fanpageName || CLUB_INFO.contact.fanpageName}</span>
            </a>"""

content_norm = content.replace('\r\n', '\n')
target_norm = target.replace('\r\n', '\n')
replacement_norm = replacement.replace('\r\n', '\n')

if target_norm in content_norm:
    content_norm = content_norm.replace(target_norm, replacement_norm)
    if '\r\n' in content:
        content = content_norm.replace('\n', '\r\n')
    else:
        content = content_norm
    with open('src/pages/RegisterPage.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated Fanpage button in RegisterPage.jsx")
else:
    print("ERROR: target not found in RegisterPage.jsx")
    sys.exit(1)

