/* Lidok Portfolio · v2 — Soft Editorial Zine */

const { useState, useEffect } = React;

const ACCENT_VARIANTS = {
  blue: { color: "#C8DAF0", label: "Pale blue" },
  yellow: { color: "#F2E8B0", label: "Soft yellow" },
  lavender: { color: "#D8CFE8", label: "Muted lavender" },
  rose: { color: "#EBD3D0", label: "Dusty rose" },
  mint: { color: "#CFE3D6", label: "Soft mint" }
};

function App() {
  const [tweaks, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "accent": "blue",
    "italics": true,
    "halftone": true,
    "marquee": true
  } /*EDITMODE-END*/);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", ACCENT_VARIANTS[tweaks.accent]?.color || "#C8DAF0");
  }, [tweaks.accent]);

  // toggle italics globally on h1/h2/h3
  useEffect(() => {
    const styleId = "__italic-toggle";
    let s = document.getElementById(styleId);
    if (!s) {
      s = document.createElement("style");
      s.id = styleId;
      document.head.appendChild(s);
    }
    s.textContent = tweaks.italics ?
    "" :
    `h1 em, h2 em, h3 em, .pullquote, .quote, .marquee { font-family: var(--font-sans) !important; font-style: normal !important; }`;
  }, [tweaks.italics]);

  useEffect(() => {
    const styleId = "__halftone-toggle";
    let s = document.getElementById(styleId);
    if (!s) {
      s = document.createElement("style");
      s.id = styleId;
      document.head.appendChild(s);
    }
    s.textContent = tweaks.halftone ?
    "" :
    `.halo, .composition .h1, .composition .h2, .footer .ambient-halftone, .portrait .silhouette::before, .expertise .item .glyph::after, .proof .yt .video::before, .proof .tw-quote::before, .proof .tw .tweet .avatar::after { display: none !important; }`;
  }, [tweaks.halftone]);

  return (
    <>
      <Topbar />
      <Hero />
      {tweaks.marquee && <Marquee />}
      <NarrativeHead />
      <Narrative />
      <ExpertiseHead />
      <Expertise />
      <ProofHead />
      <Proof />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent tone">
          <TweakSelect
            value={tweaks.accent}
            onChange={(v) => setTweak("accent", v)}
            options={Object.entries(ACCENT_VARIANTS).map(([k, v]) => ({ value: k, label: v.label }))} />
          
        </TweakSection>
        <TweakSection title="Editorial flourishes">
          <TweakToggle
            label="Serif italics in headlines"
            value={tweaks.italics}
            onChange={(v) => setTweak("italics", v)} />
          
          <TweakToggle
            label="Halftone dot patterns"
            value={tweaks.halftone}
            onChange={(v) => setTweak("halftone", v)} />
          
          <TweakToggle
            label="Show marquee"
            value={tweaks.marquee}
            onChange={(v) => setTweak("marquee", v)} />
          
        </TweakSection>
      </TweaksPanel>
    </>);

}

/* ---------- Topbar ---------- */
function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="mark"></span>
        <span>Lidia Zhabo</span>
      </div>
      <nav>
        <a href="#about">About</a>
        <a href="#expertise">Expertise</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="meta">
        <span className="status">
          <span className="pulse"></span>
          Available for new projects
        </span>
      </div>
    </header>);

}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="hero" id="about">
      <div className="left">
        <span className="eyebrow">Developer Advocate · Writer · Engineer</span>
        <h1>
          Most protocols look like a{" "}
          <em>pile of raw data.</em>{" "}
          <span className="quiet">I build the story around it.</span>
        </h1>
        <p className="sub">
          I am a Full-Stack Engineer turned Developer Advocate. I translate your
          complex system architecture into content and communities that
          developers actually love.
        </p>
        <div className="cta-cluster">
          <a className="btn-soft" href="mailto:kakdelalidok@gmail.com">
            Let's work together
            <span className="arrow">→</span>
          </a>
          <a className="btn-ghost" href="#work">
            See selected work
          </a>
        </div>
      </div>

      <div className="right">
        <Composition />
      </div>
    </section>);

}

