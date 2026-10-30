# scratch/update_googleForm.py
import sys

def update():
    file_path = "src/services/googleForm.js"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace(
        "consentText: 'Tôi đồng ý cho phép Ban Tổ Chức sử dụng thông tin trên cho mục đích tổ chức sự kiện GALA NIGHT 2026.'",
        "consentText: 'Tôi đồng ý cho phép Ban Tổ Chức sử dụng thông tin trên cho mục đích tổ chức sự kiện Gala Night D-DAY 2026: “SOLFERA”.'"
    )

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Updated googleForm.js successfully.")

if __name__ == "__main__":
    update()
