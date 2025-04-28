document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  
    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
          icon.classList.replace('fa-moon', 'fa-sun');
          localStorage.setItem('darkMode', 'enabled');
        } else {
          icon.classList.replace('fa-sun', 'fa-moon');
          localStorage.setItem('darkMode', 'disabled');
        }
      });
  
      // Check for saved dark mode preference
      if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
      }
    }
  
    // Animate elements when scrolling
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.fade-in');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
        }
      });
    };
  
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
      const animateStats = () => {
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          const duration = 2000;
          const start = 0;
          const increment = target / (duration / 16);
          let current = start;
          
          const timer = setInterval(() => {
            current += increment;
            stat.textContent = Math.floor(current);
            
            if (current >= target) {
              stat.textContent = target;
              clearInterval(timer);
            }
          }, 16);
        });
      };
  
      // Only animate when stats section is in view
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
  
      const statsSection = document.querySelector('.stat-item');
      if (statsSection) {
        statsObserver.observe(statsSection);
      }
    }
  
    // Form submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
      });
    }
  });