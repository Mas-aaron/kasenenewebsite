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
    let lastScroll = 0;
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    let ticking = false;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleHeaderScroll(currentScroll, lastScroll);
                ticking = false;
            });
            ticking = true;
        }
        
        lastScroll = currentScroll;
    });

    function handleHeaderScroll(currentScroll, lastScroll) {
        // Always show header when at top of page
        if (currentScroll <= 10) {
            header.style.transform = 'translateY(0)';
            return;
        }
        
        // Scrolling down - hide header
        if (currentScroll > lastScroll && currentScroll > headerHeight) {
            header.style.transform = 'translateY(-100%)';
        } 
        // Scrolling up - show header
        else if (currentScroll < lastScroll) {
            header.style.transform = 'translateY(0)';
        }
    }
    // // Header scroll behavior with smooth return
    // const header = document.querySelector('header');
    // const headerHeight = header.offsetHeight;
    // let lastScroll = 0;
    // let isScrolling;
    // let scrollTimeout;

    // window.addEventListener('scroll', () => {
    //     const currentScroll = window.pageYOffset;
        
    //     // Clear our timeout throughout the scroll
    //     window.clearTimeout(scrollTimeout);
        
    //     // Set a timeout to run after scrolling stops
    //     scrollTimeout = setTimeout(function() {
    //         // When scrolling stops, return header to position
    //         header.style.transform = 'translateY(0)';
    //     }, 150); // Adjust this value to control how quickly it returns
        
    //     // Always show header when scrolling to top
    //     if (currentScroll <= 0) {
    //         header.style.transform = 'translateY(0)';
    //         header.classList.remove('scrolled');
    //         return;
    //     }
        
    //     // Add shadow when scrolled
    //     if (currentScroll > 10) {
    //         header.classList.add('scrolled');
    //     } else {
    //         header.classList.remove('scrolled');
    //     }
        
    //     // Scrolling down
    //     if (currentScroll > lastScroll) {
    //         header.style.transform = 'translateY(-100%)';
    //     } 
    //     // Scrolling up
    //     else if (currentScroll < lastScroll) {
    //         header.style.transform = 'translateY(0)';
    //     }
        
    //     lastScroll = currentScroll;
    // });

    // Make sure nav stays below header
    const nav = document.querySelector('#main-nav');
    if (nav) {
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



// // Replace the existing scroll event listener in scripts.js with this updated version
// window.addEventListener('scroll', () => {
//     const currentScroll = window.pageYOffset;
//     const header = document.querySelector('header');
//     const headerHeight = header.offsetHeight;
    
//     // Always show header when at top of page
//     if (currentScroll <= 10) {
//         header.style.transform = 'translateY(0)';
//         header.classList.remove('scrolled');
//         return;
//     }
    
//     // Add shadow when scrolled
//     if (currentScroll > 10) {
//         header.classList.add('scrolled');
//     } else {
//         header.classList.remove('scrolled');
//     }
    
//     // Scrolling down - hide header
//     if (currentScroll > lastScroll && currentScroll > headerHeight) {
//         header.style.transform = 'translateY(-100%)';
//         header.style.transition = 'transform 0.3s ease-out';
//     } 
//     // Scrolling up - show header
//     else if (currentScroll < lastScroll) {
//         header.style.transform = 'translateY(0)';
//         header.style.transition = 'transform 0.2s ease-out';
//     }
    
//     lastScroll = currentScroll;
// });



// // Animated counting for stats
// function animateCounters() {
//     const counters = document.querySelectorAll('.progress-number');
//     const speed = 500; // The lower the faster
    
//     counters.forEach(counter => {
//         const target = +counter.getAttribute('data-count');
//         const count = +counter.innerText;
//         const increment = target / speed;
        
//         if(count < target) {
//             counter.innerText = Math.ceil(count + increment);
//             setTimeout(animateCounters, 1);
//         } else {
//             counter.innerText = target;
//         }
//     });
// }

// // Check if element is in viewport
// function isInViewport(element) {
//     const rect = element.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// }

// // Trigger animation when progress section comes into view
// window.addEventListener('scroll', function() {
//     const progressSection = document.querySelector('.progress');
//     if(isInViewport(progressSection)) {
//         animateCounters();
//         // Remove the event listener after triggering once
//         window.removeEventListener('scroll', arguments.callee);
//     }
// });




// // Improved counter animation
// function animateCounters() {
//     const counters = document.querySelectorAll('.progress-number');
//     const speed = window.innerWidth <= 768 ? 100 : 200; // Faster on mobile
    
//     let allComplete = true;
    
//     counters.forEach(counter => {
//         const target = +counter.getAttribute('data-count');
//         const count = +counter.innerText;
        
//         if(count < target) {
//             allComplete = false;
//             const increment = Math.max(1, Math.floor(target / speed));
//             counter.innerText = Math.min(target, count + increment);
//         }
//     });
    
//     if (!allComplete) {
//         requestAnimationFrame(animateCounters);
//     }
// }

// // IntersectionObserver for better performance
// function setupCounterObserver() {
//     const progressSection = document.querySelector('.progress');
//     if (!progressSection) return;
    
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 animateCounters();
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, { 
//         threshold: 0.3, // Trigger when 30% visible
//         rootMargin: '0px 0px -100px 0px' // Adjust trigger point
//     });
    
//     observer.observe(progressSection);
// }

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     setupCounterObserver();
//     // ... rest of your existing code ...
// });

