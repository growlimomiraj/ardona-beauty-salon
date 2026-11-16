import fs from 'fs';

const iconBase64 = fs.readFileSync('public/images/ardona-icon.png').toString('base64');

const svgHeaderLogo = `<svg width="295" height="52" viewBox="0 0 295 52" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Subtle Gold Rim for Dark Backgrounds -->
  <circle cx="26" cy="26" r="25" fill="#262626" stroke="#C59D5F" stroke-width="1.2" />
  
  <!-- Circular Icon -->
  <image href="data:image/png;base64,${iconBase64}" x="3" y="3" width="46" height="46" />
  
  <!-- Typography matching user logo -->
  <text x="62" y="33" fill="#FFFFFF" font-family="'Montserrat', 'Helvetica Neue', Arial, sans-serif" font-weight="600" font-size="20.5" letter-spacing="0.2">Ardona <tspan fill="#C59D5F" font-weight="600">Beauty Salon</tspan></text>
</svg>`;

fs.writeFileSync('public/icons/ardona-header-logo.svg', svgHeaderLogo);
fs.writeFileSync('public/icons/ardona-footer-logo.svg', svgHeaderLogo);
console.log('Updated refined SVG logos with gold rim and authentic typography!');
