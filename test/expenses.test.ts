import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ExpenseService } from '../src/expenses.js';

describe('SpendWise requirements', () => {
  it('saves a valid expense and rejects a non-positive amount', () => {
    const service = new ExpenseService();
    assert.equal(service.create({ amount: 10, date: '2026-01-05', category: 'Food' }).amount, 10);
    assert.throws(() => service.create({ amount: 0, date: '2026-01-05', category: 'Food' }), /positive amount/);
  });

  it('summarizes monthly totals by category', () => {
    const service = new ExpenseService();
    service.create({ amount: 10, date: '2026-01-05', category: 'Food' });
    service.create({ amount: 5, date: '2026-01-06', category: 'Travel' });
    service.create({ amount: 8, date: '2025-12-31', category: 'Food' });
    assert.deepEqual(service.summary('2026-01'), {
      total: 15,
      byCategory: { Food: 10, Travel: 5 },
    });
  });

  it('requires amount greater than zero and a valid date/category', () => {
    const service = new ExpenseService();
    assert.throws(() => service.create({ amount: 1, date: '', category: 'Food' }), /expense date/);
    assert.throws(() => service.create({ amount: 1, date: '2026-01-01', category: '' }), /category/);
  });

  it('returns a copy of the saved expenses', () => {
    const service = new ExpenseService();
    service.create({ amount: 3, date: '2026-01-01', category: 'Food' });
    const listed = service.list();
    assert.equal(listed.length, 1);
    listed.pop();
    assert.equal(service.list().length, 1);
  });
});