function Composition() {
  return (
    <div className="composition stacked">
      <div className="halftone-shape h1" />
      <div className="halftone-shape h2" />
      <div className="layer lavender l1" />
      <div className="layer blue l2" />
      <div className="layer yellow l3" />

      <div className="portrait">
        <iframe
          className="portrait-video"
          src="https://www.youtube.com/embed/euxJFC8zOOo?autoplay=1&mute=1&loop=1&playlist=euxJFC8zOOo&controls=0&modestbranding=1&playsinline=1&rel=0"
          title="Lidia — short"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen />
        
        <div className="meta">
          <span>01</span>
          <span>SHORT · 2026</span>
        </div>
      </div>

      <div className="chip c1"><span className="dot" /> Lisbon · GMT+0</div>
      <div className="chip c2"><span className="dot" /> 240K+ views</div>
      <div className="chip c3"><span className="dot" /> 7 yr · code</div>
    </div>);

}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = [
  "Building stories around protocols",
  "Translation, not transcription",
  "Onboarding that respects your time",
  "Receipts, not promises",
  "DevRel for grown-up engineering teams"];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        <span>
          {[...items, ...items].map((t, i) =>
          <React.Fragment key={i}>
              {t}
              <span className="star">✦</span>
            </React.Fragment>
          )}
        </span>
      </div>
    </div>);

}

/* ---------- Narrative ---------- */
function NarrativeHead() {
  return (
    <div className="section-head">
      <div className="num">02 / The Thesis</div>
      <div>
        <h2>Code is just data. <em>Developers buy clarity.</em></h2>
        <p className="lede">A short note on why most great SDKs go quietly unused.</p>
      </div>
    </div>);

}

function Narrative() {
  return (
    <section className="narrative">
      <div className="copy">
        <h3>Having a great SDK isn't enough if onboarding takes <em>three days.</em></h3>
        <p>
          I take your raw engineering docs and wrap them in a human-readable
          narrative — the thing a senior dev forwards to their team Slack at
          11pm because it actually explains what the protocol is for, not just
          how to call it.
        </p>
        <div className="pullquote">
          "The iceberg under your API is the product. My job is to draw the iceberg."
        </div>
        <div className="signoff">
          <span className="swatch" />
          <span>— A working note, drafted between issues</span>
        </div>
      </div>

      <LegoFigure />
    </section>);

}

function LegoFigure() {
  return <DataSortingAnimation />;
}

/* ---------- The Data Sorting Algorithm ----------
   Looping 4-phase motion. Each block has a stable id and color;
   only its position/size changes per phase. Phases:
     0 chaos    — random scatter
     1 sorted   — grouped by color in clusters
     2 arranged — vertical stacked bar chart
     3 story    — assembled into a minimalist house
*/

const PHASES = [
{ key: "raw", label: "Raw data", caption: "Unsorted. The state most documentation lives in." },
{ key: "sorted", label: "Sorted", caption: "Grouped by shape. The first act of clarity." },
{ key: "arranged", label: "Arranged", caption: "Stacked into structure. A pattern emerges." },
{ key: "story", label: "The story", caption: "Assembled into something that takes off." }];


/* 5 sophisticated brick colors — muted, magazine-friendly takes on
   classic primaries. Each has a darker shade for the brick's "side wall"
   (isometric depth) and a stud highlight. */
const COLORS = [
{ id: "ink", bg: "#222B36", side: "#141A22", stud: "#2D3845" },
{ id: "blue", bg: "#5A7FB8", side: "#3F5C8E", stud: "#6B8FC6" },
{ id: "rose", bg: "#C97B6E", side: "#9E5A50", stud: "#D88E81" },
{ id: "ochre", bg: "#D9B45A", side: "#A8893E", stud: "#E4C172" },
{ id: "sage", bg: "#7FA388", side: "#5C806B", stud: "#92B59A" }];


/* 30 blocks: 6 per color. */
const PER_COLOR = 6;
const BLOCK_LIST = [];
COLORS.forEach((c, ci) => {
  for (let i = 0; i < PER_COLOR; i++) {
    BLOCK_LIST.push({ id: `${c.id}-${i}`, colorIdx: ci, color: c });
  }
});

