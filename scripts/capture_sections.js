import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('public', 'screenshots');

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Full page screenshot
  await page.screenshot({ path: path.join(outDir, 'current_desktop_full.png'), fullPage: true });

  console.log('Saved current_desktop_full.png');
  await browser.close();
}

capture().catch(console.error);
