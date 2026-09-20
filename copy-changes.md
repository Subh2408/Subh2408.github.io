# Copy pass — for your approval

Nothing here is applied yet. Approve, edit, or reject each block. Two parts: **UI strings** (my microcopy, ~40 items) and **case-study prose** (before/after, your call).

The rules being applied throughout: no rule-of-three, no em-dash asides, no "not X but Y," no irony or metaphor for navigation, short declarative sentences, labels that name the thing. Bio and QIC skeletons are excluded.

---

# Part 1 — UI strings

## Hero and identity

| Current | Proposed | Note |
|---|---|---|
| `Subh : Product, Risk and AI` | *(keep)* | Footer/site name. Fine as is. |
| I build AI products for decisions that carry risk. | *(keep)* | This is the one line where a strong claim is doing real work. It's declarative, not ironic. Keep. |
| AI strategy, product and delivery. Insurance, FMCG, semiconductor, adtech. | *(keep)* | Already literal. |

## Status line

| Current | Proposed |
|---|---|
| `Doha, Qatar · 14:32 GMT+3 · open to conversations` | Drop the middle-dot triplet. Three plain items: **Doha, Qatar** / **14:32 GMT+3** / **Open to conversations** — set as separate spans with more space between, not dot-joined. |

## Approach section

The section headline is the biggest tell on the page.

| Current | Proposed |
|---|---|
| **Products that carry risk need a method, not a hunch.** | **How I work.** |
| Pillar: "Ship it small and cheap to be wrong" | "Ship small" |
| Pillar bodies (currently 2–3 sentences each, em-dash rhythm) | Kept as *your* copy to write — these are close to bio territory. I'll flag the cadence but not rewrite unless you want me to. |

Pillar *names* — current vs plainer:

| Current | Proposed |
|---|---|
| Frame the decision | *(keep — already imperative)* |
| Find the asymmetry | Find the asymmetry *(keep)* |
| Ship it small and cheap to be wrong | **Ship small** |
| Watch it in the wild | **Watch it run** |

## Selected work section

| Current | Proposed |
|---|---|
| **Three you can play with.** | **Selected work.** |
| "All 14 projects →" | *(keep)* |

## Elsewhere cards

| Current | Proposed |
|---|---|
| Professional timeline / "3 roles, eleven years, plotted to scale" | Professional timeline / **"Six roles, 2015 to now."** |
| Writing / "3 pieces, one runs in your browser" | Writing / **"Notes on ML, decisions and photography."** |
| Photography / "9 frames — the other half of the practice" | Photography / **"Frames from Doha, Kolkata and Goa."** |

## Contact section

| Current | Proposed |
|---|---|
| **Let's talk about what you're trying to decide.** | **Get in touch.** |

## Page ledes

| Current | Proposed |
|---|---|
| Work: "Eleven years across insurance, FMCG, semiconductor and adtech. Five of the projects are playable." | **"Eleven years of work. Five projects are interactive."** |
| Writing: "Machine learning, decision-making, photography, and the occasional hostel in Goa." | **"Notes on machine learning, decisions, and photography."** |
| Photography: "The only room that goes dark. Some frames get more space, because editing is the job." | **"Photographs from Doha, Kolkata and Goa."** |
| Résumé: "Deliberately plain semantic markup. This is the page ATS parsers and AI crawlers read." | **"A plain-text version, built to be read by machines and people."** |

## Module titles

Rhetorical questions → plain labels.

| Current | Proposed |
|---|---|
| Where do you set the auto-clear threshold? | **Auto-clear threshold** |
| Which SKUs come off the shelf? | **SKU delisting** |
| Which lever actually moves volume? | **Sales drivers** |
| Which product pairs survive the thresholds? | **Association rules** |
| K-armed bandit: explore or exploit? | **K-armed bandit** |
| Which events reach somebody's desk? | **Event routing** |

## Module notes (intro sentence under each title)

These are explanatory, so they stay — but lose the em-dashes and any rule-of-three. Example:

