from bs4 import BeautifulSoup
import re

with open('ardona.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# Check header
header = soup.find('header')
if header:
    print("Header html:")
    print(header.prettify())

# Also search for 'logo' or 'brand' or top navigation
for el in soup.find_all(attrs={'data-testid': re.compile(r'logo|header|brand', re.I)}):
    print("Found testid:", el.get('data-testid'), el.get_text(strip=True))

for a in soup.find_all('a'):
    if 'home' in a.get('href', '').lower() or a.get('href') == 'https://www.ardonabeautysalon.com':
        print("Home link:", a.prettify()[:300])
