---
name: Phone number input tolerance
description: Sunrise Travels phone fields should accept common UK national formats without strict allocation checks.
---

Accept UK numbers entered in national format with or without the trunk zero (`07…` and `7…`). Use plausible-length validation instead of rejecting a number only because its prefix is not in strict allocation metadata.

**Why:** Strict number validation rejected a UK number the user considered valid.

**How to apply:** When changing shared Sunrise Travels phone validation, preserve support for both national forms and keep country-aware international formatting for WhatsApp messages.
