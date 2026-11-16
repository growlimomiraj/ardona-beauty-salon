import fs from 'fs';
import path from 'path';

const trimmedPngPath = 'public/images/ardona-official-logo.png';
const trimmedIconPath = 'public/images/ardona-official-icon.png';

const logoBase64 = fs.readFileSync(trimmedPngPath).toString('base64');
const iconBase64 = fs.readFileSync(trimmedIconPath).toString('base64');

// Aspect ratio is 921 x 244
// Let's create an SVG that embeds the exact pixel data at native 921x244 viewBox
const svgContent = `<svg width="226" height="60" viewBox="0 0 921 244" fill="none" xmlns="http://www.w3.org/2000/svg">
  <image href="data:image/png;base64,${logoBase64}" x="0" y="0" width="921" height="244" />
</svg>
`;

fs.writeFileSync('public/icons/ardona-header-logo.svg', svgContent);
fs.writeFileSync('public/icons/ardona-footer-logo.svg', svgContent);
fs.copyFileSync(trimmedPngPath, 'public/images/ardona-logo-dark.png');
fs.copyFileSync(trimmedIconPath, 'public/images/ardona-icon.png');

console.log('Successfully updated ardona-header-logo.svg, ardona-footer-logo.svg, and icon assets!');
