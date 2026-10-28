# Hướng Dẫn Triển Khai Website GALA NIGHT (Deployment Guide)

Tài liệu này cung cấp hướng dẫn từng bước để đóng gói và triển khai ứng dụng web **GALA NIGHT 2026** của TTV Club lên các dịch vụ lưu trữ đám mây (Cloud Hosting) hoặc máy chủ riêng, đảm bảo cơ chế định tuyến Single-Page Application (SPA) hoạt động trơn tru trên mọi trang con.

---

## 1. Thông Số Đóng Gói (Build Specifications)

- **Framework**: React 18 + Vite
- **Lệnh đóng gói (Build Command)**: `npm run build`
- **Thư mục đầu ra (Output Directory)**: `dist`
- **Phiên bản Node.js yêu cầu**: `>= 18.20.0` (Khuyến nghị Node 20.x hoặc 22.x LTS)
- **Quản lý gói (Package Manager)**: `npm` (hoặc `pnpm` / `yarn`)

---

## 2. Xử Lý Định Tuyến SPA (SPA Routing Fallback)

> [!IMPORTANT]
> **Hiện tượng lỗi 404 khi tải lại trang con:**  
> Do ứng dụng sử dụng React Router (Client-side Routing), các đường dẫn như `/register` không phải là tệp vật lý trên máy chủ. Nếu máy chủ web không được cấu hình để chuyển hướng mọi yêu cầu về `index.html`, người dùng truy cập trực tiếp hoặc bấm `F5` tại `/register` sẽ gặp lỗi `404 Not Found`.

Dự án đã được tích hợp sẵn tệp cấu hình cho tất cả các nền tảng phổ biến:

### 2.1. Triển khai trên Vercel (Khuyến nghị số 1)
Tệp [`vercel.json`](../vercel.json) ở thư mục gốc tự động điều phối mọi đường dẫn về `index.html`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2.2. Triển khai trên Netlify
Dự án đã có tệp [`netlify.toml`](../netlify.toml) và [`public/_redirects`](../public/_redirects):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
Tệp `_redirects` trong thư mục `public/` sẽ tự động được sao chép vào `dist/_redirects` trong quá trình build.

### 2.3. Triển khai trên máy chủ Linux riêng (Nginx)
Nếu triển khai trên VPS (Ubuntu/Debian) sử dụng Nginx:
```nginx
server {
    listen 80;
    server_name gala.ttvclub.com;
    root /var/www/ttv-gala/dist;
    index index.html;

    # Cấu hình SPA Fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache tài nguyên tĩnh (JS, CSS, Ảnh, Video)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Bật nén Gzip tăng tốc độ tải
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 2.4. Triển khai trên Apache Web Server
Tạo tệp `.htaccess` trong thư mục `dist/` (hoặc đặt trong `public/.htaccess` trước khi build):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 3. Hướng Dẫn Triển Khai Thực Tế Từng Bước

### Cách 1: Triển khai qua Giao diện Web Vercel (Dễ nhất & Ổn định nhất)
1. Đẩy toàn bộ mã nguồn dự án lên một kho lưu trữ riêng tư hoặc công khai trên **GitHub** / **GitLab**.
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
3. Bấm **Add New...** $\rightarrow$ **Project**.
4. Chọn repository của dự án `Web-Google-form` (hoặc `ttv-gala-night`).
5. Vercel sẽ tự động phát hiện cấu hình từ `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Bấm **Deploy**. Sau khoảng 1–2 phút, website sẽ được cấp một tên miền miễn phí (dạng `ttv-gala-night.vercel.app`) đi kèm chứng chỉ SSL HTTPS miễn phí.

---

### Cách 2: Triển khai Kéo-Thả qua Netlify Drop (Không cần cài Git)
1. Trên máy tính, mở terminal tại thư mục dự án và chạy lệnh:
   ```bash
   npm run build
   ```
2. Thư mục `dist/` sẽ được tạo ra chứa các tệp HTML, CSS, JS đã tối ưu.
3. Truy cập [app.netlify.com/drop](https://app.netlify.com/drop).
4. Kéo toàn bộ thư mục `dist` và thả vào khung tải lên của Netlify.
5. Trang web sẽ được xuất bản ngay lập tức kèm HTTPS.

---

### Cách 3: Triển khai qua Vercel CLI
Nếu bạn có quyền truy cập vào dòng lệnh Vercel:
```bash
# 1. Cài đặt Vercel CLI
npm i -g vercel

# 2. Đăng nhập
vercel login

# 3. Đóng gói và phát hành trực tiếp lên Production
npm run build
vercel --prod
```

---

## 4. Cấu Hình Tên Miền Tùy Chỉnh (Custom Domain & HTTPS)

Khi Ban Tổ Chức muốn gắn tên miền chính thức của CLB (ví dụ: `gala.ttvclub.com`):

1. **Trên Vercel / Netlify**:
   - Vào mục **Settings** $\rightarrow$ **Domains**.
   - Nhập tên miền: `gala.ttvclub.com` $\rightarrow$ bấm **Add**.
2. **Trên trang quản lý DNS (Cloudflare / Tên miền PTIT / Namecheap)**:
   - Thêm bản ghi **CNAME**:
     - *Tên (Host)*: `gala`
     - *Giá trị (Target)*: `cname.vercel-dns.com` (đối với Vercel) hoặc `[tên-site].netlify.app` (đối với Netlify).
3. Hệ thống sẽ tự động xác thực và cấp phát chứng chỉ bảo mật **SSL Let's Encrypt (HTTPS)** hoàn toàn tự động trong vòng 5–15 phút.

---

## 5. Danh Sách Kiểm Tra Trước Khi Mở Cổng Cho Khán Giả (Go-Live Checklist)

- [ ] Đã thay thế URL Google Form thực tế và 8 mã `entry.XXXXXXXX` vào [`src/services/googleForm.js`](../src/services/googleForm.js).
- [ ] Đã chuyển chế độ `mode: GALA_FORM_MODE.DIRECT_GOOGLE_FORM` (hoặc `VERIFIED_API`).
- [ ] Đã cập nhật ngày giờ và địa điểm chính thức trong [`src/data/galaData.js`](../src/data/galaData.js).
- [ ] Đã bổ sung video giới thiệu `public/assets/video/ttv-intro.mp4` hoặc kiểm tra poster fallback hiển thị đẹp mắt.
- [ ] Đã thử nghiệm gửi 1 đơn đăng ký thử và kiểm tra dòng dữ liệu tương ứng trên bảng tính Google Sheets liên kết.
- [ ] Đã kiểm tra truy cập trực tiếp bằng cách dán URL `/register` vào thanh địa chỉ của trình duyệt trên điện thoại và nhấn Reload để xác nhận không bị lỗi 404.
