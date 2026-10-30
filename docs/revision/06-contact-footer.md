# PHASE 06 — CONTACT, FOOTER & SECTION CLEANUP SPECIFICATION & AUDIT REPORT

**Website**: `https://gala-night-club.vercel.app/`  
**Event**: Solfera – D-DAY 2026  
**Reference Document**: `docs/references/[GYC][D-DAY26][SỬA WEB VÉ].pdf` (Customer PDF, Pages 7–8)  
**Branch**: `revision/customer-content-updates`  
**Date**: October 29, 2026  
**Status**: COMPLETE (Ready for Phase 7)

---

## 1. Executive Summary

Phase 06 corrects all official contact channels, updates the footer branding and navigation, and purges the obsolete *"Lĩnh Vực Hoạt Động"* section and Zalo community link as explicitly requested on Customer PDF Pages 7 and 8.

All modifications strictly maintain the single source of truth across [galaData.js](file:///d:/Vibe%20Code/Web-Google-form/src/data/galaData.js) and [clubData.js](file:///d:/Vibe%20Code/Web-Google-form/src/data/clubData.js), with fully functional `tel:` and `mailto:` links across the registration support strip and footer.

---

## 2. Source-of-Truth Requirement Mapping

### 2.1. Contact Information & Support Strip (Customer PDF, Page 7)
| Channel | Previous Value | Verified Customer Value | Link Format | Component / Location | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hotline** | `0988 123 456` | **`098 325 9655`** | `tel:0983259655` | `RegisterPage.jsx` & `Footer.jsx` | **VERIFIED** |
| **Email** | `dday.ygc.aep@gmail.com` | **`dday26.gyc@gmail.com`** | `mailto:dday26.gyc@gmail.com` | `RegisterPage.jsx` & `Footer.jsx` | **VERIFIED** |
| **Fanpage** | `Fanpage YGC / AEP` | **`Fanpage: GYC - Câu lạc bộ Thế hệ trẻ AEP`** | Official Fanpage / Safe fallback | `RegisterPage.jsx` & `Footer.jsx` | **VERIFIED** |

### 2.2. Section Removal: Lĩnh Vực Hoạt Động (Customer PDF, Page 7)
| Section | Action | Component / Files Affected | Details | Status |
| :--- | :--- | :--- | :--- | :--- |
| *"LĨNH VỰC HOẠT ĐỘNG: Những Mảng Hoạt Động Kiến Tạo Dấu Ấn"* | **REMOVED** | `src/components/home/AboutSection.jsx` | Purged section and its 4 activity rows (Media, Tech, Staging, Community). Removed unused helper functions (`getActivityIcon`, `getActivityImage`) and unneeded Lucide icon imports. Verified no navigation anchors were broken. | **REMOVED** |

### 2.3. Footer Updates & Zalo Removal (Customer PDF, Page 8)
| Element | Previous State | Required Customer State | Status |
| :--- | :--- | :--- | :--- |
| **Brand Description** | Tagline + *"Sự kiện thường niên chính thức của..."* | **`Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao & POHE`** | **UPDATED** |
| **Fanpage Button** | `Fanpage YGC / AEP` | **`Fanpage: GYC - Câu lạc bộ Thế hệ trẻ AEP`** | **UPDATED** |
| **Zalo Community** | `Cộng Đồng Zalo` (`https://zalo.me`) | **COMPLETELY REMOVED** (*"Bỏ cộng đồng zalo"*) | **REMOVED** |
| **Contact Links** | Plain text spans | Clickable `mailto:dday26.gyc@gmail.com` and `tel:0983259655` links with hover effects | **ENHANCED** |

---

## 3. Implementation Details

### 3.1. Data Layer (`galaData.js` & `clubData.js`)
- `GALA_EVENT.organizerContact`:
  - `hotline: "098 325 9655"`
  - `hotlineTel: "0983259655"`
  - `email: "dday26.gyc@gmail.com"`
  - `fanpageName: "GYC - Câu lạc bộ Thế hệ trẻ AEP"`
- `CLUB_INFO`:
  - Added `footerDescription: "Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao & POHE"`.
  - Updated `contact` object with official hotline, email, and fanpage name.
  - Purged `groupUrl: "https://zalo.me"` and deprecated `activities` array.

### 3.2. Presentation Layer (`AboutSection.jsx`, `RegisterPage.jsx`, `Footer.jsx`)
- **[AboutSection.jsx](file:///d:/Vibe%20Code/Web-Google-form/src/components/home/AboutSection.jsx)**:
  - Removed the entire Activity Fields section (`.activity-list`).
  - Purged `Megaphone`, `Code`, `CalendarDays`, `CheckCircle2` imports.
  - Cleaned up `direction-desc` in the bridging CTA to reference GYC.
- **[RegisterPage.jsx](file:///d:/Vibe%20Code/Web-Google-form/src/pages/RegisterPage.jsx)**:
  - Ticket support strip now renders verified hotline `098 325 9655` (`tel:0983259655`), email `dday26.gyc@gmail.com` (`mailto:dday26.gyc@gmail.com`), and fanpage label `Fanpage: GYC - Câu lạc bộ Thế hệ trẻ AEP`.
- **[Footer.jsx](file:///d:/Vibe%20Code/Web-Google-form/src/components/common/Footer.jsx)**:
  - Brand description updated to official welcoming statement for AEP K68.
  - Fanpage button label updated to `Fanpage: GYC - Câu lạc bộ Thế hệ trẻ AEP`.
  - Removed Zalo button and `MessageCircle` icon import.
  - Wrapped footer contact items in functional `.footer-contact-link` anchors (`mailto:` and `tel:`).

### 3.3. Styling Layer (`src/styles/index.css`)
- Added `.footer-contact-link` styles with subtle hover gold transition and `word-break: break-word` for responsive safety.
- Verified that `.register-support-actions` on mobile (`<= 640px`) wraps buttons vertically with 100% width, preventing overflow on 320px–430px viewports.

---

## 4. Verification & Quality Assurance

### 4.1. Automated Assertions (`scratch/verify_phase6.py`)
- Verified official hotline `098 325 9655` in data files: **PASS**
- Verified official email `dday26.gyc@gmail.com` in data files: **PASS**
- Verified official footer description in `clubData.js`: **PASS**
- Verified complete removal of Zalo CTA and icon from `Footer.jsx`: **PASS**
- Verified presence of `tel:` and `mailto:` links in `Footer.jsx` and `RegisterPage.jsx`: **PASS**
- Verified removal of *"Lĩnh Vực Hoạt Động"* and *"Những Mảng Hoạt Động Kiến Tạo Dấu Ấn"* from `AboutSection.jsx`: **PASS**
- Verified zero occurrences of stale numbers (`0988 123 456`) and legacy emails (`dday.ygc.aep@gmail.com`, `contact.ygc.aep@gmail.com`) in `src/`: **PASS**

### 4.2. Production Build Verification
- Command: `npm run build`
- Output: Built cleanly in **13.61s** with zero errors. Bundle size for `HomePage` was reduced from `18.77 kB` to `16.19 kB`.

---

## 5. Traceability Matrix Updates
- `REQ-12`: Status updated from `TODO` to **`DONE`**
- `REQ-13`: Status updated from `TODO` to **`DONE`**
- `REQ-14`: Status updated from `TODO` to **`DONE`**

