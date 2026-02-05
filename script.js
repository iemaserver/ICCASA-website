document.addEventListener("DOMContentLoaded", () => {
    
    /* --- 1. Mobile Menu Toggle --- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(n => {
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    /* --- 2. Hero Slideshow Logic (Only runs if slides exist) --- */
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; 

    const nextSlide = () => {
        if(slides.length === 0) return;
        
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    if(slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    /* --- 3. Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');

    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* --- 4. Smooth Scroll for Anchor Links (e.g. #hero) --- */
    // This allows normal links to work, but smooth scrolls for #ID links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault(); // Only prevent default for internal anchors
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
