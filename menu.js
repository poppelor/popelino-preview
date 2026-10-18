(function(){
const nav=document.querySelector('.nav .wrap');if(!nav)return;
const cats=[['dollhouse','בית בובות','FLISAT','dollhouse.jpg'],['shelf','כוננית','TROFAST','trofast-sage.jpg'],['table','שולחן','FLISAT','table-road.jpg'],['kitchen','מטבח','DUKTIG','pizzeria.jpg']];
const links=nav.querySelector('.links');
links.innerHTML=`<div class="mn"><span class="mn-hl"></span><button class="mn-i mn-shop" aria-expanded="false">חנות <i>▾</i></button>${cats.map(c=>`<a class="mn-i" href="category.html?c=${c[0]}">${c[1]}</a>`).join('')}</div>
<button class="mn-burger" aria-label="תפריט"><span></span><span></span></button>`+links.innerHTML.replace(/<a href="[^"]*#shop">חנות<\/a>/,'');
const panel=document.createElement('div');panel.className='mn-panel';
panel.innerHTML=`<div class="wrap"><span class="eb">קטגוריות</span><ul>${cats.map(c=>`<li><a href="category.html?c=${c[0]}" data-img="img/${c[3]}"><span>${c[1]} <small>${c[2]}</small></span><em>←</em></a></li>`).join('')}</ul></div><img class="mn-follow" alt="">`;
document.querySelector('.nav').appendChild(panel);
const st=document.createElement('style');st.textContent=`
.mn{position:relative;display:flex;gap:4px}
.mn-i{position:relative;z-index:1;background:none;border:0;font:600 16px Assistant;color:var(--ink);padding:9px 16px;border-radius:999px;cursor:pointer}
.mn-i i{font-style:normal;font-size:11px;opacity:.6}
.mn-hl{position:absolute;top:0;left:0;height:100%;border-radius:999px;background:#f1e9df;opacity:0;pointer-events:none}
.mn-burger{display:none;width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:none;flex-direction:column;justify-content:center;align-items:center;gap:5px;cursor:pointer}
.mn-burger span{width:16px;height:1.6px;background:var(--ink);transition:.3s}
.mn-panel{position:absolute;inset:100% 0 auto 0;background:var(--bg);border-bottom:1px solid var(--line);clip-path:inset(0 0 100% 0);transition:clip-path .55s cubic-bezier(.7,0,.2,1);overflow:hidden}
.mn-panel.open{clip-path:inset(0 0 0 0)}
.mn-panel .wrap{padding-top:28px;padding-bottom:40px;display:block;height:auto}
.mn-panel ul{list-style:none;margin:0;padding:0}
.mn-panel li a{display:flex;justify-content:space-between;align-items:center;padding:18px 0;border-bottom:1px solid var(--line);font:700 clamp(26px,3vw,40px) Playpen;transition:padding .35s,color .35s}
.mn-panel li a small{font:500 14px Assistant;color:var(--mute);letter-spacing:.08em}
.mn-panel li a em{font-style:normal;font-size:22px;color:var(--mute);transition:transform .35s}
.mn-panel li a:hover{padding-inline-start:18px;color:var(--acc)}.mn-panel li a:hover em{transform:translateX(-8px);color:var(--acc)}
.nav .mn-follow{position:fixed;top:0;left:0;width:200px;height:250px;object-fit:cover;border-radius:20px;pointer-events:none;opacity:0;transform:translate(-50%,-50%) scale(.6) rotate(-4deg);box-shadow:0 30px 60px -30px rgba(60,40,20,.5);z-index:60}
@media(max-width:820px){.mn .mn-i:not(.mn-shop),.mn-hl{display:none}.mn{display:none}.mn-burger{display:flex}.mn-follow{display:none}
.mn-panel{position:absolute;inset:100% 0 auto 0;height:calc(100vh - 76px);border:0}.mn-panel li a{font-size:30px;padding:22px 0}
.nav.menu-open .mn-burger span:first-child{transform:translateY(3.3px) rotate(45deg)}.nav.menu-open .mn-burger span:last-child{transform:translateY(-3.3px) rotate(-45deg)}}
@media(prefers-reduced-motion:reduce){.mn-panel{transition:none}}`;
document.head.appendChild(st);
const navEl=document.querySelector('.nav'),shop=links.querySelector('.mn-shop'),burger=links.querySelector('.mn-burger');
const toggle=o=>{o=o??!panel.classList.contains('open');panel.classList.toggle('open',o);navEl.classList.toggle('menu-open',o);shop.setAttribute('aria-expanded',o)};
shop.onclick=()=>toggle();burger.onclick=()=>toggle();
document.addEventListener('keydown',e=>{if(e.key=='Escape')toggle(false)});
document.addEventListener('click',e=>{if(!navEl.contains(e.target))toggle(false)});
const G=window.gsap,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
// pill highlight follows the cursor across nav items
const mn=links.querySelector('.mn'),hl=links.querySelector('.mn-hl');
mn.querySelectorAll('.mn-i').forEach(it=>it.addEventListener('mouseenter',()=>{
 const r=it.getBoundingClientRect(),pr=mn.getBoundingClientRect(),v={x:r.left-pr.left,width:r.width,opacity:1};
 G&&!rm?G.to(hl,{...v,duration:.45,ease:'power3.out'}):Object.assign(hl.style,{transform:`translateX(${v.x}px)`,width:v.width+'px',opacity:1})}));
mn.addEventListener('mouseleave',()=>G?G.to(hl,{opacity:0,duration:.3}):hl.style.opacity=0);
// image follows the cursor over panel rows
const fol=panel.querySelector('.mn-follow');
if(G&&!rm){const xT=G.quickTo(fol,'x',{duration:.5,ease:'power3'}),yT=G.quickTo(fol,'y',{duration:.5,ease:'power3'});
 panel.addEventListener('mousemove',e=>{xT(e.clientX+130);yT(e.clientY)});
 panel.querySelectorAll('li a').forEach(a=>{a.addEventListener('mouseenter',()=>{fol.src=a.dataset.img;G.to(fol,{opacity:1,scale:1,rotation:-3,duration:.4,ease:'power3.out'})});
  a.addEventListener('mouseleave',()=>G.to(fol,{opacity:0,scale:.7,duration:.3}))});}
})();
