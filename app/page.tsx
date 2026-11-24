"use client";

import { FormEvent, useMemo, useState } from "react";

type CallOutcome = "Qualified" | "Appointment booked" | "Callback requested" | "No answer";

type Call = {
  name: string;
  business: string;
  agent: string;
  outcome: CallOutcome;
  duration: string;
  when: string;
  summary: string;
};

type Agent = {
  name: string;
  platform: string;
  agentId: string;
  business: string;
};

const sampleCalls: Call[] = [
  { name: "Maya Thompson", business: "Northstar Roofing", agent: "Lead qualifier", outcome: "Qualified", duration: "04:32", when: "Today, 10:42 AM", summary: "Maya owns a two-story home and wants a roof inspection this week. She is interested in a quote and prefers a call tomorrow morning." },
  { name: "Daniel Brooks", business: "Cedar & Stone Dental", agent: "Front desk assistant", outcome: "Appointment booked", duration: "03:18", when: "Today, 9:16 AM", summary: "Booked a cleaning for Thursday at 2:30 PM. Confirmation details were shared." },
  { name: "Olivia Carter", business: "Northstar Roofing", agent: "Lead qualifier", outcome: "Callback requested", duration: "02:51", when: "Today, 8:55 AM", summary: "Asked for a call after 5 PM. Comparing options with two other providers." },
  { name: "Ethan Wilson", business: "Harbor Home Services", agent: "Missed lead recovery", outcome: "Qualified", duration: "05:07", when: "Yesterday, 4:28 PM", summary: "Needs HVAC maintenance before the end of the month and is ready to speak with a technician." },
  { name: "Grace Miller", business: "Cedar & Stone Dental", agent: "Front desk assistant", outcome: "No answer", duration: "00:24", when: "Yesterday, 3:51 PM", summary: "No answer. The agent left a short voicemail with a callback number." },
];

const navigation = [
  { name: "Overview", icon: "◫" },
  { name: "Calls", icon: "◉" },
  { name: "People", icon: "♙" },
  { name: "AI agents", icon: "✳" },
  { name: "Integrations", icon: "⌘" },
];

function Brand({ onClick }: { onClick?: () => void }) {
  return <button className="brand" onClick={onClick} aria-label="Automaxions home"><span className="brand-mark">a.</span><span>automaxions<span className="brand-period">.</span></span></button>;
}

