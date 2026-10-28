# Tài Liệu Bàn Giao Vận Hành Hệ Thống (Final Handover Documentation)
## Dự án: TTV Club GALA NIGHT Website 2026

Tài liệu này được biên soạn dành cho **Ban Quản Trị CLB TTV**, **Ban Tổ Chức Gala Night** và **Đội ngũ Kỹ thuật tiếp nhận** để quản lý, chỉnh sửa nội dung, thay thế truyền thông và vận hành cổng đăng ký sự kiện một cách an toàn và dễ dàng.

---

## 1. Cấu Trúc Dự Án & Vị Trí Các Tệp Quan Trọng

```
Web-Google-form/
├── public/
│   ├── assets/
│   │   ├── video/          # Thư mục chứa video giới thiệu (ttv-intro.mp4)
│   │   └── images/         # Thư mục chứa poster, banner (hero-poster.jpg, gala-poster.jpg)
│   ├── _redirects          # Cấu hình SPA routing cho Netlify/Cloudflare
│   └── favicon.svg         # Biểu tượng website
├── src/
│   ├── components/
│   │   ├── common/         # Navbar, Footer, ScrollToAnchor, StatusMessage, SuccessModal
│   │   ├── form/           # Các ô nhập liệu tái sử dụng (TextInput, TextArea, RadioGroup, SingleCheckbox)
│   │   ├── home/           # VideoHero, AboutSection, GalaSection
│   │   └── registration/   # RegistrationForm (Biểu mẫu đăng ký 8 trường)
│   ├── data/
│   │   ├── clubData.js     # [QUAN TRỌNG] Toàn bộ thông tin, số liệu, cột trụ, liên hệ CLB
│   │   ├── galaData.js     # [QUAN TRỌNG] Toàn bộ thông tin sự kiện Gala, thời gian, địa điểm
│   │   └── registrationConfig.js # Cấu hình nhãn, placeholder và danh mục của Form
│   ├── pages/
│   │   ├── HomePage.jsx    # Trang chủ (Route /)
│   │   ├── RegisterPage.jsx# Trang đăng ký (Route /register)
│   │   └── NotFoundPage.jsx# Trang 404
│   ├── services/
│   │   └── googleForm.js   # [QUAN TRỌNG] Cấu hình Action URL & 8 mã Entry ID Google Form
│   ├── styles/
│   │   └── index.css       # Toàn bộ mã màu, font chữ, hiệu ứng Glassmorphism & Responsive
│   └── utils/
│       ├── validation.js   # Logic xác thực dữ liệu (regex tên VN, SĐT 10 số, email)
│       └── useScrollReveal.js # Hiệu ứng cuộn mượt
├── docs/                   # Toàn bộ tài liệu hướng dẫn kỹ thuật chi tiết
├── vercel.json             # Cấu hình triển khai Vercel (SPA fallback)
├── netlify.toml            # Cấu hình triển khai Netlify (SPA fallback)
└── package.json
```

---

## 2. Hướng Dẫn Cập Nhật Nội Dung (Không Cần Chạm Vào Code Giao Diện)

Toàn bộ dữ liệu hiển thị trên website được thiết kế theo nguyên tắc **Single Source of Truth (Tập trung hóa dữ liệu)**. Bạn chỉ cần chỉnh sửa các tệp tại thư mục `src/data/`:

### 2.1. Cập nhật thông tin CLB TTV ([`src/data/clubData.js`](../src/data/clubData.js))
- **Đổi tên CLB, khẩu hiệu, sứ mệnh**: Sửa các trường `name`, `fullName`, `tagline`, `mission`, `description`.
- **Cập nhật số liệu cột mốc**: Sửa mảng `stats`:
  ```javascript
  stats: [
    { label: "Năm hoạt động & phát triển", value: "9+ năm" },
    { label: "Thành viên & Cựu thành viên", value: "400+" },
    ...
  ]
  ```
- **Cập nhật kênh liên hệ, Fanpage, Hotline**: Sửa đối tượng `contact`:
  ```javascript
  contact: {
    email: "contact.ttvclub@gmail.com",
    hotline: "0988 123 456",
    fanpageUrl: "https://facebook.com/ttvclub.ptit",
    groupUrl: "https://zalo.me/g/...",
    address: "Học viện Công nghệ Bưu chính Viễn thông (PTIT), Hà Nội"
  }
  ```

---

### 2.2. Cập nhật thông tin sự kiện GALA NIGHT ([`src/data/galaData.js`](../src/data/galaData.js))
Khi Ban Tổ Chức đã chốt lịch trình chính thức từ Nhà trường và Đoàn Thanh niên:
1. Mở tệp [`src/data/galaData.js`](../src/data/galaData.js).
2. Điền các trường đang để `null` (hiện đang hiển thị chữ *"Đang cập nhật"*):
   ```javascript
   export const GALA_EVENT = {
     name: "GALA NIGHT 2026",
     theme: "DẤU ẤN KHÁT VỌNG — 9 NĂM TỎA SÁNG", // Nhập chủ đề chính thức
     
     schedule: {
       dateTime: "18:30 — Thứ Bảy, Ngày 15 Tháng 11 Năm 2026", // Giờ & ngày
       doorsOpen: "17:30 (Đón khách & Check-in vé điện tử)",
       isoDate: "2026-11-15T18:30:00+07:00" // Định dạng ISO cho đồng hồ đếm ngược
     },

     venue: {
       name: "Hội trường Lớn A2 — Học viện CNBCVT (PTIT)", // Tên địa điểm
       address: "Km10 Đường Nguyễn Trãi, Q. Hà Đông, Hà Nội",
       mapUrl: "https://maps.google.com/..."
     },
     ...
   ```
