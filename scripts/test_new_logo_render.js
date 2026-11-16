import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testLogoRender() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Test Desktop Header & Footer
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle0' });

  // Update logo source via DOM to preview
  await page.evaluate(() => {
    const headerLogo = document.querySelector('header .logo img');
    if (headerLogo) {
      headerLogo.src = '/images/ardona-official-logo.png';
      headerLogo.style.height = '42px';
      headerLogo.style.width = 'auto';
    }
    const footerLogo = document.querySelector('.logo-footer img');
    if (footerLogo) {
      footerLogo.src = '/images/ardona-official-logo.png';
      footerLogo.style.height = '42px';
      footerLogo.style.width = 'auto';
    }
  });

  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'preview_new_logo_desktop.png') });

  // Test Mobile Header
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    const headerLogo = document.querySelector('header .logo img');
    if (headerLogo) {
      headerLogo.src = '/images/ardona-official-logo.png';
      headerLogo.style.height = '36px';
      headerLogo.style.width = 'auto';
    }
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'preview_new_logo_mobile.png') });

  await browser.close();
  console.log('Saved desktop and mobile logo previews!');
}

testLogoRender().catch(console.error);
