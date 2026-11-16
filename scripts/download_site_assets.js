import https from 'https';
import fs from 'fs';
import path from 'path';

const assets = [
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/05/image-3.jpg', dest: 'public/images/about-banner.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2026/09/services-banner-hair-wash.jpg', dest: 'public/images/services-banner.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/05/interior-latino-hair-salon-1.jpg', dest: 'public/images/promotions-banner.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/05/make-up-artist-applying-mascara-eyelashes-1.jpg', dest: 'public/images/blog-banner.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/05/contact-us-icons-virtual-screen-1.jpg', dest: 'public/images/contact-banner.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/05/Group-77-1.png', dest: 'public/images/promo-blowdry.png' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/05/women-colored-hair-different-hairstyles-1.png', dest: 'public/images/promo-color.png' },
  { url: 'https://onesalonnyc.com/wp-content/themes/one-salon/img/location-contact.png', dest: 'public/images/location-contact.png' },
  { url: 'https://onesalonnyc.com/wp-content/themes/one-salon/img/gmail-contact.png', dest: 'public/images/gmail-contact.png' },
  { url: 'https://onesalonnyc.com/wp-content/themes/one-salon/img/phone-icon.png', dest: 'public/images/phone-icon.png' },
  { url: 'https://onesalonnyc.com/wp-content/themes/one-salon/img/every-day.png', dest: 'public/images/every-day.png' },
  // Blog images
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/07/hairdresser-doing-stylish-styling-woman-salon-768x513.jpg', dest: 'public/images/blog-1.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/07/barber-rsquo-s-hairstyling-women-rsquo-s-salon-jobs-career-campaign-768x512.jpg', dest: 'public/images/blog-2.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/07/woman-mixing-hair-dye-bowl-768x614.jpg', dest: 'public/images/blog-3.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/07/nurse-doing-plasma-injection-768x512.jpg', dest: 'public/images/blog-4.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/06/master-hairdresser-cuts-ends-client-hair-beauty-salon-768x512.jpg', dest: 'public/images/blog-5.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/06/modern-trendy-airtouch-technique-hair-dyeing-look-from-768x509.jpg', dest: 'public/images/blog-6.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/06/gorgeous-woman-having-her-hair-washed-by-hairdresser-768x512.jpg', dest: 'public/images/blog-7.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/05/airtouch-hair-stylist-makes-bouffant-using-comb-thin-strands-shatush-technique-hair-lightening-768x512.jpg', dest: 'public/images/blog-8.jpg' },
  { url: 'https://onesalonnyc.com/wp-content/uploads/2024/05/hairdressing-set-dark-background-768x512.jpg', dest: 'public/images/blog-9.jpg' }
];

function download(url, dest) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded ${dest}`);
          resolve(true);
        });
      } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location, dest).then(resolve);
      } else {
        console.warn(`✗ HTTP ${res.statusCode} for ${url}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const item of assets) {
    await download(item.url, item.dest);
  }
  console.log('All downloads completed!');
}

run();
