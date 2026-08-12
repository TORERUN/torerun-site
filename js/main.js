/* =============================================
   NPO法人 ToRerun – Main JavaScript
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');

  // Header scroll
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 60);
    const btt = document.getElementById('backToTop');
    if (btt) btt.classList.toggle('is-visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const gnav = document.getElementById('gnav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-open');
    gnav.classList.toggle('is-open');
    document.body.style.overflow = gnav.classList.contains('is-open') ? 'hidden' : '';
  });
  gnav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      gnav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Fade-up on scroll
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  // Counter animation
  let counted = false;
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('[data-count]').forEach(el => {
          const target = +el.dataset.count;
          const step = Math.max(1, Math.ceil(target / 120));
          let cur = 0;
          const tick = () => {
            cur = Math.min(cur + step, target);
            el.textContent = cur.toLocaleString();
            if (cur < target) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
        countObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  const imp = document.getElementById('impact');
  if (imp) countObs.observe(imp);

  // FAQ accordion
  document.querySelectorAll('.faq-item__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - header.offsetHeight, behavior: 'smooth' }); }
    });
  });

  // Form placeholder
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '送信中...'; btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '送信完了';
        setTimeout(() => {
          btn.innerHTML = '送信する<span class="c-btn__arrow"></span>';
          btn.disabled = false; form.reset();
          alert('お問い合わせありがとうございます。\n内容を確認の上、折り返しご連絡いたします。');
        }, 1200);
      }, 800);
    });
  }
});