/* Stage is 600x440 design units; CSS scales it. */
const STAGE_W = 600;
const STAGE_H = 440;

/* Deterministic pseudo-random for the chaos phase, so SSR/refresh is stable. */
function hash(seed) {
  // FNV-1a — well-mixed even for tiny seed deltas
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  // extra avalanche
  h ^= h >>> 13;h = Math.imul(h, 0x5bd1e995) >>> 0;
  h ^= h >>> 15;
  return h >>> 0;
}
function rand(seed) {return hash(seed) % 100000 / 100000;}

/* Each block has its own random offsets + rotation seed for chaos. */
const CHAOS_SEEDS = BLOCK_LIST.map((b) => ({
  rx: rand(b.id + "x") * 2 - 1, // -1..1
  ry: rand(b.id + "y") * 2 - 1,
  rot: rand(b.id + "r") * 720 - 360, // -360..360
  size: 0.85 + rand(b.id + "s") * 0.35, // 0.85..1.2
  jitter: rand(b.id + "j")
}));

/* PHASE 0 — chaos: a chaotic dumped pile in the center, highly overlapping.
   Gaussian-ish concentration around stage center with random rotation. */
function chaosLayout(b, idx) {
  const s = CHAOS_SEEDS[BLOCK_LIST.indexOf(b)];
  const W = 56,H = 32; // base brick
  const w = W * s.size;
  const h = H * s.size;
  // bias toward center: rx*rx pulls outliers in
  const xSpread = 200; // px from center
  const ySpread = 110;
  const cx = STAGE_W / 2;
  const cy = STAGE_H / 2 + 10;
  // soften extremes
  const fx = Math.sign(s.rx) * Math.pow(Math.abs(s.rx), 1.4);
  const fy = Math.sign(s.ry) * Math.pow(Math.abs(s.ry), 1.4);
  return {
    x: cx + fx * xSpread - w / 2,
    y: cy + fy * ySpread - h / 2,
    w, h,
    rot: s.rot
  };
}

/* PHASE 1 — sorted: 5 messy color piles distributed across stage. */
function sortedLayout(b, idx) {
  const colorIdx = b.colorIdx;
  const slot = idx % PER_COLOR;
  const colW = STAGE_W / 5;
  const cx = colorIdx * colW + colW / 2;
  const cy = STAGE_H / 2 + 10;
  // 6 organic offsets per pile
  const offsets = [
  { dx: -28, dy: -18, r: -12 },
  { dx: 22, dy: -22, r: 14 },
  { dx: -10, dy: 6, r: -4 },
  { dx: 26, dy: 14, r: 9 },
  { dx: -22, dy: 22, r: -16 },
  { dx: 4, dy: -4, r: 2 }];

  const o = offsets[slot];
  const w = 52,h = 30;
  return {
    x: cx + o.dx - w / 2,
    y: cy + o.dy - h / 2,
    w, h,
    rot: o.r
  };
}

/* PHASE 2 — arranged: rigid grid / bar chart by color.
   6 rows × 5 columns = exactly 30 cells. Each color owns one column. */
function arrangedLayout(b, idx) {
  const colorIdx = b.colorIdx;
  const slot = idx % PER_COLOR; // 0..5 — row from bottom
  const colW = STAGE_W / 5;
  const w = 64,h = 28;
  const cx = colorIdx * colW + colW / 2;
  const baseY = STAGE_H - 36;
  // bar chart heights — variable so it reads as a chart not just a grid
  const heights = [6, 4, 5, 3, 5]; // bars per column out of 6
  const visible = slot < heights[colorIdx];
  return {
    x: cx - w / 2,
    y: baseY - (slot + 1) * (h + 4),
    w, h,
    rot: 0,
    opacity: visible ? 1 : 0
  };
}

/* PHASE 3 — story: 30-brick pixel-art house silhouette.
   Layout grid: 10 cols × 8 rows of 40x32 cells, centered.
   We define a tile map then fill it with bricks. Bricks are 1×1 cells. */
