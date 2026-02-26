/* ============================================================
   ICCASA 2026 — Unified Script
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    // ── 1.  DETECT CURRENT PAGE  ──────────────────────────────
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // ── 2.  INJECT HEADER  ────────────────────────────────────
    const headerSlot = document.getElementById('site-header');
    if (headerSlot) {
        headerSlot.innerHTML = `
        <header class="top-header">
            <div class="container branding-container">
                <div class="logo-group left">
                    <a href="index.html">
                        <img src="assets/images/UEM-removebg-preview.png" alt="UEM Jaipur" class="header-logo uem-img">
                    </a>
                </div>
                <div class="logo-group center">
                    <a href="index.html">
                        <img src="assets/images/iccasa-removebg-preview.png" alt="ICCASA 2026" class="header-logo iccasa-img">
                    </a>
                </div>
                <div class="logo-group right">
                    <div class="scopus-badge">
                        <i class="fa-solid fa-layer-group"></i> SCOPUS
                    </div>
                </div>
            </div>
        </header>`;
    }

// ── 3.  INJECT NAVBAR  ────────────────────────────────────
    const navSlot = document.getElementById('site-nav');
    if (navSlot) {
        const navItems = [
            { href: 'index.html', label: 'Home' },
            { href: 'scope.html', label: 'Scope' },
            { href: 'speakers.html', label: 'Keynote Speaker' },
            { href: 'team.html', label: 'Organizing Team' },
            { href: 'comingsoon.html', label: 'Call for Paper' },
            { href: 'comingsoon.html', label: 'Registration' },
            { href: 'comingsoon.html', label: 'Publication' },
            { href: 'comingsoon.html', label: 'Conferences' },
            { href: '#contact', label: 'Contact Us' }
        ];

        const navLinks = navItems.map(item => {
            const isActive = (currentPage === item.href) ? ' active' : '';
            
            // FIX: Added rel="noopener noreferrer" for strict browser policies
            const targetAttr = item.href.startsWith('#') ? '' : 'target="_blank" rel="noopener noreferrer"';
            
            return `<li class="nav-item"><a href="${item.href}" class="nav-link${isActive}" ${targetAttr}>${item.label}</a></li>`;
        }).join('\n                    ');

        navSlot.innerHTML = `
        <nav class="navbar" id="navbar">
            <div class="container nav-container">
                <div class="nav-brand-mobile">ICCASA '26</div>
                <ul class="nav-menu" id="nav-menu">
                    ${navLinks}
                </ul>
                <div class="hamburger" id="hamburger" tabindex="0" role="button" aria-label="Toggle navigation menu" aria-expanded="false">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </nav>`;
    }
    // ── 4.  INJECT FOOTER  ────────────────────────────────────
    const footerSlot = document.getElementById('site-footer');
    if (footerSlot) {
        fetch('footer.html')
            .then(res => res.text())
            .then(html => { footerSlot.innerHTML = html; })
            .catch(() => {
                // Inline fallback if fetch fails (e.g., file:// protocol)
                footerSlot.innerHTML = `
                <footer class="main-footer" id="contact">
                    <div class="container footer-content">
                        <div class="footer-col">
                            <h3>ICCASA 2026</h3>
                            <p>University of Engineering & Management, Jaipur</p>
                            <p>Gurukul, Udaipuria Mod, NH-11, Jaipur, Rajasthan 303807</p>
                        </div>
                        <div class="footer-col">
                            <h3>Quick Links</h3>
                            <ul class="footer-links">
                                <li><a href="https://iccasa.uem.edu.in/">ICCASA 2025 Archive</a></li>
                                <li><a href="https://iccasa2023.uem.edu.in/">ICCASA 2023 Archive</a></li>
                                <li><a href="https://iccasa2022.uem.edu.in/">ICCASA 2022 Archive</a></li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h3>Contact Us</h3>
                            <div class="contacts">
                                <p>Praphul Chhabra +91 97833 72873</p>
                                <p>Tarun Sharma +91 90244 24325</p>
                                <p>Pallavi Malik +91 97994 74109</p>
                            </div>
                            <br>
                            <div class="social-icons">
                                <a href="https://www.linkedin.com/school/university-of-engineering-management-uem/" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                                <a href="mailto:iccasa@uem.edu.in" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2026 ICCASA - UEM Jaipur. All Rights Reserved.</p>
                    </div>
                </footer>`;
            });
    }

    // ── 5.  MOBILE MENU TOGGLE  ───────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    function toggleMenu() {
        if (!hamburger || !navMenu) return;
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        hamburger.setAttribute('aria-expanded', isOpen);
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ── 6.  NAVBAR SCROLL EFFECT  ─────────────────────────────
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ── 7.  HERO SLIDESHOW (Safe)  ────────────────────────────
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

});
