import sys, os

sys.stdout.reconfigure(encoding='utf-8')
patterns = ['năm hoạt động', 'thành viên &', 'sự kiện đã tổ chức', 'doanh nghiệp đồng hành']

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx', '.json', '.html')):
            path = os.path.join(root, f)
            with open(path, encoding='utf-8') as file:
                content = file.read().lower()
                for pat in patterns:
                    if pat in content:
                        print(f'Found "{pat}" in {path}')
