# PHASE 01 — PROJECT AUDIT & TECHNICAL BASELINE

**Project**: Solfera – D-DAY 2026 Event Information & Ticket Registration  
**Live Reference**: https://gala-night-club.vercel.app/  
**Audit Date**: October 29, 2026  
**Auditor**: Senior Software Architect & Technical QA Lead  
**Git Working Branch**: `revision/customer-content-updates`  
**Reference Specification**: `docs/references/[GYC][D-DAY26][SỬA WEB VÉ].pdf` (8 pages complete)

---

## 1. Executive Summary

This document establishes the technical baseline for Phase 1 of the website revision for **Solfera – D-DAY 2026**. The website has already received its visual redesign incorporating the Solfera dark-wine aesthetic, luxury gold accents, and responsive layout structures. The customer has now submitted an 8-page annotated correction PDF (`[GYC][D-DAY26][SỬA WEB VÉ].pdf`) demanding targeted updates to event details, club identity, organizational statistics, core values, section pruning, contact channels, and registration notices.

The existing codebase is structurally sound, featuring a modular React 18 single-page application built on Vite, with controlled form handling, multi-mode submission safeguards, and route code splitting. All changes requested by the customer can be implemented without rewriting the application architecture or breaking existing design tokens.

---

## 2. Repository & Technology Stack Inspection

### 2.1. Core Framework & Runtime
- **Frontend Framework**: React 18.3.1 (`react`, `react-dom`)
- **Build Tool / Bundler**: Vite 5.4.11 (`vite`, `@vitejs/plugin-react` v4.3.4)
- **Language**: JavaScript (ESModules, JSX, targeting ECMAScript 2020)
- **Client Routing**: React Router DOM 7.18.4 (`react-router-dom`)
  - Route code-splitting with `React.lazy()` and `Suspense`
  - Smooth anchor scrolling across routes via custom `ScrollToAnchor` component
- **Iconography**: Lucide React 0.468.0 (`lucide-react`)
- **Styling Architecture**: Custom CSS3 design system (`src/styles/index.css`, 3,267 lines, ~71 KB)
  - CSS Custom Properties (Design tokens: `--wine-deep`, `--ruby-core`, `--champagne`, `--gold-bright`, `--border-gold`, etc.)
  - Glassmorphic card styling with backdrop filters and fallback background colors
  - Responsive flexbox and CSS grid layouts with mobile breakpoints: 992px, 968px, 868px, 640px, 480px, 380px, 360px
  - Typography: Google Fonts `Cinzel` (display headings) and `Montserrat` (body text) loaded in `index.html`

### 2.2. Package & Dependency Configuration (`package.json`)
```json
{
  "name": "ttv-gala-night",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.18.4"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^5.4.11"
  }
}
```

### 2.3. Project Directory Map
```
Web-Google-form/
├── concept_source/
│   └── FINAL/                  # Raw high-resolution master graphics (DD26 VISUAL CHÍNH, DD26 COVER, DD26 AVA)
├── dist/                       # Production build output
├── docs/
│   ├── redesign/               # Redesign phase documentation & historical screenshots
│   ├── references/             # Customer reference specifications ([GYC][D-DAY26][SỬA WEB VÉ].pdf)
│   └── revision/               # Current revision documentation (Phase 1–8 artifacts)
│       └── screenshots/        # Baseline mobile/desktop screenshots
├── public/
│   ├── _redirects              # SPA rewrite rule for Netlify
│   ├── favicon.png
│   └── assets/
│       └── images/             # Web-optimized assets (WebP format)
│           ├── solfera-badge.webp
│           ├── solfera-cover-banner.webp
│           ├── solfera-hero-visual.webp
│           ├── solfera-logo.webp
│           ├── solfera-poster.webp
│           └── solfera-story-art.webp
├── src/
│   ├── App.jsx                 # Application router root with Suspense fallbacks
│   ├── main.jsx                # DOM mount entry point
│   ├── components/
│   │   ├── common/             # Navbar, Footer, CountdownTimer, StatusMessage, SuccessModal, ScrollToAnchor
│   │   ├── form/               # Form primitives: TextInput, TextArea, RadioGroup, SingleCheckbox, FormSection, SubmitButton
│   │   ├── home/               # VideoHero, AboutSection, GalaSection
│   │   ├── layout/             # RootLayout (Navbar + Outlet + Footer)
│   │   └── registration/       # RegistrationForm (controlled form container)
│   ├── data/
│   │   ├── clubData.js         # Single source of truth for club info, stats, pillars, activities
│   │   ├── galaData.js         # Single source of truth for Solfera event details, schedule, highlights
│   │   └── registrationConfig.js# Field definitions, options, and constraints
│   ├── pages/
│   │   ├── HomePage.jsx        # Landing page composition
│   │   ├── RegisterPage.jsx    # Registration page composition
│   │   └── NotFoundPage.jsx    # 404 fallback page
│   ├── services/
│   │   └── googleForm.js       # Pluggable Google Form submission service with multi-mode safety
│   ├── styles/
│   │   └── index.css           # Global design system & component styles
│   └── utils/
│       ├── useScrollReveal.js  # Lightweight IntersectionObserver animation hook
│       └── validation.js       # Form validation engine (regex, Vietnamese name/phone rules)
├── index.html                  # HTML entry point with meta tags and font links
├── netlify.toml                # Netlify deployment and caching configuration
├── package.json
├── vercel.json                 # Vercel deployment, rewrite rules, and immutable cache headers
└── vite.config.js              # Vite configuration with chunk splitting (vendor-react, vendor-icons)
```

