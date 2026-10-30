# PHASE 02 — EVENT INFORMATION & HERO UPDATE REPORT

**Project**: Solfera – D-DAY 2026 Event Information & Ticket Registration  
**Phase**: Phase 02 — Event Information & Hero Update  
**Implementation Date**: October 29, 2026  
**Reference Document**: `docs/references/[GYC][D-DAY26][SỬA WEB VÉ].pdf`, Page 1  
**Git Branch**: `revision/customer-content-updates`

---

## 1. Executive Summary

Phase 02 updates the official event introduction, date, check-in time window, venue location, and section hierarchy across the Solfera – D-DAY 2026 website according to the customer specification on Page 1 of `[GYC][D-DAY26][SỬA WEB VÉ].pdf`.

All changes were implemented through the centralized single-source data layer (`src/data/galaData.js` and `src/data/clubData.js`) and reflected cleanly across `VideoHero.jsx`, `GalaSection.jsx`, `HomePage.jsx`, `RegisterPage.jsx`, `Navbar.jsx`, `Footer.jsx`, and `index.css`. All obsolete placeholder values ("Đang cập nhật") and previous PTIT references were replaced with the official NEU venue and schedule.

---

## 2. Updated Official Content

### 2.1. Event Title & Intro
- **Official Title**: `Gala Night - Vòng Chung kết cuộc thi King & Queen D-DAY 2026`
- **Location in Code**: `GALA_EVENT.eventTitle` and `GALA_EVENT.tagline` in `src/data/galaData.js`. Rendered in Hero heading hierarchy (`.hero-tagline`).

### 2.2. Event Description
- **Official Text**:
  > *"Không gian nghệ thuật đong đầy cảm xúc gửi gắm tới toàn bộ tân sinh viên AEP K68 nói riêng và sinh viên Đại học Kinh tế Quốc dân nói chung. Đêm nhạc hứa hẹn sẽ mang tới những màn trình diễn đầy ấn tượng của các cặp thí sinh cuộc thi King & Queen 2026 tài năng. Cùng với đó chính là sự xuất hiện bất ngờ của những vị Ca sĩ khách mời vô cùng đặc biệt."*
- **Location in Code**: `GALA_EVENT.description` in `src/data/galaData.js`. Rendered in `VideoHero.jsx` (`.hero-description`) and `GalaSection.jsx` (`.meaning-desc`).

### 2.3. Event Schedule & Venue
- **Event Time (Thời gian)**: `18:30 Thứ Năm, ngày 05/11/2026`
- **Check-in Window (Thời gian check-in)**: `18:00 - 18:30 Thứ Năm, ngày 05/11/2026`
- **Venue (Địa điểm)**: `Hội trường A2, Tòa A2, Đại học Kinh tế Quốc dân, 207 Giải Phóng, Đồng Tâm, Hà Nội`
- **Countdown Timer Target**: `2026-11-05T18:30:00+07:00` (ISO 8601 string for Hanoi timezone UTC+7)
- **Ticket Price**: `Vé tham dự miễn phí` (Free attendance ticket)

---

## 3. Structural Reordering (Event Information Preceding Club Information)

