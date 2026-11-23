import { test, expect } from '@playwright/test';

test('records an expense', async ({ request }) => {
  const response = await request.post('/expenses', {
    data: { amount: 12.5, date: '2026-01-10', category: 'Food' },
  });
  expect(response.status()).toBe(201);
  expect(await response.json()).toMatchObject({ amount: 12.5, category: 'Food' });
});

test('returns monthly spending by category', async ({ request }) => {
  const response = await request.get('/summary?month=2026-01');
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toHaveProperty('byCategory');
});
