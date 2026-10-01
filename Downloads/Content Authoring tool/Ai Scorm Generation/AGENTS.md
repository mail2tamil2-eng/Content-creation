# Project design review command

When the user invokes `/design-review`, follow `commands/design-review.md`.
It is an agent workflow backed by `npm run design-review`; never treat the
automated candidate scan alone as a completed designer review.
Do not implement or run `/design-fix` until the user defines and authorizes it.
