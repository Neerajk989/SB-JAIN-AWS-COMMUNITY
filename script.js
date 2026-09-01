(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  const progress = document.getElementById('scrollProgress');
  const header = document.getElementById('siteHeader');
  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    if (progress) progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = () => {
    menuToggle?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('is-open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
  };
  menuToggle?.addEventListener('click', () => {
    const open = !mobileMenu?.classList.contains('is-open');
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileMenu?.classList.toggle('is-open', open);
    mobileMenu?.setAttribute('aria-hidden', String(!open));
  });
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -45px' });
    reveals.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index * 55, 280)}ms`;
      revealObserver.observe(element);
    });
  } else reveals.forEach(element => element.classList.add('is-visible'));

  const counters = document.querySelectorAll('.counter');
  const animateCounter = counter => {
    const target = Number(counter.dataset.target || 0);
    const suffix = counter.dataset.suffix || '';
    if (reduceMotion) { counter.textContent = `${target}${suffix}`; return; }
    const duration = 1100;
    const start = performance.now();
    const tick = now => {
      const progressValue = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progressValue, 3);
      counter.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progressValue < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
    }), { threshold: .75 });
    counters.forEach(counter => counterObserver.observe(counter));
  } else counters.forEach(animateCounter);

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    button?.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');
      faqItems.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  if (!coarsePointer && !reduceMotion) {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
    const moveCursor = event => { mouseX = event.clientX; mouseY = event.clientY; if (dot) { dot.style.left = `${mouseX}px`; dot.style.top = `${mouseY}px`; dot.style.opacity = '1'; } if (ring) ring.style.opacity = '1'; };
    const animateCursor = () => { ringX += (mouseX - ringX) * .15; ringY += (mouseY - ringY) * .15; if (ring) { ring.style.left = `${ringX}px`; ring.style.top = `${ringY}px`; } requestAnimationFrame(animateCursor); };
    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.querySelectorAll('a, button, input').forEach(element => {
      element.addEventListener('mouseenter', () => ring?.classList.add('is-hover'));
      element.addEventListener('mouseleave', () => ring?.classList.remove('is-hover'));
    });
    animateCursor();
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'live-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  let nodes = [];
  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr; canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`;
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    const compact = window.innerWidth < 700 || coarsePointer;
    const count = compact ? 20 : 48;
    nodes = Array.from({ length: count }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * (compact ? .14 : .24), vy: (Math.random() - .5) * (compact ? .14 : .24), r: Math.random() * 1.6 + .5 }));
  };
  const drawCanvas = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    nodes.forEach((node, i) => {
      if (!reduceMotion) { node.x += node.vx; node.y += node.vy; if (node.x < 0 || node.x > innerWidth) node.vx *= -1; if (node.y < 0 || node.y > innerHeight) node.vy *= -1; }
      ctx.fillStyle = 'rgba(255,153,0,.44)'; ctx.beginPath(); ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2); ctx.fill();
      nodes.slice(i + 1).forEach(other => { const dx = node.x - other.x; const dy = node.y - other.y; const distance = Math.hypot(dx, dy); if (distance < 140) { ctx.strokeStyle = `rgba(255,153,0,${(1 - distance / 140) * .12})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(node.x, node.y); ctx.lineTo(other.x, other.y); ctx.stroke(); } });
    });
    if (!reduceMotion) requestAnimationFrame(drawCanvas);
  };
  resizeCanvas(); drawCanvas(); window.addEventListener('resize', resizeCanvas, { passive: true });
})();
