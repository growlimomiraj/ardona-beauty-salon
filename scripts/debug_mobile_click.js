import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testMobileClick() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Open burger
  await page.click('.toggle-nav');
  await new Promise((r) => setTimeout(r, 600));

  const linkInfo = await page.evaluate(() => {
    const link = document.querySelector('header .menu ul li:nth-child(4) a');
    if (!link) return { found: false };
    const r = link.getBoundingClientRect();
    const elemAtPoint = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return {
      found: true,
      x: r.x,
      y: r.y,
      width: r.width,
      height: r.height,
      visible: r.width > 0 && r.height > 0,
      elemAtPoint: elemAtPoint ? elemAtPoint.outerHTML : null
    };
  });

  console.log('Mobile click inspection:', linkInfo);
  await browser.close();
}

testMobileClick().catch(console.error);
