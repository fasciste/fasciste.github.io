(function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = ['#8aadf4','#c6a0f6','#8bd5ca','#a6da95','#91d7e3','#7dc4e4','#b7bdf8'];
  const CHARS =
    'アイウエオカキクケコサシスセソタチツテト' +
    'ナニヌネノハヒフヘホマミムメモヤユヨラリ' +
    'ルレロワヲン0123456789ABCDEF<>{}[]|/\\;:';
  const FS = 14;
  let cols, drops, colors;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols   = Math.floor(canvas.width / FS);
    drops  = Array.from({ length: cols }, () => Math.random() * -(canvas.height / FS));
    colors = Array.from({ length: cols }, () => COLORS[Math.floor(Math.random() * COLORS.length)]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function draw() {
    ctx.fillStyle = 'rgba(24, 25, 38, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${FS}px 'JetBrains Mono', monospace`;
    for (let i = 0; i < cols; i++) {
      ctx.fillStyle = colors[i];
      ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, drops[i] * FS);
      if (drops[i] * FS > canvas.height && Math.random() > 0.972) {
        drops[i] = 0;
        colors[i] = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      drops[i] += 0.45;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 48);
})();

(function initTyping() {
  const el = document.getElementById('tagline');
  if (!el) return;
  const text = 'Building secure software, breaking the rest.';
  let i = 0;
  el.textContent = '';
  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 28 + Math.random() * 55);
    }
  }
  setTimeout(type, 1100);
})();

(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrolled = window.scrollY > 60;
      nav.style.borderBottomColor = scrolled ? 'rgba(73, 77, 100, 0.52)' : 'rgba(73, 77, 100, 0.28)';
      nav.style.background = scrolled ? 'rgba(24, 25, 38, 0.95)' : 'rgba(24, 25, 38, 0.80)';
      ticking = false;
    });
  });
})();

(function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!links.length) return;

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => {
        const active = l.getAttribute('href') === '#' + e.target.id;
        l.classList.toggle('active', active);
      });
    }),
    { threshold: 0.4 }
  );
  sections.forEach((s) => observer.observe(s));
})();

(function initSkillStagger() {
  const section = document.getElementById('skills');
  if (!section) return;
  const tags = section.querySelectorAll('.skill-tag');
  tags.forEach((t) => { t.style.opacity = '0'; t.style.transform = 'translateY(10px)'; });

  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting) return;
    tags.forEach((tag, i) => {
      tag.style.transition = `opacity 0.4s ease ${i * 38}ms, transform 0.4s ease ${i * 38}ms`;
      requestAnimationFrame(() => setTimeout(() => {
        tag.style.opacity = '1'; tag.style.transform = 'translateY(0)';
      }, 10));
    });
    obs.disconnect();
  }, { threshold: 0.2 }).observe(section);
})();

(function initStatusStagger() {
  const section = document.getElementById('status');
  if (!section) return;
  const items = section.querySelectorAll('.status-item');
  items.forEach((it) => { it.style.opacity = '0'; it.style.transform = 'translateX(-14px)'; });

  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting) return;
    items.forEach((item, i) => {
      item.style.transition = `opacity 0.45s ease ${i * 75}ms, transform 0.45s ease ${i * 75}ms`;
      requestAnimationFrame(() => setTimeout(() => {
        item.style.opacity = '1'; item.style.transform = 'translateX(0)';
      }, 10));
    });
    obs.disconnect();
  }, { threshold: 0.25 }).observe(section);
})();
