---
title: "Project title"
position: "position-slug"        # must match a filename in src/content/positions/
date: 2026-01                    # YYYY-MM, drives ordering
featured: false                  # true = shows on the home "Selected work" section
order: 1                         # order within its position page
description: >-
  One or two sentences. What the problem was and what shipped.
chips:                           # open-ended; each key becomes a labelled row
  stack: ["Tool", "Tool"]
  domain: ["Domain"]
  method: ["Method"]
kpis:
  - value: "52%"
    label: "what it measures"
  - value: "$10M"
    label: "what it measures"
# cover: "/images/work/your-image.jpg"   # optional
---

Body in markdown. Full case study, or leave short — the page renders the
description, KPIs and chips even with no body.
