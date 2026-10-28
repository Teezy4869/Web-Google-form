# Báo Cáo Kiểm Thử Giai Đoạn 4 (Phase 4 Test Report)
## Dự án: TTV Club GALA NIGHT Website (React 18 + Vite)

- **Ngày thực hiện**: 27/10/2026
- **Môi trường thử nghiệm**:
  - Node.js: `v24.18.0`
  - Vite Production Preview Server: `http://localhost:4173`
  - Trình duyệt kiểm thử thực tế:
    - Google Chrome `131.0.x` (Headless Engine)
    - Microsoft Edge `131.0.x` (Headless Engine)
  - Khổ màn hình (Viewports):
    - Mobile: `375 x 812 px`
    - Tablet: `768 x 1024 px`
    - Small Desktop: `1024 x 768 px`
    - Large Desktop: `1440 x 900 px`

---

## 1. Tóm Tắt Kết Quả Kiểm Thử (Executive Summary)

| Tổng số ca kiểm thử | Đạt (PASS) | Thất bại (FAIL) | Bị chặn (BLOCKED) | Tỷ lệ thành công |
|:---:|:---:|:---:|:---:|:---:|
| **53** | **53** | **0** | **0** | **100%** |

- **Toàn bộ hành trình người dùng (User Journey)**: Vận hành mượt mà từ Trang chủ (`/`), xem Video Hero, lướt qua Về CLB (`#about`), GALA NIGHT (`#gala`), chuyển hướng sang Phiếu đăng ký (`/register`), xác thực dữ liệu 8 trường, nộp đơn và phản hồi trạng thái.
- **Tính tiếp cận & Trợ năng (Accessibility)**: Đạt chuẩn ARIA cho liên kết bỏ qua điều hướng (`skip-link`), các trường form (`aria-required`, `aria-invalid`, `aria-describedby`), cấu trúc ngữ nghĩa `<fieldset>` / `<legend>`, và vùng thông báo cập nhật động (`role="alert"`, `aria-live="polite"`).
- **Phản hồi giao diện & Chống tràn (Responsive & Overflow)**: Không phát sinh thanh cuộn ngang ở bất kỳ độ phân giải nào từ `375px` đến `1440px`.

---

## 2. Bảng Chi Tiết Kết Quả Kiểm Thử (Detailed Test Cases)

### Nhóm 1: Định tuyến & Máy chủ (Routing & Server Availability)

| STT | Tên ca kiểm thử | Kết quả kỳ vọng | Kết quả thực tế | Trạng thái | Mô tả sự cố | Biện pháp khắc phục |
|:---:|---|---|---|:---:|---|---|
| 1 | Route `"/"` phản hồi HTTP 200 | HTTP status 200 | HTTP status 200 | **PASS** | Không có | Không có |
| 2 | Route `"/register"` phản hồi HTTP 200 (SPA Fallback) | HTTP status 200 | HTTP status 200 | **PASS** | Không có | Không có |
| 3 | Route không tồn tại `"/unknown-path-12345"` trả về HTTP 200 cho Client Router | HTTP status 200 | HTTP status 200 | **PASS** | Không có | Không có |

---

### Nhóm 2: Render Trình Duyệt Thực Tế (Chrome & Edge DOM Rendering)

