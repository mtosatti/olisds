// ===== Mobile Menu Toggle =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ===== Active Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (link) {
                link.classList.add('active-link');
            }
        } else {
            if (link) {
                link.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== Change Header Background on Scroll =====
function scrollHeader() {
    const header = document.getElementById('header');

    if (window.scrollY >= 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements
const fadeElements = document.querySelectorAll('.service__card, .team__card, .contact__content > *, .tool__item, .stat__item, .process__step');
fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== Tools Marquee Animation Enhancement =====
const marquee = document.querySelector('.marquee');

if (marquee) {
    // Detect if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Disable animation for users who prefer reduced motion
        const marqueeContent = marquee.querySelectorAll('.marquee__content');
        marqueeContent.forEach(content => {
            content.style.animation = 'none';
        });
    }

    // Add smooth transition on load
    marquee.style.opacity = '0';
    setTimeout(() => {
        marquee.style.transition = 'opacity 0.5s ease';
        marquee.style.opacity = '1';
    }, 100);
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Show success message
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

        // Reset form
        contactForm.reset();

        // In a real implementation, you would send this data to a server
        // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;

    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        line-height: 1;
    `;

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;
document.head.appendChild(style);

// ===== Performance Optimization - Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Service Cards Hover Effect =====
const serviceCards = document.querySelectorAll('.service__card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Team Cards Animation =====
const teamCards = document.querySelectorAll('.team__card');

teamCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===== Cursor Effect (Optional - Modern Touch) =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #2563eb;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    display: none;
`;

document.body.appendChild(cursor);

// Only show custom cursor on desktop
if (window.innerWidth > 968) {
    cursor.style.display = 'block';

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Scale up on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service__card, .team__card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#06b6d4';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#2563eb';
        });
    });
}

// ===== Console Welcome Message =====
console.log('%c🚀 OLIS Data Solutions', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cTransformando Dados em Decisões Estratégicas', 'color: #06b6d4; font-size: 14px;');
console.log('%c💼 Interessado em trabalhar conosco? Entre em contato: comercial@olisds.tech', 'color: #64748b; font-size: 12px;');

// ===== Initialize on Load =====
window.addEventListener('load', () => {
    // Trigger initial scroll functions
    scrollActive();
    scrollHeader();

    // Log page load time for performance monitoring
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`⚡ Página carregada em ${loadTime}ms`);
});

// ===== Accessibility - Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

// ===== Form Input Validation Enhancement =====
const formInputs = document.querySelectorAll('.form__input');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#10b981';
        } else if (this.hasAttribute('required')) {
            this.style.borderColor = '#ef4444';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = '#2563eb';
    });
});

// ===== Stats Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isPercentage = target === 100 && element.textContent.includes('%');

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = isPercentage ? '100%' : `${target}+`;
            clearInterval(counter);
        } else {
            element.textContent = isPercentage ? `${Math.floor(start)}%` : `${Math.floor(start)}+`;
        }
    }, 16);
}

// Observe stats section for animation trigger
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat__number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== Privacy Policy Modal =====
const privacyModal = document.getElementById('privacy-modal');
const privacyLink = document.getElementById('privacy-link');
const privacyModalClose = document.getElementById('privacy-modal-close');

if (privacyLink && privacyModal && privacyModalClose) {
    // Function to open the modal
    const openModal = () => {
        privacyModal.classList.add('active');
    };

    // Function to close the modal
    const closeModal = () => {
        privacyModal.classList.remove('active');
    };

    // Open modal on link click
    privacyLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        openModal();
    });

    // Close modal on button click, overlay click, or ESC key
    privacyModalClose.addEventListener('click', closeModal);
    privacyModal.addEventListener('click', (e) => {
        if (e.target === privacyModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && privacyModal.classList.contains('active')) closeModal();
    });
}
