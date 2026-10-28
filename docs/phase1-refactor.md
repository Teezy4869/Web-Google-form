# Phase 1: Refactoring & Architecture Migration Report

**Project:** TTV Club Website (Refactor from Recruitment to GALA NIGHT 2026)  
**Role:** Senior React Developer & Software Architect  
**Date:** October 2026  
**Status:** Build Passed (`npm run build` Succeeded with 0 errors)

---

## 1. Executive Summary & Objectives

The primary objective of this Phase 1 refactoring was to safely dismantle all recruitment-specific logic and UI components from the existing TTV Club website, while preserving high-quality reusable UI primitives, and establishing a clean, modern, multi-page foundation using React Router DOM for the upcoming **GALA NIGHT 2026** event website.

All recruitment features (such as 7-department selection, 3-round interview timeline, 4-step recruitment wizard, candidate FAQs, and local draft persistence) have been completely removed. Reusable inputs, modals, timers, and layout components have been migrated and adapted to the new architecture.

---

## 2. Detailed Breakdown of Changes

### 2.1 Removed Obsolete Recruitment Features
1. **Department Selection:** Removed 7-department models (`media_com`, `content`, `media_prod`, `design`, `events`, `hr`, `finance`), department cards, preselected department state (`preselectedDept`), and primary/secondary department form pickers.
2. **Recruitment Rounds & Timeline:** Removed 3-round recruitment timeline (`RECRUITMENT_TIMELINE`) and the `TimelineSection` component.
3. **Multi-Step Application Workflow:** Removed the 4-step wizard stepper (`step-bar`), step navigation buttons (`handleNextStep`, `handlePrevStep`), and step-level validation.
4. **Interview & Assessment Questions:** Removed candidate questions (reasons for joining, strengths/weaknesses, time commitments, portfolio links, situational scenario prompts).
5. **Recruitment-Specific FAQs:** Removed candidate FAQs (`FAQS` array and `FAQSection` component).
6. **Recruitment Deadlines & Countdown Hardcoding:** Removed hardcoded recruitment deadline (`2026-10-25T23:59:59`) and recruitment expiration notices from `CountdownTimer`.
7. **Recruitment Draft Persistence:** Removed `localStorage` key `ttv_recruitment_draft_v1` and auto-save side effects for recruitment data.

### 2.2 Preserved Reusable UI Primitives
The following modular form components were verified, preserved, and kept completely intact under `src/components/form/`:
- `TextInput.jsx`: Standard text/email/tel/url input with validation feedback.
- `TextArea.jsx`: Multi-line text field with dynamic character counter.
- `RadioGroup.jsx`: Accessible card-based single-choice selector.
- `CheckboxGroup.jsx`: Multi-choice card group supporting selection limits (`maxChoices`).
- `SingleCheckbox.jsx`: Accessible confirmation checkbox for terms/commitment.
- `FormSection.jsx`: Form section card container with title, icon, and description.
- `SubmitButton.jsx`: Action button with built-in loading spinner and disabled state.
- `ValidationMessage.jsx`: Accessible inline error display.

### 2.3 Common Components Refactored
- `Navbar.jsx`: Refactored to use `react-router-dom` (`Link`, `useNavigate`, `useLocation`). Navigation anchors updated for GALA NIGHT (`#video`, `#about`, `#gala-night`), plus a prominent "Đăng Ký Tham Dự" CTA linking directly to `/register`.
- `Footer.jsx`: Refactored to reference `clubData.js` and `galaData.js`. Quick links updated for the event website.
- `CountdownTimer.jsx`: Refactored into a pure, props-driven component (`targetDate`, `label`, `expiredLabel`, `expiredMessage`) with fallback UI when an official date is not yet announced.
- `SuccessModal.jsx`: Refactored to confirm GALA NIGHT event attendance registration (Attendee name, email, phone, attendee type, check-in instructions).

### 2.4 New Page-Level Containers
- `src/pages/HomePage.jsx`: Landing Page shell for Route `/` rendering Navbar, `VideoHeroSection`, `ClubIntroSection`, `GalaIntroSection`, and Footer.
- `src/pages/RegisterPage.jsx`: Dedicated registration page shell for Route `/register` rendering Navbar, single-page `RegistrationForm`, `SuccessModal`, and Footer.

---

## 3. Data Architecture & Explicit Placeholders

### 3.1 Club Information (`src/data/clubData.js`)
All non-recruitment club facts were migrated from `recruitmentData.js`:
- Name: **TTV CLUB**
- Full Name: **CLB Truyền Thông & Công Nghệ Trẻ (TTV_CLB)**
- Tagline: *"Khám phá tiềm năng — Bứt phá giới hạn"*
- Core Stats: 9+ năm hoạt động, 400+ thành viên & cựu thành viên, 75+ sự kiện & dự án, 35+ đối tác.
- Core Pillars: Thực Chiến & Ứng Dụng, Gắn Kết & Sẻ Chia, Phát Triển Toàn Diện, Mạng Lưới Kết Nối.
- Contact: Official email, hotline, fanpage, Zalo group, headquarters address.

