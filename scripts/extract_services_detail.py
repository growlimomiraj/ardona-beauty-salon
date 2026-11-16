import re
import json

with open('wix_booking_script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's find categories and services
# Search for JSON blocks
# We can search for categories: {"id":"...","name":"...","sortOrder":...}
categories = re.findall(r'\{"id":"([0-9a-f\-]+)","name":"([^"]+)","sortOrder":(\d+)\}', content)
print("Categories found:", len(categories))
for c in categories:
    print("Category:", c)

# Search for services
# Let's find patterns where service objects are defined
# Wix services typically have id, name, description, categoryId, payment details, form, urls, etc.
# Let's search for "categoryId"
service_matches = re.findall(r'(\{"id":"[0-9a-f\-]+","name":"[^"]+",[^\}]*?"categoryId":"[0-9a-f\-]+"[^\}]*?\})', content)
print("Simple service regex matches:", len(service_matches))

# Let's find where services list is located in the JS object
# Often it's JSON.parse('...') or assign to a variable
json_blocks = re.findall(r'JSON\.parse\("([^"]+)"\)', content)
print("JSON.parse matches:", len(json_blocks))

# Let's search for "services": or "items":
for m in re.finditer(r'"services"\s*:\s*(\[[^\]]+\])', content):
    print("Found services array! Length:", len(m.group(1)))
    try:
        data = json.loads(m.group(1))
        print("Parsed services count:", len(data))
    except Exception as e:
        print("Json parse error:", e)

# If it's part of a bigger JSON:
# Find all occurrences of "urls":{"bookingPage":"/booking-calendar/..."}
booking_urls = re.findall(r'\{"bookingPage":"(/booking-calendar/[^"]+)"\}', content)
print("Booking URLs found:", len(set(booking_urls)))
for u in sorted(set(booking_urls)):
    print(u)
