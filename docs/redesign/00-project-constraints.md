# 00 — Ràng Buộc & Nguyên Tắc Tái Thiết Kế (Project Constraints)
## Dự án: Redesign Website Solfera – D-DAY 2026 (YGC / AEP)

Tài liệu này xác lập các giới hạn phạm vi, nguyên tắc kiến trúc và các ràng buộc bắt buộc phải tuân thủ trong toàn bộ quá trình tái thiết kế giao diện (UI/UX) từ website hiện tại sang nhận diện thương hiệu chính thức **Solfera – D-DAY 2026 (YGC/AEP)**.

---

## 1. Mục Tiêu Dự Án (Objective)

Chuyển đổi toàn diện diện mạo giao diện người dùng (UI), trải nghiệm tương tác (UX), ngôn ngữ thị giác và hệ thống nhận diện từ chiến dịch Gala Night hiện tại sang **Solfera – D-DAY 2026** (Đơn vị: YGC / AEP), đồng thời **bảo toàn 100% tính toàn vẹn của logic nghiệp vụ, kiến trúc luồng dữ liệu và khả năng vận hành của website**.

- **Website tham chiếu hiện tại**: `https://gala-night-club.vercel.app/`
- **Thư mục tài nguyên thiết kế concept mới**: `concept_source/FINAL/`
- **Nhánh Git thực hiện**: `redesign/solfera-dday-2026`

---

## 2. Các Ràng Buộc Bắt Buộc (Mandatory Constraints)

### 2.1. Kiến Trúc & Mã Nguồn
1. **Không viết lại dự án từ đầu (No Rewrite from Scratch)**:
   - Giữ nguyên kiến trúc nền tảng React 18, Vite, React Router DOM, và cấu trúc component hiện hữu.
   - Tái sử dụng tối đa các thành phần giao diện nền tảng (UI primitives) đã được kiểm chứng trợ năng và responsive.
2. **Bảo toàn logic nghiệp vụ & tương tác (Preserve Business Logic)**:
   - Giữ nguyên luồng xử lý biểu mẫu (Controlled Form State, Validation Logic, 6 trạng thái nộp đơn: `idle`, `validating`, `submitting`, `submitted_unverified`, `success`, `error`, `unconfigured`).
   - Giữ nguyên cơ chế cuộn neo liên trang (`ScrollToAnchor`), xử lý lỗi 404 fallback (`NotFoundPage`), và bảo lưu dữ liệu người dùng khi gặp sự cố mạng.
3. **Không tự ý xóa, đổi tên hoặc di chuyển tệp tin gốc**:
   - Tất cả các tệp mã nguồn và tài nguyên gốc hiện có trong dự án không được tự ý xóa bỏ hay di chuyển đường dẫn gây đứt gãy phụ thuộc (broken imports).
   - Mọi tệp bổ sung mới phải được tổ chức đúng cấu trúc quy định.

### 2.2. Tài Nguyên Thiết Kế (Concept Assets)
1. **Bảo tồn tuyệt đối thư mục `concept_source/`**:
   - Thư mục `concept_source/FINAL/` chứa các tài nguyên thiết kế gốc chất lượng cao (`DD26 VISUAL CHÍNH.png`, `DD26 COVER.png`, `DD26 AVA.png`, `3Artboard 3.png`).
   - **Tuyệt đối không di chuyển, đổi tên, ghi đè hoặc chỉnh sửa các tệp gốc** trong thư mục này.
   - Khi đưa vào website ở các phase sau, cần tạo bản sao chép được nén tối ưu (WebP/JPEG) đặt vào thư mục `public/assets/` để phục vụ hiển thị web hiệu năng cao.

### 2.3. Dịch Vụ Google Form & Backend
1. **Google Form nằm ngoài phạm vi tái thiết kế**:
   - Quá trình redesign này tập trung hoàn toàn vào UI/UX, Design System, cấu trúc trang và nội dung nhận diện Solfera D-DAY 2026.
   - Cổng kết nối biểu mẫu tiếp tục được duy trì an toàn ở chế độ `UNCONFIGURED` hoặc `MOCK`, không tạo endpoint backend mới hoặc gửi request đến các URL giả mạo.

### 2.4. Tiêu Chuẩn Trợ Năng & Hiệu Năng (A11y & Performance)
1. **WCAG 2.1 AA**: Cây tiêu đề tiếp tục duy trì chuẩn mực không nhảy cấp (`h1` $\rightarrow$ `h2` $\rightarrow$ `h3`), viền focus `:focus-visible` tương phản cao, thẻ live region `role="alert"` duy trì trong DOM.
2. **Zero Layout Shift (CLS = 0)**: Mọi hình ảnh Key Visual và Poster mới phải được khai báo tỉ lệ `aspect-ratio` hoặc kích thước `width`/`height` rõ ràng.
3. **Phân tách mã (Code Splitting)**: Tiếp tục duy trì cơ chế tải động `React.lazy()` và vendor chunks trong Vite build.

---

## 3. Chiến Lược Phân Kỳ Thực Hiện (Phased Roadmap)

```
[Phase 1: Khảo Sát & Lập Hồ Sơ] ──► (GIAI ĐOẠN HIỆN TẠI - STOP TẠI ĐÂY)
        │  • Phân tích cấu trúc, chức năng, UI/UX hiện hữu
        │  • Khảo sát tài nguyên concept_source
        │  • Tạo nhánh Git redesign & tài liệu audit
        ▼
[Phase 2: Thiết Lập Hệ Thống Thiết Kế (Design System)]
        │  • Xây dựng Design Tokens: Bảng màu Solfera (Crimson/Obsidian/Ruby)
        │  • Chuẩn hóa Typography & Visual components
        │  • Tối ưu tài nguyên từ concept_source đưa vào public/assets/
        ▼
[Phase 3: Tái Thiết Kế & Chuyển Đổi Nội Dung]
        │  • Cập nhật Brand: Solfera – D-DAY 2026 (YGC/AEP)
        │  • Redesign Navbar, Hero Section, About YGC, D-DAY Showcase, Footer
        │  • Tái tạo giao diện biểu mẫu tham dự phù hợp concept mới
        ▼
[Phase 4: Kiểm Thử, Tối Ưu & Xác Nhận]
        │  • Kiểm thử Responsive (375px - 1440px), Form validation, Routing
        │  • Kiểm tra build Vite & báo cáo phát hành
```

---

## 4. Cam Kết Giai Đoạn 1 (Phase 1 Commitment)

Trong lần thực thi này:
- Chỉ thực hiện khảo sát, đánh giá, kiểm kê tài nguyên, tạo branch và lập tài liệu hồ sơ dự án.
- **Dừng lại ngay sau khi hoàn thành Phase 1**, tuyệt đối không tự ý bắt đầu Phase 2.

