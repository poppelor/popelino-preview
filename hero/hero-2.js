/* Hero 2 · "גררו את העולם" – drag a world orb onto plain IKEA furniture; the design pours on */
(function(){
const G=gsap,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ICON={
 market:`<rect width="100" height="100" fill="#bdd1c8"/>${[0,1,2,3,4,5].map(i=>`<rect x="${17+i*11}" y="24" width="11" height="13" fill="${i%2?'#fff':'#d9745f'}"/><circle cx="${22.5+i*11}" cy="37" r="5.5" fill="${i%2?'#fff':'#d9745f'}"/>`).join('')}<rect x="17" y="21" width="66" height="5" rx="2.5" fill="#8f6f66"/><rect x="23" y="48" width="54" height="32" rx="4" fill="#fff" opacity=".9"/><rect x="23" y="64" width="54" height="3" fill="#c8a882"/><rect x="29" y="52" width="9" height="12" rx="3" fill="#f1e0b5"/><circle cx="46" cy="59" r="5" fill="#d9745f"/><rect x="55" y="51" width="8" height="13" rx="3" fill="#c7bcce"/><rect x="66" y="54" width="7" height="10" rx="2" fill="#9fb8ad"/><rect x="30" y="69" width="12" height="9" rx="2" fill="#e1cdc8"/><circle cx="52" cy="73" r="5" fill="#e8c75a"/><rect x="61" y="68" width="10" height="10" rx="3" fill="#d9745f" opacity=".7"/>`,
 ice:`<rect width="100" height="100" fill="#e1cdc8"/><path d="M37 52 L50 86 L63 52Z" fill="#e2b77a"/><path d="M41 58l17 10M59 58l-17 10M44 66l10 7M56 66l-10 7" stroke="#c99a5c" stroke-width="2"/><circle cx="50" cy="48" r="14" fill="#f6b3bd"/><circle cx="50" cy="33" r="11.5" fill="#f1e0b5"/><circle cx="51" cy="20" r="4.5" fill="#d9745f"/><path d="M51 16q2-5 6-6" stroke="#8f6f66" stroke-width="2" fill="none"/><circle cx="44" cy="45" r="2" fill="#fff" opacity=".7"/>`,
 pizza:`<rect width="100" height="100" fill="#f1e0b5"/><circle cx="50" cy="52" r="29" fill="#d8a35b"/><circle cx="50" cy="52" r="24" fill="#d9745f"/><circle cx="50" cy="52" r="21" fill="#f6d08a"/>${[[42,42],[60,46],[47,62],[36,56],[58,62],[52,34]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.5" fill="#b9523f"/>`).join('')}<path d="M50 28V76M29 40L71 64M29 64L71 40" stroke="#fff" stroke-width="1.6" opacity=".7"/><circle cx="64" cy="56" r="2" fill="#7da36b"/><circle cx="40" cy="48" r="2" fill="#7da36b"/>`,
 forest:`<rect width="100" height="100" fill="#c7bcce"/><circle cx="68" cy="30" r="9" fill="#f1e0b5"/><ellipse cx="50" cy="86" rx="46" ry="14" fill="#bdd1c8"/><path d="M34 22 L49 52 H19Z M34 36 L52 70 H16Z" fill="#6f9a88"/><rect x="31" y="70" width="6" height="10" fill="#8f6f66"/><path d="M64 44 L76 66 H52Z M64 54 L79 80 H49Z" fill="#8fb3a3"/><rect x="61.5" y="80" width="5" height="6" fill="#8f6f66"/><circle cx="46" cy="80" r="3.5" fill="#d9745f"/><rect x="45" y="80" width="2" height="4" fill="#fff"/>`};
const WL={
 market:{name:'מכולת',c:'#bdd1c8',dh:'market',sh:'trofast-sage',kt:'hero-market'},
 ice:{name:'גלידרייה',c:'#e1cdc8',dh:'ice',sh:'trofast-pink',kt:'icecream'},
 pizza:{name:'פיצרייה',c:'#f1e0b5',dh:'pizza',sh:'trofast-red',kt:'pizzeria'},
 forest:{name:'יער',c:'#c7bcce',dh:'forest',sh:'trofast-floral',kt:null}};
const svg=k=>`<svg viewBox="0 0 100 100" aria-hidden="true">${ICON[k]}</svg>`;
Object.values(WL).forEach(w=>['sh','kt'].forEach(p=>{if(w[p]){new Image().src=`assets/cut/${w[p]}.png`}}));
const wrapW=$('#worlds'),sec=$('#h2x');
wrapW.innerHTML=Object.entries(WL).map(([k,w],i)=>`<div class="wc"><div class="orb" data-w="${k}" style="--d:${i*.4}s" role="button" tabindex="0" aria-label="עולם ${w.name}: גררו אל רהיט">${svg(k)}</div>${w.name}</div>`).join('')+
 `<div class="h2-hint" id="hint"><svg viewBox="0 0 46 30" fill="none" stroke="#d9745f" stroke-width="2.4" stroke-linecap="round"><path d="M44 6C30 4 14 10 8 26"/><path d="M3 19l5 8 8-5"/></svg>גררו אותי למטה</div>`;
const pieces=$$('.fp').map(el=>({el,box:$('.fbx',el),base:$('.fbx img',el),p:el.dataset.p,cur:null}));
const mix=(h,t)=>{const a=parseInt(h.slice(1),16),b=0xf3f2ef,c=s=>Math.round(((a>>s)&255)*(1-t)+((b>>s)&255)*t);return `rgb(${c(16)},${c(8)},${c(0)})`};
function hitPiece(x,y){for(const P of pieces){const r=P.box.getBoundingClientRect(),m=22;if(x>r.left-m&&x<r.right+m&&y>r.top-m-30&&y<r.bottom+m)return P}return null}
function bubble(P,txt){$$('.bub',P.el).forEach(b=>b.remove());const b=document.createElement('div');b.className='bub';b.textContent=txt;P.el.appendChild(b);
 G.fromTo(b,{y:8,opacity:0},{y:0,opacity:1,duration:.3,ease:'back.out(2)'});setTimeout(()=>G.to(b,{opacity:0,duration:.3,onComplete:()=>b.remove()}),1900)}
function splash(x,y,c){const s=document.createElement('div');s.className='splash';s.style.cssText+=`width:40px;height:40px;margin:-20px 0 0 -20px;border:6px solid ${c};`;document.body.appendChild(s);
 G.fromTo(s,{x,y,scale:.3,opacity:1},{scale:6,opacity:0,duration:.8,ease:'power2.out',onComplete:()=>s.remove()})}
function apply(P,k,x,y){const w=WL[k],r=P.box.getBoundingClientRect();
 if(!w[P.p]){G.fromTo(P.box,{x:0},{x:0,keyframes:{x:[0,-10,9,-6,4,0]},duration:.5,ease:'none'});bubble(P,'עולם '+w.name+' עוד לא קיים ל'+(P.p=='kt'?'מטבח':'רהיט הזה'));return false}
 const px=Math.max(0,Math.min(100,(x-r.left)/r.width*100)),py=Math.max(0,Math.min(100,(y-r.top)/r.height*100));
 const L=document.createElement('div');L.className='lay';
 if(P.p=='dh'){L.appendChild(skinEl(w.dh))}else{L.innerHTML=`<img src="assets/cut/${w[P.p]}.png" alt="${w.name}" style="width:100%;height:100%;object-fit:contain;object-position:50% 100%">`}
 P.box.appendChild(L);const old=P.box.querySelectorAll('.lay');const o={r:0};
 L.style.clipPath=`circle(0% at ${px}% ${py}%)`;
 G.to(o,{r:150,duration:P.p=='dh'?1.05:.75,ease:'power2.out',onUpdate:()=>L.style.clipPath=`circle(${o.r}% at ${px}% ${py}%)`,onComplete:()=>{L.style.clipPath='none';old.forEach(n=>n!==L&&n.remove())}});
 if(P.p!='dh'){G.to(P.base,{opacity:0,scale:.92,duration:.25,ease:'power2.in'});G.fromTo(L,{scale:.72,transformOrigin:'50% 100%'},{scale:1,duration:.95,ease:'elastic.out(1,.45)'})}
 G.timeline().to(P.box,{scaleY:.9,scaleX:1.06,transformOrigin:'50% 100%',duration:.12,ease:'power2.out'}).to(P.box,{scaleY:1,scaleX:1,duration:.8,ease:'elastic.out(1.1,.35)'});
 splash(x,y,w.c);HFX.burst(x,y,{n:innerWidth<700?11:17,floor:r.bottom-4,power:innerWidth<700?8:10.5,size:innerWidth<700?18:26});
 P.cur=k;P.el.classList.add('dressed');sec.style.backgroundColor=mix(w.c,.55);
 const h=$('#hint');if(h)h.style.opacity=0;return true}
function reset(P){P.box.querySelectorAll('.lay').forEach(n=>G.to(n,{opacity:0,scale:.9,transformOrigin:'50% 100%',duration:.3,onComplete:()=>n.remove()}));
 G.to(P.base,{opacity:1,scale:1,duration:.45,ease:'back.out(2)'});P.cur=null;P.el.classList.remove('dressed');
 if(!pieces.some(q=>q.cur))sec.style.backgroundColor=''}
pieces.forEach(P=>$('.frs',P.el).onclick=()=>reset(P));
/* drag */
function makeGhost(k,orb){const g=document.createElement('div');g.className='ghost-orb';g.innerHTML=svg(k);document.body.appendChild(g);const r=orb.getBoundingClientRect();g.style.width=r.width+'px';g.style.height=r.height+'px';return{g,w:r.width}}
let tgt=null;
function setTgt(P,k){if(tgt==P)return;if(tgt)tgt.el.classList.remove('tgt');tgt=P;if(P){P.el.classList.add('tgt');P.el.style.setProperty('--rc',WL[k].c=='#f1e0b5'?'#d9a94a':'#d9745f')}}
$$('.orb').forEach(orb=>{const k=orb.dataset.w;
 orb.addEventListener('pointerdown',e=>{e.preventDefault();orb.setPointerCapture(e.pointerId);const sx=e.clientX,sy=e.clientY;let moved=false,G0=null,qx,qy,lx=sx;
  const mv=ev=>{if(!moved&&Math.hypot(ev.clientX-sx,ev.clientY-sy)>6){moved=true;G0=makeGhost(k,orb);orb.classList.add('away');
    const r=orb.getBoundingClientRect();G.set(G0.g,{x:r.left,y:r.top});qx=G.quickTo(G0.g,'x',{duration:.18,ease:'power3'});qy=G.quickTo(G0.g,'y',{duration:.18,ease:'power3'});G.to(G0.g,{scale:1.12,duration:.25})}
   if(!moved)return;qx(ev.clientX-G0.w/2);qy(ev.clientY-G0.w/2);const v=Math.max(-1,Math.min(1,(ev.clientX-lx)/30));lx=ev.clientX;G.to(G0.g,{scaleX:1.12+Math.abs(v)*.1,scaleY:1.12-Math.abs(v)*.06,duration:.2});
   setTgt(hitPiece(ev.clientX,ev.clientY),k)};
  const up=ev=>{orb.removeEventListener('pointermove',mv);orb.removeEventListener('pointerup',up);orb.removeEventListener('pointercancel',up);
   if(!moved){tapAll(k,orb);return}
   const P=hitPiece(ev.clientX,ev.clientY);setTgt(null);
   if(P&&WL[k][P.p]){G.to(G0.g,{x:ev.clientX-G0.w/2,y:ev.clientY-G0.w/2,scale:.15,opacity:0,duration:.22,ease:'power2.in',onComplete:()=>{G0.g.remove();apply(P,k,ev.clientX,ev.clientY)}});orb.classList.remove('away')}
   else{if(P)apply(P,k,ev.clientX,ev.clientY);const r=orb.getBoundingClientRect();G.to(G0.g,{x:r.left,y:r.top,scale:1,duration:.7,ease:'elastic.out(1,.55)',onComplete:()=>{G0.g.remove();orb.classList.remove('away')}})}};
  orb.addEventListener('pointermove',mv);orb.addEventListener('pointerup',up);orb.addEventListener('pointercancel',up)});
 orb.addEventListener('keydown',e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();tapAll(k,orb)}})});
/* tap = the world flies onto every piece it exists for */
function tapAll(k,orb){const list=pieces.filter(P=>WL[k][P.p]);list.forEach((P,i)=>setTimeout(()=>{const o=makeGhost(k,orb),r0=orb.getBoundingClientRect(),r=P.box.getBoundingClientRect();
  const tx=r.left+r.width/2-o.w/2,ty=r.top+r.height*.45-o.w/2;G.set(o.g,{x:r0.left,y:r0.top});
  G.to(o.g,{x:tx,duration:.55,ease:'power1.inOut'});G.to(o.g,{y:ty,duration:.55,ease:'back.in(1.4)'});
  G.to(o.g,{scale:.15,opacity:0,duration:.18,delay:.5,onComplete:()=>{o.g.remove();apply(P,k,tx+o.w/2,ty+o.w/2)}})},i*260))}
window.H2={pieces,apply};
})();
