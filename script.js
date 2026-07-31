// ============================================
// Arab Al Sharq Luxury Perfume Website
// script.js
// ============================================

// Mobile Menu Toggle
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

});

// Close menu after clicking a link
document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

    });

});

// ============================================
// Sticky Navbar
// ============================================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 80) {

        header.style.background = "rgba(109,0,25,.92)";
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.20)";

    } else {

        header.style.background = "rgba(109,0,25,.20)";
        header.style.boxShadow = "none";

    }

});

// ============================================
// Smooth Scroll
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ============================================
// Scroll Reveal Animation
// ============================================

const revealElements = document.querySelectorAll(
    ".card,.feature,.review,.gallery-grid img,.box,.about-image,.about-text,.contact-form,.contact-info"
);

const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < trigger) {

            el.style.opacity = "1";
            el.style.transform = "translateY(0px)";

        }

    });

};

revealElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(60px)";
    el.style.transition = "all .8s ease";

});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// ============================================
// Counter Animation
// ============================================

const counters = document.querySelectorAll(".box h3");

let started = false;

window.addEventListener("scroll", () => {

    const about = document.querySelector(".about");

    if (!about) return;

    const position = about.getBoundingClientRect().top;

    if (position < window.innerHeight - 150 && !started) {

        started = true;

        counters.forEach(counter => {

            const original = counter.innerText;

            const number = parseInt(original);

            if (isNaN(number)) return;

            let count = 0;

            const speed = number / 80;

            const update = () => {

                count += speed;

                if (count < number) {

                    counter.innerText = Math.floor(count) + "+";

                    requestAnimationFrame(update);

                } else {

                    if (original.includes("%")) {
                        counter.innerText = number + "%";
                    } else if (original.includes("+")) {
                        counter.innerText = number + "+";
                    } else {
                        counter.innerText = number;
                    }

                }

            };

            update();

        });

    }

});

// ============================================
// Contact Form
// ============================================

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Thank you for contacting Arab Al Sharq.\n\nOur team will contact you shortly.");

        form.reset();

    });

}

// ============================================
// Gallery Hover Effect
// ============================================

document.querySelectorAll(".gallery-grid img").forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.filter = "brightness(110%)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.filter = "brightness(100%)";

    });

});

// ============================================
// Hero Button Animation
// ============================================

const heroBtn = document.querySelector(".btn");

if (heroBtn) {

    setInterval(() => {

        heroBtn.animate(

            [

                { transform: "scale(1)" },

                { transform: "scale(1.05)" },

                { transform: "scale(1)" }

            ],

            {

                duration: 2000,

                iterations: 1

            }

        );

    }, 3000);

}

// ============================================
// Current Year in Footer (Optional)
// ============================================

const footer = document.querySelector("footer p");

if (footer) {

    footer.innerHTML =
        `© ${new Date().getFullYear()} Arab Al Sharq | Luxury Perfumes UAE | All Rights Reserved`;

}