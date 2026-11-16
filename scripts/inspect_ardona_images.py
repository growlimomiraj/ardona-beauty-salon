from bs4 import BeautifulSoup
import re

for filename in ['ardona.html', 'ardona_book.html']:
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    print(f"\n=== IMAGES IN {filename} ===")
    for img in soup.find_all('img'):
        src = img.get('src', '')
        alt = img.get('alt', '')
        if 'wixstatic.com' in src:
            # Wix allows getting high-res by modifying /w_...,h_.../ or getting the original media URL!
            # e.g. https://static.wixstatic.com/media/<media_id>~mv2.jpg
            print(f"Alt: '{alt}' -> {src}")
    
    # Also find background images in styles
    bg_images = re.findall(r'url\(([\'"]?https://static\.wixstatic\.com/media/[^\'")]+[\'"]?)\)', html)
    print(f"Background images: {len(bg_images)}")
    for bg in set(bg_images):
        print("BG:", bg)
