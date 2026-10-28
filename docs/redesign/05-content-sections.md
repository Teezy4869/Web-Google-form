# 05 — Tái Thiết Kế Toàn Bộ Các Content Sections Còn Lại
## Dự án: Solfera – D-DAY 2026 | Nhận Diện YGC / AEP

> **Thực hiện:** Senior Frontend Engineer & UI/UX Specialist  
> **Nhánh Git:** `redesign/solfera-dday-2026`  
> **Tài liệu tham chiếu:** `docs/redesign/00-project-constraints.md`, `docs/redesign/01-project-audit.md`, `docs/redesign/02-design-system.md`, `docs/redesign/03-global-layout-hero.md`, `docs/redesign/04-event-meaning-visual.md`  
> **Mã nguồn can thiệp:**  
> - `src/components/home/AboutSection.jsx`  
> - `src/components/home/GalaSection.jsx`  
> - `src/pages/RegisterPage.jsx`  
> - `src/components/common/SuccessModal.jsx`  
> - `src/styles/index.css`

---

## 1. Kiểm Kê & Bảng Tổng Hợp Content Sections (Section Inventory)

Dựa trên bản khảo sát kỹ thuật Phase 1, toàn bộ các content sections thực sự tồn tại trong dự án đã được rà soát và nâng cấp đồng bộ:

| STT | Component / File | Tên Section / Khối nội dung | Trạng thái trước Phase 5 | Cải tiến thực hiện trong Phase 5 |
|:---:|---|---|---|---|
| **1** | `AboutSection.jsx` | **Dải Số Liệu Cột Mốc (`stats-grid`)** | Style cũ, chữ vàng cơ bản | Số liệu phủ gradient kim loại Champagne-Gold, thẻ kính mờ rượu vang sẫm, quầng sáng phát quang |
| **2** | `AboutSection.jsx` | **Sứ Mệnh Cốt Lõi (`mission-spotlight-card`)** | Nền gradient xanh/vàng cũ | Kính mờ Deep Wine & Ruby Gradient, đại tự Cinzel, viền Champagne phản chiếu |
| **3** | `AboutSection.jsx` | **4 Trụ Cột Văn Hóa (`pillar-card`)** | Mang nhãn "TTV", tag cyan cũ | Chuyển sang nhận diện YGC/AEP, icon box Champagne, hover card lift `-3px` |
| **4** | `AboutSection.jsx` | **4 Lĩnh Vực Hoạt Động (`activity-list`)** | Khung placeholder xám giả định | **Tích hợp 4 visual chính thức Solfera** (`solfera-story-art.webp`, `solfera-cover-banner.webp`...), tỉ lệ 16:9 sắc nét, overlay và floating tag |
| **5** | `AboutSection.jsx` | **Bridging CTA Banner (`gala-direction-card`)** | Nhắc đến "TTV Club", nút cũ | Đồng bộ SOLFERA D-DAY 2026 & YGC/AEP, nút gradient `.btn-primary` dẫn sang `#gala` |
| **6** | `GalaSection.jsx` | **Thời Gian & Địa Điểm (`gala-info-strip`)** | Khối thông tin xanh đen | 2 thẻ kính mờ Burgundy, icon Calendar & MapPin viền vàng Champagne, hiển thị PTIT |
| **7** | `GalaSection.jsx` | **4 Dấu Ấn Đêm Hội (`highlight-card`)** | Thẻ viền mờ đơn điệu | Số thứ tự lớn `01 - 04` viền kim loại Champagne mờ, icon box phát sáng, hover tương tác nổi bật |
| **8** | `GalaSection.jsx` | **Đồng Hồ Đếm Ngược (`countdown-box`)** | Nhãn cũ "GALA NIGHT" | Đồng bộ nhãn *"Đếm Ngược Đến Giờ Khai Màn SOLFERA – D-DAY 2026"*, số to sắc nét |
| **9** | `GalaSection.jsx` | **Heroic CTA Banner (`gala-cta-banner`)** | Nền đơn sắc sẫm | **Tích hợp banner panoramic `solfera-cover-banner.webp` làm nền**, nút `.btn-cta` phát quang |
| **10**| `RegisterPage.jsx` | **Header & Dải Tóm Tắt Sự Kiện** | Nhắc đến "Gala TTV", màu cũ | Tiêu đề Cinzel, tóm tắt PTIT với icon box viền Champagne, nút quay lại trang chủ |
| **11**| `RegisterPage.jsx` | **Chỉ Dẫn 3 Bước Nhận Vé Mời** | Viền vàng cũ, chữ tối | Thẻ kính mờ viền trái Champagne 4px (`border-left: 4px solid var(--champagne)`), quy trình E-ticket |
| **12**| `RegisterPage.jsx` | **Hỗ Trợ Ban Tổ Chức & Kênh Liên Hệ** | Tên BTC cũ | Đồng bộ Ban Tổ Chức SOLFERA – D-DAY 2026 \| YGC/AEP, hotline, email, fanpage |
| **13**| `SuccessModal.jsx` | **Hộp Thoại Xác Nhận Đăng Ký** | Badge vàng cũ | Tiêu đề Cinzel, badge trạng thái Solfera, thông tin xác nhận vé E-ticket YGC/AEP |

