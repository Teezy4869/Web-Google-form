# Phase 1 Audit — Phân Tích Kiến Trúc & Kế Hoạch Chuyển Đổi Sang Website GALA NIGHT

## 1. Kiến Trúc Hiện Tại (Trước Khi Refactor)
- **Framework & Công cụ Build**: React 18 (`^18.3.1`) + Vite (`^5.4.11`), sử dụng thư viện icon `lucide-react` (`0.468.0`) và Vanilla CSS (`src/styles/index.css`).
- **Mô hình trang**: Single-page Application (SPA) hiển thị toàn bộ thông tin tuyển thành viên CLB trên một trang duy nhất (`App.jsx`), cuộn mượt giữa các phân đoạn (`#hero`, `#about`, `#timeline`, `#departments`, `#application`, `#faq`).
- **Quản lý dữ liệu**: Dữ liệu tĩnh tập trung trong `src/data/recruitmentData.js`.
- **Biểu mẫu & Gửi dữ liệu**: Biểu mẫu ứng tuyển 4 bước (`ApplicationForm.jsx`) tự động lưu nháp vào `localStorage` (`ttv_recruitment_draft_v1`), kiểm tra hợp lệ qua `src/utils/validation.js` và gửi dữ liệu đến Google Forms qua `src/services/googleForm.js` (sử dụng `fetch` với `mode: 'no-cors'` và dự phòng bằng `iframe` ẩn).

---

## 2. Phân Loại Tệp Mã Nguồn (File Classification)

| Đường dẫn tệp | Phân loại | Lý do & Hướng xử lý |
| :--- | :---: | :--- |
| `package.json` | **KEEP** | Giữ nguyên cấu hình React 18, Vite và `lucide-react`. |
| `index.html` | **MODIFY** | Cập nhật tiêu đề và thẻ meta description từ Tuyển thành viên sang sự kiện GALA NIGHT. |
| `src/main.jsx` | **KEEP** | Điểm khởi chạy React chuẩn. |
| `src/App.jsx` | **MODIFY** | Xóa state tuyển quân (`preselectedDept`), chuyển sang điều hướng giữa `/` (`HomePage`) và `/register` (`RegisterPage`). |
| `src/components/common/Navbar.jsx` | **MODIFY** | Tái sử dụng khung điều hướng responsive; đổi liên kết sang các mục của trang chủ Gala Night và nút `/register`. |
| `src/components/common/Footer.jsx` | **MODIFY** | Tái sử dụng bố cục chân trang; trỏ dữ liệu về `clubData.js` và `galaData.js`. |
| `src/components/common/SuccessModal.jsx` | **MODIFY** | Tái sử dụng modal thông báo thành công; gỡ bỏ nội dung phỏng vấn vòng 2 và nguyện vọng ban. |
| `src/components/common/CountdownTimer.jsx` | **REMOVE** | Đếm ngược hạn nộp đơn tuyển dụng (25/10/2026) không còn sử dụng. |
| `src/components/form/TextInput.jsx` | **KEEP** | Component ô nhập văn bản dùng chung có hỗ trợ 접근성 (`aria-*`). |
| `src/components/form/TextArea.jsx` | **KEEP** | Component ô nhập đoạn văn có bộ đếm ký tự dùng chung. |
| `src/components/form/RadioGroup.jsx` | **KEEP** | Component chọn một lựa chọn dùng chung. |
| `src/components/form/CheckboxGroup.jsx` | **KEEP** | Component chọn nhiều lựa chọn dùng chung. |
| `src/components/form/SingleCheckbox.jsx` | **KEEP** | Component ô tích cam kết dùng chung. |
| `src/components/form/FormSection.jsx` | **KEEP** | Khung nhóm trường biểu mẫu dùng chung. |
| `src/components/form/ValidationMessage.jsx` | **KEEP** | Hiển thị thông báo lỗi trường nhập liệu dùng chung. |
| `src/components/form/SubmitButton.jsx` | **MODIFY** | Giữ nguyên logic loading spinner; cập nhật nhãn mặc định cho đăng ký sự kiện. |
| `src/components/sections/HeroSection.jsx` | **REPLACE** | Thay bằng `src/components/home/VideoHeroSection.jsx` và `GalaIntroSection.jsx`. |
| `src/components/sections/AboutSection.jsx` | **REPLACE** | Chuyển đổi sang `src/components/home/ClubIntroSection.jsx` dùng dữ liệu từ `clubData.js`. |
| `src/components/sections/TimelineSection.jsx` | **REMOVE** | Lộ trình 3 vòng tuyển quân đặc thù của đợt tuyển dụng. |
| `src/components/sections/DepartmentsSection.jsx` | **REMOVE** | Danh sách 7 ban ứng tuyển đặc thù của đợt tuyển dụng. |
| `src/components/sections/ApplicationForm.jsx` | **REPLACE** | Thay thế bằng biểu mẫu 1 trang `src/components/registration/RegistrationForm.jsx`. |
| `src/components/sections/FAQSection.jsx` | **REMOVE** | Câu hỏi thường gặp chỉ xoay quanh phỏng vấn và ứng tuyển thành viên. |
| `src/data/recruitmentData.js` | **REPLACE** | Tách thành `src/data/clubData.js` (thông tin CLB) và `src/data/galaData.js` (thông tin sự kiện Gala Night). |
| `src/services/googleForm.js` | **MODIFY** | Giữ lại cơ chế đóng gói `URLSearchParams` và fallback `iframe`; xóa các `entry.*` của form tuyển dụng cũ. |
| `src/utils/validation.js` | **MODIFY** | Giữ lại regex và kiểm tra thông tin cá nhân; xóa `validateStep` và các câu hỏi phỏng vấn. |
| `src/styles/index.css` | **KEEP** | Giữ nguyên hệ thống thiết kế Glassmorphism, biến màu, grid, form và modal. |

---

## 3. Kiểm Tra Tài Nguyên (Assets) & Dependencies
- **Hình ảnh, Video, Logo**: Không có tệp hình ảnh, video hoặc logo riêng trong kho mã nguồn (chỉ có icon SVG nội tuyến trong `index.html`). Do đó cần sử dụng các placeholder rõ ràng cho video giới thiệu và hình ảnh sự kiện.
- **Dependencies**: Các gói hiện có (`react`, `react-dom`, `lucide-react`, `vite`, `@vitejs/plugin-react`) hoàn toàn đáp ứng nhu cầu, không có thư viện dư thừa cần gỡ bỏ.

---

## 4. Cấu Trúc Thư Mục Đích Đề Xuất

```text
src/
  pages/
    HomePage.jsx
    RegisterPage.jsx
  components/
    common/
    home/
    registration/
    form/
  data/
    clubData.js
    galaData.js
  services/
    googleForm.js
  utils/
    validation.js
  styles/
    index.css
```
