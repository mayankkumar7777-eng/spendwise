# SpendWise — Software Requirements Specification (SRS)

## 1. Document control

| Field | Value |
| --- | --- |
| Version | v1.0 |
| Date | 2026-11-23T03:14:11.285Z |
| Status | Approved |
| Approver | mayankkumar7777-eng |

Change log

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| v1.0 | 2026-11-23 | BA agent | Initial draft |

## 2. Introduction

### Purpose

Define testable requirements for SpendWise.

### Scope

V1 includes login; submit, edit, and delete claims with optional receipts; direct-manager approval; auto-approval of small claims; duplicate warnings; claim history; Finance monthly reports and CSV export; demo data.

### Definitions

Employees, their direct managers, and Finance in companies of 50–200 people.

### References (BRD)

BRD vv1.0.

## 3. Overall description

### Product perspective

Expense claims are handled by email and spreadsheets; approvals take about a week, receipts get lost, and Finance re-types claim data for payroll.

### User classes

Employee: Submits and manages own claims.

Manager: An Employee who also manages direct reports.

Finance: Finance reporting user.

### Operating environment

Use local Docker for this end-to-end verification. Cloud Run in asia-south1 is the original target after local validation.; region asia-south1 for a future Cloud Run deployment; not used by this local Docker run..

### Design constraints

One reviewer/approver: the repository owner/tester.; deadline Demo-ready in 2 weeks.; budget Hosting budget under USD 20 per month..

### Assumptions

None recorded.

## 4. Functional requirements

### FR-01 — Authentication and sessions

- Description: Login and logout with email and password. Sessions expire after 30 minutes of inactivity. Lock an account for 15 minutes after 5 failed attempts in a row.
- Priority (MoSCoW): Must
- User story: Login and logout with email and password. Sessions expire after 30 minutes of inactivity. Lock an account for 15 minutes after 5 failed attempts in a row.
- Acceptance criteria:
  - AC-01.1 Given A Employee UAT user is signed in with the supplied demo dataset. When Open the app URL, log in Then Lands on My Claims; name 'Rahul Sharma' shown
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

### FR-02 — Submit expense claims

- Description: Submit a claim with: date, category, amount in INR (max 2 decimals), description (3–200 characters), optional receipt (JPG, PNG or PDF, max 2 MB). Categories: Travel, Meals, Lodging, Office Supplies, Internet & Phone, Training.
- Priority (MoSCoW): Must
- User story: Submit a claim with: date, category, amount in INR (max 2 decimals), description (3–200 characters), optional receipt (JPG, PNG or PDF, max 2 MB). Categories: Travel, Meals, Lodging, Office Supplies, Internet & Phone, Training.
- Acceptance criteria:
  - AC-02.1 Given A Employee UAT user is signed in with the supplied demo dataset. When Submit claim VAL-02 Then Saved; status Approved; decided by 'system'
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

### FR-03 — Auto-approve small claims

- Description: Claims of 500.00 or less are auto-approved at submission (decided by "system").
- Priority (MoSCoW): Must
- User story: Claims of 500.00 or less are auto-approved at submission (decided by "system").
- Acceptance criteria:
  - AC-03.1 Given A Employee UAT user is signed in with the supplied demo dataset. When Submit claim VAL-02 Then Saved; status Approved; decided by 'system'
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

### FR-04 — Warn about duplicate claims

- Description: Duplicate warning: if the same employee already has a non-rejected claim with the same date, category and amount, block it with a warning; allow it if the user confirms.
- Priority (MoSCoW): Must
- User story: Duplicate warning: if the same employee already has a non-rejected claim with the same date, category and amount, block it with a warning; allow it if the user confirms.
- Acceptance criteria:
  - AC-04.1 Given A Employee UAT user is signed in with the supplied demo dataset. When Submit INV-17; when warned, choose 'Submit anyway' Then Warning about possible duplicate of CLM-0019; after confirming, saved
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

### FR-05 — List and filter my claims

- Description: "My claims" list: filter by status, month and category; newest first; 20 per page; show the total amount of the filtered list.
- Priority (MoSCoW): Must
- User story: "My claims" list: filter by status, month and category; newest first; 20 per page; show the total amount of the filtered list.
- Acceptance criteria:
  - AC-05.1 Given A Employee UAT user is signed in with the supplied demo dataset. When My Claims → filter Month = Oct 2026, Status = All Then 3 claims; total shown ₹3519.14 (Indian format)
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

