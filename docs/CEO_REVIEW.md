# CEO review

**Mode:** scope reduction. The raw concept is an incumbent-contested platform; the accepted prototype is the minimum loop that can earn a paid pilot.

## Nuclear challenge and alternatives

The business outcome is distributor account retention, not QR adoption. Doing nothing preserves a painful but free paper/rep workflow. Reuse the proven previous factory structure and deterministic domain-operation pattern, but none of its prior product semantics.

- **Minimal viable (chosen):** scan → validated recommendation → approval queue. Effort S, risk medium.
- **Selective expansion:** add catalog CSV mapping and branded multi-account portal. Effort L, risk high.
- **Ideal architecture:** multi-tenant event ledger, connector outbox, role policy, inventory forecasting, and measured ROI. Effort XL, risk extreme before demand proof.

`CURRENT: texts/paper → THIS PLAN: observable paid-pilot loop → 12 MONTH IDEAL: distributor retention system with verified stockout reduction.`

## Eleven-section review

1. **Architecture:** keep static demo and API domain logic separate; shared fixture prevents contradictory demos. Supplier transmission is excluded.
2. **Errors:** name `ITEM_NOT_FOUND`, `INVALID_PACK_COUNT`, `PACK_LIMIT_EXCEEDED`, and `BUDGET_LIMIT_EXCEEDED`; preserve state and show recovery copy.
3. **Security:** no auth is acceptable only for fictional demo data. Production requires tenant authorization, idempotency, signed QR tokens, audit logs, and secret-managed connectors.
4. **Data/interaction edges:** cover unknown QR, zero/negative/decimal packs, max pack overflow, budget overflow, double-submit, empty queue, slow/error simulation, and mobile overflow.
5. **Code quality:** keep one recommendation function per runtime with matching fixtures and assertions. Avoid premature repository abstractions.
6. **Tests:** Python covers behavior and failure cases; Playwright covers queue creation, approve/hold, validation, and mobile width. CI performs locked installs and build.
7. **Observability:** the demo exposes inline status. Production needs request IDs, order state transitions, duplicate metrics, acknowledgement SLOs, and a failed-order runbook.
8. **State:** browser state is intentionally ephemeral. Persistence, migrations, and optimistic locking are deferred.
9. **API:** bounded typed JSON, stable error codes, and no false `sent` state. Version before external connectors.
10. **Scale:** fixture lookup is trivial; at 100×, catalog indexing and an async supplier outbox matter more than compute.
11. **UX:** the primary scan workspace appears first, demo/simulation labels are persistent, controls are keyboard accessible, and mobile cards cannot overflow.

## Decisions

- **Accepted:** one-site fictional workflow, deterministic recommendation, visible exceptions, approval/hold, shared fixtures, tested API.
- **Deferred:** auth, persistence, ERP/email connectors, label printing, analytics dashboard, AI-assisted mapping.
- **Not in scope:** marketplace, supplier switching, payment capture, public backend, autonomous purchase orders.

**Strongest challenges:** exact incumbent overlap, services-heavy onboarding, and zero search-led acquisition. Proceed only to generate paid-pilot evidence.
