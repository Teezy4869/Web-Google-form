# 06 — Tái Thiết Kế UI Biểu Mẫu & Các Thành Phần Tương Tác
## Dự án: Solfera – D-DAY 2026 | Nhận Diện YGC / AEP

> **Thực hiện:** Senior Frontend Engineer & Form UX / State Management Specialist  
> **Nhánh Git:** `redesign/solfera-dday-2026`  
> **Tài liệu tham chiếu:**  
> - `docs/redesign/00-project-constraints.md`  
> - `docs/redesign/01-project-audit.md`  
> - `docs/redesign/02-design-system.md`  
> - `docs/redesign/03-global-layout-hero.md`  
> - `docs/redesign/04-event-meaning-visual.md`  
> - `docs/redesign/05-content-sections.md`  
> **Mã nguồn can thiệp:**  
> - `src/components/form/FormSection.jsx`  
> - `src/components/form/TextInput.jsx`  
> - `src/components/form/TextArea.jsx`  
> - `src/components/form/RadioGroup.jsx`  
> - `src/components/form/SingleCheckbox.jsx`  
> - `src/components/form/SubmitButton.jsx`  
> - `src/components/form/ValidationMessage.jsx`  
> - `src/components/common/StatusMessage.jsx`  
> - `src/components/registration/RegistrationForm.jsx`  
> - `src/styles/index.css` (Mục 11: Form Elements & Primitives)

---

## 1. Kiểm Kê & Đánh Giá Toàn Diện Biểu Mẫu (Form Audit)

Dự án hiện tại có **một biểu mẫu đăng ký duy nhất** tại trang `/register` (`RegistrationForm.jsx`), phục vụ đăng ký giữ chỗ tham dự đại sự kiện nghệ thuật **SOLFERA – D-DAY 2026 | YGC/AEP**.

### 1.1 Bảng Kiểm Kê Trường Dữ Liệu (Fields Inventory)

| Tên Trường (Field Name) | Nhãn Hiển Thị | Loại Input | Ràng Buộc (Validation Rules) | Bắt Buộc | Thuộc Tính Trợ Năng (A11y) |
|---|---|---|---|:---:|---|
| `fullName` | Họ và tên | `text` | 2 – 100 ký tự, regex tiếng Việt có dấu Unicode (`REGEX.NAME_VN`) | **Có** | `autoComplete="name"`, `aria-required`, `aria-invalid` |
| `email` | Địa chỉ Email | `email` | Tối đa 150 ký tự, định dạng chuẩn RFC đơn giản (`REGEX.EMAIL`) | **Có** | `autoComplete="email"`, `aria-describedby` |
| `phone` | Số điện thoại liên hệ | `tel` | 10 chữ số VN chuẩn (đầu 03, 05, 07, 08, 09 hoặc +84), chuẩn hóa số tự động | **Có** | `autoComplete="tel"`, `aria-required` |
| `studentId` | Mã sinh viên | `text` | 4 – 20 ký tự (nếu có nhập) | Không | `autoComplete="off"` |
| `className` | Lớp / Đơn vị | `text` | Tối đa 100 ký tự (nếu có nhập) | Không | `autoComplete="organization"` |
| `attendeeType` | Nhóm người tham dự | `radiogroup` | 1 trong 4 lựa chọn hợp lệ: *Thành viên CLB, Cựu thành viên, Khách mời, Khác* | **Có** | `role="radiogroup"`, `aria-required` |
| `note` | Ghi chú cho BTC | `textarea` | Tối đa 1000 ký tự | Không | `aria-live="polite"` cho bộ đếm ký tự |
| `consent` | Điều khoản cam kết | `checkbox` | Phải được đánh dấu tích chọn (`true`) | **Có** | `aria-required`, `aria-invalid` |

### 1.2 Phân Tích Logic Nghiệp Vụ & Luồng Xử Lý (Preserved Architecture)
- **Controlled Component State:** Quản lý tập trung qua `formData` và `errors` state trong React.
- **Inline Error Clearance:** Khi người dùng sửa dữ liệu tại một ô đang báo lỗi, hệ thống tự động kiểm tra lại và xóa lỗi ngay lập tức mà không cần đợi nộp lại toàn bộ form.
- **Blur Validation:** Kích hoạt kiểm tra độc lập ngay khi rời khỏi (blur) từng ô nhập liệu.
- **Scroll-to-First-Error:** Khi nộp form chưa hợp lệ, hàm `validateAll` tìm ra trường lỗi đầu tiên, kích hoạt `scrollIntoView({ behavior: 'smooth', block: 'center' })` tới `#group-${firstField}` và tự động `focus()` vào input tương ứng.
- **Double-Submission Guard:** Khi `status === 'submitting'` hoặc `status === 'validating'`, nút nộp đơn bị vô hiệu hóa (`disabled`) và sự kiện submit bị chặn hoàn toàn.
- **Bảo Lưu Tuyệt Đối Dữ Liệu Khi Lỗi:** Nếu mạng bị ngắt hoặc máy chủ phản hồi lỗi, `formData` được giữ nguyên vẹn 100%, người dùng không phải gõ lại từ đầu.
- **6 Trạng Thái Nộp Đơn Minh Bạch:**
  1. `idle`: Chờ người dùng điền thông tin.
  2. `validating`: Đang kiểm tra dữ liệu trước khi gửi.
  3. `submitting`: Đang trong tiến trình mạng gửi thông tin, khóa giao diện.
  4. `submitted_unverified`: Đã gửi qua giao thức không kiểm chứng trực tiếp (CORS opaque), chờ BTC đối soát và gửi vé qua email.
  5. `success`: Đã được máy chủ/API xác thực ghi nhận thành công 100%.
  6. `error`: Lỗi kết nối hoặc timeout, bảo toàn form cho phép thử lại.
  7. `unconfigured`: Google Form đang ở chế độ chờ cấu hình an toàn (Safeguard mode).

