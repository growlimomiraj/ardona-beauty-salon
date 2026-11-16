from bs4 import BeautifulSoup
import re
import json

with open('onesalon.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("=== TITLE ===")
print(soup.title.string if soup.title else '')

print("\n=== STYLESHEETS & FONTS ===")
for link in soup.find_all('link', rel='stylesheet'):
    href = link.get('href', '')
    if 'font' in href or 'css' in href:
        print("CSS:", href)

print("\n=== ALL NAVIGATION LINKS ===")
for a in soup.find_all('a'):
    text = a.get_text(strip=True)
    href = a.get('href', '')
    cls = a.get('class', [])
    if text or 'button' in str(cls).lower():
        print(f"[{text}] -> {href} (classes: {cls})")

print("\n=== MAJOR SECTIONS ===")
for el in soup.find_all(['header', 'section', 'footer', 'main', 'nav']):
    el_id = el.get('id', '')
    el_cls = el.get('class', [])
    # print tag, id, class, and first 100 chars of text
    first_text = ' '.join(el.get_text(strip=True).split()[:10])
    print(f"<{el.name} id='{el_id}' class='{el_cls}'> -> {first_text}...")

