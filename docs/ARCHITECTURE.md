# Architecture

```text
Fictional QR fixture → Next.js scan workspace → deterministic TS recommendation → demo queue
          └────────→ FastAPI /recommend + /orders → validation/rules → shared fixture
```

GitHub Pages hosts only the static frontend. The Python API is runnable and tested source, not publicly deployed.

## Four-path data flow

1. **Happy:** recognized QR → valid quantity → subtotal within site limit → queued request → approve/hold.
2. **Nil/unknown:** missing or unknown QR returns `ITEM_NOT_FOUND`; UI keeps the existing queue intact.
3. **Empty/invalid:** zero, non-integer, or over-limit packs returns named validation feedback beside the control.
4. **Upstream/error:** simulated request failure renders a recoverable banner; a real deployment would attach a request ID and leave the button retryable.

## API

- `GET /health`
- `GET /items`
- `POST /recommend` with `{qr_code, packs?}`
- `POST /orders` with `{qr_code, packs}`

Responses expose recommendation reasons and do not imply an order reached a vendor. Production would add authentication, distributor/account authorization, idempotency keys, persistent audit logs, rate limits, and an outbox for supplier delivery.

## Security and operations

Inputs are typed and bounded; fixtures contain no personal or private source data. No secrets or paid APIs are used. Runtime/dependency pins, locked installs, security audits, certificate refresh in every external Docker stage, and CI checks are publication gates. Production metrics: scan-to-queue rate, duplicate rejection, approval latency, mapping errors, supplier acknowledgement latency, and stockout recurrence.
