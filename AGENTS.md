# Repository guidance

- Preserve the explicit fictional/demo labeling. Never imply a supplier order was transmitted.
- Keep the static frontend export functional under the repository base path.
- Keep Python domain behavior and TypeScript demo behavior aligned through `data/demo.json`.
- Use exact supported runtime/dependency pins and retain all security gates.
- Add persistence, authentication, or supplier connectors only with tests for tenant isolation, idempotency, and failure recovery.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
