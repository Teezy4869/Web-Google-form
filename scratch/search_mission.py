import sys, os

sys.stdout.reconfigure(encoding='utf-8')

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx', '.json', '.html')):
            path = os.path.join(root, f)
            with open(path, encoding='utf-8') as file:
                content = file.read()
                if 'mission' in content.lower():
                    for line in content.splitlines():
                        if 'mission' in line.lower():
                            print(f"{path}: {line.strip()[:100]}")

