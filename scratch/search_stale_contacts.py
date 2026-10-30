import sys, os

sys.stdout.reconfigure(encoding='utf-8')
patterns = ['0988 123 456', '0988123456', 'dday.ygc.aep@gmail.com', 'contact.ygc.aep@gmail.com', 'zalo', 'Cộng Đồng Zalo']

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx', '.json', '.html', '.css')):
            path = os.path.join(root, f)
            with open(path, encoding='utf-8') as file:
                content = file.read()
                for pat in patterns:
                    if pat.lower() in content.lower():
                        print(f"Found '{pat}' in {path}")