### 2.4. Environment & Deployment Configurations
- **Environment Variables**: No `.env` files are required for client runtime. The codebase contains no committed API secrets or private tokens.
- **Vercel (`vercel.json`)**: Configured with SPA rewrite rule `/(.*) -> /index.html` and 1-year immutable caching for `/assets/(.*)`.
- **Netlify (`netlify.toml` & `public/_redirects`)**: Configured with `/* -> /index.html 200` rewrite.
- **Vite Chunk Splitting (`vite.config.js`)**: Separates `react`, `react-dom`, and `react-router-dom` into `vendor-react` and `lucide-react` into `vendor-icons`.

---

## 3. Baseline Functional & Interactive Audit

### 3.1. Route & Navigation Architecture
- **Routes**:
  - `/` -> `HomePage.jsx` (Landing page)
  - `/register` -> `RegisterPage.jsx` (Ticket registration)
  - `*` -> `NotFoundPage.jsx` (404 Not Found fallback)
- **Navigation (`Navbar.jsx`)**:
  - Desktop: Transparent top bar with backdrop blur on scroll; links to `Trang Chủ`, `Về YGC / CLB` (`/#about`), `SOLFERA / D-DAY 2026` (`/#gala`), and CTA button `Đăng Ký Tham Dự` (`/register`).
  - Mobile: Hamburger toggle button activating dropdown drawer at viewport $\le 868\text{px}$. Closes on route change, click outside, or `Escape` key press.
  - Sub-brand badge in navbar: currently displays `YGC / AEP`.

### 3.2. Call-to-Action (CTA) Audit
- **Hero CTA 1**: `Đăng Ký Tham Dự Ngay` (`.hero-btn-main`, `.btn-cta`) -> navigates to `/register`.
- **Hero CTA 2**: `Khám Phá D-DAY 2026` (`.hero-btn-secondary`) -> smooth scroll to `#gala`.
- **About Section Bridging CTA**: `Khám Phá Chi Tiết SOLFERA D-DAY` (`.direction-btn`) -> smooth scroll to `#gala`.
- **Gala Section Heroic Banner CTA**: `Đăng Ký Tham Dự Ngay` (`.gala-banner-cta-btn`, `.btn-cta`) -> navigates to `/register`.
- **Navbar CTA**: `Đăng Ký Tham Dự` (`.nav-cta-btn`) -> navigates to `/register`.
- **Register Page Back Button**: `Quay Lại Trang Chủ` -> navigates to `/`.

### 3.3. Registration Form & State Management (`RegistrationForm.jsx`)
- **State Handling**: Fully controlled React component (`formData`, `errors`, `status`, `statusInfo`).
- **Submission States (6 explicit states)**:
  1. `idle`: Ready for user input.
  2. `validating`: Executing client validation upon form submission.
  3. `submitting`: Network request in progress; UI controls and submit button are locked against duplicate clicks.
  4. `submitted_unverified`: Dispatched via browser cross-origin hidden iframe (CORS opaque response); awaiting manual or email confirmation.
  5. `success`: Confirmed 200 OK from verified backend proxy or simulated mock.
  6. `error`: Network or server failure. **User-entered form values are strictly preserved**.
  7. `unconfigured`: Safeguard active when Google Form URL or entry IDs are placeholders. Prevents sending dirty or leaked payloads to invalid targets.
