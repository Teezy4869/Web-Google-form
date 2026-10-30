# scratch/audit_stale_content.py
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Directories to search
SEARCH_DIRS = ["src", "index.html"]

# Patterns to flag
STALE_PATTERNS = {
    "Old PTIT reference": re.compile(r"PTIT|Học viện Công nghệ Bưu chính|B23DCCN|D23CQCN", re.IGNORECASE),
    "Đang cập nhật placeholder": re.compile(r"Đang cập nhật|Chưa xác định", re.IGNORECASE),
    "Old Stat 9+": re.compile(r"\b9\+\b"),
    "Old Stat 400+": re.compile(r"\b400\+\b"),
    "Old Stat 75+": re.compile(r"\b75\+\b"),
    "Old Stat 35+": re.compile(r"\b35\+\b"),
    "Old Hotline 0988 123 456": re.compile(r"0988\s*123\s*456"),
    "Old Email dday.ygc.aep@gmail.com": re.compile(r"dday\.ygc\.aep@gmail\.com", re.IGNORECASE),
    "Obsolete Zalo reference": re.compile(r"zalo", re.IGNORECASE),
    "Removed Mission Section": re.compile(r"Sứ Mệnh Cốt Lõi|mission-spotlight", re.IGNORECASE),
    "Removed Activity Fields Section": re.compile(r"LĨNH VỰC HOẠT ĐỘNG|Những Mảng Hoạt Động Kiến Tạo Dấu Ấn|activity-field", re.IGNORECASE),
    "Old GALA NIGHT 2026 without Solfera": re.compile(r"sự kiện GALA NIGHT 2026\.", re.IGNORECASE),
    "Misleading Ticket Confirmation claims": re.compile(r"Vé của bạn đã được xác nhận|đã được hệ thống xác nhận chính thức|lưu giữ chỗ ngồi của bạn", re.IGNORECASE)
}

findings = []

def search_file(filepath):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()

    for line_idx, line in enumerate(lines, 1):
        for pattern_name, regex in STALE_PATTERNS.items():
            matches = regex.findall(line)
            if matches:
                # Filter out intentional helper text like "Số điện thoại có Zalo" if acceptable or flag it
                findings.append({
                    "file": filepath,
                    "line": line_idx,
                    "pattern": pattern_name,
                    "match": matches,
                    "snippet": line.strip()
                })

def main():
    for item in SEARCH_DIRS:
        if os.path.isfile(item):
            search_file(item)
        elif os.path.isdir(item):
            for root, _, files in os.walk(item):
                for file in files:
                    if file.endswith((".js", ".jsx", ".css", ".html", ".json")):
                        search_file(os.path.join(root, file))

    print(f"=== STALE CONTENT AUDIT RESULTS ===")
    print(f"Total findings: {len(findings)}")
    for f in findings:
        print(f"[{f['pattern']}] {f['file']}:{f['line']}")
        print(f"    Snippet: {f['snippet']}")

if __name__ == "__main__":
    main()

