from bs4 import BeautifulSoup
import json

with open('onesalon.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# Let's inspect each main section and its exact DOM structure
main = soup.find('main')
if main:
    for child in main.find_all('section', recursive=False):
        print(f"\n================ SECTION: {child.get('class')} id={child.get('id')} ================")
        # Print headings
        for h in child.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
            print(f"  {h.name}: {h.get_text(strip=True)}")
        # Print buttons / links
        for a in child.find_all('a'):
            print(f"  Link [{a.get('class')}]: '{a.get_text(strip=True)}' -> {a.get('href')}")

# Header details
header = soup.find('header')
if header:
    print("\n================ HEADER ================")
    print(header.prettify()[:1500])

# Footer details
footer = soup.find('footer')
if footer:
    print("\n================ FOOTER ================")
    print(footer.prettify()[:1500])
