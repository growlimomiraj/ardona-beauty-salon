import re

with open('onesalon.html', 'r', encoding='utf-8') as f:
    html = f.read()

for m in re.finditer(r'<div class="virtualconsultation".*?</div>', html, re.DOTALL):
    print("HTML MATCH:")
    print(m.group(0))

for fname in ['onesalon_style.css', 'onesalon_media.css', 'onesalon.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    styles = re.findall(r'(\.virtualconsultbutton[^{]*\{[^}]+\})', content)
    if styles:
        print(f"STYLE MATCH in {fname}:", styles)
