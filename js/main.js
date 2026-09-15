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

  /* text roll hover: each letter rolls up, a twin rolls in from below */
  document.querySelectorAll('[data-roll]').forEach(function(el){
    var txt=(el.textContent||'').trim(), arrow='';
    if(/\s→$/.test(txt)){arrow='→';txt=txt.replace(/\s*→$/,'');}
    var html='';
    txt.split('').forEach(function(c,i){
      var ch=(c===' ')?'&nbsp;':c.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      var d=' style="transition-delay:'+(i*18)+'ms"';
      html+='<span class="tr"><i'+d+'>'+ch+'</i><i'+d+'>'+ch+'</i></span>';
    });
    if(arrow)html+=' <span class="roll-arrow">→</span>';
    el.innerHTML=html;
  });

  /* navbar: pill that glides between links on hover (desktop only) */
  var navlinks=document.querySelector('.navlinks');
  if(navlinks && matchMedia('(hover: hover)').matches){
    var pill=document.createElement('span');
    pill.className='nav-pill';
    navlinks.insertBefore(pill,navlinks.firstChild);
    var shown=false;
    navlinks.querySelectorAll(':scope > a, :scope > .dd > a').forEach(function(t){
      t.addEventListener('mouseenter',function(){
        var r=t.getBoundingClientRect(), nr=navlinks.getBoundingClientRect();
        if(!shown){pill.classList.add('snap');}
        pill.style.width=(r.width+20)+'px';
        pill.style.height=(r.height+12)+'px';
        pill.style.transform='translate('+(r.left-nr.left-10)+'px,'+(r.top-nr.top-6)+'px)';
        if(!shown){pill.offsetWidth;pill.classList.remove('snap');shown=true;}
        pill.classList.add('on');
      });
    });
    navlinks.addEventListener('mouseleave',function(){pill.classList.remove('on');shown=false;});
  }
})();
