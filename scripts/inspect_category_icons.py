from bs4 import BeautifulSoup

with open('onesalon.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

items = soup.find_all('div', class_='item')
print(f"Total categories: {len(items)}")
for i, item in enumerate(items):
    h3 = item.find('h3')
    img = h3.find('img') if h3 else None
    title = h3.get_text(strip=True) if h3 else 'No title'
    src = img.get('src') if img else 'No img'
    print(f"{i+1}. {title} -> {src}")
