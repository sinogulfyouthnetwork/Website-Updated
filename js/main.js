/* SGYN V2 — shared behaviors: mobile nav, reveal-on-scroll, metric count-up */
(function(){
  document.documentElement.classList.add('js');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* mobile menu */
  var burger=document.querySelector('.burger'), mm=document.querySelector('.mobile-menu');
  if(burger&&mm){
    burger.addEventListener('click',function(){
      var open=mm.classList.toggle('open');
      document.body.classList.toggle('menu-open',open);
      burger.setAttribute('aria-expanded',open);
    });
  }

  /* dropdown: tap-to-open on touch devices */
  document.querySelectorAll('.dd > a').forEach(function(a){
    a.addEventListener('click',function(e){
      var dd=a.parentElement;
      if(matchMedia('(hover: none)').matches && !dd.classList.contains('open')){
        e.preventDefault(); dd.classList.add('open');
        document.addEventListener('click',function close(ev){
          if(!dd.contains(ev.target)){dd.classList.remove('open');document.removeEventListener('click',close);}
        });
      }
    });
  });

  /* reveal on scroll */
  var rvs=document.querySelectorAll('.rv');
  if(reduce){rvs.forEach(function(el){el.classList.add('in')});}
  else{
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
    },{threshold:.1,rootMargin:'0px 0px -5% 0px'});
    rvs.forEach(function(el){io.observe(el)});
    // failsafe: anything still hidden after 6s becomes visible
    setTimeout(function(){rvs.forEach(function(el){el.classList.add('in')})},6000);
  }

  /* team roster: photo follows the cursor (fine pointers only; touch gets tap→bio) */
  if(matchMedia('(hover: hover) and (pointer: fine)').matches){
    document.querySelectorAll('.roster').forEach(function(roster){
      var float=roster.parentElement.querySelector('.float-photo');
      if(!float)return;
      var img=float.querySelector('img');
      roster.querySelectorAll('[data-photo]').forEach(function(r){(new Image()).src=r.dataset.photo});
      var x=0,y=0,raf=null;
      roster.addEventListener('mousemove',function(e){
        x=e.clientX;y=e.clientY;
        if(!raf)raf=requestAnimationFrame(function(){
          float.style.transform='translate('+(x+28)+'px,'+(y-130)+'px) rotate(-4deg)';raf=null;
        });
      });
      roster.querySelectorAll('.roster-row').forEach(function(row){
        row.addEventListener('mouseenter',function(){
          if(row.dataset.photo){img.src=row.dataset.photo;float.classList.add('on');}
        });
        row.addEventListener('mouseleave',function(){float.classList.remove('on')});
      });
      roster.addEventListener('mouseleave',function(){float.classList.remove('on')});
    });
  }

  /* metric count-up */
  var mio=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return; mio.unobserve(e.target);
      var b=e.target, target=+b.dataset.count, suf=b.dataset.suffix||'';
      if(reduce){b.textContent=target+suf;return;}
      var t0=null;
      function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/1200,1);
        b.textContent=Math.round(target*(1-Math.pow(1-p,3)))+suf;
        if(p<1)requestAnimationFrame(step);}
      requestAnimationFrame(step);
      setTimeout(function(){b.textContent=target+suf},1600); // rAF-throttle failsafe
    });
  },{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(b){mio.observe(b)});
})();
