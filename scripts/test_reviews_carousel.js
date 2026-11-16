import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('public', 'screenshots');

async function testCarousel() {
  console.log('Launching browser to test Reviews Carousel...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Scroll into view of reviews
  const reviewSection = await page.$('.section-reviews');
  if (reviewSection) {
    await reviewSection.scrollIntoView();
  }
  await new Promise((r) => setTimeout(r, 600));

  // Take screenshot of reviews carousel initial state
  const widgetBox = await page.$('.reviews-widget-container');
  if (widgetBox) {
    await widgetBox.screenshot({ path: path.join(outDir, 'reviews_carousel_initial.png') });
    console.log('Captured reviews_carousel_initial.png');
  }

  // Check initial scrollLeft
  const initialScroll = await page.evaluate(() => {
    const track = document.querySelector('.reviews-carousel-track');
    return {
      scrollLeft: track.scrollLeft,
      scrollWidth: track.scrollWidth,
      clientWidth: track.clientWidth,
      cardsCount: track.querySelectorAll('.reviews-card').length
    };
  });
  console.log('Initial carousel state:', initialScroll);

  if (initialScroll.scrollWidth <= initialScroll.clientWidth) {
    throw new Error('Carousel track is not horizontally scrollable!');
  }

  // Click Next arrow
  const nextBtn = await page.$('.reviews-arrow-btn[aria-label="Next reviews"]');
  if (nextBtn) {
    console.log('Clicking Next reviews arrow...');
    await nextBtn.click();
    await new Promise((r) => setTimeout(r, 700));

    const afterNextScroll = await page.evaluate(() => {
      const track = document.querySelector('.reviews-carousel-track');
      return track.scrollLeft;
    });
    console.log('scrollLeft after Next click:', afterNextScroll);

    if (afterNextScroll <= 0) {
      throw new Error('Carousel did not scroll horizontally after clicking Next arrow!');
    }

    if (widgetBox) {
      await widgetBox.screenshot({ path: path.join(outDir, 'reviews_carousel_scrolled.png') });
      console.log('Captured reviews_carousel_scrolled.png');
    }
  }

  // Click Prev arrow
  const prevBtn = await page.$('.reviews-arrow-btn[aria-label="Previous reviews"]');
  if (prevBtn) {
    console.log('Clicking Prev reviews arrow...');
    await prevBtn.click();
    await new Promise((r) => setTimeout(r, 700));

    const afterPrevScroll = await page.evaluate(() => {
      const track = document.querySelector('.reviews-carousel-track');
      return track.scrollLeft;
    });
    console.log('scrollLeft after Prev click:', afterPrevScroll);
  }

  // Mobile test
  console.log('Testing reviews carousel on Mobile (390px)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  const mobileReviewSection = await page.$('.section-reviews');
  if (mobileReviewSection) {
    await mobileReviewSection.scrollIntoView();
  }
  await new Promise((r) => setTimeout(r, 600));

  const mobileWidgetBox = await page.$('.reviews-widget-container');
  if (mobileWidgetBox) {
    await mobileWidgetBox.screenshot({ path: path.join(outDir, 'reviews_carousel_mobile.png') });
    console.log('Captured reviews_carousel_mobile.png');
  }

  // Also update full page screenshots
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, 'current_desktop_full.png'), fullPage: true });
  console.log('Updated current_desktop_full.png');

  await browser.close();
  console.log('All Reviews Carousel tests passed successfully!');
}

testCarousel().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
