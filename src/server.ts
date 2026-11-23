import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ExpenseService } from './expenses.js';

const expenses = new ExpenseService();
const html = await readFile(resolve('public/index.html'), 'utf8');

if (process.env.SEED_DEMO_DATA === 'true') {
  const rows = (await readFile(resolve('seed/expenses.csv'), 'utf8')).trim().split(/\r?\n/).slice(1);
  for (const row of rows) {
    const [date, amount, category] = row.split(',');
    if (date && amount && category) expenses.create({ date, amount: Number(amount), category });
  }
}

async function body(request: import('node:http').IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && request.url === '/health') {
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ status: 'ok' }));
      return;
    }
    if (request.method === 'GET' && request.url === '/') {
      response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      response.end(html);
      return;
    }
    if (request.method === 'POST' && request.url === '/expenses') {
      const expense = expenses.create((await body(request)) as Parameters<ExpenseService['create']>[0]);
      response.writeHead(201, { 'content-type': 'application/json' });
      response.end(JSON.stringify(expense));
      return;
    }
    if (request.method === 'GET' && request.url?.startsWith('/summary')) {
      const month = new URL(request.url, 'http://localhost').searchParams.get('month') ?? '';
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify(expenses.summary(month)));
      return;
    }
    response.writeHead(404, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ error: 'Not found' }));
  } catch (error) {
    response.writeHead(422, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid request' }));
  }
});

server.listen(Number(process.env.PORT ?? 3000), process.env.HOST ?? '127.0.0.1');
