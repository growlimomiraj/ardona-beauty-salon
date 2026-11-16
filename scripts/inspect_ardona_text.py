from bs4 import BeautifulSoup
import re

with open('ardona.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print("=== ALL TEXT BLOCKS ===")
for p in soup.find_all(['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
    t = p.get_text(strip=True)
    if len(t) > 20 and not t.startswith('{') and not t.startswith('function'):
        print(f"[{p.name}]: {t}")

# Look for hours, address, phone
print("\n=== CONTACT & HOURS SEARCH ===")
text_full = soup.get_text(separator='\n')
for line in text_full.split('\n'):
    line = line.strip()
    if any(k in line.lower() for k in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'am', 'pm', 'hour', 'street', 'ave', 'road', 'blvd', 'lic', 'long island', 'new york', 'ny', '718', 'phone', 'call', 'email']):
        print("MATCH:", line)
