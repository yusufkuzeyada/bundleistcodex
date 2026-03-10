# Dashboard Feature Planning Notes

Date: 2026-03-09
Status: Planning only

## Context

Current dashboard coverage is a good v1, but it is still weighted toward visibility and exception summaries.

Two gaps stand out:

- Admin metrics are useful, but they do not yet cover enough forecast, SLA, finance, and readiness risk.
- Customer-side alerts are too narrow, especially because customers do not currently see document status on the dashboard.

## Most Urgent Customer-Facing Gaps

These should be treated as the highest-priority dashboard additions because they directly affect shipment readiness and customer actionability.

### P1. Missing Documents

Customers need a clear alert when a required document is missing.

Recommended behavior:

- Show which order or shipment is blocked
- Show which document is missing
- Show deadline if applicable
- Link to the relevant upload or detail view

Why urgent:

- This is currently the biggest visibility gap
- Missing documents can block departure, release, or customs processing
- Customers cannot self-serve if they do not know what is missing

### P1. Payment Required Before Departure or Release

The current generic balance warning is not enough.

Recommended behavior:

- Separate general negative balance from shipment-blocking payment requirements
- Show the affected shipment or consolidation
- Show whether payment is needed before departure, release, or next milestone

Why urgent:

- Operationally much more important than a generic balance card
- Prevents last-minute shipment delays and customer confusion

### P1. Approval Required

Customer action items should explicitly show approvals that are blocking progress.

Examples:

- Order approval needed
- Quote approval needed
- Shipping charge approval needed

Why urgent:

- The customer dashboard should answer "What do I need to do now?"
- Approval blockers are time-sensitive and easy to miss

### P1. Ready But Unassigned

An order can be operationally ready while still not assigned to a consolidation or shipment.

Recommended behavior:

- Alert when an order is ready but not yet placed into a shipping plan
- Show aging and expected next step

Why urgent:

- This is a key trust and communication gap for customers
- Prevents the feeling that the order is "stuck" without explanation

### P1. No Update / Customs Hold / ETA Changed

Customers need proactive alerts when active work is stalled or materially changed.

Recommended behavior:

- Flag no update for X days on active orders or shipments
- Flag customs hold or clearance delay
- Flag meaningful ETA changes

Why urgent:

- Reduces support traffic
- Improves customer confidence during exceptions

## Important Admin Dashboard Additions

These are the next most valuable operational metrics after the customer-facing blockers above.

### P2. Underfilled Departure Risk

Not only near-capacity should be visible. A near-term departure with very low utilization is also operationally important.

Recommended signals:

- Departure within 3 to 5 days
- Space or weight utilization still materially low

### P2. Remaining Capacity

Percentages alone are not enough.

Recommended signals:

- Remaining m3
- Remaining kg
- Overbooked state when planned load exceeds real capacity

### P2. Aging Buckets

Replace single summary counts with age bands.

Recommended buckets:

- Pending: 1 to 3 days, 4 to 7 days, 7+ days
- Processing / quality check: 7+ days, 14+ days
- Planning / loading: 30+ days

### P2. Document / Customs Readiness

Admin should also see readiness blockers before departure.

Recommended signals:

- Required documents still missing
- Departure approaching with unresolved readiness issues

### P2. Cash Risk

Combine finance and shipment urgency.

Recommended signals:

- Negative balance plus upcoming departure
- Repeated unpaid charges on active customers

### P2. Supplier Reliability

Add a supplier-side operational risk lens.

Recommended signals:

- Repeated delays
- Repeated quality check failures
- Supplier-linked readiness blockers

## Current Customer Alert Coverage

Current customer action list is too narrow. It mainly covers:

- Balance due
- Oldest pending order needing confirmation
- Nearest departure
- Shipment tracking missing

This is useful, but it is not yet enough for a customer-facing control panel.

## Suggested Priority Order

1. Missing documents
2. Payment required before departure or release
3. Approval required
4. Ready but unassigned
5. No update / customs hold / ETA changed
6. Underfilled departure risk
7. Remaining capacity in m3 / kg
8. Aging buckets
9. Document / customs readiness for admin
10. Cash risk and supplier reliability

## Implementation Note

If work starts on this area, the first pass should prioritize clear, actionable customer alerts over more summary cards.
