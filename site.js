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
 shelf:{name:'כוננית',ikea:'TROFAST',thumb:'assets/ikea/trofast.png',base:'assets/ikea/trofast-m.png',full:'יחידת אחסון עם קופסאות',lead:'מדבקות לקופסאות ולמסגרת של כוננית TROFAST.',
  designs:[['sage','מרווה'],['pink','ורוד'],['yellow','צהוב'],['blue','כחול'],['gingham','משבצות'],['floral','פרחוני'],['floral2','פרחוני עדין'],['red','פסים'],['beige','בז\''],['mix','צבעוני'],['mix2','פסטל']].map(([k,n])=>({id:'sh-'+k,img:'img/trofast-'+k+'.jpg',name:n,short:n,price:119}))},
 table:{name:'שולחן',ikea:'FLISAT',thumb:'assets/ikea/flisat-table.png',full:'שולחן ילדים',lead:'שולחן הילדים הופך למגרש משחקים.',
  designs:[['road','כבישים'],['check','משבצות'],['leo','נמר']].map(([k,n])=>({id:'tb-'+k,img:'img/table-'+k+'.jpg',name:n,short:n,price:99}))},
 kitchen:{name:'מטבח',ikea:'DUKTIG',thumb:'assets/ikea/duktig.png',base:'assets/ikea/duktig-back.png',full:'מטבח למשחק',lead:'המטבח הופך לחנות קטנה ואמיתית.',
  designs:[['pizzeria','פיצרייה','pizzeria.jpg'],['ice','גלידרייה','icecream.jpg'],['market','מכולת','hero-market.jpg']].map(([k,n,f])=>({id:'kt-'+k,img:'img/'+f,name:n,short:n,price:159}))}
};
const PACKS={}; /* real accessory kits: none finished in the owner's folder yet (בית בובות מדבקות אביזרים חלונות ודלת לבית is empty) */
const NOCUT={'tb-leo':1};Object.values(CATS).forEach(C=>C.designs.forEach(d=>{if(!d.w&&d.cat!='shelf'&&!d.id.startsWith('sh-'))d.ov='assets/ovl/'+d.id+'.png'}));/* cat4: flat print files from Mia warped onto the fixed base */const OV4={'sh-floral':['assets/ovl/sh4-floral.png','assets/cut/sh4-floral.png'],'sh-gingham':['assets/ovl/sh4-gingham.png','assets/cut/sh4-gingham.png'],'kt-pizzeria':['assets/ovl/kt4-pizzeria.png','assets/cut/kt4-pizzeria-back.png']};Object.values(CATS).forEach(C=>C.designs.forEach(d=>{if(d.img&&!NOCUT[d.id])d.cut='assets/cut/'+d.img.split('/').pop().replace('.jpg','.png');if(d.id.startsWith('kt-'))d.cut='assets/cut/'+d.id+'-back.png';if(OV4[d.id]){d.ov=OV4[d.id][0];d.cut=OV4[d.id][1]}}));
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
  if(opt.cut&&d.ov){L.className+=' ovl';L.innerHTML=`<div class="ob"><img src="${CATS[d.cat].base||CATS[d.cat].thumb}" alt=""><img src="${d.ov}" alt="${d.name}"></div>`;return L}
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
/* ---------- how it works v5: pinned scroll story, application steps on the natural-wood house ---------- */
window.POP.how=function(){const sec=$('#how');if(!sec||typeof WORLDS=='undefined'||!G)return;
 const REC=/[?&]rec=1/.test(location.search),NS='http://www.w3.org/2000/svg',VW=1312,VH=1199,STH=1649;
 const RMx=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const SV=()=>WORLDS.market.svg().replace('xMidYMid slice','xMidYMid meet');
 const cam=$('.hw3-cam',sec),stage=$('.hw3-stage',sec),turn=$('.hw3-turn',sec),front=$('.hw3-front',sec),bg=$('.hw3-bg',sec),sheet=$('.hw3-sheet',sec),fix=$('.hw3-fix',sec);
 const P=s=>s.split(' ').map(p=>p.split(',').map(Number)),cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const pc=pts=>`polygon(${pts.map(p=>`${(p[0]/VW*100).toFixed(2)}% ${(p[1]/VH*100).toFixed(2)}%`).join(',')})`;
 const pathOf=polys=>polys.filter(p=>p.length>2).map(p=>'M'+p.map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join('L')+'Z').join('');
 function clipHalf(poly,f){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],fa=f(a),fb=f(b);
  if(fa>=0)out.push(a);if((fa>=0)!=(fb>=0)){const t=fa/(fa-fb);out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t])}}return out}
 const star=(r)=>`M0 -${r} C${r*.18} -${r*.18} ${r*.18} -${r*.18} ${r} 0 C${r*.18} ${r*.18} ${r*.18} ${r*.18} 0 ${r} C-${r*.18} ${r*.18} -${r*.18} ${r*.18} -${r} 0 C-${r*.18} -${r*.18} -${r*.18} -${r*.18} 0 -${r}z`;
 /* natural-wood depth layers (original IKEA edge) for the small 2.5D turn in the finale */
 for(let i=7;i>=1;i--){const im=document.createElement('img');im.src='assets/plain-edge.webp';im.alt='';im.className='dp';im.style.transform=`translateZ(${-i*8}px)`;turn.insertBefore(im,front)}
 const SH={x:150,y:1249,w:1012,h:400};
 const ROOMS=[R.TL,R.TR,R.BL,R.BR].map(r=>`<polygon points="${r}"/>`).join('');
 /* ---- step 1 layer: dust on the wood (under the stickers) ---- */
 const W1=[[330,300],[1080,360],[320,470],[1090,560],[330,630],[300,790],[1090,830],[300,930],[1090,985]];
 const W2=[[1160,880],[230,870]];
 const poly=pts=>{const L=[0];for(let i=1;i<pts.length;i++)L.push(L[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));
  const T=L[L.length-1];return{d:'M'+pts.map(p=>p.join(' ')).join('L'),at:t=>{const s=cl(t)*T;let i=1;while(i<L.length-1&&L[i]<s)i++;const k=(s-L[i-1])/(L[i]-L[i-1]||1),a=pts[i-1],b=pts[i];return[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,Math.atan2(b[1]-a[1],b[0]-a[0])]}}};
 const P1=poly(W1),P2=poly(W2);
 let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
 const DUST=[];for(let i=0;i<70;i++){const t=.02+i/70*.96,[x,y]=P1.at(t);DUST.push({t,x:x+(rnd()-.5)*120,y:y+(rnd()-.5)*90,r:4+rnd()*7,s:rnd()<.25})}
 const inRoom=(x,y)=>[R.TL,R.TR,R.BL,R.BR].some(r=>{const p=P(r),xs=p.map(q=>q[0]),ys=p.map(q=>q[1]);return x>Math.min(...xs)+12&&x<Math.max(...xs)-12&&y>Math.min(...ys)+60&&y<Math.max(...ys)-12});
 const dust=document.createElementNS(NS,'svg');dust.setAttribute('viewBox',`0 0 ${VW} ${VH}`);dust.classList.add('hw3-dust');
 dust.innerHTML=DUST.filter(d=>inRoom(d.x,d.y)).map(d=>d.s?`<ellipse cx="${d.x.toFixed(0)}" cy="${d.y.toFixed(0)}" rx="${(d.r*4).toFixed(0)}" ry="${(d.r*1.6).toFixed(0)}" fill="#7d6a55" opacity=".2" data-t="${d.t.toFixed(3)}"/>`:`<circle cx="${d.x.toFixed(0)}" cy="${d.y.toFixed(0)}" r="${d.r.toFixed(1)}" fill="#7d6a55" opacity=".55" data-t="${d.t.toFixed(3)}"/>`).join('');
 front.appendChild(dust);const dusts=[...dust.children].map(e=>({e,t:+e.dataset.t,o:+e.getAttribute('opacity')}));
 let W=600,u=.45;
 /* a die-cut vinyl sticker resting on the sheet: corner curl, lift, fly, land (offset for the "fix it" nudge), edge-to-middle smoothing */
 function sticker(reg,rooms,box,id){const[x0,y0,x1,y1]=reg,rw=x1-x0,rh=y1-y0;
  const C={cx:x1,cy:y0},uv=p=>[C.cx-p[0],p[1]-C.cy],xy=(a,b)=>[C.cx-a,C.cy+b],sOf=p=>{const q=uv(p);return q[0]+q[1]};
  const pts=rooms.flat(),smin=Math.min(...pts.map(sOf)),smax=Math.max(...pts.map(sOf)),WC=Math.min(118,(smax-smin)*.085);
  const RU=rooms.map(r=>r.map(uv)),RECT=[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
  const k=document.createElement('div');k.className='hw3-k';
  const g=(n,stops)=>`<linearGradient id="${n}${id}" gradientUnits="userSpaceOnUse">${stops.map(([o,c,a])=>`<stop offset="${o}" stop-color="${c}" stop-opacity="${a??1}"/>`).join('')}</linearGradient>`;
  const TH=Math.min(rh*.9,330);
  k.innerHTML=`<div class="hw3-ki"><div class="hw3-art">${SV()}</div><svg class="hw3-fx" viewBox="0 0 ${VW} ${VH}"><defs>
   ${g('gA',[[0,'#3a2a1a',.3],[.35,'#3a2a1a',.1],[1,'#3a2a1a',0]])}
   ${g('gB',[[0,'#a39b90'],[.08,'#d9d3c9'],[.38,'#ffffff'],[.62,'#fbfaf7'],[.86,'#e2dcd2'],[1,'#c9c1b5']])}
   ${g('gC',[[0,'#3a2a1a',.2],[1,'#3a2a1a',0]])}
   <clipPath id="hc${id}">${rooms.map(r=>`<polygon points="${r.join(' ')}"/>`).join('')}</clipPath>
   <linearGradient id="gS${id}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
   <filter id="gf${id}" x="-50%" y="-20%" width="200%" height="140%"><feDropShadow dx="6" dy="10" stdDeviation="9" flood-color="#3a2a1a" flood-opacity=".28"/></filter>
  </defs>
  <path class="fA" fill="url(#gA${id})"/><path class="fC" fill="url(#gC${id})"/><path class="fB" fill="url(#gB${id})" stroke="#bfb7ab" stroke-width="1.4" stroke-linejoin="round"/>
  <g clip-path="url(#hc${id})"><rect class="fS" x="0" y="${y0-20}" width="200" height="${rh+40}" fill="url(#gS${id})" opacity="0"/></g>
  <g class="fQ" opacity="0" filter="url(#gf${id})"><rect x="-26" y="${-TH/2}" width="52" height="${TH}" rx="20" fill="#d9745f"/><rect x="-24" y="${-TH/2+10}" width="10" height="${TH-20}" rx="5" fill="#f3b9aa"/><image href="assets/deco/flower-pink.svg" x="-20" y="-20" width="34" height="34" transform="rotate(90)"/></g>
  </svg></div>`;
  front.appendChild(k);
  const ki=$('.hw3-ki',k),art=$('.hw3-art',k),fA=$('.fA',k),fB=$('.fB',k),fC=$('.fC',k),fS=$('.fS',k),fQ=$('.fQ',k);
  const gr=n=>$(`#${n}${id}`,k),setG=(n,s1,s2)=>{const a=xy(s1/2,s1/2),b=xy(s2/2,s2/2),e=gr(n);e.setAttribute('x1',a[0]);e.setAttribute('y1',a[1]);e.setAttribute('x2',b[0]);e.setAttribute('y2',b[1])};
  ki.style.transformOrigin=`${(x0/VW*100).toFixed(2)}% ${(y1/VH*100).toFixed(2)}%`;
  const s=Math.min(box.w/rw,box.h/rh),cx=box.x+box.w/2,cy=box.y+box.h/2,px=cx-(x0+rw/2)*s,py=cy-(y0+rh/2)*s;
  const gh=document.createElementNS(NS,'svg');gh.setAttribute('viewBox',`0 0 ${VW} ${STH}`);gh.classList.add('hw3-ghost');
  gh.style.cssText=`left:${(-SH.x/SH.w*100).toFixed(3)}%;top:${(-SH.y/SH.h*100).toFixed(3)}%;width:${(VW/SH.w*100).toFixed(3)}%;height:${(STH/SH.h*100).toFixed(3)}%`;
  gh.innerHTML=`<g transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) scale(${s.toFixed(4)})">${rooms.map(r=>`<polygon points="${r.join(' ')}" fill="#f6f3ee" stroke="#cfc6b8" stroke-width="2.2" stroke-dasharray="9 7" vector-effect="non-scaling-stroke"/>`).join('')}</g>`;
  sheet.appendChild(gh);
  const o={c:0,lift:0,f:0,sw:0,on:0,op:1,dx:0,dy:0,rot:0};
  o.draw=function(){k.style.visibility=o.on>0&&o.op>0?'visible':'hidden';if(!o.on)return;k.style.opacity=o.op<1?o.op.toFixed(3):'';
   const f=o.f,arc=Math.sin(Math.PI*f),L=o.lift;
   const sc=s+(1-s)*f+L*.04,x=px*(1-f)+o.dx*f,y=py*(1-f)+o.dy*f-arc*VH*.16-L*VH*.03;
   k.style.transform=`translate(${(x/VW*100).toFixed(3)}%,${(y/VH*100).toFixed(3)}%) scale(${sc.toFixed(4)}) rotate(${(-arc*3+o.rot*f).toFixed(2)}deg)`;
   const q=W/600;k.style.filter=L>.01?`drop-shadow(${(L*4*q).toFixed(1)}px ${((2+L*16)*q).toFixed(1)}px ${((2+L*12)*q).toFixed(1)}px rgba(58,40,22,${(.1+L*.2).toFixed(3)}))`:'none';
   ki.style.transform=L>.001?`perspective(${(1500*q).toFixed(0)}px) rotateX(${(-L*9).toFixed(2)}deg) rotateY(${(-L*12).toFixed(2)}deg)`:'';
   /* smoothing card: first pass from the right edge to the middle, second pass from the left edge to the middle */
   const sw=o.sw,mid=(x0+x1)/2;
   if(sw>0&&sw<1){const a=sw<.5,t=a?sw/.5:(sw-.5)/.5,e=t*t*(3-2*t),tx=a?x1+50+(mid-x1-50)*e:x0-50+(mid-x0+50)*e;
    fQ.setAttribute('transform',`translate(${tx.toFixed(1)} ${(y0+rh/2).toFixed(1)}) rotate(${a?7:-7})${a?'':' scale(-1 1)'}`);
    const op=cl(t*6)*cl((1-t)*5);fQ.setAttribute('opacity',op.toFixed(3));fS.setAttribute('x',(a?tx:tx-200).toFixed(1));fS.setAttribute('opacity',(op*.9).toFixed(3))}
   else{fQ.setAttribute('opacity',0);fS.setAttribute('opacity',0)}
   const c=o.c>0?smin+o.c*(smax-smin):0;
   if(c<=smin+.5){art.style.clipPath=pc(RECT);fA.setAttribute('d','');fB.setAttribute('d','');fC.setAttribute('d','');return}
   const w=Math.min(WC,(c-smin)*.55+6);
   const keep=clipHalf(RECT.map(uv),p=>p[0]+p[1]-c).map(p=>xy(p[0],p[1]));art.style.clipPath=keep.length>2?pc(keep):'polygon(0 0,0 0,0 0)';
   const band=(a,b)=>RU.map(r=>clipHalf(clipHalf(r,p=>p[0]+p[1]-a),p=>b-(p[0]+p[1])).map(p=>xy(p[0],p[1])));
   fA.setAttribute('d',pathOf(band(c,c+w*.9)));setG('gA',c,c+w*.9);
   fB.setAttribute('d',pathOf(band(c-w,c)));setG('gB',c,c-w);
   fC.setAttribute('d',pathOf(band(c-w*1.8,c-w)));setG('gC',c-w,c-w*1.8)};
  o.k=k;return o}
 const bot=sticker([244,711,1137,1028],[P(R.BL),P(R.BR)],{x:640,y:1322,w:470,h:250},'b');
 const top=sticker([224,72,1166,709],[P(R.TL),P(R.TR),P('230,640 1160,640 1160,700 230,700'),P('440,560 870,560 870,634 440,634')],{x:205,y:1300,w:400,h:300},'t');
 /* ---- top layer: shine trail + cloth (above the stickers so the finale wipe passes over the vinyl) ---- */
 const wl=document.createElementNS(NS,'svg');wl.setAttribute('viewBox',`0 0 ${VW} ${VH}`);wl.classList.add('hw3-wipe');
 wl.innerHTML=`<defs><clipPath id="hwrooms">${ROOMS}</clipPath><filter id="hwblur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="16"/></filter></defs>
  <g clip-path="url(#hwrooms)"><g filter="url(#hwblur)"><path class="tr1" d="${P1.d}" pathLength="1" fill="none" stroke="#fff" stroke-opacity=".42" stroke-width="175" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 1" stroke-dashoffset="1"/>
  <path class="tr1b" d="${P1.d}" pathLength="1" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 1" stroke-dashoffset="1" transform="translate(0 -40)"/></g>
  <path class="tr2" d="M${W2.map(p=>p.join(' ')).join('L')}" pathLength="1" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="190" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1" filter="url(#hwblur)"/></g>
  <g class="gl">${[[430,420,34],[950,300,28],[700,880,32],[1010,960,24],[380,950,22]].map(([x,y,r])=>`<path data-x="${x}" data-y="${y}" transform="translate(${x} ${y}) scale(0)" d="${star(r)}" fill="#fff" stroke="#e8c75a" stroke-width="3"/>`).join('')}</g>
  <g class="cloth" opacity="0"><g class="cl-in" style="filter:drop-shadow(4px 12px 10px rgba(58,40,22,.25))">
   <path d="M-118 -66 Q-30 -92 104 -74 Q122 -6 108 64 Q8 92 -112 72 Q-130 2 -118 -66Z" fill="#bdd1c8" stroke="#7fa596" stroke-width="5" stroke-linejoin="round"/>
   <path d="M-96 -48 Q-24 -68 88 -54 Q100 -4 90 46 Q6 68 -92 52 Q-106 0 -96 -48Z" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="12 10" stroke-linecap="round" opacity=".85"/>
   <path d="M-70 -40 L40 50 M-20 -50 L80 30 M-90 0 L-10 60" stroke="#a9c3b7" stroke-width="5" stroke-linecap="round"/>
   <path d="M104 -74 Q60 -20 108 64 Q130 0 104 -74Z" fill="#a9c3b7" stroke="#7fa596" stroke-width="4" stroke-linejoin="round"/>
   <path d="M-40 -110 q14 18 0 28 q-14 -10 0 -28z" fill="#c7bcce" stroke="#9f8fae" stroke-width="3"/><path d="M-6 -126 q10 13 0 20 q-10 -7 0 -20z" fill="#c7bcce" stroke="#9f8fae" stroke-width="3"/>
  </g></g>`;
 front.appendChild(wl);
 const tr1=$('.tr1',wl),tr1b=$('.tr1b',wl),tr2=$('.tr2',wl),cloth=$('.cloth',wl),clin=$('.cl-in',wl),gls=$$('.gl path',wl);
 /* living details of the market world (finale) */
 const tsvg=$('.hw3-art svg',top.k),sign=tsvg.querySelector('text')?.parentNode,bulbs=$$('.blink',tsvg),wag=$('.wag',tsvg),cart=$('.roll',bot.k);
 [sign,wag,cart].forEach(e=>{if(e){e.style.transformBox='fill-box';e.style.transformOrigin='50% 0%'}});
 const spk=document.createElementNS(NS,'svg');spk.setAttribute('viewBox',`0 0 ${VW} ${VH}`);spk.classList.add('hw3-spk');
 const SPK=[[300,230,26],[1010,300,22],[1180,760,18]];
 spk.innerHTML=SPK.map(([x,y,r])=>`<path transform="translate(${x} ${y}) scale(0)" d="${star(r)}" fill="#fff7d6" stroke="#e8c75a" stroke-width="3"/>`).join('');
 front.appendChild(spk);const spks=[...spk.children];
 /* camera framing that never crops the house */
 const CY=STH/2;
 const frame=(y0,y1,max)=>()=>{const r=stage.getBoundingClientRect(),Vh=r.height/u,Vw=r.width/u;return{cs:Math.min(max,Vh/((y1-y0)*1.06),Vw/1400),cy:(y0+y1)/2}};
 const F1=frame(-40,1250,1.25),F2=frame(-30,1665,1.2),F3=frame(-40,1240,1.3);
 const S={cs:1,cy:CY,turn:0,tx:0,alive:0,w1:0,w2:0,cl:0,dry:0,tr2:0,fx:0};
 function size(){const r=stage.getBoundingClientRect(),mob=innerWidth<=820;W=Math.min(r.width*(mob?.9:.86),r.height*(mob?.98:.94)*VW/STH,720);u=W/VW;cam.style.setProperty('--W',W.toFixed(1)+'px');
  if(!tl||tl.progress()==0){const f=F1();S.cs=f.cs;S.cy=f.cy}render()}
 function render(){
  cam.style.transform=`translate(0px,${((CY-S.cy)*u*S.cs).toFixed(2)}px) scale(${S.cs.toFixed(4)})`;
  turn.style.transform=S.turn||S.tx?`rotateY(${S.turn.toFixed(2)}deg) rotateX(${S.tx.toFixed(2)}deg)`:'';
  /* wipe: dust lifts as the cloth passes, a damp shine follows and dries */
  dusts.forEach(d=>d.e.setAttribute('opacity',(d.o*(1-cl((S.w1-d.t+.01)/.05))).toFixed(3)));
  const dry=1-S.dry;tr1.setAttribute('stroke-dashoffset',(1-S.w1).toFixed(4));tr1b.setAttribute('stroke-dashoffset',(1-S.w1).toFixed(4));
  tr1.style.opacity=tr1b.style.opacity=S.w1>0?dry.toFixed(3):0;
  tr2.setAttribute('stroke-dashoffset',(1-S.w2).toFixed(4));tr2.style.opacity=S.w2>0?(1-S.tr2).toFixed(3):0;
  gls.forEach((e,i)=>{const t=cl(S.dry*1.5-i*.1),sc=t<=0||t>=1?0:Math.sin(t*Math.PI)*.9;e.setAttribute('transform',`translate(${e.dataset.x} ${e.dataset.y}) rotate(${(t*90).toFixed(0)}) scale(${sc.toFixed(3)})`)});
  const usew2=S.w2>0,pp=(usew2?P2:P1).at(usew2?S.w2:S.w1),wob=Math.sin((usew2?S.w2:S.w1)*44)*7;
  cloth.setAttribute('opacity',S.cl.toFixed(3));cloth.style.visibility=S.cl>.01?'visible':'hidden';
  cloth.setAttribute('transform',`translate(${pp[0].toFixed(1)} ${pp[1].toFixed(1)}) rotate(${(wob+(Math.cos(pp[2])<0?-8:8)).toFixed(1)}) scale(${(.85+S.cl*.15).toFixed(3)})`);
  fix.style.opacity=S.fx.toFixed(3);fix.style.transform=`translate(-50%,${((1-S.fx)*8).toFixed(1)}px)`;
  const A=S.alive,w=A*Math.PI*2;
  if(sign)sign.style.transform=A?`rotate(${(Math.sin(w*3)*3.5*(1-A*.5)).toFixed(2)}deg)`:'';
  bulbs.forEach((e,i)=>e.style.opacity=A?(Math.sin(w*6+i*1.3)>0?1:.3):1);
  if(wag)wag.style.transform=A?`scaleY(${(1+Math.sin(w*4)*.07).toFixed(3)})`:'';
  if(cart)cart.style.transform=A?`translateX(${(-Math.sin(w*1.5)*55).toFixed(1)}px)`:'';
  spks.forEach((e,i)=>{const t=cl(A*1.4-.15-i*.12),sc=t<=0||t>=1?0:Math.sin(t*Math.PI)*.9;e.setAttribute('transform',`translate(${SPK[i][0]} ${SPK[i][1]}) rotate(${(t*120).toFixed(0)}) scale(${sc.toFixed(3)})`)});
  bot.draw();top.draw()}
 /* text helpers */
 const steps=$$('.hw3-step',sec),prog=$$('.hw3-prog b',sec),hint=$('.hw3-hint',sec),lines=i=>$$('.ln>*',steps[i]);
 var tl=G.timeline({paused:true,defaults:{ease:'none',immediateRender:false},onUpdate:render});
 const textIn=(i,at,T=tl)=>{const st=steps[i];T.fromTo(lines(i),{yPercent:110},{yPercent:0,duration:.45,stagger:.07,ease:'power3.out'},at)
  .fromTo($('.hw3-n',st),{yPercent:30,opacity:0},{yPercent:0,opacity:1,duration:.35,ease:'power3.out'},at)
  .fromTo($('.hw3-n .bgc',st),{scale:0,transformOrigin:'50% 50%'},{scale:1,duration:.45,ease:'back.out(1.8)'},at)
  .fromTo($('.hw3-n .o',st),{strokeDashoffset:900},{strokeDashoffset:0,duration:.5,ease:'power2.inOut'},at+.05)
  .fromTo($('.hw3-n .fr',st),{attr:{y:190}},{attr:{y:0},duration:.5,ease:'power2.inOut'},at+.3)
  .fromTo($('.hw3-il',st),{scale:0,rotate:-14,opacity:0},{scale:1,rotate:0,opacity:1,duration:.45,ease:'back.out(2)'},at+.15)};
 const textOut=(i,at)=>{const st=steps[i];tl.fromTo(lines(i),{yPercent:0},{yPercent:-110,duration:.3,stagger:.04,ease:'power2.in'},at)
  .fromTo([$('.hw3-n',st),$('.hw3-il',st)],{yPercent:0,opacity:1},{yPercent:-30,opacity:0,duration:.3,ease:'power2.in'},at)};
 G.set(steps.map(s=>[$('.hw3-n',s),$('.hw3-il',s)]).flat(),{opacity:0});G.set($$('.ln>*',sec),{y:0,yPercent:110});G.set(sheet,{y:0,yPercent:160,opacity:0});
 const camFT=(A,B,at,d)=>tl.fromTo(S,{cs:()=>A().cs,cy:()=>A().cy},{cs:()=>B().cs,cy:()=>B().cy,duration:d,ease:'power2.inOut'},at);
 /* ---- 1 · wipe: damp cloth zig-zags over the wood, dust disappears, shine dries ---- */
 const intro=G.timeline({paused:true,defaults:{ease:'none',immediateRender:false}});textIn(0,0,intro);
 tl.fromTo(prog[0],{scaleX:0},{scaleX:1,duration:3.0},0);camFT(F1,F1,0,.01);
 tl.fromTo(S,{cl:0},{cl:1,duration:.25,ease:'power2.out'},.1)
  .fromTo(S,{w1:0},{w1:1,duration:1.95,ease:'sine.inOut'},.3)
  .fromTo(S,{cl:1},{cl:0,duration:.25,ease:'power2.in'},2.2)
  .fromTo(S,{dry:0},{dry:1,duration:.7,ease:'sine.in'},2.3);
 /* ---- 2 · peel just a corner ---- */
 textOut(0,3.0);textIn(1,3.2);tl.fromTo(prog[1],{scaleX:0},{scaleX:1,duration:2.2},3.0);camFT(F1,F2,3.0,.6);
 tl.set(bot,{on:1},3.0).set(top,{on:1},3.0)
  .fromTo(sheet,{yPercent:160,opacity:0},{yPercent:0,opacity:1,duration:.55,ease:'power3.out'},3.15)
  .fromTo([bot,top],{op:0},{op:1,duration:.4},3.25)
  .fromTo(bg,{backgroundColor:'#f3f2ef'},{backgroundColor:'#efe5e2',duration:.8},3.0)
  .fromTo(bot,{c:0},{c:.17,duration:.85,ease:'sine.inOut'},3.85)
  .fromTo(bot,{c:.17},{c:.2,duration:.35,ease:'sine.inOut'},4.75).to(bot,{c:.17,duration:.3,ease:'sine.inOut'},5.1);
 /* ---- 3 · stick & smooth from the edge to the middle; lift and fix ---- */
 textOut(1,5.4);textIn(2,5.6);tl.fromTo(prog[2],{scaleX:0},{scaleX:1,duration:4.2},5.4);
 tl.fromTo(bg,{backgroundColor:'#efe5e2'},{backgroundColor:'#ebe6ef',duration:.8},5.4)
  .fromTo(bot,{dx:-26,dy:-34,rot:-2.6},{dx:-26,dy:-34,rot:-2.6,duration:.01},5.4)
  .fromTo(bot,{lift:0},{lift:1,duration:.35,ease:'power2.out'},5.55)
  .fromTo(bot,{f:0},{f:1,duration:.75,ease:'power2.inOut'},5.8)
  .fromTo(bot,{c:.17},{c:.1,duration:.75,ease:'sine.inOut'},5.8)
  .fromTo(bot,{lift:1},{lift:0,duration:.25,ease:'power2.in'},6.35)             /* lands a little crooked */
  .fromTo(S,{fx:0},{fx:1,duration:.25,ease:'power2.out'},6.6)
  .fromTo(bot,{lift:0},{lift:.55,duration:.25,ease:'power2.out'},6.75)          /* lift ... */
  .fromTo(bot,{dx:-26,dy:-34,rot:-2.6},{dx:0,dy:0,rot:0,duration:.4,ease:'power2.inOut'},6.9) /* ... and fix */
  .fromTo(bot,{lift:.55},{lift:0,duration:.22,ease:'power2.in'},7.2)
  .fromTo(S,{fx:1},{fx:0,duration:.25,ease:'power2.in'},7.5)
  .fromTo(bot,{c:.1},{c:0,duration:.3,ease:'sine.inOut'},7.45)
  .fromTo(bot,{sw:0},{sw:1,duration:1.0,ease:'none'},7.45)
  .fromTo(top,{c:0},{c:.15,duration:.45,ease:'sine.inOut'},7.2)
  .fromTo(top,{lift:0},{lift:1,duration:.3,ease:'power2.out'},7.75)
  .fromTo(top,{f:0},{f:1,duration:.7,ease:'power2.inOut'},8.0)
  .fromTo(top,{c:.15},{c:.09,duration:.7,ease:'sine.inOut'},8.0)
  .fromTo(top,{lift:1},{lift:0,duration:.25,ease:'power2.in'},8.5)
  .fromTo(top,{c:.09},{c:0,duration:.3,ease:'sine.inOut'},8.75)
  .fromTo(top,{sw:0},{sw:1,duration:.95,ease:'none'},8.75)
  .to(sheet,{yPercent:170,opacity:0,duration:.5,ease:'power2.in'},8.25);
 camFT(F2,F3,8.5,.9);
 /* ---- 4 · enjoy: living details, a quick wipe shows it is washable ---- */
 textOut(2,9.6);textIn(3,9.8);tl.fromTo(prog[3],{scaleX:0},{scaleX:1,duration:3.4},9.6);
 tl.fromTo(bg,{backgroundColor:'#ebe6ef'},{backgroundColor:'#f5efe0',duration:1.0},9.6)
  .fromTo(S,{turn:0,tx:0},{turn:-14,tx:2,duration:.9,ease:'sine.inOut'},9.8).to(S,{turn:9,tx:-1.5,duration:.9,ease:'sine.inOut'},10.7).to(S,{turn:0,tx:0,duration:.6,ease:'sine.inOut'},11.6)
  .fromTo(S,{alive:0},{alive:1,duration:3.1},9.8)
  .fromTo(S,{cl:0},{cl:1,duration:.2,ease:'power2.out'},11.3)
  .fromTo(S,{w2:0},{w2:1,duration:.85,ease:'sine.inOut'},11.4)
  .fromTo(S,{cl:1},{cl:0,duration:.2,ease:'power2.in'},12.2)
  .fromTo(S,{tr2:0},{tr2:1,duration:.5},12.3);
 tl.to({},{duration:.3},12.9);
 size();addEventListener('resize',size);
 window.HW3={tl,S,render,bot,top};
 if(RMx){sec.classList.add('rm');intro.progress(1);tl.progress(1);S.alive=0;G.set(steps.map(s=>[$('.hw3-n',s),$('.hw3-il',s)]).flat(),{opacity:1,yPercent:0});G.set($$('.ln>*',sec),{yPercent:0});size();render();return}
 if(!window.ScrollTrigger)return;G.registerPlugin(ScrollTrigger);
 const navH=()=>$('.nav').offsetHeight;
 window.HW3.trig=ScrollTrigger.create({trigger:sec,start:()=>'top '+navH(),end:()=>'+='+Math.round(innerHeight*(innerWidth<=820?3.3:3.5)),pin:$('.hw3-pin',sec),scrub:REC?true:.6,animation:tl,invalidateOnRefresh:true,onRefresh:size});
 ScrollTrigger.create({trigger:sec,start:'top 75%',end:()=>'top '+(navH()+2),scrub:REC?true:.5,animation:intro,invalidateOnRefresh:true});
 hint.style.opacity=1;tl.eventCallback('onUpdate',()=>{render();hint.style.opacity=tl.progress()>.02?0:1})};
})();
