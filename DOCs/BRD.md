# SpendWise — Business Requirements Document (BRD)

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

## 2. Executive summary

Decide 90% of claims within 2 working days; stop using spreadsheets for claims within 1 month; let an employee submit a claim in under 2 minutes.

## 3. Business problem and opportunity

Expense claims are handled by email and spreadsheets; approvals take about a week, receipts get lost, and Finance re-types claim data for payroll.

## 4. Business objectives and success metrics

| KPI | Baseline | Target | Measured by |
| --- | --- | --- | --- |
| At least 90% of claims decided within 2 working days; Finance stops using claim spreadsheets within 1 month; claim submission takes under 2 minutes. | Not provided | At least 90% of claims decided within 2 working days; Finance stops using claim spreadsheets within 1 month; claim submission takes under 2 minutes. | At least 90% of claims decided within 2 working days; Finance stops using claim spreadsheets within 1 month; claim submission takes under 2 minutes. |

## 5. Scope

### In scope

V1 includes login; submit, edit, and delete claims with optional receipts; direct-manager approval; auto-approval of small claims; duplicate warnings; claim history; Finance monthly reports and CSV export; demo data.

### Out of scope

V1 excludes reimbursement payments, multiple currencies, SSO, email notifications, receipt OCR, and native mobile apps.

## 6. Stakeholders and users

| Persona / role | Description | Goals |
| --- | --- | --- |
| Employee | Submits and manages own claims. | May view, submit, edit, and delete own claims; edit/delete only while Submitted. Cannot view other employees’ claims. |
| Manager | An Employee who also manages direct reports. | All Employee permissions for own claims, plus approve/reject claims of direct reports only. Cannot approve or reject own claims. Every user except Sanjay Gupta has exactly one manager. |
| Finance | Finance reporting user. | Read-only access to all claims, monthly reports, and CSV export. Cannot approve, edit, or delete claims. |

## 7. High-level business requirements

| ID | Requirement | Priority (MoSCoW) |
| --- | --- | --- |
| FR-01 | Login and logout with email and password. Sessions expire after 30 minutes of inactivity. Lock an account for 15 minutes after 5 failed attempts in a row. | Must |
| FR-02 | Submit a claim with: date, category, amount in INR (max 2 decimals), description (3–200 characters), optional receipt (JPG, PNG or PDF, max 2 MB). Categories: Travel, Meals, Lodging, Office Supplies, Internet & Phone, Training. | Must |
| FR-03 | Claims of 500.00 or less are auto-approved at submission (decided by "system"). | Must |
| FR-04 | Duplicate warning: if the same employee already has a non-rejected claim with the same date, category and amount, block it with a warning; allow it if the user confirms. | Must |
| FR-05 | "My claims" list: filter by status, month and category; newest first; 20 per page; show the total amount of the filtered list. | Must |
| FR-06 | Employees can edit or delete their own claim only while it is Submitted. | Must |
| FR-07 | Manager queue: pending claims of direct reports; approve, or reject with a comment of at least 5 characters. | Must |
| FR-08 | Every claim shows its history: created, edited, approved/rejected, by whom, when. | Must |
| FR-09 | Finance monthly report for a chosen month: approved totals by category, by employee, grand total, number of approved claims, and counts of claims by status. | Must |
| FR-10 | Finance CSV export of a month's approved claims with columns: claim_id, employee_email, employee_name, date, category, amount, description, approved_by, approved_at. UTF-8. Cells starting with = + - @ are prefixed with ' (CSV injection). | Must |
| FR-11 | Demo data: when SEED_DEMO_DATA=true, load seed/users.csv, seed/categories.csv and seed/claims.csv at start-up, keeping the given claim IDs (CLM-nnnn). Seeding must be idempotent. New claims continue the CLM-nnnn sequence. | Must |
| FR-12 | GET /api/health returns {"status":"ok","version":"<semver>"}. | Must |

## 8. Business rules

- BR-01: Amount from 1.00 to 100000.00 inclusive, at most 2 decimals.
- BR-02: Claim date must not be in the future (Asia/Kolkata) and not before 2026-01-01.
- BR-03: Meals claims cannot exceed 2000.00 each.
- BR-04: A receipt is mandatory when the amount is above 2000.00.
- BR-05: Auto-approve when amount <= 500.00.
- BR-06: Nobody can approve or reject their own claim.
- BR-07: Approved or rejected claims cannot be edited or deleted.
- BR-08: Rejection needs a comment of at least 5 characters.
- BR-09: Duplicate rule as in FR-04.

## 9. Assumptions, constraints, dependencies

None recorded.

Constraints: deadline Demo-ready in 2 weeks.; budget Hosting budget under USD 20 per month.; team One reviewer/approver: the repository owner/tester.; existing systems Claims currently use email and spreadsheets. No existing application or external integrations are specified..

## 10. Risks and mitigations

| Risk | Impact | Likelihood | Mitigation |
| --- | --- | --- | --- |
| Requirements change after approval | Medium | Medium | Version and re-approve changed documents. |

## 11. Open questions

- Confirm production data retention and backup requirements beyond the UAT/demo reset behavior before production use.

## 12. Glossary

- **SpendWise:** Employees, their direct managers, and Finance in companies of 50–200 people.
