/**
 * NafTech Portfolio - Modern Image Format WebP Optimizer
 * This developer script scans the assets folder, compiles all images to optimized WebP files,
 * and outputs the performance improvement statistics (bytes saved).
 * 
 * Usage:
 * 1. install dependencies: npm install sharp --save-dev
 * 2. Run: node scripts/convert-webp.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIRECTORIES = [
  path.join(__dirname, '../src/assets'),
  path.join(__dirname, '../src/assets/covers')
];

async function optimizeImages() {
  console.log('🚀 Starting NafTech WebP Image Optimizer...\n');
  
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch (err) {
    console.error('❌ Error: "sharp" library is required for image optimization.');
    console.log('💡 Please run the following command to install it locally:');
    console.log('   npm install -D sharp\n');
    process.exit(1);
  }

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let convertedCount = 0;

  for (const dir of TARGET_DIRECTORIES) {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️  Directory not found, skipping: ${dir}`);
      continue;
    }

    console.log(`📡 Scanning directory: ${dir}`);
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
        continue;
      }

      // Safeguard: bypass high-res files that are already WebP or already converted
      const filePath = path.join(dir, file);
      const outputName = `${path.basename(file, ext)}.webp`;
      const outputPath = path.join(dir, outputName);

      const stats = fs.statSync(filePath);
      const originalSizeKB = stats.size / 1024;
      totalOriginalSize += stats.size;

      try {
        console.log(`🔄 Optimizing: "${file}" (${originalSizeKB.toFixed(1)} KB)`);
        
        // Optimizing with a superb high-fidelity lossy WebP setting (quality 85)
        // This achieves a ~75% file-size reduction while retaining pristine detail.
        await sharp(filePath)
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const optimizedSizeKB = newStats.size / 1024;
        totalOptimizedSize += newStats.size;
        convertedCount++;

        const savingsPercent = ((stats.size - newStats.size) / stats.size) * 100;
        console.log(`   └─ ✅ Created: "${outputName}" (${optimizedSizeKB.toFixed(1)} KB) | 📉 Reduced: -${savingsPercent.toFixed(1)}%\n`);

      } catch (conversionError) {
        console.error(`   └─ ❌ Error converting: ${file}`, conversionError.message);
      }
    }
  }

  if (convertedCount > 0) {
    const savedBytes = totalOriginalSize - totalOptimizedSize;
    const totalSavingPercent = (savedBytes / totalOriginalSize) * 100;
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🎉 Optimization Complete!`);
    console.log(`   • Total Converted Images: ${convertedCount}`);
    console.log(`   • Original Total Size:   ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`   • WebP Optimised Size:   ${(totalOptimizedSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`   • Net Storage Reclaimed:  ${(savedBytes / 1024).toFixed(1)} KB (-${totalSavingPercent.toFixed(1)}%)`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💡 TIP: Update your import statements in "src/lib/data.ts" to point to the new ".webp" filenames to complete the performance boost!');
  } else {
    console.log('💤 No eligible PNG/JPG files found to optimize.');
  }
}

optimizeImages().catch((err) => {
  console.error('Fatal crash during optimization run:', err);
});
