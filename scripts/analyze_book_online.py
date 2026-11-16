from bs4 import BeautifulSoup
import re
import json

with open('ardona_book.html', 'r', encoding='utf-8') as f:
    book_html = f.read()

soup = BeautifulSoup(book_html, 'html.parser')

print("Title:", soup.title.string if soup.title else '')

# Wix stores data in window.__INITIAL_DATA__ or script tags or DOM
scripts = soup.find_all('script')
print(f"Total scripts: {len(scripts)}")

# Look for json or service names in scripts
service_data = []
for s in scripts:
    content = s.string or ''
    if 'service' in content.lower() and ('price' in content.lower() or 'duration' in content.lower()):
        # Check for JSON objects
        matches = re.findall(r'(\{"[^"]*service[^"]*":.*?\}\})', content)
        if matches:
            print("Found potential JSON service match:", len(matches))

# Also search directly in DOM elements
elements_with_text = []
for el in soup.find_all(['div', 'li', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a']):
    text = el.get_text(strip=True)
    if any(k in text.lower() for k in ['cut', 'color', 'blowout', 'hair', 'treatment', 'highlight', 'keratin', 'balayage', 'facial', 'wax', 'nail', 'mani', 'pedi', 'makeup']):
        # If it's a leaf or near leaf
        if len(el.find_all()) < 3 and len(text) < 150:
            elements_with_text.append((el.name, text, el.get('class'), el.get('href')))

print(f"Candidate service elements in DOM: {len(elements_with_text)}")
for tag, text, cls, href in elements_with_text[:30]:
    print(f"[{tag}] {text} (href: {href})")

# Let's also check for Wix bookings state or data
wix_data = re.findall(r'wix-bookings[^\"]*', book_html)
print("Wix bookings mentions:", set(wix_data[:10]))
