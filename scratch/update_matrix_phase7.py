# scratch/update_matrix_phase7.py
import sys

def update():
    file_path = "docs/revision/requirements-matrix.md"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Update REQ-15 row status from TODO to DONE
    content = content.replace(
        "| **REQ-15** | Page 8 | `RegisterPage.jsx`<br>`RegistrationForm.jsx`<br>`registrationConfig.js` | Form header has generic subtitle; instructions show 3-step E-ticket process. No top notice banner. | **Preamble**: \"Bạn vui lòng điền đầy đủ các thông tin dưới đây để đăng ký vé Standard tham dự Vòng Chung kết cuộc thi King & Queen 2026 - Gala Night D-DAY 2026: \\\"SOLFERA\\\".\"<br><br>**Lưu ý banner (Top of Form)**:<br>- Mỗi lượt đăng ký sẽ tương ứng với 01 vé.<br>- Vì số lượng khán giả được giới hạn nên những đơn đăng ký có Email xác nhận từ Ban Tổ chức GYC - Câu lạc bộ thế hệ trẻ AEP mới được coi là đơn đăng ký hợp lệ. | **UPDATE** | `src/pages/RegisterPage.jsx`<br>`src/components/registration/RegistrationForm.jsx`<br>`src/data/registrationConfig.js` | **P0** | Register page header displays exact preamble for Standard ticket; top of the form renders prominent gold/wine alert banner containing the exact 2 notice bullet points. | **TODO** |",
        "| **REQ-15** | Page 8 | `RegisterPage.jsx`<br>`RegistrationForm.jsx`<br>`registrationConfig.js` | Form header has generic subtitle; instructions show 3-step E-ticket process. No top notice banner. | **Preamble**: \"Bạn vui lòng điền đầy đủ các thông tin dưới đây để đăng ký vé Standard tham dự Vòng Chung kết cuộc thi King & Queen 2026 - Gala Night D-DAY 2026: \\\"SOLFERA\\\".\"<br><br>**Lưu ý banner (Top of Form)**:<br>- Mỗi lượt đăng ký sẽ tương ứng với 01 vé.<br>- Vì số lượng khán giả được giới hạn nên những đơn đăng ký có Email xác nhận từ Ban Tổ chức GYC - Câu lạc bộ thế hệ trẻ AEP mới được coi là đơn đăng ký hợp lệ. | **UPDATE** | `src/pages/RegisterPage.jsx`<br>`src/components/registration/RegistrationForm.jsx`<br>`src/data/registrationConfig.js` | **P0** | Register page header and form section 1 display exact preamble for Standard ticket; prominent gold/wine notice banner renders official 2 bullet points. | **DONE** |"
    )

    # Update Summary by Status
    old_summary = """- **TODO (Pending Phase 7)**:
  - REQ-15 (Ticket registration preamble and top notice banner)
- **BLOCKED (Awaiting Customer Google Form Link)**:
  - REQ-16"""

    new_summary = """  - **REQ-15**: Ticket registration preamble for Standard ticket and official top notice banner implemented and verified
- **BLOCKED (Awaiting Customer Google Form Link & Field Entry IDs)**:
  - **REQ-16**: Official Google Form field synchronization and entry ID mapping. Baseline form schema preserved with robust client-side validation; submission in safe UNCONFIGURED mode."""

    content = content.replace(old_summary, new_summary)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Updated requirements-matrix.md successfully.")

if __name__ == "__main__":
    update()
