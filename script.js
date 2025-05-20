document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    // const navToggle = document.querySelector('.nav-toggle');
    // const navLinks = document.querySelector('.nav-links');
    
    // if (navToggle && navLinks) {
    //     navToggle.addEventListener('click', function() {
    //         navLinks.classList.toggle('active');
    //         // Toggle between hamburger and close icon
    //         const icon = this.querySelector('i');
    //         icon.classList.toggle('fa-bars');
    //         icon.classList.toggle('fa-times');
    //     });
        
    //     // Close menu when clicking on links
    //     document.querySelectorAll('.nav-links a').forEach(link => {
    //         link.addEventListener('click', function() {
    //             navLinks.classList.remove('active');
    //             const icon = navToggle.querySelector('i');
    //             icon.classList.remove('fa-times');
    //             icon.classList.add('fa-bars');
    //         });
    //     });
    // }

    // Initialize Hero Slider
    initSlider();

    // Initialize Counter Animation
    setupCounterObserver();

    // Smooth scrolling for anchor links
    setupSmoothScrolling();

    // Header scroll behavior
    setupHeaderScroll();
});

// Hero Slider Functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Function to go to previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Start auto sliding with mobile-appropriate timing
    function startSlider() {
        const isMobile = window.innerWidth <= 768;
        const slideIntervalTime = isMobile ? 6000 : 5000;
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    // Stop auto sliding
    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Set up event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlider();
        startSlider();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlider();
        startSlider();
    });

    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                stopSlider();
                startSlider();
            });
        });
    }

    // Start auto sliding
    startSlider();

    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('mouseleave', startSlider);
    }

    // Adjust on resize
    window.addEventListener('resize', function() {
        if (slideInterval) {
            stopSlider();
            startSlider();
        }
    });
}

// Counter Animation with IntersectionObserver
function setupCounterObserver() {
    const progressSection = document.querySelector('.progress');
    if (!progressSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    observer.observe(progressSection);
}

function animateCounters() {
    const counters = document.querySelectorAll('.progress-number');
    if (counters.length === 0) return;
    
    // Adjust speed based on screen size
    const speed = window.innerWidth <= 768 ? 100 : 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000; // 2 seconds total
        const startTime = performance.now();
        
        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            
            counter.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        }
        
        requestAnimationFrame(updateCount);
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const navToggle = document.querySelector('.nav-toggle');
                if (navLinks) navLinks.classList.remove('active');
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
}

// Header Scroll Behavior
function setupHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const headerHeight = header.offsetHeight;
    let lastScroll = 0;
    let isScrolling;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Clear timeout if already set
        clearTimeout(isScrolling);
        
        // Set header state based on scroll direction
        if (currentScroll <= 10) {
            // At top of page
            header.style.transform = 'translateY(0)';
            header.classList.remove('scrolled');
        } else if (currentScroll > lastScroll && currentScroll > headerHeight) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
            header.classList.add('scrolled');
        } else if (currentScroll < lastScroll) {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.classList.add('scrolled');
        }
        
        // Set timeout to detect scroll end
        isScrolling = setTimeout(() => {
            header.style.transform = 'translateY(0)';
        }, 150);
        
        lastScroll = currentScroll;
    });
    
    // Adjust nav position on resize
    window.addEventListener('resize', () => {
        const nav = document.querySelector('#main-nav');
        if (nav) {
            nav.style.top = `${header.offsetHeight}px`;
        }
    });
}