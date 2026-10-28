# Hướng Dẫn Cấu Hình Google Form & Google Sheets - Sự Kiện Gala Night 2026

Tài liệu này hướng dẫn chi tiết quy trình thiết lập biểu mẫu Google Form mới, trích xuất mã định danh các trường (`entry.XXXXXXXX`), liên kết Google Sheets và cấu hình vào mã nguồn website GALA NIGHT của TTV Club.

---

## 1. Kiến Trúc & Luồng Dữ Liệu

```
[Người dùng tại /register]
          │
          ▼
[React RegistrationForm (Client-side Validation)]
          │
          ▼
[googleForm.js Service]
   ├── UNCONFIGURED ──► Chặn gửi dữ liệu giả mạo khi chưa có cấu hình
   ├── MOCK ──────────► Mô phỏng phục vụ phát triển giao diện
   ├── DIRECT_GOOGLE_FORM (Browser POST qua hidden iframe)
   │        │
   │        ▼ (Cross-Origin: Opaque Response status 0)
   │     [Google Form /formResponse]
   │        │
   │        ▼
   │     [Google Sheets (Cơ sở dữ liệu tiếp nhận)]
   │
   └── VERIFIED_API ──► (Tùy chọn nâng cao) Gửi qua Serverless Proxy để nhận phản hồi 100% xác thực
```

---

## 2. Bước 1: Tạo Biểu Mẫu Google Form Mới

> [!IMPORTANT]
> **Tuyệt đối không sử dụng lại biểu mẫu tuyển quân cũ.** Cần tạo một biểu mẫu hoàn toàn mới dành riêng cho sự kiện Gala Night.

