with open('onesalon_style.css', 'r', encoding='utf-8', errors='ignore') as f:
    css = f.read()

print("CSS Total Characters:", len(css))
lines = css.splitlines()
print("Total lines:", len(lines))

# Print first 200 lines
print("\n--- FIRST 100 LINES ---")
print('\n'.join(lines[:100]))

# Print next 100 lines
print("\n--- LINES 101 to 200 ---")
print('\n'.join(lines[100:200]))

# Print next 100 lines
print("\n--- LINES 201 to 300 ---")
print('\n'.join(lines[200:300]))

# Print next 100 lines
print("\n--- LINES 301 to 400 ---")
print('\n'.join(lines[300:400]))

# Print remaining lines
print("\n--- LINES 401 to END ---")
print('\n'.join(lines[400:]))
