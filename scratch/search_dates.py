import sys, os

sys.stdout.reconfigure(encoding='utf-8')
patterns = ['18/10', '16/10', '05/11', '2026']

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx', '.json', '.html')):
            path = os.path.join(root, f)
            with open(path, encoding='utf-8') as file:
                content = file.read()
                for pat in patterns:
                    if pat in content:
                        print(f'Found "{pat}" in {path}')
