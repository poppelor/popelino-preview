/* Hero 4 · one big furniture piece, plain IKEA siblings orbiting it, world circles that match it */
(function(){
const G=gsap,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,REC=/[?&]rec=1/.test(location.search);
if(REC)G.ticker.remove(G.updateRoot);           // recorder drives time frame by frame
const P=window.POP,ALL=P.ALL;
const mix=(h,t)=>{const a=parseInt(h.slice(1),16),c=s=>Math.round(((a>>s)&255)*(1-t)+255*t);return `rgb(${c(16)},${c(8)},${c(0)})`};
/* fit = design cut-out placement relative to the plain base box: w = width fraction, x/y = shift (fractions of box) */
const F={
 dollhouse:{name:'בית בובות',ikea:'FLISAT',base:'assets/plain.webp',ar:1312/1199,disc:'#e1cdc8',lbl:'בחרו עולם לבית הבובות',
  items:[['market','סופר'],['ice','גלידה'],['pizza','פיצריה'],['forest','יער'],['home','בית']].map(([k,n])=>({id:'dh-'+k,w:k,n,color:WORLDS[k].color}))},
 shelf:{name:'כוננית',ikea:'TROFAST',base:'assets/ikea/trofast.png',ar:1059/737,disc:'#bdd1c8',lbl:'בחרו עיצוב לכוננית',
  items:[['sage','מרווה'],['pink','ורוד'],['floral','פרחוני'],['gingham','משבצות'],['mix','צבעוני']].map(([k,n])=>({id:'sh-'+k,img:'assets/cut/trofast-'+k+'.png',n}))},
 table:{name:'שולחן',ikea:'FLISAT',base:'assets/ikea/flisat-table.png',ar:1056/752,disc:'#f1e0b5',lbl:'בחרו עיצוב לשולחן',
  items:[['road','כבישים'],['check','משבצות']].map(([k,n])=>({id:'tb-'+k,img:'assets/cut/table-'+k+'.png',n}))},
 kitchen:{name:'מטבח',ikea:'DUKTIG',base:'assets/ikea/duktig.png',ar:737/1058,disc:'#c7bcce',lbl:'בחרו עולם למטבח',
  items:[['pizzeria','פיצריה','pizzeria'],['ice','גלידה','icecream'],['market','סופר','hero-market']].map(([k,n,f])=>({id:'kt-'+k,img:'assets/cut/'+f+'.png',n}))}
};
const FIT={'sh-sage':{w:.97,y:.02},'sh-pink':{w:.97,y:.02},'sh-blue':{w:.97,y:.02},'sh-floral':{w:.96,y:.02},'sh-gingham':{w:.9,y:.02},'sh-mix':{w:.93,y:.02},
 'tb-road':{w:.86,y:.0},'tb-check':{w:.84,y:.0},'kt-pizzeria':{w:1.0,y:0},'kt-ice':{w:.88,y:0},'kt-market':{w:1.2,x:-.08,y:0}};
const COL={shelf:['#bdd1c8','#e1cdc8','#f1e0b5','#c7bcce','#f3d6d8'],table:['#f1e0b5','#bdd1c8'],kitchen:['#f1e0b5','#f3d6d8','#bdd1c8']};
Object.entries(COL).forEach(([c,a])=>F[c].items.forEach((it,i)=>it.color=a[i]));
const ORDER=['dollhouse','shelf','table','kitchen'],ANG={dollhouse:-32,shelf:-148,table:148,kitchen:32};
/* preload */
const srcs=new Set(['assets/home.webp',...Object.values(F).flatMap(f=>[f.base,...f.items.map(i=>i.img).filter(Boolean)])]);
const ready=Promise.all([...srcs].map(s=>new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=s})));
const stage=$('#stage'),piece=$('#piece'),disc=$('#disc'),furn=$('#furn'),worlds=$('#worlds');
let cur=null,des=null,pc=null,busy=false,touched=false;
/* ---- furniture circles around the stage ---- */
furn.innerHTML=ORDER.map(k=>{const a=ANG[k]*Math.PI/180,r=43.2;return `<button class="fc" data-f="${k}" role="radio" aria-label="${F[k].name} ${F[k].ikea}" style="left:${50+r*Math.cos(a)}%;top:${50+r*Math.sin(a)}%"><span class="fc-i"><img src="${F[k].base}" alt=""></span><span class="fc-l">${F[k].name}</span></button>`}).join('');
const fcs=$$('.fc',furn);
if(!RM)fcs.forEach((b,i)=>G.to($('.fc-i',b),{y:-6,duration:1.6+i*.23,ease:'sine.inOut',yoyo:true,repeat:-1,delay:i*.3}));
/* ---- sizing ---- */
function fit(el,ar){const W=piece.clientWidth,H=piece.clientHeight;let w=W,h=W/ar;if(h>H){h=H;w=H*ar}
 el.style.width=w+'px';el.style.height=h+'px';el.style.marginLeft=-w/2+'px';el.dataset.ar=ar}
