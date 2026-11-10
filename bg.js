(()=>{const cv=document.getElementById('bg'),x=cv.getContext('2d');
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
const COL=[[120,170,235],[143,200,230],[242,140,40],[255,255,255]];let W,H,B=[],t=0;
function mk(init){const r=6+Math.pow(Math.random(),2)*52;return{x:Math.random()*W,y:init?Math.random()*H:H+r*2,r,v:.25+(60-r)/60*.7,ph:Math.random()*6.28,sw:.4+Math.random()*1.1,c:COL[Math.random()<.2?2:Math.floor(Math.random()*2)],a:.35+Math.random()*.4}}
function size(){const d=devicePixelRatio||1;W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0);
 B=Array.from({length:Math.round(Math.min(48,W*H/22000))},()=>mk(true))}
function bubble(b){const px=b.x+Math.sin(t*.001*b.sw+b.ph)*22,py=b.y,r=b.r,c=b.c.join(',');
 const g=x.createRadialGradient(px-r*.3,py-r*.35,r*.05,px,py,r);
 g.addColorStop(0,`rgba(255,255,255,${.28*b.a})`);g.addColorStop(.6,`rgba(${c},${.07*b.a})`);g.addColorStop(1,`rgba(${c},${.28*b.a})`);
 x.beginPath();x.arc(px,py,r,0,6.283);x.fillStyle=g;x.fill();x.strokeStyle=`rgba(${c},${.5*b.a})`;x.lineWidth=1;x.stroke();
 x.beginPath();x.ellipse(px-r*.35,py-r*.4,r*.22,r*.12,-.7,0,6.283);x.fillStyle=`rgba(255,255,255,${.65*b.a})`;x.fill()}
const D=[],R=[];let lastP=0;
function ripple(px,py,max,a){R.push({x:px,y:py,r:0,max,a})}
function drops(){if(!still&&Math.random()<.04)D.push({x:Math.random()*W,y:-20,v:7+Math.random()*6,ty:H*(.35+Math.random()*.62),l:14+Math.random()*14});
 for(let i=D.length-1;i>=0;i--){const d=D[i];d.y+=d.v;const g=x.createLinearGradient(0,d.y-d.l,0,d.y);g.addColorStop(0,'rgba(190,220,255,0)');g.addColorStop(1,'rgba(200,228,255,.6)');
  x.strokeStyle=g;x.lineWidth=1.6;x.beginPath();x.moveTo(d.x,d.y-d.l);x.lineTo(d.x,d.y);x.stroke();x.beginPath();x.arc(d.x,d.y,1.8,0,6.283);x.fillStyle='rgba(215,235,255,.8)';x.fill();
  if(d.y>=d.ty){ripple(d.x,d.ty,60+Math.random()*70,.7);D.splice(i,1)}}}
function ripples(){for(let i=R.length-1;i>=0;i--){const q=R[i];q.r+=1.1;const k=1-q.r/q.max;if(k<=0){R.splice(i,1);continue}
  for(let n=0;n<3;n++){const rr=q.r-n*11;if(rr<=0)continue;x.beginPath();x.ellipse(q.x,q.y,rr,rr*.38,0,0,6.283);x.strokeStyle=`rgba(${n?'150,195,240':'235,245,255'},${q.a*k*(1-n*.28)*.6})`;x.lineWidth=1.6-n*.4;x.stroke()}
  x.beginPath();x.ellipse(q.x,q.y,q.r*.55,q.r*.2,0,0,6.283);x.fillStyle=`rgba(160,205,245,${q.a*k*.08})`;x.fill()}}
addEventListener('pointermove',e=>{const n=performance.now();if(still||n-lastP<140)return;lastP=n;ripple(e.clientX,e.clientY,55,.55)});
addEventListener('pointerdown',e=>{if(!still)ripple(e.clientX,e.clientY,110,.8)});
function frame(ts){t=ts||0;x.clearRect(0,0,W,H);
 ripples();drops();
 B.forEach((b,i)=>{bubble(b);if(!still){b.y-=b.v;if(b.y<-b.r*2)B[i]=mk(false)}});
 if(!still)requestAnimationFrame(frame)}
addEventListener('resize',size);size();requestAnimationFrame(frame)})();
