import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const pages = [
  { name: 'home', hash: 'home' },
  { name: 'about', hash: 'about' },
  { name: 'services', hash: 'services' },
  { name: 'promotions', hash: 'promotions' },
  { name: 'blog', hash: 'blog' },
  { name: 'contact', hash: 'contact' }
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  console.log('Testing Desktop Pages (1440x900)...');
  const deskPage = await browser.newPage();
  await deskPage.setViewport({ width: 1440, height: 900 });

  for (const p of pages) {
    const url = `http://localhost:5173/#${p.hash}`;
    console.log(`Navigating to ${url}...`);
    await deskPage.goto(url, { waitUntil: 'networkidle0' });
    await deskPage.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 600));

    const screenshotPath = path.resolve('public', 'screenshots', `ardona_page_${p.name}_desktop.png`);
    await deskPage.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`✓ Saved ${screenshotPath}`);
  }
  await deskPage.close();

  console.log('\nTesting Mobile Pages (iPhone 14: 390x844)...');
  const mobPage = await browser.newPage();
  await mobPage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  for (const p of pages) {
    const url = `http://localhost:5173/#${p.hash}`;
    console.log(`Navigating mobile to ${url}...`);
    await mobPage.goto(url, { waitUntil: 'networkidle0' });
    await mobPage.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 600));

    const screenshotPath = path.resolve('public', 'screenshots', `ardona_page_${p.name}_mobile.png`);
    await mobPage.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`✓ Saved ${screenshotPath}`);
  }
  await mobPage.close();

  await browser.close();
  console.log('\nAll 12 screenshots (6 desktop + 6 mobile) captured successfully!');
}

run().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