function placeDesign(img,d,box){const f=FIT[d.id]||{w:1},bw=box.offsetWidth,bh=box.offsetHeight,iw=img.naturalWidth||1,ih=img.naturalHeight||1;
 const w=bw*f.w,h=w*ih/iw;img.style.width=w+'px';img.style.height=h+'px';img.style.left=(bw-w)/2+(f.x||0)*bw+'px';img.style.top=bh-h+(f.y||0)*bh+'px'}
addEventListener('resize',()=>{const p=$('.h4p',piece);if(!p)return;fit(p,+p.dataset.ar);$$('.ds',p).forEach(i=>placeDesign(i,ALL[i.dataset.id]||{id:i.dataset.id},p))});
/* ---- piece ---- */
function build(k){const f=F[k],el=document.createElement('div');el.className='h4p';el.dataset.f=k;
 el.innerHTML=`<img class="bs" src="${f.base}" alt="${f.name} ${f.ikea} של איקאה">${k=='dollhouse'?'<div class="ov"></div>':''}`;
 const gs=document.createElement('div');gs.className='gs';el.appendChild(gs);piece.appendChild(el);fit(el,f.ar);return el}
/* ---- confetti from logo shapes (GSAP driven so it records deterministically) ---- */
const SH=['assets/deco/flower-pink.svg','assets/deco/flower-sage.svg','assets/deco/drop-lilac.svg','assets/deco/dot-pink.svg','assets/deco/dot-sage.svg'];
let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
function burst(n){if(RM)return;const r=pc.getBoundingClientRect(),m=innerWidth<860;
 for(let i=0;i<n;i++){const im=document.createElement('img');im.src=SH[i%SH.length];im.className='h4-fx';im.alt='';const s=(m?16:24)*(.6+rnd()*.8);
  im.style.width=im.style.height=s+'px';document.body.appendChild(im);
  const x0=r.left+r.width*(.25+rnd()*.5),y0=r.top+r.height*(.35+rnd()*.3),a=-Math.PI/2+(rnd()-.5)*2.4,v=(m?90:150)*(.6+rnd()*.7);
  G.set(im,{x:x0-s/2,y:y0-s/2,scale:0,rotation:rnd()*360});
  G.timeline({onComplete:()=>im.remove()}).to(im,{scale:1,duration:.25,ease:'back.out(3)'},0)
   .to(im,{x:x0-s/2+Math.cos(a)*v,duration:1.1,ease:'power2.out'},0).to(im,{y:y0-s/2+Math.sin(a)*v,duration:.5,ease:'power2.out'},0)
   .to(im,{y:'+='+(v*.9),duration:.6,ease:'power2.in'},.5).to(im,{rotation:'+='+(rnd()*240-120),duration:1.1},0).to(im,{opacity:0,duration:.3},.8)}}
/* ---- world circles ---- */
function wcHTML(k,it){const f=F[k],plain=!it;
 const inner=plain?`<img src="${f.base}" alt="">`:(it.w?P.houseSVG(it.w):`<img src="${it.img}" alt="">`);
 return `<button class="wc${plain?' wc-p':''}" role="radio" data-id="${plain?'':it.id}"><span class="wc-i" style="background:${plain?'#fff':mix(it.color,.35)}">${inner}</span><span class="wc-k">✓</span>${plain?'רגיל':it.n}</button>`}
function renderWorlds(k,animate){const f=F[k];
 const go=()=>{worlds.innerHTML=f.items.map(it=>wcHTML(k,it)).join('')+wcHTML(k,null);
  $$('.wc',worlds).forEach(b=>{b.onclick=()=>{touched=true;setWorld(b.dataset.id||null)};const kk=$('.wc-k',b);});
  mark();$('#wlt').textContent=f.lbl;
  if(animate&&!RM)G.fromTo($$('.wc',worlds),{scale:.4,opacity:0,y:14},{scale:1,opacity:1,y:0,duration:.5,stagger:.05,ease:'back.out(2.2)',clearProps:'transform'});
  if(animate&&!RM)G.fromTo('#wlt',{opacity:0,y:6},{opacity:1,y:0,duration:.35})};
 const old=$$('.wc',worlds);
 if(animate&&old.length&&!RM)G.to(old,{scale:.5,opacity:0,y:-8,duration:.2,stagger:.025,ease:'power2.in',onComplete:go});else go()}
function mark(){$$('.wc',worlds).forEach(b=>{const on=(b.dataset.id||null)==(des?des.id:null);b.classList.toggle('on',on);b.setAttribute('aria-checked',on)})}
function caption(){const f=F[cur],d=des&&ALL[des.id];$('#capn').textContent=f.name+' '+f.ikea;
 $('#capw').textContent=des?(des.n+(d?` · ₪${d.price}`:'')):'כמו שהגיע מאיקאה';
 $('#cta').href='category.html?c='+cur}
