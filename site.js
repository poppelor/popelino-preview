/* Popelino mockup: shared header, cart, catalog, try-on, reviews */
(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const G=window.gsap,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* ---------- catalog ---------- */
const W=typeof WORLDS!='undefined'?WORLDS:{},WO=typeof ORDER!='undefined'?ORDER:[];
const HPRICE={home:149,market:169,ice:159,pizza:159,forest:149};
const CATS={
 dollhouse:{name:'בית בובות',ikea:'FLISAT',thumb:'assets/ikea/flisat-dollhouse.png',full:'בית בובות/מדף',house:true,lead:'עולם שלם על בית הבובות של איקאה.',
  designs:WO.map(k=>({id:'dh-'+k,w:k,name:W[k].tag,short:W[k].name,price:HPRICE[k]}))},
 shelf:{name:'כוננית',ikea:'TROFAST',thumb:'assets/ikea/trofast.png',full:'יחידת אחסון עם קופסאות',lead:'מדבקות לקופסאות ולמסגרת של כוננית TROFAST.',
  designs:[['sage','מרווה'],['pink','ורוד'],['yellow','צהוב'],['blue','כחול'],['gingham','משבצות'],['floral','פרחוני'],['floral2','פרחוני עדין'],['red','פסים'],['beige','בז\''],['mix','צבעוני'],['mix2','פסטל']].map(([k,n])=>({id:'sh-'+k,img:'img/trofast-'+k+'.jpg',name:n,short:n,price:119}))},
 table:{name:'שולחן',ikea:'FLISAT',thumb:'assets/ikea/flisat-table.png',full:'שולחן ילדים',lead:'שולחן הילדים הופך למגרש משחקים.',
  designs:[['road','כבישים'],['check','משבצות'],['leo','נמר']].map(([k,n])=>({id:'tb-'+k,img:'img/table-'+k+'.jpg',name:n,short:n,price:99}))},
 kitchen:{name:'מטבח',ikea:'DUKTIG',thumb:'assets/ikea/duktig.png',full:'מטבח למשחק',lead:'המטבח הופך לחנות קטנה ואמיתית.',
  designs:[['pizzeria','פיצרייה','pizzeria.jpg'],['ice','גלידרייה','icecream.jpg'],['market','מכולת','hero-market.jpg']].map(([k,n,f])=>({id:'kt-'+k,img:'img/'+f,name:n,short:n,price:159}))}
};
const PACKS={
 'dh-home':{id:'pk-home',name:'ערכת "בית חם"',price:59,items:['🪴','💡','🐈','🕰️','🧸','🖼️']},
 'dh-market':{id:'pk-market',name:'ערכת "מכולת"',price:69,items:['🛒','🍎','🧺','🥖','🥕','🧃']},
 'dh-forest':{id:'pk-forest',name:'ערכת "חברי היער"',price:59,items:['🌲','🍄','🦉','🦊','🌼','🦔']},
 'kt-pizzeria':{id:'pk-shop',name:'ערכת קיר "חנות"',price:49,img:'img/wall-kit.jpg'},
 'kt-market':{id:'pk-shop',name:'ערכת קיר "חנות"',price:49,img:'img/wall-kit.jpg'}
};
const NOCUT={'tb-leo':1};Object.values(CATS).forEach(C=>C.designs.forEach(d=>{if(!d.w)d.ov='assets/ovl/'+d.id+'.png'}));Object.values(CATS).forEach(C=>C.designs.forEach(d=>{if(d.img&&!NOCUT[d.id])d.cut='assets/cut/'+d.img.split('/').pop().replace('.jpg','.png')}));
const ALL={};Object.entries(CATS).forEach(([c,C])=>C.designs.forEach(d=>{d.cat=c;ALL[d.id]=d}));
Object.values(PACKS).forEach(p=>{if(!ALL[p.id])ALL[p.id]={...p,pack:true,cat:p.img?'kitchen':'dollhouse'}});
const houseSVG=w=>`<div class="house" style="position:absolute;inset:0"><img src="assets/plain.webp" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain"><div style="position:absolute;inset:0">${W[w].svg().replace('xMidYMid slice','xMidYMid meet')}</div></div>`;
const CR={shelf:[2.6,'50% 60%'],table:[2.2,'50% 48%'],kitchen:[2.2,'50% 66%']};
const swatch=d=>d.w?`<span class="sw" style="position:relative">${W[d.w].svg()}</span>`:`<span class="sw"><img src="${d.img}" alt="" style="transform:scale(${CR[d.cat][0]});transform-origin:${CR[d.cat][1]}"></span>`;
const thumbHTML=it=>it.w?houseSVG(it.w):`<img src="${it.img||'img/wall-kit.jpg'}" alt="">`;
const packThumb=p=>p.img?`<img src="${p.img}" alt="">`:`<div style="display:grid;grid-template-columns:repeat(3,1fr);place-items:center;height:100%;font-size:30px;background:var(--sand)">${p.items.slice(0,6).map(e=>`<span>${e}</span>`).join('')}</div>`;
window.POP={CATS,PACKS,ALL,swatch,houseSVG,thumbHTML,packThumb};
/* ---------- toast ---------- */
const toast=document.createElement('div');toast.className='toast';document.body.appendChild(toast);let tt;
const say=m=>{toast.textContent=m;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('on'),2200)};
/* ---------- header ---------- */
const here=location.pathname.endsWith('category.html')?new URLSearchParams(location.search).get('c'):null;
const BAG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/></svg>';
const nav=$('header.nav');
nav.innerHTML=`<div class="wrap bar">
 <button class="icon-btn burger" aria-label="תפריט"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 8h16M4 16h16"/></svg></button>
 <nav class="mn"><span class="mn-hl"></span><a class="mn-i${!here&&location.pathname.match(/(index\.html|\/)$/)?' cur':''}" href="index.html">דף הבית</a><button class="mn-i mn-shop" aria-expanded="false">חנות<i>▾</i></button>${Object.entries(CATS).map(([k,c])=>`<a class="mn-i${here==k?' cur':''}" href="category.html?c=${k}">${c.name}</a>`).join('')}</nav>
 <a class="logo" href="index.html" aria-label="Popelino - דף הבית"><img src="assets/logo-transparent.png" alt="Popelino"></a>
 <button class="icon-btn cart-btn" aria-label="סל הקניות">${BAG}<span class="badge">0</span></button></div>
<div class="dd" role="menu"><div class="wrap">${Object.entries(CATS).map(([k,c])=>`<a class="dd-t" href="category.html?c=${k}"><img src="${c.thumb}" alt=""><span><b>${c.name}</b><small>${c.ikea} · ${c.designs.length} עיצובים</small></span></a>`).join('')}<a class="dd-all" href="index.html#shop">לכל החנות</a><button class="dd-x" aria-label="סגירה">✕</button></div></div>`;
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>8),{passive:true});
const dd=$('.dd',nav),shop=$('.mn-shop',nav);let ddT;
let ddAt=0;const ddSet=o=>{if(o&&!dd.classList.contains('open'))ddAt=Date.now();dd.classList.toggle('open',o);shop.setAttribute('aria-expanded',o)};
shop.onclick=e=>{e.stopPropagation();ddSet(!dd.classList.contains('open')||Date.now()-ddAt<600)};
shop.addEventListener('mouseenter',()=>{clearTimeout(ddT);ddSet(true)});
$('.burger',nav).onclick=e=>{e.stopPropagation();ddSet(!dd.classList.contains('open'))};
$('.dd-x',nav).onclick=()=>ddSet(false);
nav.addEventListener('mouseleave',()=>{ddT=setTimeout(()=>ddSet(false),250)});nav.addEventListener('mouseenter',()=>clearTimeout(ddT));
document.addEventListener('click',e=>{if(!nav.contains(e.target))ddSet(false)});
addEventListener('keydown',e=>{if(e.key=='Escape'){ddSet(false);cartOpen(false)}});
const mn=$('.mn',nav),hl=$('.mn-hl',nav);
$$('.mn-i',mn).forEach(it=>it.addEventListener('mouseenter',()=>{const r=it.getBoundingClientRect(),p=mn.getBoundingClientRect(),v={x:r.left-p.left,width:r.width,opacity:1};
 if(G&&!RM)G.to(hl,{...v,duration:.35,ease:'power3.out'});else{hl.style.transform=`translateX(${v.x}px)`;hl.style.width=v.width+'px';hl.style.opacity=1}}));
