window.POPFX=function(){
 if(!window.gsap||document.body.dataset.fx)return;document.body.dataset.fx='1';
 const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,shot=location.hash=='#shot';
 gsap.registerPlugin(ScrollTrigger);
 document.querySelectorAll('h2').forEach(h=>{
  const t=h.innerHTML;h.innerHTML=t.split(/(<br\s*\/?>)/i).map(p=>/<br/i.test(p)?'':`<span class="rev"><span>${p}</span></span>`).join('');});
 const lines=gsap.utils.toArray('.rev>span');
 if(rm||shot){gsap.set(lines,{yPercent:0});}
 else{gsap.set(lines,{yPercent:120});gsap.utils.toArray('.rev').forEach(r=>{gsap.to(r.querySelectorAll('span'),{yPercent:0,duration:1.1,ease:'power3.out',stagger:.12,scrollTrigger:{trigger:r,start:'top 85%'}})});}
 gsap.utils.toArray('.fan').forEach(g=>{
  const c=g.querySelectorAll('.card');
  if(rm||shot)return;
  gsap.from(c,{y:90,rotation:(i,el,a)=>(i-(a.length-1)/2)*8,opacity:0,duration:1,ease:'power3.out',stagger:.09,scrollTrigger:{trigger:g,start:'top 80%'}});});
 gsap.utils.toArray('.card .im img,.ig img').forEach(im=>{
  if(rm||shot){gsap.set(im,{scale:1,clipPath:'inset(0% round 22px)'});return;}
  gsap.fromTo(im,{clipPath:'inset(22% round 22px)',scale:1.12},{clipPath:'inset(0% round 22px)',scale:1,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:im,start:'top 85%'}});
  im.parentElement.addEventListener('mouseenter',()=>gsap.to(im,{scale:1.06,duration:.6,ease:'power2.out'}));
  im.parentElement.addEventListener('mouseleave',()=>gsap.to(im,{scale:1,duration:.6}));});
 gsap.utils.toArray('.faq details').forEach(d=>{
  const p=d.querySelector('p');if(!p)return;gsap.set(p,{height:d.open?'auto':0,overflow:'hidden',marginTop:d.open?12:0});
  d.addEventListener('toggle',()=>{if(d.dataset.a)return;gsap.to(p,{height:d.open?'auto':0,marginTop:d.open?12:0,duration:.45,ease:'power2.inOut'})});
  if(rm||shot)return;
  ScrollTrigger.create({trigger:d,start:'top 70%',once:true,onEnter:()=>{if(d.open)return;d.dataset.a=1;d.open=true;gsap.fromTo(p,{height:0,marginTop:0},{height:'auto',marginTop:12,duration:.6,ease:'power2.out',onComplete:()=>delete d.dataset.a})}});});
 gsap.utils.toArray('.stage').forEach(st=>{
  st.addEventListener('mousemove',e=>{if(rm)return;const r=st.getBoundingClientRect();gsap.to(st.querySelector('img'),{x:(e.clientX-r.left)/r.width*12-6,y:(e.clientY-r.top)/r.height*12-6,duration:.6})});
  st.addEventListener('mouseleave',()=>gsap.to(st.querySelector('img'),{x:0,y:0,duration:.6}));});
};


window.POP3D=function(){if(!window.gsap)return;gsap.registerPlugin(ScrollTrigger);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const cs=gsap.utils.toArray('.c3');
 cs.forEach((c,i)=>{if(i==cs.length-1)return;const nx=cs[i+1];
  gsap.fromTo(c,{scale:1,rotateX:0,z:0,filter:'brightness(1) blur(0px)'},{scale:.86,rotateX:-10,z:-120,y:-24,filter:'brightness(.86) blur(1.5px)',ease:'none',
   scrollTrigger:{trigger:nx,start:'top 95%',end:'top 110px',scrub:.6}});});
 cs.slice(1).forEach(c=>gsap.from(c,{y:120,ease:'power2.out',scrollTrigger:{trigger:c,start:'top bottom',end:'top 60%',scrub:.6}}));
};

window.POPFAN=function(){const sec=document.getElementById('reviews');if(!sec)return;
 if(new URLSearchParams(location.search).get('reviews')!=='1')return;sec.hidden=false;
 const view=sec.querySelector('.rs-view'),tr=sec.querySelector('.rs-track');
 tr.innerHTML+=tr.innerHTML; // duplicate for seamless loop
 const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,G=window.gsap;
 // RTL: track moves to the right (positive x) = "scroll to the right"
 let x=0,half=()=>tr.scrollWidth/2,step=()=>tr.querySelector('.rs').offsetWidth+parseFloat(getComputedStyle(tr).gap);
 const wrapX=v=>{const h=half();return ((v%h)+h)%h};
 const set=v=>{x=v;G?G.set(tr,{x:wrapX(x)-half()}):tr.style.transform=`translateX(${wrapX(x)-half()}px)`};set(0);
 let speed=rm?0:.45,boost=0,drag=false,last=0,hover=false;
 if(G){G.ticker.add(()=>{if(drag)return;boost*=.92;set(x+(hover?.08:speed)+boost)});
  ScrollTrigger.create({trigger:sec,start:'top bottom',end:'bottom top',onUpdate:s=>{if(!rm)boost=Math.max(-14,Math.min(14,s.getVelocity()/120))}});}
 sec.querySelectorAll('.rs-b').forEach(b=>b.onclick=()=>{const o={v:x};G.to(o,{v:x+step()*(+b.dataset.d),duration:rm?0:.7,ease:'power3.inOut',onUpdate:()=>set(o.v)})});
 view.addEventListener('mouseenter',()=>hover=true);view.addEventListener('mouseleave',()=>hover=false);
 view.addEventListener('pointerdown',e=>{drag=true;last=e.clientX;view.setPointerCapture(e.pointerId)});
 view.addEventListener('pointermove',e=>{if(!drag)return;const d=e.clientX-last;last=e.clientX;set(x+d);boost=d});
 ['pointerup','pointercancel'].forEach(t=>view.addEventListener(t,()=>drag=false));
};
window.POPFX();window.POP3D();window.POPFAN();