const HOUSE_TILES = (() => {
  // 10 cols × 8 rows
  // tile chars: . empty, R roof(ink), W wall(blue), S sage, O ochre(foundation), D rose(door)
  // 30 filled cells exactly
  const map = [
  "....RR....", // 0  apex
  "...RRRR...", // 1  roof
  "..RRWWRR..", // 2  roof + window line
  ".WWSSSWW..", // 3  walls
  ".WSDDSWW..", // 4  walls + door top
  ".OSDDSOO..", // 5  foundation + door
  ".OOOOOOO..", // 6  foundation
  ".........." // 7
  ];
  // Count: row0=2, row1=4, row2=6(2R+2W+2R)=6, row3=2W+3S+2W=7, row4=1W+1S+2D+1S+2W=7, row5=1O+1S+2D+1S+2O=7, row6=7O
  // total = 2+4+6+7+7+7+7 = 40 — too many. Trim to 30 by reducing some rows.
  // Re-design (target 30 exactly):
  const map2 = [
  "....RR....", // 0: 2  (ink roof apex)
  "...RWWR...", // 1: 4  (2 ink + 2 blue)
  "..RWWWWR..", // 2: 6  (2 ink + 4 blue)
  "..SSDDSS..", // 3: 6  (4 sage + 2 rose-door-top)
  "..SODDSO..", // 4: 6  (2 sage + 2 ochre + 2 rose-door)
  "..OOOOOO.." // 5: 6  (6 ochre)
  ];
  // count: 2+4+6+6+6+6 = 30 ✓
  return map2;
})();

/* Map tiles to slots. Group by color so we can assign each color's bricks
   in scan order. */
const HOUSE_SLOTS_BY_COLOR = (() => {
  const COLS = 10,ROWS = 6;
  // tile cell size — keep proportional to stage
  const cellW = 36;
  const cellH = 32;
  const totalW = COLS * cellW;
  const totalH = ROWS * cellH;
  const offsetX = (STAGE_W - totalW) / 2;
  const offsetY = (STAGE_H - totalH) / 2 + 10;

  const colorOf = { R: "ink", W: "blue", S: "sage", D: "rose", O: "ochre" };
  const slots = { ink: [], blue: [], sage: [], rose: [], ochre: [] };

  HOUSE_TILES.forEach((row, ri) => {
    for (let ci = 0; ci < COLS; ci++) {
      const ch = row[ci];
      if (ch === ".") continue;
      const colorKey = colorOf[ch];
      slots[colorKey].push({
        x: offsetX + ci * cellW,
        y: offsetY + ri * cellH,
        w: cellW - 3,
        h: cellH - 3,
        rot: 0
      });
    }
  });
  return slots;
})();

/* PHASE 3 — story: 30-brick rocket flying upward.
   Designed by hand with explicit per-color slot lists (no tile map).
   Each color contributes exactly 6 bricks; together they form a rocket
   silhouette with rose = red flame core, ochre = outer flame, ink = nose tip,
   blue = body, sage = fins. */
