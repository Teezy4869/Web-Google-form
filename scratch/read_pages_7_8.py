import sys

with open('docs/references/extracted_pdf_text.txt', encoding='utf-8') as f:
    lines = [line.strip() for line in f if line.strip()]

full = ' '.join(lines)

for page in [7, 8]:
    marker = f'=== PAGE {page} ==='
    next_marker = f'=== PAGE {page+1} ===' if page < 8 else 'EOF'
    start = full.find(marker)
    end = full.find(next_marker) if full.find(next_marker) != -1 else len(full)
    page_text = full[start:end]
    with open(f'scratch/page_{page}.txt', 'w', encoding='utf-8') as out:
        out.write(page_text)
    print(f"Page {page} written to scratch/page_{page}.txt (len={len(page_text)})")

