import sys, os

sys.stdout.reconfigure(encoding='utf-8')

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx', '.json')):
            path = os.path.join(root, f)
            with open(path, encoding='utf-8') as file:
                content = file.read()
                for field in ['tagline', 'description', 'fullName', 'mission', 'pillars']:
                    if f'CLUB_INFO.{field}' in content:
                        print(f"{path}: uses CLUB_INFO.{field}")