const ROCKET_SLOTS_BY_COLOR = (() => {
  // Brick footprint — narrower than the house tiles so the rocket reads as tall.
  const CW = 30; // brick width
  const CH = 22; // brick height
  // Center-x of stage
  const CX = STAGE_W / 2;
  // Top y for the apex tip — pushed down so the rocket sits vertically centered.
  const TOP = 80;
  // Helper: a slot at column offset (in brick widths from center) and row index from top.
  // colOff is measured in CW units from CX; rowIdx in CH units from TOP.
  const at = (colOff, rowIdx, opts = {}) => ({
    x: CX + colOff * CW - CW / 2,
    y: TOP + rowIdx * CH,
    w: CW - 3,
    h: CH - 2,
    rot: opts.rot || 0
  });

  return {
    // INK — dark nose cone (apex 1 brick + 2 brick row + 2 trim bricks on shoulders + 1 small antenna)
    ink: [
    at(0, 0), // 0 antenna/tip
    at(-0.5, 1), // 1 cone left
    at(0.5, 1), // 2 cone right
    at(-1, 2), // 3 cone shoulder L
    at(1, 2), // 4 cone shoulder R
    { x: CX - CW / 2, y: TOP - CH * 0.9, // 5 — slim antenna spire (taller, narrower)
      w: CW - 3, h: CH - 8, rot: 0 }],


    // BLUE — main body (3 rows × 2 wide = 6 bricks). Sits below the cone.
    blue: [
    at(-0.5, 3), at(0.5, 3), // body row 1
    at(-0.5, 4), at(0.5, 4), // body row 2
    at(-0.5, 5), at(0.5, 5) // body row 3
    ],

    // ROSE — red porthole windows + red flame core (2 windows in body + 4 flame bricks)
    rose: [
    // 2 round-ish portholes embedded in body row 4 (overlap blue, drawn on top)
    { x: CX - CW * 0.85, y: TOP + CH * 4.05, w: CW * 0.55, h: CH * 0.55, rot: 0 },
    { x: CX + CW * 0.30, y: TOP + CH * 4.05, w: CW * 0.55, h: CH * 0.55, rot: 0 },
    // 4 red flame bricks — central, descending tongues
    { x: CX - CW * 0.5, y: TOP + CH * 6.4, w: CW - 3, h: CH - 4, rot: -4 },
    { x: CX - CW * 0.05, y: TOP + CH * 6.6, w: CW - 5, h: CH - 4, rot: 6 },
    { x: CX - CW * 0.55, y: TOP + CH * 7.5, w: CW - 8, h: CH - 6, rot: -8 },
    { x: CX - CW * 0.05, y: TOP + CH * 7.7, w: CW - 8, h: CH - 6, rot: 10 }],


    // SAGE — 2 fins (3 bricks each) flanking the body base.
    sage: [
    // Left fin — 3 bricks stepping outward
    at(-1.5, 4),
    at(-1.85, 5, { rot: -8 }),
    at(-1.5, 6, { rot: -4 }),
    // Right fin
    at(1.5, 4),
    at(1.85, 5, { rot: 8 }),
    at(1.5, 6, { rot: 4 })],


    // OCHRE — outer yellow flame (6 bricks fanning out below body)
    ochre: [
    { x: CX - CW * 1.2, y: TOP + CH * 6.6, w: CW - 6, h: CH - 4, rot: -18 },
    { x: CX + CW * 0.2, y: TOP + CH * 6.6, w: CW - 6, h: CH - 4, rot: 18 },
    { x: CX - CW * 1.4, y: TOP + CH * 7.5, w: CW - 8, h: CH - 6, rot: -28 },
    { x: CX + CW * 0.4, y: TOP + CH * 7.5, w: CW - 8, h: CH - 6, rot: 28 },
    { x: CX - CW * 1.0, y: TOP + CH * 8.4, w: CW - 12, h: CH - 8, rot: -22 },
    { x: CX + CW * 0.0, y: TOP + CH * 8.4, w: CW - 12, h: CH - 8, rot: 22 }]

  };
})();

function storyLayout(b, idx) {
  const colorKey = b.color.id;
  const slotsForColor = ROCKET_SLOTS_BY_COLOR[colorKey] || [];
  const slotIdx = idx % PER_COLOR;
  const slot = slotsForColor[slotIdx];
  if (!slot) {
    return { x: STAGE_W / 2, y: STAGE_H + 60, w: 40, h: 28, rot: 0, opacity: 0 };
  }
  return { ...slot, opacity: 1 };
}

const LAYOUTS = [chaosLayout, sortedLayout, arrangedLayout, storyLayout];

