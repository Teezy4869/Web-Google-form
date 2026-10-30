import sys, os

sys.stdout.reconfigure(encoding='utf-8')

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx', '.html')):
            path = os.path.join(root, f)
            with open(path, encoding='utf-8') as file:
                content = file.read()
                for kw in ['activities', '#activities', 'activity-list', 'hoạt động']:
                    if kw in content.lower():
                        print(f"{path}: contains '{kw}'")