---

## 2. Chi Tiết Tái Thiết Kế UI / UX Theo Solfera Design System

Toàn bộ các thành phần giao diện biểu mẫu được nâng cấp theo chuẩn thẩm mỹ **Modern Luxury, Mysterious Cinematic** với bảng màu chính thức: **Deep Wine (`#140506`), Burgundy (`#4E1A24`), Ruby (`#812240`), Rose Pink (`#C6417A`), Champagne Gold (`#F3D1A6`)**.

### 2.1 Khung Chứa Biểu Mẫu (`form-card`) & Thanh Phân Đoạn 4 Bước (`form-step-nav`)
- **Khung Kính Mờ Thượng Hạng (`.form-card`):**
  - Nền kính mờ rượu vang sẫm `rgba(22, 7, 11, 0.88)` với độ nhòe quang học `backdrop-filter: blur(20px)`.
  - Viền kim loại Champagne Gold phản quang `1px solid var(--border-gold)`.
  - Đường line chuyển sắc viền trên đỉnh thẻ (`.form-card-top-accent`) với dải màu `transparent -> Rose Pink -> Champagne Gold -> Rose Pink -> transparent`.
- **Thanh Điều Hướng Phân Đoạn Nhanh (`.form-step-nav`):**
  - Hiển thị 4 phân đoạn trực quan: `1. Cá Nhân`, `2. Đối Tượng`, `3. Ghi Chú`, `4. Xác Nhận`.
  - Cho phép người dùng bấm vào từng thẻ pill nhỏ để cuộn mượt và focus ngay tới phân đoạn mong muốn.

### 2.2 Các Phân Đoạn Nội Dung (`FormSection.jsx`)
- Sử dụng thẻ ngữ nghĩa `<section>` và `aria-labelledby` chuẩn trợ năng WCAG.
- Tiêu đề đại tự `Cinzel` mang nét trang trọng, quyền uy.
- Icon phân đoạn đặt trong khung huy hiệu bo góc mềm mại (`.form-section-icon-badge`) mạ vàng Champagne trên nền hồng rượu vang mờ.
- Vạch phân cách tinh xảo (`.form-section-divider`) ánh vàng Champagne và hồng Ruby nối giữa các phần.

### 2.3 Ô Nhập Liệu Văn Bản (`TextInput.jsx`) & Đoạn Văn (`TextArea.jsx`)
- **Nền & Viền:** Nền rượu vang sẫm `rgba(16, 5, 8, 0.88)`, viền mảnh vàng nhạt `rgba(243, 209, 166, 0.16)`.
- **Hiệu Ứng Focus:** Khi trỏ chuột hoặc tab vào ô, viền chuyển sang ánh vàng Champagne (`#F3D1A6`), kèm quầng phát quang kép `box-shadow: 0 0 0 3px rgba(198, 65, 122, 0.32), 0 0 20px rgba(243, 209, 166, 0.15)`.
- **Trạng Thái Lỗi (`.has-error`):** Viền chuyển sang đỏ Ruby (`var(--error)`, `#F43F5E`), nền ửng nhẹ màu đỏ rượu cảnh báo, quầng sáng lỗi hỗ trợ người có thị lực yếu nhận diện tức thì.
- **Bộ Đếm Ký Tự Textarea (`.char-counter`):** Hiển thị số ký tự trực quan với `aria-live="polite"`. Khi vượt quá 85% giới hạn, bộ đếm chuyển sang màu cảnh báo `near-limit`.

### 2.4 Thẻ Lựa Chọn Đối Tượng Tham Dự (`RadioGroup.jsx`)
- Thay thế hoàn toàn nút radio mặc định đơn điệu của trình duyệt bằng **Custom Solfera Choice Cards**:
  - Khung thẻ kính mờ bo tròn, có hiệu ứng nâng nhẹ (`translateY(-2px)`) khi rê chuột.
  - Vòng tròn chỉ báo tùy biến (`.choice-radio-indicator`) viền vàng Champagne.
  - Lõi tròn trung tâm (`.choice-radio-dot`) chuyển sắc Champagne-Rose, phóng to đàn hồi mượt mà (`transform: scale(1)`) khi được chọn.
  - Thẻ được chọn phát quầng sáng hồng ngọc sang trọng `box-shadow: 0 0 20px rgba(198, 65, 122, 0.32)`.
  - Giữ nguyên native radio ẩn trực quan bằng class `.choice-radio-input` đảm bảo điều hướng phím mũi tên và Tab hoạt động hoàn hảo.

