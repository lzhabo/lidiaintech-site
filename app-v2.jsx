/* Lidok Portfolio · v2 — Soft Editorial Zine (DevRel positioning) */

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
      <main>
        <Hero />
        {tweaks.marquee && <Marquee />}

        <section className="bring" id="bring" aria-label="What I Bring">
          <BringHead />
          <Bring />
        </section>

        <section className="do" id="do" aria-label="What I Do">
          <DoHead />
          <Do />
        </section>

        <section className="proof-wrap" id="work" aria-label="Selected Work">
          <ProofHead />
          <Proof />
        </section>
      </main>
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
        <a href="#do">What I Do</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="meta">
        <span className="status">
          <span className="pulse"></span>
          Open to roles
        </span>
      </div>
    </header>);
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="hero" id="about">
      <div className="left">
        <span className="eyebrow">Lidia Zhabo · Lisbon, Portugal (EU)</span>
        <h1>
          I make complex technology <em>irresistible</em>{" "}
          <span className="quiet">to developers — then measure it.</span>
        </h1>
        <p className="sub">Developer Relations &amp; AI Developer Advocate.</p>

        <div className="hero-links">
          <a href="https://linkedin.com/in/lidia-zhabo" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/lzhabo" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://youtube.com/@lidiaintech" target="_blank" rel="noreferrer">YouTube</a>
          <a href="mailto:kakdelalidok@gmail.com">kakdelalidok@gmail.com</a>
        </div>

        <div className="cta-cluster">
          <a className="btn-soft" href="https://drive.google.com/file/d/1doeIiqPsRSZtrFswnoN3iKUVwZql6kRv/view?usp=sharing" target="_blank" rel="noreferrer">
            📄 Download CV
            <span className="arrow">→</span>
          </a>
          <a className="btn-ghost" href="#do">
            See what I do
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
          <span>SHORT · 2026</span>
        </div>
      </div>

      <div className="chip c1"><span className="dot" /> Lisbon · EU time</div>
      <div className="chip c2"><span className="dot" /> 240K+ views</div>
      <div className="chip c3"><span className="dot" /> 6+ yr · code</div>
    </div>);
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = [
  "Shipped code before shipping content",
  "Translation, not transcription",
  "Onboarding that respects your time",
  "Receipts, not promises",
  "AI agents, LLM workflows, developer trust"];

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

/* ---------- What I Bring ---------- */
function BringHead() {
  return (
    <div className="section-head">
      <div className="num">02 / What I Bring</div>
      <div>
        <h2>I'm the DevRel who's actually <em>shipped product.</em></h2>
        <p className="lede">Engineering depth, not just a talking track.</p>
      </div>
    </div>);
}

function Bring() {
  return (
    <div className="narrative">
      <div className="copy">
        <h3>6+ years from engineering to CTO to <em>founder.</em></h3>
        <p>
          I don't just advocate for technology — I've built it. AI agents and
          LLM workflows are my current focus; Web3 infrastructure is where I
          earned my engineering depth. 240K+ YouTube views on educational
          developer content — I treat advocacy as a measurable growth
          function, from the first view to the first API call and beyond.
        </p>
        <div className="signoff">
          <span className="swatch" />
          <span>— A working note, drafted between issues</span>
        </div>
      </div>

      <OpenRoles />
    </div>);
}

/* ---------- Open to Roles callout ---------- */
function OpenRoles() {
  return (
    <div className="open-roles">
      <span className="open-roles-tag"><span className="pulse-dot" /> Open to roles</span>
      <p>
        DevRel, Developer Advocate, and Developer Experience roles at AI,
        devtools, and technical infrastructure companies.
      </p>
      <p className="open-roles-meta">B2B contract · Remote from Lisbon (EU) · Available now</p>
    </div>);
}

/* ---------- What I Do ---------- */
function DoHead() {
  return (
    <div className="section-head">
      <div className="num">03 / What I Do</div>
      <div>
        <h2>The three legs of <em>developer growth.</em></h2>
        <p className="lede">Content, experience, and community — each one measured.</p>
      </div>
    </div>);
}

