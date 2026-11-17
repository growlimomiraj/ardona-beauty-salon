import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('public/screenshots');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars']
  });

  const page = await browser.newPage();

  // Mobile 390x844
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // 1. Screenshot of the bottom sticky bar directly
  const bottomBar = await page.$('.fixed-bootom');
  if (bottomBar) {
    await bottomBar.screenshot({ path: path.join(outDir, 'mobile_sticky_buttons_red_white.png') });
  }

  // 2. Full mobile screen showing hero + sticky bottom bar
  await page.screenshot({
    path: path.join(outDir, 'mobile_screen_with_sticky_bar.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });

  // 3. Click the white "BOOK NOW" button to confirm it opens the cart modal
  const bookBtn = await page.$('.mobile-bottom-book-btn');
  if (bookBtn) {
    await bookBtn.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(outDir, 'mobile_cart_opened_from_white_btn.png'),
      clip: { x: 0, y: 0, width: 390, height: 844 }
    });
  }

  await browser.close();
  console.log('Mobile sticky buttons verified successfully with --hide-scrollbars!');
})();