mn.addEventListener('mouseleave',()=>{if(G)G.to(hl,{opacity:0,duration:.25});else hl.style.opacity=0});
/* ---------- cart ---------- */
const KEY='popelino-cart';let cart=JSON.parse(localStorage.getItem(KEY)||'[]');
const scrim=document.createElement('div');scrim.className='scrim';
const dr=document.createElement('aside');dr.className='drawer';dr.setAttribute('aria-label','סל הקניות');
dr.innerHTML=`<div class="dr-h"><h3>הסל שלי</h3><button class="icon-btn" data-close aria-label="סגירה">✕</button></div><div class="dr-l"></div><div class="dr-f"><div class="tot"><span>סה"כ</span><span class="sum">₪0</span></div><small>משלוח חינם מעל ₪200 · מחירים לדוגמה</small><button class="btn acc" data-checkout>לתשלום</button></div>`;
document.body.append(scrim,dr);
const save=()=>localStorage.setItem(KEY,JSON.stringify(cart));
function renderCart(){const n=cart.reduce((a,b)=>a+b.q,0),sum=cart.reduce((a,b)=>a+b.q*(ALL[b.id]?.price||0),0);
 $$('.badge').forEach(b=>{b.textContent=n;b.classList.toggle('on',n>0)});$('.sum',dr).textContent='₪'+sum;
 $('.dr-l',dr).innerHTML=cart.length?cart.map(it=>{const d=ALL[it.id];if(!d)return'';const C=CATS[d.cat];
  return `<div class="dr-i" data-id="${it.id}"><div class="th" style="position:relative">${d.pack?packThumb(d):thumbHTML(d)}</div><div class="nm">${d.pack?d.name:C.name+' '+C.ikea+' · '+d.name}<small>${d.pack?'ערכת אביזרים':'מדבקה'}</small><div class="qty"><button data-q="1" aria-label="הוספה">+</button><span>${it.q}</span><button data-q="-1" aria-label="הפחתה">−</button></div> <button class="rm">הסרה</button></div><div class="pr">₪${d.price*it.q}</div></div>`}).join(''):'<div class="dr-e">הסל ריק כרגע 🌱</div>';
 $('[data-checkout]',dr).disabled=!cart.length;$('[data-checkout]',dr).style.opacity=cart.length?1:.4}
