---
title: "Risk operations tool"
position: "qatar-insurance-group"
date: 2026-03
featured: true
order: 3
description: >-
  Designed and built a multi-department tool that scores real-world events against
  live policy exposure and recommends action for the teams that have to respond.
kpis:
  - value: "5"
    label: "teams served from one signal"
  - value: "Live"
    label: "policy exposure scored against world events"
chips:
  stack: ["GCP", "BigQuery"]
  domain: ["Insurance", "Risk operations", "Reinsurance"]
  method: ["Cross-department discovery", "Alert design", "Exposure modelling"]
---

Risk, claims, underwriting, investments and reinsurance were all reacting to the
same world events on different timelines, from different sources, with no shared
view of which policies were actually exposed.

## The problem

Risk, underwriting and compliance each had tools for part of the picture: world
events, catastrophe exposure, vessel route risk, natural hazards. None of them
covered everything, and none talked to each other. Compliance gaps weren't
monitored continuously at all. Reinsurance had its own blind spot: no clear way
to assess the risk of onboarding a new partner.

The result was the same event reaching each team through a different tool, at a
different time, with a different read on what it meant.

## What it does

The platform is a single control centre for five teams. It pulls intelligence
from regulatory, market, ratings, cyber, legal, catastrophe and corporate sources
into one feed, then interprets each event for the department viewing it. The same
geopolitical event surfaces as a treaty question for Reinsurance, a portfolio
question for Investments and a screening question for Compliance.

It is part proactive, part reactive. Each day starts with a morning brief and a
list of actions mapped to each department. When something happens, it flags
treaty breaches, risk concentrations and compliance gaps against live policy
exposure. Situations move from triage to resolution inside the tool, and each
decision can be exported as an audit-ready record.

## The real design problem

Building it was the easier part. Adoption was harder: every department was used
to its own set of tools, with data spread across sources it trusted.

What changed minds wasn't a feature walkthrough. I showed each team real events
as they happened and traced them straight through to our own books of business:
which policies were exposed, and by how much. Once a team saw its own exposure
move with the news, the case for one shared view made itself.

## Outcome

The clearest result is at the front door. Underwriting and reinsurance can now see
which brokers to call, and which risks to ask them not to send, before the
exposure reaches the book. Behind that sits a single view of risk shared by five
teams, where there used to be several partial ones.
