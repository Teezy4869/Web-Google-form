import sys

with open('src/components/common/Footer.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update imports
old_import = "import { Mail, Phone, MapPin, Facebook, MessageCircle, ArrowUp } from 'lucide-react';"
new_import = "import { Mail, Phone, MapPin, Facebook, ArrowUp } from 'lucide-react';"

if old_import in content:
    content = content.replace(old_import, new_import)
    print("Updated imports in Footer.jsx (removed MessageCircle)")
else:
    print("ERROR: old_import not found in Footer.jsx")
    sys.exit(1)

# 2. Update brand desc and remove Zalo button
old_brand_and_social = """            <p className="footer-brand-desc">
              {GALA_EVENT.tagline}. Sự kiện thường niên chính thức của {CLUB_INFO.fullName}.
            </p>

            <div className="footer-social-links">
              <a
                href={CLUB_INFO.contact.fanpageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary footer-social-btn"
                aria-label="Theo dõi Fanpage chính thức YGC / AEP"
              >
                <Facebook size={16} />
                <span>Fanpage {CLUB_INFO.name}</span>
              </a>

              <a
                href={CLUB_INFO.contact.groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary footer-social-btn"
                aria-label="Tham gia cộng đồng Zalo chính thức"
              >
                <MessageCircle size={16} />
                <span>Cộng Đồng Zalo</span>
              </a>
            </div>"""

new_brand_and_social = """            <p className="footer-brand-desc">
              {CLUB_INFO.footerDescription || "Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao & POHE"}
            </p>

            <div className="footer-social-links">
              <a
                href={CLUB_INFO.contact.fanpageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary footer-social-btn"
                aria-label="Theo dõi Fanpage chính thức GYC - Câu lạc bộ Thế hệ trẻ AEP"
              >
                <Facebook size={16} />
                <span>Fanpage: {CLUB_INFO.contact.fanpageName || "GYC - Câu lạc bộ Thế hệ trẻ AEP"}</span>
              </a>
            </div>"""

# 3. Update contact links to functional <a>
old_contact_list = """            <ul className="footer-contact-list">
              <li>
                <Mail size={16} className="text-gold" />
                <span>{GALA_EVENT.organizerContact.email}</span>
              </li>
              <li>
                <Phone size={16} className="text-gold" />
                <span>Hotline: {GALA_EVENT.organizerContact.hotline}</span>
              </li>
              <li>
                <MapPin size={16} className="text-gold" />
                <span>{GALA_EVENT.venue.fullLocation || GALA_EVENT.venue.address}</span>
              </li>
            </ul>"""

new_contact_list = """            <ul className="footer-contact-list">
              <li>
                <Mail size={16} className="text-gold" />
                <a href={`mailto:${GALA_EVENT.organizerContact.email}`} className="footer-contact-link">
                  {GALA_EVENT.organizerContact.email}
                </a>
              </li>
              <li>
                <Phone size={16} className="text-gold" />
                <a href={`tel:${GALA_EVENT.organizerContact.hotlineTel || GALA_EVENT.organizerContact.hotline.replace(/\\s/g, '')}`} className="footer-contact-link">
                  Hotline: {GALA_EVENT.organizerContact.hotline}
                </a>
              </li>
              <li>
                <MapPin size={16} className="text-gold" />
                <span>{GALA_EVENT.venue.fullLocation || GALA_EVENT.venue.address}</span>
              </li>
            </ul>"""

content_norm = content.replace('\r\n', '\n')
old_brand_norm = old_brand_and_social.replace('\r\n', '\n')
new_brand_norm = new_brand_and_social.replace('\r\n', '\n')
old_contact_norm = old_contact_list.replace('\r\n', '\n')
new_contact_norm = new_contact_list.replace('\r\n', '\n')

if old_brand_norm in content_norm and old_contact_norm in content_norm:
    content_norm = content_norm.replace(old_brand_norm, new_brand_norm)
    content_norm = content_norm.replace(old_contact_norm, new_contact_norm)
    if '\r\n' in content:
        content = content_norm.replace('\n', '\r\n')
    else:
        content = content_norm
    with open('src/components/common/Footer.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated Footer.jsx (description, fanpage label, removed Zalo, added mailto/tel)")
else:
    print("ERROR: old_brand_norm or old_contact_norm not found in Footer.jsx")
    sys.exit(1)

