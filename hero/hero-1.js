/* Hero 1 · "מתלבש מול העיניים" – pinned scroll: each world is a die-cut sticker that peels off / sticks on */
(function(){
const G=gsap,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS='http://www.w3.org/2000/svg';
const turn=document.getElementById('turn'),front=document.getElementById('front'),bg=document.querySelector('.h1-bg');
const ROOMS=Object.values(R).map(s=>s.trim().split(/\s+/).map(p=>p.split(',').map(Number)));
document.getElementById('rooms').innerHTML=ROOMS.map(p=>`<polygon points="${p.join(' ')}"/>`).join('');
const BX={x0:246,y0:79,x1:1143,y1:1025},S=(BX.x1-BX.x0)+(BX.y1-BX.y0);
/* depth: stacked silhouettes give the plywood a real edge when it turns */
const N=9;for(let i=N;i>=1;i--){const im=document.createElement('img');im.src='hero/plain-edge.webp';im.alt='';im.className='dp';
 im.style.transform=`translateZ(${-i*9}px)`;turn.insertBefore(im,front)}
/* corner frames */
const CORN={tr:{cx:BX.x1,cy:BX.y0+150,sx:-1,sy:1},bl:{cx:BX.x0,cy:BX.y1,sx:1,sy:-1}};
function clipHalf(poly,f){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],fa=f(a),fb=f(b);
 if(fa>=0)out.push(a);if((fa>=0)!=(fb>=0)){const t=fa/(fa-fb);out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t])}}return out}
const FULL=[[0,0],[1312,0],[1312,1199],[0,1199]];
/* worlds */
const mix=(h,t)=>{const a=parseInt(h.slice(1),16),b=0xf3f2ef,c=(s)=>Math.round(((a>>s)&255)*(1-t)+((b>>s)&255)*t);return `rgb(${c(16)},${c(8)},${c(0)})`};
const ORD=['market','ice','pizza','forest','home'];const st={},els={};
ORD.forEach((k,i)=>{const el=document.createElement('div');el.className='sk';el.style.opacity=0;
 const sk=document.createElement('div');sk.className='skin';sk.appendChild(skinEl(k));el.appendChild(sk);
 const f=document.createElementNS(NS,'svg');f.setAttribute('viewBox','0 0 1312 1199');f.classList.add('flap');
 f.innerHTML=`<defs><linearGradient id="fg${i}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#cfc9bf"/><stop offset=".18" stop-color="#fbfaf7"/><stop offset=".7" stop-color="#ffffff"/><stop offset="1" stop-color="#e4dfd6"/></linearGradient>
 <filter id="ff${i}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#3c2d1e" flood-opacity=".35"/></filter></defs><g filter="url(#ff${i})" fill="url(#fg${i})"></g>`;
 el.appendChild(f);front.insertBefore(el,front.querySelector('.sheen'));
 els[k]={el,sk,g:f.querySelector('g'),gr:f.querySelector('linearGradient')};st[k]={s:0,c:'tr',y:0,sc:1,op:0,lift:0}});
function render(k){const o=st[k],E=els[k];
 E.el.style.opacity=o.op;E.el.style.visibility=o.op<0.01?'hidden':'visible';
 E.el.style.transform=`translateY(${o.y}%) scale(${o.sc})`;
 E.el.style.filter=o.lift>0.02?`drop-shadow(0 ${(o.lift*26).toFixed(1)}px ${(o.lift*22).toFixed(1)}px rgba(50,35,20,${(o.lift*.32).toFixed(3)}))`:'none';
 if(o.s<1){E.sk.style.clipPath='none';E.g.innerHTML='';return}
 const C=CORN[o.c],s=o.s,uv=p=>[(p[0]-C.cx)*C.sx,(p[1]-C.cy)*C.sy],xy=(u,v)=>[C.cx+C.sx*u,C.cy+C.sy*v];
 const keep=clipHalf(FULL.map(uv),p=>p[0]+p[1]-s).map(p=>xy(p[0],p[1]));
 E.sk.style.clipPath=keep.length>2?`polygon(${keep.map(p=>`${(p[0]/13.12).toFixed(2)}% ${(p[1]/11.99).toFixed(2)}%`).join(',')})`:'polygon(0 0,0 0,0 0)';
 let h='';ROOMS.forEach(r=>{const pe=clipHalf(r.map(uv),p=>s-(p[0]+p[1]));if(pe.length>2)h+=`<polygon points="${pe.map(p=>xy(s-p[1],s-p[0]).map(n=>n.toFixed(1)).join(',')).join(' ')}"/>`});
 E.g.innerHTML=h;const a=xy(s/2,s/2),b=xy(s,s);
 E.gr.setAttribute('x1',a[0]);E.gr.setAttribute('y1',a[1]);E.gr.setAttribute('x2',b[0]);E.gr.setAttribute('y2',b[1])}
