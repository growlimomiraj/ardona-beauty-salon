from bs4 import BeautifulSoup
import re
import json

with open('ardona_book.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# Look for service cards/items in DOM
# Wix Bookings usually has service items with class names or data-hook
# Let's search for booking links
booking_links = soup.find_all('a', href=re.compile(r'/booking-calendar/'))
print(f"Total booking-calendar links: {len(booking_links)}")

services = []
for a in booking_links:
    href = a.get('href')
    # find parent card
    card = a
    for _ in range(6):
        if card.parent:
            card = card.parent
        else:
            break
    card_text = card.get_text(separator=' | ', strip=True)
    services.append({'href': href, 'title': a.get_text(strip=True), 'card_text': card_text})

# Deduplicate by href
unique_services = {}
for s in services:
    if s['href'] not in unique_services or len(s['card_text']) > len(unique_services[s['href']]['card_text']):
        unique_services[s['href']] = s

print(f"\nUnique services found via links: {len(unique_services)}")
for href, s in unique_services.items():
    print(f"\n--- {s['title']} ({href}) ---")
    print(s['card_text'])

# Also search Wix bookings JSON in script tags
for s in soup.find_all('script'):
    txt = s.string or ''
    if 'booking-calendar' in txt or 'serviceId' in txt:
        # Let's search for JSON containing service catalog
        print("Found script with booking data! Length:", len(txt))
        matches = re.findall(r'(\{"id":"[^"]+","name":"[^"]+".*?\})', txt)
        print("Regex matches:", len(matches))
        if matches:
            for m in matches[:5]:
                print("Sample:", m[:200])