export default function Home() {
  const [screen, setScreen] = useState<"landing" | "dashboard">("landing");
  const [activePage, setActivePage] = useState("Overview");
  const [loginOpen, setLoginOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [calls, setCalls] = useState(sampleCalls);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  const visibleCalls = useMemo(() => calls.filter((call) =>
    `${call.name} ${call.business} ${call.agent} ${call.outcome}`.toLowerCase().includes(search.toLowerCase())
  ), [calls, search]);

  function openDashboard() {
    setLoginOpen(false);
    setScreen("dashboard");
    setActivePage("Overview");
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Connect your server-side sign-in settings to activate client authentication.");
  }

  function addPerson(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const business = String(form.get("business") ?? "").trim();
    if (!name || !business) return;
    setCalls((previous) => [{
      name,
      business,
      agent: "Not assigned yet",
      outcome: "Callback requested",
      duration: "—",
      when: "Just added",
      summary: "New contact added. Connect an AI calling agent to see call transcripts, recordings, and outcomes here.",
    }, ...previous]);
    setShowAddPerson(false);
    setActivePage("People");
  }

  function addAgent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextAgent: Agent = {
      name: String(form.get("agentName") ?? "").trim(),
      platform: String(form.get("platform") ?? "Retell AI"),
      agentId: String(form.get("agentId") ?? "").trim(),
      business: String(form.get("business") ?? "").trim(),
    };
    if (!nextAgent.name || !nextAgent.agentId) return;
    setAgents((previous) => [...previous, nextAgent]);
    setShowAddAgent(false);
    setActivePage("AI agents");
    setNotice("Agent details are shown in this demo workspace. Add a secure server and database before storing live API keys.");
  }

  if (screen === "dashboard") return (
    <main className="app-shell">
      <aside className="sidebar">
        <Brand onClick={() => setScreen("landing")} />
        <div className="workspace-switcher"><span className="workspace-avatar">A</span><span className="workspace-name"><strong>Automaxions</strong><small>Workspace</small></span><span className="switch-chevron">⌄</span></div>
        <p className="nav-caption">WORKSPACE</p>
        <nav className="side-nav" aria-label="Workspace navigation">
          {navigation.map((item) => <button key={item.name} className={`side-link ${activePage === item.name ? "side-link-active" : ""}`} onClick={() => setActivePage(item.name)}><span className="side-link-icon">{item.icon}</span>{item.name}{item.name === "Calls" && <span className="nav-badge">{calls.length}</span>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="trial-box"><span className="trial-star">✳</span><strong>See what your AI team can do</strong><p>Connect a calling agent to bring real conversations into your workspace.</p><button onClick={() => setActivePage("Integrations")}>Connect a platform <span>↗</span></button></div>
          <button className="user-row" onClick={() => setActivePage("Settings")}><span className="user-avatar">A</span><span><strong>Workspace owner</strong><small>Account settings</small></span><span className="user-menu">···</span></button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{activePage}</strong></div><div className="topbar-right"><span className="ready-badge"><i/> Workspace ready</span><button className="top-icon" aria-label="Notifications">♧</button><span className="user-avatar top-avatar">A</span></div></header>
        <div className="dashboard-content">
          <div className="dashboard-title-row"><div><p className="section-overline"><span>✳</span> YOUR CALLING WORKSPACE</p><h1>{activePage === "Overview" ? "Good morning. Here’s the picture." : activePage}</h1><p className="dashboard-subtitle">{activePage === "Overview" ? "Every conversation, turned into a clear next step." : activePage === "Integrations" ? "Bring your voice platforms and AI agents together." : "A clear view of who called, what happened, and what comes next."}</p></div><div className="title-actions"><button className="button button-outline" onClick={() => setActivePage("Integrations")}>⌘ &nbsp;Connect platform</button><button className="button button-solid" onClick={() => setShowAddPerson(true)}>＋ Add a person</button></div></div>

          {activePage === "Overview" && <>
            <div className="metric-grid">{[
              ["Calls handled", "128", "↑ 18%", "compared with last week", "◉"],
              ["People reached", "94", "↑ 12%", "73% of calls answered", "♙"],
              ["Appointments set", "31", "↑ 8%", "Ready for your team", "▣"],
              ["Time given back", "12.4h", "↑ 21%", "Your team’s time, returned", "◷"],
            ].map(([label, value, delta, note, icon]) => <article className="metric-card" key={label}><div className="metric-label">{label}<span className="metric-icon">{icon}</span></div><div className="metric-value">{value}</div><div className="metric-note"><strong>{delta}</strong><span>{note}</span></div></article>)}</div>
            <div className="overview-grid"><article className="surface chart-card"><div className="surface-header"><div><h2>Conversations over time</h2><p>Your AI team is keeping the momentum going.</p></div><button className="period-select">This week⌄</button></div><div className="chart-legend"><span><i className="legend-primary"/>Calls</span><span><i className="legend-soft"/>Successful conversations</span></div><div className="chart-area"><div className="chart-gridlines"><i/><i/><i/><i/></div><div className="chart-columns">{[34,52,41,68,47,76,59,88,63,72,53,94,68,82,57,77,100,71,85,62,91,74,88,65,98,78,89,69].map((height,index)=><div className={`chart-column ${index%3===0?"chart-column-soft":""}`} style={{height:`${height}%`}} key={index}/>)}</div></div><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></article>
              <article className="surface outcome-card"><div className="surface-header"><div><h2>How calls are going</h2><p>Outcomes from recent conversations.</p></div><button className="info-button" aria-label="About call outcomes">i</button></div><div className="outcome-display"><div className="outcome-donut"><div><strong>128</strong><small>total calls</small></div></div><div className="outcome-legend"><div><i className="dot-qualified"/>Qualified<strong>42</strong></div><div><i className="dot-booked"/>Appointments<strong>31</strong></div><div><i className="dot-callback"/>Call backs<strong>21</strong></div><div><i className="dot-other"/>Other<strong>34</strong></div></div></div><div className="outcome-callout">Your AI team found <strong>63 ready-to-act leads</strong> this week.</div></article></div>
            <CallsTable calls={visibleCalls.slice(0, 4)} search={search} setSearch={setSearch} onSelect={setSelectedCall} onSeeAll={() => setActivePage("Calls")} />
          </>}

          {activePage === "Calls" && <CallsTable calls={visibleCalls} search={search} setSearch={setSearch} onSelect={setSelectedCall} />}

          {activePage === "People" && <article className="surface list-surface"><div className="surface-header list-heading"><div><h2>Your people</h2><p>Every new lead and customer your AI team speaks with.</p></div><div className="list-actions"><SearchBox value={search} onChange={setSearch}/><button className="button button-solid" onClick={() => setShowAddPerson(true)}>＋ Add a person</button></div></div><CallsRows calls={visibleCalls} onSelect={setSelectedCall}/></article>}

          {activePage === "AI agents" && <article className="surface list-surface"><div className="surface-header list-heading"><div><h2>Your AI calling agents</h2><p>Bring your existing agents into one clear workspace.</p></div><button className="button button-solid" onClick={() => setShowAddAgent(true)}>＋ Add an agent</button></div>{agents.length ? <div className="agent-list">{agents.map((agent,index)=><div className="agent-row" key={`${agent.agentId}-${index}`}><span className="agent-symbol">✳</span><span><strong>{agent.name}</strong><small>{agent.platform} · Agent ID {agent.agentId} · {agent.business || "No business selected"}</small></span><span className="connection-pending">Needs secure connection</span><button className="row-more" aria-label="Agent options">···</button></div>)}</div> : <EmptyState icon="✳" title="Your agents have a home here" description="Add an agent from Retell AI, Ultravox, or another calling platform to organize every call in one place." button="Add an agent" onClick={() => setShowAddAgent(true)}/>}</article>}

          {activePage === "Integrations" && <div className="integrations-area"><div className="integrations-grid">{[
            ["Retell AI", "R", "Coral", "Connect voice agents, call events, and outcomes."],
            ["Ultravox", "U", "Lilac", "Bring live conversations and call results into view."],
            ["Fish Audio", "F", "Mint", "Set up expressive voice experiences for your agents."],
          ].map(([provider,letter,tone,description])=><article className="surface integration-card" key={provider}><div className={`integration-logo ${tone.toLowerCase()}`}>{letter}</div><div className="integration-text"><h2>{provider}</h2><p>{description}</p></div><span className="not-connected">Not connected</span><button className="button button-outline" onClick={() => setNotice(`Add your ${provider} API key and endpoint in your secure server environment to activate this integration.`)}>Set up connection <span>↗</span></button></article>)}</div><div className="environment-note"><span className="note-icon">⌘</span><div><strong>Provider keys stay on your server</strong><p>When you’re ready, configure <code>RETELL_API_KEY</code>, <code>ULTRAVOX_API_KEY</code>, and <code>FISH_AUDIO_API_KEY</code> as private environment variables.</p></div></div></div>}

          {activePage === "Settings" && <article className="surface settings-surface"><p className="section-overline"><span>✳</span> WORKSPACE PREFERENCES</p><h2>Settings for your team</h2><p>Workspace access and account security will be available when the authentication service is connected.</p><div className="environment-note"><span className="note-icon">♙</span><div><strong>Sign-in configuration</strong><p>Use <code>APP_LOGIN_EMAIL</code>, <code>APP_LOGIN_PASSWORD</code>, and <code>AUTH_SECRET</code> in the server environment. Keep passwords and provider keys out of browser code.</p></div></div><button className="button button-outline" onClick={() => setScreen("landing")}>Back to website</button></article>}

          {notice && <div className="notice-toast" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss">×</button></div>}
          <footer className="dashboard-footer">Made for the people behind every conversation. <span>✳</span></footer>
        </div>
      </section>

      {showAddPerson && <Modal title="Add a person" eyebrow="A NEW CONVERSATION STARTS HERE" onClose={() => setShowAddPerson(false)}><form className="modal-form" onSubmit={addPerson}><p>Add a lead or customer and keep their next step easy to find.</p><label>Person’s name<input name="name" required placeholder="e.g. Jordan Lee" autoFocus/></label><label>Business<input name="business" required placeholder="e.g. Northstar Roofing"/></label><button className="button button-solid modal-submit" type="submit">Add person to workspace <span>→</span></button></form></Modal>}
      {showAddAgent && <Modal title="Add an AI agent" eyebrow="CONNECT YOUR CALLING TEAM" onClose={() => setShowAddAgent(false)}><form className="modal-form" onSubmit={addAgent}><p>Tell us which agent you want to bring into the workspace.</p><label>Agent name<input name="agentName" required placeholder="e.g. Missed lead follow-up" autoFocus/></label><label>Calling platform<select name="platform"><option>Retell AI</option><option>Ultravox</option><option>Other</option></select></label><label>Agent ID<input name="agentId" required placeholder="Your provider’s agent ID"/></label><label>Business<input name="business" placeholder="e.g. Northstar Roofing"/></label><label>Provider API key<input name="apiKey" type="password" autoComplete="new-password" placeholder="Paste your provider API key"/></label><div className="secure-hint">This preview does not save credentials. Add the secure server and database before connecting a live key.</div><button className="button button-solid modal-submit" type="submit">Add agent <span>→</span></button></form></Modal>}
      {selectedCall && <Modal title={selectedCall.name} eyebrow="CONVERSATION SUMMARY" onClose={() => setSelectedCall(null)}><div className="call-detail"><p className="call-detail-meta">{selectedCall.business} <i/> {selectedCall.when}</p><div className="call-result"><span className={`result-dot result-${slug(selectedCall.outcome)}`}/><strong>{selectedCall.outcome}</strong><span>◷ &nbsp;{selectedCall.duration}</span></div><h3>Here’s what happened</h3><p>{selectedCall.summary}</p><div className="recording-placeholder"><button aria-label="Play recording" onClick={() => setNotice("Connect your calling provider to play the recording.")}>▶</button><span><strong>Call recording</strong><small>Connect a provider to listen to this conversation.</small></span><span className="recording-lock">⌑</span></div><button className="button button-outline transcript-button" onClick={() => setNotice("Connect your calling provider to load the full transcript.")}>View full transcript <span>↗</span></button></div></Modal>}
    </main>
  );

  return (
    <main className="landing-page">
      <nav className="site-nav"><Brand/><div className="site-nav-links"><a href="#how">How it works</a><a href="#results">What you get</a><a href="#about">About</a></div><div className="site-nav-actions"><button className="sign-in-link" onClick={() => { setLoginOpen(true); setNotice(""); }}>Client login</button><a className="button button-solid nav-cta" href="#contact">Let’s talk <span>↗</span></a></div><button className="mobile-login" onClick={() => setLoginOpen(true)}>Log in</button></nav>

      <section className="hero-section"><div className="hero-mist"/><div className="hero-copy"><div className="hero-kicker"><i/> NEVER MISS THE NEXT GOOD CUSTOMER</div><h1>Every missed call<br/>is a <em>second chance.</em></h1><p>We help businesses recover missed leads and qualify prospects with friendly AI calling that works around the clock.</p><div className="hero-buttons"><a className="button button-solid hero-button" href="#contact">Get set up in 24 hours <span>↗</span></a><a className="hero-text-link" href="#how">See how it works <span>↓</span></a></div><div className="hero-reassurance"><span>✓</span> 15-day free trial <i/> Setup within 24 hours <i/> Your team stays in control</div></div>
        <div className="hero-visual" aria-label="AI calling system dashboard illustration"><div className="visual-ring ring-outer"/><div className="visual-ring ring-inner"/><div className="visual-core"><span>✳</span><small>YOUR AI CALL TEAM</small></div><div className="float-card lead-card"><span className="mini-initials">MT</span><span><strong>New lead recovered</strong><small>Maya’s ready for a quote</small></span><i>↗</i></div><div className="float-card booking-card"><span className="sound-wave">▂▅▇▅▃</span><span><strong>Appointment booked</strong><small>Today · 2:30 PM</small></span><i className="card-check">✓</i></div><span className="visual-star star-one">✳</span><span className="visual-star star-two">✧</span></div><div className="hero-number"><span>01</span><i/></div></section>

      <section className="industry-strip"><span>MADE FOR TEAMS THAT CARE ABOUT EVERY LEAD</span><div><b>HOME SERVICES</b><i/><b>HEALTH & WELLNESS</b><i/><b>PROFESSIONAL SERVICES</b><i/><b>LOCAL BUSINESSES</b></div></section>

      <section className="section how-section" id="how"><div className="section-intro"><p className="eyebrow"><span>✳</span> SIMPLE FROM THE FIRST CALL</p><h2>A better first hello.<br/><em>A clearer next step.</em></h2><p>Your AI calling system answers, follows up, and listens. You get a simple recap of what happened and what to do next.</p></div><div className="step-grid">{[
        ["01", "↗", "A lead comes in", "A missed call or new inquiry gets a quick, friendly follow-up, even after hours."],
        ["02", "♫", "A real conversation", "Your AI agent learns what the person needs and guides them to the right next step."],
        ["03", "✳", "You see the outcome", "Read a plain-English recap, see who’s ready, and listen to the call when you like."],
      ].map(([number,icon,title,description])=><article className="step-card" key={number}><span className="step-number">{number}</span><div className="step-icon">{icon}</div><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section className="results-section" id="results"><div className="results-copy"><p className="eyebrow"><span>✳</span> THE WHOLE STORY, AT A GLANCE</p><h2>Just the answer to<br/><em>“what happened?”</em></h2><p>Know who’s interested, who booked, and who needs a call back, without digging through complicated software.</p><a className="hero-text-link" href="#contact">See what your team could recover <span>↗</span></a><div className="benefit-list"><span>✓ &nbsp;Know which leads are ready</span><span>✓ &nbsp;Hear the actual conversation</span><span>✓ &nbsp;Give your team a clear next step</span></div></div><article className="call-preview"><div className="preview-status"><span><i/> CALL COMPLETE</span><small>Today · 10:42 AM</small></div><div className="preview-person"><span className="person-avatar">MT</span><span><strong>Maya Thompson</strong><small>Northstar Roofing · 4 min 32 sec</small></span><span className="qualified-pill">Ready for a quote</span></div><div className="preview-rule"/><span className="preview-label">THE SHORT VERSION</span><p>“Maya owns a two-story home and wants a roof inspection this week. She’s interested in a quote and prefers a call tomorrow morning.”</p><div className="next-step"><span>↗</span><span><strong>Here’s what to do next</strong><small>Have your estimator call Maya tomorrow morning.</small></span></div><div className="audio-player"><button onClick={() => setNotice("Call playback will be available after your voice provider is connected.")}>▶</button><span className="audio-bars">{Array.from({length:34},(_,index)=><i key={index} style={{height:`${8+(index*17%22)}px`}}/>)}</span><small>0:00 / 4:32</small></div></article></section>

      <section className="about-section" id="about"><div className="about-monogram">a<span>.</span></div><div className="about-copy"><p className="eyebrow">A SMALL TEAM, HERE TO HELP</p><h2>Made to feel easy.<br/><em>Built around your business.</em></h2><p>We set up AI calling systems that help businesses respond faster and spend more time with the people who need them. We take care of the setup, tune the conversations to your team, and make the results clear for everyone using them.</p><a className="hero-text-link" href="#contact">Tell us about your business <span>↗</span></a></div><div className="about-stamp"><span>BUILT FOR<br/>REAL PEOPLE</span><b>✳</b><small>Thoughtful automation<br/>for local business</small></div></section>

      <section className="offer-section" id="contact"><div className="offer-halo"/><div className="offer-content"><p className="eyebrow"><span>✳</span> LET’S GET YOUR LEADS TALKING</p><h2>Missed leads don’t<br/>have to stay <em>missed.</em></h2><p className="offer-description">I help businesses recover missed leads and qualify prospects with 24/7 AI calling systems, set up within 24 hours and backed by a 15-day free trial.</p><a className="offer-cta" href="mailto:arslan.ai.dev@gmail.com?subject=AI%20calling%20system%20setup">Start your 15-day free trial <span>↗</span></a><small>No pressure. Just a better way to follow up.</small></div><div className="offer-orb orb-left"/><div className="offer-orb orb-right"/></section>

      <footer className="site-footer"><Brand/><span>Good conversations make good business.</span><span>© 2026 Automaxions</span></footer>

      {loginOpen && <Modal title="Welcome back." eyebrow="YOUR CALLING WORKSPACE" onClose={() => setLoginOpen(false)}><form className="modal-form login-form" onSubmit={handleLogin}><p>Sign in to see what happened on your calls.</p><label>Email address<input type="email" required placeholder="you@yourbusiness.com" autoComplete="username"/></label><label>Password<input type="password" required placeholder="Enter your password" autoComplete="current-password"/></label>{notice && <div className="inline-notice">{notice}</div>}<button className="button button-solid modal-submit" type="submit">Sign in to your workspace <span>→</span></button><button className="preview-link" type="button" onClick={openDashboard}>Preview the workspace</button><small className="modal-footnote">Need access? Ask your Automaxions contact for an invite.</small></form></Modal>}
      {notice && !loginOpen && <div className="notice-toast landing-toast" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss">×</button></div>}
    </main>
  );
}

function CallsTable({ calls, search, setSearch, onSelect, onSeeAll }: { calls: Call[]; search: string; setSearch: (value: string) => void; onSelect: (call: Call) => void; onSeeAll?: () => void }) {
  return <article className="surface list-surface"><div className="surface-header list-heading"><div><h2>Recent conversations</h2><p>Plain-language outcomes from every call.</p></div><div className="list-actions"><SearchBox value={search} onChange={setSearch}/>{onSeeAll && <button className="see-all" onClick={onSeeAll}>All calls ↗</button>}</div></div><CallsRows calls={calls} onSelect={onSelect}/></article>;
}

function SearchBox({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="search-box"><span>⌕</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search conversations" aria-label="Search conversations"/></label>;
}

function CallsRows({ calls, onSelect }: { calls: Call[]; onSelect: (call: Call) => void }) {
  return <div className="calls-table"><div className="table-heading"><span>PERSON</span><span>WHAT HAPPENED</span><span>AI AGENT</span><span>CALL LENGTH</span><span>WHEN</span></div>{calls.length ? calls.map((call,index)=><button className="call-row" key={`${call.name}-${index}`} onClick={() => onSelect(call)}><span className="call-person"><span className="person-avatar">{initials(call.name)}</span><span><strong>{call.name}</strong><small>{call.business}</small></span></span><span className="call-outcome"><i className={`result-dot result-${slug(call.outcome)}`}/>{call.outcome}</span><span className="cell-secondary">{call.agent}</span><span className="cell-secondary">{call.duration}</span><span className="cell-secondary">{call.when}</span></button>) : <div className="no-results">No conversations match that search.</div>}</div>;
}

function EmptyState({ icon, title, description, button, onClick }: { icon: string; title: string; description: string; button: string; onClick: () => void }) {
  return <div className="empty-state"><span className="empty-icon">{icon}</span><h3>{title}</h3><p>{description}</p><button className="button button-outline" onClick={onClick}>{button} <span>→</span></button></div>;
}

function Modal({ title, eyebrow, onClose, children }: { title: string; eyebrow: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal-card" role="dialog" aria-modal="true" aria-label={title}><button className="modal-close" onClick={onClose} aria-label="Close">×</button><p className="eyebrow"><span>✳</span> {eyebrow}</p><h2>{title}</h2>{children}</section></div>;
}

function slug(value: string) { return value.toLowerCase().replaceAll(" ", "-"); }
function initials(value: string) { return value.split(" ").map((part) => part[0]).join("").slice(0,2); }
