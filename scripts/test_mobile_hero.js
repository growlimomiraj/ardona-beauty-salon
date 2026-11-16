import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  const banner = await page.$('.section-banner');
  if (banner) {
    await banner.screenshot({ path: path.resolve('public', 'screenshots', 'mobile_hero_test.png') });
    console.log('Saved mobile_hero_test.png');
  }

  const bgInfo = await page.evaluate(() => {
    const el = document.querySelector('.section-banner');
    const style = window.getComputedStyle(el);
    return {
      bgImage: style.backgroundImage,
      bgPosition: style.backgroundPosition,
      bgSize: style.backgroundSize,
      height: style.height,
      width: style.width
    };
  });
  console.log('Mobile section-banner computed style:', bgInfo);

  await browser.close();
}

run().catch(console.error);
