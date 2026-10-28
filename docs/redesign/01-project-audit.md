# 01 — Báo Cáo Khảo Sát Toàn Diện Dự Án (Project Audit Report)
## Dự án: Chuẩn Bị Tái Thiết Kế Solfera – D-DAY 2026 (YGC / AEP)

- **Ngày thực hiện khảo sát**: 27/10/2026
- **Trạng thái Git**: Đã tạo và chuyển sang nhánh `redesign/solfera-dday-2026`
- **Địa chỉ website hiện tại**: `https://gala-night-club.vercel.app/`
- **Thư mục tài nguyên concept**: `concept_source/FINAL/`

---

## 1. Phân Tích Kỹ Thuật Dự Án (Project Analysis)

### 1.1. Công Nghệ & Thư Viện (Technology Stack)
- **Framework cốt lõi**: `React 18.3.1` kết hợp `React DOM 18.3.1`.
- **Bộ công cụ đóng gói (Bundler)**: `Vite 5.4.11` kèm `@vitejs/plugin-react 4.3.4`.
- **Hệ thống định tuyến (Routing)**: `react-router-dom 7.18.4`.
- **Bộ biểu tượng (Iconography)**: `lucide-react 0.468.0`.
- **Ngôn ngữ**: JavaScript hiện đại (ES2020+), cấu trúc mô-đun ESM tiêu chuẩn (`"type": "module"`).
- **Không có phụ thuộc thừa**: Danh mục `dependencies` sạch hoàn toàn, không sử dụng các thư viện UI cồng kềnh (không cài Bootstrap, Tailwind, MUI) giúp bundle nhẹ và tải nhanh.

### 1.2. Cấu Trúc Thư Mục Thực Tế (Directory Structure)
```
Web-Google-form/
├── concept_source/               # [MỚI] Tài nguyên thiết kế gốc Solfera D-DAY 2026
│   └── FINAL/
│       ├── 3Artboard 3.png       # Artboard thiết kế (2185 x 1229 px, 2.78 MB)
│       ├── DD26 AVA.png          # Avatar / Huy hiệu nhận diện vuông (4500 x 4500 px, 4.45 MB)
│       ├── DD26 COVER.png        # Banner bìa ngang siêu rộng (8863 x 3280 px, 5.30 MB)
│       └── DD26 VISUAL CHÍNH.png # Key Visual chính thức (9097 x 5117 px, 13.04 MB)
├── docs/                         # Hồ sơ tài liệu kỹ thuật
│   ├── redesign/                 # [MỚI] Thư mục tài liệu tái thiết kế
│   │   ├── screenshots/          # Ảnh chụp màn hình baseline hiện tại
│   │   ├── 00-project-constraints.md
│   │   └── 01-project-audit.md
│   ├── deployment-guide.md
│   ├── final-handover.md
│   ├── google-forms-setup.md
│   ├── phase4-optimization.md
│   └── phase4-test-report.md
├── public/                       # Tài nguyên tĩnh phục vụ phát hành
│   ├── assets/
│   │   ├── images/               # Thư mục ảnh web
│   │   └── video/                # Thư mục video web
│   └── _redirects                # Quy tắc SPA fallback cho Netlify / Cloudflare
├── src/
│   ├── components/
│   │   ├── common/               # Navbar, Footer, ScrollToAnchor, StatusMessage, SuccessModal, CountdownTimer
│   │   ├── form/                 # FormSection, TextInput, TextArea, RadioGroup, SingleCheckbox, SubmitButton, ValidationMessage
│   │   ├── home/                 # VideoHero, AboutSection, GalaSection
│   │   ├── layout/               # RootLayout (Navbar + Outlet + Footer + SkipLink)
│   │   └── registration/         # RegistrationForm (Biểu mẫu tiếp nhận người tham dự)
│   ├── data/
│   │   ├── clubData.js           # Dữ liệu CLB (milestones, pillars, activities, contact)
│   │   ├── galaData.js           # Dữ liệu sự kiện (theme, schedule, venue, highlights)
│   │   └── registrationConfig.js # Cấu hình trường nhập liệu & tùy chọn đối tượng
│   ├── pages/
│   │   ├── HomePage.jsx          # Trang chủ Landing Page (lazy loaded)
│   │   ├── RegisterPage.jsx      # Trang đăng ký tham dự (lazy loaded)
│   │   └── NotFoundPage.jsx      # Trang 404 fallback (lazy loaded)
│   ├── services/
│   │   └── googleForm.js         # Dịch vụ nộp đơn Google Form với 4 chế độ
│   ├── styles/
│   │   └── index.css             # Hệ thống Design System, biến màu CSS và Responsive
│   ├── utils/
│   │   ├── useScrollReveal.js    # IntersectionObserver kích hoạt hiệu ứng xuất hiện
│   │   └── validation.js         # Logic kiểm tra dữ liệu đầu vào biểu mẫu
│   ├── App.jsx                   # Cấu hình Router và Suspense fallback
│   └── main.jsx                  # Điểm khởi tạo ứng dụng React
├── dist/                         # Thư mục build phân phối
├── netlify.toml                  # Cấu hình Netlify
├── vercel.json                   # Cấu hình Vercel
├── vite.config.js                # Cấu hình Vite & Rollup vendor chunks
└── package.json
```