1. Truy cập [Google Forms](https://forms.google.com) và tạo một biểu mẫu trống mới.
2. Đặt tiêu đề biểu mẫu: `ĐĂNG KÝ THAM DỰ GALA NIGHT 2026 - TTV CLUB`.
3. Cài đặt các câu hỏi chính xác theo bảng dưới đây (đúng thứ tự và loại câu hỏi):

| STT | Tên câu hỏi trong Google Form | Loại câu hỏi | Bắt buộc? | Tùy chọn / Gợi ý |
|:---:|---|---|:---:|---|
| 1 | **Họ và tên** | Trả lời ngắn (Short answer) | **Có** | Nhập họ tên đầy đủ |
| 2 | **Địa chỉ Email** | Trả lời ngắn (Short answer) | **Có** | Định dạng email nhận vé mời |
| 3 | **Số điện thoại liên hệ** | Trả lời ngắn (Short answer) | **Có** | Số điện thoại dùng Zalo |
| 4 | **Mã sinh viên** | Trả lời ngắn (Short answer) | Không | Dành cho sinh viên PTIT (ví dụ: B23DCCN001) |
| 5 | **Lớp / Đơn vị** | Trả lời ngắn (Short answer) | Không | Lớp niên khóa hoặc tên tổ chức |
| 6 | **Nhóm người tham dự** | Trắc nghiệm (Multiple choice) | **Có** | Thêm đúng 4 lựa chọn:<br>• `Thành viên CLB`<br>• `Cựu thành viên`<br>• `Khách mời`<br>• `Khác` |
| 7 | **Ghi chú cho Ban tổ chức** | Đoạn (Paragraph) | Không | Lời chúc, câu hỏi hoặc yêu cầu chỗ ngồi |
| 8 | **Cam kết sử dụng thông tin** | Hộp kiểm (Checkboxes) | **Có** | Thêm 1 lựa chọn duy nhất:<br>• `Tôi đồng ý cho phép Ban Tổ Chức sử dụng thông tin trên cho mục đích tổ chức sự kiện GALA NIGHT 2026.` |

### Cấu hình quyền truy cập (Settings) trong Google Form:
- Vào mục **Cài đặt (Settings)** của Google Form:
  - **Câu trả lời (Responses)**:
    - *Thu thập địa chỉ email*: Chọn **Không thu thập (Do not collect)** (vì form website đã có trường email riêng).
    - *Yêu cầu đăng nhập*: Tắt mục **Giới hạn ở 1 câu trả lời** (nếu bật, người dùng bắt buộc phải đăng nhập tài khoản Google trên trình duyệt, khiến việc submit tự động từ website bị chặn).
    - *Cho phép chỉnh sửa câu trả lời*: Tắt.

---

## 3. Bước 2: Trích Xuất Action URL & Mã Trường (`entry.XXXXXXXX`)

### 3.1. Lấy URL nộp đơn (`actionUrl`)
1. Trên giao diện chỉnh sửa biểu mẫu, bấm vào nút **Gửi (Send)** ở góc trên bên phải.
2. Chọn tab biểu tượng liên kết (Link) và sao chép đường link dạng:
   `https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform`
3. Thay thế phần đuôi `/viewform` bằng `/formResponse`.
   URL hoàn chỉnh sẽ có dạng:
   `https://docs.google.com/forms/d/e/1FAIpQLSc.../formResponse`

### 3.2. Lấy mã Entry ID cho từng trường
Có hai cách đơn giản để lấy mã:

#### Cách 1: Sử dụng tính năng "Nhận liên kết được điền sẵn" (Khuyến nghị)
1. Trong Google Form, nhấn vào biểu tượng **3 dấu chấm** ở góc trên bên phải $\rightarrow$ chọn **Nhận liên kết được điền sẵn (Get pre-filled link)**.
2. Tại các ô nhập, bạn điền các từ khóa dễ nhận biết tương ứng:
   - Họ và tên: `TEST_NAME`
   - Địa chỉ Email: `test@email.com`
   - Số điện thoại: `0987654321`
   - Mã sinh viên: `TEST_STUID`
   - Lớp / Đơn vị: `TEST_CLASS`
   - Nhóm người tham dự: Tích chọn `Thành viên CLB`
   - Ghi chú: `TEST_NOTE`
   - Cam kết: Tích chọn ô đồng ý
3. Kéo xuống dưới cùng nhấn **Nhận liên kết (Get link)** $\rightarrow$ **Sao chép liên kết (Copy link)**.
4. Dán đường link vừa sao chép vào trình soạn thảo, bạn sẽ thấy dạng URL như sau:
   ```text
   https://docs.google.com/forms/d/e/.../viewform?usp=pp_url&entry.1012345678=TEST_NAME&entry.2098765432=test%40email.com&entry.3012345678=0987654321...
   ```
5. Đối chiếu từng từ khóa để ghi lại mã `entry.XXXXXXXX` tương ứng cho từng trường.

#### Cách 2: Kiểm tra phần tử (DevTools)
1. Mở xem trước biểu mẫu (nút hình con mắt).
2. Nhấn phím `F12` (mở DevTools) $\rightarrow$ chuyển qua tab **Elements** (Phần tử).
3. Nhấn `Ctrl + F` và tìm kiếm cụm từ `entry.`. Bạn sẽ tìm thấy các thẻ `<input type="hidden" name="entry.XXXXXXXX">` hoặc `<input name="entry.XXXXXXXX">`.

---

## 4. Bước 3: Cập Nhật Cấu Hình Vào Mã Nguồn

Mở file [`src/services/googleForm.js`](file:///d:/Vibe%20Code/Web-Google-form/src/services/googleForm.js) và thay thế các giá trị placeholder bằng thông tin thực tế thu được từ Bước 2:

```javascript
export const GALA_GOOGLE_FORM_CONFIG = {
  // Thay thế URL nộp đơn thực tế tại đây:
  actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc_MA_FORM_ID_THUC_TE/formResponse',

  // Chuyển chế độ sang DIRECT_GOOGLE_FORM
  mode: GALA_FORM_MODE.DIRECT_GOOGLE_FORM,

  // Thay thế các entry ID tương ứng:
  entries: {
    fullName: 'entry.1012345678',     // entry của Họ và tên
    email: 'entry.2098765432',        // entry của Email
    phone: 'entry.3012345678',        // entry của Số điện thoại
    studentId: 'entry.4012345678',    // entry của Mã sinh viên
    className: 'entry.5012345678',    // entry của Lớp / Đơn vị
    attendeeType: 'entry.6012345678', // entry của Nhóm người tham dự
    note: 'entry.7012345678',         // entry của Ghi chú
    consent: 'entry.8012345678'       // entry của Cam kết đồng ý
  },

  consentText: 'Tôi đồng ý cho phép Ban Tổ Chức sử dụng thông tin trên cho mục đích tổ chức sự kiện GALA NIGHT 2026.'
};
```

---

## 5. Giới Hạn Trình Duyệt (Browser Limitations & CORS)

### 5.1. Bản chất của phản hồi Opaque Response
Khi gửi dữ liệu từ trình duyệt web (`localhost` hoặc tên miền riêng) sang máy chủ Google Forms (`docs.google.com`):
- Trình duyệt áp dụng chính sách **Same-Origin Policy** (CORS).
- Google Forms **không trả về header** `Access-Control-Allow-Origin: *`.
- Nếu dùng `fetch(url, { mode: 'no-cors' })` hoặc `hidden iframe POST`:
  - Trình duyệt sẽ cho phép gửi yêu cầu đi, nhưng trả về một phản hồi mờ đục (**Opaque Response**) với `status = 0`, `type = 'opaque'` và không thể đọc được nội dung phản hồi (response body).
  - Sự kiện `iframe.onload` sẽ kích hoạt ngay khi trang phản hồi của Google nạp xong, **bất kể Google Form có lưu thành công hay từ chối** (ví dụ: form bị đóng, sai entry ID, thiếu trường bắt buộc, hoặc dính Captcha chống bot).

> [!WARNING]
> Do đó, hệ thống website tuân thủ nguyên tắc minh bạch: **Không bao giờ khẳng định `status: 'success'` (đã lưu vào DB)** đối với yêu cầu gửi trực tiếp qua trình duyệt. Thay vào đó, hệ thống hiển thị trạng thái `submitted_unverified` (Đã tiếp nhận yêu cầu, vé mời sẽ được Ban Tổ Chức đối soát và xác thực qua email).

### 5.2. Giải pháp phản hồi 100% xác thực (Verified Alternative)
Nếu Ban Tổ Chức yêu cầu hệ thống phải phản hồi trạng thái `success: true` với tính xác thực tuyệt đối ngay tức thì trên màn hình:
- **Phương án khả thi tối thiểu (MVPA)**: Thiết lập một hàm **Serverless Proxy** nhẹ (Cloudflare Worker, Vercel Serverless Function hoặc AWS Lambda).
- **Luồng hoạt động**:
  1. Frontend gửi dữ liệu JSON thông qua `fetch()` đến Serverless Proxy (cùng domain hoặc cấu hình CORS hợp lệ).
  2. Serverless Proxy thực hiện một HTTP POST chuẩn (server-to-server) đến `https://docs.google.com/forms/d/e/.../formResponse`. Vì là kết nối máy chủ với máy chủ, chính sách CORS của trình duyệt không bị áp dụng.
  3. Serverless Proxy kiểm tra mã phản hồi HTTP từ Google Form (mã `200` là thành công, mã `400` hoặc `302` bất thường là lỗi) rồi trả về JSON `{ success: true, verified: true }` cho Frontend.
  4. Cấu hình URL của proxy vào `GALA_GOOGLE_FORM_CONFIG.verifiedApiUrl` và đặt `mode: GALA_FORM_MODE.VERIFIED_API`.

> [!NOTE]
> Xin lưu ý: Sử dụng **Google Apps Script (GAS) Web App** đơn lẻ không giải quyết triệt để vấn đề CORS trên trình duyệt, bởi vì Apps Script trả về mã chuyển hướng HTTP 302, điều mà cơ chế CORS của các trình duyệt hiện đại chặn lại nếu không cấu hình proxy trung gian.

---

## 6. Quy Trình Quản Lý & Đối Soát Trên Google Sheets

### 6.1. Liên kết Google Form với Google Sheets
1. Trong Google Form, chọn tab **Câu trả lời (Responses)**.
2. Bấm vào biểu tượng **Google Sheets (Liên kết với Trang tính)**.
3. Chọn **Tạo bảng tính mới (Create a new spreadsheet)** và đặt tên: `GALA NIGHT 2026 - DANH SÁCH ĐĂNG KÝ (Responses)`.
4. Nhấn **Tạo (Create)**. Một bảng tính sẽ tự động mở ra với các cột tiêu đề tương ứng:
   `Dấu thời gian | Họ và tên | Địa chỉ Email | Số điện thoại liên hệ | Mã sinh viên | Lớp / Đơn vị | Nhóm người tham dự | Ghi chú cho Ban tổ chức | Cam kết sử dụng thông tin`

### 6.2. Kiểm tra & Xử lý dữ liệu trùng lặp (Deduplication)
1. Trong bảng Google Sheets, chọn cột **Địa chỉ Email** (Cột C) hoặc **Số điện thoại** (Cột D).
2. Vào menu **Định dạng (Format)** $\rightarrow$ **Định dạng có điều kiện (Conditional formatting)**.
3. Tại mục *Quy tắc định dạng*, chọn **Công thức tùy chỉnh là (Custom formula is)** và nhập công thức:
   ```excel
   =COUNTIF($C:$C, C1) > 1
   ```
4. Chọn màu nền cảnh báo (ví dụ: màu vàng hoặc đỏ nhạt). Khi có đăng ký trùng lặp email hoặc số điện thoại, Google Sheets sẽ tự động đổi màu để Ban Tổ Chức phát hiện ngay lập tức.

### 6.3. Kiểm thử đầu-cuối (End-to-End Testing)
Sau khi hoàn tất cấu hình:
1. Gửi 1 đơn đăng ký thử nghiệm từ website:
   - Họ tên: `[TEST] Nguyễn Văn Thử Nghiệm`
   - Email: `test.ttv@gmail.com`
   - Số điện thoại: `0987654321`
   - Nhóm: `Thành viên CLB`
2. Mở Google Sheets liên kết, kiểm tra xem dòng dữ liệu mới có xuất hiện chính xác các trường không.
3. Sau khi xác nhận dữ liệu đổ về đúng các cột, xóa dòng test để bảng tính sẵn sàng đón nhận đăng ký chính thức.

---

## 7. An Toàn Thông Tin & Bảo Mật

1. **Không lưu trữ bí mật (Secrets) ở Frontend**: Tuyệt đối không nhúng Service Account Private Key, OAuth Secret hoặc API Key riêng tư vào mã nguồn React.
2. **Quyền hạn bảng tính**: Bảng Google Sheets chứa thông tin cá nhân của người tham dự cần được đặt chế độ bảo mật: chỉ chia sẻ quyền truy cập cho Trưởng Ban Tổ Chức và Trưởng Ban Đối Ngoại phụ trách check-in.