### FR-06 — Edit or delete submitted claims

- Description: Employees can edit or delete their own claim only while it is Submitted.
- Priority (MoSCoW): Must
- User story: Employees can edit or delete their own claim only while it is Submitted.
- Acceptance criteria:
  - AC-06.1 Given A Employee UAT user is signed in with the supplied demo dataset. When Edit the VAL-05 claim amount to 2100.00; then delete VAL-08 Then Edit saved and history shows the change; delete removes the claim
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

### FR-07 — Manager approval queue

- Description: Manager queue: pending claims of direct reports; approve, or reject with a comment of at least 5 characters.
- Priority (MoSCoW): Must
- User story: Manager queue: pending claims of direct reports; approve, or reject with a comment of at least 5 characters.
- Acceptance criteria:
  - AC-07.1 Given A Manager UAT user is signed in with the supplied demo dataset. When Approve the VAL-04 claim Then Status Approved; decided by Ananya Rao; Rahul sees it
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

### FR-08 — Claim history

- Description: Every claim shows its history: created, edited, approved/rejected, by whom, when.
- Priority (MoSCoW): Must
- User story: Every claim shows its history: created, edited, approved/rejected, by whom, when.
- Acceptance criteria:
  - AC-08.1 Given A Employee UAT user is signed in with the supplied demo dataset. When Open the VAL-03 claim after Ananya rejected it Then History lists Created, Rejected by Ananya Rao with timestamp and comment
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

### FR-09 — Finance monthly reports

- Description: Finance monthly report for a chosen month: approved totals by category, by employee, grand total, number of approved claims, and counts of claims by status.
- Priority (MoSCoW): Must
- User story: Finance monthly report for a chosen month: approved totals by category, by employee, grand total, number of approved claims, and counts of claims by status.
- Acceptance criteria:
  - AC-09.1 Given A Finance UAT user is signed in with the supplied demo dataset. When Reports → Month = Sep 2026 (before any UAT changes to September) Then Approved total ₹63795.15; approved count 26; per-category totals match expected_results.json
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

### FR-10 — Export approved claims to CSV

- Description: Finance CSV export of a month's approved claims with columns: claim_id, employee_email, employee_name, date, category, amount, description, approved_by, approved_at. UTF-8. Cells starting with = + - @ are prefixed with ' (CSV injection).
- Priority (MoSCoW): Must
- User story: Finance CSV export of a month's approved claims with columns: claim_id, employee_email, employee_name, date, category, amount, description, approved_by, approved_at. UTF-8. Cells starting with = + - @ are prefixed with ' (CSV injection).
- Acceptance criteria:
  - AC-10.1 Given A Finance UAT user is signed in with the supplied demo dataset. When Export Oct 2026 CSV and open it in a spreadsheet Then 25 data rows; columns claim_id, employee_email, employee_name, date, category, amount, description, approved_by, approved_at; Hindi text readable (UTF-8)
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

### FR-11 — Idempotent demo data seeding

- Description: Demo data: when SEED_DEMO_DATA=true, load seed/users.csv, seed/categories.csv and seed/claims.csv at start-up, keeping the given claim IDs (CLM-nnnn). Seeding must be idempotent. New claims continue the CLM-nnnn sequence.
- Priority (MoSCoW): Must
- User story: Demo data: when SEED_DEMO_DATA=true, load seed/users.csv, seed/categories.csv and seed/claims.csv at start-up, keeping the given claim IDs (CLM-nnnn). Seeding must be idempotent. New claims continue the CLM-nnnn sequence.
- Acceptance criteria:
  - AC-11.1 Given A Admin/tester UAT user is signed in with the supplied demo dataset. When Redeploy staging and log in again Then Seeded users and claims present exactly once (seeding is idempotent)
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

### FR-12 — Health endpoint

- Description: GET /api/health returns {"status":"ok","version":"<semver>"}.
- Priority (MoSCoW): Must
- User story: GET /api/health returns {"status":"ok","version":"<semver>"}.
- Acceptance criteria:
  - AC-12.1 Given A Anyone UAT user is signed in with the supplied demo dataset. When Open <app-url>/api/health Then {"status":"ok","version":"1.0.0"} or later version
- Related BR: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09

## 5. Non-functional requirements

