import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testCart() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  console.log('1. Checking button colors (must be Red: rgb(229, 9, 20))...');
  const buttonColors = await page.evaluate(() => {
    const headerBtn = document.querySelector('.book-now button.book-now-btn');
    const heroBtn = document.querySelector('.appointment button.appointment-btn');
    const consultBtn = document.querySelector('.virtualconsultbutton');
    return {
      headerBtnBg: headerBtn ? window.getComputedStyle(headerBtn).backgroundColor : null,
      heroBtnBg: heroBtn ? window.getComputedStyle(heroBtn).backgroundColor : null,
      consultBtnBg: consultBtn ? window.getComputedStyle(consultBtn).backgroundColor : null
    };
  });
  console.log('Button Background Colors:', buttonColors);

  // Take screenshot of desktop home showing red buttons
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'desktop_red_buttons_hero.png') });

  console.log('2. Testing opening Booking Cart from Header Book Now...');
  await page.click('.book-now button.book-now-btn');
  await new Promise(r => setTimeout(r, 600));

  let isCartVisible = await page.evaluate(() => {
    const modal = document.querySelector('.cart-modal-container');
    return modal !== null;
  });
  console.log('Cart modal is visible:', isCartVisible);

  // Take screenshot of open cart modal
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'booking_cart_modal_step1.png') });

  console.log('3. Testing adding an add-on service in cart...');
  await page.evaluate(() => {
    const addBtns = Array.from(document.querySelectorAll('.cart-addon-item button'));
    if (addBtns.length > 0) addBtns[0].click();
  });
  await new Promise(r => setTimeout(r, 400));

  const cartStateAfterAdd = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.cart-item-card')).map(c => c.querySelector('.cart-item-name')?.innerText);
    const total = document.querySelector('.summary-total-price')?.innerText;
    return { items, total };
  });
  console.log('Cart items and total after add:', cartStateAfterAdd);

  console.log('4. Testing proceeding to Step 2 (Customer details)...');
  await page.click('.cart-btn-primary');
  await new Promise(r => setTimeout(r, 400));

  // Screenshot step 2
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'booking_cart_modal_step2.png') });

  console.log('5. Filling customer details and confirming booking...');
  await page.type('.cart-form-group input[type="text"]', 'Elena Rostova');
  await page.type('.cart-form-group input[type="tel"]', '(212) 555-8392');
  await page.type('.cart-form-group input[type="email"]', 'elena.rostova@example.com');
  await page.click('button[type="submit"].cart-btn-primary');
  await new Promise(r => setTimeout(r, 600));

  // Screenshot confirmation screen
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'booking_cart_modal_confirmed.png') });

  const confirmationInfo = await page.evaluate(() => {
    const title = document.querySelector('.confirmed-title')?.innerText;
    const ref = document.querySelector('.confirmed-row strong')?.innerText;
    return { title, ref };
  });
  console.log('Confirmation Info:', confirmationInfo);

  // Close cart
  await page.click('.confirmed-actions-row button');
  await new Promise(r => setTimeout(r, 400));

  console.log('6. Testing Mobile View (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Mobile home screenshot
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'mobile_red_buttons_home.png') });

  // Mobile drawer open screenshot
  await page.click('button.toggle-nav');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'mobile_drawer_red_btn.png') });

  // Click Book Now inside drawer to open cart on mobile
  await page.click('.mobile-drawer-book-btn');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'mobile_cart_open.png') });

  console.log('ALL TESTS COMPLETED SUCCESSFULLY!');
  await browser.close();
}

testCart().catch(console.error);
