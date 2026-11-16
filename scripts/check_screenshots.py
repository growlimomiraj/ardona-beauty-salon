import os

print("Files in public/screenshots:")
for f in os.listdir("public/screenshots"):
    p = os.path.join("public/screenshots", f)
    print(f, os.path.getsize(p))
