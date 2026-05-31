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
    { src: 'src/assets/logo.webp', dest: 'public/logo.webp' },
    { src: 'src/assets/creator.webp', dest: 'public/creator.webp' },
    { src: 'src/assets/bybit.webp', dest: 'public/bybit.webp' },
    { src: 'src/assets/hawi.webp', dest: 'public/hawi.webp' },
    { src: 'src/assets/huluPay.webp', dest: 'public/huluPay.webp' },
    { src: 'src/assets/EhudAI.webp', dest: 'public/EhudAI.webp' }
  ];

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
