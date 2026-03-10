'use client';
import { useEffect, useRef, useState } from 'react';

/* ══════════════════════════════════════════
   CSS
══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&display=swap');

:root {
  --ch:#FAF9F6; --chd:#F0EDE5;
  --or:#FF7600; --orw:#FF8C24;
  --ord:rgba(255,118,0,.10); --orb:rgba(255,118,0,.26);
  --st:#2C2A27; --stm:#6B6560; --stl:#ABA59D;
  --str:rgba(44,42,39,.09); --strd:rgba(44,42,39,.16);
  --fd:'Cormorant Garamond',Georgia,serif;
  --fb:'DM Sans',system-ui,sans-serif;
  --ease:cubic-bezier(0.22,1,0.36,1);
  --sf:0 16px 48px rgba(44,42,39,.09),0 6px 18px rgba(44,42,39,.05);
  --sfu:0 28px 70px rgba(44,42,39,.13),0 12px 32px rgba(44,42,39,.07);
  --so:0 8px 36px rgba(255,118,0,.22),0 2px 8px rgba(255,118,0,.14);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;overflow-x:hidden;-webkit-text-size-adjust:100%}
body{font-family:var(--fb);font-size:clamp(.9rem,2.5vw,1.05rem);line-height:1.65;color:var(--st);background:var(--ch);-webkit-font-smoothing:antialiased;overflow-x:hidden}
::selection{background:var(--ord);color:var(--st)}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:var(--ch)}
::-webkit-scrollbar-thumb{background:var(--orb);border-radius:99px}
a{text-decoration:none;color:inherit}

/* grain */
body::before{content:'';position:fixed;inset:-50%;width:200%;height:200%;pointer-events:none;z-index:9999;opacity:.025;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation:grain 7s steps(1) infinite}

/* ── keyframes ── */
@keyframes grain{0%{transform:translate(0,0)}14%{transform:translate(-2%,-3%)}28%{transform:translate(3%,2%)}42%{transform:translate(-1%,4%)}57%{transform:translate(4%,-2%)}71%{transform:translate(-3%,1%)}85%{transform:translate(2%,-4%)}100%{transform:translate(0,0)}}
@keyframes maskRise{from{transform:translateY(108%)}to{transform:translateY(0)}}
@keyframes fadeUp{from{transform:translateY(22px);opacity:0;filter:blur(3px)}to{transform:translateY(0);opacity:1;filter:blur(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(255,118,0,.42)}70%{box-shadow:0 0 0 10px rgba(255,118,0,0)}100%{box-shadow:0 0 0 0 rgba(255,118,0,0)}}
@keyframes scrollLine{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
@keyframes cardIn{from{transform:scale(.94) translateY(40px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
@keyframes wave{0%,100%{height:4px;opacity:.35}50%{height:15px;opacity:1}}
@keyframes floatA{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-12px) rotate(2deg)}}
@keyframes floatB{0%,100%{transform:translateY(0) rotate(1deg)}50%{transform:translateY(-8px) rotate(-2deg)}}
@keyframes floatC{0%,100%{transform:translateY(0) rotate(2deg)}50%{transform:translateY(-10px) rotate(-1deg)}}
@keyframes floatD{0%,100%{transform:translateY(-4px) rotate(-1deg)}50%{transform:translateY(8px) rotate(2deg)}}
@keyframes orbitSpin{from{transform:rotate(0deg) translateX(160px) rotate(0deg)}to{transform:rotate(360deg) translateX(160px) rotate(-360deg)}}
@keyframes orbitSpinRev{from{transform:rotate(0deg) translateX(110px) rotate(0deg)}to{transform:rotate(-360deg) translateX(110px) rotate(360deg)}}
@keyframes marqueeL{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes ringPulse{0%,100%{transform:scale(1);opacity:.12}50%{transform:scale(1.08);opacity:.22}}
@keyframes ringPulse2{0%,100%{transform:scale(1);opacity:.07}50%{transform:scale(1.12);opacity:.15}}
@keyframes dashRotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes dotBlink{0%,100%{opacity:1}50%{opacity:.2}}
@keyframes counterUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}

/* ── HEADLINE CYCLING ANIMATIONS ── */
@keyframes hedSlideIn{
  from{transform:translateY(60px);opacity:0;filter:blur(4px)}
  to{transform:translateY(0);opacity:1;filter:blur(0)}
}
@keyframes hedSlideOut{
  from{transform:translateY(0);opacity:1;filter:blur(0)}
  to{transform:translateY(-50px);opacity:0;filter:blur(4px)}
}
@keyframes cursorBlink{
  0%,49%{opacity:1}
  50%,100%{opacity:0}
}

.h-hed-wrap{
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  min-height:clamp(13rem,28vw,26rem);
  padding-bottom:1.2rem;
  margin-bottom:1.8rem;
  overflow:visible;
  width:100%;
}

/* The animated headline block */
.h-hed-anim{
  position:absolute;
  inset:0;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:.12em;
  pointer-events:none;
}
/* lines 1 & 2: slide-up reveal */
.h-hed-anim.entering .hline-slide{
  animation:hedSlideIn .75s var(--ease) both;
}
.h-hed-anim.exiting .hline-slide{
  animation:hedSlideOut .5s var(--ease) both;
}
.h-hed-anim .hline-slide:nth-child(2){animation-delay:.1s}
.h-hed-anim.exiting .hline-slide:nth-child(2){animation-delay:.04s}

/* line 3: typewriter — handled in JS, just style here */
.hline-type{
  display:block;
  font-family:var(--fd);
  font-size:clamp(3.4rem,9vw,9.5rem);
  font-weight:300;
  letter-spacing:-.03em;
  line-height:.92;
  white-space:nowrap;
  background:linear-gradient(90deg,var(--or),#FF9940,var(--or));
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;
  animation:shimmer 4s linear infinite;
  /* fade in when typing starts */
  opacity:0;
  transition:opacity .2s;
}
.hline-type.typing{opacity:1}

/* blinking cursor shown next to typed text */
.hline-cursor{
  display:inline-block;
  width:.08em;height:.85em;
  background:var(--or);
  margin-left:.06em;
  vertical-align:-.1em;
  border-radius:1px;
  animation:cursorBlink .85s step-end infinite;
  flex-shrink:0;
}
/* wrapper so cursor sits beside gradient text */
.hline-type-row{
  display:flex;
  align-items:baseline;
  justify-content:center;
}

.hline-slide{
  display:block;
  font-family:var(--fd);
  font-size:clamp(3.4rem,9vw,9.5rem);
  font-weight:300;
  letter-spacing:-.03em;
  color:var(--st);
  line-height:.92;
  white-space:nowrap;
}
.hline-slide.it{font-style:italic;color:var(--or)}

/* ── FAQ ── */
#faq{background:var(--ch)}
.faq-grid{display:grid;grid-template-columns:1fr;gap:.75rem;max-width:760px}
.faq-item{background:rgba(255,255,255,.6);backdrop-filter:blur(14px);border:1px solid var(--str);border-radius:14px;overflow:hidden;transition:border-color .3s var(--ease),box-shadow .3s var(--ease)}
.faq-item.open{border-color:var(--orb);box-shadow:0 4px 24px rgba(255,118,0,.07)}
.faq-q{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.1rem 1.3rem;cursor:pointer;user-select:none}
.faq-qt{font-size:clamp(.88rem,1.5vw,.97rem);font-weight:500;color:var(--st);line-height:1.4;flex:1}
.faq-item.open .faq-qt{color:var(--or)}
.faq-icon{width:26px;height:26px;border-radius:99px;border:1px solid var(--strd);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .3s var(--ease);background:transparent}
.faq-item.open .faq-icon{background:var(--or);border-color:var(--or)}
.faq-icon svg{transition:transform .35s var(--ease)}
.faq-item.open .faq-icon svg{transform:rotate(45deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .45s var(--ease),padding .35s var(--ease)}
.faq-item.open .faq-a{max-height:400px}
.faq-a-inner{padding:0 1.3rem 1.2rem;font-size:.88rem;font-weight:300;line-height:1.75;color:var(--stm);border-top:1px solid var(--str)}
.faq-a-inner p{padding-top:.9rem}
.faq-a-inner strong{font-weight:500;color:var(--st)}

/* ── LEGAL MODAL ── */
@keyframes modalIn{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.modal-bg{position:fixed;inset:0;z-index:9000;background:rgba(44,42,39,.45);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:1rem;animation:fadeIn .25s var(--ease)}
.modal-box{background:#FAF9F6;border:1px solid var(--str);border-radius:20px;box-shadow:0 32px 80px rgba(44,42,39,.18);width:100%;max-width:640px;max-height:88vh;display:flex;flex-direction:column;animation:modalIn .35s var(--ease)}
.modal-head{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 1.8rem 1rem;border-bottom:1px solid var(--str);flex-shrink:0}
.modal-title{font-family:var(--fd);font-size:clamp(1.3rem,3vw,1.7rem);font-weight:400;letter-spacing:-.01em;color:var(--st)}
.modal-close{width:32px;height:32px;border-radius:99px;border:1px solid var(--strd);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--stm);transition:all .25s var(--ease);flex-shrink:0}
.modal-close:hover{background:var(--st);color:#fff;border-color:var(--st)}
.modal-body{overflow-y:auto;padding:1.6rem 1.8rem 2rem;flex:1}
.modal-body::-webkit-scrollbar{width:3px}
.modal-body::-webkit-scrollbar-thumb{background:var(--orb);border-radius:99px}
.modal-date{font-size:.6rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--stl);margin-bottom:1.4rem}
.modal-body h3{font-family:var(--fd);font-size:1.05rem;font-weight:400;color:var(--st);margin:1.4rem 0 .4rem;letter-spacing:-.01em}
.modal-body h3:first-of-type{margin-top:0}
.modal-body p{font-size:.88rem;font-weight:300;line-height:1.75;color:var(--stm);margin-bottom:.6rem}
.modal-body a{color:var(--or);text-decoration:underline;text-underline-offset:2px}

/* layout */
.wrap{max-width:1360px;margin-inline:auto;padding-inline:clamp(1rem,5vw,4.5rem)}
.sp{padding-block:clamp(4rem,9vw,8rem)}

/* ── NAV ── */
nav{position:fixed;top:0;left:0;right:0;z-index:200;transition:all .55s var(--ease);animation:fadeIn .8s var(--ease) .1s both;background:rgba(255,255,255,.55);backdrop-filter:blur(32px) saturate(220%);-webkit-backdrop-filter:blur(32px) saturate(220%);border-bottom:1px solid rgba(255,255,255,.5)}
nav.sc{background:rgba(255,255,255,.75);backdrop-filter:blur(40px) saturate(250%);-webkit-backdrop-filter:blur(40px) saturate(250%);border-bottom:1px solid rgba(255,255,255,.6);box-shadow:0 2px 24px rgba(44,42,39,.07)}
.ni{display:flex;align-items:center;justify-content:space-between;padding-block:clamp(.85rem,2vw,1.25rem)}
.logo{display:flex;align-items:center;gap:.65rem;cursor:pointer}
.lm{position:relative;width:30px;height:30px;flex-shrink:0}
.lr{position:absolute;inset:0;border:1.5px solid var(--orb);border-radius:6px;transform:rotate(45deg)}
.lc{position:absolute;inset:5px;background:var(--or);border-radius:3px;transform:rotate(45deg)}
.lt{display:flex;flex-direction:column;line-height:1;gap:1px}
.lt-t{font-family:var(--fd);font-size:1rem;font-weight:300;letter-spacing:-.01em;color:var(--st)}
.lt-s{font-size:.45rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--stm)}
.nd{display:none;align-items:center;gap:clamp(1.2rem,2.5vw,2rem);list-style:none}
@media(min-width:768px){.nd{display:flex}}
.nd a{font-size:.7rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--stm);transition:color .3s var(--ease);position:relative;padding-bottom:2px;cursor:pointer}
.nd a::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:1px;background:var(--or);transform:scaleX(0);transform-origin:left;transition:transform .35s var(--ease)}
.nd a:hover{color:var(--st)}.nd a:hover::after{transform:scaleX(1)}
.nc{display:none;align-items:center;gap:.6rem}
@media(min-width:768px){.nc{display:flex}}
.hbtn{display:flex;flex-direction:column;gap:5px;padding:8px 6px;cursor:pointer;background:none;border:none}
@media(min-width:768px){.hbtn{display:none}}
.hli{display:block;height:1.5px;background:var(--st);border-radius:99px;transition:all .38s var(--ease)}
.hli:nth-child(1){width:22px}.hli:nth-child(2){width:16px}.hli:nth-child(3){width:22px}
.hbtn.op .hli:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
.hbtn.op .hli:nth-child(2){opacity:0;transform:scaleX(0)}
.hbtn.op .hli:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}
.mm{display:none;position:fixed;inset:0;z-index:190;background:rgba(250,249,246,.97);backdrop-filter:blur(24px);flex-direction:column;align-items:center;justify-content:center;gap:2rem;padding:2rem}
.mm.op{display:flex;animation:fadeIn .3s var(--ease)}
.mm a{font-family:var(--fd);font-size:clamp(1.8rem,6vw,2.8rem);font-weight:300;color:var(--st);letter-spacing:-.01em;transition:color .3s var(--ease);cursor:pointer}
.mm a:hover{color:var(--or)}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;gap:.45rem;font-family:var(--fb);font-weight:500;letter-spacing:.05em;cursor:pointer;border:none;transition:all .4s var(--ease);white-space:nowrap}
.bp{font-size:.78rem;padding:.72rem 1.5rem;background:var(--or);color:#fff;border-radius:99px;animation:pulse 2.6s infinite}
.bp:hover{background:var(--orw);transform:translateY(-2px);box-shadow:var(--so)}
.bg2{font-size:.78rem;padding:.7rem 1.4rem;background:transparent;color:var(--st);border-radius:99px;border:1px solid var(--strd)}
.bg2:hover{border-color:var(--or);color:var(--or);transform:translateY(-1px)}

/* ══════════════════ HERO ══════════════════ */
#hero{
  min-height:100svh;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  position:relative;overflow:hidden;
  padding-top:clamp(5rem,12vw,8rem);
  padding-bottom:clamp(2rem,6vw,4rem);
  text-align:center;
}

/* background radial blobs */
.h-blob1{position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(255,118,0,.07) 0%,transparent 70%);top:-15%;right:-10%;pointer-events:none}
.h-blob2{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(255,118,0,.05) 0%,transparent 70%);bottom:-10%;left:-8%;pointer-events:none}
.h-blob3{position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(255,118,0,.04) 0%,transparent 70%);top:40%;left:20%;pointer-events:none}

