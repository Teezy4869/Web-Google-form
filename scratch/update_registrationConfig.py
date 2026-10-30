# scratch/update_registrationConfig.py
import sys

def update():
    file_path = "src/data/registrationConfig.js"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update studentId placeholder
    content = content.replace(
        'placeholder: "Ví dụ: B23DCCN001"',
        'placeholder: "Ví dụ: 11234567"'
    )

    # 2. Update className placeholder
    content = content.replace(
        'placeholder: "Ví dụ: D23CQCN01-B hoặc Tên tổ chức/CLB"',
        'placeholder: "Ví dụ: POHE 68A hoặc Viện ĐTTT, CLC & POHE"'
    )

    # 3. Update consent label
    content = content.replace(
        'label: "Tôi đồng ý cho phép Ban Tổ Chức sử dụng thông tin trên cho mục đích tổ chức sự kiện GALA NIGHT 2026."',
        'label: "Tôi đồng ý cho phép Ban Tổ Chức sử dụng thông tin trên cho mục đích tổ chức sự kiện Gala Night D-DAY 2026: “SOLFERA”."'
    )

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Updated registrationConfig.js successfully.")

if __name__ == "__main__":
    update()
