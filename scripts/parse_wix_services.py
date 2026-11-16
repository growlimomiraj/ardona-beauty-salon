from bs4 import BeautifulSoup
import re
import json

with open('ardona_book.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

services_data = None
for s in soup.find_all('script'):
    txt = s.string or ''
    if '"Texturizing"' in txt and '"Cut & Style"' in txt:
        print("Found matching script! Length:", len(txt))
        # Let's extract JSON objects from this script
        # Wix often puts state in window.__INITIAL_STATE__ or similar
        services_data = txt
        break

if services_data:
    with open('wix_booking_script.js', 'w', encoding='utf-8') as f:
        f.write(services_data)
    print("Saved wix_booking_script.js")
