// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


// CLOSE MENU WHEN LINK IS CLICKED

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });

});


// FAQ

document.querySelectorAll(".faq-item button").forEach(button => {

    button.addEventListener("click", () => {

        const item = button.parentElement;

        document.querySelectorAll(".faq-item").forEach(other => {

            if (other !== item) {
                other.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});


// NAVBAR BACKGROUND

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(5,5,5,.97)";

    } else {

        navbar.style.background = "rgba(8,8,8,.9)";

    }

});