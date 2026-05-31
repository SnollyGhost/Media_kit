import fs from 'fs';
import path from 'path';

try {
  // 1. Ensure public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
    console.log('Created public/ directory');
  }

  // 2. Copy core brand assets
  const filesToCopy = [
    { src: 'src/assets/logo.png', dest: 'public/logo.png' },
    { src: 'src/assets/creator.png', dest: 'public/creator.png' },
    { src: 'src/assets/bybit.jpg', dest: 'public/bybit.jpg' },
    { src: 'src/assets/hawi.png', dest: 'public/hawi.png' },
    { src: 'src/assets/huluPay.png', dest: 'public/huluPay.png' },
    { src: 'src/assets/EhudAI.png', dest: 'public/EhudAI.png' },
    { src: 'src/assets/auction_ethiopia.svg', dest: 'public/auction_ethiopia.svg' }
  ];

  // Clean up any lingering webp files in public/ to avoid confusion
  const legacyWebps = [
    'public/logo.webp',
    'public/creator.webp',
    'public/bybit.webp',
    'public/hawi.webp',
    'public/huluPay.webp',
    'public/EhudAI.webp'
  ];
  for (const file of legacyWebps) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`Cleaned up obsolete public asset: ${file}`);
    }
  }

  for (const item of filesToCopy) {
    if (fs.existsSync(item.src)) {
      fs.copyFileSync(item.src, item.dest);
      console.log(`Copied ${item.src} -> ${item.dest}`);
    } else {
      console.warn(`Source not found: ${item.src}`);
    }
  }

  console.log('Static asset deployment scripting complete.');
} catch (e) {
  console.error('Error during asset copy:', e.message);
}
