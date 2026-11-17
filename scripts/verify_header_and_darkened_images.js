import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('public/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Desktop 1440x900
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Desktop Header Screenshot
  const headerElem = await page.$('header');
  if (headerElem) {
    await headerElem.screenshot({ path: path.join(outDir, 'header_cleaned_desktop.png') });
  }

  // Desktop Hero + About Section Screenshot
  await page.screenshot({
    path: path.join(outDir, 'hero_darkened_desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 1100 }
  });

  // Desktop About Section Specifically (section right below hero)
  const aboutElem = await page.$('section.section-about');
  if (aboutElem) {
    await aboutElem.screenshot({ path: path.join(outDir, 'about_section_darkened_desktop.png') });
  }

  // 2. Mobile 390x844
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Mobile Top + Hero
  await page.screenshot({
    path: path.join(outDir, 'hero_darkened_mobile.png'),
    clip: { x: 0, y: 0, width: 390, height: 950 }
  });

  // Mobile About Section
  const mobileAbout = await page.$('section.section-about');
  if (mobileAbout) {
    await mobileAbout.screenshot({ path: path.join(outDir, 'about_section_darkened_mobile.png') });
  }

  // Mobile Drawer Open
  const burgerBtn = await page.$('.toggle-nav');
  if (burgerBtn) {
    await burgerBtn.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(outDir, 'mobile_menu_drawer_clean.png'),
      clip: { x: 0, y: 0, width: 390, height: 844 }
    });
  }

  await browser.close();
  console.log('All verification screenshots captured successfully!');
})();
