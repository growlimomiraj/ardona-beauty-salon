import os

user_img = r"C:\Users\GrowLimo - Umair\.gemini\antigravity\brain\aa951eaa-029e-41d9-89fb-ed10a09de9ea\.user_uploaded\media_1794853946463_5bf76008.jpg"
my_img = r"public\screenshots\current_desktop_full.png"

print("User image size:", os.path.getsize(user_img))
print("Current screenshot size:", os.path.getsize(my_img))

# Let's inspect image dimensions using PIL or pure python
try:
    from PIL import Image
    with Image.open(user_img) as im:
        print("User image dimensions:", im.size)
    with Image.open(my_img) as im:
        print("My image dimensions:", im.size)
except Exception as e:
    print("PIL not available:", e)
