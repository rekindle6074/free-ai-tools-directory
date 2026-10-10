import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const publicDir = path.resolve('public');
const distDir = path.resolve('dist');

async function run() {
  const masterSvgPath = path.join(publicDir, 'logo.svg');
  if (!fs.existsSync(masterSvgPath)) {
    console.error('public/logo.svg not found');
    process.exit(1);
  }
  const masterSvg = fs.readFileSync(masterSvgPath, 'utf-8');

  // Also sync logo.svg to dist
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'logo.svg'), masterSvg, 'utf-8');
  }

  // 1. Generate master logo.png (512x512)
  console.log('Generating public/logo.png (512x512)...');
  await sharp(Buffer.from(masterSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'logo.png'));

  // 2. Favicon optimized high-contrast on dark background (#0a0f0d)
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <rect width="512" height="512" rx="96" fill="#0a0f0d" />
    <g transform="translate(25.6, 25.6) scale(0.9)">
      ${masterSvg.replace(/<svg[^>]*>|<\/svg>/gi, '')}
    </g>
  </svg>`;

  console.log('Generating favicon-16x16.png and favicon-32x32.png...');
  await sharp(Buffer.from(faviconSvg))
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  // 3. Apple Touch Icon (180x180) on clean white background #ffffff
  const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <rect width="512" height="512" fill="#ffffff" />
    <g transform="translate(38.4, 38.4) scale(0.85)">
      ${masterSvg.replace(/<svg[^>]*>|<\/svg>/gi, '')}
    </g>
  </svg>`;

  console.log('Generating apple-touch-icon.png (180x180)...');
  await sharp(Buffer.from(appleSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  fs.copyFileSync(
    path.join(publicDir, 'apple-touch-icon.png'),
    path.join(publicDir, 'apple-touch-icon-precomposed.png')
  );

  // 4. Android Chrome / Maskable Icons (192x192 and 512x512) on #ffffff with safe zone
  const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <rect width="512" height="512" fill="#ffffff" />
    <g transform="translate(51.2, 51.2) scale(0.8)">
      ${masterSvg.replace(/<svg[^>]*>|<\/svg>/gi, '')}
    </g>
  </svg>`;

  console.log('Generating android-chrome-192x192.png and 512x512.png...');
  await sharp(Buffer.from(maskableSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'android-chrome-512x512.png'));

  // 5. Windows Tile (150x150)
  console.log('Generating mstile-150x150.png...');
  await sharp(Buffer.from(appleSvg))
    .resize(150, 150)
    .png()
    .toFile(path.join(publicDir, 'mstile-150x150.png'));

  // 6. Favicon.ico multi-frame (16, 32, 48)
  console.log('Generating favicon.ico multi-frame (16, 32, 48)...');
  const temp48 = path.join(publicDir, 'favicon-48x48.tmp.png');
  await sharp(Buffer.from(faviconSvg))
    .resize(48, 48)
    .png()
    .toFile(temp48);

  execSync(`convert "${path.join(publicDir, 'favicon-16x16.png')}" "${path.join(publicDir, 'favicon-32x32.png')}" "${temp48}" "${path.join(publicDir, 'favicon.ico')}"`);
  fs.unlinkSync(temp48);

  // Sync all to dist if dist exists
  if (fs.existsSync(distDir)) {
    const assets = [
      'favicon.ico',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'apple-touch-icon.png',
      'apple-touch-icon-precomposed.png',
      'android-chrome-192x192.png',
      'android-chrome-512x512.png',
      'mstile-150x150.png',
      'logo.png',
      'logo.svg'
    ];
    for (const a of assets) {
      const src = path.join(publicDir, a);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(distDir, a));
      }
    }
  }

  console.log('ALL RASTER ASSETS REGENERATED SUCCESSFULLY FROM MASTER LOGO!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
