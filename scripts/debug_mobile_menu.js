import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function debug() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Click mobile hamburger button
  await page.click('button.toggle-nav');
  await new Promise(r => setTimeout(r, 600));

  const info = await page.evaluate(() => {
    const divMenu = document.querySelector('header .menu');
    const ulMenu = document.querySelector('header ul#menu-menu-1');
    const lis = Array.from(document.querySelectorAll('header .menu li')).map(li => ({
      text: li.innerText,
      rect: li.getBoundingClientRect()
    }));
    return {
      divMenu: {
        className: divMenu ? divMenu.className : null,
        rect: divMenu ? divMenu.getBoundingClientRect() : null,
        transform: divMenu ? window.getComputedStyle(divMenu).transform : null,
        zIndex: divMenu ? window.getComputedStyle(divMenu).zIndex : null
      },
      ulMenu: {
        className: ulMenu ? ulMenu.className : null,
        rect: ulMenu ? ulMenu.getBoundingClientRect() : null,
        transform: ulMenu ? window.getComputedStyle(ulMenu).transform : null,
        position: ulMenu ? window.getComputedStyle(ulMenu).position : null,
        zIndex: ulMenu ? window.getComputedStyle(ulMenu).zIndex : null,
        display: ulMenu ? window.getComputedStyle(ulMenu).display : null,
        opacity: ulMenu ? window.getComputedStyle(ulMenu).opacity : null,
        visibility: ulMenu ? window.getComputedStyle(ulMenu).visibility : null
      },
      lis
    };
  });

  console.log('DOM & Computed style debug:', JSON.stringify(info, null, 2));
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'current_mobile_menu.png') });
  await browser.close();
}

debug().catch(console.error);