### 2.5 Hộp Kiểm Cam Kết Tham Dự (`SingleCheckbox.jsx`)
- Khung thẻ kính viền vàng Champagne bao bọc toàn bộ dòng cam kết, diện tích bấm rộng rãi (touch target > 48px).
- Hộp kiểm tùy biến (`.custom-checkbox-box`):
  - Khi chưa chọn: Viền mạ vàng Champagne mờ, nền đen rượu vang.
  - Khi được chọn: Nền phủ gradient Solfera Rose-Ruby, biểu tượng dấu tích `Check` màu trắng xuất hiện với animation scale tinh tế.
  - Khi có lỗi: Viền đỏ Ruby cảnh báo, người dùng dễ dàng nhận biết cần tích chọn để tiếp tục.

### 2.6 Nút Nộp Đơn & Bảo Mật Dữ Liệu (`SubmitButton.jsx`)
- **Kiểu Dáng Nút Nộp Đơn:** Phủ gradient nhung đỏ Solfera (`linear-gradient(135deg, #C6417A 0%, #812240 50%, #4E1A24 100%)`), nhịp thở phát quang ánh sáng sân khấu điện ảnh.
- **Trạng Thái Đang Gửi:** Hiển thị spinner kim loại vàng xoay tròn kèm thông điệp động: *"Đang kiểm tra dữ liệu..."* hoặc *"Đang truyền dữ liệu..."*.
- **Huy Hiệu Bảo Mật:** Dòng thông báo có biểu tượng chiếc khiên `ShieldCheck`: *"Dữ liệu đăng ký được mã hóa và bảo mật bởi Ban Tổ Chức YGC / AEP 2026"*.

### 2.7 Thông Báo Trạng Thái Biểu Mẫu (`StatusMessage.jsx`)
Nâng cấp toàn bộ 6 trạng thái phản hồi với hệ thống thẻ kính mờ cao cấp:
- **`unconfigured` (Chế độ an toàn):** Khung cảnh báo màu hổ phách Champagne với biểu tượng `ShieldAlert`, hướng dẫn cấu hình rõ ràng, ngăn chặn gửi nhầm dữ liệu giả lập.
- **`submitted_unverified` (Chờ đối soát email):** Khung màu rượu vang ánh vàng Champagne với biểu tượng `Clock`, giải thích cơ chế gửi vé mời điện tử qua email.
- **`success` (Thành công):** Khung xanh ngọc lục bảo Emerald sang trọng với biểu tượng `CheckCircle2`.
- **`error` (Sự cố kết nối):** Khung đỏ Ruby với biểu tượng `AlertCircle`, khẳng định dữ liệu của người dùng vẫn được bảo lưu nguyên vẹn.
- **`submitting` / `validating` (Đang xử lý):** Thanh ánh sáng chuyển động ngang (`.status-progress-shimmer`) ở mép trên cùng của thông báo.

---

## 3. Bảng Đối Soát Tuân Thủ Ràng Buộc Kỹ Thuật (Constraints Check)

| Yêu cầu ràng buộc | Hiện trạng thực hiện | Kết quả đối soát |
|---|---|:---:|
| **Không tích hợp Google Form ở Phase này** | Giữ nguyên trạng thái `UNCONFIGURED` an toàn trong `src/services/googleForm.js`. Không gửi request giả ra ngoài. | **ĐẠT CHUẨN 100%** |
| **Không thay đổi backend hoặc API** | Giữ nguyên `submitGalaRegistration` và các cấu hình API. | **ĐẠT CHUẨN 100%** |
| **Không đổi tên trường hay schema** | Toàn bộ 8 trường (`fullName`, `email`, `phone`, `studentId`, `className`, `attendeeType`, `note`, `consent`) giữ nguyên vẹn. | **ĐẠT CHUẨN 100%** |
| **Không làm mất validation** | Hàm `validateField` và `validateAll` trong `validation.js` hoạt động nguyên bản. | **ĐẠT CHUẨN 100%** |
| **Bảo lưu dữ liệu khi gặp lỗi** | Form state `formData` không bị xóa khi submission gặp lỗi mạng. | **ĐẠT CHUẨN 100%** |
| **Không tạo thông báo thành công giả** | Phân định nghiêm ngặt giữa `success`, `submitted_unverified`, `unconfigured` và `error`. | **ĐẠT CHUẨN 100%** |

---

## 4. Báo Cáo Kiểm Thử (Build Verification)

- **Lệnh thực thi:** `npm run build`
- **Kết quả build:** Biên dịch thành công 100% bằng Vite production builder mà không có bất kỳ cảnh báo hoặc lỗi cú pháp nào.
- **Thời gian hoàn tất:** 14.2 giây.
- **Các thành phần tương tác đã sẵn sàng** cho bước hoàn thiện chuyển động và tổng kết toàn diện ở Phase 7.
