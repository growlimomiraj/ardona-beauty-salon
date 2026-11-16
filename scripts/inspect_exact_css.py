with open('onesalon_style.css', 'r', encoding='utf-8', errors='ignore') as f:
    style_css = f.read()

with open('onesalon_media.css', 'r', encoding='utf-8', errors='ignore') as f:
    media_css = f.read()

print("=== ONESALON_STYLE.CSS (First 3000 chars) ===")
print(style_css[:3000])

print("\n=== SEARCHING SPECIFIC SELECTORS ===")
import re
selectors = [
    'section-banner', 'section-header', 'section-about', 'section-services', 
    'services-flex', 'according', 'accordion__content', 'flex-sub-post',
    'prices', 'section-reviews', 'section-asked', 'accordion__title',
    'accordion__content_faq', 'section-footer', 'footer-bottom', 'fixed-bootom',
    'btn', 'appointment'
]

for sel in selectors:
    matches = re.findall(rf'([^{{}}]*\.{sel}[^{{}}]*\{{[^}}]+\}})', style_css)
    if matches:
        print(f"\n--- Rules for .{sel} ---")
        for m in matches[:3]:
            print(m.strip())
