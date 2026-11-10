(()=>{const cv=document.getElementById('bg'),x=cv.getContext('2d');
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
const COL=[[91,127,166],[143,169,196],[242,140,40]];let W,H,cubes=[],t=0;
function size(){const d=devicePixelRatio||1;W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0);
 const n=Math.round(Math.min(26,W*H/50000));cubes=Array.from({length:n},()=>mk(true))}
function mk(init){const s=22+Math.random()*60;return{x:Math.random()*W,y:init?Math.random()*H:H+s*2,s,v:.15+Math.random()*.35,ph:Math.random()*6.28,c:COL[Math.random()<.22?2:Math.random()<.5?0:1],a:.12+Math.random()*.18}}
function cube(c){const s=c.s,hx=s*.866,hy=s*.5,X=c.x+Math.sin(t*.0006+c.ph)*18,Y=c.y,col=`${c.c[0]},${c.c[1]},${c.c[2]}`;
 const face=(p,f)=>{x.beginPath();p.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.closePath();x.fillStyle=`rgba(${col},${c.a*f})`;x.fill();x.strokeStyle=`rgba(${col},${Math.min(.6,c.a*2.2)})`;x.lineWidth=1;x.stroke()};
 face([[X,Y-s],[X+hx,Y-s+hy],[X,Y-s+2*hy],[X-hx,Y-s+hy]],1.3);
 face([[X-hx,Y-s+hy],[X,Y-s+2*hy],[X,Y+2*hy],[X-hx,Y+hy]],.7);
 face([[X+hx,Y-s+hy],[X,Y-s+2*hy],[X,Y+2*hy],[X+hx,Y+hy]],.45)}
function grid(){x.lineWidth=1;const g=70,o=(t*.02)%g;x.strokeStyle='rgba(143,169,196,.07)';x.beginPath();
 for(let i=-g;i<W+g;i+=g){x.moveTo(i+o,0);x.lineTo(i+o,H)}for(let j=-g;j<H+g;j+=g){x.moveTo(0,j+o);x.lineTo(W,j+o)}x.stroke();
 const y=(t*.12)%(H+200)-100,gr=x.createLinearGradient(0,y-60,0,y+60);gr.addColorStop(0,'rgba(242,140,40,0)');gr.addColorStop(.5,'rgba(242,140,40,.10)');gr.addColorStop(1,'rgba(242,140,40,0)');x.fillStyle=gr;x.fillRect(0,y-60,W,120)}
function frame(ts){t=ts||0;x.clearRect(0,0,W,H);grid();cubes.forEach((c,i)=>{cube(c);if(!still){c.y-=c.v;if(c.y<-c.s*2)cubes[i]=mk(false)}});if(!still)requestAnimationFrame(frame)}
addEventListener('resize',size);size();requestAnimationFrame(frame)})();