| Current | Proposed |
|---|---|
| "Every claim gets a model confidence score. Above the line it clears automatically; below it goes to a human. Move the line and you trade throughput against error — the whole product decision in one control." | "Every claim gets a confidence score. Above the line, it clears automatically. Below it, a person reviews it. Moving the line trades speed against error." |

*(I'll apply the same light touch to the other five notes — same meaning, hard stops instead of em-dashes. Shown in full on request.)*

## Module readouts (the verdict line that changes with the sliders)

These are the most "written" strings in the app. Current examples use the em-dash-and-aside rhythm. Proposed: plain.

| Current | Proposed |
|---|---|
| "Too loose. Error volume outweighs the time saved, and adjudicators stop trusting the queue." | *(keep — already plain and short)* |
| "Barely moves the needle — the shelf clutter that started the project is still there." | "Barely moves the needle. The shelf clutter that started the project is still there." |
| "Nothing survives. Loosen one threshold — usually support is set too high." | "Nothing survives. Loosen one threshold. Support is usually the one set too high." |
| "Roughly the band we shipped in: most volume cleared, error low enough that adjudicators kept trusting it." | "Close to what we shipped. Most volume cleared, error low enough to keep the adjudicators' trust." |

*(The remaining ~12 readouts get the same treatment: replace em-dash joins with periods. Full list on request — they're mechanical.)*

---

# Part 2 — case-study prose

This is the bigger issue and it's **not** the same problem as the UI. The bodies read as machine-written because they're **consultancy-deck language**: "Engineered and delivered a scalable, AI-driven adjudication platform," "high-impact initiative," "landmark reduction," bold scattered mid-sentence, passive openings.

I'd rewrite all eight to plain first-person past tense. Here are three, in full, so you can judge the voice. If you like it, I'll do the rest the same way and show you every one before it's applied.

### claims-adjudication

**Before:**
> Engineered and delivered a scalable, AI-driven adjudication platform for a **Fortune 100 insurance provider**, achieving a landmark reduction in claims processing time from **15–24 hours to under 30 minutes**. This solution utilized **AWS Textract**...

**After:**
> A Fortune 100 insurer was adjudicating claims by hand. First-pass review took most of a working day, 15 to 24 hours per claim. I led a system that read the claim documents with AWS Textract, scored eligibility with a model on SageMaker, and cleared the straightforward cases automatically. Adjudication dropped to about fifteen minutes. Adjudicators kept the final say; the model decided what reached them.

Shorter, first person, the number is a fact not a "landmark," no bold, and it says what *you* did.

### sku-optimization

**Before:**
> This high-impact initiative focused on optimizing shelf space for a leading US FMCG brand's **feminine care division** across major big-box retailers. By identifying underperforming SKUs and providing data-driven rationalization strategies...

**After:**
> A Fortune 100 FMCG brand had too many products competing for the same shelf space in its feminine care line. I used three years of weekly Nielsen data to rank every SKU on a custom Sales/ACV metric, which measures how a product sells relative to how widely it's stocked. The low performers came off the shelf. The projection was around five million dollars in annual savings, without cutting the items shoppers actually reach for.

### analytics-quality-program

**Before:**
> ### Summary  A structured quality control program was conceptualized and implemented across multiple analytics Pods, targeting recurring issues in data accuracy, presentation consistency, and insight depth. This initiative led to a 50% redu...

**After:**
> The analytics pods kept shipping the same kinds of errors: wrong numbers, inconsistent formatting, shallow analysis. I built a quality program to catch them before they reached a client. Checklists, documentation standards, reusable templates. Turnaround time fell by half and data errors dropped by about 70 percent. The point was to raise the floor without slowing down the exploratory work that doesn't fit a checklist.

---

## What I need from you

1. **UI strings** — approve the table, or mark the rows you want kept as-is. Most are low-stakes.
2. **The two "keep" calls** — the hero line and the "Frame the decision" pillar names. Agree, or want them changed too?
3. **Case-study voice** — do the three rewrites above read right? If yes, I do all eight in that voice and show you each before applying. If the voice is off, tell me how (too terse? too plain? still too much?).
4. **Approach pillar bodies** — write them yourself, or want me to draft in this plainer voice for you to edit?
