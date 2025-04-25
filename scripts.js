document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and functionality
    initAnimations();
    initSmoothScrolling();
    initTooltips();
    initStatCounters();
    initServiceItemHover();
});

/**
 * Initialize section entrance animations
 */
function initAnimations() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        section.classList.add('section-animate');
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
}

/**
 * Initialize Bootstrap tooltips
 */
function initTooltips() {
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    
    tooltipTriggerList.map(tooltipTriggerEl => {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: 'hover focus'
        });
    });
}

/**
 * Initialize animated counters for statistics
 */
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    if (statNumbers.length === 0) return;
    
    // Set up data attributes and reset counters
    statNumbers.forEach(stat => {
        stat.setAttribute('data-target', stat.textContent.trim());
        stat.textContent = '0';
    });
    
    const animateCounters = () => {
        let allComplete = true;
        
        statNumbers.forEach(statNumber => {
            const target = +statNumber.getAttribute('data-target').replace(/,/g, '');
            const count = +statNumber.textContent.replace(/,/g, '');
            
            if (count < target) {
                allComplete = false;
                const increment = target / speed;
                statNumber.textContent = Math.ceil(count + increment).toLocaleString();
            } else {
                statNumber.textContent = target.toLocaleString();
            }
        });
        
        if (!allComplete) {
            requestAnimationFrame(animateCounters);
        }
    };
    
    // Start counter when section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(document.querySelector('.success-section'));
}

/**
 * Initialize hover effects for service items
 */
function initServiceItemHover() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const heading = item.querySelector('h3, h4');
        
        item.addEventListener('mouseenter', () => {
            if (heading) {
                heading.style.color = 'var(--primary-color)';
            }
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            if (heading) {
                heading.style.color = '';
            }
            item.style.transform = '';
        });
    });
}

/**
 * Initialize social link hover effects
 */
function initSocialLinkHover() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });
}

// Initialize everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

function initAll() {
    initAnimations();
    initSmoothScrolling();
    initTooltips();
    initStatCounters();
    initServiceItemHover();
    initSocialLinkHover();
}