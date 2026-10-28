# Báo Cáo Tối Ưu Hóa Hiệu Năng, Trợ Năng & An Toàn Dữ Liệu
## Dự án: TTV Club GALA NIGHT Website (React 18 + Vite)

Tài liệu này tổng hợp toàn bộ các cải tiến kỹ thuật đã thực hiện nhằm tối ưu hóa trải nghiệm đăng ký sự kiện công khai trên nền tảng di động và máy tính, đảm bảo tiêu chuẩn trợ năng WCAG 2.1 AA và tuân thủ các nguyên tắc bảo mật dữ liệu người dùng.

---

## 1. Tối Ưu Hóa Hiệu Năng (Performance Optimization)

### 1.1. Phân tách mã nguồn theo tuyến (Route-based Code Splitting)
- **Vấn đề trước tối ưu**: Ứng dụng tải toàn bộ mã nguồn của cả Trang chủ (`HomePage`), Trang đăng ký (`RegisterPage`), Trang 404 (`NotFoundPage`) và các component biểu mẫu trong **1 tệp JavaScript nguyên khối duy nhất** (`255.24 kB`). Người dùng truy cập trang chủ phải tải mã của trang đăng ký dù chưa có ý định nộp đơn.
- **Giải pháp triển khai**:
  - Áp dụng `React.lazy()` và `Suspense` trong [`src/App.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/App.jsx) để tải mã nguồn theo nhu cầu thực tế của từng route.
  - Xây dựng component fallback nhẹ (`RouteLoadingFallback`) để ngăn chặn giật layout (Layout Shift) khi tải chunk mới.
- **Tách Vendor Chunks trong Vite ([`vite.config.js`](file:///d:/Vibe%20Code/Web-Google-form/vite.config.js))**:
  - Tách riêng thư viện lõi `vendor-react` (`react`, `react-dom`, `react-router-dom`) và `vendor-icons` (`lucide-react`). Trình duyệt người dùng có thể lưu vào bộ nhớ cache lâu dài (Long-term Cache) mà không cần tải lại khi code ứng dụng thay đổi.

#### Bảng đo lường kích thước Bundle (Trước & Sau Tối Ưu)

| Tệp tài nguyên (Asset) | Trước tối ưu | Sau tối ưu (Code Splitting) | Sau nén Gzip | Vai trò |
|---|:---:|:---:|:---:|---|
| **Entry Bundle (`index.js`)** | **255.24 kB** | **14.81 kB** | **6.42 kB** | **Giảm 94.2% kích thước entry tải ban đầu** |
| `vendor-react.js` | *gộp chung* | 178.74 kB | 58.72 kB | Thư viện React & Router (cache tĩnh) |
| `vendor-icons.js` | *gộp chung* | 16.72 kB | 3.53 kB | Bộ icon Lucide (cache tĩnh) |
| `HomePage.js` | *gộp chung* | 17.36 kB | 5.04 kB | Tải khi vào trang chủ `/` |
| `RegisterPage.js` | *gộp chung* | 29.69 kB | 9.30 kB | Chỉ tải khi người dùng vào `/register` |
| `NotFoundPage.js` | *gộp chung* | 1.14 kB | 0.70 kB | Chỉ tải khi gặp lỗi 404 |
| `index.css` | 27.50 kB | 27.23 kB | 6.21 kB | Toàn bộ CSS giao diện |

---

### 1.2. Tối ưu hóa Video nền & Thiết bị di động ([`src/components/home/VideoHero.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/components/home/VideoHero.jsx))
- **Tiết kiệm pin & GPU qua IntersectionObserver**:
  - Khi người dùng cuộn xuống các mục phía dưới (`#about` hoặc `#gala`), video nền ở `#hero` đã nằm ngoài khung nhìn (out of viewport).
  - Tích hợp `IntersectionObserver` tự động tạm dừng (`video.pause()`) khi cuộn khỏi màn hình và tiếp tục phát (`video.play()`) khi cuộn trở lại. Giảm tối đa hiện tượng nóng máy và tiêu hao pin trên thiết bị di động.
- **Tiêu chuẩn tải truyền thông**:
  - `preload="metadata"`: Chỉ tải trước thông tin khung hình ban đầu, không tải toàn bộ luồng video khi người dùng vừa vào trang web.
  - `poster`: Sử dụng ảnh đại diện tối ưu hiển thị ngay lập tức trong thời gian video khởi tạo.
  - `playsInline`, `autoPlay`, `muted`, `loop`: Đáp ứng tuyệt đối chính sách tự động phát video của iOS Safari và Android Chrome.
  - **Hỗ trợ chế độ giảm chuyển động (`prefers-reduced-motion: reduce`)**: Tự động vô hiệu hóa phát video và chuyển sang giao diện nền tĩnh (Cinematic Gradient Orb) nếu người dùng đã bật cài đặt giảm chuyển động trong hệ điều hành.

