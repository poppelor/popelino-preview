/* Popelino hero: calm world switch + separately-sold accessory packs */
(function(){
const root=document.querySelector('[data-fhero]');if(!root)return;
const $=s=>root.querySelector(s);
const house=$('.fh-house'),wl=$('.fh-worlds'),prodT=$('.fh-prod .fh-t'),prodP=$('.fh-prod .fh-p'),packWrap=$('.fh-packwrap');
const PRICE={home:149,market:169,ice:159,pizza:159,forest:149};
const sign=(t,bg,fg,w=150)=>`<svg viewBox="0 0 ${w} 64"><rect x="4" y="4" width="${w-8}" height="56" rx="28" fill="${bg}" stroke="#fff" stroke-width="5"/><text x="${w/2}" y="43" text-anchor="middle" font-family="Playpen,sans-serif" font-weight="700" font-size="25" fill="${fg}">${t}</text></svg>`;
const tagS=(t,c)=>`<svg viewBox="0 0 110 60"><path d="M10 6 h80 l16 24 -16 24 h-80z" fill="${c}" stroke="#fff" stroke-width="4"/><circle cx="88" cy="30" r="5" fill="#fff"/><text x="44" y="40" text-anchor="middle" font-family="Playpen,sans-serif" font-weight="700" font-size="23" fill="#363636">${t}</text></svg>`;
const win=`<svg viewBox="0 0 100 110"><path d="M10 105 V50 a40 40 0 0 1 80 0 V105z" fill="#fff"/><path d="M18 98 V52 a32 32 0 0 1 64 0 V98z" fill="#d6e4ea"/><path d="M50 20 v78 M18 60 h64" stroke="#fff" stroke-width="6"/></svg>`;
const curt=`<svg viewBox="0 0 120 110"><rect x="4" y="4" width="112" height="8" rx="4" fill="#a07c5a"/><path d="M8 12 q10 40 0 94 h34 q-14 -50 0 -94z" fill="#e1cdc8"/><path d="M112 12 q-10 40 0 94 h-34 q14 -50 0 -94z" fill="#e1cdc8"/></svg>`;
const rug=`<svg viewBox="0 0 160 60"><ellipse cx="80" cy="30" rx="76" ry="26" fill="#c7bcce"/><ellipse cx="80" cy="30" rx="54" ry="16" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="8 6"/></svg>`;
const shelf=`<svg viewBox="0 0 140 70"><rect x="4" y="54" width="132" height="10" rx="4" fill="#c8a882"/>${[0,1,2,3,4].map(i=>`<rect x="${10+i*25}" y="${18+(i%2)*8}" width="20" height="${36-(i%2)*8}" rx="4" fill="${['#d77a6a','#e8c75a','#9fb8ad','#8fa3c4','#e1cdc8'][i]}"/>`).join('')}</svg>`;
const PACK={
 home:{name:'ערכת "בית חם"',price:59,items:[['win',win,13],['curt',curt,14],['rug',rug,18],['🪴',0,8],['💡',0,7],['🐈',0,9],['🕰️',0,7]]},
 market:{name:'ערכת "מכולת"',price:69,items:[['🛒',0,10],['🍎',0,6],['🧺',0,9],['tag',tagS('₪5','#f1e0b5'),10],['shelf',shelf,17],['sale',sign('מבצע','#d77a6a','#fff'),16],['🥖',0,8]]},
 forest:{name:'ערכת "חברי היער"',price:59,items:[['🌲',0,10],['🍄',0,7],['🦉',0,9],['🦊',0,10],['🌼',0,6],['🦔',0,8]]}
};
let cur=null,z=40,ghostDone=false;
wl.innerHTML=ORDER.map(k=>`<button class="fh-wb" data-k="${k}" aria-label="${WORLDS[k].tag}"><i style="background:${WORLDS[k].color}">${WORLDS[k].emoji}</i>${WORLDS[k].name}</button>`).join('');
function clearAcc(){house.querySelectorAll('.fh-st').forEach(s=>{s.style.opacity=0;s.style.scale=.6;setTimeout(()=>s.remove(),260)});select(null)}
function show(k,instant){if(k==cur)return;const old=[...house.querySelectorAll('.layer')];const L=skinEl(k);L.style.opacity=instant?1:0;house.insertBefore(L,house.querySelector('.fh-st'));
 if(!instant)requestAnimationFrame(()=>requestAnimationFrame(()=>L.style.opacity=1));setTimeout(()=>old.forEach(o=>o.remove()),instant?0:480);
 cur=k;clearAcc();killGhost&&killGhost();wl.querySelectorAll('.fh-wb').forEach(b=>b.classList.toggle('on',b.dataset.k==k));
 prodT.textContent=`מדבקת בית בובות • ${WORLDS[k].tag}`;prodP.innerHTML=`<b>₪${PRICE[k]}</b><small>מחיר לדוגמה</small>`;renderPack(k)}
function art(a){return a[1]?a[1]:`<span class="dc">${a[0]}</span>`}
function renderPack(k){const P=PACK[k];
 if(!P){packWrap.innerHTML=`<p class="fh-none">לעולם הזה אין ערכת אביזרים. המדבקה מגיעה מושלמת כמו שהיא.</p>`;return}
 packWrap.innerHTML=`<div class="fh-pack"><div class="fh-hd"><div><span class="fh-badge">ערכת אביזרים להשלמה • נמכרת בנפרד</span><div class="fh-t">${P.name}</div><div class="fh-p"><b>₪${P.price}</b><small>מחיר לדוגמה · לא כלול במדבקה</small></div></div><button class="fh-btn gh" data-addpack>+ הוסיפו לסל</button></div>
 <button class="fh-try" data-try>נסו על הבית</button><div class="fh-tray">${P.items.map((a,i)=>`<div class="fh-ts" data-i="${i}">${art(a)}</div>`).join('')}</div><p class="fh-trynote">גררו אל הבית לתצוגה בלבד. גררו החוצה כדי להסיר.</p></div>`;
 const pk=packWrap.querySelector('.fh-pack');pk.classList.add('hide');requestAnimationFrame(()=>pk.classList.remove('hide'));
 pk.querySelector('[data-try]').onclick=e=>{const on=pk.classList.toggle('trying');e.target.textContent=on?'סגירת התצוגה':'נסו על הבית';if(!on)clearAcc();else if(!ghostDone){ghostDone=true;setTimeout(()=>ghost(pk),350)}};
 pk.querySelectorAll('.fh-ts').forEach(t=>drag(t,true));
 pk.querySelector('[data-addpack]').onclick=()=>toastMsg(`${P.name} נוספה לסל (דמו)`)}
wl.querySelectorAll('.fh-wb').forEach(b=>b.onclick=()=>show(b.dataset.k));
$('[data-addmain]').onclick=()=>toastMsg(`מדבקת ${WORLDS[cur].tag} נוספה לסל (דמו)`);
const toast=document.createElement('div');toast.className='fh-toast';document.body.appendChild(toast);let tt;
function toastMsg(m){toast.textContent=m;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('on'),2400)}
/* try-on tools */
const tools=document.createElement('div');tools.className='fh-tools';tools.innerHTML='<button data-a="rot" aria-label="סיבוב">↻</button><button data-a="big" aria-label="גודל">⤢</button><button data-a="del" aria-label="הסרה">✕</button>';house.parentElement.appendChild(tools);let sel=null;
function select(n){house.querySelectorAll('.fh-st').forEach(s=>s.classList.toggle('sel',s==n));sel=n;if(!n){tools.classList.remove('on');return}const r=n.getBoundingClientRect(),pr=house.parentElement.getBoundingClientRect();tools.style.left=(r.left+r.width/2-pr.left)+'px';tools.style.top=(r.top-pr.top)+'px';tools.classList.add('on')}
tools.addEventListener('click',e=>{const a=e.target.dataset.a;if(!sel||!a)return;if(a=='rot'){sel.dataset.r=(+sel.dataset.r+30)%360;sel.style.rotate=sel.dataset.r+'deg'}if(a=='big'){const w=parseFloat(sel.style.width),nw=w>=24?w*.6:w*1.25;sel.style.width=nw+'%';sel.style.setProperty('--fs',nw*.9+'cqw')}if(a=='del'){const s=sel;select(null);s.style.opacity=0;setTimeout(()=>s.remove(),260)}else setTimeout(()=>select(sel),10)});
document.addEventListener('pointerdown',e=>{if(!e.target.closest('.fh-st,.fh-tools'))select(null)});
house.style.containerType='inline-size';
function drag(el,fromTray){el.addEventListener('pointerdown',e=>{e.preventDefault();const hr=house.getBoundingClientRect();let node=el,moved=false;const sx=e.clientX,sy=e.clientY;
 if(fromTray){const a=PACK[cur].items[+el.dataset.i];node=document.createElement('div');node.className='fh-st';node.innerHTML=art(a);node.dataset.r=0;node._w=a[2]}
 else{node._w=parseFloat(node.style.width);select(null)}
 const wpx=node._w/100*hr.width;node.style.width=wpx+'px';node.style.setProperty('--fs',wpx*.9+'px');const placed=!fromTray;
 node.classList.add('fly');document.body.appendChild(node);house.classList.add('dragging');killGhost();
 const inside=ev=>{const r=house.getBoundingClientRect();return ev.clientX>r.left&&ev.clientX<r.right&&ev.clientY>r.top&&ev.clientY<r.bottom};
 const mv=ev=>{if(Math.hypot(ev.clientX-sx,ev.clientY-sy)>4)moved=true;const b=node.getBoundingClientRect();node.style.left=ev.clientX-b.width/2+'px';node.style.top=ev.clientY-b.height/2+'px';house.classList.toggle('over',inside(ev))};mv(e);
 const up=ev=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);house.classList.remove('over');house.classList.remove('dragging');
  if(inside(ev)){const r=house.getBoundingClientRect(),b=node.getBoundingClientRect();node.classList.remove('fly');node.style.left=(b.left-r.left)/r.width*100+'%';node.style.top=(b.top-r.top)/r.height*100+'%';node.style.width=b.width/r.width*100+'%';node.style.setProperty('--fs',b.width*.9/r.width*100+'cqw');node.style.zIndex=++z;house.appendChild(node);
   if(!node._b){node._b=1;drag(node,false);node.addEventListener('dblclick',()=>{node.dataset.r=(+node.dataset.r+30)%360;node.style.rotate=node.dataset.r+'deg'})}
   if(placed&&!moved)select(node)}
  else{node.style.opacity=0;setTimeout(()=>node.remove(),260)}};
 addEventListener('pointermove',mv);addEventListener('pointerup',up);addEventListener('pointercancel',up)})}

