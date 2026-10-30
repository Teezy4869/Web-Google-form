# scratch/update_RegisterPage_phase7.py
import sys

def update():
    file_path = "src/pages/RegisterPage.jsx"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Import AlertCircle from lucide-react if not present
    if "AlertCircle," not in content:
        content = content.replace(
            "import {\n  ArrowLeft,",
            "import {\n  ArrowLeft,\n  AlertCircle,"
        )

    # Update section-tag and section-desc in RegisterPage
    old_header = """          <span className="section-tag">
            <Ticket size={14} className="text-gold" />
            <span>Phiếu Đăng Ký Tham Dự</span>
          </span>
          <h1 className="section-title font-display">
            Đăng Ký Tham Dự <span className="text-gradient">{GALA_EVENT.name}</span>
          </h1>
          <p className="section-desc">
            Đại sự kiện nghệ thuật tri ân, vinh danh và kết nối thế hệ {CLUB_INFO.fullName}. Vui lòng hoàn tất thông tin bên dưới để Ban Tổ Chức xuất vé mời điện tử và giữ chỗ ngồi đẹp nhất.
          </p>"""

    new_header = """          <span className="section-tag">
            <Ticket size={14} className="text-gold" />
            <span>Phiếu Đăng Ký Vé Standard</span>
          </span>
          <h1 className="section-title font-display">
            Đăng Ký Tham Dự <span className="text-gradient">{GALA_EVENT.name}</span>
          </h1>
          <p className="section-desc">
            Bạn vui lòng điền đầy đủ các thông tin dưới đây để đăng ký vé Standard tham dự Vòng Chung kết cuộc thi King & Queen 2026 - Gala Night D-DAY 2026: "SOLFERA".
          </p>"""

    if old_header in content:
        content = content.replace(old_header, new_header)
    else:
        # Fallback replacement for section-desc
        content = content.replace(
            '<span>Phiếu Đăng Ký Tham Dự</span>',
            '<span>Phiếu Đăng Ký Vé Standard</span>'
        )
        content = content.replace(
            'Đại sự kiện nghệ thuật tri ân, vinh danh và kết nối thế hệ {CLUB_INFO.fullName}. Vui lòng hoàn tất thông tin bên dưới để Ban Tổ Chức xuất vé mời điện tử và giữ chỗ ngồi đẹp nhất.',
            'Bạn vui lòng điền đầy đủ các thông tin dưới đây để đăng ký vé Standard tham dự Vòng Chung kết cuộc thi King & Queen 2026 - Gala Night D-DAY 2026: "SOLFERA".'
        )

    # Replace section 3 (Registration instructions) with the clean official notice banner
    old_instructions = """        {/* 3. Registration Instructions */}
        <div
          className="glass-card"
          style={{
            padding: '1.5rem 1.85rem',
            marginBottom: '2.5rem',
            background: 'linear-gradient(135deg, rgba(198, 65, 122, 0.08) 0%, rgba(26, 8, 12, 0.85) 100%)',
            borderLeft: '4px solid var(--champagne)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
            <Info size={22} className="text-gold" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
            <div>
              <h2 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.35rem', fontWeight: 600 }}>
                Quy Trình Nhận Vé Mời Điện Tử (E-Ticket)
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <li>• <strong>Bước 1:</strong> Điền đầy đủ và kiểm tra thông tin liên hệ trong biểu mẫu bên dưới.</li>
                <li>• <strong>Bước 2:</strong> Bấm xác nhận đăng ký để hệ thống lưu giữ chỗ ngồi của bạn.</li>
                <li>• <strong>Bước 3:</strong> Kiểm tra hộp thư Email để nhận vé điện tử kèm mã QR check-in tại cửa hội trường.</li>
              </ul>
            </div>
          </div>
        </div>"""

    new_instructions = """        {/* 3. Official Registration Notice */}
        <div
          className="registration-notice-banner"
          role="region"
          aria-label="Lưu ý đăng ký vé"
          style={{ marginBottom: '2.5rem' }}
        >
          <div className="notice-banner-header">
            <AlertCircle size={22} className="notice-banner-icon" aria-hidden="true" />
            <h2 className="notice-banner-title font-display">Lưu ý:</h2>
          </div>
          <ul className="notice-banner-list">
            <li>Mỗi lượt đăng ký sẽ tương ứng với 01 vé.</li>
            <li>
              Vì số lượng khán giả được giới hạn nên những đơn đăng ký có Email xác nhận từ Ban Tổ chức GYC - Câu lạc bộ thế hệ trẻ AEP mới được coi là đơn đăng ký hợp lệ.
            </li>
          </ul>
        </div>"""

    if old_instructions in content:
        content = content.replace(old_instructions, new_instructions)
    else:
        print("Warning: old_instructions block not found exactly in RegisterPage.jsx")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Updated RegisterPage.jsx successfully.")

if __name__ == "__main__":
    update()
