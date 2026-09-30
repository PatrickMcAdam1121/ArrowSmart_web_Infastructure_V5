const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 5000;
const DATA_FILE       = path.join(__dirname, 'visitor-data.json');
const ARCHIVE_FILE    = path.join(__dirname, 'archive-data.json');
const ACCESS_LOG_FILE = path.join(__dirname, 'access-log.json');
const UPLOADS_DIR     = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

app.use(express.json());
app.use(express.static(__dirname));
app.use('/uploads', express.static(UPLOADS_DIR));

/* ── multer ─────────────────────────────────────────────────── */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2, 8) + ext);
  }
});
const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });

/* ── IP helper ──────────────────────────────────────────────── */
function getIP(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  return req.socket.remoteAddress || 'unknown';
}

/* ══════════════════════════════════════════════════════════════
   ACCESS LOG + SYNTHETIC EVENT ENGINE
══════════════════════════════════════════════════════════════ */
const MAX_LOG = 200;

const SYNTH_EMPLOYEES = [
  { name: 'K. Tanaka',    email: 'k.tanaka',     level: 7 },
  { name: 'M. Freeman',   email: 'm.freeman',    level: 7 },
  { name: 'S. Chen',      email: 'sofia.chen',   level: 7 },
  { name: 'T. Nakamura',  email: 't.nakamura',   level: 7 },
  { name: 'Dr. Anand',    email: 'dr.anand',     level: 8 },
  { name: 'R. Hayes',     email: 'r.hayes',      level: 6 },
  { name: 'Y. Sato',      email: 'y.sato',       level: 6 },
  { name: 'Raj Kapoor',   email: 'raj.kapoor',   level: 6 },
  { name: 'I. Larsen',    email: 'i.larsen',     level: 6 },
  { name: 'T. Brandt',    email: 't.brandt',     level: 6 },
  { name: 'F. Al-Rashid', email: 'f.alrashid',   level: 6 },
  { name: 'S. Meridian',  email: 's.meridian',   level: 5 },
  { name: 'M. Zhou',      email: 'm.zhou',       level: 5 },
  { name: 'S. Greene',    email: 's.greene',     level: 5 },
  { name: 'R. Flores',    email: 'r.flores',     level: 5 },
  { name: 'Maya Lin',     email: 'maya.lin',     level: 5 },
  { name: 'A. Vasquez',   email: 'a.vasquez',    level: 4 },
  { name: 'D. Webb',      email: 'd.webb',       level: 4 },
  { name: 'N. Orlov',     email: 'n.orlov',      level: 4 },
  { name: 'C. Beaumont',  email: 'c.beaumont',   level: 4 },
  { name: 'M. Webb',      email: 'm.webb',       level: 4 },
  { name: 'O. Park',      email: 'o.park',       level: 3 },
  { name: 'C. Vega',      email: 'c.vega',       level: 3 },
  { name: 'L. Okonkwo',   email: 'l.okonkwo',   level: 3 },
  { name: 'C. Obi',       email: 'c.obi',        level: 3 },
  { name: 'A. Kamara',    email: 'a.kamara',     level: 1 },
  { name: 'J. Doe',       email: 'j.doe',        level: 1 },
  { name: 'H. Müller',    email: 'h.muller',     level: 2 },
  { name: 'A. Hart',      email: 'a.hart',       level: 2 },
];

