import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const loginRes = http.post('http://localhost:3001/auth/login', JSON.stringify({
    username: 'admin1',
    password: '123456'
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  if (loginRes.status !== 200) {
    return;
  }

  const body = JSON.parse(loginRes.body);

  if (!body.token) {
    return;
  }

  const token = body.token;

  http.get('http://localhost:3000/api/devices', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  sleep(1);
}