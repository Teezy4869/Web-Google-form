# scratch/verify_phase7.py
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

def verify():
    errors = []
    passes = []

    # 1. RegisterPage.jsx
    with open("src/pages/RegisterPage.jsx", "r", encoding="utf-8") as f:
        reg_page = f.read()

    expected_intro = 'Bạn vui lòng điền đầy đủ các thông tin dưới đây để đăng ký vé Standard tham dự Vòng Chung kết cuộc thi King & Queen 2026 - Gala Night D-DAY 2026: "SOLFERA".'
    if expected_intro in reg_page:
        passes.append("RegisterPage.jsx: Contains official introduction text.")
    else:
        errors.append("RegisterPage.jsx: Missing official introduction text.")

    if "Mỗi lượt đăng ký sẽ tương ứng với 01 vé." in reg_page:
        passes.append("RegisterPage.jsx: Contains Rule 1 of notice (01 ticket per registration).")
    else:
        errors.append("RegisterPage.jsx: Missing Rule 1 of notice.")

    if "Vì số lượng khán giả được giới hạn nên những đơn đăng ký có Email xác nhận từ Ban Tổ chức GYC - Câu lạc bộ thế hệ trẻ AEP mới được coi là đơn đăng ký hợp lệ." in reg_page:
        passes.append("RegisterPage.jsx: Contains Rule 2 of notice (Email confirmation requirement).")
    else:
        errors.append("RegisterPage.jsx: Missing Rule 2 of notice.")

    if "lưu giữ chỗ ngồi của bạn" in reg_page:
        errors.append("RegisterPage.jsx: Still contains misleading text 'lưu giữ chỗ ngồi của bạn'.")

    # 2. RegistrationForm.jsx
    with open("src/components/registration/RegistrationForm.jsx", "r", encoding="utf-8") as f:
        reg_form = f.read()

    if expected_intro in reg_form:
        passes.append("RegistrationForm.jsx: Section 1 contains official introduction.")
    else:
        errors.append("RegistrationForm.jsx: Section 1 missing official introduction.")

    if "Dữ liệu đăng ký được bảo mật bởi Ban Tổ Chức GYC - Câu lạc bộ Thế hệ trẻ AEP." in reg_form:
        passes.append("RegistrationForm.jsx: Security badge updated to GYC.")
    else:
        errors.append("RegistrationForm.jsx: Security badge not updated to GYC.")

    if "Đơn Đăng Ký Đã Được Tiếp Nhận!" in reg_form:
        passes.append("RegistrationForm.jsx: Success status uses honest 'Tiếp Nhận' wording.")
    else:
        errors.append("RegistrationForm.jsx: Success status wording missing.")

    if "Hoàn Tất Đăng Ký Tham Dự" in reg_form:
        passes.append("RegistrationForm.jsx: Submit button label is 'Hoàn Tất Đăng Ký Tham Dự'.")
    else:
        errors.append("RegistrationForm.jsx: Missing 'Hoàn Tất Đăng Ký Tham Dự' label.")

    # 3. SuccessModal.jsx
    with open("src/components/common/SuccessModal.jsx", "r", encoding="utf-8") as f:
        modal = f.read()

    if "Đơn Đăng Ký Đã Được Tiếp Nhận!" in modal:
        passes.append("SuccessModal.jsx: Modal title accurately reflects receipt status.")
    else:
        errors.append("SuccessModal.jsx: Modal title inaccurate.")

    if "Đã ghi nhận · Chờ Email xác nhận từ BTC" in modal:
        passes.append("SuccessModal.jsx: Summary status explicitly shows pending BTC email.")
    else:
        errors.append("SuccessModal.jsx: Summary status missing pending BTC email notice.")

    if "Vì số lượng khán giả được giới hạn nên những đơn đăng ký có Email xác nhận từ Ban Tổ chức GYC - Câu lạc bộ thế hệ trẻ AEP mới được coi là đơn đăng ký hợp lệ." in modal:
        passes.append("SuccessModal.jsx: Notice callout inside modal reinforces BTC email rule.")
    else:
        errors.append("SuccessModal.jsx: Missing notice callout inside modal.")

    if "đã được hệ thống xác nhận chính thức" in modal:
        errors.append("SuccessModal.jsx: Still claims ticket confirmed before BTC email!")

    # 4. registrationConfig.js
    with open("src/data/registrationConfig.js", "r", encoding="utf-8") as f:
        config = f.read()

    if "Ví dụ: 11234567" in config:
        passes.append("registrationConfig.js: Student ID placeholder updated to NEU format.")
    else:
        errors.append("registrationConfig.js: Student ID placeholder not updated.")

    if "POHE 68A hoặc Viện ĐTTT, CLC & POHE" in config:
        passes.append("registrationConfig.js: Class placeholder updated to POHE format.")
    else:
        errors.append("registrationConfig.js: Class placeholder not updated.")

    if "Gala Night D-DAY 2026: “SOLFERA”" in config:
        passes.append("registrationConfig.js: Consent text updated with full event title.")
    else:
        errors.append("registrationConfig.js: Consent text not updated.")

    # 5. SubmitButton.jsx
    with open("src/components/form/SubmitButton.jsx", "r", encoding="utf-8") as f:
        btn = f.read()

    if "Hoàn Tất Đăng Ký Tham Dự" in btn:
        passes.append("SubmitButton.jsx: Default button label is 'Hoàn Tất Đăng Ký Tham Dự'.")
    else:
        errors.append("SubmitButton.jsx: Missing 'Hoàn Tất Đăng Ký Tham Dự'.")

    # 6. index.css
    with open("src/styles/index.css", "r", encoding="utf-8") as f:
        css = f.read()

    if ".registration-notice-banner" in css:
        passes.append("index.css: Contains .registration-notice-banner.")
    else:
        errors.append("index.css: Missing .registration-notice-banner.")

    if "min-height: 48px;" in css:
        passes.append("index.css: .submit-btn-luxury enforces min-height: 48px touch target.")
    else:
        errors.append("index.css: Missing min-height: 48px on submit button.")

    if "word-break: break-word;" in css:
        passes.append("index.css: Word-break protection present on submit button.")
    else:
        errors.append("index.css: Missing word-break protection.")

    # Print summary
    print(f"=== PHASE 7 VERIFICATION RESULTS ===")
    print(f"Total passes: {len(passes)}")
    print(f"Total errors: {len(errors)}")
    print("\n--- PASSES ---")
    for p in passes:
        print(f"  [PASS] {p}")

    if errors:
        print("\n--- ERRORS ---")
        for e in errors:
            print(f"  [FAIL] {e}")
        sys.exit(1)
    else:
        print("\nALL PHASE 7 VERIFICATION CHECKS PASSED PERFECTLY!")

if __name__ == "__main__":
    verify()
