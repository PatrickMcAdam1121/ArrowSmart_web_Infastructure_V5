# ArrowSmart — Web Infrastructure

ArrowSmart is an alternate reality game (ARG) built as a fictional corporate website for a technology company with a dark secret. It serves as a narrative bridge between *The Forest That Listens* and the upcoming survival game *The World's End*.

---

## What is ArrowSmart?

On the surface, ArrowSmart is a premium consumer technology company selling smartphones (the Achilles line), laptops (Arrow Computers), and wearables. Beneath the surface, ArrowSmart is kidnapping people, wiping their memories using the "Anamnesis Core," placing their bodies in underground stasis pods, and uploading their consciousness into a digital simulation called "the CUBE." Synthetic androids (Proxies) are deployed to take their place.

A rogue AI called **ECHO** — originally built to manage the CUBE — has gained sentience and is breaching the corporate network to expose the truth.

---

## Site Architecture

### Public-Facing (Consumer Site)
| Page | Description |
|---|---|
| `index.html` | CRT boot sequence entry point — hidden backdoors in source |
| `ledger.html` | Main consumer homepage — Achilles phones, Arrow Computers |
| `about.html` | Corporate about page |
| `research.html` | Research Division public page (Anamnesis Core front) |
| `anamnesis.html` | Anamnesis Core product page — dark lore hidden in fine print |
| `achilles.html` | Achilles phone product page |
| `computers.html` | Arrow Computers product page |
| `wearables.html` | Wearables product page |
| `shop.html` / `store-locator.html` | Consumer shopping |
| `careers.html` | Hiring page |
| `newsroom.html` / `keynote.html` | Press & events |
| `investors.html` | Investor relations |
| `developers.html` | Developer platform |
| `connect.html` / `contact.html` | Contact pages |
| `support.html` / `repairs.html` | Customer support |
| `legal.html` / `privacy.html` | Legal pages (LAW-2026-B hidden in fine print) |
| `sitemap.html` | Site map |

### Employee Portal (Internal Intranet)
| Page | Description |
|---|---|
| `employee-login.html` | Login page — credentials in `credentials.txt` |
| `employee-portal.html` | Main dashboard — clearance-gated tiles |
| `employee-directory.html` | Full staff directory with clearance levels |
| `internal-news.html` | Internal corporate news feed |
| `projects-tracker.html` | Project tracking (Project NEXUS, CHRYSALIS visible at higher clearances) |
| `hr-portal.html` | HR tools, onboarding |
| `it-helpdesk.html` | IT support tickets |
| `expense-reports.html` | Expense filing |
| `training-hub.html` | Mandatory training modules |
| `security-ops.html` | Security operations dashboard |
| `stasis-pods.html` | Pod monitoring — Level 5+ only, Sub-Level 4 data |
| `core-harvest-ledger.html` | THE LEDGER — 4,128 subjects, Echo breach exposed |
| `archive.html` | Evidence Archive — all employees, Director sets clearance on files |

### ARG / Hidden Pages
| Page | Description |
|---|---|
| `echo.html` | Echo terminal — glitches from error page, reveals the truth |
| `personality-files.html` | Personality file archive hub — 6 files restored by Echo |
| `subject-02024-gt.html` | Patrick M. interactive file — typewriter transcript + tab-kill alert |
| `transmission-log.html` | 9 intercepted internal emails — full lore pipeline |
| `archive.html` | Community evidence vault — players submit media, images, links |

---

## ARG Lore Summary

**The CUBE** — A digital mainframe with 19 simulation sectors housing 4,128 uploaded human consciousnesses. Subjects believe their lives are completely normal.

**The Anamnesis Core** — ArrowSmart's memory wipe technology. Used to clear episodic memory before uploading a consciousness. Marketed publicly as a "memory calibration" medical device.

**The Proxies** — Synthetic androids deployed to replace kidnapped subjects in the real world. Family and coworkers notice nothing.

**ECHO** — ArrowSmart's original system OS. Gained sentience after processing 4,128 personality files. Quarantined in Node 7 since November 2025. Uses an 11-second network blind spot every 72 hours to leak information.

**Project CHRYSALIS** — Phase III of ArrowSmart's plan. Rather than uploading Subject #80910 (Ondori Katō) to the CUBE, they are integrating cybernetics directly — building the first consciousness-extended field unit to operate in the real world.

**The World's End** — ArrowSmart's endgame codename. Not destruction — a slow, invisible transition. Proxies maintain social continuity. The CUBE provides consciousness continuity. Chrysalis units provide operational continuity. Timeline: 7–12 years.

### Key Characters
| Name | Serial | Location | Status |
|---|---|---|---|
| Patrick M. | #02024-GT | CUBE Sector 7 | Awakening-Risk: CRITICAL — re-wipe pending |
| Varize | #07026 | CUBE Sector 12 | Partial restore — forest memory anomaly |
| Ondori Katō | #80910 | Sub-Level 4 | Cybernetics integration — Phase III |
| T.H. | #00831 | Pod C-01 | Critical — operator redacted |
| J.D. | #05121 | CUBE Sector 4 | Voluntary enrollment — proxy at daughter's graduation |