- **Field Navigation Pills**: Step navigation pills allowing smooth scrolling to form sections (`1. Cá Nhân`, `2. Đối Tượng`, `3. Ghi Chú`, `4. Xác Nhận`).
- **Success Modal**: `SuccessModal.jsx` overlays on successful submission, showing submitted values and ticket notes with reset capability.

### 3.4. Backend & Integration Services (`src/services/googleForm.js`)
- **Integration Status**: Currently in `UNCONFIGURED` safeguard mode.
- **Entry ID Placeholders**: `[PLACEHOLDER_ENTRY_FULL_NAME]`, `[PLACEHOLDER_ENTRY_EMAIL]`, `[PLACEHOLDER_ENTRY_PHONE]`, `[PLACEHOLDER_ENTRY_STUDENT_ID]`, `[PLACEHOLDER_ENTRY_CLASS_NAME]`, `[PLACEHOLDER_ENTRY_ATTENDEE_TYPE]`, `[PLACEHOLDER_ENTRY_NOTE]`, `[PLACEHOLDER_ENTRY_CONSENT]`.
- **Submission Modes**:
  - `DIRECT_GOOGLE_FORM`: Uses hidden iframe POST to bypass CORS blocking. Returns `submitted_unverified`.
  - `VERIFIED_API`: Ready for JSON POST to serverless backend function.
  - `MOCK`: Simulates 700ms latency for development/demo.
  - `UNCONFIGURED`: Blocks submission and shows clear guidance message.

### 3.5. Responsive & Layout Defect Audit
1. **Homepage Section Order**:
   - Existing order: `VideoHero` -> `AboutSection` (#about) -> `GalaSection` (#gala).
   - Customer requirement: Event information (`GalaSection`) must be placed **before** Club information (`AboutSection`).
   - Consequence: Navbar and footer link order must be updated to match the new page flow.
2. **Mobile CTA Button Wrapping & Padding**:
   - On screens $\le 360\text{px}$, long button text in `.gala-banner-cta-btn` and `.hero-btn-main` requires sufficient horizontal padding to prevent clipping. Existing CSS sets `width: 100%` and `white-space: normal` at $\le 640\text{px}$, but padding must be verified at 320px–360px.
3. **Form Support Buttons**:
   - `.register-support-actions` uses flexbox with wrapping; on viewports $\le 640\text{px}$, it switches to `flex-direction: column` which prevents horizontal overflow.
4. **Obsolete Sections in Code**:
   - `AboutSection.jsx` contains `mission-spotlight-card` ("Sứ Mệnh Cốt Lõi") and `activity-list` ("Lĩnh Vực Hoạt Động"), both marked for complete removal by customer.
   - `GalaSection.jsx` contains 3 static meaning cards ("Thắp Lửa Đam Mê", "Gắn Kết Thế Hệ", "Bứt Phá Giới Hạn") which must be replaced by the 3 event timeline milestones.
   - `Footer.jsx` and `AboutSection.jsx` contain Zalo community links which must be removed.

---

## 4. Architectural Assessment & Safe Revision Strategy

1. **Central Data Layer (`src/data/`)**:
   All text changes for event schedule, meaning, statistics, club identity, core values, and contact information should be updated directly in `galaData.js`, `clubData.js`, and `registrationConfig.js`. This guarantees that Navbar, Hero, GalaSection, AboutSection, RegisterPage, and Footer render consistent data from a single source of truth.
2. **Component Refactoring**:
   - `HomePage.jsx`: Swap `<GalaSection />` before `<AboutSection />`.
   - `VideoHero.jsx`: Update scroll target and text bindings; remove "Chủ đề" metadata pill from showcase frame footer.
   - `GalaSection.jsx`: Replace 3 meaning cards with Event Timeline; remove "Chủ đề chính thức" subtitle; bind new meaning text.
   - `AboutSection.jsx`: Remove "Sứ Mệnh Cốt Lõi" and "Lĩnh Vực Hoạt Động" sections; update Core Values to 4 customer values (Tôn trọng, Chủ động, Trách nhiệm, Đồng hành).
   - `RegisterPage.jsx` & `RegistrationForm.jsx`: Update header description and inject the mandatory 2-point notice banner at the top of the form.
   - `Footer.jsx`: Remove Zalo community button; update organization identity and contact information.
3. **Preservation of Core Mechanics**:
   - Controlled form state, validation, focus management, and accessibility attributes (`aria-*`, `role="alert"`) remain untouched.
   - Zero Layout Shift (`CLS = 0`) aspect ratios are preserved.

