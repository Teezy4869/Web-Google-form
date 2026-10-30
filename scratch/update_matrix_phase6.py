with open('docs/revision/requirements-matrix.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Update title
content = content.replace(
    '# PHASE 01, 02, 03, 04 & 05 — REQUIREMENTS TRACEABILITY MATRIX',
    '# PHASE 01–06 — REQUIREMENTS TRACEABILITY MATRIX'
)

# Update REQ-12, REQ-13, REQ-14 status in table
content = content.replace(
    '| **REQ-12** | Page 7 | `AboutSection.jsx`<br>`clubData.js` | Section: "LĨNH VỰC HOẠT ĐỘNG: Những Mảng Hoạt Động Kiến Tạo Dấu Ấn" with 4 alternating activity items (Media, Tech, Staging, Community) | Section is completely **REMOVED** ("Bỏ") | **REMOVE** | `src/components/home/AboutSection.jsx`<br>`src/data/clubData.js` | **P0** | "Lĩnh Vực Hoạt Động" and its 4 activity rows are deleted from the About section cleanly. | **TODO** |',
    '| **REQ-12** | Page 7 | `AboutSection.jsx`<br>`clubData.js` | Section: "LĨNH VỰC HOẠT ĐỘNG: Những Mảng Hoạt Động Kiến Tạo Dấu Ấn" with 4 alternating activity items (Media, Tech, Staging, Community) | Section is completely **REMOVED** ("Bỏ") | **REMOVE** | `src/components/home/AboutSection.jsx`<br>`src/data/clubData.js` | **P0** | "Lĩnh Vực Hoạt Động" and its 4 activity rows are deleted from the About section cleanly. | **DONE** |'
)

content = content.replace(
    '| **REQ-13** | Page 7 | `RegisterPage.jsx`<br>`Footer.jsx`<br>`clubData.js`<br>`galaData.js` | Hotline: "0988 123 456"<br>Email: "dday.ygc.aep@gmail.com"<br>Fanpage: "Fanpage YGC / AEP" | **Hotline**: 098 325 9655<br>**Email**: dday26.gyc@gmail.com<br>**Fanpage**: GYC - Câu lạc bộ Thế hệ trẻ AEP | **UPDATE** | `src/data/clubData.js`<br>`src/data/galaData.js`<br>`src/pages/RegisterPage.jsx`<br>`src/components/common/Footer.jsx` | **P0** | Contact channels updated in RegisterPage support strip and Footer. Phone links (`tel:0983259655`) and email links (`mailto:dday26.gyc@gmail.com`) function correctly. | **TODO** |',
    '| **REQ-13** | Page 7 | `RegisterPage.jsx`<br>`Footer.jsx`<br>`clubData.js`<br>`galaData.js` | Hotline: "0988 123 456"<br>Email: "dday.ygc.aep@gmail.com"<br>Fanpage: "Fanpage YGC / AEP" | **Hotline**: 098 325 9655<br>**Email**: dday26.gyc@gmail.com<br>**Fanpage**: GYC - Câu lạc bộ Thế hệ trẻ AEP | **UPDATE** | `src/data/clubData.js`<br>`src/data/galaData.js`<br>`src/pages/RegisterPage.jsx`<br>`src/components/common/Footer.jsx` | **P0** | Contact channels updated in RegisterPage support strip and Footer. Phone links (`tel:0983259655`) and email links (`mailto:dday26.gyc@gmail.com`) function correctly. | **DONE** |'
)

content = content.replace(
    '| **REQ-14** | Page 8 | `Footer.jsx`<br>`clubData.js` | Footer description: "{tagline}. Sự kiện thường niên chính thức của {fullName}"<br>Buttons:<br>- Fanpage YGC / AEP<br>- Cộng Đồng Zalo (`https://zalo.me`) | Description: "Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao & POHE"<br>Fanpage: "GYC - Câu lạc bộ Thế hệ trẻ AEP"<br>Zalo: **REMOVED** ("Bỏ cộng đồng zalo") | **UPDATE** & **REMOVE** | `src/components/common/Footer.jsx`<br>`src/data/clubData.js` | **P0** | Footer brand description matches customer text. Zalo button removed completely. Fanpage button label updated. | **TODO** |',
    '| **REQ-14** | Page 8 | `Footer.jsx`<br>`clubData.js` | Footer description: "{tagline}. Sự kiện thường niên chính thức của {fullName}"<br>Buttons:<br>- Fanpage YGC / AEP<br>- Cộng Đồng Zalo (`https://zalo.me`) | Description: "Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao & POHE"<br>Fanpage: "GYC - Câu lạc bộ Thế hệ trẻ AEP"<br>Zalo: **REMOVED** ("Bỏ cộng đồng zalo") | **UPDATE** & **REMOVE** | `src/components/common/Footer.jsx`<br>`src/data/clubData.js` | **P0** | Footer brand description matches customer text. Zalo button removed completely. Fanpage button label updated. | **DONE** |'
)

old_summary_block = """  - **REQ-11**: Core Values section updated with 4 customer values: Tôn trọng, Chủ động, Trách nhiệm, Đồng hành
- **TODO (Pending Phases 6–7)**:
  - REQ-12, REQ-13, REQ-14, REQ-15"""

new_summary_block = """  - **REQ-11**: Core Values section updated with 4 customer values: Tôn trọng, Chủ động, Trách nhiệm, Đồng hành
  - **REQ-12**: "Lĩnh Vực Hoạt Động" section cleanly removed from AboutSection
  - **REQ-13**: Contact channels updated (Hotline: 098 325 9655, Email: dday26.gyc@gmail.com, Fanpage: GYC - Câu lạc bộ Thế hệ trẻ AEP)
  - **REQ-14**: Footer description updated, Fanpage label updated, Zalo button cleanly removed
- **TODO (Pending Phase 7)**:
  - REQ-15 (Ticket registration preamble and top notice banner)"""

content = content.replace(old_summary_block, new_summary_block)

with open('docs/revision/requirements-matrix.md', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated requirements matrix for Phase 6")
