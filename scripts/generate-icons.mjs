import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, 'icon-source.svg');
const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

const sizes = [192, 512];
for (const size of sizes) {
  await sharp(src).resize(size, size).png().toFile(join(outDir, `icon-${size}.png`));
}
// Maskable version with extra padding so platforms can safely crop to a circle.
await sharp(src)
  .resize(410, 410)
  .extend({ top: 51, bottom: 51, left: 51, right: 51, background: '#176f64' })
  .png()
  .toFile(join(outDir, 'icon-maskable-512.png'));

await sharp(src).resize(180, 180).png().toFile(join(__dirname, '..', 'public', 'apple-touch-icon.png'));

console.log('Icons generated in public/icons and public/apple-touch-icon.png');
