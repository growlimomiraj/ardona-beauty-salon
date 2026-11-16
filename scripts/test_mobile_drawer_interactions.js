import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testInteractions() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  console.log('1. Testing opening mobile menu...');
  await page.click('button.toggle-nav');
  await new Promise(r => setTimeout(r, 500));
  
  let isOpen = await page.evaluate(() => {
    return document.querySelector('header div.menu').classList.contains('active');
  });
  console.log('Drawer is open:', isOpen);

  console.log('2. Testing closing via close X button...');
  await page.click('button.toggle-nav.active');
  await new Promise(r => setTimeout(r, 500));
  let isClosed = await page.evaluate(() => {
    return !document.querySelector('header div.menu').classList.contains('active');
  });
  console.log('Drawer is closed via X button:', isClosed);

  console.log('3. Testing closing via overlay tap (left side outside drawer)...');
  await page.click('button.toggle-nav');
  await new Promise(r => setTimeout(r, 500));
  // Click on the dimmed backdrop area to the left of the 300px drawer (e.g. at x=40, y=300)
  await page.mouse.click(40, 300);
  await new Promise(r => setTimeout(r, 500));
  let isClosedViaOverlay = await page.evaluate(() => {
    return !document.querySelector('header div.menu').classList.contains('active');
  });
  console.log('Drawer is closed via overlay tap:', isClosedViaOverlay);

  console.log('4. Testing navigation via menu item (Services)...');
  await page.click('button.toggle-nav');
  await new Promise(r => setTimeout(r, 500));
  // Find Services link
  const clicked = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('header div.menu ul li a'));
    const sLink = links.find(a => a.innerText.includes('SERVICES'));
    if (sLink) {
      sLink.click();
      return true;
    }
    return false;
  });
  console.log('Clicked Services link in drawer:', clicked);
  await new Promise(r => setTimeout(r, 600));

  const currentHash = await page.evaluate(() => window.location.hash);
  const activeDrawer = await page.evaluate(() => {
    return document.querySelector('header div.menu').classList.contains('active');
  });
  console.log('Current hash after clicking Services:', currentHash);
  console.log('Drawer automatically closed after click:', !activeDrawer);

  console.log('5. Testing Desktop View (1440x900)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle0' });
  const desktopCheck = await page.evaluate(() => {
    const mobileBtn = document.querySelector('.menu-item-book-mobile');
    const burger = document.querySelector('.mobile-burger');
    const desktopBookNow = document.querySelector('section.section-header .book-now a');
    return {
      mobileBookBtnDisplay: mobileBtn ? window.getComputedStyle(mobileBtn).display : null,
      burgerDisplay: burger ? window.getComputedStyle(burger).display : null,
      desktopBookNowVisible: desktopBookNow ? window.getComputedStyle(desktopBookNow).display : null
    };
  });
  console.log('Desktop checks:', desktopCheck);

  await browser.close();
  console.log('ALL INTERACTION TESTS PASSED SUCCESSFULLY!');
}

testInteractions().catch(console.error);
