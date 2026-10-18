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
/* ---------- how it works v3: pinned cinematic story, scrubbed by scroll ---------- */
window.POP.how=function(){const sec=$('#how');if(!sec||typeof WORLDS=='undefined'||!G)return;
 const REC=/[?&]rec=1/.test(location.search),NS='http://www.w3.org/2000/svg',VW=1312,VH=1199,STH=1649;
 const SV=()=>WORLDS.market.svg().replace('xMidYMid slice','xMidYMid meet');
 const cam=$('.hw3-cam',sec),stage=$('.hw3-stage',sec),turn=$('.hw3-turn',sec),persp=$('.hw3-persp',sec),front=$('.hw3-front',sec),bg=$('.hw3-bg',sec);
 const P=s=>s.split(' ').map(p=>p.split(',').map(Number));
 const pc=pts=>`polygon(${pts.map(p=>`${(p[0]/VW*100).toFixed(2)}% ${(p[1]/VH*100).toFixed(2)}%`).join(',')})`;
 function clipHalf(poly,f){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],fa=f(a),fb=f(b);
  if(fa>=0)out.push(a);if((fa>=0)!=(fb>=0)){const t=fa/(fa-fb);out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t])}}return out}
 /* depth layers for the 2.5D turn (same trick as hero 1) */
 for(let i=7;i>=1;i--){const im=document.createElement('img');im.src='assets/plain-edge.webp';im.alt='';im.className='dp';im.style.transform=`translateZ(${-i*8}px)`;turn.insertBefore(im,front)}
 /* sheets on the table below the house (house units) */
 const SH={x:150,y:1249,w:1012,h:400};const sheets=$$('.hw3-sheet',sec);
 /* a die-cut sticker that curls off its sheet and presses onto the house */
 function sticker(reg,rooms,sheet,id){const[x0,y0,x1,y1]=reg,rw=x1-x0,rh=y1-y0,MAX=rw+rh;
  const k=document.createElement('div');k.className='hw3-k';
  k.innerHTML=`<div class="hw3-ki"><div class="hw3-art">${SV()}</div><svg class="hw3-flap" viewBox="0 0 ${VW} ${VH}"><defs><linearGradient id="hg${id}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#cfc9bf"/><stop offset=".2" stop-color="#fbfaf7"/><stop offset=".7" stop-color="#fff"/><stop offset="1" stop-color="#e4dfd6"/></linearGradient></defs><g fill="url(#hg${id})"></g></svg>
   <svg class="hw3-sh" viewBox="0 0 ${VW} ${VH}"><defs><clipPath id="hc${id}">${rooms.map(r=>`<polygon points="${r.join(' ')}"/>`).join('')}</clipPath><linearGradient id="hs${id}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".46" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".8"/><stop offset=".56" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><g clip-path="url(#hc${id})"><rect x="-1400" y="0" width="1400" height="${VH}" fill="url(#hs${id})"/></g></svg></div>`;
  front.appendChild(k);
  const ki=$('.hw3-ki',k),art=$('.hw3-art',k),g=$('.hw3-flap g',k),gr=$('linearGradient',k),shr=$('.hw3-sh rect',k);
  ki.style.transformOrigin=`${(x0+rw/2)/VW*100}% ${(y0+rh/2)/VH*100}%`;
  /* resting pose on the sheet */
  const s=Math.min(SH.w*.84/rw,SH.h*.7/rh),cx=SH.x+SH.w/2,cy=SH.y+SH.h*.55,px=cx-(x0+rw/2)*s,py=cy-(y0+rh/2)*s;
  const cut=$('.cut',sheet);cut.style.cssText=`left:${((cx-rw*s/2-12-SH.x)/SH.w*100).toFixed(2)}%;top:${((cy-rh*s/2-12-SH.y)/SH.h*100).toFixed(2)}%;width:${((rw*s+24)/SH.w*100).toFixed(2)}%;height:${((rh*s+24)/SH.h*100).toFixed(2)}%`;
  const C={cx:x1,cy:y0},uv=p=>[C.cx-p[0],p[1]-C.cy],xy=(u,v)=>[C.cx-u,C.cy+v];
  const RECT=[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
  const o={c:0,lift:0,f:0,sq:0,sh:0,on:0,sy:0,MAX};
  o.draw=function(){const c=o.c*MAX,f=o.f,arc=Math.sin(Math.PI*f);
   k.style.visibility=o.on>0?'visible':'hidden';
   const sc=s+(1-s)*f+o.lift*.06,x=px*(1-f),y=py*(1-f)+o.sy*(1-f)-arc*VH*.2-o.lift*VH*.04;
   k.style.transform=`translate(${(x/VW*100).toFixed(3)}%,${(y/VH*100).toFixed(3)}%) scale(${sc.toFixed(4)}) rotate(${(-arc*4).toFixed(2)}deg)`;
   k.style.filter=o.lift>.02?`drop-shadow(0 ${(o.lift*18).toFixed(1)}px ${(o.lift*16).toFixed(1)}px rgba(50,35,20,${(o.lift*.3).toFixed(3)}))`:'none';
   if(c<1){art.style.clipPath=pc(RECT);g.innerHTML=''}
   else{const keep=clipHalf(RECT.map(uv),p=>p[0]+p[1]-c).map(p=>xy(p[0],p[1]));art.style.clipPath=keep.length>2?pc(keep):'polygon(0 0,0 0,0 0)';
    let h='';rooms.forEach(r=>{const pe=clipHalf(r.map(uv),p=>c-(p[0]+p[1]));if(pe.length>2)h+=`<polygon points="${pe.map(p=>xy(c-p[1],c-p[0]).map(n=>n.toFixed(1)).join(',')).join(' ')}"/>`});
    g.innerHTML=h;const a=xy(c/2,c/2),b=xy(c,c);gr.setAttribute('x1',a[0]);gr.setAttribute('y1',a[1]);gr.setAttribute('x2',b[0]);gr.setAttribute('y2',b[1])}
   ki.style.transform=o.sq?`scale(${(1+o.sq*.035).toFixed(4)},${(1-o.sq*.06).toFixed(4)})`:'';
   shr.setAttribute('x',(-1400+o.sh*2712).toFixed(1))};
  o.k=k;return o}
 const bot=sticker([244,711,1137,1028],[P(R.BL),P(R.BR)],sheets[0],'b');
 const top=sticker([224,72,1166,709],[P(R.TL),P(R.TR),P('230,640 1160,640 1160,700 230,700'),P('440,560 870,560 870,634 440,634')],sheets[1],'t');
 /* living details of the market world (finale) */
 const tsvg=$('.hw3-art svg',top.k),sign=tsvg.querySelector('text')?.parentNode,bulbs=$$('.blink',tsvg),wag=$('.wag',tsvg),cart=$('.roll',bot.k);
 [sign,wag,cart].forEach(e=>{if(e){e.style.transformBox='fill-box';e.style.transformOrigin='50% 0%'}});
 const spk=document.createElementNS(NS,'svg');spk.setAttribute('viewBox',`0 0 ${VW} ${VH}`);spk.classList.add('hw3-spk');
 const SPK=[[330,250,46],[980,330,38],[700,470,30],[420,820,40],[1040,860,34],[600,150,28]];
 spk.innerHTML=SPK.map(([x,y,r],i)=>`<path transform="translate(${x} ${y}) scale(0)" d="M0 -${r} C${r*.18} -${r*.18} ${r*.18} -${r*.18} ${r} 0 C${r*.18} ${r*.18} ${r*.18} ${r*.18} 0 ${r} C-${r*.18} ${r*.18} -${r*.18} ${r*.18} -${r} 0 C-${r*.18} -${r*.18} -${r*.18} -${r*.18} 0 -${r}z" fill="${i%2?'#fff7d6':'#ffffff'}" stroke="#e8c75a" stroke-width="4"/>`).join('');
 front.appendChild(spk);const spks=[...spk.children];
 /* world orbs */
 const OW=['market','ice','pizza','forest','home'],orbs=$('.hw3-orbs',sec);
 orbs.innerHTML=OW.map(k=>`<div class="hw3-orb"><div class="c" style="background:${WORLDS[k].color}">${WORLDS[k].svg().replace('xMidYMid slice','xMidYMid meet')}</div><i class="ring"></i><span class="ck">✓</span><span class="t">${WORLDS[k].tag}</span></div>`).join('');
 const OE=$$('.hw3-orb',orbs);
 /* logo-shape burst: deterministic paths so scrolling back reverses it */
 const BS=['flower-pink','flower-sage','drop-lilac','dot-pink','dot-sage','flower-pink','flower-sage','dot-pink'],burst=$('.hw3-burst',sec);
 let rs=7;const rnd=()=>(rs=(rs*9301+49297)%233280)/233280;
 const BP=Array.from({length:16},(_,i)=>{const a=i/16*Math.PI*2+(rnd()-.5)*.3,r=800+rnd()*230;
  return{src:BS[i%BS.length],tx:656+Math.cos(a)*r,ty:Math.min(1190,600+Math.sin(a)*r*.72),h:260+rnd()*260,sz:70+rnd()*70,rot:(rnd()-.5)*540}});
 burst.innerHTML=BP.map(b=>`<img src="assets/deco/${b.src}.svg" alt="">`).join('');const BE=$$('img',burst);
 /* state */
 const S={cs:1.18,cx:656,cy:600,orbIn:0,orbRot:0,pick:0,absorb:0,turn:0,tx:0,burst:0,alive:0,hint:1};
 let W=600,u=.45;
 function size(){const r=stage.getBoundingClientRect(),mob=innerWidth<=820;W=Math.min(r.width*(mob?.84:.86),r.height*(mob?.97:.93)*VW/STH,720);u=W/VW;cam.style.setProperty('--W',W.toFixed(1)+'px');
  OE.forEach(e=>e.style.setProperty('--o',(mob?250:200)*u+'px'));render()}
 const CX=VW/2,CY=STH/2;
 function render(){/* camera */
  cam.style.transform=`translate(${((CX-S.cx)*u*S.cs).toFixed(2)}px,${((CY-S.cy)*u*S.cs).toFixed(2)}px) scale(${S.cs.toFixed(4)})`;
  /* turn */
  turn.style.transform=S.turn||S.tx?`rotateY(${S.turn.toFixed(2)}deg) rotateX(${S.tx.toFixed(2)}deg)`:'';
  /* orbs: a tilted ring around the house, the back half passes behind it */
  const sr=stage.getBoundingClientRect(),oR=(innerWidth<=820?125:100),rxMax=(sr.width/2-oR*u*S.cs*1.25-6)/(u*S.cs),rx=Math.min(760,rxMax),ry=150;
  OE.forEach((e,i)=>{const a=S.orbRot+i/OW.length*Math.PI*2,depth=Math.sin(a),inn=Math.max(0,Math.min(1,S.orbIn*1.6-i*.15));
   let x=CX+Math.cos(a)*rx,y=640+depth*ry,sc=(.78+depth*.22)*inn,op=inn*(.55+depth*.45);
   if(i==0){sc*=1+S.pick*.5;x+=(CX-x)*S.absorb;y+=(600-y)*S.absorb;sc*=1+S.absorb*2.2;op*=1-S.absorb**2}else{sc*=1-S.pick*.9;op*=1-S.pick}
   e.style.transform=`translate(${(x*u).toFixed(1)}px,${(y*u).toFixed(1)}px) scale(${Math.max(0,sc).toFixed(3)})`;e.style.opacity=op.toFixed(3);e.style.zIndex=depth>0||i==0&&S.pick>.3?3:1;e.style.visibility=op<.01?'hidden':'visible'});
  const r0=$('.ring',OE[0]),c0=$('.ck',OE[0]);r0.style.opacity=Math.min(1,S.pick*2)*(1-S.absorb);r0.style.transform=`scale(${.8+Math.min(1,S.pick*1.5)*.2})`;c0.style.transform=`scale(${Math.min(1,Math.max(0,S.pick*2-.6))})`;
  /* burst */
  const b=S.burst;BE.forEach((e,i)=>{const p=BP[i],t=Math.max(0,Math.min(1,b*1.25-i*.016)),ease=1-Math.pow(1-t,3),x=656+(p.tx-656)*ease,y=620+(p.ty-620)*t-Math.sin(Math.PI*Math.min(1,t))*p.h*(1-t*.3);
   const sc=t<=0?0:t<.25?t/.25*1.25:1.25-(t-.25)/.75*.25;e.style.width=e.style.height=p.sz*u+'px';
   e.style.transform=`translate(${((x-p.sz/2)*u).toFixed(1)}px,${((y-p.sz/2)*u).toFixed(1)}px) rotate(${(p.rot*ease).toFixed(1)}deg) scale(${sc.toFixed(3)})`;e.style.opacity=t>0?1:0});
  /* alive */
  const A=S.alive,w=A*Math.PI*2;
  if(sign)sign.style.transform=A?`rotate(${(Math.sin(w*3)*4*(1-A*.4)).toFixed(2)}deg)`:'';
  bulbs.forEach((e,i)=>e.style.opacity=A?(Math.sin(w*6+i*1.3)>0?1:.25):1);
  if(wag)wag.style.transform=A?`scaleY(${(1+Math.sin(w*4)*.08).toFixed(3)})`:'';
  if(cart)cart.style.transform=A?`translateX(${(-Math.sin(w*1.5)*60).toFixed(1)}px)`:'';
  spks.forEach((e,i)=>{const t=Math.max(0,Math.min(1,A*1.3-i*.06)),sc=t<=0?0:Math.abs(Math.sin(t*Math.PI*2.5))*1.1;e.setAttribute('transform',`translate(${SPK[i][0]} ${SPK[i][1]}) rotate(${(t*180).toFixed(0)}) scale(${sc.toFixed(3)})`)});
  bot.draw();top.draw()}
 /* text helpers */
 const steps=$$('.hw3-step',sec),prog=$$('.hw3-prog b',sec),hint=$('.hw3-hint',sec);
 const lines=i=>$$('.ln>*',steps[i]);
 const tl=G.timeline({paused:true,defaults:{ease:'none',immediateRender:false},onUpdate:render});
 const textIn=(i,at,T=tl)=>{const st=steps[i];T.fromTo(lines(i),{yPercent:110},{yPercent:0,duration:.45,stagger:.07,ease:'power3.out'},at)
  .fromTo($('.hw3-n',st),{yPercent:40,opacity:0},{yPercent:0,opacity:1,duration:.4,ease:'power3.out'},at)
  .fromTo($('.hw3-n .o',st),{strokeDashoffset:900},{strokeDashoffset:0,duration:.6,ease:'power2.inOut'},at+.05)
  .fromTo($('.hw3-n .fr',st),{attr:{y:190}},{attr:{y:0},duration:.6,ease:'power2.inOut'},at+.4)
  .fromTo($('.hw3-il',st),{scale:0,rotate:-20},{scale:1,rotate:0,duration:.45,ease:'back.out(2.4)'},at+.2)};
 const textOut=(i,at)=>{const st=steps[i];tl.fromTo(lines(i),{yPercent:0},{yPercent:-110,duration:.35,stagger:.04,ease:'power2.in'},at)
  .fromTo([$('.hw3-n',st),$('.hw3-il',st)],{yPercent:0,opacity:1},{yPercent:-40,opacity:0,duration:.35,ease:'power2.in'},at)};
 G.set(steps.map(s=>[$('.hw3-n',s),$('.hw3-il',s)]).flat(),{opacity:0});G.set($$('.ln>*',sec),{y:0,yPercent:110});G.set(sheets,{y:0,yPercent:160,opacity:0});
 const camTo=(v,at,d=.8)=>tl.to(S,{...v,duration:d,ease:'power2.inOut'},at);
 const peelStick=(o,at)=>{tl.set(o,{on:1},at-.01)
  .fromTo(o,{c:0},{c:.55,duration:1.0,ease:'power1.in'},at)
  .fromTo(o,{lift:0},{lift:1,duration:.35,ease:'power2.out'},at+.85)
  .fromTo(o,{f:0},{f:1,duration:.85,ease:'power2.inOut'},at+1.05)
  .fromTo(o,{c:.55},{c:.3,duration:.6,ease:'sine.inOut'},at+1.05)
  .fromTo(o,{c:.3},{c:0,duration:.45,ease:'power2.inOut'},at+1.75)
  .fromTo(o,{lift:1},{lift:0,duration:.35,ease:'power2.in'},at+1.7)
  .fromTo(o,{sq:0},{sq:1,duration:.08,ease:'power2.out'},at+2.05)
  .fromTo(o,{sq:1},{sq:0,duration:.4,ease:'elastic.out(1.1,.4)'},at+2.13)
  .fromTo(o,{sh:0},{sh:1,duration:.55,ease:'power1.inOut'},at+2.1)};
 /* ---- step 1 · choose a world ---- */
 const intro=G.timeline({paused:true,defaults:{ease:'none',immediateRender:false}});textIn(0,0,intro);tl.fromTo(prog[0],{scaleX:0},{scaleX:1,duration:2.6},0).to(S,{hint:0,duration:.3},.1);
 tl.fromTo(S,{orbIn:0},{orbIn:1,duration:1.1,ease:'power2.out'},.15).fromTo(S,{orbRot:-2.4},{orbRot:Math.PI/2,duration:1.9,ease:'power2.out'},.15)
  .fromTo(S,{pick:0},{pick:1,duration:.45,ease:'back.out(1.6)'},1.95)
  .fromTo(S,{absorb:0},{absorb:1,duration:.5,ease:'power2.in'},2.35)
  .fromTo(bg,{backgroundColor:'#f3f2ef'},{backgroundColor:'#d7e4dd',duration:.6},2.45)
  .fromTo(persp,{y:0},{y:-14,duration:.12,ease:'power1.out'},2.85).to(persp,{y:0,duration:.25,ease:'bounce.out'},2.97);
 /* ---- step 2 · zoom to the lower floor, peel & stick ---- */
 textOut(0,3.0);textIn(1,3.25);tl.fromTo(prog[1],{scaleX:0},{scaleX:1,duration:3.2},3.1);
 camTo({cs:()=>innerWidth<=820?1.3:1.42,cx:656,cy:1160},3.0,.9);
 tl.fromTo(sheets[0],{yPercent:160,opacity:0},{yPercent:0,opacity:1,duration:.7,ease:'power3.out'},3.2)
  .fromTo(bg,{backgroundColor:'#d7e4dd'},{backgroundColor:'#ecdcd7',duration:.8},3.2);
 tl.set(bot,{on:1},3.25);peelStick(bot,4.0);
 tl.to(sheets[0],{yPercent:170,opacity:0,duration:.6,ease:'power2.in'},6.4);
 /* ---- step 3 · zoom out, second sheet, finale ---- */
 textOut(1,6.4);textIn(2,6.65);tl.fromTo(prog[2],{scaleX:0},{scaleX:1,duration:4.4},6.5);
 camTo({cs:1,cx:656,cy:830},6.4,.9);
 tl.fromTo(sheets[1],{yPercent:160,opacity:0},{yPercent:0,opacity:1,duration:.7,ease:'power3.out'},6.75)
  .fromTo(bg,{backgroundColor:'#ecdcd7'},{backgroundColor:'#e4dcea',duration:.8},6.5);
 tl.set(top,{on:1},6.8);peelStick(top,7.3);
 tl.to(sheets[1],{yPercent:170,opacity:0,duration:.6,ease:'power2.in'},9.55);
 camTo({cs:()=>innerWidth<=820?1.2:1.16,cx:656,cy:640},9.6,1.0);
 tl.fromTo(bg,{backgroundColor:'#e4dcea'},{backgroundColor:'#e3ece6',duration:1.4},9.7)
  .fromTo(S,{burst:0},{burst:1,duration:1.2,ease:'none'},9.75)
  .fromTo(S,{turn:0,tx:0},{turn:-24,tx:3,duration:1.1,ease:'sine.inOut'},9.8).to(S,{turn:14,tx:-2,duration:1.2,ease:'sine.inOut'},10.9).to(S,{turn:0,tx:0,duration:.9,ease:'sine.inOut'},12.1)
  .fromTo(S,{alive:0},{alive:1,duration:3.2},9.9);
 tl.to({},{duration:.4},13);
 render();size();addEventListener('resize',size);
 window.HW3={tl,S,render};
 const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(RM){sec.classList.add('rm');intro.progress(1);tl.progress(1);G.set(steps.map(s=>[$('.hw3-n',s),$('.hw3-il',s)]).flat(),{opacity:1,yPercent:0});G.set(lines(0).concat(lines(1)),{yPercent:0});bot.draw();top.draw();size();return}
 if(!window.ScrollTrigger)return;G.registerPlugin(ScrollTrigger);
 const navH=()=>$('.nav').offsetHeight;
 window.HW3.trig=ScrollTrigger.create({trigger:sec,start:()=>'top '+navH(),end:()=>'+='+Math.round(innerHeight*(innerWidth<=820?5:5.4)),pin:$('.hw3-pin',sec),scrub:REC?true:.7,animation:tl,invalidateOnRefresh:true,onRefresh:size});
 ScrollTrigger.create({trigger:sec,start:'top 75%',end:()=>'top '+(navH()+2),scrub:REC?true:.5,animation:intro,invalidateOnRefresh:true});
 hint.style.opacity=1;tl.eventCallback('onUpdate',()=>{render();hint.style.opacity=tl.progress()>.02?0:1})};
})();
