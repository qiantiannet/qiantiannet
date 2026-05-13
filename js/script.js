/* ============================================
   Qiantian - Global JavaScript
   ============================================ */

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initScrollAnimations();
  initFormHandler();
  initScrollToTop();
  initMobileMenu();
});

/* ============================================
   Mobile Menu Toggle
   ============================================ */

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.innerHTML = nav.classList.contains('active') ? '&times;' : '&#9776;';
    });

    // Close menu when a link is clicked
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '&#9776;';
      });
    });
  }
}

/* ============================================
   Navigation Highlight on Scroll
   ============================================ */

function initNavigation() {
  const sections = document.querySelectorAll('[data-section]');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('data-section');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
}

/* ============================================
   Scroll Animations
   ============================================ */

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = entry.target.getAttribute('data-animation') || 'fadeIn 0.6s ease-out';
        entry.target.style.animationFillMode = 'forwards';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animation]').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
  });

  // Fallback: if observer misses any element, force reveal to avoid blank areas.
  setTimeout(() => {
    document.querySelectorAll('[data-animation]').forEach(element => {
      if (element.style.opacity === '0') {
        element.style.opacity = '1';
      }
    });
  }, 1200);
}

/* ============================================
   Smooth Scroll to Anchor Links
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ============================================
   Form Handler with Validation
   ============================================ */

function initFormHandler() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Validate form
      if (!validateForm(data)) {
        showMessage('Please fill in all fields correctly', 'error');
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        showMessage('Thank you! We will contact you soon.', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}

function validateForm(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return data.name && 
         data.email && 
         emailRegex.test(data.email) && 
         data.message && 
         data.message.length > 10;
}

function showMessage(message, type) {
  const messageEl = document.createElement('div');
  messageEl.className = `form-message form-message-${type}`;
  messageEl.textContent = message;
  messageEl.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    z-index: 10000;
    animation: slideInDown 0.3s ease-out;
    max-width: 300px;
  `;
  
  document.body.appendChild(messageEl);
  
  setTimeout(() => {
    messageEl.style.animation = 'slideInUp 0.3s ease-out reverse';
    setTimeout(() => messageEl.remove(), 300);
  }, 3000);
}

/* ============================================
   Scroll to Top Button
   ============================================ */

function initScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scroll-to-top';
  scrollBtn.innerHTML = '&#8593;';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #1e3a8a, #3b82f6);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;

  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'flex';
      scrollBtn.style.alignItems = 'center';
      scrollBtn.style.justifyContent = 'center';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  scrollBtn.addEventListener('mouseover', () => {
    scrollBtn.style.background = 'linear-gradient(135deg, #1e40af, #2563eb)';
    scrollBtn.style.transform = 'translateY(-5px)';
  });

  scrollBtn.addEventListener('mouseout', () => {
    scrollBtn.style.background = 'linear-gradient(135deg, #1e3a8a, #3b82f6)';
    scrollBtn.style.transform = 'translateY(0)';
  });
}

/* ============================================
   Lazy Load Images
   ============================================ */

function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/* ============================================
   Counter Animation
   ============================================ */

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

/* ============================================
   Parallax Effect
   ============================================ */

function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const elementPosition = element.offsetTop;
        const parallaxValue = (scrollPosition - elementPosition) * 0.5;
        
        if (scrollPosition >= elementPosition - window.innerHeight && 
            scrollPosition <= elementPosition + element.clientHeight) {
          element.style.transform = `translateY(${parallaxValue}px)`;
        }
      });
    });
  }
}

// Initialize parallax on load
document.addEventListener('DOMContentLoaded', initParallax);

/* ============================================
   Page Transition
   ============================================ */

function pageTransition() {
  const links = document.querySelectorAll('a:not([target="_blank"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.href;
      
      if (href.includes(location.hostname) || href.startsWith('/') || 
          href.startsWith('./') || !href.includes('://')) {
        e.preventDefault();
        document.body.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => {
          location.href = href;
        }, 300);
      }
    });
  });
}

// Initialize page transition
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', pageTransition);
} else {
  pageTransition();
}

/* ============================================
   SEO - Structured Data
   ============================================ */

function initStructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Qiantian Network Technology',
    'url': 'https://qiantiannet.com',
    'logo': 'https://qiantiannet.com/images/logo.svg',
    'description': 'Digital Technology Development and Services Company',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'No. 305, 3rd Floor, Unit 1, Building 2, No. 26 Shamen West Road',
      'addressLocality': 'Zhengzhou',
      'addressRegion': 'Henan',
      'postalCode': '450000',
      'addressCountry': 'CN'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'Customer Service',
      'email': 'support@qiantiannet.com'
    },
    'sameAs': []
  };

  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  scriptTag.textContent = JSON.stringify(schema);
  document.head.appendChild(scriptTag);
}

// Initialize structured data on load
document.addEventListener('DOMContentLoaded', initStructuredData);

/* ============================================
   Analytics & Performance
   ============================================ */

// Core Web Vitals tracking (optional)
if ('web-vital' in window) {
  // Track performance metrics
  console.log('Performance monitoring active');
}

/* ============================================
   Utility Functions
   ============================================ */

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Smooth page load animation
window.addEventListener('load', () => {
  document.body.classList.add('page-load');
});

// Handle error states
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

// Prevent 404 for missing resources
document.addEventListener('error', (e) => {
  if (e.target !== window) {
    console.warn('Resource not found:', e.target.src || e.target.href);
  }
}, true);

