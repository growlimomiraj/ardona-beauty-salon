with open('src/styles/onesalon.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
print("Checking key rules in onesalon.css:")
for target in ['.section-header', '.section-banner', '.heading-banner', '.virtualconsultation', '.section-about', '.section-services', '.services-flex', '.item', '.section-reviews', '.section-asked', '.section-footer', '.footer-bottom']:
    found = re.findall(rf'({re.escape(target)}[^{{]*\{{[^}}]+\}})', css)
    print(f"Rule for {target}: {len(found)} occurrences")
    if found:
        print("  Sample:", found[0][:150].replace('\n', ' '))
