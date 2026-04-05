/**
 * k6 yük testi — PDF isteri: 50 / 100 / 200 / 500 eşzamanlı kullanıcı kademeleri.
 *
 * Önkoşul: stack ayakta (docker compose up), gateway http://localhost:3000
 *
 * Sadece konsol özeti:
 *   k6 run load-test.js
 *
 * Metrikleri InfluxDB'ye yaz (Grafana dashboard: http://localhost:3005, admin/admin):
 *   k6 run --out influxdb=http://localhost:8086/k6 load-test.js
 *
 * Özet JSON (rapor için): test bitince k6-summary.json oluşur (Influx modunda da).
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 200 },
    { duration: '1m', target: 200 },
    { duration: '30s', target: 500 },
    { duration: '1m', target: 500 },
    { duration: '30s', target: 0 }
  ],
  thresholds: {
    http_req_failed: ['rate<0.10'],
    http_req_duration: ['p(95)<5000']
  }
};

export function handleSummary(data) {
  return {
    'k6-summary.json': JSON.stringify(data, null, 2),
    stdout: defaultTextSummary(data)
  };
}

function defaultTextSummary(data) {
  const lines = [
    '\n=== k6 özeti ===',
    `http_reqs: ${data.metrics.http_reqs?.values?.count ?? 'n/a'}`,
    `http_req_failed: ${data.metrics.http_req_failed?.values?.rate?.toFixed(4) ?? 'n/a'} (oran)`,
    `http_req_duration p(95): ${data.metrics.http_req_duration?.values?.['p(95)']?.toFixed(2) ?? 'n/a'} ms`,
    `iteration_duration avg: ${data.metrics.iteration_duration?.values?.avg?.toFixed(2) ?? 'n/a'} ms`,
    '================\n'
  ];
  return lines.join('\n');
}

export default function () {
  const loginRes = http.post(
    'http://localhost:3000/api/auth/login',
    JSON.stringify({
      username: 'admin1',
      password: '123456'
    }),
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );

  const loginOk = check(loginRes, {
    'login 200': (r) => r.status === 200
  });

  if (!loginOk || loginRes.status !== 200) {
    return;
  }

  let token;
  try {
    const body = JSON.parse(loginRes.body);
    token = body.token;
  } catch {
    return;
  }

  if (!token) {
    return;
  }

  const devicesRes = http.get('http://localhost:3000/api/devices', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  check(devicesRes, {
    'devices 200': (r) => r.status === 200
  });

  sleep(0.3);
}
