function toggleMenu(){const nav=document.getElementById('nav');if(nav)nav.classList.toggle('show')}
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav')?.classList.remove('show')));
const eventDate=new Date('2026-08-30T00:00:00+01:00').getTime();
function countdown(){
 const box=document.getElementById('countdown');if(!box)return;
 if(Date.now()>=eventDate){box.hidden=true;let status=document.getElementById('eventStatus');if(!status){status=document.createElement('p');status.id='eventStatus';status.className='form-message';box.insertAdjacentElement('afterend',status)}status.textContent='This anniversary celebration has passed. Contact the ministry for upcoming events.';return}
 const d=eventDate-Date.now(), values=[Math.floor(d/86400000),Math.floor(d%86400000/3600000),Math.floor(d%3600000/60000),Math.floor(d%60000/1000)];
 ['days','hours','minutes','seconds'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=values[i]});
}
countdown();setInterval(countdown,1000);
const form=document.getElementById('prayerForm');
if(form){form.addEventListener('submit',async e=>{e.preventDefault();const msg=document.getElementById('prayerMessage');const data=Object.fromEntries(new FormData(form).entries());msg.textContent='Sending...';try{const r=await fetch('/api/prayer-request',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await r.json();msg.textContent=result.message;if(result.success)form.reset()}catch(err){msg.textContent='Could not send the request. Please try again.'}})}
const contactForm=document.getElementById('contactForm');
if(contactForm){contactForm.addEventListener('submit',async e=>{
 e.preventDefault();const msg=document.getElementById('contactMessage'),button=contactForm.querySelector('button[type="submit"]');
 const data=Object.fromEntries(new FormData(contactForm).entries());msg.textContent='Sending...';button.disabled=true;
 try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await r.json();msg.textContent=result.message;if(result.success)contactForm.reset()}
 catch(err){msg.textContent='Could not send your message. Please use WhatsApp or phone instead.'}
 finally{button.disabled=false}
})}
