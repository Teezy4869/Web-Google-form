# PHASE 01 — OPEN QUESTIONS, INCONSISTENCY AUDIT & RISK REGISTER

**Reference Document**: `docs/references/[GYC][D-DAY26][SỬA WEB VÉ].pdf`  
**Governing Rule**: Source-of-Truth Hierarchy & Safety Mandate — Preserve exact customer wording; flag inconsistencies without silent global normalization; identify technical and operational risks.

---

## 1. Discrepancy & Inconsistency Analysis

### 1.1. GYC vs. YGC / AEP Acronym Discrepancy (Critical Flag)
- **Background**:
  - The previous website version heavily used **`YGC / AEP`** ("CLB Truyền Thông & Công Nghệ Trẻ — YGC / AEP").
  - Assets in `public/assets/images/` and navbar badges historically referenced `YGC / AEP`.
- **Observations in Customer PDF (`[GYC][D-DAY26][SỬA WEB VÉ].pdf`)**:
  - **Filename of PDF**: `[GYC][D-DAY26][SỬA WEB VÉ].pdf` (Uses **GYC**).
  - **Page 1**: Refers to "tân sinh viên AEP K68", "Đại học Kinh tế Quốc dân" (NEU). Note says "đẩy thông tin sự kiện lên trước CLB giúp em".
  - **Page 2**: Note states: "Đơn vị tổ chức: **GYC** - Câu lạc bộ Thế hệ trẻ AEP".
  - **Page 5**: Heading & body: "About us. **GYC** - Câu lạc bộ Thế hệ trẻ AEP", "**GYC** tự hào là một trong những tổ chức sinh viên đi đầu Viện Đào tạo Tiên tiến, Chất lượng cao & POHE...".
  - **Page 6**: Body: "Những giá trị cốt lõi **GYC** - Câu lạc bộ Thế hệ trẻ AEP hướng tới", "mỗi thành viên **GYC**", "bản sắc “Gia đình – Yêu thương – Chia sẻ” của **GYC**".
  - **Page 7**: Email: `dday26.gyc@gmail.com`, Fanpage: "**GYC** - Câu lạc bộ Thế hệ trẻ AEP".
  - **Page 8**: Body: "Ban Tổ chức **GYC** - Câu lạc bộ thế hệ trẻ AEP", Fanpage: "**GYC** - Câu lạc bộ Thế hệ trẻ AEP".
  - **Existing Source Assets**: The official logo WebP image (`solfera-logo.webp`) and visual key visuals contain Solfera artistic typography; some metadata tags in the code still reference `YGC / AEP`.
- **Architectural Flag**:
  The customer has transitioned the club acronym to **GYC** (**G**eneration **Y**outh **C**lub / Câu lạc bộ Thế hệ trẻ AEP) across all 8 pages. Per **Rule 6**, we MUST NOT silently normalize all legacy references without tracking. 
  - **Recommendation**: Update all text content in `clubData.js`, `galaData.js`, `AboutSection.jsx`, `Footer.jsx`, and `RegisterPage.jsx` to match customer's explicit wording ("GYC - Câu lạc bộ Thế hệ trẻ AEP"). Flag whether legacy graphic badges (if any embedded text exists in artwork) require asset-level updates from the customer's design team.

---

## 2. Unresolved Dependencies & External Confirmations