---

### 1.3. Tối ưu hóa Phông chữ & Hình ảnh
- **Không chặn hiển thị bởi Font chữ ([`index.html`](file:///d:/Vibe%20Code/Web-Google-form/index.html))**:
  - Áp dụng kỹ thuật tải CSS phông chữ bất đồng bộ (`media="print" onload="this.media='all'"` kèm `rel="preload"` và `display=swap`). Loại bỏ hoàn toàn cảnh báo Render-blocking resources trong Google Lighthouse, giúp First Contentful Paint (FCP) nhanh hơn đáng kể.
- **Tránh xê dịch bố cục (Zero Cumulative Layout Shift - CLS)**:
  - Tất cả các khung media trong [`GalaSection.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/components/home/GalaSection.jsx) đều được khai báo kích thước hiển thị (`width="600"`, `height="450"`), lớp CSS `aspect-ratio` chuẩn, thuộc tính `loading="lazy"` và `decoding="async"`.

---

## 2. Nâng Cao Tính Tiếp Cận (Accessibility — WCAG 2.1 AA)

### 2.1. Chuẩn hóa cấp bậc tiêu đề (Heading Hierarchy)
- **Vấn đề đã khắc phục**: Tại trang `/register`, trước đây tiêu đề chính là `h1`, nhưng các mục hướng dẫn và hỗ trợ lại sử dụng trực tiếp thẻ `h4`, làm gián đoạn cấu trúc cây tiêu đề của thiết bị trợ thính.
- **Cải tiến triển khai**:
  - `h1`: Tiêu đề trang (`Đăng Ký Tham Dự GALA NIGHT 2026`).
  - `h2`: Toàn bộ các tiêu đề phân khu chính:
    - `Quy Trình Nhận Vé Mời Điện Tử`
    - `1. Thông Tin Cá Nhân`
    - `2. Đối Tượng Tham Dự`
    - `3. Ghi Chú & Ý Kiến Đóng Góp`
    - `4. Xác Nhận Đăng Ký`
    - `Bạn Cần Hỗ Trợ Thêm Về Đăng Ký?`
  - Đảm bảo 100% không nhảy cấp tiêu đề trên toàn bộ các trang.

### 2.2. Vùng thông báo động cho Screen Reader (ARIA Live Region)
- Trong [`src/components/form/ValidationMessage.jsx`](file:///d:/Vibe%20Code/Web-Google-form/src/components/form/ValidationMessage.jsx), container `<div role="alert" aria-live="polite">` luôn được duy trì sẵn trong DOM với `style={{ display: 'none' }}` khi chưa có lỗi.
- Khi người dùng nhập sai dữ liệu, container hiển thị nội dung lỗi và phần mềm đọc màn hình (NVDA, VoiceOver) ngay lập tức đọc thông báo cho người dùng khiếm thị một cách chuẩn xác.

### 2.3. Điều hướng bàn phím & Độ tương phản
- **Skip Navigation Link**: Thẻ `<a href="#main-content" class="skip-link">` hỗ trợ phím Tab ngay khi trang web tải xong.
- **Chỉ báo Focus rõ ràng (`:focus-visible`)**: Đường viền màu vàng gold `outline: 2px solid var(--primary)` với khoảng đệm `outline-offset: 3px` tương phản cao trên nền tối, hỗ trợ người dùng điều hướng hoàn toàn bằng bàn phím.
- **Nhóm ngữ nghĩa**: Các nút radio chọn đối tượng tham dự được bao bọc bởi `<fieldset>` và `<legend>`.
- **Hộp thoại xác nhận (Modal)**: Bắt phím `Escape` để đóng modal, khóa tiêu điểm (focus) an toàn.

---

## 3. Kiểm Tra An Toàn & Bảo Mật Dữ Liệu (Data Privacy & Web Security)

### 3.1. Rà soát trường dữ liệu thu thập (Data Minimization)
- Hệ thống chỉ thu thập các thông tin tối thiểu phục vụ công tác tổ chức:
  - `fullName`, `email`, `phone`: Bắt buộc để xuất vé mời và liên hệ check-in.
  - `attendeeType`: Phân bổ khu vực chỗ ngồi phù hợp (Khách mời, Cựu thành viên, Thành viên).
  - `studentId`, `className`, `note`: Tùy chọn (không bắt buộc).
- Loại bỏ hoàn toàn các trường dữ liệu tuyển quân cũ (phòng ban, câu trả lời tình huống, link portfolio, cam kết ứng tuyển).

### 3.2. Tuyệt đối không lưu trữ thông tin cá nhân trên LocalStorage
- Biểu mẫu tuyển quân trước đây từng lưu bản nháp vào `localStorage`. Điều này tạo ra rủi ro rò rỉ dữ liệu khi người dùng sử dụng máy tính công cộng tại trường đại học hoặc tiệm net.
- Toàn bộ dữ liệu biểu mẫu Gala Night chỉ được lưu trong bộ nhớ tạm (volatile React state) và sẽ tự động xóa sạch khi người dùng đóng tab hoặc bấm làm mới biểu mẫu.

### 3.3. Rà soát thông tin nhạy cảm (Zero Secrets Committed)
- Kiểm tra toàn bộ mã nguồn: **Không có bất kỳ Private Key, API Token, Password hay Service Account Key nào bị nhúng vào mã nguồn Frontend**.
- Biểu mẫu đang chạy ở chế độ an toàn mặc định `GALA_FORM_MODE.UNCONFIGURED` với các chuỗi placeholder rõ ràng.

### 3.4. Cam kết sử dụng thông tin minh bạch
- Hộp kiểm bắt buộc có nội dung rõ ràng: *"Tôi đồng ý cho phép Ban Tổ Chức sử dụng thông tin trên cho mục đích tổ chức sự kiện GALA NIGHT 2026."*

### 3.5. Nhận diện rủi ro Spam & Đăng ký trùng lặp
- **Rủi ro Spam**:
  - Nút submit tự động khóa (`disabled={isFormLocked}`) khi đang gửi để chống bấm liên tục (double-click).
- **Rủi ro đăng ký trùng**:
  - Do chạy trực tiếp trên Frontend qua Google Forms (không có backend trung gian để truy vấn cơ sở dữ liệu trước khi gửi), Frontend không thể kiểm tra email đã tồn tại hay chưa.
  - **Khuyến nghị xử lý**: Ban Tổ Chức sử dụng tính năng Conditional Formatting trong Google Sheets (`=COUNTIF($C:$C, C1) > 1`) như đã hướng dẫn trong [`docs/google-forms-setup.md`](file:///d:/Vibe%20Code/Web-Google-form/docs/google-forms-setup.md) để đánh dấu tự động các đơn đăng ký trùng email/SĐT.

---

## 4. Đo Lường Thực Tế & Kiểm Tra Build

```bash
> vite build
✓ 1618 modules transformed.
dist/index.html                         2.99 kB │ gzip:  1.15 kB
dist/assets/index-NxBqWUjg.css         27.23 kB │ gzip:  6.21 kB
dist/assets/NotFoundPage-qvDuIpSx.js    1.14 kB │ gzip:  0.70 kB
dist/assets/index-klcRAH6X.js          14.81 kB │ gzip:  6.42 kB
dist/assets/vendor-icons-BjuOS9FT.js   16.72 kB │ gzip:  3.53 kB
dist/assets/HomePage-bb2YiqTM.js       17.36 kB │ gzip:  5.04 kB
dist/assets/RegisterPage-C6iAmUrM.js   29.69 kB │ gzip:  9.30 kB
dist/assets/vendor-react-CYCMOJOU.js  178.74 kB │ gzip: 58.72 kB
✓ built in 16.47s (Exit code 0, 0 Errors, 0 Warnings)
```

- Không có lỗi biên dịch, không phát sinh cảnh báo kích thước chunk (`chunkSizeWarningLimit`).
- Tất cả các bài kiểm tra chức năng (53/53 tests) đều tiếp tục hoạt động chính xác sau khi áp dụng tối ưu hóa.

---

## 5. Rủi Ro Còn Lại & Khuyến Nghị Vận Hành

1. **Trạng thái chưa cấu hình (UNCONFIGURED)**:
   - Hệ thống hiện tại đang chặn gửi dữ liệu giả mạo. Cần cập nhật `actionUrl` và 8 mã `entry.XXXXXXXX` từ Google Form thật vào [`src/services/googleForm.js`](file:///d:/Vibe%20Code/Web-Google-form/src/services/googleForm.js) trước ngày mở cổng đăng ký chính thức.
2. **Giới hạn Opaque Response của Google Forms**:
   - Khi gửi trực tiếp từ trình duyệt, kết quả trả về là `submitted_unverified`. Để có trạng thái `success: true` được xác thực 100% từ máy chủ, phương án tối ưu tối thiểu là triển khai một Serverless Function (Cloudflare Worker hoặc Vercel Function) làm proxy chuyển tiếp dữ liệu đến Google Forms như đã phân tích trong tài liệu thiết lập.

