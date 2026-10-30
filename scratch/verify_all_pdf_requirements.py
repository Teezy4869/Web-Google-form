# scratch/verify_all_pdf_requirements.py
import sys

sys.stdout.reconfigure(encoding='utf-8')

def test():
    results = {}
    
    # Read files
    with open("src/data/galaData.js", "r", encoding="utf-8") as f:
        gala_data = f.read()
    with open("src/data/clubData.js", "r", encoding="utf-8") as f:
        club_data = f.read()
    with open("src/pages/HomePage.jsx", "r", encoding="utf-8") as f:
        home_page = f.read()
    with open("src/components/home/VideoHero.jsx", "r", encoding="utf-8") as f:
        hero = f.read()
    with open("src/components/home/GalaSection.jsx", "r", encoding="utf-8") as f:
        gala_section = f.read()
    with open("src/components/home/AboutSection.jsx", "r", encoding="utf-8") as f:
        about_section = f.read()
    with open("src/components/common/Navbar.jsx", "r", encoding="utf-8") as f:
        navbar = f.read()
    with open("src/components/common/Footer.jsx", "r", encoding="utf-8") as f:
        footer = f.read()
    with open("src/pages/RegisterPage.jsx", "r", encoding="utf-8") as f:
        register_page = f.read()
    with open("src/components/registration/RegistrationForm.jsx", "r", encoding="utf-8") as f:
        reg_form = f.read()
    with open("src/data/registrationConfig.js", "r", encoding="utf-8") as f:
        reg_config = f.read()

    # PAGE 1 CHECKS
    results["P1_event_title"] = 'Gala Night - Vòng Chung kết cuộc thi King & Queen D-DAY 2026' in gala_data
    results["P1_event_intro_aep68"] = 'AEP K68' in gala_data and 'Đại học Kinh tế Quốc dân' in gala_data
    results["P1_event_schedule_date"] = '18:30 Thứ Năm, ngày 05/11/2026' in gala_data
    results["P1_event_checkin"] = '18:00 - 18:30 Thứ Năm, ngày 05/11/2026' in gala_data
    results["P1_venue_neu"] = 'Hội trường A2, Tòa A2, Đại học Kinh tế Quốc dân, 207 Giải Phóng, Đồng Tâm, Hà Nội' in gala_data
    
    # Check section order in HomePage: GalaSection appears before AboutSection
    gala_idx = home_page.find("<GalaSection")
    about_idx = home_page.find("<AboutSection")
    results["P1_section_order"] = (gala_idx != -1 and about_idx != -1 and gala_idx < about_idx)

    # PAGE 2 CHECKS
    results["P2_organizer"] = 'GYC - Câu lạc bộ Thế hệ trẻ AEP' in gala_data
    results["P2_series_title"] = 'CHUỖI SỰ KIỆN CHÀO SINH VIÊN' in gala_data and 'D-DAY 2026: “SOLFERA”' in gala_data
    results["P2_no_redundant_label"] = 'Chủ đề chính thức: SOLFERA' not in gala_section

    # PAGE 3 CHECKS
    results["P3_theme_statement"] = 'Song of Triumph, Spark of Wisdom' in gala_data
    results["P3_paragraph_1"] = 'Người trẻ mang trong mình ngọn lửa khát khao không bao giờ tắt' in gala_data
    results["P3_paragraph_2"] = 'Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên' in gala_data
    results["P3_key_visual"] = '/assets/images/solfera-poster.webp' in gala_data and 'media.poster' in gala_section

    # PAGE 4 CHECKS
    results["P4_teambuilding"] = 'HOẠT ĐỘNG TEAM BUILDING' in gala_data and '18/10/2026' in gala_data
    results["P4_king_queen"] = 'CUỘC THI KING & QUEEN 2026' in gala_data and '16/10/2026 - 05/11/2026' in gala_data
    results["P4_gala_night"] = 'GALA NIGHT' in gala_data and '05/11/2026' in gala_data
    results["P4_stat_14_plus"] = '14+' in club_data and 'Năm hoạt động & Phát triển' in club_data
    results["P4_stat_600_plus"] = '600+' in club_data and 'Thành viên & Cựu thành viên' in club_data
    results["P4_stat_65_plus"] = '65+' in club_data and 'Sự kiện đã tổ chức' in club_data
    results["P4_stat_60_plus"] = '60+' in club_data and 'Đối tác & doanh nghiệp đồng hành' in club_data

    # PAGE 5 CHECKS
    results["P5_about_slogan"] = 'Light up your way!' in club_data
    results["P5_about_desc"] = 'tổ chức sinh viên đi đầu Viện Đào tạo Tiên tiến' in club_data
    results["P5_mission_removed"] = 'Sứ Mệnh Cốt Lõi' not in about_section and 'mission-spotlight' not in about_section

    # PAGE 6 CHECKS
    results["P6_val_ton_trong"] = 'Tôn trọng là nền tảng để mỗi thành viên GYC được lắng nghe' in club_data
    results["P6_val_chu_dong"] = 'Chủ động là tinh thần sẵn sàng học hỏi' in club_data
    results["P6_val_trach_nhiem"] = 'Trách nhiệm không chỉ là hoàn thành nhiệm vụ' in club_data
    results["P6_val_dong_hanh"] = 'Đồng hành là giá trị làm nên bản sắc “Gia đình – Yêu thương – Chia sẻ”' in club_data

    # PAGE 7 CHECKS
    results["P7_activity_fields_removed"] = 'LĨNH VỰC HOẠT ĐỘNG' not in about_section and 'activity-fields' not in about_section
    results["P7_hotline"] = '098 325 9655' in gala_data and 'hotline' in footer
    results["P7_email"] = 'dday26.gyc@gmail.com' in gala_data and 'email' in footer
    results["P7_fanpage"] = 'GYC - Câu lạc bộ Thế hệ trẻ AEP' in gala_data and 'fanpageName' in footer

    # PAGE 8 CHECKS
    results["P8_footer_desc"] = 'Chuỗi Sự kiện Chào sinh viên AEP dành riêng cho tân sinh viên Viện Đào tạo Tiên tiến, Chất lượng cao & POHE' in club_data
    results["P8_zalo_removed"] = 'zalo' not in footer.lower()
    results["P8_form_intro"] = 'Bạn vui lòng điền đầy đủ các thông tin dưới đây để đăng ký vé Standard' in register_page
    results["P8_notice_rule1"] = 'Mỗi lượt đăng ký sẽ tương ứng với 01 vé.' in register_page
    results["P8_notice_rule2"] = 'những đơn đăng ký có Email xác nhận từ Ban Tổ chức GYC - Câu lạc bộ thế hệ trẻ AEP mới được coi là đơn đăng ký hợp lệ.' in register_page

    print("=== VERIFY ALL CUSTOMER PDF REQUIREMENTS (PAGES 1 - 8) ===")
    all_pass = True
    for key, val in results.items():
        status = "PASS" if val else "FAIL"
        if not val: all_pass = False
        print(f"[{status}] {key}")

    print("\nSummary:")
    total = len(results)
    passed = sum(1 for v in results.values() if v)
    print(f"Passed: {passed}/{total}")
    if all_pass:
        print("PERFECT: 100% of PDF requirements verified in codebase!")
    else:
        print("WARNING: Some checks failed!")
        sys.exit(1)

if __name__ == "__main__":
    test()