/* decorative rings */
.h-ring{position:absolute;border-radius:50%;border:1px dashed var(--orb);animation:ringPulse 6s ease-in-out infinite;pointer-events:none}
.h-ring1{width:500px;height:500px;top:50%;left:50%;margin-top:-250px;margin-left:-250px;animation-delay:0s}
.h-ring2{width:780px;height:780px;top:50%;left:50%;margin-top:-390px;margin-left:-390px;animation:ringPulse2 8s ease-in-out infinite}
@media(max-width:600px){.h-ring1{width:320px;height:320px;margin-top:-160px;margin-left:-160px}.h-ring2{width:500px;height:500px;margin-top:-250px;margin-left:-250px}}

/* grid lines */
.h-grid{position:absolute;inset:0;pointer-events:none}
.h-gline{position:absolute;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent,rgba(44,42,39,.04) 30%,rgba(44,42,39,.04) 70%,transparent)}

/* eyebrow */
.h-eyebrow{display:flex;align-items:center;gap:.65rem;justify-content:center;animation:fadeUp .8s var(--ease) .1s both;margin-bottom:2rem}
.h-pill{display:flex;align-items:center;gap:.5rem;background:rgba(255,118,0,.08);border:1px solid var(--orb);border-radius:99px;padding:.35rem .9rem}
.h-pill-dot{width:6px;height:6px;border-radius:50%;background:var(--or);animation:dotBlink 2s ease-in-out infinite}
.h-pill-t{font-size:.62rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--or)}

/* sub copy */
.h-sub{font-size:clamp(1rem,2.2vw,1.2rem);font-weight:300;line-height:1.7;color:var(--stm);max-width:540px;margin:0 auto 2.2rem;animation:fadeUp .9s var(--ease) .9s both}

/* cta row */
.h-ctas{display:flex;flex-wrap:wrap;gap:.65rem;align-items:center;justify-content:center;animation:fadeUp .9s var(--ease) 1.05s both;margin-bottom:3.5rem}

/* ── FLOATING STAT PILLS ── */
.h-stats{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;animation:fadeUp .9s var(--ease) 1.2s both;margin-bottom:2.5rem}
.hstat{display:flex;align-items:center;gap:.65rem;background:rgba(255,255,255,.65);backdrop-filter:blur(14px);border:1px solid var(--str);border-radius:14px;padding:.65rem 1rem;box-shadow:0 4px 20px rgba(44,42,39,.06)}
.hstat-icon{width:32px;height:32px;border-radius:9px;background:var(--ord);border:1px solid var(--orb);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.hstat-icon svg{width:15px;height:15px}
.hstat-body{display:flex;flex-direction:column;gap:1px}
.hstat-val{font-family:var(--fd);font-size:1.15rem;font-weight:400;color:var(--st);line-height:1;letter-spacing:-.01em}
.hstat-lbl{font-size:.55rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--stl)}

