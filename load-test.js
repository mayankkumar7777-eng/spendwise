import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 25,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<300'],
    http_req_failed: ['rate<0.01'],
  },
};
export default function () {
  const response = http.get(__ENV.BASE_URL + '/health');
  check(response, { 'health endpoint responds': (r) => r.status === 200 });
}
export function handleSummary(data) {
  return { 'reports/k6-summary.json': JSON.stringify(data, null, 2) };
}
