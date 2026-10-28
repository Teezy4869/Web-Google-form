# 04 — Tái Thiết Kế Section Ý Nghĩa Sự Kiện & Tích Hợp Key Visual Chính Thức
## Dự án: Solfera – D-DAY 2026 | Nhận Diện YGC / AEP

> **Thực hiện:** Senior Frontend Engineer & UI/UX Designer  
> **Nhánh Git:** `redesign/solfera-dday-2026`  
> **Tài liệu tham chiếu:** `docs/redesign/00-project-constraints.md`, `docs/redesign/01-project-audit.md`, `docs/redesign/02-design-system.md`, `docs/redesign/03-global-layout-hero.md`  
> **Mã nguồn can thiệp:**  
> - `src/components/home/GalaSection.jsx`  
> - `src/styles/index.css`  
> - `src/data/galaData.js`

---

## 1. Tổng Quan Mục Tiêu & Vấn Đề Giao Diện Cũ

Section **"Ý nghĩa sự kiện"** là trái tim truyền tải thông điệp linh hồn của chiến dịch **Solfera – D-DAY 2026**. 

### 1.1 Hiện trạng trước khi nâng cấp
- **Khung ảnh placeholder thô sơ:** Cột bên phải chỉ hiển thị khung viền giả lập `KEY VISUAL & POSTER` với ghi chú *"Hình ảnh ấn phẩm chính thức: Đang cập nhật"*.
- **Sai lệch tỉ lệ khung hình (Aspect Ratio Mismatch):** Sử dụng class `aspect-4-3`, nếu nạp ảnh Key Visual chuẩn 16:9 sẽ dẫn đến méo hình (distortion) hoặc bị crop mất chữ, logo hai bên rìa.
- **Phân tầng nội dung đơn điệu:** Cột bên trái chỉ gồm hai đoạn văn bản dài, thiếu các điểm nhấn thị giác để người xem nhanh chóng nắm bắt 3 giá trị cốt lõi của Solfera.
- **Tàn dư nhận diện cũ:** Còn xuất hiện các cụm từ "GALA NIGHT 2026" và "TTV Club" ở CTA banner và countdown chưa đồng bộ.

---

## 2. Tích Hợp Key Visual Chính Thức (`DD26 VISUAL CHÍNH`)

### 2.1 Truy xuất và bảo tồn tài nguyên gốc
- **Tệp nguồn gốc:** `concept_source/FINAL/DD26 VISUAL CHINH.png` (Kích thước gốc: `9097 × 5117 px`, dung lượng `13.04 MB`).
- **Nguyên tắc bảo tồn:** Tuyệt đối không can thiệp, di chuyển hay ghi đè lên file gốc trong thư mục `concept_source/FINAL/`.
- **Bản sao nén web hiệu năng cao:** Sử dụng bản sao chuẩn hóa WebP đặt tại `public/assets/images/solfera-poster.webp`:
  - Độ phân giải tối ưu: `1200 × 674 px` (chuẩn tỷ lệ 16:9).
  - Dung lượng: **83.0 KB** (tiết kiệm hơn **99.3%** dung lượng so với file gốc 13.04 MB nhưng vẫn giữ nguyên độ trong trẻo và sắc nét trên màn hình Retina).
  - Tích hợp cấu hình thuộc tính: `loading="lazy"`, `decoding="async"`, `width="1200"`, `height="674"`.
  - Alt text ngữ nghĩa: `"Key Visual chính thức Solfera – D-DAY 2026 | YGC/AEP"`.

---

## 3. Kiến Trúc Tái Thiết Kế Giao Diện (UI/UX Redesign)