---

## 2. Chi Tiết Nâng Cấp Từng Khu Vực

### 2.1 Khu Vực Giới Thiệu Tổ Chức (`AboutSection.jsx`)
1. **Dải Cột Mốc Số Liệu (Milestones):**
   - 4 số liệu cốt lõi (`9+ năm`, `400+ thành viên`, `75+ sự kiện`, `35+ đối tác`) được đặt trong thẻ kính mờ Deep Wine (`rgba(30, 10, 16, 0.75)`).
   - Con số hiển thị hiệu ứng ánh kim Champagne-Gold rực rỡ, chữ phụ màu bạc ánh hồng (`--text-muted`).
2. **Sứ Mệnh Cốt Lõi:**
   - Card kính mờ góc bo rộng `var(--radius-xl)` với nền chuyển tiếp `linear-gradient(135deg, rgba(129, 34, 64, 0.18) 0%, rgba(30, 9, 15, 0.92) 100%)`.
   - Tiêu đề đại tự `Cinzel` mang phong cách uy nghiêm, sang trọng.
3. **4 Trụ Cột Văn Hóa YGC / AEP:**
   - Loại bỏ hoàn toàn style xanh ngọc cyan cũ, thay thế bằng sắc hồng ngọc Rose/Ruby và viền vàng Champagne.
   - Các cột trụ: *Thực Chiến & Ứng Dụng*, *Gắn Kết & Sẻ Chia*, *Phát Triển Toàn Diện*, *Mạng Lưới Kết Nối*.
4. **Loại Bỏ Placeholder — Đưa Visual Thực Tế Vào 4 Mảng Hoạt Động:**
   - **Mảng Truyền thông & Sáng tạo:** Tích hợp artwork nghệ thuật `solfera-story-art.webp`.
   - **Mảng Công nghệ & Phần mềm:** Tích hợp visual ngang công nghệ `solfera-cover-banner.webp`.
   - **Mảng Sân khấu & Sự kiện:** Tích hợp visual sân khấu `solfera-hero-visual.webp`.
   - **Mảng Gắn kết & Đời sống:** Tích hợp visual cộng đồng `solfera-poster.webp`.
   - Tất cả khung ảnh tuân thủ tỉ lệ chuẩn `16:9`, có lớp phủ gradient bóng mờ và floating badge định danh chuyên môn.

---

### 2.2 Khu Vực Sự Kiện D-DAY (`GalaSection.jsx`)
1. **Dải Thông Tin Lịch Trình & Địa Điểm (`gala-info-strip`):**
   - 2 thẻ kính mờ phân chia khoa học: Thời gian sự kiện (kèm giờ mở cửa đón khách) và Địa điểm (Học viện Công nghệ Bưu chính Viễn thông PTIT, Hà Nội).
   - Icon lịch và định vị mạ vàng Champagne trên nền hồng rượu vang mờ.
