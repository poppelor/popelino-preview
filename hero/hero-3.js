/* Hero 3 · "הרהיט שלך, עכשיו" – client-side demo: photo -> scan -> design blended over the furniture area -> before/after */
(function(){
const G=gsap,$=s=>document.querySelector(s);
const PRE=[
 {t:'dh',name:'בית בובות',ikea:'FLISAT',img:'assets/rooms/dh-plain.jpg',empty:'assets/rooms/dh-empty.jpg',box:[500,461,600,548]},
 {t:'sh',name:'כוננית',ikea:'TROFAST',img:'assets/rooms/sh-plain.jpg',empty:'assets/rooms/sh-empty.jpg',box:[470,521,660,459]},
 {t:'kt',name:'מטבח',ikea:'DUKTIG',img:'assets/rooms/kt-plain.jpg',empty:'assets/rooms/kt-empty.jpg',box:[556,280,488,700]}];
const TYPES={dh:{name:'בית בובות',ikea:'FLISAT',ar:1312/1199},sh:{name:'כוננית',ikea:'TROFAST',ar:963/608},kt:{name:'מטבח',ikea:'DUKTIG',ar:738/992}};
const DES={dh:[['market','סופרמרקט'],['ice','גלידריה'],['pizza','פיצריה'],['forest','בקתה ביער'],['home','בית מתוק']],
 sh:[['trofast-floral','פרחוני'],['trofast-sage','מרווה'],['trofast-pink','ורוד'],['trofast-gingham','משבצות'],['trofast-yellow','צהוב']],
 kt:[['icecream','גלידרייה'],['pizzeria','פיצרייה'],['hero-market','מכולת']]};
Object.values(DES).flat().forEach(([k])=>{if(!WORLDS[k])new Image().src=`assets/cut/${k}.png`});PRE.forEach(p=>{new Image().src=p.empty});
const st=$('#st3'),ph=$('#ph'),rv=$('#rv'),cm=$('#cm'),scan=$('#scan'),det=$('#det'),tg=$('#tg'),cmh=$('#cmh'),stat=$('#stat'),statt=$('#statt'),ubox=$('#ubox');
const S={mode:'pre',pi:0,t:'dh',box:null,d:null,url:null,p:100};
/* ui */
$('#pre').innerHTML=PRE.map((p,i)=>`<button data-i="${i}"><img src="${p.img}" alt="">${p.name}</button>`).join('');
$('#types').innerHTML=Object.entries(TYPES).map(([k,t])=>`<button data-t="${k}">${t.name}</button>`).join('');
function chips(){$('#des').innerHTML=DES[S.t].map(([k,n])=>`<button data-d="${k}" class="${k==S.d?'on':''}"><i>${WORLDS[k]?`<img src="assets/plain.webp" alt="">${WORLDS[k].svg()}`:`<img src="assets/cut/${k}.png" alt="">`}</i>${n}</button>`).join('')}
function mark(){document.querySelectorAll('#pre button').forEach(b=>b.classList.toggle('on',S.mode=='pre'&&+b.dataset.i==S.pi));
 document.querySelectorAll('#types button').forEach(b=>b.classList.toggle('on',b.dataset.t==S.t));
 document.querySelectorAll('#des button').forEach(b=>b.classList.toggle('on',b.dataset.d==S.d));
 const up=S.mode=='up';$('#types').classList.toggle('on',up);document.querySelector('.types-l').style.display=up?'block':'none';st.classList.toggle('upm',up)}
const pct=b=>[b[0]/16,b[1]/12,b[2]/16,b[3]/12];
function desEl(){const d=document.createElement('div');d.className='des up';const [x,y,w,h]=S.box;Object.assign(d.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'});
 if(WORLDS[S.d]){d.innerHTML='<img src="assets/plain.webp" alt="">';const L=skinEl(S.d);d.appendChild(L);if(S.mode=='pre')d.classList.remove('up')}
 else d.innerHTML=`<img class="c" src="assets/cut/${S.d}.png" alt="">`;return d}
function buildAfter(){cm.innerHTML=S.mode=='pre'?`<img class="ph" src="${PRE[S.pi].empty}" alt="">`:'';cm.appendChild(desEl())}
const setM=m=>{scan.style.setProperty('--m',m+'%')};
const setRv=m=>{rv.style.clipPath=`inset(0 0 ${100-m}% 0)`};
const setP=p=>{S.p=p;cm.style.clipPath=`inset(0 ${100-p}% 0 0)`;cmh.style.left=p+'%'};
const say=(t,ok)=>{statt.textContent=t;stat.classList.toggle('ok',!!ok)};
function placeDet(){const [x,y,w,h]=S.box;Object.assign(det.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'});Object.assign(ubox.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'})}
let tl=null;
function run(){tl&&tl.kill();st.classList.remove('res');cmh.classList.remove('on');st.querySelectorAll('.pt3').forEach(n=>n.remove());
 buildAfter();setRv(0);setP(100);setM(0);placeDet();G.set(scan,{opacity:0});G.set(det,{opacity:0});
 const T=TYPES[S.t],o={m:0},o2={m:0},pp={p:100};tl=G.timeline();
 tl.call(()=>{say('סורקת את התמונה…');scan.style.setProperty('--gl','rgba(189,209,200,.85)')})
  .to(scan,{opacity:1,duration:.25})
  .to(o,{m:100,duration:1.35,ease:'power1.inOut',onUpdate:()=>setM(o.m)},'<')
  .call(()=>{const [x,y,w,h]=S.box;for(let i=0;i<16;i++){const e=document.createElement('span');e.className='pt3';const edge=i%4,r=Math.random();
    const px=edge==0?x+w*r:edge==1?x+w*r:edge==2?x+w*(0.02+Math.random()*.06):x+w*(0.92+Math.random()*.06),py=edge==0?y+h*(0.02+Math.random()*.06):edge==1?y+h*(0.94+Math.random()*.05):y+h*r;
    e.style.left=px+'%';e.style.top=py+'%';st.insertBefore(e,cmh);G.from(e,{scale:0,opacity:0,duration:.3,delay:i*.04,ease:'back.out(3)'})}},null,.55)
  .call(()=>{tg.innerHTML=S.mode=='pre'?`זוהה: ${T.name} <em>${T.ikea}</em>`:`כאן הרהיט? <em>אפשר להזיז ולהגדיל</em>`;say(S.mode=='pre'?'מצאתי את הרהיט':'סמנו את הרהיט בתמונה')},null,1.4)
  .fromTo(det,{opacity:0,scale:.75},{opacity:1,scale:1,duration:.5,ease:'back.out(1.8)'},1.4)
  .call(()=>{say('מלבישה את המדבקה…');scan.style.setProperty('--gl','rgba(217,116,95,.75)')},null,2.05)
  .to(o2,{m:100,duration:1.15,ease:'power2.inOut',onUpdate:()=>{setM(o2.m);setRv(o2.m)}},2.05)
  .call(()=>G.to(st.querySelectorAll('.pt3'),{opacity:0,scale:0,duration:.3,stagger:.02,onComplete:function(){this.targets().forEach(n=>n.remove())}}),null,2.6)
  .to(scan,{opacity:0,duration:.35},3.15)
  .to(det,{opacity:S.mode=='pre'?0:0,duration:.35},3.15)
  .call(()=>{st.classList.add('res');cmh.classList.add('on');say(innerWidth<700?'מוכן · גררו את הידית':'מוכן · גררו את הידית כדי להשוות',true);
    const r=st.getBoundingClientRect(),[x,y,w,h]=S.box;HFX.burst(r.left+r.width*(x+w/2)/100,r.top+r.height*(y+h*.4)/100,{n:innerWidth<700?10:16,floor:r.top+r.height*(y+h)/100,power:9,size:innerWidth<700?18:24})},null,3.25)
  .to(pp,{p:52,duration:1.1,ease:'power3.inOut',onUpdate:()=>setP(pp.p)},3.5)}
function quick(){/* design swap after result: short sweep, no rescan */
 if(!st.classList.contains('res'))return run();const old=cm.cloneNode(true);old.style.clipPath=cm.style.clipPath;old.id='';rv.appendChild(old);buildAfter();
 const o={m:0};cm.style.webkitMaskImage='';G.fromTo(o,{m:0},{m:100,duration:.7,ease:'power2.inOut',onUpdate:()=>{old.style.clipPath=`inset(${o.m}% ${100-S.p}% 0 0)`},onComplete:()=>old.remove()});
 G.fromTo(cm.querySelector('.des'),{scale:.96,transformOrigin:'50% 100%'},{scale:1,duration:.6,ease:'back.out(2)'})}
function preset(i){S.mode='pre';S.pi=i;S.t=PRE[i].t;S.box=pct(PRE[i].box);S.d=DES[S.t][0][0];ph.src=PRE[i].img;chips();mark();ph.decode?ph.decode().then(run,run):run()}
function defBox(){const w=S.t=='kt'?30:S.t=='sh'?52:44,h=w*(4/3)/TYPES[S.t].ar;S.box=[(100-w)/2,Math.max(4,64-h/1.6),w,h]}
document.getElementById('pre').onclick=e=>{const b=e.target.closest('button');if(b)preset(+b.dataset.i)};
document.getElementById('des').onclick=e=>{const b=e.target.closest('button');if(!b)return;S.d=b.dataset.d;mark();quick()};
document.getElementById('types').onclick=e=>{const b=e.target.closest('button');if(!b)return;S.t=b.dataset.t;S.d=DES[S.t][0][0];defBox();chips();mark();run()};
document.getElementById('file').onchange=e=>{const f=e.target.files&&e.target.files[0];if(!f)return;if(S.url)URL.revokeObjectURL(S.url);S.url=URL.createObjectURL(f);
 S.mode='up';S.t='dh';S.d=DES.dh[0][0];defBox();ph.src=S.url;chips();mark();ph.decode?ph.decode().then(run,run):run();e.target.value=''};
/* compare drag */
const knob=$('#knob');knob.addEventListener('pointerdown',e=>{e.preventDefault();knob.setPointerCapture(e.pointerId);const mv=ev=>{const r=st.getBoundingClientRect();setP(Math.max(0,Math.min(100,(ev.clientX-r.left)/r.width*100)))};
 const up=()=>{knob.removeEventListener('pointermove',mv);knob.removeEventListener('pointerup',up)};knob.addEventListener('pointermove',mv);knob.addEventListener('pointerup',up)});
/* upload mode: move / resize the placement box */
ubox.addEventListener('pointerdown',e=>{e.preventDefault();ubox.setPointerCapture(e.pointerId);const rs=e.target.id=='rz',r=st.getBoundingClientRect(),sx=e.clientX,sy=e.clientY,b0=[...S.box];
 const mv=ev=>{const dx=(ev.clientX-sx)/r.width*100,dy=(ev.clientY-sy)/r.height*100;
  if(rs){const w=Math.max(12,Math.min(95,b0[2]-dx)),h=w*(4/3)/TYPES[S.t].ar;S.box=[b0[0]+b0[2]-w,b0[1]+b0[3]-h,w,h];S.box=[b0[0]+(b0[2]-w),b0[1],w,h]}
  else S.box=[b0[0]+dx,b0[1]+dy,b0[2],b0[3]];
  placeDet();const d=cm.querySelector('.des');if(d){const [x,y,w,h]=S.box;Object.assign(d.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'})}};
 const up=()=>{ubox.removeEventListener('pointermove',mv);ubox.removeEventListener('pointerup',up)};ubox.addEventListener('pointermove',mv);ubox.addEventListener('pointerup',up)});
preset(0);window.H3={preset,run,S};
})();
