# SpendWise — Software Functional Specification (SFS)

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

## 2. Functional overview and workflows

Captured functional requirements:

- FR-01: Login and logout with email and password. Sessions expire after 30 minutes of inactivity. Lock an account for 15 minutes after 5 failed attempts in a row.
- FR-02: Submit a claim with: date, category, amount in INR (max 2 decimals), description (3–200 characters), optional receipt (JPG, PNG or PDF, max 2 MB). Categories: Travel, Meals, Lodging, Office Supplies, Internet & Phone, Training.
- FR-03: Claims of 500.00 or less are auto-approved at submission (decided by "system").
- FR-04: Duplicate warning: if the same employee already has a non-rejected claim with the same date, category and amount, block it with a warning; allow it if the user confirms.
- FR-05: "My claims" list: filter by status, month and category; newest first; 20 per page; show the total amount of the filtered list.
- FR-06: Employees can edit or delete their own claim only while it is Submitted.
- FR-07: Manager queue: pending claims of direct reports; approve, or reject with a comment of at least 5 characters.
- FR-08: Every claim shows its history: created, edited, approved/rejected, by whom, when.
- FR-09: Finance monthly report for a chosen month: approved totals by category, by employee, grand total, number of approved claims, and counts of claims by status.
- FR-10: Finance CSV export of a month's approved claims with columns: claim_id, employee_email, employee_name, date, category, amount, description, approved_by, approved_at. UTF-8. Cells starting with = + - @ are prefixed with ' (CSV injection).
- FR-11: Demo data: when SEED_DEMO_DATA=true, load seed/users.csv, seed/categories.csv and seed/claims.csv at start-up, keeping the given claim IDs (CLM-nnnn). Seeding must be idempotent. New claims continue the CLM-nnnn sequence.
- FR-12: GET /api/health returns {"status":"ok","version":"<semver>"}.

Detailed application workflows must be confirmed during design.

## 3. Roles × permissions matrix

| Capability | Employee | Manager | Finance |
| --- | --- | --- | --- |
| Authentication and sessions | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |
| Submit expense claims | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |
| Auto-approve small claims | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |
| Warn about duplicate claims | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |
| List and filter my claims | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |
| Edit or delete submitted claims | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |
| Manager approval queue | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |
| Claim history | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |
| Finance monthly reports | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |
| Export approved claims to CSV | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |
| Idempotent demo data seeding | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |
| Health endpoint | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |

## 4. Screen specifications

### Screen: Authentication and sessions

- Purpose: Login and logout with email and password. Sessions expire after 30 minutes of inactivity. Lock an account for 15 minutes after 5 failed attempts in a row.
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: Authentication and sessions
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

### Screen: Submit expense claims

- Purpose: Submit a claim with: date, category, amount in INR (max 2 decimals), description (3–200 characters), optional receipt (JPG, PNG or PDF, max 2 MB). Categories: Travel, Meals, Lodging, Office Supplies, Internet & Phone, Training.
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: Submit expense claims
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

### Screen: Auto-approve small claims

- Purpose: Claims of 500.00 or less are auto-approved at submission (decided by "system").
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: Auto-approve small claims
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

### Screen: Warn about duplicate claims

- Purpose: Duplicate warning: if the same employee already has a non-rejected claim with the same date, category and amount, block it with a warning; allow it if the user confirms.
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: Warn about duplicate claims
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

### Screen: List and filter my claims

- Purpose: "My claims" list: filter by status, month and category; newest first; 20 per page; show the total amount of the filtered list.
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: List and filter my claims
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

### Screen: Edit or delete submitted claims

- Purpose: Employees can edit or delete their own claim only while it is Submitted.
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: Edit or delete submitted claims
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

### Screen: Manager approval queue

- Purpose: Manager queue: pending claims of direct reports; approve, or reject with a comment of at least 5 characters.
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: Manager approval queue
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

### Screen: Claim history

- Purpose: Every claim shows its history: created, edited, approved/rejected, by whom, when.
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: Claim history
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

### Screen: Finance monthly reports

- Purpose: Finance monthly report for a chosen month: approved totals by category, by employee, grand total, number of approved claims, and counts of claims by status.
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: Finance monthly reports
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

### Screen: Export approved claims to CSV

- Purpose: Finance CSV export of a month's approved claims with columns: claim_id, employee_email, employee_name, date, category, amount, description, approved_by, approved_at. UTF-8. Cells starting with = + - @ are prefixed with ' (CSV injection).
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: Export approved claims to CSV
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