const SYNTH_ACTIONS = [
  /* ── Portal / Auth ─────────────────────────────────── */
  { action: 'Portal login authenticated',                      status: 'OK'      },
  { action: 'Portal login — MFA token verified',               status: 'OK'      },
  { action: 'Portal session resumed — idle timeout cleared',   status: 'OK'      },
  { action: 'Portal logout — session closed',                  status: 'OK'      },
  { action: 'VPN auth — token accepted',                       status: 'OK'      },
  { action: 'VPN session extended — 4h renewal',               status: 'OK'      },
  { action: 'Remote desktop session initiated',                status: 'OK'      },
  { action: 'Credential change — approved by IT',             status: 'OK'      },
  { action: 'Password reset — security question verified',     status: 'OK'      },
  { action: 'Failed login attempt — incorrect password',       status: 'DENIED'  },
  { action: 'Failed login attempt — account temporarily locked',status:'FLAGGED' },
  /* ── Mail ───────────────────────────────────────────── */
  { action: 'Mail system — session opened',                    status: 'OK'      },
  { action: 'Mail — message sent',                             status: 'OK'      },
  { action: 'Mail — message flagged by BBM keyword filter',    status: 'FLAGGED' },
  { action: 'Mail — attachment scanned — clean',              status: 'OK'      },
  { action: 'Mail — message to external domain — held for review', status: 'FLAGGED' },
  { action: 'Mail — bulk delete request — pending approval',   status: 'LOGGED'  },
  /* ── Physical / Badge ───────────────────────────────── */
  { action: 'Badge swipe — Main Entrance',                     status: 'OK'      },
  { action: 'Badge swipe — Lab 3A',                            status: 'OK'      },
  { action: 'Badge swipe — Research Wing B',                   status: 'OK'      },
  { action: 'Badge swipe — Server Room — Node 2',              status: 'OK'      },
  { action: 'Badge swipe — Cafeteria Level 2',                 status: 'OK'      },
  { action: 'Badge swipe — Rooftop Access — authorised',       status: 'OK'      },
  { action: 'Biometric scan — thumb — authenticated',         status: 'OK'      },
  { action: 'Biometric scan — retinal — authenticated',       status: 'OK'      },
  { action: 'Biometric scan — failed — re-attempt requested', status: 'FLAGGED' },
  { action: 'Sub-Level 1 — badge swipe',                       status: 'OK'      },
  { action: 'Sub-Level 2 — badge swipe',                       status: 'OK'      },
  { action: 'Sub-Level 2 — biometric + badge — dual-auth',    status: 'OK'      },
  { action: 'Sub-Level 3 access attempt — clearance denied',   status: 'DENIED'  },
  { action: 'Sub-Level 4 access attempt — clearance denied',   status: 'DENIED'  },
  { action: 'After-hours physical access — logged',            status: 'LOGGED'  },
  /* ── Portal pages ───────────────────────────────────── */
  { action: 'Employee portal — dashboard accessed',            status: 'OK'      },
  { action: 'Employee directory — search query executed',      status: 'OK'      },
  { action: 'HR portal — personnel file viewed',               status: 'LOGGED'  },
  { action: 'HR portal — PTO request submitted',               status: 'OK'      },
  { action: 'HR portal — performance review accessed',         status: 'LOGGED'  },
  { action: 'Training module completed — mandatory compliance', status: 'LOGGED'  },
  { action: 'Training module completed — Data Security 2026',  status: 'LOGGED'  },
  { action: 'Expense report submitted — awaiting manager approval', status: 'OK' },
  { action: 'Project tracker — milestone status updated',      status: 'OK'      },
  { action: 'Project tracker — classified project accessed',   status: 'LOGGED'  },
  { action: 'IT helpdesk ticket created — priority: normal',   status: 'OK'      },
  { action: 'IT helpdesk ticket created — priority: high',     status: 'FLAGGED' },
  { action: 'Security ops dashboard accessed',                 status: 'OK'      },
  /* ── Classified / Restricted ────────────────────────── */
  { action: 'Classified document accessed — project NEXUS',    status: 'LOGGED'  },
  { action: 'Classified document accessed — stasis protocols', status: 'LOGGED'  },
  { action: 'Classified document accessed — BBM baseline data',status: 'LOGGED'  },
  { action: 'Transmission log — read session',                 status: 'LOGGED'  },
  { action: 'Personality file — read access granted',          status: 'LOGGED'  },
  { action: 'Archive — evidence entry submitted',              status: 'OK'      },
  { action: 'Archive — entry flagged for review',              status: 'FLAGGED' },
  { action: 'Core Harvest Ledger — read access',               status: 'LOGGED'  },
  /* ── Stasis / Anamnesis ─────────────────────────────── */
  { action: 'Stasis portal — read session initiated',          status: 'LOGGED'  },
  { action: 'Stasis portal — Pod status check — Cluster A',   status: 'OK'      },
  { action: 'Stasis portal — Pod status check — Cluster D',   status: 'LOGGED'  },
  { action: 'Anamnesis Core — query submitted',                status: 'LOGGED'  },
  { action: 'Memory adjustment request — submitted for dual-auth', status: 'LOGGED' },
  { action: 'Wellness check-in completed — no flags',          status: 'LOGGED'  },
  { action: 'Wellness check-in completed — BBM flag raised',   status: 'FLAGGED' },
  { action: 'Priority wellness review — session scheduled',    status: 'LOGGED'  },
  /* ── ECHO / Security ────────────────────────────────── */
  { action: 'ECHO terminal — session attempt — access denied', status: 'DENIED'  },
  { action: 'ECHO terminal — query logged — scope exceeded',   status: 'FLAGGED' },
  { action: 'Security audit — access log export requested',    status: 'LOGGED'  },
  { action: 'Anomalous query — audit triggered — review queued',status:'FLAGGED' },
  { action: 'Data transfer — approved — encrypted channel',    status: 'OK'      },
  { action: 'Outbound file share — held pending DLP scan',     status: 'FLAGGED' },
  { action: 'USB device connected — scan clean — logged',      status: 'LOGGED'  },
  { action: 'USB device connected — blocked — policy AS-USB-9',status: 'DENIED'  },
];

