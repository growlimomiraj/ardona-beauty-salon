import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testLinks() {
  console.log('Testing all links and interactions on Ardona Beauty Salon...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // 1. Collect all anchor tags
  const links = await page.$$eval('a', (elements) => {
    return elements.map((el) => ({
      text: el.innerText.trim().replace(/\n/g, ' '),
      href: el.getAttribute('href'),
      target: el.getAttribute('target')
    }));
  });

  console.log(`Found ${links.length} total links on homepage.`);

  let errors = 0;
  let bookingLinksCount = 0;

  for (const l of links) {
    if (!l.href) {
      console.warn(`[WARNING] Link with text "${l.text}" has no href!`);
      errors++;
      continue;
    }

    if (l.href.includes('booking-calendar') || l.href.includes('book-online')) {
      bookingLinksCount++;
      if (!l.href.startsWith('https://www.ardonabeautysalon.com/')) {
        console.error(`[ERROR] Invalid booking domain in: ${l.href}`);
        errors++;
      }
    }
  }

  console.log(`Verified ${bookingLinksCount} direct Ardona booking links!`);

  // 2. Test Accordion expansion
  console.log('\nTesting service category accordions...');
  const accordionHeaders = await page.$$('.services-flex .item .according');
  console.log(`Found ${accordionHeaders.length} category accordion cards.`);

  for (let i = 0; i < accordionHeaders.length; i++) {
    const header = accordionHeaders[i];
    const categoryName = await header.$eval('h3', (el) => el.innerText.trim());
    await header.click();
    await new Promise((r) => setTimeout(r, 100));
    console.log(`  ✓ Toggled accordion category: "${categoryName}"`);
  }

  // 3. Test FAQ expansion
  console.log('\nTesting FAQ accordion expansion...');
  const faqTitles = await page.$$('.accordion__title');
  console.log(`Found ${faqTitles.length} FAQ items.`);
  for (let i = 0; i < faqTitles.length; i++) {
    const faq = faqTitles[i];
    const question = await faq.$eval('span', (el) => el.innerText.trim());
    await faq.click();
    await new Promise((r) => setTimeout(r, 100));
    console.log(`  ✓ Toggled FAQ: "${question}"`);
  }

  // 4. Test Mobile responsiveness
  console.log('\nTesting mobile responsiveness...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  const burgerBtn = await page.$('.toggle-nav');
  if (burgerBtn) {
    await burgerBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    const isMenuActive = await page.$eval('header section.section-header .menu', (el) => el.classList.contains('active'));
    console.log(`  ✓ Mobile menu drawer opened successfully: ${isMenuActive}`);
  }

  // 5. Test fixed bottom bar on mobile
  const fixedBottom = await page.$('.fixed-bootom');
  if (fixedBottom) {
    const isVisible = await page.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    }, fixedBottom);
    console.log(`  ✓ Mobile sticky bottom bar visible on mobile: ${isVisible}`);
  }

  await browser.close();

  if (errors === 0) {
    console.log('\n✨ ALL TESTS PASSED! 0 errors detected.');
  } else {
    console.error(`\n❌ Tests completed with ${errors} error(s).`);
    process.exit(1);
  }
}

testLinks().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
