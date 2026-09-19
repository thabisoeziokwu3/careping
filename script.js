const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.getElementById('mainNav');
const siteHeader = document.querySelector('.site-header');

/* solid backdrop behind the floating nav once the page scrolls, so
   content never bleeds through the gaps around the capsule */
if (siteHeader) {
  const toggleHeaderScrim = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 40);
  toggleHeaderScrim();
  window.addEventListener('scroll', toggleHeaderScrim, { passive: true });
}

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mainNav.classList.toggle('nav-open');
    const open = mainNav.classList.contains('nav-open');
    mobileToggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    const targetElem = document.querySelector(targetId);
    if (targetElem) {
      e.preventDefault();
      targetElem.scrollIntoView({ behavior: 'smooth' });
      if (mainNav && mainNav.classList.contains('nav-open')) {
        mainNav.classList.remove('nav-open');
        if (mobileToggle) mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

/* ---- Demo carousel (services demo + homepage "how it works for patients") ---- */
let currentStep = 0;
const steps = document.querySelectorAll('.demo-step');
const prevBtn = document.getElementById('demoPrev');
const nextBtn = document.getElementById('demoNext');
const indicator = document.querySelector('.demo-indicator');

function updateDemo() {
  if (steps.length > 0) {
    steps.forEach((step, idx) => {
      step.classList.toggle('active-step', idx === currentStep);
    });
    if (indicator) indicator.innerText = `Step ${currentStep + 1}/${steps.length}`;
  }
}

if (prevBtn && nextBtn && steps.length) {
  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateDemo();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateDemo();
    }
  });

  updateDemo();
}

/* ---- Count-up stats (meaningful motion: a number counting is information) ---- */
const animateCountUp = (element) => {
  const target = parseInt(element.getAttribute('data-target'));
  if (!target || isNaN(target)) return;

  let current = 0;
  const increment = target / 40;
  const updateCount = () => {
    if (current < target) {
      current += increment;
      const countSpan = element.querySelector('span');
      if (countSpan) countSpan.innerHTML = Math.ceil(current) + '%';
      requestAnimationFrame(updateCount);
    } else {
      const countSpan = element.querySelector('span');
      if (countSpan) countSpan.innerHTML = target + '%';
    }
  };
  updateCount();
};

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCountUp(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.count-up').forEach(el => countObserver.observe(el));

/* ---- WhatsApp click-to-chat ---- */
const whatsappBtns = document.querySelectorAll('#whatsappDemoCta, #whatsappContactBtn, .whatsapp-trigger');
whatsappBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const phoneNumber = '27639703380';
    const message = encodeURIComponent('Hi! I\'m interested in CarePing for my clinic. Can we discuss?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  });
});

/* ---- Scroll-to-top ---- */
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const addScrollToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = 'scroll-top-btn';
  button.setAttribute('aria-label', 'Scroll to top');
  button.onclick = scrollToTop;
  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    button.style.display = window.scrollY > 400 ? 'flex' : 'none';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
  });
};

addScrollToTopButton();

/* ---- FAQ accordion (chat-thread style: Q opens A) ---- */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    if (!item) return;
    const wasOpen = item.classList.contains('open');
    item.classList.toggle('open', !wasOpen);
    btn.setAttribute('aria-expanded', String(!wasOpen));
  });
});

/* ---- Hero: the one orchestrated entrance moment ----
   Bubbles reveal in sequence like a live conversation, then loop softly. */
function playHeroThread() {
  const bubbles = document.querySelectorAll('.hero-visual .bubble');
  if (!bubbles.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    bubbles.forEach(b => b.classList.add('in'));
    return;
  }

  let i = 0;
  const reveal = () => {
    if (i < bubbles.length) {
      bubbles[i].classList.add('in');
      i++;
      setTimeout(reveal, 650);
    }
  };
  setTimeout(reveal, 350);
}

playHeroThread();

document.addEventListener('DOMContentLoaded', () => {
  console.log('CarePing site loaded.');
});

/* ---- Contact form (Formspree) ---- */
const contactForm = document.querySelector('form[action="https://formspree.io/f/mkoqdwqy"]');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        window.location.href = 'thank-you.html';
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert('Something went wrong. Please try again or contact us on WhatsApp.');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}