| ID | Category | Measurable target | Verification method |
| --- | --- | --- | --- |
| NFR-01 | Performance (latency, throughput, concurrent users) | p95 under 500 ms for claim list, claim submission, and monthly report with 50 concurrent users; error rate under 1%. | Automated or manual verification |
| NFR-02 | Scalability | Support the stated 50–200 employee company and 50 concurrent users; larger scale is not specified. | Automated or manual verification |
| NFR-03 | Availability | 99.5% per month in production, best effort on demo hosting; staging availability is N/A. | Automated or manual verification |
| NFR-04 | Security (authN/authZ, OWASP Top 10, data protection) | OWASP Top 10; Argon2id or bcrypt cost >=12; server-side role checks; HttpOnly/SameSite=Lax/Secure-over-HTTPS session cookies; same-origin checks for state changes; CSP, nosniff, frame-ancestors none, no X-Powered-By; max 10 failed logins/IP/minute; 5 MB body limit; no stack traces; server-generated receipt names. | Automated or manual verification |
| NFR-05 | Privacy and compliance | 0 passwords, tokens, or receipt contents logged; receipts are visible only to the 3 authorized roles (owner, direct manager, Finance). | Automated or manual verification |
| NFR-06 | Accessibility (WCAG level) | WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable. | Automated or manual verification |
| NFR-07 | Usability and responsive breakpoints | Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes. | Automated or manual verification |
| NFR-08 | Localisation, currency and time zone | English UI; INR with Indian digit grouping; dates DD-MMM-YYYY in UI and ISO 8601 in API; Asia/Kolkata time zone; Unicode text including Hindi, emoji, and accents. | Automated or manual verification |
| NFR-09 | Observability | 100% of request logs include a request ID; exactly 1 structured JSON log is emitted per error; /api/health returns status ok. | Automated or manual verification |
| NFR-10 | Data retention and backup | For demo/UAT, 0 data is retained after redeploy; reset on redeploy is accepted. Production backup/retention duration is not specified and must be confirmed before production. | Automated or manual verification |
| NFR-11 | Browser support | Support the latest major versions of all 4 specified browsers: Chrome, Edge, Firefox, and Safari. | Automated or manual verification |

## 6. External interfaces

### UI

- Authentication and sessions
- Submit expense claims
- Auto-approve small claims
- Warn about duplicate claims
- List and filter my claims
- Edit or delete submitted claims
- Manager approval queue
- Claim history
- Finance monthly reports
- Export approved claims to CSV
- Idempotent demo data seeding
- Health endpoint

### API

```text
POST   /api/auth/login            {email,password} -> 200 user + HttpOnly session cookie
                                   401 INVALID_CREDENTIALS, 423 ACCOUNT_LOCKED
POST   /api/auth/logout           -> 204
GET    /api/me                    -> current user
GET    /api/claims?status=&month=YYYY-MM&category=&page=
                                   -> {items,total,page,pageSize,sumAmount}
POST   /api/claims                JSON, or multipart/form-data when a receipt is attached:
                                   date, category, amount, description, receipt?, confirmDuplicate?
                                   -> 201 claim | 422 VALIDATION_FAILED | 409 DUPLICATE_CLAIM
GET    /api/claims/{id}           -> claim + history (403/404 if not allowed)
PATCH  /api/claims/{id}           -> 200 | 409 CLAIM_LOCKED
DELETE /api/claims/{id}           -> 204 | 409 CLAIM_LOCKED
GET    /api/claims/{id}/receipt   -> file (owner, their manager, finance only)
GET    /api/team/claims?status=Submitted -> manager queue
POST   /api/claims/{id}/approve   -> 200 | 403 FORBIDDEN | 403 SELF_APPROVAL_NOT_ALLOWED | 409 CLAIM_LOCKED
POST   /api/claims/{id}/reject    {comment} -> 200 | 422 COMMENT_REQUIRED
GET    /api/reports/monthly?month=YYYY-MM -> {month, byCategory[], byEmployee[], statusCounts,
                                   grandTotal, approvedCount}
GET    /api/reports/monthly.csv?month=YYYY-MM -> text/csv
GET    /api/health

Error body: {"error":{"code":"...","message":"...","fields":[{"field":"amount","code":"AMOUNT_OUT_OF_RANGE","message":"..."}]}}
Field codes: AMOUNT_INVALID, AMOUNT_OUT_OF_RANGE, AMOUNT_PRECISION, DATE_INVALID,
DATE_IN_FUTURE, DATE_BEFORE_POLICY_START, INVALID_CATEGORY, DESCRIPTION_LENGTH,
MEALS_LIMIT_EXCEEDED, RECEIPT_REQUIRED, FILE_TOO_LARGE, FILE_TYPE_NOT_ALLOWED.
Other codes: UNAUTHENTICATED (401), FORBIDDEN (403), NOT_FOUND (404).
Money in JSON is a string with 2 decimals, e.g. "1234.50".
```

