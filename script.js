// ============================================
// Arab Al Sharq Luxury Perfume Website
// script.js
// ============================================

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ============================================
// Preloader
// ============================================

const preloader = document.getElementById("preloader");

const hidePreloader = () => {

    if (!preloader) return;

    preloader.classList.add("hide");
    document.body.classList.remove("loading");

    preloader.addEventListener("transitionend", () => {
        preloader.remove();
    }, { once: true });

};

if (document.readyState === "complete") {
    hidePreloader();
} else {
    window.addEventListener("load", hidePreloader);
    // Safety net in case the load event is delayed by a slow embed (e.g. the map)
    setTimeout(hidePreloader, 4000);
}

// ============================================
// Mobile Menu Toggle
// ============================================

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

const toggleMenu = () => {

    navMenu.classList.toggle("active");
    const isOpen = navMenu.classList.contains("active");

    menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

    menuBtn.setAttribute("aria-expanded", isOpen);

};

if (menuBtn && navMenu) {

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", toggleMenu);

    menuBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu after clicking a link
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });

}

// ============================================
// Sticky Navbar
// ============================================

const header = document.querySelector("header");

const updateHeader = () => {

    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 80);

};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// ============================================
// Active Nav Link on Scroll
// ============================================

const navLinks = document.querySelectorAll(".nav-menu a");
const sections = [...navLinks]
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {

    const navObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            navLinks.forEach(link => link.classList.remove("active"));

            const activeLink = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add("active");

        });

    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(section => navObserver.observe(section));

}

// ============================================
// Scroll Reveal Animation (staggered, IntersectionObserver)
// ============================================

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {

    // Stagger siblings within the same group for a cascading entrance
    const groupCounts = new Map();

    revealElements.forEach(el => {

        const parent = el.parentElement;
        const index = groupCounts.get(parent) || 0;
        groupCounts.set(parent, index + 1);

        if (!prefersReducedMotion) {
            el.style.transitionDelay = `${Math.min(index * 100, 400)}ms`;
        }

    });

    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));

    } else {

        // No IntersectionObserver support, or motion is reduced: just show everything
        revealElements.forEach(el => el.classList.add("visible"));

    }

}

// ============================================
// Counter Animation
// ============================================

const counters = document.querySelectorAll(".box h3");

const animateCounters = () => {

    counters.forEach(counter => {

        const original = counter.innerText;
        const number = parseInt(original, 10);

        if (isNaN(number)) return;

        if (prefersReducedMotion) {
            counter.innerText = original;
            return;
        }

        let count = 0;
        const speed = number / 80;

        const update = () => {

            count += speed;

            if (count < number) {
                counter.innerText = Math.floor(count) + "+";
                requestAnimationFrame(update);
            } else if (original.includes("%")) {
                counter.innerText = number + "%";
            } else if (original.includes("+")) {
                counter.innerText = number + "+";
            } else {
                counter.innerText = number;
            }

        };

        update();

    });

};

const aboutSection = document.querySelector(".about");

if (aboutSection && counters.length) {

    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    animateCounters();
                    observer.disconnect();
                }

            });

        }, { threshold: 0.4 });

        counterObserver.observe(aboutSection);

    } else {

        animateCounters();

    }

}

// ============================================
// Lazy Image Fade-in
// ============================================

document.querySelectorAll('img[loading="lazy"]').forEach(img => {

    const markLoaded = () => img.classList.add("loaded");

    if (img.complete && img.naturalWidth > 0) {
        markLoaded();
    } else {
        img.addEventListener("load", markLoaded, { once: true });
    }

});

// ============================================
// Back to Top
// ============================================

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });

}

// ============================================
// Current Year in Footer
// ============================================

const footer = document.querySelector("footer p");

if (footer) {
    footer.innerHTML =
        `&copy; ${new Date().getFullYear()} Arab Al Sharq | Luxury Perfumes UAE | All Rights Reserved`;
}
