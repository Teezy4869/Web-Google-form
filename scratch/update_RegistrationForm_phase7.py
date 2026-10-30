# scratch/update_RegistrationForm_phase7.py
import sys

def update():
    file_path = "src/components/registration/RegistrationForm.jsx"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update Section 1 description
    content = content.replace(
        'title="1. Thông Tin Cá Nhân"\n          description="Vui lòng cung cấp thông tin liên hệ chính xác để Ban Tổ Chức xuất vé mời điện tử và đối soát check-in."',
        'title="1. Thông Tin Cá Nhân"\n          description=\'Bạn vui lòng điền đầy đủ các thông tin dưới đây để đăng ký vé Standard tham dự Vòng Chung kết cuộc thi King & Queen 2026 - Gala Night D-DAY 2026: "SOLFERA".\''
    )

    # 2. Update form security badge
    content = content.replace(
        '<span>Dữ liệu đăng ký được mã hóa và bảo mật bởi Ban Tổ Chức YGC / AEP 2026.</span>',
        '<span>Dữ liệu đăng ký được bảo mật bởi Ban Tổ Chức GYC - Câu lạc bộ Thế hệ trẻ AEP.</span>'
    )

    # 3. Update statusInfo in success and submitted_unverified
    old_success_block = """          // Explicit verified success
          setStatus('success');
          setStatusInfo({
            title: 'Đăng Ký Thành Công!',
            message: response.message || 'Thông tin của bạn đã được ghi nhận vào danh sách tham dự Solfera D-DAY 2026.'
          });"""

    new_success_block = """          // Explicit verified submission accepted
          setStatus('success');
          setStatusInfo({
            title: 'Đơn Đăng Ký Đã Được Tiếp Nhận!',
            message: response.message || 'Thông tin của bạn đã được ghi nhận vào hệ thống Solfera D-DAY 2026. Lưu ý: Đơn đăng ký chỉ hợp lệ khi bạn nhận được Email xác nhận chính thức từ Ban Tổ Chức GYC - Câu lạc bộ thế hệ trẻ AEP.'
          });"""

    old_unverified_block = """          // Explicit unverified submission (e.g., opaque response from Google Form / no-cors)
          setStatus('submitted_unverified');
          setStatusInfo({
            title: 'Thông Tin Đã Được Tiếp Nhận (Chờ Duyệt)',
            message: response.message || 'Biểu mẫu đã được gửi tới hệ thống. Do cơ chế kiểm duyệt bảo mật, vé mời điện tử chính thức sẽ được gửi tới email của bạn sau khi Ban Tổ Chức đối soát.'
          });"""

    new_unverified_block = """          // Explicit unverified submission (e.g., opaque response from Google Form / no-cors)
          setStatus('submitted_unverified');
          setStatusInfo({
            title: 'Đơn Đăng Ký Đã Được Tiếp Nhận (Chờ Duyệt)!',
            message: response.message || 'Biểu mẫu đã được chuyển tới hệ thống. Do số lượng chỗ ngồi có hạn, vé mời chỉ được coi là hợp lệ sau khi bạn nhận được Email xác nhận chính thức từ Ban Tổ Chức GYC - Câu lạc bộ thế hệ trẻ AEP.'
          });"""

    content = content.replace(old_success_block, new_success_block)
    content = content.replace(old_unverified_block, new_unverified_block)

    # 4. Update submit button text mapping
    old_btn = """                text={
                  status === 'success'
                    ? 'Đã Đăng Ký Thành Công'
                    : status === 'submitted_unverified'
                    ? 'Đã Gửi Đăng Ký (Chờ Duyệt)'
                    : 'Hoàn Tất Đăng Ký Tham Dự'
                }"""

    new_btn = """                text={
                  status === 'success'
                    ? 'Đã Tiếp Nhận Đơn Đăng Ký'
                    : status === 'submitted_unverified'
                    ? 'Đã Gửi Đơn Đăng Ký (Chờ Duyệt)'
                    : 'Hoàn Tất Đăng Ký Tham Dự'
                }"""

    content = content.replace(old_btn, new_btn)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Updated RegistrationForm.jsx successfully.")

if __name__ == "__main__":
    update()
