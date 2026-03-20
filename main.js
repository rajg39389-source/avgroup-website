/* AV Group — Shared JavaScript */
'use strict';
(function(){
  /* ── Mobile menu ── */
  var ham=document.getElementById('ham'),mob=document.getElementById('mobMenu');
  if(ham&&mob){
    ham.addEventListener('click',function(){
      var open=mob.classList.toggle('open');
      ham.classList.toggle('open',open);
      ham.setAttribute('aria-expanded',open);
      document.body.style.overflow=open?'hidden':'';
    });
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMob()});
    document.addEventListener('click',function(e){
      if(mob.classList.contains('open')&&!mob.contains(e.target)&&!ham.contains(e.target))closeMob();
    });
  }

  /* ── Nav scroll ── */
  var nav=document.getElementById('navbar'),btt=document.getElementById('btt');
  window.addEventListener('scroll',function(){
    var y=window.scrollY;
    if(nav)nav.classList.toggle('scrolled',y>50);
    if(btt)btt.classList.toggle('show',y>400);
  },{passive:true});

  /* ── Fade-in ── */
  var prefRed=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var items=document.querySelectorAll('.fi');
  if(!prefRed&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('up');io.unobserve(e.target)}});
    },{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el){io.observe(el)});
  } else {
    items.forEach(function(el){el.classList.add('up')});
  }

  /* ── Stats counter ── */
  function animateCount(el){
    var target=parseInt(el.dataset.target,10),suffix='+',current=0;
    var step=Math.max(1,Math.ceil(target/55));
    var iv=setInterval(function(){
      current=Math.min(current+step,target);
      el.textContent=current+suffix;
      if(current>=target)clearInterval(iv);
    },22);
  }
  var strip=document.getElementById('stats-strip');
  if(strip){
    if(!prefRed&&'IntersectionObserver' in window){
      var cio=new IntersectionObserver(function(entries){
        if(entries[0].isIntersecting){
          document.querySelectorAll('[data-target]').forEach(animateCount);
          cio.disconnect();
        }
      },{threshold:0.4});
      cio.observe(strip);
    } else {
      document.querySelectorAll('[data-target]').forEach(function(el){el.textContent=el.dataset.target+'+'});
    }
  }

  /* ── Smooth scroll offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=this.getAttribute('href').slice(1),target=document.getElementById(id);
      if(target){
        e.preventDefault();
        var navH=(document.getElementById('navbar')||{offsetHeight:70}).offsetHeight;
        window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+window.scrollY-navH-8),behavior:'smooth'});
        closeMob();
      }
    });
  });

  /* ── Form submit ── */
  var form=document.getElementById('cform');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var n=(this.querySelector('[name=name]')||{}).value||'';
      var p=(this.querySelector('[name=phone]')||{}).value||'';
      var s=(this.querySelector('[name=service]')||{}).value||'';
      if(!n.trim()||!p.trim()||!s){alert('Please fill in Name, Phone, and Service.');return}
      var msg=document.getElementById('successMsg');
      if(msg){msg.classList.add('show');msg.scrollIntoView({behavior:'smooth',block:'nearest'});setTimeout(function(){msg.classList.remove('show')},9000)}
      this.reset();
    });
  }
})();

function closeMob(){
  var mob=document.getElementById('mobMenu'),ham=document.getElementById('ham');
  if(mob)mob.classList.remove('open');
  if(ham){ham.classList.remove('open');ham.setAttribute('aria-expanded','false')}
  document.body.style.overflow='';
}