function cartOpen(o){dr.classList.toggle('on',o);scrim.classList.toggle('on',o)}
function add(id){const d=ALL[id];if(!d)return;const f=cart.find(x=>x.id==id);f?f.q++:cart.push({id,q:1});save();renderCart();
 $$('.badge').forEach(b=>{b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')});cartOpen(true)}
dr.addEventListener('click',e=>{const row=e.target.closest('.dr-i');
 if(e.target.closest('[data-close]'))return cartOpen(false);
 if(e.target.closest('[data-checkout]')){say('זהו אתר הדגמה. התשלום יחובר בהמשך');return}
 if(!row)return;const it=cart.find(x=>x.id==row.dataset.id);
 if(e.target.dataset.q){it.q+=+e.target.dataset.q;if(it.q<1)cart=cart.filter(x=>x!=it)}
 if(e.target.classList.contains('rm'))cart=cart.filter(x=>x!=it);save();renderCart()});
scrim.onclick=()=>cartOpen(false);$('.cart-btn',nav).onclick=()=>cartOpen(true);
document.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b){e.preventDefault();add(b.dataset.add)}});
renderCart();window.POP.add=add;
/* ---------- try-on component ---------- */
window.TryOn=function(root,opt={}){
 const PR=opt.prodEl||root;PR.innerHTML=`${opt.products?`<span class="lbl">בחרו רהיט</span><div class="prods">${Object.entries(CATS).map(([k,c])=>`<button class="pt" data-c="${k}"><img src="${c.thumb}" alt="">${c.name}</button>`).join('')}</div>`:''}`;
 const stageBox=opt.stageEl,ctl=document.createElement('div');root.appendChild(ctl);const SCP=opt.scope||ctl;
 stageBox.innerHTML=`<div class="stage"><span class="ph">תמונת הדמיה</span></div>${opt.cap?'<div class="stage-cap"><span class="cap-l"></span><span>מחירים לדוגמה</span></div>':''}`;
 const stage=$('.stage',stageBox);let cat=null,des=null;
 function layer(d){const L=document.createElement('div');L.className='lay'+(d.w?' house':'');
  if(opt.cut&&d.ov){L.className+=' ovl';L.innerHTML=`<div class="ob"><img src="${CATS[d.cat].thumb}" alt=""><img src="${d.ov}" alt="${d.name}"></div>`;return L}
  if(opt.cut&&d.cut)L.className+=' cut';
  L.innerHTML=d.w?`<div class="hs"><img src="assets/plain.webp" alt=""></div>`:`<img src="${opt.cut&&d.cut?d.cut:d.img}" alt="${d.name}">`;
  if(d.w){const s=skinEl(d.w);$('.hs',L).appendChild(s)}return L}
 function setDesign(id,instant){const d=ALL[id];if(!d||d==des)return;des=d;
  $$('.st-acc',stage).forEach(n=>n.remove());const old=$$('.lay',stage),L=layer(d);L.style.opacity=instant?1:0;stage.insertBefore(L,$('.ph',stage));
  if(!instant)requestAnimationFrame(()=>requestAnimationFrame(()=>L.style.opacity=1));setTimeout(()=>old.forEach(o=>o.remove()),instant?0:(opt.fade||650));
  $$('.dz button',SCP).forEach(b=>b.classList.toggle('on',b.dataset.id==id));
  const C=CATS[d.cat],P=PACKS[id];
  $('.pc-main',SCP).innerHTML=`<div><div class="t">${C.name} ${C.ikea} · ${d.name}</div><div class="p">₪${d.price}<small>מחיר לדוגמה</small></div></div><button class="btn" data-add="${d.id}">הוסיפו לסל</button>`;
  const pk=$('.pc-pack',SCP);
  if(P){pk.style.display='';pk.innerHTML=`<div class="row"><div><span class="bdg">${opt.packLbl||'ערכת אביזרים · נמכרת בנפרד'}</span><div class="t">${P.name}</div><div class="p" style="font-size:18px">₪${P.price}<small>לא כלול במדבקה</small></div></div>${P.img?`<img src="${P.img}" alt="" style="width:64px;height:64px;border-radius:12px;object-fit:cover">`:''}<button class="btn ghost sm" data-add="${P.id}">+ לסל</button></div>
   ${P.items?`<div class="tray">${P.items.map(e=>`<div class="ts" data-e="${e}">${e}</div>`).join('')}</div><p class="hint">👆 <b>גררו</b> אביזר אל הבית כדי לנסות. גררו החוצה כדי להסיר.</p>`:''}`;
   $$('.ts',pk).forEach(t=>drag(t,true))}
  else{pk.style.display=opt.compact?'none':'';pk.innerHTML=`<p class="hint" style="margin:0">לעיצוב הזה אין ערכת אביזרים. המדבקה מושלמת כמו שהיא.</p>`}
  const cl=$('.cap-l',stageBox);if(cl)cl.textContent=`${C.name} ${C.ikea} · ${d.name}`;
  opt.onDesign&&opt.onDesign(d)}
 function setCat(c,fromEl){cat=c;const C=CATS[c];des=null;
  $$('.pt',PR).forEach(b=>b.classList.toggle('on',b.dataset.c==c));
  ctl.innerHTML=`${opt.title?`<h3>${C.name} ${C.ikea}</h3><p class="sm">בחרו עיצוב וראו אותו על הרהיט</p>`:''}<span class="lbl">${C.house?'בחרו עולם':'בחרו עיצוב'}</span><div class="dz">${C.designs.slice(0,opt.max||99).map(d=>`<button data-id="${d.id}" aria-label="${d.name}">${swatch(d)}${d.short}</button>`).join('')}</div><div class="pc pc-main"></div><div class="pc pack pc-pack"></div>`;
  if(opt.dzEl){opt.dzEl.innerHTML='';opt.buyEl.innerHTML='';$$('.lbl,.dz',ctl).forEach(e=>opt.dzEl.appendChild(e));$$('.pc',ctl).forEach(e=>opt.buyEl.appendChild(e))}
  $$('.dz button',SCP).forEach(b=>b.onclick=()=>setDesign(b.dataset.id));
  setDesign(C.designs[0].id,!fromEl);
  if(fromEl&&G&&!RM){const tr=fromEl.getBoundingClientRect(),sr=stage.getBoundingClientRect();
   G.fromTo(stage,{x:tr.left-sr.left,y:tr.top-sr.top,scaleX:tr.width/sr.width,scaleY:tr.height/sr.height,transformOrigin:'0 0',borderRadius:60},{x:0,y:0,scaleX:1,scaleY:1,borderRadius:28,duration:.75,ease:'power3.inOut',clearProps:'transform'})}}
 $$('.pt',PR).forEach(b=>b.onclick=()=>setCat(b.dataset.c,b));
 /* drag accessories onto the house */
 let z=10;
 function drag(el,fromTray){el.addEventListener('pointerdown',e=>{if(!des||!des.w)return;e.preventDefault();
  let node=el;if(fromTray){node=document.createElement('div');node.className='st-acc';node.textContent=el.dataset.e}
  const sr=stage.getBoundingClientRect(),fs=sr.width*.09;node.style.setProperty('--fs',fs+'px');node.classList.add('fly');document.body.appendChild(node);
  const inside=ev=>{const r=stage.getBoundingClientRect();return ev.clientX>r.left&&ev.clientX<r.right&&ev.clientY>r.top&&ev.clientY<r.bottom};
  const mv=ev=>{node.style.left=ev.clientX-fs/2+'px';node.style.top=ev.clientY-fs/2+'px';stage.classList.toggle('over',inside(ev))};mv(e);
  const up=ev=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);stage.classList.remove('over');
   if(inside(ev)){const r=stage.getBoundingClientRect(),b=node.getBoundingClientRect();node.classList.remove('fly');node.style.left=(b.left-r.left)/r.width*100+'%';node.style.top=(b.top-r.top)/r.height*100+'%';node.style.setProperty('--fs','9cqw');node.style.zIndex=++z;stage.appendChild(node);if(!node._d){node._d=1;drag(node,false)}}
   else{node.remove()}};
  addEventListener('pointermove',mv);addEventListener('pointerup',up)})}
 stage.style.containerType='inline-size';
 setCat(opt.cat||'dollhouse');
 return{setCat,setDesign,get des(){return des}}};
