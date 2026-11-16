with open('onesalon_media.css', 'r', encoding='utf-8', errors='ignore') as f:
    media_css = f.read()

print("Media CSS length:", len(media_css))
print("\n=== BREAKPOINTS AND KEY RULES ===")
import re
breakpoints = re.findall(r'@media[^{]+\{', media_css)
for bp in set(breakpoints):
    print("Breakpoint:", bp.strip())

print("\n=== SAMPLE MEDIA CSS (First 2500 chars) ===")
print(media_css[:2500])
