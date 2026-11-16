from bs4 import BeautifulSoup

with open('onesalon.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

footer = soup.find('footer')
if footer:
    next_siblings = list(footer.find_next_siblings())
    print(f"Elements after footer: {len(next_siblings)}")
    for el in next_siblings:
        print(el.name, el.get('class'), el.get('id'))
        print(str(el)[:300])

# Also check for mobile bottom bar or call buttons
for el in soup.find_all(class_=lambda c: c and any(x in ' '.join(c).lower() for x in ['sticky', 'fixed', 'call', 'bottom', 'modal', 'popup', 'mobile'])):
    print("Found special element:", el.name, el.get('class'), el.get('id'))
    print(str(el)[:200])
