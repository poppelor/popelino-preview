/* Popelino world skins: SVG sticker overlays mapped onto the FLISAT photo (viewBox = photo pixels) */
const R={TL:"246,307 573,79 801,179 801,653 246,653",TR:"830,186 1143,314 1143,653 830,653",BL:"247,717 576,717 576,1025 247,1025",BR:"608,717 1134,717 1134,1025 608,1025"};
let UID=0;
const chimney=()=>"";const _chim=(c1)=>`<g><rect x="955" y="118" width="70" height="110" rx="6" fill="${c1}"/><rect x="945" y="106" width="90" height="22" rx="8" fill="#8f6f66"/><g class="smoke" fill="#fff"><circle cx="990" cy="80" r="22" opacity=".0"/><circle cx="990" cy="80" r="26" opacity=".0"/><circle cx="990" cy="80" r="20" opacity=".0"/></g></g>`;
const awning=(y,x1,x2,a,b,n=11)=>{const w=(x2-x1)/n;let s='';for(let i=0;i<n;i++){const x=x1+i*w;s+=`<path d="M${x} ${y} h${w} v38 a${w/2} ${w/2*0.7} 0 0 1 ${-w} 0z" fill="${i%2?b:a}"/>`}return `<g class="wag" filter="url(#sh${UID})">${s}</g>`};
const sign=(x,y,w,txt,bg,fg,bulbs)=>{let b='';if(bulbs){for(let i=0;i<8;i++)b+=`<circle class="blink" cx="${x+20+i*(w-40)/7}" cy="${y+8}" r="7" fill="#ffe6a3"/>`}
 return `<g filter="url(#sh${UID})"><rect x="${x}" y="${y}" width="${w}" height="74" rx="37" fill="${bg}" stroke="#fff" stroke-width="7"/><text x="${x+w/2}" y="${y+51}" text-anchor="middle" font-family="Playpen" font-weight="800" font-size="40" fill="${fg}">${txt}</text>${b}</g>`};
function wrap(inner,extra=''){UID++;const u=UID;
 return `<svg viewBox="0 0 1312 1199" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs>
 <filter id="sh${u}" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity=".25"/></filter>
 ${Object.entries(R).map(([k,p])=>`<clipPath id="c${k}${u}"><polygon points="${p}"/></clipPath>`).join('')}${extra.replaceAll('$U',u)}</defs>${inner.replaceAll('$U',u)}</svg>`}
const room=(k,body)=>`<g clip-path="url(#c${k}$U)">${body}</g>`;
const fillR=(k,f)=>`<polygon points="${R[k]}" fill="${f}"/>`;
function products(x1,y1,x2,y2,seed){const cols=['#d77a6a','#e8c75a','#9fb8ad','#8fa3c4','#e1cdc8','#c4968a','#f1e0b5'];let s='',r=seed;
 for(let y=y1+70;y<y2;y+=95){s+=`<rect x="${x1}" y="${y}" width="${x2-x1}" height="12" fill="#c8a882"/>`;for(let x=x1+12;x<x2-40;x+=r%2?44:52){r=(r*7+3)%97;const c=cols[r%cols.length],h=34+r%30;
 s+=r%3==0?`<circle cx="${x+18}" cy="${y-18}" r="18" fill="${c}"/>`:r%3==1?`<rect x="${x}" y="${y-h}" width="36" height="${h}" rx="5" fill="${c}"/><rect x="${x+6}" y="${y-h+10}" width="24" height="8" rx="3" fill="#fff" opacity=".7"/>`:`<rect x="${x+6}" y="${y-h-8}" width="24" height="${h+8}" rx="10" fill="${c}"/><rect x="${x+11}" y="${y-h-16}" width="14" height="12" rx="3" fill="#666"/>`}}return s}
