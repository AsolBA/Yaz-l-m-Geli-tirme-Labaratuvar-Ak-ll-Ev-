/**
 * Ardışık k6 koşuları: K6_TIER=50,100,200,500 (stack ayakta olmalı).
 * Windows / macOS / Linux: node scripts/run-k6-tiers.mjs
 */
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tiers = [50, 100, 200, 500];

for (const t of tiers) {
  console.log(`\n========== K6_TIER=${t} ==========\n`);
  const r = spawnSync('k6', ['run', 'load-test.js'], {
    cwd: root,
    env: { ...process.env, K6_TIER: String(t) },
    stdio: 'inherit'
  });
  if (r.status !== 0) {
    console.error(`k6 K6_TIER=${t} başarısız (kod ${r.status}).`);
    process.exit(r.status ?? 1);
  }
}

console.log('\nTamam. Özet dosyaları: k6-summary-tier-50.json … 500.json\n');