3. Sau khi cập nhật, trang web sẽ tự động kích hoạt **Đồng hồ đếm ngược (Countdown Timer)** theo thời gian `isoDate`.

---

### 2.3. Hướng dẫn thay thế Video Hero và Ảnh Poster
1. **Thay video nền mở đầu**:
   - Xuất video chuẩn MP4 (H.264), độ phân giải khuyến nghị **1080p** hoặc **720p**, dung lượng tối ưu dưới **15MB** để đảm bảo tải nhanh trên 4G di động.
   - Đặt tên tệp là `ttv-intro.mp4` và chép đè vào thư mục: `public/assets/video/ttv-intro.mp4`.
   - Xuất một ảnh tĩnh đại diện từ khung hình đầu tiên đẹp nhất của video, đặt tên `hero-poster.jpg` và chép vào `public/assets/images/hero-poster.jpg`.
2. **Cập nhật Poster / Key Visual chính thức của Gala**:
   - Đặt tệp ảnh poster vào: `public/assets/images/gala-poster.jpg`.
   - Mở tệp [`src/data/galaData.js`](../src/data/galaData.js), tìm đến mục `media` và đổi:
     ```javascript
     media: {
       poster: "/assets/images/gala-poster.jpg",
       hasPoster: true // Đổi từ false thành true
     }
     ```
   - Khung poster trên website sẽ tự động chuyển từ khung placeholder sang ảnh poster chính thức.

---

## 3. Hướng Dẫn Kích Hoạt Tiếp Nhận Google Form Thực Tế

Hiện tại hệ thống đang được khóa an toàn ở chế độ `UNCONFIGURED` để tránh phát sinh dữ liệu rác. Khi bạn đã tạo biểu mẫu theo tài liệu [`docs/google-forms-setup.md`](google-forms-setup.md):

1. Mở tệp [`src/services/googleForm.js`](../src/services/googleForm.js).
2. Cập nhật URL nộp bài và 8 mã trường:
   ```javascript
   export const GALA_GOOGLE_FORM_CONFIG = {
     // Điền link nộp bài kết thúc bằng /formResponse
     actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc_MA_THAT/formResponse',

     // Chuyển chế độ sang DIRECT_GOOGLE_FORM
     mode: GALA_FORM_MODE.DIRECT_GOOGLE_FORM,

     // Điền 8 mã entry thực tế thu được từ bước "Nhận liên kết được điền sẵn"
     entries: {
       fullName: 'entry.1234567890',
       email: 'entry.2345678901',
       phone: 'entry.3456789012',
       studentId: 'entry.4567890123',
       className: 'entry.5678901234',
       attendeeType: 'entry.6789012345',
       note: 'entry.7890123456',
       consent: 'entry.8901234567'
     },

     consentText: 'Tôi đồng ý cho phép Ban Tổ Chức sử dụng thông tin trên cho mục đích tổ chức sự kiện GALA NIGHT 2026.'
   };
   ```
3. Lưu tệp và chạy lệnh `npm run build` để cập nhật bản phát hành.

---

## 4. Quản Lý & Xuất Danh Sách Người Tham Dự Trên Google Sheets

1. Mở biểu mẫu Google Form $\rightarrow$ chọn tab **Câu trả lời (Responses)** $\rightarrow$ bấm vào biểu tượng **Google Sheets**.
2. Toàn bộ người đăng ký từ website sẽ xuất hiện theo thời gian thực với các cột:
   `Dấu thời gian | Họ và tên | Địa chỉ Email | Số điện thoại liên hệ | Mã sinh viên | Lớp / Đơn vị | Nhóm người tham dự | Ghi chú cho Ban tổ chức | Cam kết sử dụng thông tin`
3. **Thêm cột vận hành nội bộ**:
   Ban Tổ Chức có thể tạo thêm các cột bên phải (bắt đầu từ cột J) để phục vụ công tác check-in:
   - Cột J: *Mã vé mời (E-Ticket Code)*
   - Cột K: *Trạng thái gửi email (Đã gửi / Chưa gửi)*
   - Cột L: *Trạng thái điểm danh cửa (Check-in Status)*
   - Cột M: *Bàn / Ghế phân bổ*
   *(Lưu ý: Không thay đổi thứ tự hay xóa 9 cột ban đầu do Google Form tự động sinh ra).*

---

## 5. Quy Trình Đóng Cổng Đăng Ký Khi Đã Hết Chỗ

Khi số lượng đăng ký đã đạt mức tối đa của hội trường:
1. Mở tệp [`src/data/galaData.js`](../src/data/galaData.js).
2. Đổi giá trị:
   ```javascript
   registrationSettings: {
     isOpen: false, // Chuyển thành false để đóng form
     ...
   }
   ```
3. Ngoài ra, trong trang quản trị Google Form, chuyển công tắc sang **Không chấp nhận câu trả lời (Not accepting responses)**.

---

## 6. Lệnh Đóng Gói & Triển Khai Lại (Rebuild & Redeploy)

Mỗi khi bạn sửa thông tin trong các tệp dữ liệu hoặc cấu hình:

```bash
# 1. Kiểm tra trên máy cục bộ
npm run dev

# 2. Đóng gói bản phát hành
npm run build

# 3. Xem trước bản đóng gói
npm run preview
```

Nếu dự án đã liên kết với GitHub và Vercel/Netlify, bạn chỉ cần thực hiện lệnh Git:
```bash
git add .
git commit -m "Cập nhật thông tin Gala Night 2026"
git push origin main
```
Hệ thống CI/CD của Vercel/Netlify sẽ tự động nhận diện thay đổi, đóng gói lại và cập nhật website trực tiếp lên mạng Internet trong vòng 60 giây.
