import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // 1. Desktop 1440x900
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Desktop header screenshot
  const headerElem = await page.$('header');
  if (headerElem) {
    await headerElem.screenshot({ path: path.resolve('public', 'screenshots', 'new_official_logo_header_desktop.png') });
  }

  // Desktop footer screenshot
  const footerElem = await page.$('footer');
  if (footerElem) {
    await footerElem.screenshot({ path: path.resolve('public', 'screenshots', 'new_official_logo_footer_desktop.png') });
  }

  // 2. Mobile iPhone 14 (390x844)
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const mobHeader = await page.$('header');
  if (mobHeader) {
    await mobHeader.screenshot({ path: path.resolve('public', 'screenshots', 'new_official_logo_header_mobile.png') });
  }

  // Mobile drawer open screenshot
  await page.click('button.toggle-nav');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'new_official_logo_mobile_drawer.png') });

  // Get image natural & client bounding box
  const logoMetrics = await page.evaluate(() => {
    const img = document.querySelector('header .logo img');
    const footerImg = document.querySelector('.logo-footer img');
    return {
      headerLogo: {
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        clientWidth: img.clientWidth,
        clientHeight: img.clientHeight,
        src: img.src
      },
      footerLogo: {
        naturalWidth: footerImg ? footerImg.naturalWidth : null,
        naturalHeight: footerImg ? footerImg.naturalHeight : null,
        clientWidth: footerImg ? footerImg.clientWidth : null,
        clientHeight: footerImg ? footerImg.clientHeight : null,
        src: footerImg ? footerImg.src : null
      }
    };
  });

  console.log('Logo metrics:', JSON.stringify(logoMetrics, null, 2));

  await browser.close();
}

capture().catch(console.error);
