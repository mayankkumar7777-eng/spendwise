# SpendWise

Decide 90% of claims within 2 working days; stop using spreadsheets for claims within 1 month; let an employee submit a claim in under 2 minutes.

Built with ForgeFlow.

## Requirements coverage

This scaffold is not an implementation of the supplied requirements. The entries below
must be implemented and verified before release.

| Requirement | Target | Implementation files | Tests | Status |
| --- | --- | --- | --- | --- |
| FR-01 | Authentication and sessions | - | - | Not verified |
| FR-02 | Submit expense claims | - | - | Not verified |
| FR-03 | Auto-approve small claims | - | - | Not verified |
| FR-04 | Warn about duplicate claims | - | - | Not verified |
| FR-05 | List and filter my claims | - | - | Not verified |
| FR-06 | Edit or delete submitted claims | - | - | Not verified |
| FR-07 | Manager approval queue | - | - | Not verified |
| FR-08 | Claim history | - | - | Not verified |
| FR-09 | Finance monthly reports | - | - | Not verified |
| FR-10 | Export approved claims to CSV | - | - | Not verified |
| FR-11 | Idempotent demo data seeding | - | - | Not verified |
| FR-12 | Health endpoint | - | - | Not verified |
| BR-01 | Amount from 1.00 to 100000.00 inclusive, at most 2 decimals. | - | - | Not verified |
| BR-02 | Claim date must not be in the future (Asia/Kolkata) and not before 2026-01-01. | - | - | Not verified |
| BR-03 | Meals claims cannot exceed 2000.00 each. | - | - | Not verified |
| BR-04 | A receipt is mandatory when the amount is above 2000.00. | - | - | Not verified |
| BR-05 | Auto-approve when amount <= 500.00. | - | - | Not verified |
| BR-06 | Nobody can approve or reject their own claim. | - | - | Not verified |
| BR-07 | Approved or rejected claims cannot be edited or deleted. | - | - | Not verified |
| BR-08 | Rejection needs a comment of at least 5 characters. | - | - | Not verified |
| BR-09 | Duplicate rule as in FR-04. | - | - | Not verified |
| NFR-01 | p95 under 500 ms for claim list, claim submission, and monthly report with 50 concurrent users; error rate under 1%. | - | - | Not verified |
| NFR-02 | Support the stated 50–200 employee company and 50 concurrent users; larger scale is not specified. | - | - | Not verified |
| NFR-03 | 99.5% per month in production, best effort on demo hosting; staging availability is N/A. | - | - | Not verified |
| NFR-04 | OWASP Top 10; Argon2id or bcrypt cost >=12; server-side role checks; HttpOnly/SameSite=Lax/Secure-over-HTTPS session cookies; same-origin checks for state changes; CSP, nosniff, frame-ancestors none, no X-Powered-By; max 10 failed logins/IP/minute; 5 MB body limit; no stack traces; server-generated receipt names. | - | - | Not verified |
| NFR-05 | 0 passwords, tokens, or receipt contents logged; receipts are visible only to the 3 authorized roles (owner, direct manager, Finance). | - | - | Not verified |
| NFR-06 | WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable. | - | - | Not verified |
| NFR-07 | Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes. | - | - | Not verified |
| NFR-08 | English UI; INR with Indian digit grouping; dates DD-MMM-YYYY in UI and ISO 8601 in API; Asia/Kolkata time zone; Unicode text including Hindi, emoji, and accents. | - | - | Not verified |
| NFR-09 | 100% of request logs include a request ID; exactly 1 structured JSON log is emitted per error; /api/health returns status ok. | - | - | Not verified |
| NFR-10 | For demo/UAT, 0 data is retained after redeploy; reset on redeploy is accepted. Production backup/retention duration is not specified and must be confirmed before production. | - | - | Not verified |
| NFR-11 | Support the latest major versions of all 4 specified browsers: Chrome, Edge, Firefox, and Safari. | - | - | Not verified |

## Run

```sh
npm install
cp .env.example .env
npm run build
npm start
```

## Verify

```sh
npm run lint
npm run typecheck
npm test
npm run test:functional
```

## Deploy locally

```sh
docker compose up --build
```

Demo data is synthetic; set `SEED_DEMO_DATA=true` only for local demonstrations.
