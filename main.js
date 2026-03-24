/* AV Group — main.js */
'use strict';

// ── NAV SCROLL ──
const nav = document.getElementById('navbar');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if(nav) nav.classList.toggle('scrolled', y > 40);
  const btt = document.getElementById('btt');
  if(btt) btt.classList.toggle('show', y > 400);
  lastY = y;
}, { passive: true });

// ── HAMBURGER ──
const ham = document.getElementById('ham');
const mob = document.getElementById('mobMenu');
if(ham && mob) {
  ham.addEventListener('click', () => {
    const open = mob.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
}
window.closeMob = function() {
  if(mob) mob.classList.remove('open');
  if(ham) { ham.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); }
  document.body.style.overflow = '';
};

// ── FADE IN ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('up'); observer.unobserve(e.target); } });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.fi').forEach(el => observer.observe(el));

// ── STATS COUNTER ──
const numObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.getAttribute('data-target') || '0');
    const suffix = el.getAttribute('data-suffix') || '';
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString() + (progress < 1 ? '' : '+') + suffix;
      if(progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    numObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => numObserver.observe(el));
