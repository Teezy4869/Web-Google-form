# 03 — Tái Thiết Kế Bố Cục Toàn Cục, Navbar, Hero Section & Footer
## Dự án: Solfera – D-DAY 2026 | Nhận Diện YGC / AEP

> **Thực hiện:** Senior Frontend Developer  
> **Nhánh Git:** `redesign/solfera-dday-2026`  
> **Tài liệu tham chiếu:** `docs/redesign/00-project-constraints.md`, `docs/redesign/01-project-audit.md`, `docs/redesign/02-design-system.md`  
> **Mã nguồn can thiệp:**  
> - `src/components/layout/RootLayout.jsx`  
> - `src/components/common/Navbar.jsx`  
> - `src/components/home/VideoHero.jsx`  
> - `src/components/common/Footer.jsx`  
> - `src/data/clubData.js`  
> - `src/data/galaData.js`  
> - `src/styles/index.css`  
> - `index.html`

---

## 1. Tổng Quan Mục Tiêu & Phạm Vi (Executive Overview)

Trong giai đoạn này, các thành phần khung sườn toàn cục của website đã được nâng cấp toàn diện lên nhận diện thương hiệu **Solfera – D-DAY 2026 (YGC / AEP)**:
- **Phong cách thị giác:** Hiện đại (Modern), Sang trọng (Luxury), Tinh tế (Elegant) và Điện ảnh (Cinematic).
- **Hệ màu:** Đỏ rượu vang sẫm (Deep Wine), đỏ Burgundy, đỏ Ruby, hồng Rose Pink và vàng kim Champagne.
- **Bảo toàn chức năng:** Toàn bộ hành vi điều hướng (routing), cuộn neo liên trang (`ScrollToAnchor`), trợ năng bàn phím (WCAG AA), logic nộp form tiếp tục được giữ nguyên trạng 100%.
- **Tính xác thực thương hiệu:** Không tự sáng tác slogan, lịch trình hay số liệu chưa được xác minh. Mọi trường thông tin chưa công bố tiếp tục hiển thị trạng thái chính thống *"Đang cập nhật"*.

---

## 2. Bố Cục Toàn Cục (Global Layout Architecture)

### 2.1 Cấu Trúc Khung Ứng Dụng (`RootLayout.jsx`)
```jsx
<div className="app-layout">
  <ScrollToAnchor />
  <a href="#main-content" className="skip-link">Chuyển đến nội dung chính</a>
  <Navbar />
  <main id="main-content" tabIndex="-1">
    <Outlet />
  </main>
  <Footer />
</div>
```
- **Skip Navigation Link:** Chuẩn WCAG 2.1 AA, hiển thị rõ ràng khi bấm `Tab` với viền focus trắng trên nền Champagne (`var(--champagne)`).
- **Bảo vệ chống tràn ngang:** Thiết lập `overflow-x: hidden` trên toàn bộ thẻ `body` và container `.app-layout`.

### 2.2 Nền Khí Quyển Đa Lớp (Atmospheric Layering)
- Nền vũ trụ điện ảnh màu rượu vang sẫm (`--bg-primary: #120507`).
- 3 vầng sáng quang học tỏa tròn (Radial Glow Orbs):
  - **Góc trên phải (Orb Rose):** Tỏa sắc hồng Rose Pink mờ ảo (`rgba(198, 65, 122, 0.16)`).
  - **Góc dưới trái (Orb Ruby):** Tỏa sắc đỏ Ruby quyền quý (`rgba(129, 34, 64, 0.18)`).
  - **Trung tâm (Orb Champagne):** Tỏa ánh vàng kim Champagne tinh tế (`rgba(243, 209, 166, 0.08)`).
- Chuyển tiếp mượt giữa các section nhờ dải phân cách `.section-divider` dạng gradient biến mất về hai mép màn hình.

---

## 3. Thanh Điều Hướng (Navbar Redesign)