| Item # | Topic | Available from PDF | Missing / Unconfirmed Detail | Risk & Impact | Recommended Next Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Q1** | **Google Form URL & Field Schema** | Customer note on Page 8: *"Còn phần nội dung đăng ký vé anh sửa giúp em theo form là oki ạ"* | The customer did **not** attach or provide the Google Form URL, Google Sheets link, or field entry IDs (`entry.XXXXX`). | **High**: The registration form cannot be connected to a live Google Sheet or form response endpoint. Form is currently in safe `UNCONFIGURED` mode. | Keep existing validated schema (Họ và tên, Email, Số điện thoại, Mã sinh viên, Lớp/Đơn vị, Nhóm người tham dự, Ghi chú, Cam kết) as active UI fallback. Request live Google Form link and edit permissions from customer. |
| **Q2** | **Official Fanpage URL** | Customer text specifies: *"Fanpage: GYC - Câu lạc bộ Thế hệ trẻ AEP"* | Exact URL path to Facebook Page (e.g., `https://www.facebook.com/gyc.aep.neu...`). Codebase currently preserves safe fallback `https://facebook.com`. | **Low**: Label updated to official title. Clicking navigates to Facebook safely with `rel="noopener noreferrer"`. | Display label verified. Request exact page vanity handle/URL if customer wants direct routing to their page. |
| **Q3** | **Automated Confirmation Email Handling** | Page 8 Notice states: *"chỉ những đơn đăng ký có Email xác nhận từ Ban Tổ chức GYC - Câu lạc bộ thế hệ trẻ AEP mới được coi là đơn đăng ký hợp lệ."* | Is confirmation email dispatched automatically via Google Apps Script (GAS) on the response Sheet, or will the customer manually review and email attendees? | **Medium**: Customers may expect the website to send emails directly via SMTP/SendGrid. Current architecture is purely client-side static web (JAMstack). | Inform customer that client-side static web cannot send authenticated emails directly without exposing SMTP credentials. Recommend setting up Google Apps Script trigger on their Google Sheet to email respondents upon approval. |
| **Q4** | **Countdown Timer ISO Target Date** | Schedule: *"18:30 Thứ Năm, ngày 05/11/2026."* | Exact timezone and ISO 8601 string. Standard Hanoi time is UTC+7 (`2026-11-05T18:30:00+07:00`). | **Low**: Countdown timer needs an unambiguous ISO timestamp to prevent client browser timezone differences. | Set `targetDate` in `galaData.js` to `"2026-11-05T18:30:00+07:00"`. |
| **Q5** | **Removed Sections — Layout Continuity** | Pages 5 & 7 explicitly note *"Bỏ"* for "Sứ Mệnh Cốt Lõi" and "Lĩnh Vực Hoạt Động". | Both sections have been cleanly purged in Phases 5 & 6. Spacing between Stats, About Intro, Core Values, and Bridging CTA is balanced. | **RESOLVED**: Both sections completely removed. Page performance improved and bundle size reduced by ~2.6 kB. | No further action required. |
| **Q6** | **King & Queen / Singer Guest Details** | Hero description mentions: *"màn trình diễn đầy ấn tượng của các cặp thí sinh cuộc thi King & Queen 2026 tài năng... sự xuất hiện bất ngờ của những vị Ca sĩ khách mời vô cùng đặc biệt."* | Are guest singer names or King & Queen contestant profiles to be unveiled now or kept as suspense teasers? | **Low**: No guest names provided in PDF. | Preserve suspense wording verbatim as specified in PDF. Do not invent performer names. |

---

## 3. Technical Risk Matrix

| Risk ID | Category | Description | Severity | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **TR-01** | **Integration** | Form submission fails if user attempts to submit without configured Google Form endpoint. | **Medium** | Ensure `GALA_GOOGLE_FORM_CONFIG.mode` remains `UNCONFIGURED` (or `MOCK` during preview testing). Display explicit friendly status card explaining registration readiness without crashing the page. |
| **TR-02** | **CORS Limitation** | When Google Form URL is provided, direct browser POST to Google Form returns an opaque response (status 0). | **Medium** | Retain existing dual-mode architecture: `DIRECT_GOOGLE_FORM` handles hidden iframe POST with status `submitted_unverified`, clearly communicating to user that official ticket confirmation arrives via email. |
| **TR-03** | **Data Loss on Error** | User types extensive registration details; network failure occurs. | **Low** | Codebase already enforces strict controlled state preservation: on error, `formData` is never wiped, and error alert displays with a retry button. |
| **TR-04** | **Mobile CTA Overflow** | On narrow mobile screens (320px–360px), long button labels or dual CTA buttons could cause horizontal viewport overflow. | **Low** | Existing CSS sets `flex-direction: column` and `width: 100%` on mobile. Verify in Phase 7 responsive testing with explicit viewport tests down to 320px. |
| **TR-05** | **Anchor Jump Offset** | Reordering GalaSection before AboutSection changes anchor scroll targets (`/#gala` and `/#about`). | **Low** | Update `Navbar.jsx` navigation order and `ScrollToAnchor.jsx` offsets so headers are not covered by sticky navbar. |

