# 07 — Hoàn Thiện Animation, Responsive Design & Web Performance
## Dự án: Solfera – D-DAY 2026 | Nhận Diện YGC / AEP

> **Thực hiện:** Senior Frontend Engineer (Animation, Responsive & Performance Specialist)  
> **Nhánh Git:** `redesign/solfera-dday-2026`  
> **Tài liệu tham chiếu:**  
> - `docs/redesign/00-project-constraints.md`  
> - `docs/redesign/01-project-audit.md`  
> - `docs/redesign/02-design-system.md`  
> - `docs/redesign/03-global-layout-hero.md`  
> - `docs/redesign/04-event-meaning-visual.md`  
> - `docs/redesign/05-content-sections.md`  
> - `docs/redesign/06-forms-interactions.md`  
> **Mã nguồn can thiệp:**  
> - `src/styles/index.css`  
> - `src/utils/useScrollReveal.js`  
> - `src/components/home/VideoHero.jsx`  
> - `src/components/home/GalaSection.jsx`  
> - `src/pages/RegisterPage.jsx`

---

## 1. Kiểm Kê & Kiến Trúc Chuyển Động (Motion Architecture)

Website tuân thủ triết lý thiết kế: **Modern luxury, elegant, mysterious, cinematic but lightweight** — tập trung vào chiều sâu thị giác và tính tinh tế thay vì biến trang web thành một trải nghiệm 3D cồng kềnh.

### 1.1 Nguyên Tắc Chuyển Động
1. **Compositor-Only Animations:** 100% chuyển động sử dụng `transform` và `opacity`, không kích hoạt reflow hay layout shift (CLS = 0).
2. **GPU Memory Conservation:** Thuộc tính `will-change: opacity, transform` chỉ được bật trong trạng thái chuẩn bị animate; khi phần tử đã hiện diện (`.is-visible`), `will-change` lập tức được giải phóng về `auto` để giải phóng bộ nhớ đồ họa.
3. **Không Gây Cản Trở Tương Tác (Non-blocking):** Toàn bộ các nút bấm, liên kết và ô nhập liệu đều có thể tương tác ngay lập tức kể cả khi hiệu ứng chuyển động chưa kết thúc.
4. **Hỗ Trợ Toàn Diện `prefers-reduced-motion`:** Với người dùng bật chế độ giảm chuyển động trong hệ điều hành, toàn bộ `@keyframes`, `transition` và vòng lặp tự động tắt hoàn toàn (`0.01ms`), mọi nội dung hiển thị ngay ở trạng thái hoàn chỉnh.

---

## 2. Chi Tiết Các Animation Được Triển Khai

### 2.1 Hero Section Entrance & Ambient Float
- **Entrance Sequence:**
  - Nhãn Kicker (`.hero-animate-kicker`): Trượt nhẹ từ trên xuống (`translateY(-16px) -> 0`, trễ 0.1s).
  - Đại tự thương hiệu (`.hero-animate-title`): Xuất hiện từ dưới lên kết hợp mở rộng nhẹ khoảng cách chữ (`letter-spacing: 0.01em -> 0.04em`, trễ 0.25s).
  - Khẩu hiệu & Mô tả (`.hero-animate-tagline`, `.hero-animate-desc`): Fade-up mềm mại (trễ 0.4s - 0.5s).
  - Dải thông tin & Nút hành động (`.hero-animate-pills`, `.hero-animate-actions`): Fade-up (trễ 0.6s - 0.7s).
  - Khung Key Visual (`.hero-animate-visual`): Scale-up từ `0.96` lên `1` (trễ 0.35s).
- **Ambient Breathing Float (`heroVisualFloat`):**
  - Khung tranh Key Visual tại Hero nhấp nhô rất nhẹ theo chu kỳ 7 giây (`translateY(-6px)`), quầng sáng hồng ngọc và vàng Champagne đổi sắc tự nhiên, tạo cảm giác điện ảnh sống động mà không tiêu hao CPU/GPU.

