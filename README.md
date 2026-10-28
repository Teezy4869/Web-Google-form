# TTV Club — GALA NIGHT 2026 Website

Website giới thiệu sự kiện và tiếp nhận đăng ký tham dự đêm đại nhạc hội **GALA NIGHT 2026** của CLB Truyền Thông & Công Nghệ Trẻ (TTV Club).  
Được xây dựng trên nền tảng **React 18 + Vite**, thiết kế giao diện **Cinematic Dark Theme** cao cấp kết hợp hiệu ứng kính **Glassmorphism**, tuân thủ nghiêm ngặt tiêu chuẩn trợ năng **WCAG 2.1 AA** và tối ưu hóa hiệu năng di động.

---

## 🌟 Tính Năng Nổi Bật

- **Full-Screen Video Hero (100svh)**: Video giới thiệu toàn màn hình tự động phát kèm poster fallback, nút điều khiển âm thanh, tự động tạm dừng qua `IntersectionObserver` khi cuộn khỏi màn hình để tiết kiệm pin/GPU.
- **Single-Page Form Đăng Ký Chuyên Nghiệp**: Tuyến đường `/register` độc lập với 8 trường dữ liệu tinh gọn, xác thực trực tiếp (Inline Validation), chống gửi đúp và bảo lưu dữ liệu 100% khi có lỗi mạng.
- **Kiến Trúc Tích Hợp Google Form Minh Bạch**: Tách biệt rõ ràng 4 trạng thái nộp đơn (`unconfigured`, `mock`, `submitted_unverified`, `success`). Không bao giờ hiển thị thông báo thành công giả định khi gặp phản hồi mờ đục (Opaque Response).
- **Trợ Năng Toàn Diện (WCAG 2.1 AA)**: Cây tiêu đề không nhảy cấp (`h1` $\rightarrow$ `h2` $\rightarrow$ `h3`), ARIA live region thông báo lỗi cho người khiếm thị, chỉ báo focus `:focus-visible` độ tương phản cao, hỗ trợ điều hướng bàn phím hoàn chỉnh.
- **Tối Ưu Hóa Tải Trang (Code Splitting)**: Entry bundle giảm 94.2% dung lượng ban đầu (`14.81 kB` gzipped `6.42 kB`), tách vendor cache riêng biệt, tải phông chữ bất đồng bộ không chặn render.

---

## 🗺️ Cấu Trúc Tuyến Đường (Routes)

| Tuyến đường | Mục đích | Thành phần phụ trách |
|---|---|---|
| **`/`** | Landing Page sự kiện (Hero Video, Về CLB `#about`, Đêm hội Gala `#gala`, Đếm ngược, Footer) | `src/pages/HomePage.jsx` |
| **`/register`** | Biểu mẫu tiếp nhận đăng ký tham dự Gala Night đơn trang | `src/pages/RegisterPage.jsx` |
| **`*`** | Trang thông báo lỗi 404 và điều hướng về trang chủ | `src/pages/NotFoundPage.jsx` |

---

## 🚀 Khởi Chạy Dự Án

### Yêu cầu môi trường
- **Node.js**: Phiên bản 18.x trở lên (khuyến nghị Node 20+ hoặc 24 LTS).
- **Trình quản lý gói**: npm 9.x+ hoặc yarn / pnpm.

### Các lệnh thực thi

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi động môi trường phát triển cục bộ (Local Dev Server)
npm run dev

# 3. Đóng gói bản phát hành tối ưu cho Production
npm run build

# 4. Chạy máy chủ xem trước bản build (Preview Server)
npm run preview
```

---

## ⚙️ Cấu Hình Dữ Liệu & Tùy Chỉnh

| Thành phần | Đường dẫn tệp cấu hình | Mục đích tùy chỉnh |
|---|---|---|
| **Thông tin CLB** | [`src/data/clubData.js`](src/data/clubData.js) | Tên CLB, sứ mệnh, số liệu cột mốc, 4 giá trị cốt lõi, lĩnh vực hoạt động, kênh liên hệ. |
| **Thông tin Gala Night** | [`src/data/galaData.js`](src/data/galaData.js) | Tên sự kiện, chủ đề, thời gian, địa điểm tổ chức, 4 điểm nhấn, thông tin ban tổ chức. |
| **Video & Ảnh nền** | `public/assets/video/` & `public/assets/images/` | Đặt video `ttv-intro.mp4`, ảnh poster `hero-poster.jpg` và `gala-poster.jpg`. |
| **Cấu hình Google Forms** | [`src/services/googleForm.js`](src/services/googleForm.js) | Điền Action URL và 8 mã `entry.XXXXXXXX` khi đã tạo Google Form chính thức. |
| **Quy tắc xác thực** | [`src/utils/validation.js`](src/utils/validation.js) | Định dạng số điện thoại VN, độ dài tên, cấu trúc email, cam kết điều khoản. |

---

## ☁️ Triển Khai Lên Máy Chủ (Deployment)

Dự án đã được cấu hình sẵn cho các nền tảng Static Web Hosting / JAMstack phổ biến:
- **Vercel**: Tệp [`vercel.json`](vercel.json) cấu hình SPA rewrite (`/index.html`) và header cache tài nguyên tĩnh.
- **Netlify**: Tệp [`netlify.toml`](netlify.toml) và [`public/_redirects`](public/_redirects) tự động điều hướng `/*` về `/index.html` với mã trạng thái 200.

Chi tiết xem tại tài liệu hướng dẫn: [`docs/deployment-guide.md`](docs/deployment-guide.md).

---

## 📚 Tài Liệu Hướng Dẫn Kèm Theo

1. [`docs/deployment-guide.md`](docs/deployment-guide.md) — Hướng dẫn triển khai chi tiết lên Vercel, Netlify và máy chủ riêng (Nginx/Apache).
2. [`docs/final-handover.md`](docs/final-handover.md) — Tài liệu bàn giao vận hành: cách cập nhật nội dung, video, ảnh và mở cổng đăng ký.
3. [`docs/google-forms-setup.md`](docs/google-forms-setup.md) — Hướng dẫn tạo Google Form, trích xuất mã entry và liên kết Google Sheets.
4. [`docs/phase4-test-report.md`](docs/phase4-test-report.md) — Báo cáo kết quả kiểm thử toàn diện 53/53 ca kiểm thử thực tế.
5. [`docs/phase4-optimization.md`](docs/phase4-optimization.md) — Báo cáo đo lường tối ưu hóa hiệu năng, chia nhỏ bundle và trợ năng.

---

## 🛡️ Bản Quyền & Bảo Mật

- Bản quyền © 2026 **CLB Truyền Thông & Công Nghệ Trẻ (TTV Club)**.
- Toàn bộ dữ liệu người dùng được bảo vệ, tuyệt đối không lưu trữ thông tin nhận dạng cá nhân (PII) trên LocalStorage.
