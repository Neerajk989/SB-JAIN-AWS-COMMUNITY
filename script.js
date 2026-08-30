/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 900);

});



/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});



/* =========================================================
   COUNTDOWN
========================================================= */

/*
    Change this date when your real event date is confirmed.

    Example:

    const eventDate = new Date("2026-12-15T09:00:00").getTime();
*/

const eventDate = new Date("2026-12-31T09:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = eventDate - now;


    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }


    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);



/* =========================================================
   NUMBER COUNTERS
========================================================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const counter = entry.target;

            const target =
                Number(counter.dataset.target);

            let current = 0;

            const duration = 1600;

            const startTime = performance.now();


            function animateCounter(currentTime) {

                const progress =
                    Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                current =
                    Math.floor(
                        progress * target
                    );

                counter.textContent = current;


                if (progress < 1) {

                    requestAnimationFrame(
                        animateCounter
                    );

                } else {

                    counter.textContent = target;

                }

            }


            requestAnimationFrame(
                animateCounter
            );


            counterObserver.unobserve(counter);

        });

    },

    {
        threshold: .7
    }

);


counters.forEach(counter => {

    counterObserver.observe(counter);

});



/* =========================================================
   FAQ
========================================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");


faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const item =
            question.parentElement;


        document
            .querySelectorAll(".faq-item")
            .forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove(
                        "active"
                    );

                }

            });


        item.classList.toggle("active");

    });

});



/* =========================================================
   LIVE PARALLAX BACKGROUND
========================================================= */

const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image");


if (hero && heroImage) {

    hero.addEventListener("mousemove", event => {

        const x =
            (event.clientX / window.innerWidth - .5) * 2;

        const y =
            (event.clientY / window.innerHeight - .5) * 2;


        heroImage.style.transform = `
            scale(1.09)
            translate3d(
                ${x * -7}px,
                ${y * -5}px,
                0
            )
        `;

    });


    hero.addEventListener("mouseleave", () => {

        heroImage.style.transform =
            "scale(1.08) translate3d(0,0,0)";

    });

}



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".feature-card, .speaker-card, .team-card, .value, .agenda-item"
);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

});


const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.style.opacity = "1";

            entry.target.style.transform =
                "translateY(0)";

            revealObserver.unobserve(
                entry.target
            );

        });

    },

    {
        threshold: .12
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.background =
            "rgba(4,8,14,.94)";

        navbar.style.boxShadow =
            "0 15px 50px rgba(0,0,0,.4)";

    } else {

        navbar.style.background =
            "rgba(7,12,21,.82)";

        navbar.style.boxShadow =
            "0 20px 70px rgba(0,0,0,.35)";

    }

});



/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.style.color = "#aeb8c7";

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.style.color = "#ff9900";

        }

    });

});