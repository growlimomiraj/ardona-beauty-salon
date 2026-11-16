import urllib.request
import re
import json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

def fetch(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read().decode('utf-8', errors='ignore')

print("Fetching One Salon...")
one_html = fetch('https://onesalonnyc.com/')
with open('onesalon.html', 'w', encoding='utf-8') as f:
    f.write(one_html)
print("Saved onesalon.html")

print("Fetching Ardona...")
ardona_html = fetch('https://www.ardonabeautysalon.com/')
with open('ardona.html', 'w', encoding='utf-8') as f:
    f.write(ardona_html)
print("Saved ardona.html")

print("Fetching Ardona Book Online...")
ardona_book_html = fetch('https://www.ardonabeautysalon.com/book-online')
with open('ardona_book.html', 'w', encoding='utf-8') as f:
    f.write(ardona_book_html)
print("Saved ardona_book.html")
