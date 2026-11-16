import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('public', 'screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Launching Chrome from:', chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Desktop Ardona
  console.log('Taking Desktop screenshot of Ardona Beauty Salon...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, 'desktop_ardona.png'), fullPage: true });

  // 2. Mobile Ardona
  console.log('Taking Mobile screenshot of Ardona Beauty Salon...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, 'mobile_ardona.png'), fullPage: true });

  // 3. Test Mobile Drawer
  console.log('Testing Mobile Drawer...');
  const burger = await page.$('.toggle-nav');
  if (burger) {
    await burger.click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, 'mobile_drawer_open.png') });
  }

  // 4. Desktop One Salon (Reference)
  try {
    console.log('Taking Desktop screenshot of One Salon Reference...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('https://onesalonnyc.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: path.join(outDir, 'desktop_onesalon.png'), fullPage: false });
    
    console.log('Taking Mobile screenshot of One Salon Reference...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('https://onesalonnyc.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: path.join(outDir, 'mobile_onesalon.png'), fullPage: false });
  } catch (err) {
    console.log('Could not capture onesalonnyc.com directly via network, fallback ready:', err.message);
  }

  await browser.close();
  console.log('Screenshots completed successfully in public/screenshots/');
}

run().catch((err) => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