### 3.1 Điểm Nâng Cấp Giao Diện
- **Logo Thương Hiệu:** Tích hợp logo Solfera tròn độ nét cao (`/assets/images/solfera-logo.webp`, 38x38px) kèm viền Champagne sáng và quầng sáng phát quang.
- **Cụm Tên Thương Hiệu:**
  - Chữ `SOLFERA` sử dụng phông hiển thị `Cinzel` (`--font-display`), giãn chữ `0.06em` đẳng cấp.
  - Badge sự kiện: `D-DAY 2026` nền hồng rượu vang sang trọng.
  - Tag tổ chức: `YGC / AEP` viền Champagne mỏng xác định đơn vị chủ quản.
- **Trạng thái cuộn (Sticky Navbar):**
  - Trạng thái thường: Kính mờ rượu vang sẫm 72% (`rgba(18, 5, 7, 0.72)`) với `backdrop-filter: blur(16px)`.
  - Trạng thái cuộn trang (`navbar-scrolled`): Tăng độ mờ đục lên 95%, blur 20px, viền đáy chuyển sang sắc vàng Champagne với đổ bóng sâu 35px.
- **Menu Di Động (Mobile Drawer):**
  - Nút hamburger viền Champagne chuyển đổi mượt thành icon đóng (`X`).
  - Hộp dropdown kính mờ toàn màn hình, tự động đóng khi chọn link, nhấn phím `Escape` hoặc click ra ngoài.
  - Nút CTA "Đăng Ký Tham Dự" trải rộng 100% chiều ngang thuận tiện thao tác một tay trên điện thoại.

### 3.2 Ma Trận Điều Hướng (Navigation Matrix)
| Nhãn liên kết | Đích đến | Hành vi |
| :--- | :--- | :--- |
| **SOLFERA Logo** | `/` | Cuộn mượt lên đỉnh đầu trang chủ |
| **Trang Chủ** | `/` | Điều hướng trang chủ |
| **Về YGC / CLB** | `/#about` | Cuộn mượt đến section giới thiệu `#about` |
| **D-DAY 2026** | `/#gala` | Cuộn mượt đến section sự kiện `#gala` |
| **Đăng Ký Tham Dự** | `/register` | Điều hướng biểu mẫu tham dự (CTA chính) |

---

## 4. Hero Section Điện Ảnh Mới (Modern Cinematic Hero)

Thay vì áp đặt một bức ảnh poster tĩnh tràn màn hình gây khó đọc chữ, Hero mới được thiết kế theo cấu trúc **Hybrid Spotlight**:

