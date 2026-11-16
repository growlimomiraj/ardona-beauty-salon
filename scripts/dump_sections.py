from bs4 import BeautifulSoup

with open('onesalon.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

sections = soup.find_all('section')
for i, s in enumerate(sections):
    cls = s.get('class', [])
    print(f"\n=================== SECTION {i}: {cls} ===================")
    # print the first 600 characters of its outer html
    print(str(s)[:600])
