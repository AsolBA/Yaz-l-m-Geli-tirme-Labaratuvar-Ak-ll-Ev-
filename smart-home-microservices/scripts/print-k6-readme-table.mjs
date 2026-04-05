/**
 * k6-summary-tier-*.json dosyalarından README tablo satırlarını yazdırır.
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tiers = [50, 100, 200, 500];

function pickDuration(metrics) {
  const d =
    metrics['http_req_duration{expected_response:true}']?.values ??
    metrics.http_req_duration?.values;
  return d;
}

const lines = [];
for (const t of tiers) {
  const f = join(root, `k6-summary-tier-${t}.json`);
  if (!existsSync(f)) {
    console.error(`Eksik: ${f}\nÖnce: docker compose up -d && node scripts/run-k6-tiers.mjs`);
    process.exit(1);
  }
  const data = JSON.parse(readFileSync(f, 'utf8'));
  const dur = pickDuration(data.metrics);
  const failRate = (data.metrics.http_req_failed?.values?.rate ?? 0) * 100;
  if (!dur) {
    console.error(`${f}: http_req_duration bulunamadı.`);
    process.exit(1);
  }
  const avg = dur.avg?.toFixed(2) ?? 'n/a';
  const p95 = dur['p(95)']?.toFixed(2) ?? 'n/a';
  const err = failRate.toFixed(2);
  lines.push(`| ${t} | ${avg} | ${p95} | ${err} | Sabit ${t} VU, 90 sn |`);
}

console.log(lines.join('\n'));