function Do() {
  const items = [
  {
    cls: "e1",
    num: "01",
    title: "Developer Content & Education",
    body: "YouTube strategy. Technical tutorials. Architecture breakdowns. I turn complex tech into content developers actually watch — 240K+ views and counting.",
    tags: ["Long-form", "Shorts", "Tutorials", "Analytics"]
  },
  {
    cls: "e2",
    num: "02",
    title: "Developer Experience",
    body: "SDK onboarding. Documentation that doesn't suck. Time-to-first-API-call optimization. I've built SDKs for trader onboarding as CTO — I know what good DX feels like from both sides.",
    tags: ["Onboarding", "Docs", "SDKs", "Funnel"]
  },
  {
    cls: "e3",
    num: "03",
    title: "Community & Advocacy",
    body: "Technical AMAs. Developer feedback loops that reach engineering. Community that stays because they're learning, not because they're managed. I bridge developers and product because I've been both.",
    tags: ["AMAs", "Feedback loops", "Community"]
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

/* ---------- Selected Work ---------- */
function ProofHead() {
  return (
    <div className="section-head">
      <div className="num">04 / Selected Work</div>
      <div>
        <h2><em>Don't trust,</em> verify.</h2>
        <p className="lede">A handful of pieces that traveled.</p>
      </div>
    </div>);
}

function Proof() {
  return (
    <section className="proof">
      <article className="card tw-quote">
        <div className="top"><span>TIKTOK · TECH SHORT</span><span>20K+ views</span></div>
        <h5>"How Hackers Bypass Passwords & 2FA 🍪"</h5>
        <div className="tt-video">
          <blockquote
            className="tiktok-embed"
            cite="https://www.tiktok.com/@lidiaintech/video/7628367341838961953"
            data-video-id="7628367341838961953"
            style={{ maxWidth: '325px', minWidth: '325px' }}>
            <section>
              <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@lidiaintech/video/7628367341838961953">@lidiaintech</a>
            </section>
          </blockquote>
        </div>
        <div className="tt-metrics">
          <span><strong>1K</strong> Likes</span>
          <span><strong>305</strong> Saves</span>
          <span><strong>20K+</strong> Views</span>
        </div>
        <div className="meta">
          <span>@lidiaintech · #SystemDesign #Cybersecurity</span>
          <a href="https://www.tiktok.com/@lidiaintech/video/7628367341838961953" target="_blank" rel="noreferrer" className="meta-link">Open on TikTok ↗</a>
        </div>
      </article>

      <article className="card yt">
        <div className="top"><span>YouTube · Featured</span><span>500 views</span></div>
        <h5>"The Complete AI Map (Every Term Explained in 7 Minutes)"</h5>
        <div className="video">
          <iframe
            className="yt-embed"
            src="https://www.youtube.com/embed/7AdZsPiBAuI?start=250&modestbranding=1&rel=0"
            title="Lidia — The Complete AI Map"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen />
        </div>
        <div className="meta"><span>youtube.com/@lidiaintech</span><span>Apr 2026</span></div>
      </article>

      <article className="card tw">
        <div className="top"><span>X · GROWTH PHILOSOPHY</span><span>1.6K views</span></div>
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
        Open to DevRel roles.<br />
        <em>Let's talk.</em>
      </h2>

      <div className="cta-cluster">
        <a className="btn-soft" href="mailto:kakdelalidok@gmail.com">
          kakdelalidok@gmail.com
          <span className="arrow">→</span>
        </a>
        <a className="btn-ghost" href="https://drive.google.com/file/d/1doeIiqPsRSZtrFswnoN3iKUVwZql6kRv/view?usp=sharing" target="_blank" rel="noreferrer">📄 Download CV</a>
      </div>

      <div className="socials">
        <a href="https://linkedin.com/in/lidia-zhabo" target="_blank" rel="noreferrer">
          <span className="platform">LinkedIn</span>
          <span className="handle">/lidia-zhabo</span>
        </a>
        <a href="https://github.com/lzhabo" target="_blank" rel="noreferrer">
          <span className="platform">GitHub</span>
          <span className="handle">/lzhabo</span>
        </a>
        <a href="https://youtube.com/@lidiaintech" target="_blank" rel="noreferrer">
          <span className="platform">YouTube</span>
          <span className="handle">@lidiaintech</span>
        </a>
      </div>

      <div className="colophon">
        <span>© 2026 Lidia Zhabo</span>
        <span>Built in Lisbon.</span>
      </div>
    </footer>);
}

/* mount */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
