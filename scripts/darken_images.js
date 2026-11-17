import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function processImages() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const imagesToDarken = [
    { src: 'public/images/hero-banner.jpg', out: 'public/images/hero-banner.jpg', type: 'image/jpeg', quality: 0.92 },
    { src: 'public/images/hero-banner-mobile.jpg', out: 'public/images/hero-banner-mobile.jpg', type: 'image/jpeg', quality: 0.92 },
    { src: 'public/images/about-group.png', out: 'public/images/about-group.png', type: 'image/png' }
  ];

  for (const item of imagesToDarken) {
    console.log(`Processing ${item.src}...`);
    const data = fs.readFileSync(item.src);
    const mime = item.type;
    const b64 = `data:${mime};base64,${data.toString('base64')}`;

    const darkDataUri = await page.evaluate(async (uri, outType, quality) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          // Apply gentle darkness & contrast
          ctx.filter = 'brightness(0.76) contrast(1.05)';
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL(outType, quality || 0.92));
        };
        img.src = uri;
      });
    }, b64, item.type, item.quality);

    const base64Clean = darkDataUri.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(item.out, Buffer.from(base64Clean, 'base64'));
    console.log(`✓ Saved reduced brightness image to ${item.out}`);
  }

  await browser.close();
}

processImages().catch(console.error);
