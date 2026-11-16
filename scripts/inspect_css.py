import re

with open('onesalon_style.css', 'r', encoding='utf-8', errors='ignore') as f:
    css = f.read()

print("CSS length:", len(css))

# Fonts
fonts = re.findall(r'font-family:[^;]+;', css)
print("Unique font-families:", set(f.strip() for f in fonts))

# Colors
colors = re.findall(r'#(?:[0-9a-fA-F]{3}){1,2}\b', css)
print("Most frequent hex colors:")
from collections import Counter
print(Counter(c.lower() for c in colors).most_common(15))

# Check key classes
for target in ['.section-header', '.section-banner', '.btn', '.service', '.accordion', 'h1', 'h2', 'h3', 'nav', '.card']:
    matches = re.findall(rf'({re.escape(target)}[^{{]*\{{[^}}]+\}})', css)
    if matches:
        print(f"\n--- Sample rule for {target} ---")
        print(matches[0][:300])
