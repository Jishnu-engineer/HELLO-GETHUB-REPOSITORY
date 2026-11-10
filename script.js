const IMG=(s,t,sub)=>`<figure class="bleed"><img src="assets/${s}.png" alt="${t}"><figcaption><b>${t}</b><span>${sub}</span></figcaption></figure>`;
const PG=(n,h,inner,tag='')=>`<div class="pg">${tag?`<div class="tag">${tag}</div>`:''}<h2>${h}</h2><div class="rule"></div>${inner}<span class="num">${n}</span></div>`;
const pages=[
`<div class="pg cover"><div class="tag">PLANNING ENGINEER PORTFOLIO</div><img class="photo" src="assets/profile.jpg" alt="Jishnu"><h1>JISHNU</h1><p>Civil Engineer &middot; Project Planning<br>Infrastructure | UAE</p></div>`,
IMG('city','Building infrastructure','Planning the work before it is built'),
PG(2,'A civil engineer focused on planning and project controls',`<img class="avatar" src="assets/profile.jpg" alt="Jishnu"><p>Planning-focused experience on UAE infrastructure projects, with working knowledge of Primavera P6, AutoCAD and Excel for programme development, tracking and reporting.</p><p><b>B.Tech, Civil Engineering</b><br>NIT Calicut (2024) &middot; CGPA 7.5/10</p><p>Exposure to site execution and MEP-related coordination, alongside project documentation and monitoring.</p>`,'PROFESSIONAL PROFILE'),
PG(3,'Planning and project controls',`<ul><li><b>Primavera P6:</b> WBS, logic, baselines, updates, critical path</li><li><b>Progress monitoring:</b> planned vs. actual, productivity, variance</li><li><b>Reporting:</b> weekly reports, lookaheads, dashboards, S-curves</li><li><b>Documentation:</b> material submittal and shop drawing trackers</li><li><b>Risk &amp; delay:</b> registers, constraints, delay events</li><li><b>Tools:</b> Microsoft Excel and AutoCAD</li></ul>`,'CORE COMPETENCIES'),
PG(4,'Construction coordination and planning support',`<img class="thumb" src="assets/road.png" alt="3D road"><ul><li>Infrastructure with utility and roadwork activities</li><li>Coordination of progress, engineering documentation, material and drawing status</li><li>Interfaces: site teams, engineering, subcontractors, suppliers, authorities</li></ul>`,'UAE INFRASTRUCTURE'),
PG(5,'Programme development and schedule control',`<ul><li>Structured WBS, activities, durations, calendars and logic</li><li>Baseline vs. updated programme and start / finish variance</li><li>Critical and near-critical activities and float</li><li><b>Progress:</b> validate site quantities and compare planned vs. actual at work-package level</li><li>Highlight slippage, constraints and corrective actions</li></ul>`,'PRIMAVERA P6 &amp; PROGRESS'),
PG(6,'Connecting the programme with site activities',`<img class="thumb" src="assets/utilities.png" alt="3D utilities"><ul><li>Roads, stormwater, utilities and associated networks</li><li>Permits, utility clearances, approvals and work-front availability can affect planned starts</li></ul>`,'SITE &amp; TECHNICAL EXPOSURE'),
PG(7,'Clear reporting for timely decisions',`<ul><li>Weekly summaries and two-week lookahead</li><li>Submittal register: submission, review, resubmission, approval</li><li>Shop drawing register: planned / actual status</li><li>Risk register: issue, impact, mitigation, owner, date</li><li><b>S-curves:</b> cumulative planned / actual progress</li><li><b>Resources:</b> manpower histograms to flag peaks and gaps</li></ul>`,'REPORTING, S-CURVES &amp; RESOURCES'),
PG(8,'Digital tools used to support delivery',`<img class="thumb" src="assets/scurve.png" alt="3D progress chart"><ul><li><b>Primavera P6</b> schedule, logic, baseline</li><li><b>Excel</b> trackers, formulas, analysis</li><li><b>AutoCAD</b> drawing review and measurement</li></ul><div class="chips"><span>Collect data</span><span>Validate</span><span>Update</span><span>Analyse</span><span>Report</span></div>`,'TOOLS &amp; WORKFLOW'),
PG(9,'Work samples',`<ul><li><div class="ph">P6 programme extract: WBS, logic, milestones</div></li><li><div class="ph">Progress report: planned vs. actual</div></li><li><div class="ph">Submittal / shop drawing tracker</div></li><li><div class="ph">S-curve or manpower histogram</div></li></ul><p style="margin-top:12px">Use only approved, anonymised material.</p>`,'SELECTED SAMPLES'),
`<div class="pg contact"><div class="tag">CONTACT</div><h2>Let's connect</h2><div class="rule"></div><p>Open to planning engineer opportunities in the UAE.</p><a href="mailto:YOUR_EMAIL@example.com">Email</a><a href="https://www.linkedin.com/in/YOUR-PROFILE">LinkedIn</a><a href="tel:+971000000000">Call</a><span class="num">10</span></div>`,
IMG('bridge','Thank you','Jishnu | Planning Engineer')];
const book=document.getElementById('book'),prev=document.getElementById('prev'),next=document.getElementById('next'),count=document.getElementById('count');
let leaves=[],cur=0,mobile=null;
function build(){mobile=innerWidth<=820;book.innerHTML='';
 const items=mobile?pages.map(p=>[p,'']):Array.from({length:pages.length/2},(_,k)=>[pages[2*k],pages[2*k+1]]);
 leaves=items.map(([f,b],k)=>{const l=document.createElement('div');l.className='leaf';
  l.innerHTML=`<div class="face front">${f}</div><div class="face back">${b}</div>`;
  l.addEventListener('click',e=>{if(e.target.closest('a'))return;l.classList.contains('flipped')?go(-1):go(1)});book.appendChild(l);return l});
 cur=Math.min(cur,leaves.length);settle()}
function settle(){leaves.forEach((l,k)=>{l.classList.toggle('flipped',k<cur);l.style.zIndex=k<cur?k+1:leaves.length-k});
 book.dataset.s=mobile?'open':cur===0?'closed':cur===leaves.length?'end':'open';
 prev.disabled=cur===0;next.disabled=cur===leaves.length;
 count.textContent=mobile?`${Math.min(cur+1,leaves.length)} / ${leaves.length}`:cur===0?'Cover':cur===leaves.length?'Back cover':`Pages ${cur*2-1}\u2013${cur*2}`}
function go(d){const n=cur+d;if(n<0||n>leaves.length)return;const l=leaves[d>0?cur:n];l.style.zIndex=leaves.length+5;cur=n;
 leaves.forEach((x,k)=>x.classList.toggle('flipped',k<cur));book.dataset.s=mobile?'open':cur===0?'closed':cur===leaves.length?'end':'open';
 prev.disabled=cur===0;next.disabled=cur===leaves.length;setTimeout(settle,1100)}
prev.onclick=()=>go(-1);next.onclick=()=>go(1);
addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)});
let x0=null;addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)go(dx<0?1:-1);x0=null});
addEventListener('resize',()=>{if((innerWidth<=820)!==mobile){cur=0;build()}});
build();
