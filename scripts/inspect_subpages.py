from bs4 import BeautifulSoup

for page in ['onesalon_about.html', 'onesalon_services.html', 'onesalon_contact.html']:
    with open(page, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    print(f"\n==================== PAGE: {page} ====================")
    print("Title:", soup.title.string if soup.title else '')
    main = soup.find('main')
    if main:
        for s in main.find_all('section'):
            print("  Section:", s.get('class'), "Heading:", [h.get_text(strip=True) for h in s.find_all(['h1', 'h2', 'h3'])[:3]])