### 3.2 Gala Event Data (`src/data/galaData.js`)
Centralized event metadata using explicit placeholders without inventing unverified facts:
- Event Name: `GALA NIGHT 2026`
- Theme: `[CHỦ_ĐỀ_SỰ_KIỆN_CHƯA_CÔNG_BỐ]`
- Description: `[MÔ_TẢ_CHI_TIẾT_SỰ_KIỆN_GALA_NIGHT: ...]`
- Schedule: `[THỜI_GIAN_TỔ_CHỨC]`, Doors Open: `[GIỜ_MỞ_CỬA_ĐÓN_KHÁCH]`, `isoDate: null`
- Venue: Name: `[TÊN_ĐỊA_ĐIỂM_TỔ_CHỨC]`, Address: `[ĐỊA_CHỈ_TỔ_CHỨC]`, Map: `[LINK_GOOGLE_MAPS_CHƯA_CUNG_CẤP]`
- Organizer Contact: `[TRƯỞNG_BAN_TỔ_CHỨC]`, Hotline: `[HOTLINE_SỰ_KIỆN]`, Email: `[EMAIL_SỰ_KIỆN]`
- Registration Settings: `attendeeTypes` (Active Member, Alumni, Free Student/Guest, Partner Representative), `discoveryChannels`, `deadline: [HẠN_CHÓT_ĐĂNG_KÝ]`.

---

## 4. Complete File Inventory

### 4.1 Created Files
| File Path | Description |
| :--- | :--- |
| `src/data/clubData.js` | Centralized TTV Club identity, stats, pillars, and contacts. |
| `src/data/galaData.js` | Centralized GALA NIGHT event details and registration settings with explicit placeholders. |
| `src/pages/HomePage.jsx` | Landing Page container component for Route `/`. |
| `src/pages/RegisterPage.jsx` | Single-page event registration container for Route `/register`. |
| `src/components/home/ClubIntroSection.jsx` | Club introduction section showcasing pillars and stats. |
| `src/components/home/VideoHeroSection.jsx` | Foundation for full-screen video hero with CTA. |
| `src/components/home/GalaIntroSection.jsx` | Gala Night introduction section with schedule, venue, and countdown. |
| `src/components/registration/RegistrationForm.jsx` | Single-page attendance registration form using preserved UI primitives. |
| `docs/phase1-refactor.md` | This refactoring documentation report. |

### 4.2 Modified Files
| File Path | Description of Changes |
| :--- | :--- |
| `package.json` | Updated package name to `ttv-gala-night`; installed `react-router-dom` (^7.18.4). |
| `index.html` | Updated `<title>`, `<meta description>`, and favicon for GALA NIGHT 2026. |
| `src/App.jsx` | Replaced monolithic recruitment layout with declarative `BrowserRouter` and routes (`/` and `/register`). |
| `src/components/common/Navbar.jsx` | Replaced recruitment anchor links with Gala Night links and `/register` route button. |
| `src/components/common/Footer.jsx` | Migrated data sources to `clubData.js` and `galaData.js`; updated quick links. |
| `src/components/common/CountdownTimer.jsx` | Decoupled from static deadline; transformed into reusable props-driven timer. |
| `src/components/common/SuccessModal.jsx` | Adapted confirmation dialog to event attendance registration. |
| `src/services/googleForm.js` | Cleaned up placeholders and exported `submitGalaRegistration` stub. |
| `src/utils/validation.js` | Streamlined schema validation for event registration fields. |
| `README.md` | Updated documentation with new routes and development instructions. |

### 4.3 Removed Files
| File Path | Reason for Removal |
| :--- | :--- |
| `src/data/recruitmentData.js` | Replaced by `clubData.js` and `galaData.js`. |
| `src/components/sections/ApplicationForm.jsx` | Replaced by `src/components/registration/RegistrationForm.jsx`. |
| `src/components/sections/DepartmentsSection.jsx` | Obsolete recruitment feature (7-department picker). |
| `src/components/sections/TimelineSection.jsx` | Obsolete recruitment feature (3 recruitment rounds). |
| `src/components/sections/FAQSection.jsx` | Obsolete recruitment candidate questions. |
| `src/components/sections/HeroSection.jsx` | Replaced by `src/components/home/VideoHeroSection.jsx`. |
| `src/components/sections/AboutSection.jsx` | Replaced by `src/components/home/ClubIntroSection.jsx`. |

---

## 5. Build Verification Results

Execution of `npm run build`:
```bash
> ttv-gala-night@1.0.0 build
> vite build

vite v5.4.21 building for production...
transforming...
✓ 1612 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.15 kB │ gzip:  0.71 kB
dist/assets/index-C53NRS3n.css   18.11 kB │ gzip:  4.44 kB
dist/assets/index-eeCLSZyd.js   220.43 kB │ gzip: 70.79 kB
✓ built in 15.32s
```
**Result:** Build passed with **zero errors and zero warnings**. The previous unresolved import errors (`validateStep`, `submitRecruitmentForm`) have been completely resolved.

---

## 6. Unresolved Items & Next Steps (Phase 2 Roadmap)

1. **Video Asset Provisioning:** Section 1 of Route `/` requires a real introductory video file (`.mp4`) or stream URL. We need the video source or fallback poster graphic from the client/organizers.
2. **Google Form Integration:** Connecting the real Google Form URL and field entry IDs (`entry.XXXXX`) to `src/services/googleForm.js`.
3. **Official Event Details:** Replacing explicit placeholders in `src/data/galaData.js` (official theme, exact event date/time, hall/venue name, ticket registration deadlines).
