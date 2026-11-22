(function(){
  var hi = document.documentElement.lang === 'hi';
  // mobile menu
  var mb = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
  if (mb && nav) {
    mb.addEventListener('click', function(){ var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); });
  }
  // reveal on scroll
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold: .1});
    els.forEach(function(el){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add('in'); }); }

  // lightbox
  var lb = document.getElementById('lb');
  if (lb) {
    var li = lb.querySelector('img'), lc = lb.querySelector('p'), lx = lb.querySelector('button');
    document.querySelectorAll('.gal figure').forEach(function(f){
      f.tabIndex = 0;
      function open(){ var im = f.querySelector('img'); li.src = im.src; li.alt = im.alt; lc.textContent = f.querySelector('figcaption').textContent; lb.classList.add('open'); lx.focus(); }
      f.addEventListener('click', open);
      f.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    function close(){ lb.classList.remove('open'); }
    lx.addEventListener('click', close);
    lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
  }

  // enquiry form -> WhatsApp (static hosting, no server)
  var form = document.getElementById('inq'), fm = document.getElementById('fmsg');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (!form.checkValidity()) {
        fm.className = 'fmsg err';
        fm.textContent = hi ? 'कृपया नाम, सही ईमेल और संदेश भरें।' : 'Please fill in your name, a valid email and a message.';
        return;
      }
      var d = new FormData(form);
      var txt = 'Website enquiry (SMNTGVSS)\nName: ' + d.get('name') + '\nOrganization: ' + (d.get('org') || '-') + '\nEmail: ' + d.get('email') + '\nPhone: ' + (d.get('phone') || '-') + '\nType: ' + d.get('type') + '\n\n' + d.get('msg');
      var url = 'https://wa.me/919118805877?text=' + encodeURIComponent(txt.slice(0, 1800));
      var w = window.open(url, '_blank', 'noopener');
      fm.className = 'fmsg ok'; fm.textContent = '';
      var s = document.createElement('span');
      s.textContent = hi ? 'व्हाट्सऐप खुल रहा है — वहाँ "Send" दबाकर संदेश भेजें। न खुले तो ' : 'Opening WhatsApp — press "Send" there to deliver your message. If it does not open, ';
      var a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = hi ? 'यहाँ क्लिक करें' : 'click here';
      var s2 = document.createElement('span'); s2.textContent = hi ? ' या smntbanda24@gmail.com पर ईमेल करें।' : ' or email smntbanda24@gmail.com.';
      fm.append(s, a, s2);
      if (w) form.reset();
    });
  }
  var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
})();
document.querySelectorAll('[data-copy]').forEach(function(b){
  b.addEventListener('click',function(){
    var hi=document.documentElement.lang==='hi', m=document.getElementById('cpmsg'), v=b.getAttribute('data-copy');
    function show(ok){ if(!m) return; m.className='fmsg '+(ok?'ok':'err'); m.textContent= ok ? (hi?'कॉपी हो गया: ':'Copied: ')+v : (hi?'कॉपी नहीं हो सका, कृपया हाथ से लिखें: ':'Could not copy — please note: ')+v; }
    try{ navigator.clipboard.writeText(v).then(function(){show(true)},function(){show(false)}); }catch(e){ show(false); }
  });
});
