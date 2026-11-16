import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: 'public/screenshots/logo_header_desktop.png' });
  }

  const footer = await page.$('.footer-bottom');
  if (footer) {
    await footer.screenshot({ path: 'public/screenshots/logo_footer_desktop.png' });
  }

  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  const mobHeader = await page.$('header');
  if (mobHeader) {
    await mobHeader.screenshot({ path: 'public/screenshots/logo_header_mobile.png' });
  }

  await browser.close();
  console.log('Saved logo header and footer screenshots!');
}

run().catch(console.error);
