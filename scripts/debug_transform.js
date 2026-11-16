import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testTransform() {
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
    const m = document.querySelector('.menu');
    const s = window.getComputedStyle(m);
    const rect = m.getBoundingClientRect();
    return {
      classes: m.className,
      transform: s.transform,
      position: s.position,
      right: s.right,
      left: s.left,
      width: s.width,
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
    };
  });

  console.log('Menu info:', info);
  await browser.close();
}

testTransform();
