from bs4 import BeautifulSoup

with open('onesalon.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

services_section = soup.find('section', class_='section-services')
if services_section:
    items = services_section.find_all('div', class_='item')
    print(f"Total service category items: {len(items)}")
    for item in items[:2]:
        print("\n--- ITEM HTML SAMPLE ---")
        print(item.prettify())
