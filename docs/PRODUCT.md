# Product plan

## ICP and job

SupplyTap starts with owners and sales leaders at independent janitorial-supply distributors serving 10–100 recurring facility accounts. When a customer reaches the last pack of a consumable, the distributor needs the correct SKU, site, quantity, and approver captured immediately so the account does not defect to a national vendor.

## MVP

The demo supports a complete vertical slice: choose a fictional QR-labeled bin, inspect current stock and vendor mapping, request a recommended pack quantity, validate budget/quantity rules, create a queued reorder, and approve or hold it. Fixtures are explicitly fictional. Supplier transmission and AI are simulated and labelled.

## Data model

- `Facility`: account, delivery site, monthly approval limit.
- `SupplyItem`: QR token, vendor SKU, unit/pack metadata, stock, reorder point, max packs, unit price.
- `ReorderRequest`: item, requested packs, recommended packs, subtotal, reason, status, timestamp.
- Future: `Distributor`, `CustomerAccount`, `CatalogMapping`, `ApprovalRule`, `FulfillmentEvent`, `AuditEntry`.

## Architecture and model strategy

Next.js App Router statically exports a browser-only demonstration for GitHub Pages. A FastAPI service loads the same JSON fixtures and performs deterministic recommendation, validation, and order creation. Deterministic rules beat AI for the core order path: pack rounding, budget limits, SKU identity, and approval are audit-sensitive. Later, a model may assist CSV column mapping and anomaly explanation, always behind human confirmation.

## Economics

Test a $49 one-pair pilot, then $300–$800 per customer account/month with a $2,500 distributor floor and $500/account onboarding. Gross margin is threatened by catalog cleanup and label deployment. The gating metric is onboarding labor per 50 SKUs; target under four hours before custom integrations.

## Validation and moat

Run ten distributor-owner calls, seek three paid pilots, and observe five unassisted facility users. Measure scan completion, duplicate rate, approval latency, avoided emergency orders, and setup labor. The potential moat is normalized distributor-to-customer catalog mapping plus longitudinal stockout outcomes—not QR labels or a generic inventory UI.

## Risks

Incumbent copy, subsidized free alternatives, channel access, services-heavy onboarding, accidental duplicate orders, stale SKU mappings, and unclear responsibility when fulfillment fails. The MVP prevents duplicate client submissions, labels demo state, and makes holds/errors visible.

## 30 / 60 / 90 days

- **30:** ten owner interviews, three paid pilot asks, one installed 50-SKU label set, baseline stockout and onboarding measures.
- **60:** two active sites, catalog CSV mapping, approval notifications, fulfillment acknowledgement, weekly ROI report.
- **90:** decide: scale the distributor wedge after three paid renewals, pivot to a setup service if software willingness is weak, or kill if no owner pays.
