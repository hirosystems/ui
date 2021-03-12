---
'@stacks/ui-utils': patch
---

Fixed: isPendingTx should use `MempoolTransaction` type because `Transaction`'s are by default no longer pending.
