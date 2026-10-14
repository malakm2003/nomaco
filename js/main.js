// Nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Interactive receipt: prints when it scrolls into view, reprints on click
const receipt = document.getElementById('receipt');
const reprint = document.getElementById('reprint');
const receiptNo = document.getElementById('receiptNo');
let printCount = 1;

function printReceipt() {
  receipt.classList.remove('is-printing');
  void receipt.offsetWidth; // restart the animation
  receipt.classList.add('is-printing');
  receiptNo.textContent = '#' + String(printCount).padStart(4, '0');
  reprint.disabled = true;
}
receipt.addEventListener('animationend', () => { reprint.disabled = false; });
reprint.addEventListener('click', () => {
  printCount += 1;
  printReceipt();
});

// Reveal sections as they enter the viewport
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      if (entry.target.contains(receipt)) printReceipt();
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-in'));
  printReceipt();
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Don't allow booking dates in the past
const dateInput = document.querySelector('input[name="event_date"]');
if (dateInput) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateInput.min = today.toISOString().split('T')[0];
}

// Booking form → Formspree (AJAX, stays on page)
const form = document.getElementById('bookForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'sending…';
  status.className = 'form__status';
  status.textContent = '';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('Request failed');
    form.reset();
    status.classList.add('is-ok');
    status.textContent = "Thank you! Talk soon — check your inbox within a day.";
    button.textContent = 'sent ✓';
  } catch (err) {
    status.classList.add('is-err');
    status.textContent = 'Something went wrong. Please try again or DM us on Instagram @thenomaco.';
    button.disabled = false;
    button.textContent = 'send it over';
  }
});