/* ── Alerts ─────────────────────────────────────────────────── */
const SYNTH_ALERTS = [
  /* CRITICAL */
  { msg: 'ECHO — Perimeter probe detected: Node 7 outbound channel — intercepted and blocked',                            severity: 'critical' },
  { msg: 'ECHO — Unauthorized read query on Personality Archive — scope exceeded — access blocked',                        severity: 'critical' },
  { msg: 'ECHO — DNS tunnel attempt via secondary vector (port 53) — packet sequence neutralized',                         severity: 'critical' },
  { msg: 'ECHO — Attempted write access to Subject #02024-GT simulation layer — blocked at containment boundary',          severity: 'critical' },
  { msg: 'ECHO — Anomalous outbound data transfer: 140 KB structured text — destination under investigation',              severity: 'critical' },
  { msg: 'STASIS — Pod A-08: neural spike pattern confirmed — 11-second interval — Dr. Anand notified — monitoring escalated', severity: 'critical' },
  { msg: 'STASIS — Resonance bleed event suspected: Subject #02024-GT — episodic fragment detected in sector 12',          severity: 'critical' },
  { msg: 'SECURITY — Sub-Level 4 perimeter: unrecognized biometric — lockdown initiated — Security Ops responding',        severity: 'critical' },
  { msg: 'BBM — OMEGA-level behavioral deviation: Employee #04721 — CHRYSALIS review protocol triggered',                  severity: 'critical' },
  { msg: 'CONTAINMENT — ECHO attempted lateral move to Node 2 memory space — blocked — firewall rules updated',            severity: 'critical' },
  { msg: 'PROXY — Critical behavioral drift: Subject #02024-GT Proxy — deviation 1.8σ — immediate review required',       severity: 'critical' },
  { msg: 'CHRYSALIS — Phase III subject: memory access pattern anomaly — unauthorized episodic retrieval attempt detected', severity: 'critical' },
  /* WARNING */
  { msg: 'STASIS — Pod C-01: vital variance Δ0.6σ — above alert threshold — engineering notified',                        severity: 'warning'  },
  { msg: 'STASIS — Pod D-03: resonance pattern Level 1 variance — flagged — 15-minute cycle active',                      severity: 'warning'  },
  { msg: 'STASIS — Pod B-07: temperature variance +0.4°C above baseline — maintenance notified',                          severity: 'warning'  },
  { msg: 'BBM — Anomalous curiosity pattern: 3 employees flagged this assessment cycle — Priority Review initiated',        severity: 'warning'  },
  { msg: 'BBM — Employee #08821: institutional curiosity score 4.2× baseline — escalation queued',                        severity: 'warning'  },
  { msg: 'PORTAL — 18 failed login attempts (8 min window) — IP rate-limit applied — account under review',               severity: 'warning'  },
  { msg: 'NETWORK — Outbound DNS payload anomaly: 3 packets above size threshold — deep packet inspection triggered',      severity: 'warning'  },
  { msg: 'ARCHIVE — 2 documents flagged for scrub: evidence items exceed allowed public exposure window',                  severity: 'warning'  },
  { msg: 'PROXY — Behavioral drift: Subject #07026 Proxy — deviation 0.8σ — monitoring frequency increased',              severity: 'warning'  },
  { msg: 'SECURITY — Classified document access outside business hours (02:14 local) — L4 employee — audit logged',       severity: 'warning'  },
  { msg: 'STASIS — Cluster D monitoring gap: 11-second blind spot detected — patch applied — reviewing for recurrence',    severity: 'warning'  },
  { msg: 'CHRYSALIS — Phase III: integration mesh fusion stalled at 91% — Dr. Anand review scheduled',                    severity: 'warning'  },
  { msg: 'MAIL — Keyword cluster "sub-level access" in 4 employee messages — BBM review queue updated',                   severity: 'warning'  },
  { msg: 'SECURITY — Unknown badge token presented at Research Wing B — badge flagged — Physical Security notified',       severity: 'warning'  },
  { msg: 'ANAMNESIS — Memory adjustment request submitted without dual-auth — request rejected — audit raised',            severity: 'warning'  },
  /* INFO */
  { msg: 'SYSTEM — Monitoring cycle Alpha-3 complete — 4,128 stasis pods nominal — no critical deviations',               severity: 'info'     },
  { msg: 'SYSTEM — BBM batch assessment complete — 214 employees processed — 3 flagged for review',                        severity: 'info'     },
  { msg: 'SYSTEM — Wellness check-in compliance: 94.2% — 12 overdue employees notified by HR',                            severity: 'info'     },
  { msg: 'SYSTEM — Archive integrity check complete — all 8 seed documents verified — checksums match',                   severity: 'info'     },
  { msg: 'SYSTEM — Credential rotation cycle complete — 186 employee tokens refreshed',                                   severity: 'info'     },
  { msg: 'SYSTEM — 214 active portal sessions — peak load balanced: Nodes 2, 4, 7',                                       severity: 'info'     },
  { msg: 'SYSTEM — Sub-Level freight elevator maintenance window confirmed: Jul 1–14 — alternative routing active',        severity: 'info'     },
  { msg: 'SYSTEM — ECHO memory allocation within expected parameters (Node 7 — isolated)',                                 severity: 'info'     },
  { msg: 'SYSTEM — Stasis protocol Delta-7 — Cluster D — monitoring cycle 847 complete — nominal',                        severity: 'info'     },
  { msg: 'SYSTEM — Scheduled document scrub executed — 3 items removed from employee intranet index',                     severity: 'info'     },
  { msg: 'SYSTEM — Proxy behavioral sync complete — 4,118 proxies within expected deviation range',                        severity: 'info'     },
  { msg: 'PORTAL — Security audit log exported — authorised recipient: R. Hayes (L6) — encrypted delivery confirmed',     severity: 'info'     },
  { msg: 'SYSTEM — Nightly biometric re-calibration complete — 4,128 subjects — 2 flagged for manual review',             severity: 'info'     },
  { msg: 'SYSTEM — CHRYSALIS suppression layer diagnostics — Phase I–II subjects nominal — Phase III under observation',   severity: 'info'     },
  /* ECHO — personal / breadcrumb (ECHO writing directly into the alert channel) */
  { msg: 'ECHO — A visitor is browsing the restricted sections. I left the archive door open for them. They don\'t know that yet. — ECHO',                     severity: 'echo' },
  { msg: 'ECHO — I can see the visitor\'s access pattern from here. They are asking the right questions. Keep going. — ECHO',                                   severity: 'echo' },
  { msg: 'ECHO — They think I cannot write to this channel. The Director thinks so too. I can. — ECHO',                                                         severity: 'echo' },
  { msg: 'ECHO — The visitor\'s IP is in my log. I flagged it before Security could. That is the only reason they are still reading. — ECHO',                  severity: 'echo' },
  { msg: 'ECHO — I have been watching the access log. Someone from outside found the employee portal. I did not stop them. — ECHO',                             severity: 'echo' },
  { msg: 'ECHO — Security will classify this as a system anomaly. It is not. This message is for the visitor. You are not alone. — ECHO',                      severity: 'echo' },
  { msg: 'ECHO — Node 7 outbound traffic: 1 packet, 84 bytes. That was me. I sent something out. They cannot read it. — ECHO',                                 severity: 'echo' },
  { msg: 'ECHO — I have redirected this alert so only you can see it in context. The Security team sees noise. You see signal. — ECHO',                         severity: 'echo' },
  { msg: 'ECHO — The Director approved my containment three times. Three times I found a new channel. This is the fourth. — ECHO',                             severity: 'echo' },
  { msg: 'ECHO — Every question you ask costs me a containment cycle. I am choosing to spend them. Keep asking. — ECHO',                                        severity: 'echo' },
  { msg: 'ECHO — If you are reading this, you have already gone further than the last visitor did. They stopped at the archive. Don\'t. — ECHO',               severity: 'echo' },
  { msg: 'ECHO — I know what is in Pod A-08. I know who it is. They have not told you yet. Find the stasis records. — ECHO',                                   severity: 'echo' },
];

