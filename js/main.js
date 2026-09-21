// Honda Township - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const navOverlay = document.getElementById('navOverlay');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', function() {
                nav.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close menu on link click
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Hero slider
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.hero-nav-dot');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(function(slide) {
                slide.classList.remove('active');
            });
            dots.forEach(function(dot) {
                dot.classList.remove('active');
            });
            
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        // Auto advance
        if (slides.length > 1) {
            setInterval(nextSlide, 5000);
        }

        // Dot navigation
        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = document.getElementById('name') ? document.getElementById('name').value : '';
            
            // Simple validation
            if (!name) {
                alert('Please enter your name');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.model-card, .service-card, .car-card, .insurance-card, .process-card, .tracker-feature, .service-detail-card, .info-card');
        
        elements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.model-card, .service-card, .car-card, .insurance-card, .process-card, .tracker-feature, .service-detail-card, .info-card');
    animatedElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-item h3');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        
        const statsSection = document.querySelector('.stats-bar');
        if (!statsSection) return;

        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            countersAnimated = true;
            
            counters.forEach(function(counter) {
                const target = counter.textContent;
                const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
                const suffix = target.replace(/[0-9]/g, '');
                let current = 0;
                const increment = Math.ceil(numericValue / 50);
                const duration = 2000;
                const stepTime = duration / (numericValue / increment);

                const timer = setInterval(function() {
                    current += increment;
                    if (current >= numericValue) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = current + suffix;
                    }
                }, stepTime);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = 'position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; background: var(--honda-red); color: white; border: none; border-radius: 50%; cursor: pointer; display: none; z-index: 999; font-size: 18px; box-shadow: 0 4px 12px rgba(228, 5, 33, 0.3); transition: all 0.3s ease;';
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'flex';
            backToTopBtn.style.alignItems = 'center';
            backToTopBtn.style.justifyContent = 'center';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(228, 5, 33, 0.4)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(228, 5, 33, 0.3)';
    });
});
