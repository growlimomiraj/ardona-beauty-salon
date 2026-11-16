import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testLinksInsideMenu() {
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
    return Array.from(document.querySelectorAll('header .menu ul li a')).map((a, i) => {
      const r = a.getBoundingClientRect();
      return {
        i,
        text: a.innerText,
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height
      };
    });
  });

  console.log('Links inside menu:', info);
  await browser.close();
}

testLinksInsideMenu();
