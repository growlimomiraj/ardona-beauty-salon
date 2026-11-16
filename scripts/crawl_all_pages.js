import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const urls = [
  { name: 'home', url: 'https://onesalonnyc.com/' },
  { name: 'about', url: 'https://onesalonnyc.com/about-us/' },
  { name: 'services', url: 'https://onesalonnyc.com/our-services/' },
  { name: 'promotions', url: 'https://onesalonnyc.com/promos-offers/' },
  { name: 'blog', url: 'https://onesalonnyc.com/blog/' },
  { name: 'contact', url: 'https://onesalonnyc.com/contact-us/' }
];

async function run() {
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: 'new', args: ['--no-sandbox'] });
  const results = {};

  for (const item of urls) {
    try {
      console.log('Crawling:', item.name, item.url);
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 35000 });

      await page.screenshot({ path: `public/screenshots/ref_${item.name}.png`, fullPage: true });

      const data = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a[href]'));
        const internalLinks = anchors
          .map(a => ({ text: a.innerText.trim(), href: a.href }))
          .filter(a => a.href.includes('onesalonnyc.com'));

        const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim());
        const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim());
        const h3s = Array.from(document.querySelectorAll('h3')).map(h => h.innerText.trim());
        const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText.trim()).filter(Boolean);

        // Get main HTML content structure
        const mainEl = document.querySelector('body');
        const sections = Array.from(document.querySelectorAll('section, main, article, .content-area, form')).map(el => ({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          text: el.innerText.slice(0, 300)
        }));

        return { title: document.title, h1s, h2s, h3s, paragraphs: paragraphs.slice(0, 30), sections, internalLinks };
      });

      results[item.name] = data;
      console.log('Finished:', item.name);
      await page.close();
    } catch (e) {
      console.error('Error crawling ' + item.name + ':', e.message);
    }
  }

  await browser.close();
  fs.writeFileSync('scripts/crawled_pages.json', JSON.stringify(results, null, 2));
  console.log('Done! Crawled data written to scripts/crawled_pages.json');
}

run();
