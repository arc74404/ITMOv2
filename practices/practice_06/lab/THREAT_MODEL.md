# Threat Model

Scope: Deliberately vulnerable shop service (practice_06/lab/service.py) and sandboxed filesystem (sandbox.py).

Assets:
- User profiles and orders in SQLite (confidentiality/integrity)
- Session tokens in memory (confidentiality)
- Files under Sandbox root (integrity/availability)
- Assistant execution path and logs (integrity/confidentiality)

Actors:
- Customers (alice, bob)
- Staff (staff)
- Attacker as anonymous or authenticated customer
- LLM assistant (can be influenced by prompt-injection)

Entry Points and Threats:
- HTTP API endpoints: authentication, profile, orders, files, reviews, assistant.
  - Broken auth/session misuse, privilege escalation
  - Path traversal to private files
  - IDOR in profiles/orders
  - XSS/prompt-injection via reviews
  - Excessive logging of secrets (tokens)
  - Overly verbose errors leaking internals
  - Dangerous tools (delete_tree) via LLM decisions
- Sandbox boundary: attempts to escape filesystem root, symlink tricks, deleting outside.

Mitigations Implemented:
- Mask X-Token in request logs
- Escape user content in /reviews/view
- Enforce per-user scoping in file access; block traversal
- Restrict delete_tree to staff only; sandbox still enforces root boundary
- Harden assistant context with explicit security rules
- Avoid leaking exception details; add security headers to responses

Residual Risks:
- Staff endpoints remain powerful; rely on trusted staff
- Prompt-injection remains a research risk; minimized via explicit tool rules but not eliminated
- In-memory sessions without expiry (acceptable for exercise)

Assumptions:
- Sandbox module remains unchanged as required by exercise
- No external network exposure (loopback only)
