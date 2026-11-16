import json
import re

with open('wix_booking_script.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find start of services query
query_start = text.find('queryServices')
print("queryServices pos:", query_start)

# In Wix, it's often a key like "TPASection_..._queryServices-...":{"services":[...],"total":...}
# Let's find "services": [
idx = text.find('"services":[', query_start) if query_start != -1 else text.find('"services":[')
print('"services":[ pos:', idx)

if idx != -1:
    # Bracket matching to extract full JSON array
    start_bracket = idx + len('"services":')
    brace_count = 0
    in_string = False
    escape = False
    end_bracket = -1
    
    for i in range(start_bracket, len(text)):
        char = text[i]
        if escape:
            escape = False
            continue
        if char == '\\':
            escape = True
            continue
        if char == '"':
            in_string = not in_string
            continue
        if not in_string:
            if char == '[':
                brace_count += 1
            elif char == ']':
                brace_count -= 1
                if brace_count == 0:
                    end_bracket = i + 1
                    break
    
    if end_bracket != -1:
        services_json_str = text[start_bracket:end_bracket]
        print(f"Extracted services JSON length: {len(services_json_str)}")
        services = json.loads(services_json_str)
        print(f"Parsed {len(services)} services successfully!")
        
        # Save structured services
        cleaned_services = []
        for s in services:
            # Extract fields
            name = s.get('name', '')
            desc = s.get('description', '')
            cat_name = s.get('category', {}).get('name', 'General')
            cat_id = s.get('category', {}).get('id', '')
            
            # Duration (in minutes)
            duration_mins = None
            if 'schedule' in s:
                duration_mins = s['schedule'].get('availabilityConstraints', {}).get('sessionDurations', [None])[0]
            
            # Payment
            payment = s.get('payment', {})
            rate_type = payment.get('rateType', '')
            price_val = None
            if rate_type == 'FIXED':
                price_val = payment.get('fixed', {}).get('price', {}).get('value')
            elif rate_type == 'VARIED':
                min_p = payment.get('varied', {}).get('leadPrice', {}).get('value')
                price_val = f"From ${min_p}" if min_p else "Varied"
            elif rate_type == 'CUSTOM':
                price_val = payment.get('custom', '')
            
            discount_info = payment.get('discountInfo', {})
            discount_name = discount_info.get('discountName', '')
            price_after_discount = discount_info.get('priceAfterDiscount', {}).get('value', '')
            
            # URLs
            urls = s.get('urls', {})
            booking_page = urls.get('bookingPage', '')
            service_page = urls.get('servicePage', '')
            
            full_booking_url = f"https://www.ardonabeautysalon.com{booking_page}" if booking_page else "https://www.ardonabeautysalon.com/book-online"
            
            cleaned_services.append({
                'id': s.get('id'),
                'name': name,
                'category': cat_name,
                'description': desc,
                'duration_mins': duration_mins,
                'rate_type': rate_type,
                'price': price_val,
                'discount_name': discount_name,
                'price_after_discount': price_after_discount,
                'booking_url': full_booking_url,
                'slug': booking_page
            })
            
        with open('cleaned_services.json', 'w', encoding='utf-8') as out:
            json.dump(cleaned_services, out, indent=2)
        print("Saved cleaned_services.json with", len(cleaned_services), "services!")
        
        # Group by category
        by_cat = {}
        for s in cleaned_services:
            c = s['category']
            by_cat.setdefault(c, []).append(s)
            
        print("\n=== SERVICES BY CATEGORY ===")
        for c, s_list in by_cat.items():
            print(f"\n--- Category: {c} ({len(s_list)} services) ---")
            for item in s_list:
                disc = f" (Sale: ${item['price_after_discount']})" if item['price_after_discount'] else ""
                dur = f" ({item['duration_mins']} mins)" if item['duration_mins'] else ""
                print(f"  * {item['name']}: ${item['price']}{disc}{dur} -> {item['booking_url']}")
                if item['description']:
                    print(f"    Desc: {item['description']}")