/* ── MARQUEE STRIP ── */
.h-marquee-wrap{width:100%;overflow:hidden;border-top:1px solid var(--str);border-bottom:1px solid var(--str);padding:.8rem 0;animation:fadeIn 1s var(--ease) 1.5s both}
.h-marquee{display:flex;gap:0;width:max-content;animation:marqueeL 28s linear infinite}
.h-marquee-item{display:flex;align-items:center;gap:.6rem;padding:0 2.5rem;white-space:nowrap}
.hm-dot{width:4px;height:4px;border-radius:50%;background:var(--orb);flex-shrink:0}
.hm-text{font-size:.62rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--stm)}
.hm-icon{width:18px;height:18px;border-radius:5px;background:var(--ord);border:1px solid var(--orb);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.hm-icon svg{width:9px;height:9px}

/* floating icon cards — absolutely positioned decorative */
.h-float{position:absolute;pointer-events:none;animation-timing-function:ease-in-out;animation-iteration-count:infinite}
.hf-card{background:rgba(255,255,255,.72);backdrop-filter:blur(12px);border:1px solid var(--str);border-radius:12px;padding:.55rem .8rem;display:flex;align-items:center;gap:.5rem;box-shadow:0 6px 22px rgba(44,42,39,.07)}
.hf-icon{width:24px;height:24px;border-radius:7px;background:var(--ord);border:1px solid var(--orb);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.hf-icon svg{width:11px;height:11px}
.hf-label{font-size:.56rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--stm)}
.hf-val{font-size:.7rem;font-weight:500;color:var(--or)}
@media(max-width:959px){.h-float{display:none}}
.hf1{left:4%;top:28%;animation:floatA 5s ease-in-out infinite;animation-delay:0s}
.hf2{right:4%;top:32%;animation:floatB 6s ease-in-out infinite;animation-delay:.8s}
.hf3{left:7%;bottom:28%;animation:floatC 5.5s ease-in-out infinite;animation-delay:.4s}
.hf4{right:6%;bottom:26%;animation:floatD 4.8s ease-in-out infinite;animation-delay:1.2s}

/* scroll hint */
.shhint{display:flex;flex-direction:column;align-items:center;gap:5px;animation:fadeIn 1s var(--ease) 2s both;margin-top:auto}
.shhint-l{font-size:.5rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--stl)}
.shhint-ln{width:1px;height:38px;background:linear-gradient(to bottom,var(--or),transparent);animation:scrollLine 2s var(--ease) 2.2s infinite}

