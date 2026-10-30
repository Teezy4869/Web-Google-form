# scratch/audit_gyc_ygc.py
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

GYC_REGEX = re.compile(r"\bGYC\b")
YGC_REGEX = re.compile(r"\bYGC\b")

findings = []

for root, _, files in os.walk("src"):
    for file in files:
        if file.endswith((".js", ".jsx", ".html")):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                for idx, line in enumerate(f, 1):
                    gyc = GYC_REGEX.findall(line)
                    ygc = YGC_REGEX.findall(line)
                    if gyc or ygc:
                        findings.append({
                            "file": path,
                            "line": idx,
                            "gyc": len(gyc),
                            "ygc": len(ygc),
                            "content": line.strip()
                        })

print(f"=== GYC vs YGC AUDIT RESULTS ===")
print(f"Total matching lines: {len(findings)}")
for item in findings:
    label = []
    if item['gyc']: label.append(f"GYC x{item['gyc']}")
    if item['ygc']: label.append(f"YGC x{item['ygc']}")
    print(f"[{', '.join(label)}] {item['file']}:{item['line']}")
    print(f"    {item['content']}")