/* one-time ghost hand demo */
let gl=null;function killGhost(){if(gl){gl.remove();gl=null}}
function ghost(pk){const t=pk.querySelector('.fh-ts');if(!t)return;const rr=root.getBoundingClientRect(),tr=t.getBoundingClientRect(),hr=house.getBoundingClientRect();
 const sx=tr.left+tr.width/2-rr.left,sy=tr.top+tr.height/2-rr.top,ex=hr.left+hr.width*.42-rr.left,ey=hr.top+hr.height*.66-rr.top;
 const cx=(sx+ex)/2,cy=Math.min(sy,ey)-80;
 gl=document.createElement('div');gl.className='fh-ghostlayer';
 gl.innerHTML=`<svg class="arr"><path d="M${sx} ${sy} Q${cx} ${cy} ${ex} ${ey}"/><path d="M${ex} ${ey} l-4 -12 M${ex} ${ey} l10 -7"/></svg><div class="fh-ghinfo" style="left:${cx}px;top:${cy+10}px">גררו מדבקה אל הבית</div><div class="fh-ghost"><div class="chip">${t.innerHTML}</div><svg class="hand" viewBox="0 0 24 24"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-.6a6 6 0 0 1-4.6-2.2L4 15.6a1.5 1.5 0 0 1 2.2-2L9 16V11" fill="#fff" stroke="#363636" stroke-width="1.4" stroke-linejoin="round"/></svg></div>`;
 root.appendChild(gl);const g=gl.querySelector('.fh-ghost'),chip=g.querySelector('.chip');chip.style.opacity=0;
 requestAnimationFrame(()=>gl&&gl.classList.add('on'));
 const P=(p)=>{const u=1-p;return[u*u*sx+2*u*p*cx+p*p*ex,u*u*sy+2*u*p*cy+p*p*ey]};
 const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;let t0=null,loops=0;
 function f(t){if(!gl)return;if(!t0)t0=t;const e=(t-t0)/1000;
  // 0-.4 appear/press, .4-1.8 move, 1.8-2.3 drop, 2.3-2.8 fade; play twice
  if(e<.4){const[x,y]=P(0);g.style.transform=`translate(${x-8}px,${y-4}px)`;g.style.opacity=Math.min(1,e/.25);chip.style.opacity=e>.25?.9:0}
  else if(e<1.8){const[x,y]=P(ease((e-.4)/1.4));g.style.transform=`translate(${x-8}px,${y-4}px)`}
  else if(e<2.3){chip.style.opacity=.9-(e-1.8)*1.8}
  else if(e<2.8){g.style.opacity=1-(e-2.3)*2}
  else{loops++;if(loops<2){t0=t;chip.style.opacity=0}else{gl.classList.remove('on');setTimeout(killGhost,500);return}}
  requestAnimationFrame(f)}
 requestAnimationFrame(f)}
show('home',true);
})();