Per the explicit customer instruction on Page 1 (*"với anh đẩy thông tin sự kiện lên trước CLB giúp em"*):
1. **Homepage Hierarchy (`src/pages/HomePage.jsx`)**:
   - **Old Flow**: `VideoHero` (#hero) $\rightarrow$ `AboutSection` (#about) $\rightarrow$ `GalaSection` (#gala)
   - **New Flow**: `VideoHero` (#hero) $\rightarrow$ `GalaSection` (#gala) $\rightarrow$ `AboutSection` (#about)
2. **Navigation Links Alignment (`src/components/common/Navbar.jsx`)**:
   - Order updated to match page reading flow:
     1. `Trang Chủ` (`/`)
     2. `Sự Kiện D-DAY 2026` (`/#gala`)
     3. `Về GYC / CLB` (`/#about`)
     4. `Đăng Ký Tham Dự` (`/register`)
3. **Hero Scroll Indicator (`src/components/home/VideoHero.jsx`)**:
   - The scroll-down mouse button and secondary CTA button now guide visitors smoothly to `#gala` directly beneath the Hero.
4. **Footer Quick Links (`src/components/common/Footer.jsx`)**:
   - Quick navigation links reordered to match the prioritized event flow.

---

## 4. Component Modification Matrix

| Component / File | Specific Changes Made |
| :--- | :--- |
| [`src/data/galaData.js`](file:///d:/Vibe%20Code/Web-Google-form/src/data/galaData.js) | - Bound official `eventTitle` & `tagline` to King & Queen D-DAY 2026.<br>- Set official `description` for AEP K68 & NEU.<br>- Configured `schedule.dateTime` ("18:30 Thứ Năm, ngày 05/11/2026").<br>- Configured `schedule.checkInTime` ("18:00 - 18:30 Thứ Năm, ngày 05/11/2026").<br>- Configured `schedule.isoDate` ("2026-11-05T18:30:00+07:00").<br>- Configured `venue` to Hall A2, Building A2, NEU (207 Giải Phóng). |
| [`src/data/clubData.js`](file:///d:/Vibe%20Code/Web-Google-form/src/data/clubData.js) | - Updated contact address from legacy PTIT to Hall A2, Building A2, NEU (207 Giải Phóng). |
| [`src/components/home/VideoHero.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/components/home/VideoHero.jsx) | - Added `Clock` icon import from `lucide-react`.<br>- Rendered 4 distinct info pills: Date/Time (18:30 05/11/2026), Check-in (18:00 - 18:30), Full NEU Venue, and Free Ticket.<br>- Updated scroll-down indicator to target `#gala`.<br>- Updated showcase card footer to "GYC - Câu lạc bộ Thế hệ trẻ AEP" and removed "Chủ đề". |
| [`src/components/home/GalaSection.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/components/home/GalaSection.jsx) | - Updated time card with `dateTime` and check-in window.<br>- Updated venue card with NEU Hall A2 and 207 Giải Phóng.<br>- CountdownTimer now accurately counts down to `2026-11-05T18:30:00+07:00`. |
| [`src/pages/HomePage.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/pages/HomePage.jsx) | - Swapped `<GalaSection />` before `<AboutSection />`. |
| [`src/pages/RegisterPage.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/pages/RegisterPage.jsx) | - Replaced fallback PTIT string with `GALA_EVENT.venue.fullLocation`.<br>- Displays combined event time and check-in window in the event information strip. |
| [`src/components/common/Navbar.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/components/common/Navbar.jsx) | - Reordered navigation links: `Trang Chủ` $\rightarrow$ `Sự Kiện D-DAY 2026` $\rightarrow$ `Về GYC / CLB` $\rightarrow$ `Đăng Ký Tham Dự`.<br>- Brand org tag updated to `GYC / AEP`. |
| [`src/components/common/Footer.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/components/common/Footer.jsx) | - Bound address to NEU Hall A2 / 207 Giải Phóng.<br>- Reordered quick navigation links. |
| [`src/styles/index.css`](file:///d:/Vibe%20Code/Web-Google-form/src/styles/index.css) | - Added `max-width: 100%`, `box-sizing: border-box`, and text wrapping to `.hero-info-pill`.<br>- Added responsive font and padding scaling at $\le 640\text{px}$ and $\le 360\text{px}$ to prevent any horizontal overflow on 320px–430px mobile screens. |

---

## 5. Responsive & Layout Verification

- **Mobile Viewports (320px–430px)**:
  - Hero info pills wrap cleanly in a flex-wrap container with `justify-content: center`. No horizontal scrollbar appears.
  - Hero action buttons stack vertically (`flex-direction: column`, `width: 100%`) with accessible tap targets ($\ge 44\text{px}$).
  - All text labels wrap gracefully with `overflow-wrap: break-word`.
- **Tablet & Desktop (768px–1440px)**:
  - Dual-column hero layout (`1.15fr 0.85fr`) maintains visual balance.
  - Key Visual showcase card floats with champagne rim and zero distortion (`aspect-ratio: 16/9`).
  - Desktop anchor navigation works seamlessly across `#hero`, `#gala`, and `#about`.

---

## 6. Build & Quality Verification

- **Production Build (`npm run build`)**: **PASS**
  - Completed in 14.81s.
  - Zero syntax errors, zero missing imports, zero bundler warnings.
  - Production bundles generated cleanly in `dist/`.
- **Functional Integrity**:
  - Controlled registration form logic, validation schema, and multi-mode submission safeguards remain completely untouched.
  - No backend or API behavior altered.

---

## 7. Requirement Status Update in Requirements Matrix

- **REQ-01** (Section Reordering): **DONE**
- **REQ-02** (Hero Title & Description): **DONE**
- **REQ-03** (Schedule, Check-in & NEU Venue): **DONE**
- **REQ-04** (Visual Showcase Card Metadata Update): **DONE**
