// Enhanced animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Hero block: brief fade-in on load (respects prefers-reduced-motion via CSS)
    const heroBlock = document.querySelector('.hero-block');
    if (heroBlock) {
        requestAnimationFrame(function() {
            heroBlock.classList.add('hero-visible');
        });
    }

    // Smooth scroll for anchor links
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.dataset.scroll) {
                e.preventDefault();
                const target = document.querySelector(this.dataset.scroll);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Enhanced scroll animation with Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.service-content, .service-image, .profile-content, .profile-image');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize first section as visible
    if (sections.length > 0) {
        sections[0].classList.add('visible');
    }

    // Parallax effect for business content section
    const businessSection = document.querySelector('.business-content-section');
    if (businessSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            if (businessSection.getBoundingClientRect().top < window.innerHeight && 
                businessSection.getBoundingClientRect().bottom > 0) {
                businessSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Parallax effect for background number "28"
    const numberElement = document.querySelector('.business-content-section::before');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const businessSection = document.querySelector('.business-content-section');
        if (businessSection) {
            const rect = businessSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const rate = (scrolled - rect.top) * 0.1;
                businessSection.style.setProperty('--scroll-offset', `${rate}px`);
            }
        }
    });

    // Header scroll effect with enhanced styling
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.paddingTop = '30px';
            header.style.paddingBottom = '50px';
        } else {
            header.style.boxShadow = 'none';
            header.style.paddingTop = '50px';
            header.style.paddingBottom = '80px';
        }
        
        lastScroll = currentScroll;
    });

    // Contact button functionality
    const contactButtons = document.querySelectorAll('.contact-btn, .footer-btn');
    contactButtons.forEach(button => {
        if (button.textContent.includes('お問い合わせ') || button.textContent.includes('ご巡覧')) {
            button.addEventListener('click', function() {
                const footer = document.querySelector('.footer');
                if (footer) {
                    footer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });

    // Image grid hover effects
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Service section image animations
    const serviceImages = document.querySelectorAll('.service-image');
    serviceImages.forEach(image => {
        image.style.opacity = '0';
        image.style.transform = 'translateX(30px)';
        image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Service content animations
    const serviceContents = document.querySelectorAll('.service-content');
    serviceContents.forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateX(-30px)';
        content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Profile section animations
    const profileContents = document.querySelectorAll('.profile-content');
    profileContents.forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateX(-20px)';
        content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    const profileImages = document.querySelectorAll('.profile-image');
    profileImages.forEach(image => {
        image.style.opacity = '0';
        image.style.transform = 'translateX(20px)';
        image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Smooth number counter animation for profile numbers
    const profileNumbers = document.querySelectorAll('.profile-number');
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const targetNumber = parseInt(number.textContent);
                let currentNumber = 0;
                const increment = targetNumber / 30;
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        number.textContent = String(targetNumber).padStart(2, '0');
                        clearInterval(timer);
                    } else {
                        number.textContent = String(Math.floor(currentNumber)).padStart(2, '0');
                    }
                }, 30);
                numberObserver.unobserve(number);
            }
        });
    }, { threshold: 0.5 });

    profileNumbers.forEach(number => {
        numberObserver.observe(number);
    });

    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        button {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
