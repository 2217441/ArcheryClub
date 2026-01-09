document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initThemeToggle();
    initScrollAnimations();
    initAccordions();
});

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            const isExpanded = navUl.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navUl = document.querySelector('nav ul');
                if (navUl && navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                }
            }
        });
    });
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved user preference, if any, on load
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        updateToggleIcon(toggleBtn, currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
        updateToggleIcon(toggleBtn, 'dark');
    }

    toggleBtn.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }

        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleIcon(toggleBtn, theme);
    });
}

function updateToggleIcon(btn, theme) {
    if (theme === 'dark') {
        btn.textContent = '☀️ Light Mode';
    } else {
        btn.textContent = '🌙 Dark Mode';
    }
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}
