const loader = document.querySelector('#loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('done'), 1200));
setTimeout(() => loader.classList.add('done'), 2800);
const header = document.querySelector('#topbar');
const menuButton = document.querySelector('#menuTrigger');
const menuOverlay = document.querySelector('#menuOverlay');
function setMenu(open){document.body.classList.toggle('menu-open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');menuOverlay.setAttribute('aria-hidden',String(!open));}
menuButton.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
menuOverlay.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const parallaxEls=[...document.querySelectorAll('.parallax-media')];
let ticking=false;
function scrollUpdate(){header.classList.toggle('scrolled',window.scrollY>40);if(window.innerWidth>650 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){for(const el of parallaxEls){const rect=el.parentElement.getBoundingClientRect();if(rect.bottom<0||rect.top>window.innerHeight)continue;const offset=(rect.top+rect.height/2-window.innerHeight/2)*-.095;el.style.transform=`translate3d(0,${offset}px,0) scale(1.09)`}}ticking=false}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(scrollUpdate);ticking=true}},{passive:true});scrollUpdate();
const glow=document.getElementById('cursorGlow');
window.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}},{passive:true});

// Reproducción silenciosa en bucle para respetar las políticas de autoplay.
const heroVideo=document.querySelector('#heroVideo');
const videoToggle=document.querySelector('#videoToggle');
if(heroVideo){
  heroVideo.muted=true;
  heroVideo.play().catch(()=>{});
  heroVideo.addEventListener('error',()=>{heroVideo.hidden=true});
  videoToggle?.addEventListener('click',()=>{
    heroVideo.muted=!heroVideo.muted;
    const soundOn=!heroVideo.muted;
    videoToggle.querySelector('.video-toggle-icon').textContent=soundOn?'♫':'♪';
    videoToggle.title=soundOn?'Silenciar video':'Activar sonido';
    videoToggle.setAttribute('aria-label',soundOn?'Silenciar video':'Activar sonido del video');
    heroVideo.play().catch(()=>{});
  });
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)heroVideo.pause();else heroVideo.play().catch(()=>{});
  });
}

// Los videos de las secciones mantienen autoplay silencioso y reproducción en bucle.
for(const video of document.querySelectorAll('.cinematic-video')){
  video.muted=true;video.play().catch(()=>{});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else video.play().catch(()=>{});});
}