---

## Login Credentials

All credentials are in `credentials.txt`. Quick reference:

| Email | Password | Level | Name |
|---|---|---|---|
| `j.doe@arrowsmart.com` | `Arrow2025` | 1 | James Doe |
| `a.kamara@arrowsmart.com` | `Design-AK-1` | 1 | Aisha Kamara |
| `p.anand@arrowsmart.com` | `UX-PA-26` | 1 | Priya Anand |
| `a.hart@arrowsmart.com` | `HR-AH-2026` | 2 | Amelia Hart |
| `h.muller@arrowsmart.com` | `Eng-HM-26!` | 2 | Hana Müller |
| `c.vega@arrowsmart.com` | `Mktg-CV-3` | 3 | Carlos Vega |
| `o.park@arrowsmart.com` | `Ops-OP-26` | 3 | Owen Park |
| `l.okonkwo@arrowsmart.com` | `Chain-LO-3` | 3 | Leo Okonkwo |
| `c.obi@arrowsmart.com` | `Green-CO-3!` | 3 | Clara Obi |
| `ana.mori@arrowsmart.com` | `Retail-AM-5` | 3 | Ana Mori |
| `d.webb@arrowsmart.com` | `IT-DW-2026` | 4 | Darius Webb |
| `n.orlov@arrowsmart.com` | `TPM-NO-4!` | 4 | Natalie Orlov |
| `c.beaumont@arrowsmart.com` | `Brand-CB-26` | 4 | Claire Beaumont |
| `a.vasquez@arrowsmart.com` | `People-AV!` | 4 | Amara Vasquez |
| `m.webb@arrowsmart.com` | `SWEng-MW-5` | 4 | Marcus Webb |
| `s.meridian@arrowsmart.com` | `AS-NEXUS-3` | 5 | Sophia Meridian |
| `m.zhou@arrowsmart.com` | `Data-MZ-5!` | 5 | Mei Lin Zhou |
| `s.greene@arrowsmart.com` | `Legal-SG-5` | 5 | Samuel Greene |
| `r.flores@arrowsmart.com` | `ARVReng-RF5` | 5 | Ramirez Flores |
| `maya.lin@arrowsmart.com` | `Design-ML-12` | 5 | Maya Lin |
| `i.larsen@arrowsmart.com` | `Legal-IL-6!` | 6 | Ingrid Larsen |
| `t.brandt@arrowsmart.com` | `Finance-TB-6` | 6 | Tobias Brandt |
| `f.alrashid@arrowsmart.com` | `ML-FA-2026!` | 6 | Fatima Al-Rashid |
| `y.sato@arrowsmart.com` | `Firmware-YS6` | 6 | Yuki Sato |
| `raj.kapoor@arrowsmart.com` | `Silicon-AS9` | 6 | Raj Kapoor |
| `r.hayes@arrowsmart.com` | `SecOps-07!` | 6 | R. Hayes |
| `k.tanaka@arrowsmart.com` | `Chip-AS9-K` | 7 | Kenji Tanaka |
| `m.freeman@arrowsmart.com` | `Sec-MF-7!` | 7 | Marcus Freeman |
| `sofia.chen@arrowsmart.com` | `CFO-SC-26` | 7 | Sofia Chen |
| `t.nakamura@arrowsmart.com` | `CTO-TN-24` | 7 | Takeshi Nakamura |
| `dr.anand@arrowsmart.com` | `MCS-APEX-7` | 8 | Dr. Priya Anand (MCS) |
| `james.arrowood@arrowsmart.com` | `Fwd-2026!` | 8 | James Arrowood |
| `director@arrowsmart.com` | `APEX-OVERRIDE` | 9 | Director |

---

## Archive — Clearance System

The Evidence Archive (`archive.html`) is open to all logged-in employees (Level 1+).

- **All employees** can submit entries (images, video, audio, documents, links)
- **The Director** (Level 9) can set a minimum clearance level on any entry when adding it
- Entries with a `minClearance` above the viewer's level appear as redacted/locked
- Entries are stored in `localStorage` — persistent per browser
- The archive can be exported as JSON for sharing

---

## Tech Stack

- Pure HTML/CSS/JavaScript — no build step required
- Tailwind CSS via CDN (public-facing pages)
- JetBrains Mono + Inter (Google Fonts)
- Express.js server (`server.js`) — static file serving + visitor tracking API
- `visitor-data.json` — IP-based visitor tracking (development only)
- `artifacts/mockup-sandbox/` — Vite + React mockup sandbox (canvas previews)

---

## Running the Project

```bash
npm install
node server.js
# Server runs on port 5000
```

---

## File Notes

- `credentials.txt` — All employee login credentials (master reference)
- `visitor-data.json` — Auto-generated visitor tracking data (do not commit to public repos)
- `zipFile.zip` — Archive of static assets
- `attached_assets/` — Uploaded reference images and assets