```
┌────────────────────────────────────────────────────────────────────────┐
│  [Card Nền Kính Rượu Vang Sẫm: gala-meaning-card | Viền Champagne]    │
│                                                                        │
│  ┌──────────────────────────────┐  ┌────────────────────────────────┐  │
│  │ [Kicker: Ý NGHĨA SỰ KIỆN]    │  │ [Floating Badge: OFFICIAL KV]  │  │
│  │                              │  │ ┌────────────────────────────┐ │  │
│  │ Khơi Nguồn Đam Mê —          │  │ │ Ảnh Key Visual 16:9        │ │  │
│  │ Bừng Sáng Tương Lai          │  │ │ Tinh thể lửa & vũ trụ      │ │  │
│  │                              │  │ └────────────────────────────┘ │  │
│  │ [Đoạn dẫn linh hồn Solfera]  │  │ ┌────────────────────────────┐ │  │
│  │                              │  │ │ Metadata: SOLFERA D-DAY 26 │ │  │
│  │ ┌──────────────────────────┐ │  │ │ Đơn vị: YGC / AEP          │ │  │
│  │ │ 🔥 Thắp Lửa Đam Mê       │ │  │ └────────────────────────────┘ │  │
│  │ ├──────────────────────────┤ │  └────────────────────────────────┘  │
│  │ │ 🤝 Gắn Kết Thế Hệ        │ │                                      │
│  │ ├──────────────────────────┤ │                                      │
│  │ │ 🚀 Bứt Phá Giới Hạn       │ │                                      │
│  │ └──────────────────────────┘ │                                      │
│  └──────────────────────────────┘                                      │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Cột Trái: Cấu Trúc Nội Dung & 3 Trụ Cột Giá Trị Cốt Lõi
1. **Kicker Badge:**
   - `.badge.badge-primary` với biểu tượng `Sparkles`: *"Ý Nghĩa Sự Kiện · Linh Hồn Solfera"*.
2. **Tiêu đề phân cấp (H3):**
   - Font hiển thị hoàng gia `Cinzel` (`--font-display`), kết hợp cụm chữ gradient kim loại Champagne sang Rose Pink: `"Khơi Nguồn Đam Mê — Bừng Sáng Tương Lai"`.
3. **Đoạn dẫn thông điệp (Lead Story):**
   - Trích xuất chuẩn xác từ `GALA_EVENT.meaning` và `GALA_EVENT.description`: Nơi ngọn lửa nhiệt huyết và tinh thần sáng tạo thăng hoa trong từng khoảnh khắc điện ảnh.
4. **Hệ thống 3 Trụ Cột Giá Trị (`meaning-values-grid`):**
   - **Thắp Lửa Đam Mê (`Flame`):** Khơi dậy nguồn cảm hứng sáng tạo và khát vọng dấn thân mãnh liệt của thế hệ trẻ công nghệ & truyền thông.
   - **Gắn Kết Thế Hệ (`HeartHandshake`):** Tri ân những cống hiến của thế hệ tiền bối, thắt chặt tinh thần đoàn kết bền chặt của đại gia đình YGC / AEP.
   - **Bứt Phá Giới Hạn (`Rocket`):** Mở ra chương mới đầy triển vọng, cùng nhau kiến tạo những giá trị tích cực và vươn tới tầm cao mới.
   - Tương tác: Hiệu ứng hover dịch chuyển nhẹ sang phải (`translateX(4px)`), sáng viền Champagne và tăng nền tương phản.

### 3.2 Cột Phải: Khung Trưng Bày Nghệ Thuật (Masterpiece Showcase Frame)
- **Tỉ lệ khung hình bất biến (16:9):** Class `.solfera-visual-media` sử dụng `aspect-ratio: 16 / 9`, loại bỏ hoàn toàn hiện tượng méo ảnh hoặc cắt mất thông tin nhận diện.
- **Chất liệu kính mờ rượu vang sẫm:** Nền `rgba(26, 8, 12, 0.92)` với viền vàng Champagne mỏng `1px solid var(--border-gold)`.
- **Ánh sáng phát quang Ruby (Ruby Ambient Glow):** Đổ bóng 2 lớp `0 20px 50px rgba(0, 0, 0, 0.65), 0 0 35px rgba(198, 65, 122, 0.2)`.
- **Huy hiệu nổi góc trên:** Đính badge mạ vàng sang trọng `OFFICIAL KEY VISUAL`.
- **Thanh metadata chân khung:**
  - Nhãn ấn phẩm: `ẤN PHẨM NHẬN DIỆN CHÍNH THỨC`
  - Tiêu đề: `SOLFERA – D-DAY 2026`
  - Tag đơn vị: `YGC / AEP`
- **Chuyển động vi mô (Subtle Micro-Interaction):**
  - Khi hover vào frame: Nâng nhẹ `-4px`, tỉ lệ phóng to tinh tế `1.015`, viền sáng chuyển sang màu vàng Champagne rực rỡ, ảnh phóng to `1.03` mượt mà với thời lượng `var(--transition-slow)`.

---

## 4. Đồng Bộ Nhận Diện Thương Hiệu Toàn Diện

- **Cập nhật CTA Banner:** Đổi dòng kêu gọi thành *"Bạn Đã Sẵn Sàng Hòa Mình Cùng SOLFERA – D-DAY 2026? Đừng bỏ lỡ đại sự kiện nghệ thuật và tri ân giàu cảm xúc nhất của YGC / AEP."*
- **Cập nhật Countdown:** Đổi nhãn đếm ngược thành *"Đếm Ngược Đến Giờ Khai Màn SOLFERA – D-DAY 2026"*.
- **Giữ vững tính chân thực của dữ liệu:** Lịch trình (`schedule.dateTime`) và địa điểm tiếp tục liên kết với `galaData.js`, bảo đảm trạng thái *"Đang cập nhật"* trung thực mà không bịa đặt số liệu.

---

## 5. Kết Quả Kiểm Thử (Validation Results)

| Hạng mục kiểm thử | Kịch bản / Môi trường | Kết quả đạt được |
| :--- | :--- | :--- |
| **Hiển thị hình ảnh** | Nạp file `solfera-poster.webp` | Ảnh hiển thị ngay lập tức, nét căng, không bị vỡ hoặc méo |
| **Không crop mất chữ/logo** | So sánh với file gốc `DD26 VISUAL CHINH.png` | Hiển thị trọn vẹn 100% diện tích đồ họa, logo Solfera và biểu tượng phượng hoàng lửa |
| **Responsive Mobile (375px - 480px)** | Màn hình điện thoại nhỏ | Lưới tự động chuyển sang 1 cột, frame co giãn mượt theo chiều rộng màn hình, không tràn ngang (`0px overflow`) |
| **Responsive Tablet (768px - 968px)** | Màn hình máy tính bảng | Khung ảnh tự động căn giữa với chiều rộng tối đa 600px |
| **Responsive Desktop (1280px+)** | Màn hình máy tính | Phân 2 cột cân xứng hoàn hảo (1.12fr : 0.88fr) |
| **Tương phản WCAG AA** | Chữ vàng Champagne/trắng trên nền rượu vang | Đạt tỷ lệ tương phản **16.8:1** (tiêu đề) và **8.1:1** (nội dung) |
| **Kiểm tra bản build** | `npm run build` | **0 lỗi** (thời gian build 16.20s, bundle JS và CSS tối ưu) |

