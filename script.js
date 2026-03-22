// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.getElementById('mainNav');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mainNav.classList.toggle('nav-open');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    const targetElem = document.querySelector(targetId);
    if (targetElem) {
      e.preventDefault();
      targetElem.scrollIntoView({ behavior: 'smooth' });
      if (mainNav && mainNav.classList.contains('nav-open')) {
        mainNav.classList.remove('nav-open');
      }
    }
  });
});

// Demo carousel
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

// Count-up animation for stats
const countUpElements = document.querySelectorAll('.count-up');

const animateCountUp = (element) => {
  const target = parseInt(element.getAttribute('data-target'));
  if (!target || isNaN(target)) return;
  
  let current = 0;
  const increment = target / 50;
  const updateCount = () => {
    if (current < target) {
      current += increment;
      const countSpan = element.querySelector('span');
      if (countSpan) {
        countSpan.innerHTML = Math.ceil(current) + '%';
      }
      requestAnimationFrame(updateCount);
    } else {
      const countSpan = element.querySelector('span');
      if (countSpan) {
        countSpan.innerHTML = target + '%';
      }
    }
  };
  updateCount();
};

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      if (entry.target.classList.contains('count-up')) {
        animateCountUp(entry.target);
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-up, .count-up').forEach(el => {
  observer.observe(el);
});

document.querySelectorAll('.fade-in-up').forEach(el => {
  el.style.opacity = '1';
});

// WhatsApp buttons with your specific number
const whatsappBtns = document.querySelectorAll('#whatsappDemoCta, #whatsappContactBtn');
whatsappBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const phoneNumber = '27712270679';
    const message = encodeURIComponent('Hi! I\'m interested in CarePing for my clinic. Can we discuss?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  });
});

// ===== REMOVED THE MAILTO FORM HANDLING CODE =====
// The form now uses PHP (send-email.php), so no JavaScript needed for form submission
// The form will submit normally to the PHP file

// Auto-hide notifications after 5 seconds (for PHP success/error messages)
setTimeout(() => {
  const notifications = document.querySelectorAll('.notification');
  notifications.forEach(notification => {
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 500);
  });
}, 5000);

// Add hover effect for cards
const hoverElements = document.querySelectorAll('.hover-lift, .benefit-card, .feature-card, .timeline-card');

hoverElements.forEach(el => {
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
});

// Add scroll to top button
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const addScrollToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = 'scroll-top-btn';
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--primary-teal);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  button.onclick = scrollToTop;
  document.body.appendChild(button);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });
};

addScrollToTopButton();

// Fix for any elements that might have been hidden
document.addEventListener('DOMContentLoaded', () => {
  const allSections = document.querySelectorAll('section');
  allSections.forEach(section => {
    section.style.visibility = 'visible';
    section.style.opacity = '1';
  });
  
  const allCards = document.querySelectorAll('.benefit-card, .feature-card, .problem-card, .stake-card');
  allCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
  
  console.log('Site loaded successfully!');
});