import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const imgPath = 'C:\\Users\\GrowLimo - Umair\\.gemini\\antigravity\\brain\\aa951eaa-029e-41d9-89fb-ed10a09de9ea\\.user_uploaded\\media_1794869760488_2c8c845c.png';

async function cropAndInspect() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const base64Data = fs.readFileSync(imgPath).toString('base64');
  const dataUri = `data:image/png;base64,${base64Data}`;

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 600 });

  const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <canvas id="c"></canvas>
      <script>
        const img = new Image();
        img.onload = () => {
          const c = document.getElementById('c');
          c.width = img.width;
          c.height = img.height;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, c.width, c.height);
          const data = imgData.data;
          
          let minX = c.width, minY = c.height, maxX = 0, maxY = 0;
          for (let y = 0; y < c.height; y++) {
            for (let x = 0; x < c.width; x++) {
              const alpha = data[(y * c.width + x) * 4 + 3];
              if (alpha > 10) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }
          window.cropResult = { minX, minY, maxX, maxY, width: maxX - minX + 1, height: maxY - minY + 1, origW: c.width, origH: c.height };
        };
        img.src = "${dataUri}";
      </script>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForFunction(() => window.cropResult !== undefined);
  const result = await page.evaluate(() => window.cropResult);
  console.log('Bounding box of non-transparent pixels:', result);

  // Now create tightly trimmed transparent PNGs:
  // 1) Full logo (icon + text)
  // 2) Icon only (the circle)
  await page.evaluate(() => {
    const origCanvas = document.getElementById('c');
    const { minX, minY, width, height } = window.cropResult;

    // 1. Full trimmed logo
    const trimmed = document.createElement('canvas');
    trimmed.width = width;
    trimmed.height = height;
    const tCtx = trimmed.getContext('2d');
    tCtx.drawImage(origCanvas, minX, minY, width, height, 0, 0, width, height);
    window.trimmedDataUrl = trimmed.toDataURL('image/png');

    // 2. Icon only (find circle bounds)
    // The circle is roughly on the left: from minX to minX + height
    const iconCanvas = document.createElement('canvas');
    iconCanvas.width = height;
    iconCanvas.height = height;
    const iCtx = iconCanvas.getContext('2d');
    iCtx.drawImage(origCanvas, minX, minY, height, height, 0, 0, height, height);
    window.iconDataUrl = iconCanvas.toDataURL('image/png');
  });

  const trimmedData = await page.evaluate(() => window.trimmedDataUrl);
  const iconData = await page.evaluate(() => window.iconDataUrl);

  const trimmedBuffer = Buffer.from(trimmedData.replace(/^data:image\/png;base64,/, ''), 'base64');
  const iconBuffer = Buffer.from(iconData.replace(/^data:image\/png;base64,/, ''), 'base64');

  fs.writeFileSync('public/images/ardona-official-logo.png', trimmedBuffer);
  fs.writeFileSync('public/images/ardona-official-icon.png', iconBuffer);
  console.log('Saved public/images/ardona-official-logo.png and public/images/ardona-official-icon.png');

  await browser.close();
}

cropAndInspect().catch(console.error);
