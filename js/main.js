// Deep Learning Blog - main.js

(function () {
  'use strict';

  /* ── Mobile Navigation Toggle ── */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ── Mark Active Nav Link ── */
  (function markActive() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();

  /* ── Newsletter Form ── */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        showToast('Thanks for subscribing! Stay tuned for the latest posts.');
        input.value = '';
      }
    });
  }

  /* ── Toast Notification ── */
  function showToast(message) {
    let toast = document.getElementById('dl-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dl-toast';
      toast.style.cssText = [
        'position:fixed',
        'bottom:1.5rem',
        'right:1.5rem',
        'background:#0d1b2a',
        'color:#fff',
        'padding:1rem 1.4rem',
        'border-radius:10px',
        'font-size:0.95rem',
        'box-shadow:0 6px 24px rgba(0,0,0,0.25)',
        'z-index:9999',
        'max-width:340px',
        'opacity:0',
        'transform:translateY(16px)',
        'transition:opacity 0.3s ease,transform 0.3s ease'
      ].join(';');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(16px)';
    }, 4000);
  }

  /* ── Scroll-reveal Animation ── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.blog-card, .topic-card, .use-case-item, .stat-box-item').forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  /* ── Reading Progress Bar ── */
  const article = document.querySelector('.post-body');
  if (article) {
    const bar = document.createElement('div');
    bar.id = 'reading-progress';
    bar.style.cssText = [
      'position:fixed',
      'top:0',
      'left:0',
      'width:0%',
      'height:3px',
      'background:linear-gradient(90deg,#1a73e8,#00bcd4)',
      'z-index:9999',
      'transition:width 0.1s ease'
    ].join(';');
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  /* ── Estimated Reading Time ── */
  const postBody = document.querySelector('.post-body');
  const readingTimeEl = document.querySelector('.reading-time');
  if (postBody && readingTimeEl) {
    const words = postBody.textContent.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    readingTimeEl.textContent = `${minutes} min read`;
  }

  /* ── Back to Top Button ── */
  const backTopBtn = document.createElement('button');
  backTopBtn.innerHTML = '&#8679;';
  backTopBtn.title = 'Back to top';
  backTopBtn.style.cssText = [
    'position:fixed',
    'bottom:1.5rem',
    'left:1.5rem',
    'width:42px',
    'height:42px',
    'border-radius:50%',
    'border:none',
    'background:#1a73e8',
    'color:#fff',
    'font-size:1.4rem',
    'cursor:pointer',
    'box-shadow:0 4px 14px rgba(0,0,0,0.2)',
    'opacity:0',
    'transition:opacity 0.3s',
    'z-index:999',
    'line-height:1'
  ].join(';');
  document.body.appendChild(backTopBtn);

  window.addEventListener('scroll', () => {
    backTopBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
  }, { passive: true });

  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
