import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const viewports = [
  { name: 'iphone_14', width: 390, height: 844 },
  { name: 'iphone_se', width: 375, height: 667 },
  { name: 'galaxy_s20', width: 360, height: 800 },
  { name: 'pixel_7', width: 412, height: 915 }
];

async function run() {
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: 'new', args: ['--no-sandbox'] });
  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

    const banner = await page.$('.section-banner');
    if (banner) {
      await banner.screenshot({ path: path.resolve('public', 'screenshots', `hero_${vp.name}.png`) });
      console.log(`Saved hero_${vp.name}.png`);
    }
    await page.close();
  }
  await browser.close();
  console.log('All device hero tests complete!');
}

run().catch(console.error);
