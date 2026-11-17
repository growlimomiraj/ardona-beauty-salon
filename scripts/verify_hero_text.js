import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('public/screenshots');

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

  const banner = await page.$('section.section-banner');
  if (banner) {
    await banner.screenshot({ path: path.join(outDir, 'desktop_hero_banner_overlay.png') });
  }

  // 2. Mobile 390x844
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Mobile initial screen above the fold
  await page.screenshot({
    path: path.join(outDir, 'mobile_hero_banner_overlay.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });

  // Mobile section banner element
  const mobileBanner = await page.$('section.section-banner');
  if (mobileBanner) {
    await mobileBanner.screenshot({ path: path.join(outDir, 'mobile_section_banner_full.png') });
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
})();