### Integrations

GitHub Actions for CI/CD. No payment, SSO, email, OCR, or native-mobile integrations in V1.

## 7. Data requirements

Entities: Users (name, email, role, one manager except Sanjay Gupta); categories; claims (CLM-nnnn ID, employee, date, category, INR amount, description, receipt metadata, status, decision actor/time/comment); claim history; login sessions and failed-attempt lockout state; monthly report aggregates.

Retention and privacy: For demo/UAT, 0 data is retained after redeploy; reset on redeploy is accepted. Production backup/retention duration is not specified and must be confirmed before production.; 0 passwords, tokens, or receipt contents logged; receipts are visible only to the 3 authorized roles (owner, direct manager, Finance)..

## 8. Deployment and environment requirements

CI/CD: GitHub Actions; CI stages run unit, functional, load, then security in series.. Branch strategy: Protected main; short-lived feature/fix branches via pull request.. Environments: staging, production. Target: Use local Docker for this end-to-end verification. Cloud Run in asia-south1 is the original target after local validation., region asia-south1 for a future Cloud Run deployment; not used by this local Docker run.. Production approval: Repository owner/tester; human approval is required at production gates..

## 9. Traceability matrix

| Requirement | Acceptance criteria | Test type (unit / functional / load / security / manual) | Test ID |
| --- | --- | --- | --- |
| FR-01 | AC-01.1 | functional | TEST-AC-01-1 |
| FR-02 | AC-02.1 | functional | TEST-AC-02-1 |
| FR-03 | AC-03.1 | functional | TEST-AC-03-1 |
| FR-04 | AC-04.1 | functional | TEST-AC-04-1 |
| FR-05 | AC-05.1 | functional | TEST-AC-05-1 |
| FR-06 | AC-06.1 | functional | TEST-AC-06-1 |
| FR-07 | AC-07.1 | functional | TEST-AC-07-1 |
| FR-08 | AC-08.1 | functional | TEST-AC-08-1 |
| FR-09 | AC-09.1 | functional | TEST-AC-09-1 |
| FR-10 | AC-10.1 | functional | TEST-AC-10-1 |
| FR-11 | AC-11.1 | functional | TEST-AC-11-1 |
| FR-12 | AC-12.1 | functional | TEST-AC-12-1 |
| BR-01 | N/A — business rule | manual | TEST-BR-01 |
| BR-02 | N/A — business rule | manual | TEST-BR-02 |
| BR-03 | N/A — business rule | manual | TEST-BR-03 |
| BR-04 | N/A — business rule | manual | TEST-BR-04 |
| BR-05 | N/A — business rule | manual | TEST-BR-05 |
| BR-06 | N/A — business rule | manual | TEST-BR-06 |
| BR-07 | N/A — business rule | manual | TEST-BR-07 |
| BR-08 | N/A — business rule | manual | TEST-BR-08 |
| BR-09 | N/A — business rule | manual | TEST-BR-09 |
| NFR-01 | N/A | load | TEST-NFR-01 |
| NFR-02 | N/A | load | TEST-NFR-02 |
| NFR-03 | N/A | manual | TEST-NFR-03 |
| NFR-04 | N/A | security | TEST-NFR-04 |
| NFR-05 | N/A | security | TEST-NFR-05 |
| NFR-06 | N/A | manual | TEST-NFR-06 |
| NFR-07 | N/A | manual | TEST-NFR-07 |
| NFR-08 | N/A | manual | TEST-NFR-08 |
| NFR-09 | N/A | manual | TEST-NFR-09 |
| NFR-10 | N/A | manual | TEST-NFR-10 |
| NFR-11 | N/A | manual | TEST-NFR-11 |

## 10. Open questions and change requests

| ID | Type (question / CR) | Description | Status |
| --- | --- | --- | --- |
| OQ-01 | question | Confirm production data retention and backup requirements beyond the UAT/demo reset behavior before production use. | Open |