```
┌────────────────────────────────────────────────────────────────────────┐
│  [Hero Backdrop: Visual Solfera Mờ Ảo 15% + Vignette + Radial Orbs]   │
│                                                                        │
│  ┌──────────────────────────────┐  ┌────────────────────────────────┐  │
│  │ [Kicker: NHẬN DIỆN YGC/AEP]  │  │ [Official Key Visual Card]     │  │
│  │                              │  │                                │  │
│  │ SOLFERA                      │  │   ┌────────────────────────┐   │  │
│  │ D-DAY 2026                   │  │   │ Visual Chính Thức      │   │  │
│  │                              │  │   │ Solfera – D-DAY 2026   │   │  │
│  │ [Tagline & Sứ mệnh chính]    │  │   └────────────────────────┘   │  │
│  │                              │  │   Đơn vị: YGC/AEP | Chủ đề:... │  │
│  │ [Pills: Thời gian, PTIT...]  │  └────────────────────────────────┘  │
│  │                              │                                      │
│  │ [CTA Đăng Ký] [CTA Khám Phá] │                                      │
│  └──────────────────────────────┘                                      │
│                                                                        │
│                      [Scroll Mouse Indicator]                          │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Thứ Bậc Nội Dung & Typography
1. **Kicker:** Badge `NHẬN DIỆN CHÍNH THỨC · YGC / AEP` kèm biểu tượng ngôi sao lấp lánh `Sparkles`.
2. **Tiêu đề chính (H1):**
   - Từ khóa `SOLFERA`: Phông chữ hoàng gia `Cinzel`, kích thước `clamp(3.2rem, 7.5vw, 5.8rem)`, phủ gradient kim loại Champagne sang Rose Pink rực rỡ.
   - Phụ đề `D-DAY 2026`: Phông hiện đại `Outfit`, chữ hoa sắc sảo màu trắng tinh khiết.
3. **Mô tả & Tagline:**
   - Dòng tagline lấy từ nguồn chuẩn xác `GALA_EVENT.tagline`.
   - Giữ nguyên thông điệp chính thức, không thêm thắt nội dung chưa kiểm chứng.
4. **Dải thẻ thông tin nhanh (Info Pills):**
   - Thời gian: `GALA_EVENT.schedule.dateTime` (hiển thị *"Đang cập nhật"* an toàn).
   - Địa điểm: `Học viện Công nghệ Bưu chính Viễn thông (PTIT), Hà Nội`.
   - Vé: `Vé tham dự miễn phí`.
5. **Nút Hành Động Kép (Dual CTAs):**
   - **CTA Chính:** *"Đăng Ký Tham Dự Ngay"* sử dụng class `.btn-primary.btn-cta` với hiệu ứng ánh sáng phát quang nhịp đập 2.8s (`ctaGlow`).
   - **CTA Phụ:** *"Khám Phá D-DAY 2026"* sử dụng kính mờ Burgundy `.btn-secondary`, cuộn mượt xuống section sự kiện.

### 4.2 Thẻ Trưng Bày Nghệ Thuật (Key Visual Showcase Card)
- Khung kính mờ cao cấp với viền vàng Champagne phản chiếu ánh sáng.
- Tỉ lệ khung hình chuẩn 16:9 (`aspect-ratio: 16 / 9`) ngăn ngừa hoàn toàn hiện tượng giật layout (CLS = 0).
- Chân thẻ hiển thị metadata chính thống: Đơn vị tổ chức `YGC / AEP` và Chủ đề `SOLFERA`.

---

## 5. Chân Trang (Footer Redesign)

- **Cột 1 (Nhận diện & Cộng đồng):** Logo Solfera, tên `SOLFERA D-DAY 2026`, đơn vị `YGC / AEP`, lời giới thiệu ngắn gọn và 2 nút liên kết mạng xã hội chính thức (Fanpage & Zalo).
- **Cột 2 (Ban Tổ Chức):** Email `dday.ygc.aep@gmail.com`, Hotline, và địa chỉ trụ sở tại PTIT.
- **Cột 3 (Điều hướng nhanh):** 4 liên kết nội bộ đồng bộ với thanh Navbar.
- **Thanh chân trang (Bottom Bar):** Bản quyền năm 2026 thuộc về Ban Tổ Chức SOLFERA D-DAY 2026 | YGC/AEP và nút bấm *"Lên đầu trang"* mượt mà.

---

## 6. Kiểm Thử Trợ Năng & Responsive (Validation Results)

| Tiêu chí | Phương thức kiểm tra | Kết quả |
| :--- | :--- | :--- |
| **Mobile (375px - 480px)** | Thu nhỏ viewport kiểm tra tràn ngang | Không tràn ngang (`0px horizontal overflow`), menu drawer đóng mở mượt, CTA dàn đều 100% |
| **Tablet (768px - 1024px)** | Kiểm tra grid collapse | Grid 2 cột chuyển thành 1 cột trung tâm cân đối |
| **Desktop (1280px - 1920px)** | Kiểm tra hiển thị tỷ lệ màn hình rộng | Container chuẩn 1240px căn giữa, visual card sắc nét |
| **Tương phản chữ (Contrast)**| WCAG AA / AAA | Đạt 16.8:1 trên tiêu đề chính và 8.1:1 trên văn bản phụ |
| **Bản build phân phối** | `npm run build` | **0 lỗi**, toàn bộ component bundle thành công |

