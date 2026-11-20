# SupplyTap

Runnable prototype for a white-label scan-to-reorder workflow for independent consumables distributors. All displayed facilities, items, prices, and orders are fictional demo data. No order is sent to a supplier.

## Run

Requires Node `26.13.1` and Python 3.12+ with `uv`.

```bash
npm ci
npm run dev
uv sync --directory api --frozen
uv run --directory api uvicorn main:app --reload
```

## Verify

```bash
npm run typecheck
npm audit --audit-level=high
uv run --directory api pytest
uv run --directory api pip-audit
npm run test:e2e
npm run build
```

The Next.js frontend is a repo-base-path-aware static export for GitHub Pages. The FastAPI backend is runnable and tested locally/CI but is **not publicly deployed**.

See [product plan](docs/PRODUCT.md), [architecture](docs/ARCHITECTURE.md), [source notes](research/notes.md), and [opportunity score](docs/OPPORTUNITY_SCORE.md).