function DataSortingAnimation() {
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  // bumps every time phase changes (auto OR click) so the progress-fill
  // animation restarts and the next-advance timer is always fresh
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (paused) return;
    const PHASE_MS = 2800;
    const t = setTimeout(() => {
      setPhase((p) => (p + 1) % PHASES.length);
      setTick((x) => x + 1);
    }, PHASE_MS);
    return () => clearTimeout(t);
  }, [phase, paused, tick]);

  const goTo = (i) => {
    setPhase(i);
    setTick((x) => x + 1);
  };

  const layoutFn = LAYOUTS[phase];

  return (
    <figure className="dsa-figure">
      <div
        className="dsa-frame"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>
        
        <div className="dsa-bg-halo" />
        <div className="dsa-bg-halftone" />

        <div className="dsa-tag">Fig. 02 · The data-sorting algorithm</div>

        <div className="dsa-stage" style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}>
          <div className="dsa-baseline" style={{ opacity: phase === 2 || phase === 3 ? 1 : 0 }} />

          {BLOCK_LIST.map((b, idx) => {
            // idx within this block's color (0..PER_COLOR-1)
            const colorIdx = b.colorIdx;
            const localIdx = idx - colorIdx * PER_COLOR;
            const layout = layoutFn(b, localIdx);
            const opacity = layout.opacity ?? 1;
            // convert to percentages so blocks fill the actual rendered stage
            const xPct = layout.x / STAGE_W * 100;
            const yPct = layout.y / STAGE_H * 100;
            const wPct = layout.w / STAGE_W * 100;
            const hPct = layout.h / STAGE_H * 100;
            // z-index: in chaos, randomize stack; in story, lower bricks behind
            const zIndex = phase === 0 ?
            2 + Math.floor(rand(b.id + "z") * 30) :
            phase === 3 ?
            2 + Math.floor(layout.y / STAGE_H * 30) :
            2 + localIdx;
            return (
              <div
                key={b.id}
                className="dsa-brick"
                style={{
                  opacity,
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  width: `${wPct}%`,
                  height: `${hPct}%`,
                  transform: `rotate(${layout.rot}deg)`,
                  transitionDelay: `${localIdx * 14 + colorIdx * 18}ms`,
                  zIndex,
                  "--brick-bg": b.color.bg,
                  "--brick-side": b.color.side,
                  "--brick-stud": b.color.stud
                }}>
                
                <span className="dsa-brick-top">
                  <span className="dsa-stud" />
                  <span className="dsa-stud" />
                </span>
                <span className="dsa-brick-side" />
              </div>);

          })}
        </div>

        <div className="dsa-controls">
          <div className="dsa-progress">
            {PHASES.map((p, i) =>
            <button
              key={p.key}
              className={`dsa-step ${i === phase ? "is-active" : ""} ${i < phase ? "is-done" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Show phase: ${p.label}`}>
              
                <span className="dsa-step-num">0{i + 1}</span>
                <span className="dsa-step-label">{p.label}</span>
                <span className="dsa-step-bar">
                  <span
                  key={i === phase ? `fill-${tick}` : `idle-${i}`}
                  className="dsa-step-fill"
                  style={{
                    animation:
                    i === phase && !paused ?
                    "dsaFill 2.8s linear forwards" :
                    "none",
                    width: i < phase ? "100%" : i === phase && paused ? "100%" : "0%"
                  }} />
                
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <figcaption className="dsa-caption">
        <span className="dsa-caption-label">{PHASES[phase].label}</span>
        <span className="dsa-caption-text">{PHASES[phase].caption}</span>
      </figcaption>
    </figure>);

}

/* ---------- Expertise ---------- */
function ExpertiseHead() {
  return (
    <div className="section-head" id="expertise">
      <div className="num">03 / Expertise</div>
      <div>
        <h2>How I can help <em>your protocol</em> grow.</h2>
        <p className="lede">Four overlapping practices. Mix as needed — I retainer or one-off.</p>
      </div>
    </div>);

}

