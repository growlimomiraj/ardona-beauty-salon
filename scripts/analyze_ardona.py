from bs4 import BeautifulSoup
import re
import json

with open('ardona.html', 'r', encoding='utf-8') as f:
    ardona_html = f.read()

soup_ardona = BeautifulSoup(ardona_html, 'html.parser')

print("=== ARDONA TITLE ===")
print(soup_ardona.title.string if soup_ardona.title else '')

print("\n=== ARDONA META DESCRIPTION ===")
meta_desc = soup_ardona.find('meta', attrs={'name': 'description'}) or soup_ardona.find('meta', attrs={'property': 'og:description'})
if meta_desc:
    print(meta_desc.get('content'))

print("\n=== ARDONA TEXT BLOCKS (headings and paragraphs) ===")
for tag in ['h1', 'h2', 'h3', 'h4', 'p']:
    elements = soup_ardona.find_all(tag)
    print(f"\nTag <{tag}> ({len(elements)} found):")
    for el in elements[:10]:
        text = el.get_text(strip=True)
        if text:
            print(f"  - {text[:120]}")

print("\n=== ARDONA IMAGES ===")
images = []
for img in soup_ardona.find_all('img'):
    src = img.get('src') or img.get('data-src') or ''
    alt = img.get('alt', '')
    if 'wixstatic.com' in src:
        images.append((src, alt))
print(f"Total wix images found: {len(images)}")
for src, alt in images[:15]:
    print(f"  {alt} -> {src}")

print("\n=== ARDONA LINKS ===")
for a in soup_ardona.find_all('a'):
    href = a.get('href', '')
    text = a.get_text(strip=True)
    if href and not href.startswith('javascript:'):
        print(f"  [{text}] -> {href}")
