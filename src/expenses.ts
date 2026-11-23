import { randomUUID } from 'node:crypto';

export interface Expense {
  id: string;
  amount: number;
  date: string;
  category: string;
}

export interface NewExpense {
  amount: number;
  date: string;
  category: string;
}

export class ExpenseService {
  private readonly expenses: Expense[] = [];

  create(input: NewExpense): Expense {
    if (!Number.isFinite(input.amount) || input.amount <= 0) {
      throw new Error('Enter a positive amount.');
    }
    if (!input.date.trim()) throw new Error('Choose an expense date.');
    if (!input.category.trim()) throw new Error('Choose an expense category.');
    const expense = { id: randomUUID(), ...input };
    this.expenses.push(expense);
    return expense;
  }

  list(): Expense[] {
    return [...this.expenses];
  }

  summary(month: string): { total: number; byCategory: Record<string, number> } {
    const matching = this.expenses.filter((expense) => expense.date.startsWith(month));
    const byCategory: Record<string, number> = {};
    for (const expense of matching) {
      byCategory[expense.category] = (byCategory[expense.category] ?? 0) + expense.amount;
    }
    return {
      total: matching.reduce((total, expense) => total + expense.amount, 0),
      byCategory,
    };
  }
}

