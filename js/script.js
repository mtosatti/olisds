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

// ===== Phone Mask =====
const phoneInput = document.querySelector('input[name="user_phone"]');

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

        // Limita a 11 dígitos
        value = value.substring(0, 11);

        // Aplica a máscara (999) 99999-9999
        if (value.length > 0) {
            if (value.length <= 2) {
                value = `(${value}`;
            } else if (value.length <= 7) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            } else {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
            }
        }

        e.target.value = value;
    });

    // Previne colagem de texto não numérico
    phoneInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 11);

            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                } else {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
                }
            }

            e.target.value = value;
        }, 10);
    });
}

// ===== EmailJS Configuration =====
// IMPORTANTE: Substitua estes valores pelas suas próprias chaves do EmailJS e reCAPTCHA
const EMAILJS_PUBLIC_KEY = '7PPKJkRh8K7tywhhx'; // Obtenha em: https://dashboard.emailjs.com/admin/account
const EMAILJS_SERVICE_ID = 'service_vhx2lv7'; // Obtenha em: https://dashboard.emailjs.com/admin
const EMAILJS_TEMPLATE_ID = 'template_zdeyoc7'; // Obtenha em: https://dashboard.emailjs.com/admin/templates
const RECAPTCHA_SITE_KEY = '6LfdfBosAAAAADfdISGlkIvKfUQKBq1_dZjaOo4e'; // Obtenha em: https://www.google.com/recaptcha/admin

// Inicializar EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// ===== Contact Form Handling with reCAPTCHA =====
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Verificar se EmailJS está carregado
        if (typeof emailjs === 'undefined') {
            showNotification('Erro ao carregar o serviço de email. Por favor, tente novamente.', 'error');
            return;
        }

        // Desabilitar botão durante envio
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Executar reCAPTCHA v3
            if (typeof grecaptcha !== 'undefined') {
                const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
                document.getElementById('recaptchaResponse').value = token;
            }

            // Enviar email via EmailJS
            const result = await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                contactForm
            );

            console.log('Email enviado com sucesso:', result);

            // Mostrar mensagem de sucesso
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

            // Limpar formulário
            contactForm.reset();

        } catch (error) {
            console.error('Erro ao enviar email:', error);
            showNotification('Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato por email.', 'error');
        } finally {
            // Reabilitar botão
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        }
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
    const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
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

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

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

// ===== Terms and Conditions Modal =====
const termsModal = document.getElementById('terms-modal');
const termsLink = document.getElementById('terms-link');
const termsModalClose = document.getElementById('terms-modal-close');

if (termsLink && termsModal && termsModalClose) {
    // Function to open the modal
    const openModal = () => {
        termsModal.classList.add('active');
    };

    // Function to close the modal
    const closeModal = () => {
        termsModal.classList.remove('active');
    };

    // Open modal on link click
    termsLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        openModal();
    });

    // Close modal on button click, overlay click, or ESC key
    termsModalClose.addEventListener('click', closeModal);
    termsModal.addEventListener('click', (e) => {
        if (e.target === termsModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && termsModal.classList.contains('active')) closeModal();
    });
}

// ===== Blog Carousel =====
const blogCarousel = document.querySelector('.blog-carousel');

if (blogCarousel) {
    const track = blogCarousel.querySelector('.blog-carousel__track');
    const cards = Array.from(track.children);
    const prevButton = blogCarousel.querySelector('.blog-carousel__nav--prev');
    const nextButton = blogCarousel.querySelector('.blog-carousel__nav--next');
    const indicatorsContainer = blogCarousel.querySelector('.blog-carousel__indicators');

    let currentIndex = 0;
    let cardsPerView = 1;
    let autoPlayInterval;

    // Calculate cards per view based on screen width
    function updateCardsPerView() {
        if (window.innerWidth >= 1024) {
            cardsPerView = 3;
        } else if (window.innerWidth >= 768) {
            cardsPerView = 2;
        } else {
            cardsPerView = 1;
        }
    }

    // Create indicators
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        const maxIndex = cards.length - cardsPerView;
        const totalSlides = maxIndex + 1;

        for (let i = 0; i <= maxIndex; i++) {
            const indicator = document.createElement('button');
            indicator.classList.add('blog-carousel__indicator');
            indicator.setAttribute('aria-label', `Ir para posição ${i + 1}`);
            if (i === 0) indicator.classList.add('active');

            indicator.addEventListener('click', () => {
                goToSlide(i);
            });

            indicatorsContainer.appendChild(indicator);
        }
    }

    // Update indicators
    function updateIndicators() {
        const indicators = Array.from(indicatorsContainer.children);
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
        });
    }

    // Move to specific slide
    function goToSlide(slideIndex) {
        currentIndex = slideIndex;
        updateCarousel();
        resetAutoPlay();
    }

    // Update carousel position
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem = 32px
        const offset = -(currentIndex * (cardWidth + gap));

        track.style.transform = `translateX(${offset}px)`;

        // Update buttons state
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= cards.length - cardsPerView;

        // Update indicators
        updateIndicators();
    }

    // Previous slide
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
            resetAutoPlay();
        }
    });

    // Next slide
    nextButton.addEventListener('click', () => {
        const maxIndex = cards.length - cardsPerView;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
            resetAutoPlay();
        }
    });

    // Auto play
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const maxIndex = cards.length - cardsPerView;
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateCarousel();
        }, 5000); // Change slide every 5 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoPlay();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        const maxIndex = cards.length - cardsPerView;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < maxIndex) {
                // Swipe left - next
                currentIndex++;
                updateCarousel();
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous
                currentIndex--;
                updateCarousel();
            }
        }
    }

    // Pause auto play on hover
    blogCarousel.addEventListener('mouseenter', stopAutoPlay);
    blogCarousel.addEventListener('mouseleave', startAutoPlay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const maxIndex = cards.length - cardsPerView;
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateCarousel();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
            resetAutoPlay();
        }
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const oldCardsPerView = cardsPerView;
            updateCardsPerView();

            if (oldCardsPerView !== cardsPerView) {
                currentIndex = 0;
                createIndicators();
                updateCarousel();
            } else {
                updateCarousel();
            }
        }, 250);
    });

    // Initialize
    updateCardsPerView();
    createIndicators();
    updateCarousel();
    startAutoPlay();
}