2. **4 Dấu Ấn Đêm Hội (`highlight-card`):**
   - Lễ vinh danh thế hệ (`Award`), Đại nhạc hội bùng nổ (`Music`), Không gian giao lưu (`Users2`), Triển lãm kỷ niệm (`Camera`).
   - Con số thứ tự `01 - 04` kích thước lớn tạo chiều sâu typographic điện ảnh.
3. **Heroic Call-to-Action Banner với Nền Panoramic:**
   - Tích hợp tệp bìa chính thức `solfera-cover-banner.webp` làm nền mờ ảo phía sau (`center / cover no-repeat`) kết hợp gradient 2 chiều, tạo hiệu ứng sân khấu bao trùm hoành tráng.
   - Nút CTA nhịp đập phát quang 2.8s (`.btn-cta`) dẫn dắt người xem vào trang `/register`.

---

### 2.3 Trang Đăng Ký Tham Dự (`RegisterPage.jsx` & `SuccessModal.jsx`)
1. **Header & Context:**
   - Nút *"Quay Lại Trang Chủ"* mượt mà.
   - Tiêu đề `Cinzel`: *"Đăng Ký Tham Dự SOLFERA – D-DAY 2026"*.
   - Khối tóm tắt thời gian và địa điểm PTIT đặt ngay đầu trang giúp người tham dự an tâm xác nhận.
2. **Quy Trình Nhận Vé E-Ticket 3 Bước:**
   - Thẻ hướng dẫn với viền trái vàng Champagne 4px nổi bật, thông báo rõ ràng cơ chế gửi vé điện tử kèm mã QR check-in qua email.
3. **Hỗ Trợ Người Tham Dự:**
   - 3 nút bấm nhanh: Gọi Hotline, Gửi Email, Mở Fanpage YGC/AEP.
4. **Hộp Thoại Thành Công (`SuccessModal`):**
   - Đồng bộ hoàn toàn giao diện kính mờ rượu vang sẫm, viền Champagne và thông báo chúc mừng đăng ký sự kiện Solfera.
   - **Bảo toàn 100% logic nghiệp vụ:** Giữ nguyên trạng thái nộp đơn, phân định xác thực tức thì hoặc chờ duyệt email.

---

## 3. Tính Toàn Vẹn Của Nội Dung (Content Integrity)

- **Không tự sáng tác thông tin sai lệch:** Giữ nguyên các số liệu hoạt động lịch sử 9+ năm, 400+ thành viên, 75+ sự kiện từ `clubData.js`.
- **Minh bạch thông tin:** Các trường lịch trình hoặc thời gian mở cổng chưa công bố chính thức tiếp tục giữ trạng thái *"Đang cập nhật"* an toàn.
- **Bảo toàn chức năng:** Toàn bộ luồng xác thực biểu mẫu 8 trường, cơ chế cuộn mượt và chống double-click tiếp tục vận hành trơn tru.

---

## 4. Kết Quả Kiểm Thử (Validation Results)

| Hạng mục kiểm thử | Kịch bản / Môi trường | Kết quả đạt được |
|---|---|---|
| **Hiển thị visual hoạt động** | Tải 4 ảnh trong AboutSection | Ảnh hiển thị sắc nét, tỉ lệ 16:9 chuẩn mực, không còn bất kỳ khung placeholder xám nào |
| **Hiển thị banner CTA** | Nạp `solfera-cover-banner.webp` | Nền chuyển sắc điện ảnh hòa quyện, chữ tương phản cao dễ đọc |
| **Responsive Mobile (375px - 480px)** | Màn hình điện thoại | Grid 2 cột co thành 1 cột cân đối; nút CTA phủ rộng 100%; hoàn toàn không tràn ngang (`0px overflow`) |
| **Responsive Tablet (768px - 968px)** | Màn hình máy tính bảng | Các khối content card tự động dàn đều, khoảng cách lề hài hòa |
| **Điều hướng neo liên tuyến** | Bấm *"Xem Thông Tin Đêm Hội Gala"* | Cuộn mượt chính xác xuống vị trí `#gala` với khoảng đệm bù trừ navbar |
| **Kiểm tra bản build** | `npm run build` | **0 lỗi**, hoàn thành trong **13.96s**, bundle tối ưu |
