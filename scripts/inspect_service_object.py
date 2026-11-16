import json
import re

with open('wix_booking_script.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's search for "services": or "items"
# Let's find index of "Cut & Style"
idx = text.find('Cut & Style')
print("Index of Cut & Style:", idx)
print("Context around Cut & Style:")
print(text[max(0, idx-200):min(len(text), idx+600)])

# Let's find where service names appear
for sname in ["Women wash & cut", "Color Gloss", "Brazilian Blowout", "keratin treatment", "Milbon treatment"]:
    pos = text.find(sname)
    if pos != -1:
        print(f"\n--- Context for '{sname}' (at {pos}) ---")
        print(text[max(0, pos-200):min(len(text), pos+600)])
        break
