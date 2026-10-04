// Honda Township - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');
    const navOverlay = document.getElementById('navOverlay');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
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

        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    var parentLi = this.parentElement;
                    var hasDropdown = parentLi && parentLi.querySelector(':scope > .dropdown');
                    // Parent items with a dropdown toggle it instead of closing the menu
                    if (hasDropdown && this.getAttribute('href') === '#') {
                        e.preventDefault();
                        var wasOpen = parentLi.classList.contains('open');
                        // Close siblings
                        parentLi.parentElement.querySelectorAll(':scope > li.open').forEach(function(li) {
                            li.classList.remove('open');
                        });
                        if (!wasOpen) parentLi.classList.add('open');
                        return;
                    }
                    nav.classList.remove('active');
                    if (navOverlay) navOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Hero slider
    const heroSlides = document.getElementById('heroSlides');
    const heroDots = document.querySelectorAll('.hero-dot');
    const heroPrev = document.getElementById('heroPrev');
    const heroNext = document.getElementById('heroNext');
    let currentSlide = 0;
    const totalSlides = 3;

    function goToSlide(index) {
        if (!heroSlides) return;
        currentSlide = index;
        if (currentSlide >= totalSlides) currentSlide = 0;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        heroSlides.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        heroDots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    if (heroNext) {
        heroNext.addEventListener('click', function() {
            goToSlide(currentSlide + 1);
        });
    }

    if (heroPrev) {
        heroPrev.addEventListener('click', function() {
            goToSlide(currentSlide - 1);
        });
    }

    heroDots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.dataset.slide));
        });
    });

    if (totalSlides > 1) {
        setInterval(function() {
            goToSlide(currentSlide + 1);
        }, 6000);
    }

    // Model tabs
    const modelTabs = document.querySelectorAll('.model-tab');
    const modelDisplays = document.querySelectorAll('.model-display');

    modelTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const model = this.dataset.model;
            
            modelTabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');
            
            modelDisplays.forEach(function(d) { d.classList.remove('active'); });
            const target = document.getElementById(model);
            if (target) {
                target.classList.add('active');
                
                // Reset variant tabs
                const variantTabs = target.querySelectorAll('.variant-tab');
                const variantDisplays = target.querySelectorAll('.variant-display');
                variantTabs.forEach(function(vt, i) {
                    vt.classList.toggle('active', i === 0);
                });
                variantDisplays.forEach(function(vd, i) {
                    vd.classList.toggle('active', i === 0);
                });
            }
        });
    });

    // Variant tabs
    document.querySelectorAll('.variant-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            const variantId = this.dataset.variant;
            const parent = this.closest('.model-display');
            if (!parent) return;
            
            parent.querySelectorAll('.variant-tab').forEach(function(vt) {
                vt.classList.remove('active');
            });
            this.classList.add('active');
            
            parent.querySelectorAll('.variant-display').forEach(function(vd) {
                vd.classList.remove('active');
            });
            const target = document.getElementById(variantId);
            if (target) target.classList.add('active');
        });
    });

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(function(q) {
        q.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(function(faq) {
                faq.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Test drive form
    const testDriveForm = document.getElementById('testDriveForm');
    if (testDriveForm) {
        testDriveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for booking a test drive! We will contact you shortly to confirm your appointment.');
            this.reset();
        });
    }

    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Reveal quick bar when scrolled
    const headerEl = document.getElementById('header');
    if (headerEl) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 60) headerEl.classList.add('scrolled');
            else headerEl.classList.remove('scrolled');
        });
    }
});