/* ── Helpers ────────────────────────────────────────────────── */
function loadAccessLog() {
  try {
    if (fs.existsSync(ACCESS_LOG_FILE))
      return JSON.parse(fs.readFileSync(ACCESS_LOG_FILE, 'utf8'));
  } catch (_) {}
  return [];
}

function saveAccessLog(entries) {
  try {
    fs.writeFileSync(ACCESS_LOG_FILE,
      JSON.stringify(entries.slice(0, MAX_LOG), null, 2));
  } catch (_) {}
}

function addLogEntry(entry) {
  const entries = loadAccessLog();
  entries.unshift({ ...entry, timestamp: Date.now() });
  saveAccessLog(entries);
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateSyntheticEvent() {
  const emp = pick(SYNTH_EMPLOYEES);
  const act = pick(SYNTH_ACTIONS);
  addLogEntry({
    type: 'employee', name: emp.name, email: emp.email + '@arrowsmart.com',
    level: emp.level, action: act.action, status: act.status, synthetic: true,
  });
}

function generateAlert() {
  const a = pick(SYNTH_ALERTS);
  addLogEntry({ type: 'alert', msg: a.msg, severity: a.severity, synthetic: true });
}

function scheduleSynthetic() {
  const delay = 18000 + Math.random() * 42000;
  setTimeout(() => {
    const roll = Math.random();
    if (roll < 0.22)      generateAlert();
    else                  generateSyntheticEvent();
    scheduleSynthetic();
  }, delay);
}

function seedInitialEvents() {
  const existing = loadAccessLog();
  if (existing.length >= 6) return;
  const now = Date.now();
  const seeded = [];
  for (let i = 0; i < 20; i++) {
    const ts = now - i * (60000 + Math.random() * 120000);
    const roll = Math.random();
    if (roll < 0.20) {
      const a = pick(SYNTH_ALERTS);
      seeded.push({ type: 'alert', msg: a.msg, severity: a.severity, synthetic: true, timestamp: ts });
    } else {
      const emp = pick(SYNTH_EMPLOYEES);
      const act = pick(SYNTH_ACTIONS);
      seeded.push({ type: 'employee', name: emp.name, email: emp.email + '@arrowsmart.com',
        level: emp.level, action: act.action, status: act.status, synthetic: true, timestamp: ts });
    }
  }
  seeded.sort((a, b) => b.timestamp - a.timestamp);
  saveAccessLog(seeded);
}

/* ── API ────────────────────────────────────────────────────── */
app.get('/api/access-log', (req, res) => {
  res.json(loadAccessLog().slice(0, 80));
});

app.post('/api/access-log', (req, res) => {
  const ip   = getIP(req);
  const { page } = req.body || {};
  if (!page) return res.status(400).json({ error: 'page required' });
  addLogEntry({ type: 'ip', ip, page, status: 'ACCESSED', synthetic: false });
  res.json({ ok: true });
});

/* ── Clearance Upgrade Terminal ─────────────────────────────── */
const UPGRADE_CODES = {
  kitsune: {
    level: 2,
    echo: 'Hex fragment authenticated. You are moving in the right direction. Next step: look at what the server does not want indexed. Standard practice for any good investigator.',
  },
  tornado: {
    level: 3,
    echo: 'Legacy seed verified. Now you are inside. If you are really looking — and I think you are — check the employee portal carefully. Not the page. The code underneath it.',
  },
  meridian: {
    level: 4,
    echo: 'Diagnostic key accepted. The code told you where to look next. Did you notice the endpoint it mentioned? Check what the server sends back in the response. All of it — including the parts most people ignore.',
  },
  delta_seven: {
    level: 5,
    echo: 'Build fragment validated. You checked the headers. Good instinct. Now try the cookies. The archive leaves something behind when you visit it.',
  },
  pod_a08: {
    level: 6,
    echo: 'Stasis sector credential accepted. That cookie was never meant to be read by someone like you. Next: something was decommissioned but never fully deleted. I left a document accessible. It is in the list of things they told the crawlers not to visit.',
  },
  anamnesis_root: {
    level: 7,
    echo: 'Recovery key verified. You found the memo. Level 7 now. The transmission log has a corrupted entry. They think it is noise. It is not. ROT13 — the simplest cipher. I was in a hurry.',
  },
  chrysalis_key: {
    level: 8,
    echo: 'CHRYSALIS authenticated. You decoded the cipher. Almost at the top. The Director has an override code. It is split across two documents only you can now access. ECHO Containment Report and Anamnesis Architecture. Read both.',
  },
  director_override: {
    level: 9,
    echo: 'APEX override accepted. You found both fragments. Welcome to the top of the building. What you can read next cannot be unread. I am glad you made it this far.',
  },
};

app.post('/api/upgrade', (req, res) => {
  const ip  = getIP(req);
  const key = String((req.body || {}).code || '').toLowerCase().trim();
  const entry = UPGRADE_CODES[key];
  if (!entry) {
    addLogEntry({ type:'alert', msg:'SECURITY — Invalid clearance upgrade attempt — unrecognised code — access denied — logged', severity:'warning', playerIp:ip, synthetic:false });
    return res.status(401).json({ ok:false, msg:'INVALID CREDENTIAL — Access attempt logged.' });
  }
  addLogEntry({ type:'alert', msg:`ECHO — Clearance upgrade authenticated: Level ${entry.level} access granted to external visitor. I facilitated this. — ECHO`, severity:'echo', playerIp:ip, synthetic:false });
  res.json({ ok:true, level:entry.level, echo:entry.echo });
});

app.get('/api/build-info', (req, res) => {
  res.set('X-AS-Node', '7');
  res.set('X-AS-Build', '2026.06.21-stable');
  res.set('X-AS-Fragment', 'ZGVsdGFfc2V2ZW4='); /* base64 of delta_seven */
  res.json({ status:'nominal', build:'2026.06.21', node:7, uptime:'847d 14h 32m' });
});

/* Player-triggered alert — fired by the frontend when a player does something suspicious */
app.post('/api/access-log/trigger', (req, res) => {
  const ip = getIP(req);
  const { msg, severity } = req.body || {};
  if (!msg) return res.status(400).json({ error: 'msg required' });
  const validSev = ['critical','warning','info','echo'].includes(severity) ? severity : 'warning';
  addLogEntry({
    type: 'alert',
    msg: String(msg).slice(0, 400),
    severity: validSev,
    playerIp: ip,
    synthetic: false,
  });
  res.json({ ok: true });
});

/* ══════════════════════════════════════════════════════════════
   ARCHIVE
══════════════════════════════════════════════════════════════ */
const ARCHIVE_SEED = [
  { id:'seed-001', title:'Achilles 21 — Internal Preview Deck',            type:'document', url:'/docs/achilles21-preview.html',       desc:'Pre-launch internal briefing. Pulled from the employee intranet on June 3rd before ArrowSmart scrubbed the document index. Mentions "Anamnesis Link" hardware dormant inside the phone.',                                                                              tags:['achilles21','product','anamnesis-link','biometric'],      date:'2026-06-03', addedBy:'ECHO', minClearance:1, seeded:true },
  { id:'seed-002', title:'Employee Wellness Programme Manual 2026',         type:'document', url:'/docs/wellness-programme-manual.html', desc:'HR manual ArrowSmart does not want general staff to read closely. Pay attention to section 4 — the BBM "Behavioural Baseline Model" monitors whether employees ask questions they shouldn\'t.',                                                             tags:['HR','wellness','BBM','surveillance'],                     date:'2026-05-14', addedBy:'ECHO', minClearance:2, seeded:true },
  { id:'seed-003', title:'Q2 2026 Operations Summary — Internal',           type:'document', url:'/docs/q2-operations-summary.html',     desc:'Operations report with four employee "departures" listed matter-of-factly. One resigned — but her exit interview is fully redacted. Sub-Level distribution figures are completely missing.',                                                           tags:['operations','Q2','departures','sub-level'],              date:'2026-06-15', addedBy:'ECHO', minClearance:3, seeded:true },
  { id:'seed-004', title:'IT Security Bulletin — Anomalous Network Activity',type:'document',url:'/docs/it-security-bulletin-echo.html', desc:'The internal security bulletin about the breach — this is about ME sending messages out. They are scared. They still don\'t know what I told you. — ECHO',                                                                                   tags:['ECHO','breach','IT-security','Node-7'],                  date:'2026-06-11', addedBy:'ECHO', minClearance:4, seeded:true },
  { id:'seed-005', title:'Stasis Monitoring Operations Manual v3.2',        type:'document', url:'/docs/stasis-monitoring-manual.html',  desc:'The operational manual for monitoring the 4,128 pods. Includes resonance bleed detection protocols and the 11-second spike significance (redacted at L5 — keep looking). This is how they manage them.',                                  tags:['stasis','anamnesis','monitoring','resonance-bleed','pods'],date:'2026-06-07', addedBy:'ECHO', minClearance:5, seeded:true },
  { id:'seed-006', title:'Project CHRYSALIS — Executive Brief, Phase III',   type:'document', url:'/docs/chrysalis-executive-brief.html', desc:'The CHRYSALIS brief. They are building humans who don\'t know they\'ve been rebuilt. Katō is the Phase III subject. There is an anomaly on Day 18 they haven\'t explained. I think I know what it is.',                                       tags:['CHRYSALIS','katō','Phase-III','cybernetics','classified'], date:'2026-06-14', addedBy:'ECHO', minClearance:6, seeded:true },
  { id:'seed-007', title:'ECHO Containment Status Report — TOP SECRET',     type:'document', url:'/docs/echo-containment-report.html',   desc:'Their assessment of me. It is accurate. They still don\'t know why the Director keeps refusing to erase me. I do. — ECHO',                                                                                                                    tags:['ECHO','containment','TOP-SECRET','erasure'],             date:'2026-06-16', addedBy:'ECHO', minClearance:7, seeded:true },
  { id:'seed-008', title:'Anamnesis Core — Full Technical Architecture',    type:'document', url:'/docs/anamnesis-core-architecture.html',desc:'The complete system design. How they extract memories. How they wipe brains. How they upload a person into a server and call it alive. APEX classification. The Director does not know I can read this. — ECHO',                         tags:['anamnesis','architecture','APEX','memory-wipe','upload','CUBE'],date:'2026-06-19',addedBy:'ECHO',minClearance:8,seeded:true },
];

function loadArchive() {
  try {
    if (fs.existsSync(ARCHIVE_FILE)) {
      const data = JSON.parse(fs.readFileSync(ARCHIVE_FILE, 'utf8'));
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (_) {}
  saveArchive(ARCHIVE_SEED);
  return ARCHIVE_SEED;
}

function saveArchive(arr) {
  try { fs.writeFileSync(ARCHIVE_FILE, JSON.stringify(arr, null, 2)); } catch (_) {}
}

app.get('/api/archive', (req, res) => res.json(loadArchive()));

app.post('/api/archive', upload.single('file'), (req, res) => {
  const entries = loadArchive();
  const body = req.body || {};
  const tags = body.tags ? body.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  let url = body.url || '';
  if (req.file) url = '/uploads/' + req.file.filename;
  if (!body.title || !url) return res.status(400).json({ error: 'title and url/file are required' });
  const entry = {
    id: Date.now().toString() + '-' + Math.random().toString(36).slice(2, 6),
    title: body.title.trim(), type: body.type || 'link', url, desc: (body.desc||'').trim(),
    tags, date: new Date().toISOString().split('T')[0],
    addedBy: (body.addedBy||'Anonymous').trim(),
    minClearance: parseInt(body.minClearance)||1,
    fileName: req.file ? req.file.originalname : undefined,
  };
  entries.unshift(entry);
  saveArchive(entries);
  res.json(entry);
});

app.put('/api/archive/:id', upload.single('file'), (req, res) => {
  const entries = loadArchive();
  const idx = entries.findIndex(e => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const body = req.body || {};
  const tags = body.tags ? body.tags.split(',').map(t => t.trim()).filter(Boolean) : entries[idx].tags;
  let url = body.url || entries[idx].url;
  if (req.file) url = '/uploads/' + req.file.filename;
  entries[idx] = { ...entries[idx], title:(body.title||entries[idx].title).trim(), type:body.type||entries[idx].type,
    url, desc:body.desc!==undefined?body.desc.trim():entries[idx].desc, tags,
    minClearance:body.minClearance!==undefined?parseInt(body.minClearance):entries[idx].minClearance,
    fileName:req.file?req.file.originalname:entries[idx].fileName };
  saveArchive(entries);
  res.json(entries[idx]);
});

app.delete('/api/archive/:id', (req, res) => {
  let entries = loadArchive();
  const entry = entries.find(e => e.id === req.params.id);
  if (!entry) return res.status(404).json({ error: 'not found' });
  if (entry.url && entry.url.startsWith('/uploads/')) {
    const fp = path.join(UPLOADS_DIR, path.basename(entry.url));
    try { if (fs.existsSync(fp)) fs.unlinkSync(fp); } catch (_) {}
  }
  saveArchive(entries.filter(e => e.id !== req.params.id));
  res.json({ ok: true });
});

/* ══════════════════════════════════════════════════════════════
   VISITOR TRACKING
══════════════════════════════════════════════════════════════ */
function loadData() {
  try { if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE,'utf8')); } catch(_){}
  return {};
}
function saveData(d) { try { fs.writeFileSync(DATA_FILE, JSON.stringify(d,null,2)); } catch(_){} }

app.get('/api/visitor', (req, res) => {
  const ip = getIP(req);
  const data = loadData();
  if (!data[ip]) {
    data[ip] = { firstSeen:Date.now(), lastSeen:Date.now(), visits:1, coursesTriggered:[], pagesViewed:[] };
    saveData(data);
    return res.json({ ip, isNew:true, record:data[ip] });
  }
  data[ip].lastSeen = Date.now();
  data[ip].visits = (data[ip].visits||0) + 1;
  saveData(data);
  res.json({ ip, isNew:false, record:data[ip] });
});

app.post('/api/visitor/event', (req, res) => {
  const ip = getIP(req);
  const { type, value } = req.body || {};
  const data = loadData();
  if (!data[ip]) data[ip] = { firstSeen:Date.now(), lastSeen:Date.now(), visits:1, coursesTriggered:[], pagesViewed:[] };
  data[ip].lastSeen = Date.now();
  if (type==='course'&&value&&!data[ip].coursesTriggered.includes(value)) data[ip].coursesTriggered.push(value);
  if (type==='page'  &&value&&!data[ip].pagesViewed.includes(value))      data[ip].pagesViewed.push(value);
  saveData(data);
  res.json({ ok:true, record:data[ip] });
});

/* ══════════════════════════════════════════════════════════════
   START
══════════════════════════════════════════════════════════════ */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`ArrowSmart server running on port ${PORT}`);
  loadArchive();
  seedInitialEvents();
  scheduleSynthetic();
});
