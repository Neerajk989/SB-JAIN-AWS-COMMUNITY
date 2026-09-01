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


/* =========================================================
   LIVE NETWORK BACKGROUND + CURSOR
========================================================= */
(() => {
    const canvas = document.getElementById("liveCanvas");
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0;
    let height = 0;
    let frame = 0;
    const pointer = { x: -999, y: -999 };
    let nodes = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const isSmallScreen = window.matchMedia("(max-width: 700px)").matches || window.matchMedia("(pointer: coarse)").matches;
        const count = Math.min(isSmallScreen ? 28 : 80, Math.max(isSmallScreen ? 16 : 28, Math.floor(width / (isSmallScreen ? 26 : 18))));
        nodes = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - .5) * .22,
            vy: (Math.random() - .5) * .16,
            r: Math.random() * 1.5 + .5
        }));
    }

    function draw() {
        if (!reduced.matches) frame = requestAnimationFrame(draw);
        ctx.clearRect(0, 0, width, height);
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            if (node.x < -20) node.x = width + 20;
            if (node.x > width + 20) node.x = -20;
            if (node.y < -20) node.y = height + 20;
            if (node.y > height + 20) node.y = -20;
        });

        nodes.forEach((a, index) => {
            const nearPointer = Math.max(0, 1 - Math.hypot(a.x - pointer.x, a.y - pointer.y) / 180);
            ctx.beginPath();
            ctx.arc(a.x, a.y, a.r + nearPointer * 1.7, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(217, 255, 0, ${.28 + nearPointer * .62})`;
            ctx.shadowBlur = nearPointer * 18;
            ctx.shadowColor = "rgba(217, 255, 0, .8)";
            ctx.fill();
            ctx.shadowBlur = 0;
            for (let next = index + 1; next < nodes.length; next += 1) {
                const b = nodes[next];
                const distance = Math.hypot(a.x - b.x, a.y - b.y);
                if (distance < 132) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(185, 218, 230, ${Math.max(0, .16 - distance / 900)})`;
                    ctx.lineWidth = .6;
                    ctx.stroke();
                }
            }
        });
    }

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", event => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        document.documentElement.style.setProperty("--scroll-progress", `${Math.min(100, (window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100)}%`);
        if (dot && ring) {
            dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
            ring.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
            document.body.classList.add("cursor-ready");
            document.body.classList.toggle("cursor-hover", Boolean(event.target.closest("a, button, .feature-card, .speaker-card, .team-card")));
        }
    }, { passive: true });
    window.addEventListener("pointerleave", () => {
        pointer.x = -999;
        pointer.y = -999;
        document.body.classList.remove("cursor-ready", "cursor-hover");
    });
    window.addEventListener("scroll", () => {
        const scrollable = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        document.documentElement.style.setProperty("--scroll-progress", `${Math.min(100, (window.scrollY / scrollable) * 100)}%`);
    }, { passive: true });
    resize();
    draw();
})();


/* =========================================================
   COMMUNITY BADGE
========================================================= */
(() => {
    const nameInput = document.getElementById("badgeName");
    const namePreview = document.getElementById("badgePreviewName");
    const downloadButton = document.getElementById("badgeDownload");
    if (!nameInput || !namePreview || !downloadButton) return;

    nameInput.addEventListener("input", () => {
        const value = nameInput.value.trim().toUpperCase();
        namePreview.textContent = value || "STUDENT BUILDER";
    });

    downloadButton.addEventListener("click", () => {
        const name = (nameInput.value.trim() || "Student Builder").replace(/[<&>\"']/g, "");
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700"><rect width="1200" height="700" fill="#101a2a"/><rect x="36" y="36" width="1128" height="628" rx="28" fill="none" stroke="#d9ff00" stroke-width="3"/><text x="80" y="120" fill="#d9ff00" font-family="monospace" font-size="28" letter-spacing="6">SB JAIN AWS COMMUNITY</text><text x="80" y="390" fill="#f7f7f2" font-family="Arial, sans-serif" font-size="140" font-weight="800">AWS</text><text x="84" y="500" fill="#bfe6ff" font-family="monospace" font-size="34" letter-spacing="4">${name}</text><text x="84" y="580" fill="#87919e" font-family="monospace" font-size="20" letter-spacing="3">STUDENT BUILDER · BUILD · LEARN · CONNECT</text></svg>`;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "sb-jain-aws-community-badge.svg";
        link.click();
        URL.revokeObjectURL(url);
    });
})();