const renderAll=()=>ORD.forEach(render);renderAll();
/* rail */
const rail=document.getElementById('rail');
ORD.forEach((k,i)=>{const li=document.createElement('li');li.dataset.i=i;li.innerHTML=`<i style="background:${WORLDS[k].color}"></i>${WORLDS[k].tag}`;rail.appendChild(li)});
/* timeline */
const tl=G.timeline({paused:true,defaults:{immediateRender:false}});const shr=document.getElementById('shr');
const press={p:0},stickAt=[];let T=0.35;
function stick(k,a){const o=st[k];
 tl.set(o,{c:'tr'},a).fromTo(o,{op:0,y:-7,sc:1.1,lift:1,s:S*0.4},{op:1,y:-3.5,duration:.3,ease:'power2.out'},a)
  .fromTo(o,{y:-3.5,sc:1.1,lift:1},{y:0,sc:1,lift:0,duration:.45,ease:'power2.in'},a+.3)
  .fromTo(o,{s:S*0.4},{s:0,duration:.6,ease:'power2.inOut'},a+.32)
  .fromTo(press,{p:0},{p:1,duration:.07,ease:'power1.out'},a+.75).fromTo(press,{p:1},{p:0,duration:.18,ease:'back.out(3)'},a+.82)
  .fromTo(shr,{attr:{x:-1400}},{attr:{x:1312},duration:.35,ease:'none'},a+.78)
  .call(()=>{if(dir>0)pop()},null,a+.8);stickAt.push(a+.6)}
function peel(k,b){const o=st[k];
 tl.set(o,{c:'bl'},b).fromTo(o,{s:0},{s:S*0.62,duration:.62,ease:'power1.in'},b)
  .fromTo(o,{y:0,op:1,lift:0,sc:1},{y:-12,op:0,lift:.8,sc:1.03,duration:.45,ease:'power2.in'},b+.3)}
ORD.forEach((k,i)=>{if(i>0){peel(ORD[i-1],T);T+=.55}stick(k,T);T+=1.0+0.75});
tl.to({},{duration:.2},T);
tl.eventCallback('onUpdate',()=>{renderAll();front.style.transform=`translateZ(1px) scale(${1-press.p*.025},${1-press.p*.045})`;
 const t=tl.time();let cur=-1;stickAt.forEach((x,i)=>{if(t>=x)cur=i});setWorld(cur);
 document.getElementById('pb').style.width=(tl.progress()*100)+'%';document.getElementById('hint').style.opacity=tl.progress()>.03?.0:1});
let curW=-2;const lbl=document.getElementById('lbl');
function setWorld(i){if(i==curW)return;curW=i;
 [...rail.querySelectorAll('li[data-i]')].forEach(li=>li.classList.toggle('on',+li.dataset.i==i));
 bg.style.backgroundColor=i<0?'#f3f2ef':mix(WORLDS[ORD[i]].color,.45);
 lbl.textContent=i<0?'בית בובות FLISAT, כמו שהגיע מאיקאה':'עולם '+WORLDS[ORD[i]].tag;
 G.fromTo(lbl,{scale:.85,opacity:.3},{scale:1,opacity:1,duration:.45,ease:'back.out(2.5)'})}
setWorld(-1);
function pop(){const r=front.getBoundingClientRect();HFX.burst(r.left+r.width*.5,r.top+r.height*.55,{n:innerWidth<700?12:20,floor:r.bottom-8,power:innerWidth<700?8:11,size:innerWidth<700?20:28})}
/* scroll */
let dir=1;G.registerPlugin(ScrollTrigger);
const navH=()=>document.querySelector('.nav').offsetHeight;
const trig=ScrollTrigger.create({trigger:'#h1x',start:()=>'top '+navH(),end:()=>'+='+Math.round(innerHeight*4.6),pin:true,scrub:RM?true:.8,animation:tl,onUpdate:s=>dir=s.direction});
rail.addEventListener('click',e=>{const li=e.target.closest('li[data-i]');if(!li)return;const t=stickAt[+li.dataset.i]+.6,y=trig.start+(trig.end-trig.start)*(t/tl.duration());scrollTo({top:y,behavior:'smooth'})});
/* gentle 2.5D turn */
let px=0,py=0,tx=0,ty=0;addEventListener('pointermove',e=>{if(e.pointerType=='mouse'){tx=(e.clientX/innerWidth-.5);ty=(e.clientY/innerHeight-.5)}},{passive:true});
const t0=performance.now();(function loop(now){px+=(tx-px)*.05;py+=(ty-py)*.05;const t=(now-t0)/1000;
 const ry=RM?0:Math.sin(t*.55)*11+px*10,rx=RM?0:Math.sin(t*.4)*2.2-py*5;turn.style.transform=`rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg)`;requestAnimationFrame(loop)})(t0);
window.H1={tl,trig};
})();