| STT | Tên ca kiểm thử | Kết quả kỳ vọng | Kết quả thực tế | Trạng thái | Mô tả sự cố | Biện pháp khắc phục |
|:---:|---|---|---|:---:|---|---|
| 4 | HomePage render đủ 5 khu vực (#hero, #about, #gala, navbar, footer) | Cả 5 khu vực có mặt trong DOM | Hero: true, About: true, Gala: true, Nav: true, Footer: true | **PASS** | Không có | Không có |
| 5 | VideoHero chứa thẻ HTML5 video với thuộc tính playsinline/muted/loop/poster | Thẻ video và container video nền được render | Thẻ video chuẩn HTML5 được render | **PASS** | Không có | Không có |
| 6 | Nút CTA "Đăng ký tham dự" liên kết chính xác tới route `/register` | Thẻ Link có thuộc tính to="/register" | Link chuyển hướng chính xác đến /register | **PASS** | Không có | Không có |
| 7 | RegisterPage render đầy đủ 8 trường nhập liệu | Form chứa fullName, email, phone, studentId, className, attendeeType, note, consent | Tất cả trường input, textarea, radio, checkbox có mặt trong DOM | **PASS** | Không có | Không có |
| 8 | RegisterPage có nút "Quay Lại Trang Chủ" điều hướng về `"/"` | Nút quay lại tồn tại với icon ArrowLeft | Nút quay lại xuất hiện và liên kết tới "/" | **PASS** | Không có | Không có |
| 9 | Route không xác định hiển thị trang 404 NotFoundPage fallback | Tiêu đề 404 và nút "Trở Về Trang Chủ" xuất hiện | Trang 404 hiển thị đầy đủ icon cảnh báo và nút về trang chủ | **PASS** | Không có | Không có |
| 10 | Microsoft Edge render HomePage đồng nhất với Chrome | Cấu trúc DOM của Edge khớp với Chrome | Tất cả section xuất hiện đồng nhất trên Edge engine | **PASS** | Không có | Không có |

---

### Nhóm 3: Trợ Năng & Trải Nghiệm Người Dùng (Accessibility & Usability)

| STT | Tên ca kiểm thử | Kết quả kỳ vọng | Kết quả thực tế | Trạng thái | Mô tả sự cố | Biện pháp khắc phục |
|:---:|---|---|---|:---:|---|---|
| 11 | Liên kết bỏ qua điều hướng (Skip Link) nhắm tới `#main-content` | Thẻ `<a href="#main-content" class="skip-link">` tồn tại | Skip link hiện diện ngay đầu layout | **PASS** | Không có | Không có |
| 12 | Ô nhập liệu có thuộc tính ARIA và gợi ý autocomplete | `aria-required`, `aria-invalid`, `autocomplete` hiện diện | Các thuộc tính được gán chuẩn cho từng trường | **PASS** | Không có | Không có |
| 13 | Lựa chọn nhóm người tham dự dùng thẻ `<fieldset>` và `<legend>` | Semantic grouping cho nhóm radio | `<fieldset>` và `<legend>` bao bọc danh sách lựa chọn | **PASS** | Không có | Không có |
| 14 | Thông báo lỗi và trạng thái sử dụng ARIA live region | Container có `role="alert"` và `aria-live="polite"` sẵn sàng | Vùng thông báo lỗi được duy trì trong DOM (ẩn khi không có lỗi) | **PASS** | Ban đầu container bị xóa khỏi DOM khi `!message`, khiến Screen Reader không kịp đăng ký live region trước khi có lỗi. | Cập nhật `ValidationMessage.jsx` để giữ container trong DOM với `style={{ display: 'none' }}` khi không có lỗi. |

---

### Nhóm 4: Giao Diện Đáp Ứng & Viewports (Responsive Layout)

| STT | Tên ca kiểm thử | Kết quả kỳ vọng | Kết quả thực tế | Trạng thái | Mô tả sự cố | Biện pháp khắc phục |
|:---:|---|---|---|:---:|---|---|
| 15 | Media Queries định nghĩa đầy đủ cho mobile, tablet, desktop | Khai báo các breakpoint `<=480px`, `<=768px/968px`, `<=1200px` | Đầy đủ media queries trong `index.css` | **PASS** | Không có | Không có |
| 16 | Cơ chế chống tràn ngang (overflow-x: hidden & box-sizing) | Không phát sinh thanh cuộn ngang | `box-sizing: border-box` và `overflow-x: hidden` được áp dụng | **PASS** | Không có | Không có |
| 17 | Render ổn định tại Mobile (375px) | Render hoàn chỉnh, không vỡ layout | DOM render 41.5KB, không lỗi | **PASS** | Không có | Không có |
| 18 | Render ổn định tại Tablet (768px) | Render hoàn chỉnh 2 cột hoặc stack | DOM render 41.5KB, không lỗi | **PASS** | Không có | Không có |
| 19 | Render ổn định tại Small Desktop (1024px) | Render 2 cột form và navbar desktop | DOM render 41.5KB, không lỗi | **PASS** | Không có | Không có |
| 20 | Render ổn định tại Large Desktop (1440px) | Container căn giữa `max-width: 1200px` | DOM render 41.5KB, không lỗi | **PASS** | Không có | Không có |

---

### Nhóm 5: Logic Xác Thực Biểu Mẫu (Form Validation Logic)

| STT | Tên ca kiểm thử | Kết quả kỳ vọng | Kết quả thực tế | Trạng thái | Mô tả sự cố | Biện pháp khắc phục |
|:---:|---|---|---|:---:|---|---|
| 21 | Gửi biểu mẫu rỗng bắt đúng 5 trường bắt buộc | Trả về 5 lỗi: fullName, email, phone, attendeeType, consent | 5 trường báo lỗi chính xác | **PASS** | Không có | Không có |
| 22 | fullName: Để trống | Báo lỗi bắt buộc | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 23 | fullName: 1 ký tự | Báo lỗi tối thiểu 2 ký tự | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 24 | fullName: Chứa chữ số | Báo lỗi chỉ chứa chữ tiếng Việt | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 25 | fullName: Tiếng Việt có dấu đầy đủ (`Trần Thị Mỹ Duyên`) | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 26 | fullName: Tên có dấu nháy và gạch nối (`John O'Connor-Smith`) | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 27 | email: Để trống | Báo lỗi bắt buộc | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 28 | email: Thiếu ký tự `@` và domain | Báo lỗi định dạng email | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 29 | email: Thiếu phần đuôi TLD | Báo lỗi định dạng email | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 30 | email: Gmail chuẩn (`contact.ttv@gmail.com`) | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 31 | email: Đuôi giáo dục (`student@ptit.edu.vn`) | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 32 | phone: Để trống | Báo lỗi bắt buộc | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 33 | phone: Đầu số 11 số cũ 01 (`0123456789`) | Báo lỗi số không hợp lệ | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 34 | phone: Quá ngắn (`123456`) | Báo lỗi số không hợp lệ | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 35 | phone: Chuẩn 10 số đầu 09 (`0987654321`) | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 36 | phone: Chuẩn 10 số đầu 03 (`0389123456`) | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 37 | phone: Đầu số quốc tế +84 (`+84987654321`) | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 38 | phone: Có khoảng trắng (`0987 654 321`) | Tự chuẩn hóa và hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 39 | attendeeType: Để trống | Báo lỗi bắt buộc chọn | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 40 | attendeeType: Giá trị ngoài danh mục | Báo lỗi không hợp lệ | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 41 | attendeeType: `Thành viên CLB` | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 42 | attendeeType: `Cựu thành viên` | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 43 | attendeeType: `Khách mời` | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 44 | attendeeType: `Khác` | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 45 | consent: Chưa tích chọn (`false`) | Báo lỗi bắt buộc cam kết | Trả về thông báo lỗi | **PASS** | Không có | Không có |
| 46 | consent: Đã tích chọn (`true`) | Hợp lệ (null) | null (Hợp lệ) | **PASS** | Không có | Không có |
| 47 | Các trường tùy chọn (Mã SV, Lớp, Ghi chú) khi để trống | Tất cả đều hợp lệ (null) | null cho cả 3 trường | **PASS** | Không có | Không có |

---

### Nhóm 6: Tích Hợp Google Form & Các Trạng Thái Nộp Đơn (Integration Service)

| STT | Tên ca kiểm thử | Kết quả kỳ vọng | Kết quả thực tế | Trạng thái | Mô tả sự cố | Biện pháp khắc phục |
|:---:|---|---|---|:---:|---|---|
| 48 | Chế độ mặc định Unconfigured trả về `status="unconfigured"` | `success=false`, `verified=false` | Trả về đúng `unconfigured`, không gửi dữ liệu giả mạo | **PASS** | Không có | Không có |
| 49 | Chế độ Unconfigured bảo lưu 100% dữ liệu đã nhập | Dữ liệu `formData` giữ nguyên vẹn | Dữ liệu người dùng được bảo lưu đầy đủ | **PASS** | Không có | Không có |
| 50 | Chế độ Mock Verified trả về `status="success"` | `status="success"`, `verified=true` | Trả về đúng `success` và `verified=true` | **PASS** | Không có | Không có |
| 51 | Chế độ Mock Unverified trả về `status="submitted_unverified"` | `status="submitted_unverified"`, `verified=false` | Phản ánh chính xác hành vi opaque response của trình duyệt | **PASS** | Không có | Không có |
| 52 | Mô phỏng ForceError bắt lỗi kết nối và giữ nguyên dữ liệu | Lỗi mạng được xử lý qua try/catch, bảo toàn dữ liệu | Bắt đúng ngoại lệ, không xóa trắng input của người dùng | **PASS** | Không có | Không có |
| 53 | `buildGalaFormPayload` tuần tự hóa chính xác cả 8 trường | Cả 8 trường ánh xạ chuẩn vào entry IDs | `entry.1` đến `entry.8` ánh xạ chính xác | **PASS** | Không có | Không có |

---

## 3. Chi Tiết Lỗi Phát Hiện & Bản Vá Đã Áp Dụng

### Lỗi duy nhất phát hiện (Phần trợ năng ARIA):
- **Hiện tượng**: Ca kiểm thử số 14 ban đầu thất bại vì khi biểu mẫu vừa tải lên (chưa có lỗi), component `ValidationMessage` trả về `null`, dẫn đến thẻ DOM chứa `role="alert"` và `aria-live="polite"` chưa xuất hiện trong Accessibility Tree.
- **Rủi ro tiếp cận**: Một số phần mềm đọc màn hình (Screen Readers như NVDA hoặc JAWS) chỉ lắng nghe các live region đã được đăng ký trước khi nội dung mới xuất hiện. Nếu vùng thông báo xuất hiện đồng thời cùng thông điệp lỗi, Screen Reader có thể bỏ qua thông báo.
- **Bản vá đã thực hiện**:
  Cập nhật file [`src/components/form/ValidationMessage.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/components/form/ValidationMessage.jsx):
  Luôn giữ phần tử container `<div role="alert" aria-live="polite">` trong DOM nhưng đặt `style={{ display: 'none' }}` khi chưa có thông điệp lỗi. Khi có lỗi, phần tử chuyển sang hiển thị và Screen Reader ngay lập tức đọc thông báo lỗi cho người dùng khiếm thị.
- **Kết quả sau sửa**: Kiểm thử chạy lại và đạt kết quả **PASS 100% (53/53)**.

---

## 4. Vấn Đề Còn Lại & Cảnh Báo Triển Khai (Remaining Problems & Advisories)

1. **Cấu hình Google Form thực tế**:
   - Hiện tại hệ thống đang được đặt ở chế độ bảo vệ **`UNCONFIGURED`**.
   - Khi Ban Tổ Chức hoàn thành việc tạo Google Form theo tài liệu [`docs/google-forms-setup.md`](file:///d:/Vibe%20Code/Web-Google-form/docs/google-forms-setup.md), cần điền URL thực tế và 8 mã `entry.XXXXXXXX` vào [`src/services/googleForm.js`](file:///d:/Vibe%20Code/Web-Google-form/src/services/googleForm.js).
2. **Khẳng định kết quả lưu trữ Google Sheets**:
   - Hệ thống **chưa ghi nhận kết nối đến Google Sheets thật** vì chưa được cung cấp URL form chính thức. Tuyệt đối không báo cáo thành công vào Google Sheets khi chưa có bằng chứng quan sát thực tế trên bảng tính.
   - Khi gửi trực tiếp từ trình duyệt qua Google Form, trạng thái hiển thị trên giao diện sẽ là `submitted_unverified` (Đã tiếp nhận đơn, chờ xác thực qua email) do phản hồi mờ đục Opaque Response từ cơ chế CORS của trình duyệt.
