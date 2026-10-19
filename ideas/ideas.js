const I=f=>'ideas/'+f+'.webp';
const FURN={
dh:{name:'בית בובות',ikea:'dh-front',d:[['dh-clean','נקי, כמו בחנות','#efe6da'],['dh-home','בית מתוק','#e1cdc8'],['dh-market','סופרמרקט','#bdd1c8'],['dh-ice','גלידריה','#f3d6d8'],['dh-pizza','פיצריה','#f1e0b5'],['dh-forest','בקתה ביער','#c7bcce']]},
tr:{name:'TROFAST',ikea:'ikea-trofast',d:[['c-trofast-pink','ורוד','#e8c4c0'],['c-trofast-sage','מרווה','#bdd1c8'],['c-trofast-gingham','משבצות','#e1cdc8'],['c-trofast-floral','פרחוני','#f1e0b5'],['c-trofast-yellow','צהוב','#f1d98a']]},
tb:{name:'שולחן FLISAT',ikea:'ikea-flisat-table',d:[['c-table-plain','נקי','#efe6da'],['c-table-check','משבצות','#e1cdc8'],['c-table-leo','נמר','#e6cfa8'],['c-table-road','כביש','#c9ccc9']]},
kt:{name:'מטבח DUKTIG',ikea:'ikea-duktig',d:[['c-hero-market','מרקט','#bdd1c8'],['c-icecream','גלידה','#f3d6d8'],['c-pizzeria','פיצריה','#f1e0b5']]}};
// 6 fade-ups
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));
// 8 words
document.querySelectorAll('[data-words]').forEach(h=>{h.innerHTML=h.textContent.trim().split(/\s+/).map((w,i)=>`<span class="w" style="transition-delay:${i*110}ms">${w}</span>`).join(' ');setTimeout(()=>h.classList.add('on'),200)});
// 1 pinned
const st=document.querySelectorAll('.pstep'),pinStage=document.querySelector('#d1 .stage');
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){st.forEach(s=>s.classList.toggle('act',s===e.target));pinStage.classList.toggle('done',e.target.dataset.s==='3')}}),{rootMargin:'-45% 0px -45% 0px'});
st.forEach(s=>io2.observe(s));
// 2 picker
const pkS=document.getElementById('pkStage'),pkF=document.getElementById('pkFurn'),pkW=document.getElementById('pkSw'),pkN=document.getElementById('pkName');
function pickF(k){pkF.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));const F=FURN[k];
 pkS.innerHTML=F.d.map(d=>`<img src="${I(d[0])}" data-i="${d[0]}" alt="${d[1]}">`).join('');
 pkW.innerHTML=F.d.map(d=>`<button data-i="${d[0]}" title="${d[1]}" style="background-color:${d[2]};background-image:url(${I(d[0])})"></button>`).join('');
 pkW.querySelectorAll('button').forEach(b=>{b.onmouseenter=b.onclick=()=>show(b.dataset.i)});show(F.d[k==='dh'?1:0][0])}
function show(i){pkS.querySelectorAll('img').forEach(m=>m.classList.toggle('on',m.dataset.i===i));pkW.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.i===i));
 for(const F of Object.values(FURN))for(const d of F.d)if(d[0]===i)pkN.textContent=d[1]}