### 1.3. Hệ Thống Định Tuyến, Layout & Trang (Routes & Layouts)
- **Bộ định tuyến**: Sử dụng `BrowserRouter`, `Routes`, `Route` lồng nhau bọc bởi `RootLayout`.
- **Trang chủ (`/`)**: Tải `HomePage.jsx` theo cơ chế `React.lazy()`.
- **Trang đăng ký (`/register`)**: Tải `RegisterPage.jsx` theo cơ chế `React.lazy()`.
- **Trang lỗi (`*`)**: Tải `NotFoundPage.jsx` theo cơ chế `React.lazy()`.
- **Cơ chế cuộn trang liên route**: Component [`ScrollToAnchor.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/components/common/ScrollToAnchor.jsx) tự động cuộn mượt và kích hoạt focus cho các liên kết có hash (ví dụ: `/#about`, `/#gala`) với khoảng đệm bù trừ thanh Navbar (`scroll-margin-top: 85px`).

### 1.4. Hệ Thống CSS, Typography, Biểu Tượng & Animation
- **Kiến trúc CSS**: CSS thuần có tổ chức theo lớp biến (Custom Properties) tại [`src/styles/index.css`](file:///d:/Vibe%20Code/Web-Google-form/src/styles/index.css).
- **Phông chữ (Typography)**:
  - Heading: `'Outfit', sans-serif` (đậm chất hiện đại, hình học).
  - Body: `'Plus Jakarta Sans', sans-serif` (dễ đọc trên màn hình điện tử, hỗ trợ tốt tiếng Việt).
  - Tải phông chữ bất đồng bộ qua Google Fonts không chặn kết xuất màn hình.
- **Bảng màu hiện tại (TTV Gala Night - Blue/Gold/Cyan)**:
  - `--bg-dark`: `#070b12`
  - `--bg-card`: `rgba(18, 28, 45, 0.65)` (Glassmorphism mờ)
  - `--primary`: `#f6bd60` (Vàng hoàng gia)
  - `--secondary`: `#76d5cf` (Xanh ngọc cyan)
  - `--accent`: `#e66f51` (Cam san hô)
- **Hiệu ứng & Chuyển động (Animations)**:
  - Custom hook `useScrollReveal`: Sử dụng `IntersectionObserver` thêm lớp `.revealed` cho các phần tử khi lướt tới.
  - Hỗ trợ chế độ giảm chuyển động: `@media (prefers-reduced-motion: reduce)` triệt tiêu toàn bộ thời gian transition/animation.
  - Hero Video tự động tạm dừng khi cuộn khỏi màn hình bằng `IntersectionObserver`.

### 1.5. Quy Trình Build & Deploy Hiện Tại
- **Lệnh build**: `npm run build` $\rightarrow$ sinh thư mục `dist/`.
- **Bundle Chunks**: Tách biệt `index.js` (14.8 kB), `vendor-react.js` (178.7 kB), `vendor-icons.js` (16.7 kB), `HomePage.js` (17.4 kB), `RegisterPage.js` (29.7 kB).
- **Cấu hình SPA**: `vercel.json` và `public/_redirects` chuyển tiếp toàn bộ URL về `index.html` với mã trạng thái 200, ngăn chặn hoàn toàn lỗi 404 khi người dùng tải lại trang tại `/register`.

---

## 2. Kiểm Kê Chức Năng Hiện Tại (Functional Audit)

| Khu vực / Thành phần | Chức năng chi tiết | Trạng thái kỹ thuật | Hành vi bắt buộc bảo toàn |
|---|---|:---:|---|
| **Thanh điều hướng (Navbar)** | • Hiển thị Logo thương hiệu, liên kết Trang chủ, Về CLB (`#about`), Gala (`#gala`), nút CTA Đăng ký.<br>• Tự động đổi độ mờ nền khi cuộn trang (`navbar-scrolled`).<br>• Menu di động đóng mở mượt mà khi bấm nút Hamburger. | **Hoàn thiện** | Giữ nguyên điều hướng mượt mà, menu mobile và liên kết chuyển trang liên route. |
| **Video Hero (`#hero`)** | • HTML5 video phát tự động lặp lại (muted, playsinline, loop).<br>• Poster fallback hiển thị ngay khi nạp trang.<br>• Nút bật/tắt âm thanh trợ năng.<br>• Nút cuộn xuống khám phá.<br>• Tự động pause khi khuất màn hình hoặc khi bật reduced-motion. | **Hoàn thiện** | Giữ nguyên cơ chế tương tác âm thanh, observer tiết kiệm pin và fallback poster. |
| **Khu vực Giới thiệu (`#about`)** | • Dải số liệu cột mốc thực tế (`stats-grid`).<br>• Khối sứ mệnh cốt lõi.<br>• Lưới 4 cột trụ văn hóa (`pillars`).<br>• Danh sách hoạt động xen kẽ kèm hình ảnh mô tả.<br>• Khối CTA dẫn dắt sang phần Gala. | **Hoàn thiện** | Giữ nguyên cấu trúc lưới và cơ chế hiển thị số liệu cột mốc. |
| **Khu vực Sự kiện (`#gala`)** | • Giới thiệu chủ đề, ý nghĩa sự kiện.<br>• Khối thời gian, địa điểm tổ chức.<br>• Lưới 4 điểm nhấn chương trình.<br>• Khung trưng bày Key Visual / Poster.<br>• Đồng hồ đếm ngược (`CountdownTimer`).<br>• Nút CTA lớn chuyển hướng sang `/register`. | **Hoàn thiện** | Giữ nguyên cơ chế đếm ngược thời gian thực và thông tin địa điểm. |
| **Biểu mẫu đăng ký (`/register`)** | • Tiếp nhận 8 trường dữ liệu tinh gọn.<br>• Quản lý trạng thái có kiểm soát (Controlled React State).<br>• Kiểm tra hợp lệ thời gian thực (Inline Blur & Change Validation).<br>• Tự động cuộn và focus vào trường lỗi đầu tiên.<br>• Chống nhấp đúp (Double-click protection).<br>• Bảo lưu 100% dữ liệu đã nhập khi lỗi mạng. | **Hoàn thiện** | **Tuyệt đối không thay đổi bất kỳ logic validation và state management nào.** |
| **Máy trạng thái Nộp đơn** | Phân định 6 trạng thái độc lập:<br>1. `idle`: Sẵn sàng nhập liệu.<br>2. `validating`: Đang kiểm tra dữ liệu.<br>3. `submitting`: Khóa nút bấm, hiện spinner.<br>4. `submitted_unverified`: Đã gửi nhưng chưa xác thực trực tiếp (do CORS Google Form).<br>5. `success`: Đã xác thực thành công.<br>6. `error`: Lỗi mạng (bảo toàn input).<br>7. `unconfigured`: Chặn gửi khi chưa cấu hình URL thật. | **Hoàn thiện** | **Tuyệt đối bảo toàn luồng máy trạng thái này.** |
| **Hộp thoại Thành công (`SuccessModal`)** | • Hiển thị thông tin tóm tắt đăng ký.<br>• Huy hiệu linh hoạt theo trạng thái xác thực.<br>• Phím `Escape` và nút đóng an toàn.<br>• Nút *"Đăng ký thêm người khác"* đặt lại form sạch. | **Hoàn thiện** | Giữ nguyên tương tác modal và chức năng làm mới biểu mẫu. |
| **Chân trang (`Footer`)** | • Thông tin liên hệ Ban Tổ Chức (email, hotline, địa chỉ).<br>• Liên kết mạng xã hội (Fanpage, Zalo).<br>• Menu liên kết nhanh và nút cuộn lên đầu trang. | **Hoàn thiện** | Giữ nguyên nút cuộn lên đầu trang và liên kết liên hệ. |

---

## 3. Khảo Sát UI/UX & Hình Ảnh Baseline (UI/UX Audit)

### 3.1. Phân Tích Các Section Hiện Có
1. **Hero Section**: Nền video kết hợp gradient vignette xanh đậm - đen. Tiêu đề lớn hiển thị thông tin TTV Club. Nút CTA nổi bật màu vàng gold.
2. **About Section**: Thẻ kính Glassmorphism chứa số liệu cột mốc (`9+ năm`, `400+ thành viên`, `75+ sự kiện`). Khối hoạt động hiện đang dùng các khung placeholder hình ảnh với icon.
3. **Gala Section**: Chứa thẻ ý nghĩa sự kiện và khung poster hiện đang hiển thị placeholder ("KEY VISUAL & POSTER: Đang cập nhật"). Đồng hồ đếm ngược có 4 ô Ngày / Giờ / Phút / Giây.
4. **Register Page**: Bố cục 1 cột tập trung (Centered Card layout, `max-width: 800px`), chia thành 4 bước/phân khu rõ ràng bằng tiêu đề `h2`.

### 3.2. Ảnh Chụp Màn Hình Baseline (Hiện Trạng Live Website)
Hệ thống đã thực hiện chụp ảnh màn hình baseline trực tiếp từ website đang hoạt động `https://gala-night-club.vercel.app/` và lưu trữ tại thư mục [`docs/redesign/screenshots/`](file:///d:/Vibe%20Code/Web-Google-form/docs/redesign/screenshots/):
- **Trang chủ Desktop (1440 x 900)**: [`docs/redesign/screenshots/baseline_home_desktop.png`](file:///d:/Vibe%20Code/Web-Google-form/docs/redesign/screenshots/baseline_home_desktop.png)
- **Trang chủ Mobile (375 x 812)**: [`docs/redesign/screenshots/baseline_home_mobile.png`](file:///d:/Vibe%20Code/Web-Google-form/docs/redesign/screenshots/baseline_home_mobile.png)
- **Trang đăng ký Desktop (1440 x 900)**: [`docs/redesign/screenshots/baseline_register_desktop.png`](file:///d:/Vibe%20Code/Web-Google-form/docs/redesign/screenshots/baseline_register_desktop.png)
- **Trang đăng ký Mobile (375 x 812)**: [`docs/redesign/screenshots/baseline_register_mobile.png`](file:///d:/Vibe%20Code/Web-Google-form/docs/redesign/screenshots/baseline_register_mobile.png)

### 3.3. Đánh Giá Điểm Cần Cải Thiện Trong Quá Trình Redesign
- **Ngôn ngữ màu sắc**: Website hiện tại sử dụng tone xanh đen lạnh (`#070b12`) và vàng hoàng gia (`#f6bd60`). Trong khi đó, bộ nhận diện mới **Solfera – D-DAY 2026** mang phong cách **hỏa diễm, nham thạch, đỏ son (Crimson), hồng ngọc (Ruby) và đen thạch anh (Obsidian)** tràn đầy năng lượng tuổi trẻ của YGC/AEP.
- **Hình ảnh placeholder**: Khung poster tại Gala Section và các ô hình ảnh hoạt động hiện đang là khung giả định xám. Cần thay thế bằng các visual chính thức chất lượng cao từ `concept_source`.
- **Typography & Nhận diện**: Cần đưa logo và thương hiệu **YGC / AEP** và tựa đề **Solfera – D-DAY 2026** vào vị trí trang trọng nhất tại Navbar, Hero, Meta tags và Footer.

---

## 4. Kiểm Kê Tài Nguyên Thiết Kế Mới (Asset Discovery — `concept_source/`)

Thư mục `concept_source/FINAL/` chứa toàn bộ tài nguyên thiết kế đồ họa chất lượng gốc (Master Design Assets) của concept Solfera:

| Tên tệp tin gốc | Định dạng | Dung lượng | Độ phân giải | Tỉ lệ khung hình | Mục đích sử dụng dự kiến |
|---|:---:|:---:|:---:|:---:|---|
| **`DD26 VISUAL CHÍNH.png`** | PNG | **13.04 MB** | **9097 x 5117 px** | ~16:9 (1.778) | **Key Visual chính thức**: Sử dụng làm Hero Visual, Poster tâm điểm của sự kiện D-DAY 2026 và ảnh chia sẻ mạng xã hội (Open Graph). |
| **`DD26 COVER.png`** | PNG | **5.30 MB** | **8863 x 3280 px** | ~2.70:1 | **Banner ngang siêu rộng**: Sử dụng làm Section Banner, Facebook Cover, hoặc nền trải dài cho khối Đếm ngược / CTA. |
| **`DD26 AVA.png`** | PNG | **4.45 MB** | **4500 x 4500 px** | 1:1 (Vuông) | **Avatar & Huy hiệu nhận diện chính thức**: Sử dụng làm Logo Navbar, Favicon chất lượng cao, biểu tượng trung tâm hoặc con dấu sự kiện Solfera. |
| **`3Artboard 3.png`** | PNG | **2.78 MB** | **2185 x 1229 px** | ~16:9 (1.778) | **Artboard thị giác**: Sử dụng làm hình ảnh minh họa cho câu chuyện chủ đề Solfera, bối cảnh ý nghĩa hoặc thẻ điểm nhấn. |

### Phân Tích Bảng Màu Trích Xuất Từ Concept Solfera
Thông qua phân tích quang phổ điểm ảnh (Color Palette Extraction) trực tiếp từ các tệp concept:
- **Màu nền chủ đạo (Atmospheric Obsidian & Deep Void)**:
  - `#080201` / `#0c0302` / `#0f0403`: Đen than ấm, đen thạch anh đỏ thẫm (thay thế cho màu xanh đen lạnh `#070b12`).
- **Màu sắc nhận diện cốt lõi (Solfera Crimson & Fiery Ruby)**:
  - `#7e1c29` / `#811e27`: Đỏ thẫm hoàng hôn, sắc đỏ thạch lựu biểu trưng cho sức trẻ và ngọn lửa nhiệt huyết YGC.
  - `#b53b6a` / `#b6417b` / `#931a4e`: Ánh hồng ngọc phát quang (Neon Ruby / Magenta Embers) tạo điểm nhấn hiện đại, bắt mắt.
- **Màu nhấn sáng (Ember Highlights & Cream Gold)**:
  - `#ba6f6f` / `#f5e6e8` / `#fce4dc`: Sắc kem sáng và vàng ánh hồng dùng cho văn bản tiêu đề, viền sáng (glowing borders) và nút CTA.

> [!NOTE]
> **Kế hoạch xử lý tài nguyên ở Phase sau**: Tổng dung lượng 4 tệp gốc trong `concept_source/` là **~25.57 MB**, quá nặng để tải trực tiếp trên web di động. Ở Phase 2/3, chúng ta sẽ giữ nguyên vẹn thư mục `concept_source/`, đồng thời xuất các phiên bản nén web tối ưu (WebP / AVIF với kích thước 1920px và 800px, dung lượng dưới 250KB) đặt vào `public/assets/images/` để đảm bảo tốc độ tải trang dưới 1.5 giây.

---

## 5. Danh Sách Thành Phần Cần Bảo Toàn & Dự Kiến Tái Thiết Kế

### 5.1. Các Thành Phần BẮT BUỘC BẢO TOÀN NGUYÊN VẸN (Strictly Preserved)
1. **Kiến trúc luồng xử lý form ([`src/components/registration/RegistrationForm.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/components/registration/RegistrationForm.jsx))**:
   - Toàn bộ state `formData`, `errors`, `status`.
   - Các hàm `handleChange`, `handleBlur`, `handleSubmit`, `handleResetForm`.
   - Cơ chế tự động cuộn đến trường lỗi đầu tiên và focus input.
   - Cơ chế bảo toàn dữ liệu khi có lỗi mạng (không được xóa sạch form).
2. **Quy tắc xác thực ([`src/utils/validation.js`](file:///d:/Vibe%20Code/Web-Google-form/src/utils/validation.js))**:
   - Toàn bộ regex tiếng Việt có dấu, chuẩn hóa số điện thoại VN 10 chữ số, định dạng email, kiểm tra bắt buộc đồng ý điều khoản.
3. **Cổng nộp đơn ([`src/services/googleForm.js`](file:///d:/Vibe%20Code/Web-Google-form/src/services/googleForm.js))**:
   - 4 chế độ nộp đơn (`UNCONFIGURED`, `MOCK`, `DIRECT_GOOGLE_FORM`, `VERIFIED_API`).
   - Cấu hình an toàn không gửi dữ liệu giả mạo.
4. **Cơ chế cuộn neo liên tuyến ([`src/components/common/ScrollToAnchor.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/components/common/ScrollToAnchor.jsx))**:
   - Xử lý hash `/#about`, `/#gala` chuyển đổi mượt mà giữa các trang.
5. **Cấu hình triển khai ([`vercel.json`](file:///d:/Vibe%20Code/Web-Google-form/vercel.json), [`netlify.toml`](file:///d:/Vibe%20Code/Web-Google-form/netlify.toml), [`public/_redirects`](file:///d:/Vibe%20Code/Web-Google-form/public/_redirects))**:
   - Cơ chế SPA fallback chống lỗi 404 khi người dùng refresh trang.

### 5.2. Các Thành Phần SẼ ĐƯỢC REDESIGN Ở CÁC PHASE TIẾP THEO

| Tệp / Thành phần | Nội dung thay đổi dự kiến ở các Phase sau |
|---|---|
| **`src/styles/index.css`** | Chuyển hệ thống màu sang **Solfera Theme** (Nền đen thạch anh `#0c0302`, màu chính Đỏ son `#7e1c29`, màu nhấn Hồng ngọc neon `#b6417b`). Tinh chỉnh hiệu ứng glow và viền kính. |
| **`src/data/clubData.js`** | Cập nhật tên đơn vị tổ chức: **YGC / AEP** (CLB Thế hệ trẻ / Chương trình đào tạo tiên tiến AEP), sứ mệnh và định vị thương hiệu. |
| **`src/data/galaData.js`** | Đổi tên sự kiện thành **Solfera – D-DAY 2026**, cập nhật thông điệp sự kiện, 4 điểm nhấn chính và liên kết Key Visual mới. |
| **`src/components/common/Navbar.jsx`** | Đổi huy hiệu nhận diện sang logo **Solfera D-DAY 2026** (sử dụng `DD26 AVA.png`), cập nhật menu điều hướng. |
| **`src/components/home/VideoHero.jsx`** | Tích hợp Key Visual mới (`DD26 VISUAL CHÍNH.png`) làm backdrop chính, tinh chỉnh tiêu đề Solfera D-DAY 2026. |
| **`src/components/home/AboutSection.jsx`** | Cập nhật câu chuyện văn hóa YGC/AEP, đưa các visual thực tế vào thay thế khung placeholder. |
| **`src/components/home/GalaSection.jsx`** | Trưng bày poster chính thức `DD26 VISUAL CHÍNH.png`, áp dụng banner `DD26 COVER.png` cho khu vực đếm ngược và kêu gọi tham dự. |
| **`src/components/common/Footer.jsx`** | Cập nhật thông tin bản quyền và kênh mạng xã hội của YGC / AEP và Solfera D-DAY 2026. |
| **`index.html`** | Cập nhật Favicon mới từ `DD26 AVA.png`, đổi tiêu đề trang và Open Graph metadata sang Solfera D-DAY 2026. |

---

## 6. Kế Hoạch Triển Khai Chi Tiết Cho Các Phase Tiếp Theo

- **Phase 2 (Design System & Brand Assets)**:
  - Tạo các bản sao hình ảnh nén tối ưu (WebP) từ `concept_source/FINAL/` đưa vào `public/assets/images/`.
  - Cập nhật biến màu CSS tokens Solfera Crimson/Obsidian trong `index.css`.
  - Cập nhật Favicon và typography.
- **Phase 3 (Refactoring UI & Content)**:
  - Cập nhật nội dung nhận diện YGC/AEP trong `clubData.js` và `galaData.js`.
  - Thiết kế lại Navbar, Hero, About, Gala Section và Footer.
  - Tút tát lại giao diện thẻ form đăng ký và modal thành công đồng bộ với theme Solfera.
- **Phase 4 (Testing & Verification)**:
  - Kiểm thử tương thích responsive trên 4 khổ màn hình (375px, 768px, 1024px, 1440px).
  - Kiểm tra tính toàn vẹn của chức năng form validation và submission state.
  - Chạy bản build production `npm run build` xác nhận không có lỗi.

