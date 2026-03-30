// ============================================
// Navigation & Mobile Menu
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ============================================
// Smooth Scroll & Active Navigation
// ============================================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
  }

  // Update active nav link
  updateActiveNavLink();
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
  });

  if (current) {
    const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
    if (activeLink) {
      activeLink.style.color = '#6366f1';
    }
  }
}

// ============================================
// Cube Interaction
// ============================================
const cube = document.getElementById('cube');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 20 - 10;
  mouseY = (e.clientY / window.innerHeight) * 20 - 10;
  
  if (cube) {
    cube.style.transform = `rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
  }
});

// Reset cube on mobile
if (window.innerWidth <= 768) {
  cube.style.animation = 'rotateCube 10s infinite linear';
}

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.achievement-card, .project-card, .timeline-content, .education-card, .contact-card').forEach(el => {
  observer.observe(el);
});

// ============================================
// Scroll Animations
// ============================================
const animateOnScroll = () => {
  const elements = document.querySelectorAll('section');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight * 0.75) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', animateOnScroll);

// ============================================
// Stats Counter Animation
// ============================================
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const statsNumbers = entry.target.querySelectorAll('.stat-item h3');
      
      statsNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        animateCounter(stat, target);
      });
      
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ============================================
// Parallax Effect
// ============================================
window.addEventListener('scroll', () => {
  const particles = document.querySelectorAll('.particle');
  
  particles.forEach((particle, index) => {
    const speed = (index + 1) * 0.5;
    particle.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});

// ============================================
// Smooth Scroll to Top on Page Load
// ============================================
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

// ============================================
// Add fade-in animation to sections
// ============================================
document.querySelectorAll('section').forEach((section, index) => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.6s ease-out';
  
  setTimeout(() => {
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
  }, index * 100);
});

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navLinks.classList.remove('active');
  }
});

// ============================================
// Accessibility: Focus Visible
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

console.log('Portfolio loaded successfully!');
