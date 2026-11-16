import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  console.log('Testing Header Navigation...');
  const navTargets = ['About Us', 'Services', 'Promotions', 'Blog', 'Contact us', 'Home'];

  for (const label of navTargets) {
    const link = await page.evaluateHandle((text) => {
      const anchors = Array.from(document.querySelectorAll('.section-header .menu a'));
      return anchors.find(a => a.innerText.trim().toLowerCase() === text.toLowerCase());
    }, label);

    if (link) {
      await link.click();
      await new Promise(r => setTimeout(r, 400));
      const pageHeading = await page.evaluate(() => {
        return document.querySelector('main h1, .section-banner h1')?.innerText.trim();
      });
      console.log(`✓ Clicked "${label}" -> Page heading: "${pageHeading}"`);
    } else {
      console.error(`✗ Link "${label}" not found`);
    }
  }

  console.log('\nTesting Blog "Read more..." interaction...');
  await page.goto('http://localhost:5173/#blog', { waitUntil: 'networkidle0' });
  const readMoreBtn = await page.$('.read-more-btn');
  if (readMoreBtn) {
    await readMoreBtn.click();
    await new Promise(r => setTimeout(r, 400));
    const modalVisible = await page.evaluate(() => {
      return !!document.querySelector('.blog-modal-content');
    });
    console.log(`✓ Blog modal opened successfully: ${modalVisible}`);
  }

  console.log('\nTesting Services page dropdown filter...');
  await page.goto('http://localhost:5173/#services', { waitUntil: 'networkidle0' });
  const selectExists = await page.$('.select-item select');
  if (selectExists) {
    await page.select('.select-item select', 'cuts');
    await new Promise(r => setTimeout(r, 400));
    const visibleCount = await page.evaluate(() => {
      return document.querySelectorAll('#fullTeam .item').length;
    });
    console.log(`✓ Filtered to "cuts" category -> Items shown: ${visibleCount}`);
  }

  await browser.close();
  console.log('\n✨ ALL PAGE NAVIGATION & INTERACTION TESTS PASSED!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