const cone=(x,y,c1,c2)=>`<g filter="url(#sh$U)"><path d="M${x-26} ${y} L${x} ${y+80} L${x+26} ${y}z" fill="#e2b77a"/><path d="M${x-20} ${y+8} l34 30 M${x+20} ${y+8} l-34 30" stroke="#c99a5c" stroke-width="3"/><g class="bounce"><circle cx="${x}" cy="${y-14}" r="30" fill="${c1}"/><circle cx="${x}" cy="${y-50}" r="24" fill="${c2}"/><circle cx="${x+6}" cy="${y-74}" r="7" fill="#d77a6a"/></g></g>`;
const tree=(x,y,s,c)=>`<g class="sway"><rect x="${x-6*s}" y="${y}" width="${12*s}" height="${40*s}" fill="#a07c5a"/><path d="M${x} ${y-110*s} L${x+55*s} ${y+5} L${x-55*s} ${y+5}z" fill="${c}"/><path d="M${x} ${y-150*s} L${x+40*s} ${y-60*s} L${x-40*s} ${y-60*s}z" fill="${c}" opacity=".85"/></g>`;
const WORLDS={
home:{name:'בית',emoji:'🏡',color:'#e1cdc8',tag:'בית מתוק',
 svg:()=>wrap(`<image href="${window.PB||""}assets/home.webp" width="1312" height="1199"/>${chimney()}
 <g class="lamp"><line x1="520" y1="180" x2="520" y2="300" stroke="#606060" stroke-width="4"/><path d="M480 300 h80 l-15 -40 h-50z" fill="#bdd1c8"/><circle class="glow" cx="520" cy="310" r="12" fill="#ffe6a3"/></g>
 <g class="sway"><rect x="1030" y="560" width="60" height="70" rx="10" fill="#c4968a"/><path d="M1060 560 q-40 -60 -10 -110 q20 50 10 110 q30 -70 50 -60 q-10 50 -50 60" fill="#7f9c8e"/></g>`)},
market:{name:'סופר',emoji:'🛒',color:'#bdd1c8',tag:'סופרמרקט',
 svg:()=>wrap(['TL','TR','BL','BR'].map((k,i)=>room(k,fillR(k,i%2?'#f3ece0':'#f8f2e8')+products(...[[246,180,801,653],[830,250,1143,653],[247,717,576,1025],[608,717,1134,1025]][i],i*13+5))).join('')+
 awning(640,230,1160,'#d77a6a','#fff7ec',12)+sign(440,560,430,'סופר פופלינו','#fff','#d77a6a',true)+chimney()+
 `<g class="roll"><g filter="url(#sh$U)"><rect x="1000" y="955" width="90" height="50" rx="8" fill="#5f7d6f"/><circle cx="1015" cy="1015" r="10" fill="#363636"/><circle cx="1075" cy="1015" r="10" fill="#363636"/><circle cx="1030" cy="948" r="12" fill="#d77a6a"/><circle cx="1058" cy="944" r="14" fill="#e8c75a"/></g></g>`)},
ice:{name:'גלידה',emoji:'🍦',color:'#f3d6d8',tag:'גלידריה',
 svg:()=>wrap(['TL','TR','BL','BR'].map(k=>room(k,fillR(k,'#f6dfe0')+fillR(k,`url(#st$U)`))).join('')+
 cone(420,420,'#bdd1c8','#f3c7cf')+cone(560,460,'#f1e0b5','#c7bcce')+cone(990,450,'#f3c7cf','#bdd1c8')+
 `<g filter="url(#sh$U)"><rect x="300" y="850" width="230" height="170" rx="16" fill="#fff"/><rect x="315" y="865" width="200" height="60" rx="10" fill="#cfe5dc"/>${[0,1,2,3].map(i=>`<circle cx="${340+i*50}" cy="895" r="18" fill="${['#f3c7cf','#f1e0b5','#c7bcce','#bdd1c8'][i]}"/>`).join('')}</g>
 <g class="spin"><circle cx="870" cy="860" r="70" fill="#fff" filter="url(#sh$U)"/><path d="M870 790 v140 M800 860 h140 M820 810 l100 100 M920 810 l-100 100" stroke="#f3c7cf" stroke-width="16"/></g>`+
 awning(640,230,1160,'#f3c7cf','#fff',12)+sign(470,560,370,'גלידה','#fff','#c4768a',true)+chimney('#f3c7cf'),
 `<pattern id="st$U" width="80" height="80" patternUnits="userSpaceOnUse"><rect width="40" height="80" fill="#fff" opacity=".55"/></pattern>`)},
pizza:{name:'פיצה',emoji:'🍕',color:'#f1e0b5',tag:'פיצריה',
 svg:()=>wrap(room('TL',fillR('TL','#dfe8dc'))+room('TR',fillR('TR','#dfe8dc'))+['BL','BR'].map(k=>room(k,fillR(k,'#fff')+fillR(k,`url(#tl$U)`))).join('')+
 `<g filter="url(#sh$U)"><circle cx="520" cy="430" r="140" fill="#e2b77a"/><circle cx="520" cy="430" r="118" fill="#e07a5f"/><circle cx="520" cy="430" r="104" fill="#f6e2a8" opacity=".9"/>${[[480,380],[570,400],[500,480],[575,475],[450,440]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="17" fill="#c0503c"/>`).join('')}<path d="M520 430 l90 -50" stroke="#e2b77a" stroke-width="6"/></g>
 <g class="steam" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"><path d="M480 270 q-20 -30 0 -60 q20 -30 0 -60"/><path d="M530 270 q-20 -30 0 -60 q20 -30 0 -60"/><path d="M580 270 q-20 -30 0 -60 q20 -30 0 -60"/></g>
 <g filter="url(#sh$U)"><path d="M700 1025 v-150 a170 140 0 0 1 340 0 v150z" fill="#c4968a"/><path d="M760 1025 v-120 a110 90 0 0 1 220 0 v120z" fill="#363636"/><g class="glow"><path d="M790 1010 q40 -70 80 -20 q40 -60 80 20z" fill="#f2a65a"/></g></g>
 <g filter="url(#sh$U)"><rect x="880" y="330" width="210" height="240" rx="14" fill="#fff"/><text x="985" y="385" text-anchor="middle" font-family="Playpen" font-weight="700" font-size="32" fill="#5f7d6f">תפריט</text>${[0,1,2,3].map(i=>`<rect x="910" y="${410+i*36}" width="${150-i*15}" height="12" rx="6" fill="#e1cdc8"/>`).join('')}</g>`+
 awning(640,230,1160,'#5f7d6f','#fff',12)+sign(470,560,370,'פיצריה','#fff','#c0503c',true)+chimney('#c4968a'),
 `<pattern id="tl$U" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="none" stroke="#d7e3d9" stroke-width="5"/></pattern>`)},
forest:{name:'יער',emoji:'🌲',color:'#c7bcce',tag:'בקתה ביער',
 svg:()=>wrap(['TL','TR'].map(k=>room(k,fillR(k,'#d9e6de'))).join('')+['BL','BR'].map(k=>room(k,fillR(k,'#e9e1d2'))).join('')+
 room('TL',`<circle cx="650" cy="290" r="60" fill="#f1e0b5" class="twinkle"/>`+tree(330,560,1,'#7f9c8e')+tree(470,560,1.3,'#9fb8ad')+tree(640,560,1,'#7f9c8e')+`<g class="bird"><path d="M700 250 q15 -15 30 0 q15 -15 30 0" stroke="#606060" stroke-width="5" fill="none"/></g>`)+
 room('TR',tree(920,600,1,'#9fb8ad')+tree(1060,600,.9,'#7f9c8e')+`<path class="twinkle" d="M1000 380 l8 16 18 2-13 12 4 18-17-9-17 9 4-18-13-12 18-2z" fill="#f1e0b5"/>`)+
 room('BL',`<g class="sway"><path d="M330 1025 v-60 h30 v60z" fill="#fff"/><ellipse cx="345" cy="965" rx="55" ry="35" fill="#d77a6a"/>${[0,1,2].map(i=>`<circle cx="${320+i*25}" cy="${955+(i%2)*10}" r="7" fill="#fff"/>`).join('')}</g><g class="sway"><path d="M470 1025 v-40 h20 v40z" fill="#fff"/><ellipse cx="480" cy="985" rx="38" ry="24" fill="#c4968a"/></g>`)+
 room('BR',`<g filter="url(#sh$U)"><circle cx="870" cy="900" r="80" fill="#a07c5a"/><circle cx="845" cy="880" r="22" fill="#fff"/><circle cx="895" cy="880" r="22" fill="#fff"/><circle class="blink" cx="845" cy="882" r="11" fill="#363636"/><circle class="blink" cx="895" cy="882" r="11" fill="#363636"/><path d="M860 905 l10 14 10 -14z" fill="#e8c75a"/><path d="M800 830 l20 30 M940 830 l-20 30" stroke="#a07c5a" stroke-width="16" stroke-linecap="round"/></g>`)+
 sign(470,560,370,'בקתה ביער','#fff','#5f7d6f',false)+chimney('#a07c5a'))}
};
const ORDER=['home','market','ice','pizza','forest'];
function skinEl(key){const d=document.createElement('div');d.className='layer';d.innerHTML=WORLDS[key].svg();d.dataset.w=key;return d}
function worldButtons(el,onPick,active){el.innerHTML=ORDER.map(k=>`<button class="wb${k==active?' on':''}" data-k="${k}" style="background:${WORLDS[k].color}"><div><span>${WORLDS[k].emoji}</span>${WORLDS[k].name}</div></button>`).join('');
 el.querySelectorAll('.wb').forEach(b=>b.onclick=()=>{el.querySelectorAll('.wb').forEach(x=>x.classList.toggle('on',x==b));onPick(b.dataset.k)})}
/* hand-applied sticker wipe: diagonal corner-to-corner reveal + squeegee sheen */
function applyWipe(house,key,done){const L=skinEl(key);L.style.clipPath='polygon(100% 0,100% 0,100% 0)';house.appendChild(L);
 const sheen=document.createElement('div');sheen.style.cssText='position:absolute;inset:-50%;z-index:15;pointer-events:none;background:linear-gradient(135deg,transparent 46%,#ffffffcc 49%,#fff 50%,#ffffff55 52%,transparent 56%);transform:translate(50%,-50%)';house.appendChild(sheen);
 const t0=performance.now(),D=1100;
 (function f(t){let p=Math.min(1,(t-t0)/D);p=1-Math.pow(1-p,3);const s=p*200;
  L.style.clipPath=`polygon(100% 0,${100-s}% 0,${100-s+0}% 0,100% ${s}%)`;
  L.style.clipPath=`polygon(100% 0, ${100-s}% 0, 100% ${s}%)`;
  if(s>100)L.style.clipPath=`polygon(100% 0, 0 0, 0 ${s-100}%, ${100-(s-100)}% 100%, 100% 100%)`;
  sheen.style.transform=`translate(${50-p*100}%,${-50+p*100}%)`;
  L.style.transform=`scale(${1.02-p*.02})`;
  if(p<1)requestAnimationFrame(f);else{L.style.clipPath='';sheen.remove();[...house.querySelectorAll('.layer')].forEach(x=>x!==L&&x.remove());done&&done()}})(t0)}