### Screen: Idempotent demo data seeding

- Purpose: Demo data: when SEED_DEMO_DATA=true, load seed/users.csv, seed/categories.csv and seed/claims.csv at start-up, keeping the given claim IDs (CLM-nnnn). Seeding must be idempotent. New claims continue the CLM-nnnn sequence.
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: Idempotent demo data seeding
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

### Screen: Health endpoint

- Purpose: GET /api/health returns {"status":"ok","version":"<semver>"}.
- Fields (type / validation / error message): Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect.
- Actions: Health endpoint
- Navigation: SpendWise workflow
- Responsive behaviour: Usable at 375 px, 768 px, and 1280 px widths; claim submission under 2 minutes.
- Accessibility notes: WCAG 2.1 AA for login, claim submission, My Claims, manager queue, and reports; fully keyboard operable.

## 5. API contract

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

## 6. Data model

```mermaid
erDiagram
  USERS__NAME { string id }
  EMAIL { string id }
  ROLE { string id }
  ONE_MANAGER_EXCEPT_SANJAY_GUPTA_ { string id }
  CATEGORIES { string id }
  CLAIMS__CLM_NNNN_ID { string id }
  EMPLOYEE { string id }
  DATE { string id }
  CATEGORY { string id }
  INR_AMOUNT { string id }
  DESCRIPTION { string id }
  RECEIPT_METADATA { string id }
  STATUS { string id }
  DECISION_ACTOR_TIME_COMMENT_ { string id }
  CLAIM_HISTORY { string id }
  LOGIN_SESSIONS_AND_FAILED_ATTEMPT_LOCKOUT_STATE { string id }
  MONTHLY_REPORT_AGGREGATES_ { string id }
```

### Field dictionary

Users (name, email, role, one manager except Sanjay Gupta); categories; claims (CLM-nnnn ID, employee, date, category, INR amount, description, receipt metadata, status, decision actor/time/comment); claim history; login sessions and failed-attempt lockout state; monthly report aggregates.

## 7. Business rule implementation details

- BR-01: Amount from 1.00 to 100000.00 inclusive, at most 2 decimals.
- BR-02: Claim date must not be in the future (Asia/Kolkata) and not before 2026-01-01.
- BR-03: Meals claims cannot exceed 2000.00 each.
- BR-04: A receipt is mandatory when the amount is above 2000.00.
- BR-05: Auto-approve when amount <= 500.00.
- BR-06: Nobody can approve or reject their own claim.
- BR-07: Approved or rejected claims cannot be edited or deleted.
- BR-08: Rejection needs a comment of at least 5 characters.
- BR-09: Duplicate rule as in FR-04.

## 8. Error and message catalogue

| Code | Message | HTTP status |
| --- | --- | --- |
| VAL-01 | Use the supplied API contract error envelope and field codes. Validate amount range/precision, date range/time zone, category, description length, meal cap, mandatory receipt, receipt type/size, duplicate confirmation, login lockout, and rejection comment. Never disclose whether an email or password was incorrect. | Architect to define |

## 9. Reports and exports

Finance monthly report for a selected month: approved totals by category and employee, grand total, approved claim count, and counts by claim status. CSV export contains the specified columns, UTF-8 output, and spreadsheet-formula injection protection.

## 10. Deployment pipeline

CI/CD: GitHub Actions; CI stages run unit, functional, load, then security in series.. Branch strategy: Protected main; short-lived feature/fix branches via pull request.. Environments: staging, production. Target: Use local Docker for this end-to-end verification. Cloud Run in asia-south1 is the original target after local validation.; region: asia-south1 for a future Cloud Run deployment; not used by this local Docker run.. Production approver: Repository owner/tester; human approval is required at production gates.. Written staging-scan authorization: Authorize automated ZAP baseline and full scans only against the SpendWise staging URL deployed by this pipeline. No other host is authorized; verify the exact generated staging URL before scanning..

## 11. Test data and UAT approach

Demo-data seeding: When SEED_DEMO_DATA=true, load the supplied seed/users.csv, seed/categories.csv, and seed/claims.csv at startup. Seeding is idempotent, preserves CLM-nnnn IDs, and new claims continue the sequence.

UAT test logins: Use accounts from test-data/target-app/seed/users.csv and the test-only password in that fixture for local UAT only; never reuse these credentials for production.

Integrations: GitHub Actions for CI/CD. No payment, SSO, email, OCR, or native-mobile integrations in V1.

Notifications: Email notifications are explicitly out of scope for V1; no other notification channel is specified.
