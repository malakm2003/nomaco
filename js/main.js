/* ═══════════════════════════════════════════════════════════════
   CONSULTING WEBSITE — MAIN JS
   Features: sticky nav, mobile menu, hero word rotation,
             scroll animations, contact form handling
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Feather Icons ─────────────────────────────────────────── */
  if (typeof feather !== 'undefined') feather.replace();


  /* ─── Sticky Nav ─────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const SCROLL_THRESHOLD = 60;

  function handleNavScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load


  /* ─── Mobile Menu ───────────────────────────────────────────── */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ─── Smooth scroll for all anchor links ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ─── Hero Word Rotation ─────────────────────────────────────── */
  const rotatingEl = document.getElementById('rotatingWord');
  const words = [
    'operations.',
    'digital presence.',
    'workflows.',
    'online reach.',
    'customer follow-up.',
    'growth strategy.',
  ];
  let wordIndex = 0;

  function rotateWord() {
    rotatingEl.classList.add('fade');
    setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingEl.textContent = words[wordIndex];
      rotatingEl.classList.remove('fade');
    }, 300);
  }

  if (rotatingEl) setInterval(rotateWord, 2600);


  /* ─── Scroll Fade-In Animations ─────────────────────────────── */
  // Add .fade-in class to elements you want to animate on scroll
  const animatedEls = document.querySelectorAll(
    '.service-card, .who__tile, .results__card, .process__step, .about__pillar, .section-header'
  );

  // Add the fade-in class to each
  animatedEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for grids
        const delay = entry.target.dataset.index
          ? (parseInt(entry.target.dataset.index) - 1) * 100
          : 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedEls.forEach(el => observer.observe(el));


  /* ─── Contact Form ───────────────────────────────────────────── */
  const form        = document.getElementById('contactForm');
  const successMsg  = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#c0392b';
          valid = false;
        }
      });
      if (!valid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      // If you've set up Formspree, the form will POST to Formspree's endpoint.
      // If not yet configured, we show the success message directly for demo.
      const action = form.getAttribute('action');
      const isFormspreeConfigured = action && !action.includes('YOUR_FORM_ID');

      if (isFormspreeConfigured) {
        try {
          const data = new FormData(form);
          const response = await fetch(action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' },
          });
          if (response.ok) {
            form.reset();
            successMsg.classList.add('show');
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            alert('Something went wrong. Please try emailing us directly.');
          }
        } catch {
          alert('Network error. Please try again or email us directly.');
        }
      } else {
        // Demo mode — show success message without submitting
        form.reset();
        successMsg.classList.add('show');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  }


  /* ─── Active nav link highlight on scroll ───────────────────── */
  const sections   = document.querySelectorAll('section[id], div[id]');
  const navLinks   = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

});