// ===== Blog Pagination and Search =====
const blogArticlesWrapper = document.getElementById('blog-articles-wrapper');

if (blogArticlesWrapper) {
    const allArticles = Array.from(blogArticlesWrapper.querySelectorAll('.blog-article'));
    const articlesPerPage = 3;
    let currentPage = 1;
    let filteredArticles = [...allArticles];

    const paginationPrev = document.getElementById('pagination-prev');
    const paginationNext = document.getElementById('pagination-next');
    const paginationNumbers = document.getElementById('pagination-numbers');
    const searchInput = document.getElementById('blog-search-input');
    const searchClear = document.getElementById('blog-search-clear');
    const searchResults = document.getElementById('blog-search-results');

    // Show articles for current page
    function showArticlesForPage(page) {
        const startIndex = (page - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;

        allArticles.forEach(article => {
            article.style.display = 'none';
        });

        filteredArticles.slice(startIndex, endIndex).forEach(article => {
            article.style.display = 'block';
        });

        // Update pagination controls
        updatePaginationControls();

        // Scroll to top of articles
        const articlesSection = document.querySelector('.blog-articles');
        if (articlesSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const offset = articlesSection.offsetTop - headerHeight - 20;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    }

    // Update pagination controls
    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

        // Update buttons state
        paginationPrev.disabled = currentPage === 1;
        paginationNext.disabled = currentPage === totalPages || totalPages === 0;

        // Create page numbers
        paginationNumbers.innerHTML = '';

        if (totalPages <= 1) {
            document.getElementById('blog-pagination').style.display = 'none';
            return;
        }

        document.getElementById('blog-pagination').style.display = 'flex';

        for (let i = 1; i <= totalPages; i++) {
            // Show first page, last page, current page, and pages around current
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                const pageBtn = document.createElement('button');
                pageBtn.className = 'blog-pagination__number';
                pageBtn.textContent = i;

                if (i === currentPage) {
                    pageBtn.classList.add('active');
                }

                pageBtn.addEventListener('click', () => {
                    currentPage = i;
                    showArticlesForPage(currentPage);
                });

                paginationNumbers.appendChild(pageBtn);
            } else if (
                i === currentPage - 2 ||
                i === currentPage + 2
            ) {
                // Add ellipsis
                const ellipsis = document.createElement('span');
                ellipsis.className = 'blog-pagination__ellipsis';
                ellipsis.textContent = '...';
                paginationNumbers.appendChild(ellipsis);
            }
        }
    }

    // Previous page
    if (paginationPrev) {
        paginationPrev.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                showArticlesForPage(currentPage);
            }
        });
    }

    // Next page
    if (paginationNext) {
        paginationNext.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                showArticlesForPage(currentPage);
            }
        });
    }

    // Search functionality
    if (searchInput) {
        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.toLowerCase().trim();

            // Show/hide clear button
            if (query) {
                searchClear.style.display = 'flex';
            } else {
                searchClear.style.display = 'none';
            }

            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });

        // Clear search
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchClear.style.display = 'none';
            searchResults.style.display = 'none';
            performSearch('');
        });

        // Search function
        function performSearch(query) {
            if (!query) {
                // Reset to show all articles
                filteredArticles = [...allArticles];
                searchResults.style.display = 'none';
            } else {
                // Filter articles by query
                filteredArticles = allArticles.filter(article => {
                    const title = article.querySelector('.article__title')?.textContent.toLowerCase() || '';
                    const content = article.querySelector('.article__content')?.textContent.toLowerCase() || '';

                    return title.includes(query) || content.includes(query);
                });

                // Show search results message
                searchResults.style.display = 'block';
                if (filteredArticles.length === 0) {
                    searchResults.textContent = 'Nenhum artigo encontrado para sua busca.';
                    searchResults.classList.add('no-results');
                } else {
                    const plural = filteredArticles.length === 1 ? 'artigo encontrado' : 'artigos encontrados';
                    searchResults.textContent = `${filteredArticles.length} ${plural}`;
                    searchResults.classList.remove('no-results');
                }
            }

            // Reset to first page
            currentPage = 1;
            showArticlesForPage(currentPage);
        }
    }

    // Check for hash in URL and scroll to article
    function checkURLHash() {
        const hash = window.location.hash;
        if (hash) {
            const articleId = hash.substring(1);
            const article = document.getElementById(articleId);

            if (article) {
                // Find which page this article is on
                const articleIndex = filteredArticles.indexOf(article);
                if (articleIndex !== -1) {
                    const articlePage = Math.floor(articleIndex / articlesPerPage) + 1;
                    currentPage = articlePage;
                    showArticlesForPage(currentPage);

                    // Scroll to article after a short delay
                    setTimeout(() => {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const offset = article.offsetTop - headerHeight - 20;
                        window.scrollTo({
                            top: offset,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        }
    }

    // Initialize pagination
    showArticlesForPage(1);
    checkURLHash();

    // Handle hash changes
    window.addEventListener('hashchange', checkURLHash);
}