/* ---------- product card ---------- */
window.POP.card=d=>{const C=CATS[d.cat];
 return `<article class="card rv" data-id="${d.id}"><div class="im" data-try="${d.id}">${d.pack?`<span class="tag">ערכת אביזרים</span>${packThumb(d)}`:thumbHTML(d)}</div><div class="bd"><h3>${d.pack?d.name:C.name+' · '+d.name}</h3><span class="meta">${d.pack?'נמכרת בנפרד':C.ikea}</span><div class="ft"><b>₪${d.price}</b><button class="btn sm" data-add="${d.id}">הוסיפו לסל</button></div></div></article>`};
/* ---------- reviews glide ---------- */
window.POP.reviews=function(){const sec=$('#reviews');if(!sec)return;const view=$('.rs-view',sec),tr=$('.rs-track',sec);
 tr.innerHTML+=tr.innerHTML;let x=0,drag=false,last=0,hover=false,boost=0,speed=RM?0:.4;
 const half=()=>tr.scrollWidth/2,step=()=>$('.rs',tr).offsetWidth+20,wx=v=>{const h=half();return((v%h)+h)%h};
 const set=v=>{x=v;tr.style.transform=`translate3d(${wx(x)-half()}px,0,0)`};set(0);
 if(G){G.ticker.add(()=>{if(drag)return;boost*=.92;set(x+(hover?.06:speed)+boost)});
  if(window.ScrollTrigger&&!RM){G.registerPlugin(ScrollTrigger);ScrollTrigger.create({trigger:sec,start:'top bottom',end:'bottom top',onUpdate:s=>{boost=Math.max(-10,Math.min(10,s.getVelocity()/150))}})}}
 $$('.rs-b',sec).forEach(b=>b.onclick=()=>{const o={v:x};G?G.to(o,{v:x+step()*(+b.dataset.d),duration:.6,ease:'power3.inOut',onUpdate:()=>set(o.v)}):set(x+step()*(+b.dataset.d))});
 view.addEventListener('mouseenter',()=>hover=true);view.addEventListener('mouseleave',()=>hover=false);
 view.addEventListener('pointerdown',e=>{drag=true;last=e.clientX;view.setPointerCapture(e.pointerId)});
 view.addEventListener('pointermove',e=>{if(!drag)return;const d=e.clientX-last;last=e.clientX;set(x+d)});
 ['pointerup','pointercancel'].forEach(t=>view.addEventListener(t,()=>drag=false))};
