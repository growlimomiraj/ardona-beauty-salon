import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const imgPath = 'C:\\Users\\GrowLimo - Umair\\.gemini\\antigravity\\brain\\aa951eaa-029e-41d9-89fb-ed10a09de9ea\\.user_uploaded\\media_1794869760488_2c8c845c.png';

async function checkLogo() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const base64Data = fs.readFileSync(imgPath).toString('base64');
  const dataUri = `data:image/png;base64,${base64Data}`;

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 700 });
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 40px; background: #000; display: flex; flex-direction: column; gap: 40px; }
        .box { padding: 30px; border-radius: 8px; }
        .on-dark { background: #0a0a0a; border: 1px solid #333; }
        .on-gray { background: #555; }
        .on-light { background: #fff; }
        img { display: block; max-width: 100%; height: auto; }
      </style>
    </head>
    <body>
      <div class="box on-dark">
        <h3 style="color:#aaa; font-family:sans-serif; margin-top:0;">Logo on Dark (#0a0a0a):</h3>
        <img id="img-dark" src="${dataUri}" />
      </div>
      <div class="box on-gray">
        <h3 style="color:#fff; font-family:sans-serif; margin-top:0;">Logo on Medium Gray (#555):</h3>
        <img id="img-gray" src="${dataUri}" />
      </div>
      <div class="box on-light">
        <h3 style="color:#333; font-family:sans-serif; margin-top:0;">Logo on Light (#fff):</h3>
        <img id="img-light" src="${dataUri}" />
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'load' });
  
  const imgInfo = await page.evaluate(() => {
    const img = document.getElementById('img-dark');
    return {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    };
  });

  console.log('Image dimensions:', imgInfo);
  await page.screenshot({ path: path.resolve('public', 'screenshots', 'logo_inspect_preview.png') });
  await browser.close();
}

checkLogo().catch(console.error);
