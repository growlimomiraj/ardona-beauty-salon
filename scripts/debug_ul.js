import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testUlStyles() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  await page.click('.toggle-nav');
  await new Promise((r) => setTimeout(r, 600));

  const info = await page.evaluate(() => {
    const ul = document.querySelector('header .menu ul');
    const s = window.getComputedStyle(ul);
    const r = ul.getBoundingClientRect();
    return {
      margin: s.margin,
      padding: s.padding,
      left: s.left,
      position: s.position,
      width: s.width,
      transform: s.transform,
      rect: { x: r.x, y: r.y, width: r.width, height: r.height }
    };
  });

  console.log('UL info:', info);
  await browser.close();
}

testUlStyles();