/* ---------- reveal ---------- */
window.POP.reveal=function(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
 $$('.rv:not(.in)').forEach((el,i)=>{el.style.transitionDelay=(i%4)*60+'ms';io.observe(el)});if(location.hash=='#shot')$$('.rv').forEach(e=>e.classList.add('in'))};
/* ---------- how it works: one dollhouse, a real peel & stick ---------- */
window.POP.how=function(){const root=$('#how');if(!root||typeof WORLDS=='undefined')return;
 const VW=1312,VH=1199,SV=()=>WORLDS.market.svg().replace('xMidYMid slice','xMidYMid meet');
 const REG={bot:[244,711,1137,1028],top:[224,72,1166,709]};
 const ins=r=>`inset(${r[1]/VH*100}% ${100-r[2]/VW*100}% ${100-r[3]/VH*100}% ${r[0]/VW*100}%)`;
 const cards=$$('.hs',root),REC=/[?&]rec=1/.test(location.search);
 const fx=c=>{const f=$('.hs-fx',c);if(f){f.style.webkitMaskImage=f.style.maskImage='url(assets/plain.webp)';f.style.webkitMaskSize=f.style.maskSize='100% 100%'}return f};
 function layer(c,reg){const hb=$('.hs-hb',c),d=document.createElement('div');d.className='hs-lay';d.innerHTML=SV();d.style.clipPath=ins(reg);hb.insertBefore(d,$('.hs-fx',hb));return d}
 function sticker(c,reg){const hb=$('.hs-hb',c),tray=$('.hs-tray',c),k=document.createElement('div');k.className='hs-stk';
  k.innerHTML=`<div class="hs-in"><div class="hs-art">${SV()}</div><div class="hs-flw"><div class="hs-flap"></div></div></div>`;hb.insertBefore(k,$('.hs-fx',hb));
  const art=$('.hs-art',k),flw=$('.hs-flw',k),flap=$('.hs-flap',k),inn=$('.hs-in',k),cut=document.createElement('div');cut.className='hs-cut';tray.appendChild(cut);
  const S={d:0,lift:0,f:0,sq:0};let g;
  function geo(){const W=hb.offsetWidth,H=hb.offsetHeight,rx=reg[0]/VW*W,ry=reg[1]/VH*H,rw=(reg[2]-reg[0])/VW*W,rh=(reg[3]-reg[1])/VH*H;
   const tx=tray.offsetLeft-hb.offsetLeft,ty=tray.offsetTop-hb.offsetTop,tw=tray.offsetWidth,th=tray.offsetHeight;
   const s=Math.min(tw*.84/rw,th*.7/rh,1),cx=tx+tw/2,cy=ty+th*.56;
   g={W,H,rx,ry,rw,rh,s,x0:cx-(rx+rw/2)*s,y0:cy-(ry+rh/2)*s,m:Math.min(rw,rh)};
   cut.style.cssText=`left:${tw/2-rw*s/2-4}px;top:${th*.56-rh*s/2-4}px;width:${rw*s+8}px;height:${rh*s+8}px`;
   flw.style.cssText=`left:${rx}px;top:${ry}px;width:${rw}px;height:${rh}px`;inn.style.transformOrigin=`${rx+rw/2}px ${ry+rh/2}px`;draw()}
  function draw(){if(!g)return;const{rx,ry,rw,rh,s,x0,y0,H,m}=g,f=S.f,arc=Math.sin(Math.PI*f);
   const x=x0*(1-f),y=y0*(1-f)-arc*H*.16-S.lift*H*.03,sc=s+(1-s)*f+S.lift*.05;
   k.style.transform=`translate(${x}px,${y}px) scale(${sc}) rotate(${-arc*3}deg)`;
   k.style.filter=S.f>.995&&S.lift<.01?'none':`drop-shadow(0 ${1+S.lift*16}px ${1.5+S.lift*14}px rgba(60,40,20,${.2+S.lift*.15}))`;
   const d=S.d*m*.8;
   art.style.clipPath=d>.5?`polygon(${rx+d}px ${ry}px,${rx+rw}px ${ry}px,${rx+rw}px ${ry+rh}px,${rx}px ${ry+rh}px,${rx}px ${ry+d}px)`:`polygon(${rx}px ${ry}px,${rx+rw}px ${ry}px,${rx+rw}px ${ry+rh}px,${rx}px ${ry+rh}px)`;
   flw.style.opacity=d>.5?1:0;flap.style.clipPath=`polygon(${d}px 0,${d}px ${d}px,0 ${d}px)`;
   flap.style.background=`linear-gradient(135deg,#cfc7bb ${d*.707}px,#fff ${d*.98}px,#f1ebe2 ${d*1.414}px)`;
   inn.style.transform=`scale(${1+S.sq*.04},${1-S.sq*.06})`}
  addEventListener('resize',geo);(document.fonts&&document.fonts.ready||Promise.resolve()).then(geo);
  if($('.hs-base',c).complete)geo();else $('.hs-base',c).addEventListener('load',geo);geo();
  return{S,draw,cut,k}}
 const pop=(tl,c,at)=>tl.to($('.hs-n',c),{scale:1,opacity:1,duration:.55,ease:'back.out(2.2)'},at).fromTo($('.hs-il',c),{y:10,opacity:0},{y:0,opacity:1,duration:.5,ease:'power2.out'},at+.08);
 function peelStick(tl,c,st,at){const S=st.S,u=st.draw,f=fx(c);
  tl.to(S,{d:1,duration:.95,ease:'power2.inOut',onUpdate:u},at)
   .to(S,{lift:1,duration:.4,ease:'power2.out',onUpdate:u},at+.75)
   .to(S,{f:1,duration:.95,ease:'power2.inOut',onUpdate:u},at+1.05)
   .to(S,{d:0,duration:.6,ease:'power2.out',onUpdate:u},at+1.1)
   .to(S,{lift:0,duration:.25,ease:'power2.in',onUpdate:u},at+1.75)
   .to(S,{sq:1,duration:.1,ease:'power2.out',onUpdate:u},at+1.98)
   .to(S,{sq:0,duration:.55,ease:'elastic.out(1.1,.4)',onUpdate:u},at+2.08)
   .to(st.cut,{opacity:.35,duration:.4},at+1.3);
  if(f)tl.set(f,{opacity:1,backgroundPosition:'100% 0'},at+2.1).to(f,{backgroundPosition:'0% 0',duration:.75,ease:'power1.inOut'},at+2.1).to(f,{opacity:0,duration:.25},at+2.7);
  return tl}
 const tls=[];
 // 1 · choose a world
 {const c=cards[0],tray=$('.hs-tray',c);tray.innerHTML=[['סופר','#bdd1c8'],['גלידה','#e1cdc8'],['בית','#f1e0b5']].map(([t,b])=>`<span class="hs-w" style="background:${b}"><i></i><b>✓</b>${t}</span>`).join('');
  const w=$$('.hs-w',c),tl=G.timeline({paused:true});pop(tl,c,0);
  tl.to(w,{scale:1,opacity:1,duration:.45,stagger:.12,ease:'back.out(2)'},.2)
   .to(w[0],{scale:1.12,duration:.25,ease:'power2.out'},1.0).to($('i',w[0]),{opacity:1,scale:1,duration:.3,ease:'back.out(3)'},1.0)
   .to($('b',w[0]),{scale:1,duration:.35,ease:'back.out(3)'},1.15).to(w.slice(1),{opacity:.45,scale:.92,duration:.3},1.05)
   .to(w[0],{scale:1.06,duration:.3},1.3).fromTo($('.hs-hb',c),{y:0},{y:-8,duration:.18,yoyo:true,repeat:1,ease:'power1.out'},1.2);
  tls.push(tl)}
 // 2 · peel the lower sheet and stick it: half designed
 {const c=cards[1],st=sticker(c,REG.bot),tl=G.timeline({paused:true});pop(tl,c,0);peelStick(tl,c,st,.35);tls.push(tl)}
 // 3 · second sheet: fully designed
 {const c=cards[2];layer(c,REG.bot);const st=sticker(c,REG.top),tl=G.timeline({paused:true});pop(tl,c,0);peelStick(tl,c,st,.35);
  tl.to($$('.hs-pop img',c),{scale:1,duration:.5,stagger:.07,ease:'back.out(2.6)'},2.25).fromTo($('.hs-hb',c),{y:0},{y:-10,duration:.2,yoyo:true,repeat:1,ease:'power1.out'},2.3);tls.push(tl)}
 window.HWT={tls,seek(t){let a=0;tls.forEach(tl=>{tl.time(Math.max(0,Math.min(tl.duration(),t-a)));a+=tl.duration()})},total:()=>tls.reduce((a,t)=>a+t.duration(),0)};
 if(RM){tls.forEach(t=>t.progress(1));return}if(REC)return;
 let q=Promise.resolve();const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const i=cards.indexOf(e.target.closest('.hs'));
  q=q.then(()=>new Promise(r=>{tls[i].eventCallback('onComplete',r);tls[i].play()}))}),{threshold:.6});cards.forEach(c=>io.observe($('.hs-st',c)))};
})();
