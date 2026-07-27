document.addEventListener('DOMContentLoaded', () => {
    // 2. Sticky Navigation
    const handleScroll = () => {
        if (window.scrollY > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init

    // 3. Mobile hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.classList.toggle('nav-open');
            hamburger.classList.toggle('active');
        });

        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                document.body.classList.remove('nav-open');
                hamburger.classList.remove('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (document.body.classList.contains('nav-open') && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                document.body.classList.remove('nav-open');
                hamburger.classList.remove('active');
            }
        });
    }

    // 4. Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    const highlightActiveLink = () => {
        let scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink();

    // 7. Staggered animation delays
    const delayElements = document.querySelectorAll('[class*="reveal-delay-"]');
    delayElements.forEach(el => {
        const classList = Array.from(el.classList);
        const delayClass = classList.find(c => c.startsWith('reveal-delay-'));
        if (delayClass) {
            const delayNum = delayClass.split('-').pop();
            const delaySec = parseInt(delayNum, 10) * 0.1;
            el.style.transitionDelay = `${delaySec}s`;
        }
    });

    // 6. Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 8. Property image gallery (lightbox)
    const propertyImages = document.querySelectorAll('.property-image img');
    propertyImages.forEach(img => {
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            
            Object.assign(overlay.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '9999',
                cursor: 'pointer'
            });

            const largeImg = document.createElement('img');
            largeImg.src = img.src;
            largeImg.alt = img.alt || 'Enlarged property image';
            
            Object.assign(largeImg.style, {
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain'
            });

            overlay.appendChild(largeImg);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            const closeLightbox = () => {
                overlay.remove();
                document.body.style.overflow = '';
                document.removeEventListener('keydown', escapeListener);
            };

            overlay.addEventListener('click', closeLightbox);
            
            const escapeListener = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            };
            document.addEventListener('keydown', escapeListener);
        });
    });

    // 9. Current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});