function Expertise() {
  const items = [
  {
    cls: "e1",
    num: "01",
    title: "Developer Video Content",
    body: "Scripts, technical tutorials, and YouTube strategy. From architecture breakdowns to SDK reviews — I ship dev-facing video that doesn't read like a marketing ad.",
    tags: ["Long-form", "Shorts", "Storyboard", "Thumbnails", "Captions"]
  },
  {
    cls: "e2",
    num: "02",
    title: "Technical Deep-Dives",
    body: "Turning dense whitepapers and docs into engaging social threads and blog essays. I read the source code so your users don't have to.",
    tags: ["Threads", "Blog", "Whitepapers", "Diagrams"]
  },
  {
    cls: "e3",
    num: "03",
    title: "Developer Experience (DX)",
    body: "Auditing SDKs, fixing docs, and smoothing the first 15 minutes of onboarding. I find where developers bounce — and fix it.",
    tags: ["Audit", "Quickstart", "Error copy", "CLI UX"]
  },
  {
    cls: "e4",
    num: "04",
    title: "Community & Feedback Loops",
    body: "Managing developer communities, running technical AMAs, and bridging the gap between users and engineering.",
    tags: ["Discord", "AMAs", "Office hours", "Issue triage"]
  }];

  return (
    <section className="expertise">
      {items.map((it) =>
      <article key={it.num} className={`item ${it.cls}`}>
          <div className="head">
            <div className="num">№ {it.num}</div>
            <div className="glyph" />
          </div>
          <h4>{it.title}</h4>
          <p>{it.body}</p>
          <div className="tags">
            {it.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </article>
      )}
    </section>);

}

/* ---------- Proof ---------- */
function ProofHead() {
  return (
    <div className="section-head" id="work">
      <div className="num">04 / Receipts</div>
      <div>
        <h2><em>Don't trust,</em> verify.</h2>
        <p className="lede">A handful of pieces that traveled. Click anywhere to read more — these are placeholders.</p>
      </div>
    </div>);

}

function Proof() {
  return (
    <section className="proof">
      <article className="card yt">
        <div className="top"><span>YouTube · Featured</span><span>500 views</span></div>
        <h5>"The Complete AI Map (Every Term Explained in 7 Minutes)"</h5>
        <div className="video">
          <iframe
            className="yt-embed"
            src="https://www.youtube.com/embed/7AdZsPiBAuI?start=250&modestbranding=1&rel=0"
            title="Lidia — Postgres talk"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen />
          
        </div>
        <div className="meta"><span>youtube.com/@lidiaintech</span><span>Apr 2026</span></div>
      </article>

      <article className="card tw">
        <div className="top"><span>X · DEVREL PHILOSOPHY</span><span>1.6K views</span></div>
        <a className="tw-link" href="https://x.com/lidiaintech/status/2049965145091150165" target="_blank" rel="noreferrer">
          <div className="tweet">
            <div className="row">
              <div className="avatar" />
              <div>
                <div className="name">Lidia</div>
                <div className="handle">@lidiaintech · Apr 30</div>
              </div>
            </div>
            <p className="tw-body">
              This image perfectly visualizes why I became a Developer Advocate.
              In tech, we have millions of brilliant engineers building incredible
              Lego blocks: complex APIs, smart contracts, infrastructure.
              But the problem is, nobody falls in love with a chaotic pile of
              plastic bricks.
            </p>
            <div className="tw-metrics">
              <span><strong>20</strong> Likes</span>
              <span><strong>7</strong> Reposts</span>
              <span><strong>1.6K</strong> Views</span>
            </div>
          </div>
          <span className="tw-readmore">Read full thread <span className="arrow">↗</span></span>
        </a>
        <div className="meta"><span>x.com/lidiaintech</span><span>Apr 30, 2026</span></div>
      </article>

      <article className="card tw-quote">
        <div className="top"><span>TIKTOK · TECH SHORT</span><span>20K+ views</span></div>
        <a className="tt-link" href="https://www.tiktok.com/@lidiaintech/video/7628367341838961953" target="_blank" rel="noreferrer">
          <p className="quote">
            "How Hackers Bypass Passwords & 2FA 🍪 #SystemDesign #Cybersecurity"
          </p>
          <span className="tt-watch">
            <span className="tt-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5 L19 12 L8 19 Z" /></svg>
            </span>
            Watch video
            <span className="arrow">↗</span>
          </span>
        </a>
        <div className="tt-metrics">
          <span><strong>1K</strong> Likes</span>
          <span><strong>305</strong> Saves</span>
        </div>
        <div className="meta"><span>Lidia in Tech (@lidiaintech)</span><span>tiktok.com</span></div>
      </article>
    </section>);

}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="ambient a1" />
      <div className="ambient a2" />
      <div className="ambient-halftone" />

      <h2>
        Need a DevRel?<br />
         <em>Let's talk.</em>
      </h2>

      <div className="cta-cluster">
        <a className="btn-soft" href="https://calendly.com/kakdelalidok" target="_blank" rel="noreferrer">
          Book an intro call
          <span className="arrow">→</span>
        </a>
        <a className="btn-ghost" href="mailto:kakdelalidok@gmail.com">kakdelalidok@gmail.com</a>
      </div>

      <div className="socials">
        <a href="https://x.com/lidiaintech" target="_blank" rel="noreferrer">
          <span className="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4 L20 20 M20 4 L4 20" /></svg>
          </span>
          <span className="platform sr-only">X</span>
          <span className="handle">@lidiaintech</span>
          <span className="arrow">↗</span>
        </a>
        <a href="https://youtube.com/@lidiaintech" target="_blank" rel="noreferrer">
          <span className="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="3" /><path d="M10.5 9.5 L15 12 L10.5 14.5 Z" fill="currentColor" stroke="none" /></svg>
          </span>
          <span className="platform sr-only">YouTube</span>
          <span className="handle">@lidiaintech</span>
          <span className="arrow">↗</span>
        </a>
        <a href="https://github.com/lzhabo" target="_blank" rel="noreferrer">
          <span className="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5 C6.8 2.5 2.5 6.8 2.5 12 C2.5 16.2 5.2 19.7 8.9 20.9 C9.4 21 9.6 20.7 9.6 20.4 C9.6 20.2 9.6 19.6 9.6 18.8 C7 19.4 6.4 17.6 6.4 17.6 C5.9 16.4 5.2 16.1 5.2 16.1 C4.2 15.4 5.3 15.4 5.3 15.4 C6.4 15.5 7 16.6 7 16.6 C8 18.3 9.7 17.8 10.4 17.5 C10.5 16.8 10.8 16.3 11.1 16 C9 15.8 6.8 15 6.8 11.4 C6.8 10.4 7.2 9.5 7.8 8.9 C7.7 8.6 7.4 7.6 7.9 6.3 C7.9 6.3 8.7 6 10.5 7.2 C11.3 7 12.2 6.9 13 6.9 C13.8 6.9 14.7 7 15.5 7.2 C17.3 6 18.1 6.3 18.1 6.3 C18.6 7.6 18.3 8.6 18.2 8.9 C18.8 9.5 19.2 10.4 19.2 11.4 C19.2 15 17 15.8 14.9 16 C15.3 16.4 15.6 17.1 15.6 18.2 C15.6 19.7 15.6 20.2 15.6 20.4 C15.6 20.7 15.8 21 16.3 20.9 C19.8 19.7 22.5 16.2 22.5 12 C22.5 6.8 18.2 2.5 13 2.5 Z" /></svg>
          </span>
          <span className="platform sr-only">GitHub</span>
          <span className="handle">/lzhabo</span>
          <span className="arrow">↗</span>
        </a>
        <a href="https://t.me/kakdelaldiok" target="_blank" rel="noreferrer">
          <span className="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.5" /><path d="M7.5 12.2 L16.5 8 L14.8 16.5 L11.5 13.8 L13.8 11.4 M11.5 13.8 L11.5 16.2" /></svg>
          </span>
          <span className="platform sr-only">Telegram</span>
          <span className="handle">@kakdelaldiok</span>
          <span className="arrow">↗</span>
        </a>
        <a href="https://www.tiktok.com/@lidiaintech" target="_blank" rel="noreferrer">
          <span className="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3 L14 15.2 a3.8 3.8 0 1 1 -3.8 -3.8 M14 3 c0.4 2.4 2.2 4.2 4.6 4.6" /></svg>
          </span>
          <span className="platform sr-only">TikTok</span>
          <span className="handle">@lidiaintech</span>
          <span className="arrow">↗</span>
        </a>
      </div>

      <div className="colophon">
        <span>© 2026 Lidia</span>
        <span>All rights reserved</span>
      </div>
    </footer>);

}

/* mount */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);