pkF.innerHTML=Object.entries(FURN).map(([k,F])=>`<button data-k="${k}"><img src="${I(F.ikea)}" alt="">${F.name}</button>`).join('');
pkF.querySelectorAll('button').forEach(b=>b.onclick=()=>pickF(b.dataset.k));pickF('dh');
// 3 slider
const ba=document.getElementById('ba'),rg=ba.querySelector('input');
rg.oninput=()=>{const v=rg.value;ba.querySelector('.ba-after').style.clipPath=`inset(0 0 0 ${v}%)`;ba.querySelector('.ba-line').style.left=v+'%'};
// 4 chooser + grid
const PR={dh:[['dh-home','ערכת בית מתוק',189],['dh-market','ערכת סופרמרקט',199],['dh-ice','ערכת גלידריה',199],['dh-pizza','ערכת פיצריה',199],['dh-forest','ערכת בקתה ביער',189]],
tr:[['c-trofast-pink','מדבקות TROFAST ורוד',119],['c-trofast-sage','מדבקות TROFAST מרווה',119],['c-trofast-gingham','מדבקות TROFAST משבצות',129],['c-trofast-floral','מדבקות TROFAST פרחוני',129]],
tb:[['c-table-check','שולחן משבצות',99],['c-table-leo','שולחן נמר',99],['c-table-road','שולחן כביש',109]],
kt:[['c-hero-market','מטבח מרקט',149],['c-icecream','מטבח גלידה',149],['c-pizzeria','מטבח פיצריה',149]]};
const ch=document.getElementById('chooser'),gr=document.getElementById('grid');
ch.innerHTML=`<button data-k="all" class="on"><img src="${I('dh-front')}" alt=""><span>הכול</span></button>`.replace('dh-front','dh-clean')+Object.entries(FURN).filter(([k])=>k!=='kt'||1).map(([k,F])=>`<button data-k="${k}"><img src="${I(F.ikea)}" alt=""><span>${F.name}</span></button>`).join('');
ch.style.gridTemplateColumns='';ch.classList.add('n5');
gr.innerHTML=Object.entries(PR).flatMap(([k,a])=>a.map(p=>`<div class="p" data-k="${k}"><div class="ph"><img src="${I(p[0])}" alt="" loading="lazy"></div><h5>${p[1]}</h5><small>₪${p[2]}</small></div>`)).join('');
ch.querySelectorAll('button').forEach(b=>b.onclick=()=>{ch.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));gr.querySelectorAll('.p').forEach(p=>p.classList.toggle('hide',b.dataset.k!=='all'&&p.dataset.k!==b.dataset.k))});
// 5 cards
const CD=[['dh-home','r-dollhouse','ערכת בית מתוק לבית בובות',189],['c-icecream','r-icecream','ערכת גלידה למטבח',149],['c-table-check','r-table-check','שולחן משבצות',99],['c-trofast-pink','r-trofast-pink','TROFAST ורוד',119]];
const cards=document.getElementById('cards');
cards.innerHTML=CD.map(c=>`<div class="card"><div class="ph"><img class="a" src="${I(c[0])}" alt=""><img class="b" src="${I(c[1])}" alt="" loading="lazy"></div><h5>${c[2]}</h5><div class="pr">₪${c[3]}</div><button class="btn">הוספה לסל</button></div>`).join('');
cards.querySelectorAll('.card').forEach(c=>c.querySelector('.ph').onclick=()=>c.classList.toggle('tap'));
// 7 tabs
const TB={dh:['dh-clean',['מנקים את הקירות עם מטלית יבשה','מדביקים טפט מלמעלה למטה','מוסיפים רצפה ופרטים קטנים','מחליקים בועות עם הכרטיס המצורף']],
tr:['c-trofast-sage',['מוציאים את הקופסאות','מדביקים את החזית על כל קופסה','מיישרים לפי הקווים המסומנים','מחזירים למדפים']],
tb:['c-table-check',['מנגבים את משטח השולחן','מניחים את המדבקה מהפינה','מחליקים מהמרכז החוצה','חותכים עודפים בקצה']],
kt:['c-pizzeria',['מורידים את הווילון והחלקים הקטנים','מדביקים את החזית','מוסיפים שלט וגגון','מחזירים את הכלים למקום']]};
const tB=document.getElementById('tabBtns'),tY=document.getElementById('tabBody');
tB.innerHTML=Object.entries(FURN).map(([k,F])=>`<button data-k="${k}">${F.name}</button>`).join('');
function tab(k){tB.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));const t=TB[k];
 tY.style.animation='none';tY.offsetHeight;tY.style.animation='';
 tY.innerHTML=`<div class="ph"><img src="${I(t[0])}" alt=""></div><ol>${t[1].map(s=>`<li>${s}</li>`).join('')}</ol>`}
tB.querySelectorAll('button').forEach(b=>b.onclick=()=>tab(b.dataset.k));tab('dh');
// loop
const lp=document.getElementById('loop'),LD=FURN.dh.d.map(d=>d[0]);
lp.innerHTML=LD.map((d,i)=>`<img src="${I(d)}" class="${i?'':'on'}" alt="">`).join('');let li=0;
setInterval(()=>{const im=lp.querySelectorAll('img');im[li].classList.remove('on');li=(li+1)%im.length;im[li].classList.add('on')},2200);
