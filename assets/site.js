/* Templetrees International — concept prototype.
   Builds the shared header, menu and footer, and runs the small animations. */
(function () {
  'use strict';

  var PHONE = '94777757174';
  var WA_TEXT = encodeURIComponent('Hello, I would like to begin a conversation about my property.');
  var WA_URL = 'https://wa.me/' + PHONE + '?text=' + WA_TEXT;
  var page = document.body.getAttribute('data-page') || '';
  var overHero = document.body.hasAttribute('data-over-hero');
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- opening loader: the temple tree grows, leaf by leaf ----------
     Plays on the home page, and on whichever page a visitor opens first.
     The tree is a vector redraw of the Templetrees mark. */
  var loaderActive = root.classList.contains('tt-loading');
  if (loaderActive) {
    // base x, base y, angle, length, width, growth order, gold
    var LEAVES = [
      [26.5, 63.9, -90, 22, 10.6, 0], [76.5, 63.9, 90, 22, 10.6, 0],
      [43.01, 73.68, -154.6, 21.2, 11, 1], [59.99, 73.68, 154.6, 21.2, 11, 1],
      [32.04, 71.25, -137.8, 20.8, 11.1, 2], [70.96, 71.25, 137.8, 20.8, 11.1, 2],
      [50.42, 64.62, -45, 19.7, 10.5, 3], [52.58, 64.62, 45, 19.7, 10.5, 3],
      [32.09, 59.33, -33.8, 21, 11.1, 4], [70.91, 59.33, 33.8, 21, 11.1, 4],
      [40.61, 43.38, -35.1, 20, 10.7, 5], [62.39, 43.38, 35.1, 20, 10.7, 5],
      [51.5, 26.9, 0, 22, 10.9, 6],
      [51.5, 53.9, 0, 23, 11.8, 7, 1]
    ];
    var TRUNK = 'M26 62.3L46.5 64.6Q51 65 51 68L51 194.5L37 194.5Q46.2 193 46.4 182L46.4 70.2Q46.1 68.2 44 68L26 65.4Z';
    var leaves = LEAVES.map(function (l) {
      var c = (l[4] / 1.5).toFixed(2), a = (-0.18 * l[3]).toFixed(2), b = (-0.82 * l[3]).toFixed(2);
      var sway = l[2] < 0 ? -16 : l[2] > 0 ? 16 : 0;
      return '<g transform="translate(' + l[0] + ' ' + l[1] + ') rotate(' + l[2] + ')"><path class="lf' + (l[6] ? ' gold' : '') +
        '" style="--i:' + l[5] + ';--s:' + sway + 'deg" d="M0 0C' + c + ' ' + a + ' ' + c + ' ' + b + ' 0 ' + (-l[3]) +
        'C-' + c + ' ' + b + ' -' + c + ' ' + a + ' 0 0Z"/></g>';
    }).join('');
    var loader = document.createElement('div');
    loader.className = 'loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = '<svg viewBox="0 0 103 199">' +
      '<defs><radialGradient id="tt-glow"><stop offset="0" stop-color="#E0A83A" stop-opacity=".85"/><stop offset="1" stop-color="#E0A83A" stop-opacity="0"/></radialGradient></defs>' +
      '<circle class="glow" cx="51.5" cy="42.4" r="24" fill="url(#tt-glow)"/>' +
      '<g class="trunk"><path d="' + TRUNK + '"/><path d="' + TRUNK + '" transform="matrix(-1 0 0 1 103 0)"/></g>' +
      leaves + '</svg><div class="loader-word">TEMPLETREES<small>INTERNATIONAL</small></div>';
    document.body.appendChild(loader);
    root.classList.add('tt-busy');
    root.classList.remove('tt-loading');
    try { sessionStorage.setItem('tt-seen', '1'); } catch (e) { /* private mode */ }

    var started = Date.now(), minTime = reduce ? 900 : 2700, finished = false;
    var finish = function () {
      if (finished) return;
      finished = true;
      loader.classList.add('out');
      root.classList.remove('tt-busy');
      setTimeout(function () { window.dispatchEvent(new Event('tt-loaded')); }, 250);
      setTimeout(function () { loader.parentNode && loader.parentNode.removeChild(loader); }, 1100);
    };
    var whenReady = function () { setTimeout(finish, Math.max(0, minTime - (Date.now() - started))); };
    if (document.readyState === 'complete') whenReady(); else window.addEventListener('load', whenReady);
    setTimeout(finish, 6000);                 // never hold the page longer than this
    loader.addEventListener('click', finish); // a tap skips it
  }

  var WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/>' +
    '<path fill="#25D366" d="M8.6 7.3c.2-.4.5-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6.5.9 1.2 1.6 2 2.1.3.2.5.2.6 0l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.4.5 0 .5-.2 1.4-1 1.8-.7.4-1.6.5-3.2-.2-2-.9-3.5-2.8-4-3.6-.4-.7-.9-1.8-.5-3z"/></svg>';

  var NAV = [
    { href: 'index.html#practice', label: 'The Practice', key: '' },
    { href: 'index.html#pillars', label: 'What we do', key: 'turnaround' },
    { href: 'index.html#approach', label: 'How we work', key: '' },
    { href: 'reef-villa.html', label: 'Proof', key: 'reef' },
    { href: 'contact.html', label: 'Contact', key: 'contact' }
  ];

  function brand() {
    return '<a class="brand" href="index.html" aria-label="Templetrees International, home">' +
      '<img class="on-dark-logo" src="assets/img/logo.png" alt="" width="26" height="50">' +
      '<img class="on-light" src="assets/img/logo-dark.png" alt="" width="26" height="50">' +
      '<span class="rule"></span><span class="word">TEMPLETREES<small>INTERNATIONAL</small></span></a>';
  }
  function lang() {
    return '<div class="lang" role="group" aria-label="Language">' +
      '<button type="button" aria-pressed="true">EN</button>' +
      '<button type="button" aria-pressed="false" data-lang="Thai">TH</button>' +
      '<button type="button" aria-pressed="false" data-lang="Vietnamese">VI</button></div>';
  }

  /* ---------- concept ribbon + header ---------- */
  var links = NAV.map(function (n) {
    return '<a href="' + n.href + '"' + (n.key && n.key === page ? ' aria-current="page"' : '') + '>' + n.label + '</a>';
  }).join('');

  var top = document.createElement('div');
  top.innerHTML =
    '<div class="concept"><b>CONCEPT</b> A website prototype prepared by Vikum Devinda for Templetrees International. Not the live site.</div>' +
    '<header class="site-header' + (overHero ? ' over' : '') + '"><div class="wrap nav">' + brand() +
    '<nav class="links" aria-label="Main">' + links + '</nav>' +
    '<div class="nav-right">' + lang() + '<a class="btn" href="contact.html">Begin a conversation</a></div>' +
    '<button class="burger" type="button" aria-label="Open menu" aria-expanded="false"><i></i><i></i><i></i></button>' +
    '</div></header>' +
    '<div class="menu" id="menu" aria-hidden="true"><div class="nav">' + brand().replace('class="brand"', 'class="brand" style="color:var(--lime)"') +
    '<button class="close" type="button" aria-label="Close menu">&times;</button></div><ul>' +
    NAV.map(function (n, i) { return '<li><a href="' + n.href + '">' + n.label + '<small>0' + (i + 1) + '</small></a></li>'; }).join('') +
    '</ul>' + lang() + '<a class="btn light block" href="contact.html">Begin a conversation</a></div>';
  // ribbon first, then header, then the (hidden) phone menu
  var ribbon = top.querySelector('.concept'), header = top.querySelector('.site-header'), menu = top.querySelector('.menu');
  document.body.insertBefore(menu, document.body.firstChild);
  document.body.insertBefore(header, document.body.firstChild);
  document.body.insertBefore(ribbon, document.body.firstChild);

  /* ---------- footer + WhatsApp ---------- */
  var foot = document.createElement('footer');
  foot.className = 'site-footer';
  foot.innerHTML = '<div class="wrap"><div class="top">' +
    '<div>' + brand().replace('<img class="on-light" src="assets/img/logo-dark.png" alt="" width="26" height="50">', '') +
    '<p style="margin-top:22px;max-width:300px">A wellness-based hospitality management and consultancy company, incorporated in Colombo, with offices in Thailand and Vietnam.</p></div>' +
    '<div><h4>What we do</h4><ul>' +
    '<li><a href="#" data-demo="the Management page">Management</a></li>' +
    '<li><a href="#" data-demo="the Projects page">Projects</a></li>' +
    '<li><a href="turnaround.html">Turnaround</a></li>' +
    '<li><a href="#" data-demo="the Consultancy page">Consultancy</a></li></ul></div>' +
    '<div><h4>The practice</h4><ul>' +
    '<li><a href="index.html#philosophy">Our philosophy</a></li>' +
    '<li><a href="#" data-demo="the Team page">The team</a></li>' +
    '<li><a href="index.html#approach">How we work</a></li>' +
    '<li><a href="reef-villa.html">Reef Villa &amp; Spa</a></li></ul></div>' +
    '<div><h4>Contact</h4><ul>' +
    '<li>31/4 Gregory’s Road<br>Colombo 07, Sri Lanka</li>' +
    '<li><a href="mailto:ceo@templetreeint.com">ceo@templetreeint.com</a></li>' +
    '<li><a href="tel:+' + PHONE + '">+94 777 757 174</a></li>' +
    '<li><a href="' + WA_URL + '" target="_blank" rel="noopener">WhatsApp</a></li></ul></div>' +
    '</div><div class="base"><span>&copy; 2026 Templetrees International Hotels and Resorts (Sri Lanka) Limited</span>' +
    '<span>Sri Lanka &nbsp;&middot;&nbsp; Thailand &nbsp;&middot;&nbsp; Vietnam</span></div></div>';
  document.body.appendChild(foot);

  var wa = document.createElement('a');
  wa.className = 'wa-float';
  wa.href = WA_URL; wa.target = '_blank'; wa.rel = 'noopener';
  wa.setAttribute('aria-label', 'Message us on WhatsApp');
  wa.innerHTML = WA_ICON;
  document.body.appendChild(wa);
  document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = WA_URL; a.target = '_blank'; a.rel = 'noopener'; });

  /* ---------- toast for parts not built in the prototype ---------- */
  var toast = document.createElement('div');
  toast.className = 'toast'; toast.setAttribute('role', 'status');
  document.body.appendChild(toast);
  var tt;
  function say(msg) {
    toast.innerHTML = '<span class="leaf gold"></span><span>' + msg + '</span>';
    toast.classList.add('show');
    clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('show'); }, 4200);
  }
  document.addEventListener('click', function (e) {
    var d = e.target.closest('[data-demo]');
    if (d) { e.preventDefault(); say('In the full website, this opens ' + d.getAttribute('data-demo') + '.'); return; }
    var l = e.target.closest('[data-lang]');
    if (l) { say('The ' + l.getAttribute('data-lang') + ' version of every page goes here, once the translations are ready.'); }
  });

  /* ---------- header behaviour ---------- */
  if (overHero) {
    var onScroll = function () { header.classList.toggle('stuck', window.scrollY > 80); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  var burger = header.querySelector('.burger');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(true); });
  menu.querySelector('.close').addEventListener('click', function () { setMenu(false); });
  menu.querySelectorAll('ul a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- reveal, count-up, chart ---------- */

  function fmt(v, dec) {
    return Number(v).toLocaleString('en-GB', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function countUp(el) {
    var end = parseFloat(el.getAttribute('data-count')), dec = +(el.getAttribute('data-decimals') || 0);
    var pre = el.getAttribute('data-prefix') || '', suf = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = pre + fmt(end, dec) + suf; return; }
    var t0 = null, dur = 1600;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(end * e, dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var dec = +(el.getAttribute('data-decimals') || 0);
    el.textContent = (el.getAttribute('data-prefix') || '') + fmt(0, dec) + (el.getAttribute('data-suffix') || '');
  });

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      if (el.classList.contains('reveal')) el.classList.add('in');
      if (el.hasAttribute('data-count')) countUp(el);
      if (el.classList.contains('chart')) el.classList.add('grown');
      io.unobserve(el);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }) : null;

  function startReveals() {
    document.querySelectorAll('.reveal, [data-count], .chart').forEach(function (el) {
      if (io) io.observe(el); else { el.classList.add('in', 'grown'); if (el.hasAttribute('data-count')) countUp(el); }
    });
  }
  // wait for the loader to lift, so the page's own animations are seen
  if (loaderActive) window.addEventListener('tt-loaded', startReveals, { once: true }); else startReveals();

  /* ---------- Reef Villa: seven keys to fifteen ---------- */
  var planner = document.querySelector('.planner');
  if (planner) {
    var cells = planner.querySelectorAll('.keys-grid i');
    var stepsBtns = planner.querySelectorAll('.stage-list button');
    var numEl = planner.querySelector('.keys-num');
    var noteEl = planner.querySelector('.keys-note');
    var spaEl = planner.querySelector('.spa-tag');
    var shownKeys = 7;
    function showStage(i) {
      var b = stepsBtns[i];
      var keys = +b.getAttribute('data-keys');
      var prev = i > 0 ? +stepsBtns[i - 1].getAttribute('data-keys') : 7;
      stepsBtns.forEach(function (x, j) { x.setAttribute('aria-pressed', String(j === i)); x.parentNode.classList.toggle('passed', j < i); });
      cells.forEach(function (c, j) {
        c.className = j < 7 ? 'old' : j < prev ? 'added' : j < keys ? 'new' : '';
      });
      noteEl.textContent = b.getAttribute('data-note');
      spaEl.classList.toggle('on', b.hasAttribute('data-spa'));
      var from = shownKeys; shownKeys = keys;
      if (reduce || from === keys) { numEl.textContent = keys; return; }
      var t0 = null;
      (function step(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / 600, 1);
        numEl.textContent = Math.round(from + (keys - from) * p);
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    }
    stepsBtns.forEach(function (b, i) { b.addEventListener('click', function () { showStage(i); }); });
    showStage(0);
  }

  /* ---------- Contact form (nothing is sent in the prototype) ---------- */
  var form = document.getElementById('enquiry');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var name = (form.elements.name.value || '').trim().split(' ')[0];
      var done = document.getElementById('enquiry-done');
      done.querySelector('.who').textContent = name ? ', ' + name : '';
      form.hidden = true; done.hidden = false;
      done.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });
    var again = document.getElementById('enquiry-again');
    if (again) again.addEventListener('click', function () {
      form.reset(); form.hidden = false; document.getElementById('enquiry-done').hidden = true;
    });
  }
})();
