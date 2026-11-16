from bs4 import BeautifulSoup

with open('onesalon.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

body = soup.find('body')
if body:
    # Print direct children of body
    print("=== DIRECT BODY CHILDREN ===")
    for child in body.children:
        if child.name:
            print(f"<{child.name} class='{child.get('class')}' id='{child.get('id')}'>")
            for sub in child.find_all(['section', 'div'], recursive=False):
                print(f"   <{sub.name} class='{sub.get('class')}' id='{sub.get('id')}'>")
