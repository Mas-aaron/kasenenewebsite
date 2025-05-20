document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Toggle between hamburger and close icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
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

    // Start auto sliding
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Stop auto sliding
    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Inside your slider initialization code:
    function initSlider() {
        const slides = document.querySelectorAll('.slide');
        if (slides.length === 0) return;

        // Adjust autoplay timing for mobile
        const isMobile = window.innerWidth <= 768;
        const slideIntervalTime = isMobile ? 6000 : 5000; // Slower on mobile

        function startSlider() {
            slideInterval = setInterval(nextSlide, slideIntervalTime);
        }

        // Rest of your slider logic...
    }

    // Call this on resize to adjust for mobile
    window.addEventListener('resize', function() {
        if (slideInterval) {
            clearInterval(slideInterval);
            startSlider();
        }
    });

    // Initialize slider if elements exist
    if (slides.length > 0) {
        // Set up event listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlider();
            startSlider();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlider();
            startSlider();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                stopSlider();
                startSlider();
            });
        });

        // Start auto sliding
        startSlider();

        // Pause on hover
        const slider = document.querySelector('.hero-slider');
        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('mouseleave', startSlider);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
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

    // Header scroll behavior
    const header = document.querySelector('header');
    let lastScroll = 0;
    const scrollThreshold = 50; // Threshold for showing header when scrolling up

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Show header when scrolling to top
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            header.classList.remove('scrolled');
            lastScroll = 0;
            return;
        }

        // Add shadow when scrolled
        if (currentScroll > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide header when scrolling down
        if (currentScroll > lastScroll) {
            header.style.transform = 'translateY(-100%)';
        }
        // Show header when scrolling up slightly
        else if (currentScroll < lastScroll - scrollThreshold) {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Make sure nav stays below header
    const nav = document.querySelector('#main-nav');
    if (nav) {
        const headerHeight = header.offsetHeight;
        nav.style.top = `${headerHeight}px`;
    }
});

// Academics Page Tab Functionality
function setupAcademicTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding content
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing code)
    
    // Add this line to initialize the tabs
    setupAcademicTabs();
});

// Update the slider initialization in your existing code
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    // Adjust autoplay timing for mobile
    const isMobile = window.innerWidth <= 768;
    const slideIntervalTime = isMobile ? 6000 : 5000;

    // Start auto sliding with mobile-appropriate timing
    function startSlider() {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    // Rest of your existing slider code...
}

// Call this on resize to adjust for mobile
window.addEventListener('resize', function() {
    if (slideInterval) {
        clearInterval(slideInterval);
        startSlider();
    }
});

// Update the mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('#main-nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Toggle between hamburger and close icon
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Rest of your existing code...
});