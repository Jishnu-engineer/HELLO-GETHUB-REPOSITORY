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
function frame(ts){t=ts||0;x.clearRect(0,0,W,H);
 B.forEach((b,i)=>{bubble(b);if(!still){b.y-=b.v;if(b.y<-b.r*2)B[i]=mk(false)}});
 if(!still)requestAnimationFrame(frame)}
addEventListener('resize',size);size();requestAnimationFrame(frame)})();
