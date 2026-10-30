import sys, os

sys.stdout.reconfigure(encoding='utf-8')
patterns = ['9+', '400+', '75+', '35+', '14+', '600+', '65+', '60+']
found = False

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.js', '.jsx', '.json', '.html', '.css')):
            path = os.path.join(root, f)
            with open(path, encoding='utf-8') as file:
                content = file.read()
                for pat in patterns:
                    if pat in content:
                        print(f'Found "{pat}" in {path}')
                        found = True

if not found:
    print("No pattern occurrences found.")
