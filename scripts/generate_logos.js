import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const originalLogoUri = 'file:///C:/Users/GrowLimo%20-%20Umair/.gemini/antigravity/brain/aa951eaa-029e-41d9-89fb-ed10a09de9ea/.user_uploaded/media_1794867385969_953e5f02.png';
  await page.goto(originalLogoUri);

  // Extract transparent versions
  const result = await page.evaluate(() => {
    const img = document.querySelector('img');
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    // Canvas 1: Original with transparent background
    const c1 = document.createElement('canvas');
    c1.width = w;
    c1.height = h;
    const ctx1 = c1.getContext('2d');
    ctx1.drawImage(img, 0, 0);
    const idata1 = ctx1.getImageData(0, 0, w, h);
    const d1 = idata1.data;

    for (let i = 0; i < d1.length; i += 4) {
      const r = d1[i], g = d1[i+1], b = d1[i+2];
      // If pure white or nearly white
      if (r > 245 && g > 245 && b > 245) {
        d1[i+3] = 0; // transparent
      } else if (r > 230 && g > 230 && b > 230) {
        // Anti-aliasing falloff
        const diff = (765 - (r + g + b)) / (765 - 690);
        d1[i+3] = Math.round(Math.min(255, Math.max(0, diff * 255)));
      }
    }
    ctx1.putImageData(idata1, 0, 0);

    // Canvas 2: Dark background version (white text)
    const c2 = document.createElement('canvas');
    c2.width = w;
    c2.height = h;
    const ctx2 = c2.getContext('2d');
    ctx2.drawImage(img, 0, 0);
    const idata2 = ctx2.getImageData(0, 0, w, h);
    const d2 = idata2.data;

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const i = (y * w + x) * 4;
        const r = d2[i], g = d2[i+1], b = d2[i+2];

        // Is it part of the text (x > 105)?
        if (x > 105) {
          if (r > 245 && g > 245 && b > 245) {
            d2[i+3] = 0; // background transparent
          } else {
            // Text pixel: invert to crisp white / gold
            // Calculate how dark it was originally
            const darkness = 1 - ((r + g + b) / 3 / 255);
            d2[i] = 255;
            d2[i+1] = 255;
            d2[i+2] = 255;
            d2[i+3] = Math.round(Math.min(255, darkness * 300));
          }
        } else {
          // Circle icon part (x <= 105)
          if (r > 245 && g > 245 && b > 245) {
            d2[i+3] = 0; // background outside circle
          } else if (r > 230 && g > 230 && b > 230) {
            const diff = (765 - (r + g + b)) / 75;
            d2[i+3] = Math.round(Math.min(255, Math.max(0, diff * 255)));
          }
        }
      }
    }
    ctx2.putImageData(idata2, 0, 0);

    // Canvas 3: Standalone circular icon mark (100x100)
    const c3 = document.createElement('canvas');
    c3.width = 96;
    c3.height = 96;
    const ctx3 = c3.getContext('2d');
    // Draw only the circle part (from x=13, y=14, size 80x80)
    ctx3.drawImage(c1, 10, 8, 86, 86, 0, 0, 96, 96);

    return {
      lightBgData: c1.toDataURL('image/png'),
      darkBgData: c2.toDataURL('image/png'),
      iconMarkData: c3.toDataURL('image/png')
    };
  });

  const saveBase64 = (dataUrl, filePath) => {
    const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));
    console.log(`✓ Saved ${filePath}`);
  };

  saveBase64(result.lightBgData, 'public/images/ardona-logo-light.png');
  saveBase64(result.darkBgData, 'public/images/ardona-logo-dark.png');
  saveBase64(result.iconMarkData, 'public/images/ardona-icon.png');
  saveBase64(result.iconMarkData, 'public/favicon.ico');

  await browser.close();
  console.log('Finished generating transparent logo assets!');
}

run().catch(console.error);
