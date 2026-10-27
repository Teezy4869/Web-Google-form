# TTV Apply

Website giới thiệu và đăng ký tuyển thành viên TTV Club, xây bằng React 18, Vite và CSS.

## Chạy trên máy

```bash
npm install
npm run dev
```

`npm run build` tạo bản phát hành trong `dist/`.

## Cấu hình

- Nội dung mùa tuyển, các ban và hạn nhận đơn: `src/data/recruitmentData.js`.
- URL và mã câu hỏi Google Form: `src/services/googleForm.js`.
- Đơn gồm bốn bước; bản nháp được lưu trong `localStorage` của trình duyệt.

Trang hiện hiển thị hạn nhận đơn 25/10/2026. Trước mùa tuyển mới, cập nhật thời hạn, nội dung và Google Form tương ứng. Yêu cầu gửi dùng `no-cors`, nên giao diện không thể tự xác minh Google đã lưu phản hồi; hãy kiểm tra biểu mẫu và bảng câu trả lời trước khi mở đợt tuyển.