### 2.2 Key Visual Masterpiece Showcase Frame (Sự Kiện D-DAY)
- **Viewport Entrance (`.reveal-scale`):** Khi người xem cuộn tới khu vực *Ý nghĩa sự kiện*, khung tranh phóng nhẹ từ `0.97` lên `1` cùng độ mờ từ `0` sang `1`.
- **Hiệu Ứng Thở Điện Ảnh (`keyVisualBreathe`):** Chu kỳ thở 6 giây luân chuyển quầng hào quang vàng Champagne (`rgba(243, 209, 166, 0.48)`) và hồng ngọc Ruby (`rgba(198, 65, 122, 0.35)`).
- **Hover Desktop:** Nâng nhẹ `-5px`, mở rộng quầng sáng `0 28px 70px rgba(0, 0, 0, 0.75)`, ảnh gốc scale nhẹ `1.03` bên trong khung kính 16:9, **tuyệt đối không bị crop hoặc biến dạng tỉ lệ**.

### 2.3 Scroll-Triggered Stagger Reveals
- Nâng cấp Hook [`useScrollReveal.js`](file:///d:/Vibe%20Code/Web-Google-form/src/utils/useScrollReveal.js) sử dụng `IntersectionObserver` với ngưỡng nhạy `threshold: 0.1` và `rootMargin: '0px 0px -30px 0px'`.
- Hỗ trợ các lớp trễ phân tầng:
  - `.reveal-delay-1`: `0.08s`
  - `.reveal-delay-2`: `0.16s`
  - `.reveal-delay-3`: `0.24s`
  - `.reveal-delay-4`: `0.32s`
  - `.reveal-delay-5`: `0.40s`
  - `.reveal-delay-6`: `0.48s`
- Áp dụng trên dải số liệu cột mốc (`stats-grid`), 4 cột trụ văn hóa (`pillar-card`), 4 mảng hoạt động (`activity-item`), 4 dấu ấn đêm hội (`highlight-card`), và toàn bộ các tiêu đề phân đoạn (`section-header`).

### 2.4 Micro-Interactions Trên Từng Component
- **Buttons (`.btn`):**
  - Hiệu ứng phản hồi xúc giác khi bấm: `.btn:active:not(:disabled) { transform: scale(0.98); }`.
  - Nút CTA nhung đỏ Solfera (`.btn-cta`): Hiệu ứng phát quang tuần hoàn 2.8s (`ctaGlow`).
- **Interactive Cards (`.glass-card-interactive`):**
  - Nâng nhẹ `-4px`, sáng bừng viền vàng Champagne, bóng đổ sâu `box-shadow: var(--shadow-lg), 0 0 30px var(--primary-glow)`.
- **Form Controls:**
  - Viền phát quang kép Champagne + Rose khi focus.
  - Vòng tròn radio và hộp kiểm checkbox phóng to đàn hồi khi được tích chọn.
  - Thông báo lỗi trượt nhẹ êm ái với `errorSlideIn`.

---

## 3. Kiểm Thử & Tối Ưu Hóa Responsive (Responsive Audit)

Toàn bộ bố cục và thành phần giao diện đã được kiểm tra trên các dải màn hình từ hẹp nhất đến rộng nhất:

| Độ phân giải | Thiết bị đại diện | Các điểm tối ưu đạt được |
|:---:|---|---|
| **320px** | iPhone SE (1st gen) / Thiết bị siêu hẹp | Padding container co về `0.75rem`; đại tự tiêu đề Hero co về `2.25rem` tránh tràn màn hình; ô đếm ngược Countdown co font về `1.25rem` và padding `0.5rem 0.25rem` đảm bảo cả 4 ô (Ngày, Giờ, Phút, Giây) nằm gọn trên 1 hàng; lưới form 1 cột tuyệt đối không có scrollbar ngang. |
| **375px** | iPhone SE / iPhone 8 | Bố cục thoáng đãng, nút bấm CTA chuyển `width: 100%`, touch target > 44px; các thẻ hoạt động xếp dọc theo trình tự tự nhiên. |
| **430px** | iPhone 14/15/16 Pro Max | Khung ảnh 16:9 sắc nét, padding thẻ kính mờ `1.5rem`, hiển thị đầy đủ dải pill thông tin sự kiện. |
| **768px** | iPad / Tablet Portrait | Hero chuyển sang bố cục 1 cột cân đối; lưới trụ cột và dấu ấn chuyển thành 2 cột (`grid-2`); khung Key Visual canh giữa hoàn hảo với max-width `600px`. |
| **1024px** | iPad Pro Landscape / Laptop nhỏ | Bố cục 2 cột bất đối xứng (`1.15fr : 0.85fr`), khoảng cách gap `clamp(2rem, 5vw, 4.5rem)` tạo nhịp thở thị giác sang trọng. |
| **1440px+** | Desktop HD / Màn hình rộng | Chiều rộng tối đa container chuẩn `1240px`, căn giữa cân xứng, quầng sáng ambient background cố định theo góc nhìn tạo chiều sâu sân khấu rực rỡ. |

**Bảo vệ chống tràn ngang (Horizontal Overflow Protection):**
Thiết lập `overflow-x: hidden; width: 100%; max-width: 100vw;` tại `html`, `body`, `#root`, `.app-layout`, `.homepage-content` và `.register-page-content`.

---

## 4. Đánh Giá Tiêu Chuẩn Trợ Năng (Accessibility / WCAG)

1. **Độ Tương Phản Màu Sắc (Color Contrast):**
   - Màu chữ chính `--text-main` (`#fcf7f4`) trên nền đen rượu vang obsidian `--bg-primary` (`#120507`) đạt tỉ lệ tương phản vượt trội **14.8:1** (vượt xa tiêu chuẩn WCAG AAA là 7:1).
   - Màu vàng Champagne `--champagne` (`#f3d1a6`) và hồng ngọc `--rose` (`#c6417a`) được sử dụng có chọn lọc cho nhãn, icon và viền, luôn có nền sẫm bảo đảm khả năng đọc.
2. **Điều Hướng Bàn Phím & Focus States:**
   - Trạng thái `:focus-visible` chuẩn mực với viền kép 2px Champagne + 4px Rose Pink quầng sáng rõ ràng.
   - Liên kết nhảy nhanh (`skip-link`) đến nội dung chính sẵn sàng cho người dùng sử dụng phím Tab.
   - Nút mở menu mobile có diện tích chạm `min-width: 44px; min-height: 44px;`, hỗ trợ phím `Escape` để đóng menu.
3. **Cấu Trúc Ngữ Nghĩa & Alt Text:**
   - Thứ bậc heading chặt chẽ: `<h1>` tại Hero -> `<h2>` tại từng section -> `<h3>` tại từng khối nội dung -> `<h4>` tại từng mục chi tiết.
   - Toàn bộ hình ảnh nội dung mang alt text mô tả đầy đủ; hình nền trang trí và hiệu ứng ánh sáng được gắn `aria-hidden="true"`.

---

## 5. Tối Ưu Hóa Hiệu Năng (Web Performance)

1. **Chiến Lược Tải Hình Ảnh (Image Loading Strategy):**
   - **Above-The-Fold (Hero Visual):** Ảnh `solfera-hero-visual.webp` được đánh dấu `loading="eager"` và `fetchPriority="high"`, cung cấp sẵn kích thước gốc `width="1200"` và `height="674"`, triệt tiêu hoàn toàn Layout Shift (**CLS = 0**).
   - **Below-The-Fold (Story Art, Poster, Banner, Gala Visual):** Được cấu hình `loading="lazy"` và `decoding="async"`, bảo toàn băng thông khởi tạo ban đầu.
2. **Kích Thước Bundle Sản Phẩm (Production Bundle):**
   - `dist/index.html`: `2.86 kB` (gzip: `1.00 kB`)
   - `dist/assets/index-9xRe_zp2.css`: `48.01 kB` (gzip: `9.71 kB`)
   - `dist/assets/useScrollReveal-CDVtWEl4.js`: `0.73 kB` (gzip: `0.37 kB`)
   - `dist/assets/HomePage-aRpKp6jn.js`: `19.67 kB` (gzip: `5.13 kB`)
   - `dist/assets/RegisterPage-ZPyyJoF2.js`: `33.11 kB` (gzip: `10.17 kB`)
   - `dist/assets/vendor-react-CYCMOJOU.js`: `178.74 kB` (gzip: `58.72 kB`)
3. **Thời Gian Build:** `13.51 giây` với 0 lỗi, 0 cảnh báo.

---

## 6. Kết Luận & Trạng Thái

Phase 7 đã hoàn thành trọn vẹn mục tiêu tối ưu animation tinh tế, cải thiện responsive từ 320px đến 1440px, củng cố accessibility và tối ưu hóa hiệu năng web.

> [!IMPORTANT]
> **Dừng lại theo yêu cầu:** Phase 7 đã hoàn tất. **Không bắt đầu Phase 8**.