/* ══════════════════ WORK / PRODUCTS / BOOKING / FOOTER ══════════════════ */
.se{display:flex;align-items:center;gap:.65rem;margin-bottom:1.2rem}
.ru{display:block;width:34px;height:1.5px;background:var(--or);border-radius:99px;flex-shrink:0}
.lb{font-size:.66rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--stm)}
.sh2{font-family:var(--fd);font-size:clamp(2.2rem,5.5vw,5rem);font-weight:300;line-height:1.06;letter-spacing:-.025em;color:var(--st);max-width:640px;margin-bottom:1rem}
.sh2 em{font-style:italic;color:var(--or)}
.ss{font-size:clamp(.9rem,1.8vw,1.05rem);font-weight:300;line-height:1.7;color:var(--stm);max-width:480px;margin-bottom:clamp(2.5rem,5vw,4rem)}
.csk{display:flex;flex-direction:column;gap:clamp(1.2rem,2.5vw,2rem)}
.cc{background:rgba(255,255,255,.6);backdrop-filter:blur(16px) saturate(150%);border:1px solid var(--str);border-radius:20px;box-shadow:var(--sf);display:grid;grid-template-columns:1fr;overflow:hidden;transition:box-shadow .6s var(--ease),transform .6s var(--ease),border-color .4s var(--ease);opacity:0;transform:scale(.94) translateY(40px)}
.cc.vis{animation:cardIn 1.1s var(--ease) forwards}
.cc:hover{box-shadow:var(--sfu);transform:translateY(-5px)!important;border-color:var(--orb)}
@media(min-width:700px){.cc{grid-template-columns:55fr 45fr}.cc.rv{grid-template-columns:45fr 55fr}}
.cbp{padding:clamp(1.5rem,4vw,3rem);display:flex;flex-direction:column;gap:1.2rem}
.cc.rv .cbp{order:2}.cc.rv .cvp{order:1}
.ct2{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem}
.ci2{font-size:.56rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--stl)}
.ctg{font-size:.56rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--stm);background:rgba(250,249,246,.9);border:1px solid var(--strd);border-radius:99px;padding:.28rem .65rem}
.cn{display:flex;align-items:flex-start;gap:.5rem;background:rgba(255,118,0,.06);border:1px solid rgba(255,118,0,.22);border-radius:10px;padding:.65rem .8rem}
.cn-t{font-size:.68rem;font-weight:400;color:var(--stm);line-height:1.55}
.cn-t strong{font-weight:500;color:var(--st)}
.ccl{font-family:var(--fd);font-size:clamp(1.5rem,3vw,2.2rem);font-weight:400;letter-spacing:-.01em;line-height:1.1;color:var(--st)}
.chl{font-family:var(--fd);font-style:italic;font-size:clamp(.95rem,1.6vw,1.1rem);font-weight:300;color:var(--stm);line-height:1.45}
.ctx{font-size:clamp(.84rem,1.3vw,.93rem);font-weight:300;line-height:1.7;color:var(--stm)}
.cbu{padding-top:1rem;border-top:1px solid var(--str)}
.cbl{font-size:.58rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--stl);margin-bottom:.5rem}
.cps{display:flex;flex-wrap:wrap;gap:.38rem}
.cp{font-size:.6rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--stm);background:rgba(250,249,246,.9);border:1px solid var(--strd);border-radius:99px;padding:.36rem .75rem;transition:transform .3s var(--ease)}
.cp:hover{transform:scale(1.05)}
.cp.or{border-color:var(--orb);color:var(--or)}
.cvp{position:relative;min-height:200px;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:2rem}
@media(min-width:700px){.cvp{min-height:auto}}
.cvn{position:absolute;bottom:.25rem;right:1.25rem;font-family:var(--fd);font-size:clamp(4rem,9vw,8.5rem);font-weight:300;color:rgba(44,42,39,.04);letter-spacing:-.04em;line-height:1;pointer-events:none;user-select:none}
.cvi{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:1rem;width:100%}
.sf2{background:rgba(250,249,246,.8);border:1px solid var(--str);border-radius:12px;padding:1rem;display:flex;flex-direction:column;gap:.65rem}
.sf-t{font-size:.7rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--st)}
.svr{display:flex;flex-wrap:wrap;gap:1.5rem;padding-top:.5rem}
.sv{display:flex;flex-direction:column;gap:2px}
.sv-v{font-family:var(--fd);font-size:clamp(1.6rem,3vw,2rem);font-weight:300;color:var(--or);line-height:1}
.sv-l{font-size:.6rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--stl)}
.fv{display:flex;flex-direction:column;align-items:center;gap:3px;width:80%;margin-top:.5rem}
.fb2{border-radius:4px;border:1px solid var(--orb);display:flex;align-items:center;justify-content:center}
.fb-l{font-size:.5rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--stm);padding:4px 8px}
.wv{display:flex;align-items:center;gap:2.5px;height:16px}
.wv span{display:block;width:2.5px;border-radius:2px;background:var(--or);animation:wave 1.2s ease-in-out infinite}
#products{background:var(--chd)}
.pg{display:grid;grid-template-columns:1fr;gap:1.5rem}
@media(min-width:600px){.pg{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1000px){.pg{grid-template-columns:repeat(3,1fr)}}
.pc{background:rgba(255,255,255,.65);backdrop-filter:blur(14px);border:1px solid var(--str);border-radius:18px;box-shadow:var(--sf);padding:clamp(1.5rem,3vw,2.2rem);display:flex;flex-direction:column;gap:1.1rem;transition:box-shadow .55s var(--ease),transform .55s var(--ease),border-color .4s var(--ease);opacity:0;transform:translateY(30px)}
.pc.vis{animation:cardIn 1s var(--ease) forwards}
.pc:hover{box-shadow:var(--sfu);transform:translateY(-5px);border-color:var(--orb)}
.piw{width:48px;height:48px;border-radius:14px;background:var(--ord);border:1px solid var(--orb);display:flex;align-items:center;justify-content:center}
.piw svg{width:22px;height:22px}
.pt2{font-size:.54rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--or)}
.pn{font-family:var(--fd);font-size:clamp(1.3rem,2.5vw,1.7rem);font-weight:400;letter-spacing:-.01em;line-height:1.1;color:var(--st)}
.pd{font-size:clamp(.84rem,1.4vw,.92rem);font-weight:300;line-height:1.68;color:var(--stm)}
.pf{display:flex;flex-direction:column;gap:.45rem;padding-top:.85rem;border-top:1px solid var(--str)}
.pft{display:flex;align-items:flex-start;gap:.5rem;font-size:.72rem;font-weight:400;color:var(--stm);line-height:1.5}
.fd2{width:5px;height:5px;border-radius:50%;background:var(--or);flex-shrink:0;margin-top:.38em}
.pc-cta{margin-top:auto;display:inline-flex;align-items:center;gap:.38rem;font-size:.62rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--or);transition:gap .3s var(--ease)}
.pc-cta:hover{gap:.6rem}
.cs2{display:inline-flex;align-items:center;gap:.35rem;font-size:.54rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--stl);background:rgba(44,42,39,.06);border:1px solid var(--strd);border-radius:99px;padding:.28rem .65rem;width:fit-content}
#booking{background:var(--chd);position:relative;overflow:hidden}
#booking::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 50% 60% at 50% 50%,rgba(255,118,0,.04) 0%,transparent 65%)}
.bi{position:relative;z-index:1;display:grid;grid-template-columns:1fr;gap:clamp(2.5rem,5vw,4rem)}
@media(min-width:860px){.bi{grid-template-columns:1fr 1fr;align-items:start}}
.bc{display:flex;flex-direction:column;gap:1.4rem}
.bb{font-size:clamp(.9rem,1.8vw,1.05rem);font-weight:300;line-height:1.7;color:var(--stm)}
.bps{display:flex;flex-direction:column;gap:.75rem;padding-top:.5rem}
.bpt{display:flex;align-items:flex-start;gap:.6rem;font-size:.82rem;font-weight:400;color:var(--stm);line-height:1.55}
.bpd{width:6px;height:6px;border-radius:50%;background:var(--or);flex-shrink:0;margin-top:.38em}
.bw{background:rgba(255,255,255,.6);backdrop-filter:blur(16px) saturate(150%);border:1px solid var(--str);border-radius:20px;box-shadow:var(--sf);padding:clamp(1.5rem,3vw,2rem);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;min-height:180px}
.bwl{font-size:.62rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--stl)}
.cta{text-align:center;display:flex;flex-direction:column;align-items:center;gap:1.2rem;padding-top:clamp(2.5rem,6vw,4.5rem)}
.ctd{width:70px;height:1px;background:linear-gradient(90deg,transparent,var(--orb),transparent)}
.ctb{font-size:clamp(.95rem,1.8vw,1.1rem);font-weight:300;color:var(--stm);max-width:360px}
footer{border-top:1px solid var(--str);padding:2rem 0}
.fi{display:flex;flex-direction:column;align-items:center;gap:1rem;text-align:center}
@media(min-width:540px){.fi{flex-direction:row;justify-content:space-between;text-align:left}}
.fl{display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center}
.fl a{font-size:.64rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--stl);transition:color .3s var(--ease);cursor:pointer}
.fl a:hover{color:var(--or)}
.rv{opacity:0;transform:translateY(28px);transition:opacity .85s var(--ease),transform .85s var(--ease)}
.rv.vis{opacity:1;transform:translateY(0)}
.rv1{transition-delay:.1s}.rv2{transition-delay:.2s}
`;

/* ══════════════════════════════════════════
   HEADLINE SETS — cycling
══════════════════════════════════════════ */
const HEADLINES: Array<{ lines: string[]; styles: Array<'plain' | 'it' | 'sh'> }> = [
  {
    lines: ['Automation', 'that thinks.', 'Scale that lasts.'],
    styles: ['plain', 'it', 'sh'],
  },
  {
    lines: ['AI-powered', 'and human-ready.', 'Leads that convert.'],
    styles: ['plain', 'it', 'sh'],
  },
  {
    lines: ['Intelligence', 'built to scale.', 'Conversations that close.'],
    styles: ['plain', 'it', 'sh'],
  },
  {
    lines: ['Smart automation.', 'Real results.', 'Always on.'],
    styles: ['plain', 'it', 'sh'],
  },
  {
    lines: ['Voice agents', 'that work 24/7.', 'Growth that sticks.'],
    styles: ['plain', 'it', 'sh'],
  },
  {
    lines: ['Automation done right.', 'No fluff.', 'Every lead counts.'],
    styles: ['plain', 'it', 'sh'],
  },
  {
    lines: ['AI meets action.', 'Process perfected.', 'Your growth, amplified.'],
    styles: ['plain', 'it', 'sh'],
  },
];

/* ══════════════════════════════════════════
   NAV
══════════════════════════════════════════ */
function Nav({ onBook }: { onBook: () => void }) {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { document.body.style.overflow = op ? 'hidden' : ''; }, [op]);
  const go = (id: string) => { setOp(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return (
    <>
      <div className={`mm${op ? ' op' : ''}`}>
        <a onClick={() => go('hero')}>Services</a>
        <a onClick={() => go('work')}>Work</a>
        <a onClick={() => go('products')}>Products</a>
        <button className="btn bp" style={{ marginTop: '.5rem' }} onClick={() => { setOp(false); go('booking'); }}>Book a Call →</button>
      </div>
      <nav className={sc ? 'sc' : ''}>
        <div className="wrap">
          <div className="ni">
            <div className="logo" onClick={() => go('hero')}>
              <div className="lm"><div className="lr" /><div className="lc" /></div>
              <div className="lt"><span className="lt-t">Automaxions</span><span className="lt-s">AI Automation</span></div>
            </div>
            <ul className="nd">
              <li><a onClick={() => go('hero')}>Services</a></li>
              <li><a onClick={() => go('work')}>Work</a></li>
              <li><a onClick={() => go('products')}>Products</a></li>
            </ul>
            <div className="nc">
              <button className="btn bg2" onClick={() => go('work')}>View Work</button>
              <button className="btn bp" onClick={() => go('booking')}>
                Book a Call
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
            <button className={`hbtn${op ? ' op' : ''}`} onClick={() => setOp(!op)} aria-label="Menu">
              <span className="hli" /><span className="hli" /><span className="hli" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

/* ══════════════════════════════════════════
   ANIMATED HEADLINE
   Lines 1 & 2 → slide-up reveal
   Line 3       → real character-by-character typewriter
══════════════════════════════════════════ */
function AnimatedHeadline() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'entering' | 'typing' | 'visible' | 'exiting'>('entering');
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const typerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const set = HEADLINES[idx];
  const line3 = set.lines[2];

  // type out line3 character by character
  const startTyping = (text: string) => {
    setTyped('');
    setShowCursor(true);
    let i = 0;
    const tick = () => {
      i++;
      setTyped(text.slice(0, i));
      if (i < text.length) {
        typerRef.current = setTimeout(tick, 52);
      } else {
        // done typing — hold, then exit
        typerRef.current = setTimeout(() => setPhase('exiting'), 2800);
      }
    };
    typerRef.current = setTimeout(tick, 80);
  };

  useEffect(() => {
    if (typerRef.current) clearTimeout(typerRef.current);

    if (phase === 'entering') {
      // slide lines 1&2 in, then start typing line 3 after 600ms
      typerRef.current = setTimeout(() => {
        setPhase('typing');
      }, 600);

    } else if (phase === 'typing') {
      startTyping(line3);

    } else if (phase === 'exiting') {
      setShowCursor(false);
      typerRef.current = setTimeout(() => {
        setTyped('');
        setIdx(i => (i + 1) % HEADLINES.length);
        setPhase('entering');
      }, 520);
    }

    return () => { if (typerRef.current) clearTimeout(typerRef.current); };
  }, [phase, idx]);

  const slidePhase = phase === 'entering' ? 'entering' : phase === 'exiting' ? 'exiting' : 'entering';

  return (
    <div className="h-hed-wrap" style={{ animation: 'fadeUp .9s var(--ease) .3s both' }}>
      <div className={`h-hed-anim ${slidePhase}`}>
        {/* Line 1 — plain, slide animation */}
        <span key={`${idx}-0`} className="hline-slide">{set.lines[0]}</span>
        {/* Line 2 — italic orange, slide animation */}
        <span key={`${idx}-1`} className="hline-slide it">{set.lines[1]}</span>
        {/* Line 3 — shimmer gradient + typewriter */}
        <div className="hline-type-row" key={`${idx}-2`}>
          <span className={`hline-type${phase !== 'entering' ? ' typing' : ''}`}>
            {typed}
          </span>
          {showCursor && <span className="hline-cursor" />}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MARQUEE ITEMS
══════════════════════════════════════════ */
const MARQUEE_ITEMS = [
  { icon: <svg viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#FF7600" strokeWidth="1.1" /><path d="M5.5 3.5v2.5l1.5 1" stroke="#FF7600" strokeWidth="1.1" strokeLinecap="round" /></svg>, label: 'Sub-2s Voice Response' },
  { icon: <svg viewBox="0 0 11 11" fill="none"><path d="M2 4h7M2 4L3.8 2.5M2 4l1.8 1.5M9 7H2M9 7L7.2 5.5M9 7l-1.8 1.5" stroke="#FF7600" strokeWidth="1.1" strokeLinecap="round" /></svg>, label: 'Inbound & Outbound' },
  { icon: <svg viewBox="0 0 11 11" fill="none"><rect x="1.5" y="2" width="8" height="7" rx="1.5" stroke="#FF7600" strokeWidth="1.1" /><path d="M1.5 4.5h8" stroke="#FF7600" strokeWidth="1.1" /></svg>, label: 'CRM Integration' },
  { icon: <svg viewBox="0 0 11 11" fill="none"><path d="M2 3h7a.75.75 0 0 1 .75.75v3.5A.75.75 0 0 1 9 8H6.2L4.5 9.5V8H2a.75.75 0 0 1-.75-.75v-3.5A.75.75 0 0 1 2 3Z" stroke="#FF7600" strokeWidth="1.1" /></svg>, label: 'Natural Dialogue' },
  { icon: <svg viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="4" r="2" stroke="#FF7600" strokeWidth="1.1" /><path d="M1.5 9.5c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#FF7600" strokeWidth="1.1" strokeLinecap="round" /></svg>, label: 'Human Handoff' },
  { icon: <svg viewBox="0 0 11 11" fill="none"><path d="M2 8.5V6l3.5-4L9 6v2.5" stroke="#FF7600" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 8.5v-2h3v2" stroke="#FF7600" strokeWidth="1.1" /></svg>, label: 'Real Estate AI' },
  { icon: <svg viewBox="0 0 11 11" fill="none"><rect x="2" y="1.5" width="7" height="8" rx="1.5" stroke="#FF7600" strokeWidth="1.1" /><path d="M3.5 4h4M3.5 6h3" stroke="#FF7600" strokeWidth="1.1" strokeLinecap="round" /></svg>, label: 'Legal Automation' },
  { icon: <svg viewBox="0 0 11 11" fill="none"><path d="M2 9V5l3.5-3.5L9 5v4" stroke="#FF7600" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /><circle cx="5.5" cy="7" r="1.2" stroke="#FF7600" strokeWidth="1.1" /></svg>, label: 'Agentic Systems' },
];

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="hero">
      {/* background */}
      <div className="h-blob1" />
      <div className="h-blob2" />
      <div className="h-blob3" />
      <div className="h-ring h-ring1" />
      <div className="h-ring h-ring2" />
      <div className="h-grid">
        {['14%', '28%', '50%', '72%', '86%'].map(l => (
          <div key={l} className="h-gline" style={{ left: l }} />
        ))}
      </div>

      {/* floating stat cards */}
      <div className="h-float hf1">
        <div className="hf-card">
          <div className="hf-icon">
            <svg viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#FF7600" strokeWidth="1.2" /><path d="M5.5 3.5v2.5l1.5 1" stroke="#FF7600" strokeWidth="1.2" strokeLinecap="round" /></svg>
          </div>
          <div><div className="hf-label">Response</div><div className="hf-val">&lt; 2 seconds</div></div>
        </div>
      </div>
      <div className="h-float hf2">
        <div className="hf-card">
          <div className="hf-icon">
            <svg viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#FF7600" strokeWidth="1.2" /><path d="M5.5 3v2.5l2 1.2" stroke="#FF7600" strokeWidth="1.2" strokeLinecap="round" /></svg>
          </div>
          <div><div className="hf-label">Uptime</div><div className="hf-val">24 / 7 / 365</div></div>
        </div>
      </div>
      <div className="h-float hf3">
        <div className="hf-card">
          <div className="hf-icon">
            <svg viewBox="0 0 11 11" fill="none"><path d="M2 4h7M2 4L3.8 2.5M2 4l1.8 1.5" stroke="#FF7600" strokeWidth="1.2" strokeLinecap="round" /><path d="M9 7H2M9 7L7.2 5.5M9 7l-1.8 1.5" stroke="#FF7600" strokeWidth="1.2" strokeLinecap="round" /></svg>
          </div>
          <div><div className="hf-label">Direction</div><div className="hf-val">In & Outbound</div></div>
        </div>
      </div>
      <div className="h-float hf4">
        <div className="hf-card">
          <div className="hf-icon">
            <svg viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="4" r="2" stroke="#FF7600" strokeWidth="1.2" /><path d="M1.5 9.5c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#FF7600" strokeWidth="1.2" strokeLinecap="round" /></svg>
          </div>
          <div><div className="hf-label">Leads Daily</div><div className="hf-val">100s qualified</div></div>
        </div>
      </div>

      {/* main content */}
      <div className="wrap" style={{ width: '100%', position: 'relative', zIndex: 2 }}>

        {/* eyebrow pill */}
        <div className="h-eyebrow">
          <div className="h-pill">
            <div className="h-pill-dot" />
            <span className="h-pill-t">AI Voice &amp; Automation · Est. 2022</span>
          </div>
        </div>

        {/* ── CYCLING ANIMATED HEADLINE ── */}
        <AnimatedHeadline />

        {/* sub copy */}
        <p className="h-sub">
          We build AI-native voice agents and intelligent automation systems that work 24/7, qualify leads at scale, and turn every conversation into a closed deal.
        </p>

        {/* CTAs */}
        <div className="h-ctas">
          <button className="btn bp" onClick={onBook}>
            Book a Discovery Call
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M8 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button className="btn bg2" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
            See Our Work
          </button>
        </div>

        {/* stat pills */}
        <div className="h-stats">
          {[
            { icon: <svg viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="#FF7600" strokeWidth="1.3" /><path d="M7.5 4.5v3.5l2.5 1.5" stroke="#FF7600" strokeWidth="1.3" strokeLinecap="round" /></svg>, val: '< 2s', lbl: 'Voice Response' },
            { icon: <svg viewBox="0 0 15 15" fill="none"><path d="M2 5h11M2 5L5 2.5M2 5l3 2.5M13 10H2M13 10l-3-2.5M13 10l-3 2.5" stroke="#FF7600" strokeWidth="1.3" strokeLinecap="round" /></svg>, val: 'Both', lbl: 'In & Outbound' },
            { icon: <svg viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="5.5" r="2.5" stroke="#FF7600" strokeWidth="1.3" /><path d="M2 13c0-3.04 2.46-5.5 5.5-5.5S13 9.96 13 13" stroke="#FF7600" strokeWidth="1.3" strokeLinecap="round" /></svg>, val: '100s', lbl: 'Leads Daily' },
            { icon: <svg viewBox="0 0 15 15" fill="none"><rect x="2" y="3" width="11" height="9" rx="2" stroke="#FF7600" strokeWidth="1.3" /><path d="M2 6h11" stroke="#FF7600" strokeWidth="1.3" /><path d="M5.5 9.5h4" stroke="#FF7600" strokeWidth="1.3" strokeLinecap="round" /></svg>, val: 'LLM', lbl: 'Powered AI' },
            { icon: <svg viewBox="0 0 15 15" fill="none"><path d="M7.5 2v2M7.5 11v2M2 7.5h2M11 7.5h2M3.5 3.5l1.4 1.4M10.1 10.1l1.4 1.4M10.1 3.5l-1.4 1.4M3.5 10.1l1.4 1.4" stroke="#FF7600" strokeWidth="1.3" strokeLinecap="round" /></svg>, val: '24/7', lbl: 'Always On' },
          ].map((s, i) => (
            <div className="hstat" key={i} style={{ animation: `fadeUp .8s var(--ease) ${1.2 + i * 0.1}s both` }}>
              <div className="hstat-icon">{s.icon}</div>
              <div className="hstat-body">
                <span className="hstat-val">{s.val}</span>
                <span className="hstat-lbl">{s.lbl}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* marquee */}
      <div className="h-marquee-wrap" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="h-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div className="h-marquee-item" key={i}>
              <div className="hm-icon">{item.icon}</div>
              <span className="hm-text">{item.label}</span>
              <div className="hm-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* scroll hint */}
      <div className="shhint" style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
        <span className="shhint-l">Scroll</span>
        <div className="shhint-ln" />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   WORK
══════════════════════════════════════════ */
function Work() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } }), { threshold: .07, rootMargin: '-30px 0px' });
    const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); rv.unobserve(e.target); } }), { threshold: .1, rootMargin: '-50px 0px' });
    ref.current?.querySelectorAll('.cc').forEach(c => obs.observe(c));
    ref.current?.querySelectorAll('.rv').forEach(e => rv.observe(e));
    return () => { obs.disconnect(); rv.disconnect(); };
  }, []);
  const chips = (arr: string[], orCount = 0) => (
    <div className="cps">{arr.map((c, i) => <span className={`cp${i < orCount ? ' or' : ''}`} key={c}>{c}</span>)}</div>
  );
  return (
    <section id="work" className="sp" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 40% at 90% 18%,rgba(255,118,0,.04) 0%,transparent 60%)' }} />
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="rv se"><span className="ru" /><span className="lb">Selected Work · 2022–Present</span></div>
        <h2 className="sh2 rv rv1">Selected work.<br /><em>No fluff.</em></h2>
        <p className="ss rv rv2">Three real engagements — exactly what we built, no invented numbers.</p>
        <div className="csk">

          {/* Card 1 */}
          <div className="cc">
            <div className="cbp">
              <div className="ct2"><span className="ci2">Project 01</span><span className="ctg">Real Estate · Zillow-Partnered</span></div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.7rem' }}>
                  <span style={{ display: 'block', width: 16, height: 1, background: 'var(--or)' }} />
                  <span className="lb" style={{ color: 'var(--stm)' }}>Zillow-Partnered Growth Agency</span>
                </div>
                <h3 className="ccl">The Next Steps Group</h3>
                <p className="chl" style={{ marginTop: '.45rem' }}>Outbound Lead Qualification System — Hundreds of Leads, Daily</p>
                <p className="ctx" style={{ marginTop: '.85rem' }}>A Zillow-partnered real estate growth agency flooded with inbound leads. We built an outbound AI calling system that contacts every new lead automatically, qualifies them in natural conversation, scores intent, and routes only hot prospects to human agents.</p>
              </div>
              <div className="svr">
                {[['100s', 'Leads qualified daily'], ['<60s', 'Response per lead'], ['24/7', 'Never misses a lead']].map(([v, l]) => (
                  <div className="sv" key={l}><span className="sv-v">{v}</span><span className="sv-l">{l}</span></div>
                ))}
              </div>
              <div className="cbu"><p className="cbl">What we built</p>{chips(['Outbound AI Calling Agent', 'Lead Qualification Logic', 'Intent Scoring', 'CRM Integration', 'Hot Lead Routing', 'Zillow API Integration'], 2)}</div>
            </div>
            <div className="cvp" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%,rgba(255,118,0,.06) 0%,transparent 72%)' }}>
              <span className="cvn">01</span>
              <div className="cvi">
                <div className="cps" style={{ justifyContent: 'center' }}><span className="cp or">Voice AI</span><span className="cp">Outbound</span><span className="cp">Zillow</span></div>
                <div style={{ width: 72, height: 72, borderRadius: 18, background: 'rgba(255,255,255,.72)', border: '1px solid var(--orb)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 44 44" fill="none"><rect x="6" y="18" width="32" height="22" rx="3" stroke="#FF7600" strokeWidth="1.5" /><path d="M6 18L22 6l16 12" stroke="#FF7600" strokeWidth="1.5" strokeLinejoin="round" /><rect x="17" y="27" width="10" height="13" rx="2" fill="rgba(255,118,0,.15)" stroke="#FF7600" strokeWidth="1" /><circle cx="22" cy="22" r="2" fill="#FF7600" /></svg>
                </div>
                <div className="fv">
                  {[['100%', 'Leads In', 'rgba(255,118,0,.18)'], ['70%', 'AI Calls', 'rgba(255,118,0,.14)'], ['45%', 'Qualified', 'rgba(255,118,0,.10)'], ['22%', 'Hot → Agent', 'rgba(255,118,0,.22)']].map(([w, l, bg]) => (
                    <div key={l} className="fb2" style={{ width: w, background: bg }}><span className="fb-l">{l}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="cc rv">
            <div className="cbp">
              <div className="ct2"><span className="ci2">Project 02</span><span className="ctg">Real Estate · Enterprise</span></div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.7rem' }}>
                  <span style={{ display: 'block', width: 16, height: 1, background: 'var(--or)' }} />
                  <span className="lb" style={{ color: 'var(--stm)' }}>Sustainable Real Estate AI</span>
                </div>
                <h3 className="ccl">Fakhruddin Properties</h3>
                <p className="chl" style={{ marginTop: '.45rem' }}>Inbound &amp; Outbound AI Calling Agent</p>
                <p className="ctx" style={{ marginTop: '.85rem' }}>A complete AI phone agent handling inbound property inquiries and running outbound follow-up calls. Understands natural speech, qualifies buyers in real-time, routes hot leads to the sales team. Fully built and tested end-to-end.</p>
              </div>
              <div className="cn">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#FF7600" strokeWidth="1.2" /><line x1="7" y1="4.5" x2="7" y2="7.5" stroke="#FF7600" strokeWidth="1.2" strokeLinecap="round" /><circle cx="7" cy="9.5" r=".6" fill="#FF7600" /></svg>
                <p className="cn-t"><strong>Not yet live.</strong> Local telecom regulations restrict SIP-based AI calling agents in this market. System is fully built — monitoring for a path to launch.</p>
              </div>
              <div className="cbu"><p className="cbl">What we built</p>{chips(['Inbound Call Agent', 'Outbound Follow-up Agent', 'Lead Qualification Logic', 'CRM Integration', 'Human Handoff Routing'], 2)}</div>
            </div>
            <div className="cvp" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%,rgba(255,118,0,.05) 0%,transparent 72%)' }}>
              <span className="cvn">02</span>
              <div className="cvi">
                <div className="cps" style={{ justifyContent: 'center' }}><span className="cp or">Voice AI</span><span className="cp">Inbound</span><span className="cp">Outbound</span></div>
                <div style={{ width: 72, height: 72, borderRadius: 18, background: 'rgba(255,255,255,.72)', border: '1px solid var(--orb)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="16" r="8" stroke="#FF7600" strokeWidth="1.5" /><path d="M8 38c0-7.73 6.27-14 14-14s14 6.27 14 14" stroke="#FF7600" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
                <div className="wv" style={{ gap: 4, height: 24, marginTop: '.5rem' }}>
                  {[0, .14, .28, .42, .2, .08, .36].map((d, i) => <span key={i} style={{ animationDelay: `${d}s`, width: 3.5 }} />)}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="cc">
            <div className="cbp">
              <div className="ct2"><span className="ci2">Project 03</span><span className="ctg">Legal Tech · Enterprise</span></div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.7rem' }}>
                  <span style={{ display: 'block', width: 16, height: 1, background: 'var(--stm)' }} />
                  <span className="lb" style={{ color: 'var(--stm)' }}>Entrepreneur · Legal Services</span>
                </div>
                <h3 className="ccl">AI Legal Agentic Chatbot</h3>
                <p className="chl" style={{ marginTop: '.45rem' }}>Autonomous Legal Assistant — Research, Draft, Advise</p>
                <p className="ctx" style={{ marginTop: '.85rem' }}>Built for an entrepreneur in the legal services space, this agentic AI autonomously researches case law, drafts jurisdiction-aware legal documents, advises clients through chat, and escalates complex matters to lawyers with full context prepared.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                {[['⚖ Legal Research', 'Searches and summarises Indian case law and statutes on demand.'], ['📄 Document Drafting', 'Generates contracts, agreements, notices, and pleadings automatically.'], ['🤖 Agentic Reasoning', 'Breaks complex queries into sub-tasks and resolves them autonomously.'], ['🔀 Smart Escalation', 'Routes matters to lawyers with full briefing docs already prepared.']].map(([t, d]) => (
                  <div className="sf2" key={t as string}><p className="sf-t">{t}</p><p className="ctx">{d}</p></div>
                ))}
              </div>
              <div className="cbu"><p className="cbl">What we built</p>{chips(['Agentic AI Architecture', 'Legal RAG System', 'Jurisdiction Knowledge Base', 'Document Generation', 'Client Chat Interface', 'Lawyer Escalation Flow'], 2)}</div>
            </div>
            <div className="cvp" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%,rgba(44,42,39,.03) 0%,transparent 70%)' }}>
              <span className="cvn">03</span>
              <div className="cvi">
                <div className="cps" style={{ justifyContent: 'center' }}><span className="cp">Agentic AI</span><span className="cp">Legal RAG</span><span className="cp">Enterprise</span></div>
                <div style={{ width: 72, height: 72, borderRadius: 18, background: 'rgba(255,255,255,.72)', border: '1px solid var(--strd)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 44 44" fill="none"><rect x="6" y="8" width="20" height="28" rx="3" stroke="#2C2A27" strokeWidth="1.5" /><path d="M11 15h10M11 20h10M11 25h6" stroke="#2C2A27" strokeWidth="1.2" strokeLinecap="round" /><circle cx="33" cy="30" r="7" fill="rgba(255,118,0,.1)" stroke="#FF7600" strokeWidth="1.3" /><path d="M30.5 30h5M33 27.5v5" stroke="#FF7600" strokeWidth="1.2" strokeLinecap="round" /></svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '80%', marginTop: '.25rem' }}>
                  {[{ r: '10px 10px 10px 2px', bg: 'rgba(44,42,39,.07)', w: '70%' }, { r: '10px 10px 2px 10px', bg: 'rgba(255,118,0,.1)', w: '60%', b: '1px solid var(--orb)', as: 'flex-end' }, { r: '10px 10px 10px 2px', bg: 'rgba(44,42,39,.07)', w: '80%' }].map((s, i) => (
                    <div key={i} style={{ height: 22, borderRadius: s.r, background: s.bg, border: s.b, display: 'flex', alignItems: 'center', padding: '0 10px', alignSelf: s.as || 'flex-start', width: s.w }}>
                      <div style={{ height: 4, borderRadius: 3, background: 'rgba(44,42,39,.2)', width: '65%', opacity: .6 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PRODUCTS
══════════════════════════════════════════ */
function Products() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } }), { threshold: .07, rootMargin: '-30px 0px' });
    const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); rv.unobserve(e.target); } }), { threshold: .1, rootMargin: '-50px 0px' });
    ref.current?.querySelectorAll('.pc').forEach(c => obs.observe(c));
    ref.current?.querySelectorAll('.rv').forEach(e => rv.observe(e));
    return () => { obs.disconnect(); rv.disconnect(); };
  }, []);
  return (
    <section id="products" className="sp" ref={ref}>
      <div className="wrap">
        <div className="rv se"><span className="ru" /><span className="lb">Our Products</span></div>
        <h2 className="sh2 rv rv1">Tools we've built<br /><em>for the long run.</em></h2>
        <p className="ss rv rv2">Alongside client work, we build our own AI-powered platforms from the ground up.</p>
        <div className="pg">
          <div className="pc" style={{ gridColumn: '1/-1', maxWidth: 680 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div className="piw"><svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="3.5" stroke="#FF7600" strokeWidth="1.4" /><path d="M4 18c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#FF7600" strokeWidth="1.4" strokeLinecap="round" /><path d="M16 4l1.5 1.5M16 11l1.5-1.5M19 7.5h-2" stroke="#FF7600" strokeWidth="1.2" strokeLinecap="round" /></svg></div>
              <span className="cs2"><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="3" stroke="#ABA59D" strokeWidth="1" /><path d="M4 2.5v2l1 1" stroke="#ABA59D" strokeWidth="1" strokeLinecap="round" /></svg> In Development</span>
            </div>
            <div><p className="pt2">Real Estate Training Platform</p><h3 className="pn">almtrainer.com</h3></div>
            <p className="pd">A complete training and onboarding system for real estate agencies. Agents practice live calls with AI personas, complete company tasks, and get coached by a voice AI that knows your playbook.</p>
            <div className="pf">
              {[<><strong>90 AI lead personas</strong> — buyers, investors, reluctant sellers, each with unique personalities.</>, <><strong>Task system from your company</strong> — managers assign onboarding tasks, progress tracked automatically.</>, <><strong>Academy learning page</strong> — structured content your team controls.</>, <><strong>AI coaching voice agent</strong> — trained on your knowledge base for real-time feedback.</>].map((f, i) => (
                <div className="pft" key={i}><div className="fd2" /><span>{f}</span></div>
              ))}
            </div>
            <a href="#" className="pc-cta">Learn more when it launches →</a>
          </div>
          <div className="pc" style={{ opacity: .55, pointerEvents: 'none' }}>
            <div className="piw" style={{ background: 'rgba(44,42,39,.04)', borderColor: 'var(--strd)' }}><svg viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="16" rx="3" stroke="#ABA59D" strokeWidth="1.4" strokeDasharray="3 2" /><path d="M11 8v6M8 11h6" stroke="#ABA59D" strokeWidth="1.4" strokeLinecap="round" /></svg></div>
            <p className="pt2" style={{ color: 'var(--stl)' }}>Coming Soon</p>
            <h3 className="pn" style={{ color: 'var(--stl)' }}>Next Product</h3>
            <p className="pd">We're building more. If you have a problem worth solving with AI, let's talk.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FAQ
══════════════════════════════════════════ */
const FAQS = [
  {
    q: 'How much does it cost?',
    a: <>It depends on the scope — what you need built, how complex the workflows are, and how much ongoing support is involved. A simple voice agent is very different from a full agentic system with CRM integration. <strong>We price per project, not per hour.</strong> The discovery call is the fastest way to get a real number — we'll give you a straight estimate before you commit to anything.</>
  },
  {
    q: 'How long does it take to build and deploy?',
    a: <>Most projects go from kickoff to a working system in <strong>two to four weeks</strong>. Simpler automations can be faster; more complex multi-step agentic systems take longer. We'll give you a realistic timeline on the call — we don't overpromise and then drag things out.</>
  },
  {
    q: 'We already tried AI tools. Why would this be different?',
    a: <>Off-the-shelf tools are built for everyone, which means they're optimised for no one. We build systems that fit exactly how your business works — your scripts, your CRM, your qualification logic, your handoff flow. The difference between a generic chatbot and a properly built AI agent is the difference between a template and a tool that actually closes leads.</>
  },
  {
    q: 'Do I need any technical knowledge to use what you build?',
    a: <>No. We handle all the technical work and hand over a system that your team can use immediately. If something needs updating — a script change, a new workflow — we take care of it. You don't need to understand how it works under the hood.</>
  },
  {
    q: 'What if the AI says something wrong or mishandles a lead?',
    a: <>Every system we build includes guardrails — the AI knows what it can and can't handle, and anything outside its scope is routed to a human. <strong>Human handoff is built in, not bolted on.</strong> You always stay in control of the final conversation.</>
  },
  {
    q: 'What industries do you work with?',
    a: <>We've built for real estate, legal services, and client-facing businesses that deal in high volumes of leads or repetitive conversations. If your business involves a lot of back-and-forth — qualifying, following up, booking, advising — there's almost certainly a system that can handle a large part of that automatically.</>
  },
  {
    q: 'What do you actually need from us to get started?',
    a: <>Not much upfront. A clear picture of your current workflow, access to your CRM or the tools you use, and someone available to give feedback during testing. The discovery call walks through all of this — <strong>most clients are surprised how quickly things move once we have the basics.</strong></>
  },
];

function FAQ({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); rv.unobserve(e.target); } }), { threshold: .1, rootMargin: '-40px 0px' });
    ref.current?.querySelectorAll('.rv').forEach(e => rv.observe(e));
    return () => rv.disconnect();
  }, []);

  return (
    <section id="faq" className="sp" ref={ref}>
      <div className="wrap">
        <div className="rv se"><span className="ru" /><span className="lb">FAQ</span></div>
        <h2 className="sh2 rv rv1">Questions we<br /><em>actually get asked.</em></h2>
        <p className="ss rv rv2" style={{ marginBottom: 'clamp(2rem,4vw,3rem)' }}>Straight answers. No fluff.</p>

        <div className="faq-grid rv">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`faq-item${open === i ? ' open' : ''}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="faq-q">
                <span className="faq-qt">{item.q}</span>
                <div className="faq-icon">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v8M1 5h8" stroke={open === i ? '#fff' : 'var(--stm)'} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="faq-a">
                <div className="faq-a-inner"><p>{item.a}</p></div>
              </div>
            </div>
          ))}
        </div>

        <div className="rv" style={{ marginTop: 'clamp(2rem,4vw,3rem)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '.9rem', fontWeight: 300, color: 'var(--stm)' }}>Still have questions?</p>
          <button className="btn bp" style={{ fontSize: '.78rem' }} onClick={onBook}>
            Ask on the call
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   BOOKING
══════════════════════════════════════════ */
function Booking() {
  const btnRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    // Load stylesheet (only if not already loaded)
    if (!document.querySelector('link[href*="scheduling-button-script.css"]')) {
      const link = document.createElement("link");
      link.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    const initButton = () => {
      if (!(window as any).calendar?.schedulingButton || !btnRef.current) return;

      // Ensure container is empty so button doesn't duplicate
      btnRef.current.innerHTML = "";

      (window as any).calendar.schedulingButton.load({
        url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0KLKN3s9-RH58XDK3qU8-O_pz2Ag4u4gtV_8mY0UhbHYDfaYIXflllTLgIlgCxybCy1HwRCa2D?gv=true",
        color: "#F4511E",
        label: "Book an appointment",
        target: btnRef.current,
      });
    };

    // If script already exists, just initialize
    if (document.querySelector('script[src*="scheduling-button-script.js"]')) {
      initButton();
      return;
    }

    // Load script
    const script = document.createElement("script");
    script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
    script.async = true;
    script.onload = initButton;

    document.body.appendChild(script);

  }, []);

  return (
    <section id="booking" className="sp">
      <div className="wrap">
        <div className="bi">
          {/* LEFT COPY */}
          <div className="bc">
            <div className="se"><span className="ru" /><span className="lb">Book a Call</span></div>
            <h2 className="sh2">Let's talk about<br /><em>your problem.</em></h2>
            <p className="bb">A 30-minute call. No pitch deck. No sales pressure. We'll listen to what you're trying to solve, tell you honestly if AI automation is the right answer, and sketch a rough architecture — for free.</p>
            <div className="bps">
              {[
                "We'll ask the right questions to understand your actual workflow",
                "You'll leave knowing exactly what's buildable and how long it takes",
                "If we're not the right fit, we'll say so and point you somewhere better",
                "Zero obligation. No hard sell — if we can help, we'll tell you honestly.",
              ].map((pt, i) => (
                <div className="bpt" key={i}><div className="bpd" /><span>{pt}</span></div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '.5rem' }}>
              {[['⚡', 'Deployed in weeks'], ['🔒', 'Fully custom'], ['🌍', 'Global clients']].map(([ic, l]) => (
                <div key={l as string} style={{ display: 'flex', alignItems: 'center', gap: '.45rem' }}>
                  <span style={{ fontSize: '1rem' }}>{ic}</span>
                  <span style={{ fontSize: '.7rem', fontWeight: 500, letterSpacing: '.06em', color: 'var(--stm)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — booking card with single Google Calendar button */}
          <div>
            <div className="bw" style={{ flexDirection: 'column', gap: '1.6rem', padding: 'clamp(1.8rem,4vw,2.8rem)', alignItems: 'center' }}>

              {/* icon + title */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.7rem', textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--ord)', border: '1px solid var(--orb)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="2" y="4" width="18" height="16" rx="2.5" stroke="#FF7600" strokeWidth="1.4" />
                    <path d="M2 9h18" stroke="#FF7600" strokeWidth="1.4" />
                    <path d="M7 2v4M15 2v4" stroke="#FF7600" strokeWidth="1.4" strokeLinecap="round" />
                    <circle cx="7.5" cy="14" r="1" fill="#FF7600" />
                    <circle cx="11" cy="14" r="1" fill="#FF7600" />
                    <circle cx="14.5" cy="14" r="1" fill="#FF7600" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.1rem,2vw,1.35rem)', fontWeight: 400, color: 'var(--st)', lineHeight: 1.2 }}>Book a Discovery Call</p>
                  <p style={{ fontSize: '.62rem', fontWeight: 400, color: 'var(--stl)', marginTop: '.3rem' }}>30 min · Google Meet · Free</p>
                </div>
              </div>

              {/* divider */}
              <div style={{ width: '100%', height: 1, background: 'var(--str)' }} />

              {/* Google Calendar button — the ONE booking button */}
              <div ref={btnRef} style={{ display: 'flex', justifyContent: 'center', width: '100%' }} />

              {/* meta row */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.4rem', flexWrap: 'wrap' }}>
                {[['📅', 'Pick your slot'], ['📹', 'Google Meet'], ['⏱', '30 minutes']].map(([ic, l]) => (
                  <div key={l as string} style={{ display: 'flex', alignItems: 'center', gap: '.35rem' }}>
                    <span style={{ fontSize: '.8rem' }}>{ic}</span>
                    <span style={{ fontSize: '.58rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--stl)' }}>{l}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   LEGAL MODALS
══════════════════════════════════════════ */
const PRIVACY_CONTENT = (
  <>
    <p className="modal-date">Effective date: March 2026</p>

    <h3>1. Who we are</h3>
    <p>Automaxions is an independent AI automation consultancy. We build voice agents, automation systems, and related software for clients. This policy explains what personal information we collect through this website and how we use it.</p>

    <h3>2. Information we collect</h3>
    <p><strong>Contact information.</strong> When you book a discovery call through our Google Calendar booking link, Google collects your name and email address to send you a calendar invitation. We receive that same information so we can conduct the call.</p>
    <p><strong>Usage data.</strong> Like most websites, our hosting provider may automatically log your IP address, browser type, and pages visited. We do not run any analytics platform ourselves.</p>
    <p><strong>Communications.</strong> If you email us directly, we store that correspondence to respond to you.</p>

    <h3>3. How we use your information</h3>
    <p>We use the information we collect only to respond to your enquiry, schedule and conduct a discovery call, and follow up if you have asked us to. We do not use your data for marketing, profiling, or any automated decision-making.</p>

    <h3>4. Sharing your information</h3>
    <p>We do not sell, rent, or trade your personal information. The only third party that receives your data as a result of using this website is Google, when you use the appointment booking link. Google's own privacy policy governs how they handle that data.</p>

    <h3>5. Data retention</h3>
    <p>We keep your contact details only for as long as necessary to fulfil the purpose for which they were provided — typically the duration of our conversation or engagement. If no project follows, we delete contact details within a reasonable period.</p>

    <h3>6. Your rights</h3>
    <p>You may ask us to access, correct, or delete any personal information we hold about you at any time. To do so, contact us at the email address provided during our call or booking.</p>

    <h3>7. Cookies</h3>
    <p>This website does not set any first-party cookies. Third-party scripts (such as Google Calendar) may set their own cookies when you interact with those features.</p>

    <h3>8. Changes to this policy</h3>
    <p>We may update this policy from time to time. Material changes will be reflected in a new effective date at the top. Continued use of the website after changes constitutes acceptance.</p>

    <h3>9. Contact</h3>
    <p>Questions about this policy can be directed to us via the booking form on this page.</p>
  </>
);

const TERMS_CONTENT = (
  <>
    <p className="modal-date">Effective date: March 2026</p>

    <h3>1. About these terms</h3>
    <p>These terms govern your use of the Automaxions website (automaxions.com). By accessing this site you agree to them. If you do not agree, please do not use the site.</p>

    <h3>2. What we do</h3>
    <p>Automaxions provides AI automation consulting and development services. This website is informational — it describes what we offer and provides a way to book a discovery call. Nothing on this site constitutes a binding offer, guarantee of results, or service agreement. Any actual engagement is governed by a separate written agreement between you and Automaxions.</p>

    <h3>3. Accuracy of information</h3>
    <p>We make reasonable efforts to keep the content on this website accurate and up to date. However, we do not warrant that all information is complete, current, or error-free. Case studies and project descriptions reflect real work but may be described at a high level for confidentiality reasons.</p>

    <h3>4. Intellectual property</h3>
    <p>All content on this website — including text, design, code, and graphics — is owned by or licensed to Automaxions. You may not copy, reproduce, or redistribute it without our written permission.</p>

    <h3>5. No warranties</h3>
    <p>This website and its content are provided "as is". We make no warranties, express or implied, regarding fitness for a particular purpose, uninterrupted access, or freedom from errors or harmful components.</p>

    <h3>6. Limitation of liability</h3>
    <p>To the fullest extent permitted by applicable law, Automaxions will not be liable for any indirect, incidental, or consequential loss arising from your use of this website or reliance on its content.</p>

    <h3>7. Third-party links and services</h3>
    <p>This site links to Google Calendar for appointment scheduling. We are not responsible for the content, availability, or practices of any third-party services.</p>

    <h3>8. Changes to these terms</h3>
    <p>We may update these terms at any time. The effective date at the top will reflect when changes were last made. Your continued use of the site after an update constitutes acceptance of the revised terms.</p>

    <h3>9. Governing law</h3>
    <p>These terms are governed by applicable law. Any disputes will be resolved in good faith between the parties before any formal proceedings are initiated.</p>
  </>
);

function LegalModal({ which, onClose }: { which: 'privacy' | 'terms'; onClose: () => void }) {
  // Close on backdrop click
  const onBg = (e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose(); };
  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="modal-bg" onClick={onBg}>
      <div className="modal-box">
        <div className="modal-head">
          <span className="modal-title">{which === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {which === 'privacy' ? PRIVACY_CONTENT : TERMS_CONTENT}
        </div>
      </div>
    </div>
  );
}
export default function Page() {
  const goBook = () => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const [modal, setModal] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); rv.unobserve(e.target); } }), { threshold: .1, rootMargin: '-50px 0px' });
    document.querySelectorAll('.rv').forEach(el => rv.observe(el));
    if (!matchMedia('(pointer:fine)').matches) return () => { document.head.removeChild(style); rv.disconnect(); };
    const dot = document.createElement('div');
    Object.assign(dot.style, { position: 'fixed', width: '8px', height: '8px', background: '#FF7600', borderRadius: '50%', pointerEvents: 'none', zIndex: '99998', opacity: '0', transform: 'translate(-50%,-50%)', transition: 'opacity .3s,width .3s,height .3s', mixBlendMode: 'multiply' });
    document.body.appendChild(dot);
    let cx = 0, cy = 0, tx = 0, ty = 0;
    const onM = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY; dot.style.opacity = '.6'; };
    const onL = () => { dot.style.opacity = '0'; };
    document.addEventListener('mousemove', onM); document.addEventListener('mouseleave', onL);
    let aid: number;
    const loop = () => { tx += (cx - tx) * .13; ty += (cy - ty) * .13; dot.style.left = tx + 'px'; dot.style.top = ty + 'px'; aid = requestAnimationFrame(loop); };
    loop();
    return () => {
      document.head.removeChild(style);
      document.removeEventListener('mousemove', onM); document.removeEventListener('mouseleave', onL);
      cancelAnimationFrame(aid); dot.remove(); rv.disconnect();
    };
  }, []);

  return (
    <>
      <Nav onBook={goBook} />
      <Hero onBook={goBook} />
      <Work />
      <Products />
      <FAQ onBook={goBook} />
      <Booking />
      <footer>
        <div className="wrap">
          <div className="fi">
            <span className="lb">© {new Date().getFullYear()} Automaxions. All rights reserved.</span>
            <nav className="fl">
              <a onClick={() => setModal('privacy')} style={{ cursor: 'pointer' }}>Privacy</a>
              <a onClick={() => setModal('terms')} style={{ cursor: 'pointer' }}>Terms</a>
              <a onClick={goBook}>Book a Call</a>
            </nav>
          </div>
        </div>
      </footer>
      {modal && <LegalModal which={modal} onClose={() => setModal(null)} />}
    </>
  );
}