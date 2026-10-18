/* shared: logo-shape confetti with simple physics */
window.HFX=(function(){
 const SH=['assets/deco/flower-pink.svg','assets/deco/flower-sage.svg','assets/deco/drop-lilac.svg','assets/deco/dot-pink.svg','assets/deco/dot-sage.svg'];
 SH.forEach(s=>{new Image().src=s});
 const live=[];let run=false;
 function tick(){const now=performance.now();
  for(let i=live.length-1;i>=0;i--){const p=live[i],dt=Math.min(32,now-p.t)/16.67;p.t=now;
   p.vy+=0.42*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=p.vr*dt;
   if(p.y>p.floor){p.y=p.floor;p.vy*=-0.48;p.vx*=0.78;p.vr*=0.7;if(Math.abs(p.vy)<1.2)p.vy=0}
   const age=now-p.born,o=age>p.life-500?Math.max(0,(p.life-age)/500):1;
   p.el.style.transform=`translate3d(${p.x}px,${p.y}px,0) rotate(${p.r}deg) scale(${p.s})`;p.el.style.opacity=o;
   if(age>p.life){p.el.remove();live.splice(i,1)}}
  if(live.length)requestAnimationFrame(tick);else run=false}
 function burst(x,y,opt={}){const n=opt.n||16,floor=opt.floor??(y+120),spread=opt.spread||1;
  for(let i=0;i<n;i++){const el=document.createElement('img');el.className='fx-p';el.alt='';el.src=SH[i%SH.length];const sz=(opt.size||26)*(0.6+Math.random()*0.8);
   el.style.width=sz+'px';el.style.height=sz+'px';document.body.appendChild(el);
   const a=-Math.PI/2+(Math.random()-.5)*Math.PI*1.2*spread,v=(opt.power||9)*(0.55+Math.random()*0.7);
   live.push({el,x:x-sz/2,y:y-sz/2,vx:Math.cos(a)*v,vy:Math.sin(a)*v,r:Math.random()*360,vr:(Math.random()-.5)*14,s:1,floor:floor-sz/2,t:performance.now(),born:performance.now(),life:(opt.life||1700)+Math.random()*500})}
  if(!run){run=true;requestAnimationFrame(tick)}}
 return{burst}})();