function discTo(c){G.to(disc,{backgroundColor:c,duration:RM?0:.5,ease:'power2.out'})}
/* ---- dress the piece ---- */
function setWorld(id){const f=F[cur],it=id?f.items.find(i=>i.id==id):null;if((des&&des.id)==(it&&it.id))return;des=it;mark();caption();
 discTo(it?mix(it.color,.0):f.disc);
 if(cur=='dollhouse'){const ov=$('.ov',pc);ov.innerHTML='';if(it){const L=skinEl(it.w);ov.appendChild(L.firstChild?L:L);const sv=$('svg',ov);sv&&sv.setAttribute('preserveAspectRatio','xMidYMid meet')}
  if(!RM)G.fromTo(pc,{scaleX:1.035,scaleY:.965},{scaleX:1,scaleY:1,duration:.55,ease:'elastic.out(1.1,.45)'});if(it)burst(14);return}
 /* shelf / table / kitchen: quick clean crossfade to the full designed product cut-out */
 const bs=$('.bs',pc),olds=$$('.ds',pc);let nw=null;
 if(it){nw=new Image();nw.className='ds';nw.alt=f.name+' · '+it.n;nw.dataset.id=it.id;nw.src=it.img;pc.insertBefore(nw,$('.gs',pc));placeDesign(nw,it,pc)}
 const D=RM?0:.28;
 G.to(olds,{opacity:0,duration:D,ease:'power1.out',onComplete:()=>olds.forEach(o=>o.remove())});
 G.to(bs,{opacity:it?0:1,duration:D,ease:'power1.out'});
 if(nw)G.fromTo(nw,{opacity:0,scale:.985},{opacity:1,scale:1,duration:D,ease:'power1.out'});
 if(!RM)G.fromTo(pc,{y:0},{y:-6,duration:.14,yoyo:true,repeat:1,ease:'power1.out'});if(it)burst(10)}
/* ---- switch furniture: old one shrinks back toward its circle, new one grows out of the clicked circle ---- */
function setFurn(k,instant){if(k==cur||busy)return;const from=$(`.fc[data-f="${k}"]`,furn),prev=cur,oldPc=pc;cur=k;des=null;
 fcs.forEach(b=>{const on=b.dataset.f==k;b.classList.toggle('on',on);b.setAttribute('aria-checked',on)});
 pc=build(k);caption();renderWorlds(k,!instant);discTo(F[k].disc);
 if(instant||RM){oldPc&&oldPc.remove();return}
 busy=true;
 if(oldPc){const to=$(`.fc[data-f="${prev}"] .fc-i`,furn).getBoundingClientRect(),r=oldPc.getBoundingClientRect();
  G.to(oldPc,{x:to.left+to.width/2-(r.left+r.width/2),y:to.top+to.height/2-(r.top+r.height/2),scale:to.width*.7/Math.max(r.width,r.height),opacity:0,duration:.5,ease:'power3.in',transformOrigin:'50% 50%',onComplete:()=>oldPc.remove()});
  G.fromTo($(`.fc[data-f="${prev}"] .fc-i img`,furn),{scale:.6},{scale:1,duration:.5,delay:.42,ease:'back.out(3)'})}
 const fi=$('.fc-i',from).getBoundingClientRect(),r=pc.getBoundingClientRect();
 G.timeline({onComplete:()=>busy=false})
  .fromTo($('.fc-i img',from),{scale:1},{scale:.7,duration:.2,ease:'power2.in'},0).to($('.fc-i img',from),{scale:1,duration:.45,ease:'back.out(3)'},.5)
  .fromTo(pc,{x:fi.left+fi.width/2-(r.left+r.width/2),y:fi.top+fi.height/2-(r.top+r.height/2),scale:fi.width*.72/Math.max(r.width,r.height),opacity:0,transformOrigin:'50% 50%'},
   {x:0,y:0,scale:1,opacity:1,duration:.75,ease:'power3.inOut'},.12)
  .to(pc,{opacity:1,duration:.15},.12)
  .fromTo(pc,{scaleX:1,scaleY:1},{scaleX:1.04,scaleY:.95,duration:.1,ease:'power1.out',transformOrigin:'50% 100%'},.86)
  .to(pc,{scaleX:1,scaleY:1,duration:.5,ease:'elastic.out(1.2,.4)'},.96)}
fcs.forEach(b=>b.onclick=()=>{touched=true;setFurn(b.dataset.f)});
setFurn('dollhouse',true);
/* intro: circles pop in; then, unless the visitor already played, the plain dollhouse dresses itself once */
if(!RM){G.from(fcs,{scale:0,opacity:0,duration:.6,stagger:.09,delay:.25,ease:'back.out(2)'});G.from('.h4-copy>*',{y:18,opacity:0,duration:.6,stagger:.07,ease:'power3.out'});G.from(pc,{y:24,opacity:0,duration:.7,ease:'power3.out',delay:.1})}
if(!REC)ready.then(()=>G.delayedCall(2.2,()=>{if(!touched&&cur=='dollhouse'&&!des)setWorld('dh-market')}));
window.H4={ready,setFurn:k=>{touched=true;setFurn(k)},setWorld:id=>{touched=true;setWorld(id)},click:sel=>$(sel).click(),get state(){return{cur,des:des&&des.id}}};
})();
