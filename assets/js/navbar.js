document.addEventListener("DOMContentLoaded", () => {

// activate the path used
    const links = document.querySelectorAll(".nav-link");
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "") {
        currentPage = "index.html";
    }
    links.forEach(link => { 
        if (link.getAttribute("href") === currentPage) { 
            link.classList.add("active");
        }
    });

    initBurgerMenu();

});

function initBurgerMenu() {
    console.log("execution menu page");
    console.log('burger charge');
    const sidenav = document.getElementById("mySidenav");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");
    const mainContent = document.querySelector("main");


    function openMenu() {
        sidenav.classList.add("active");
        sidenav.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // empêche de scroller en arrière-plan
        mainContent.style.pointerEvents = "none"; // bloque tous les clics hors menu
    }

    // Fonction pour fermer le menu
    function closeMenu() {
        sidenav.classList.remove("active");
        sidenav.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // réactive le scroll
        mainContent.style.pointerEvents = ""; // réactive les clics
    }

    // Clic sur le bouton d’ouverture
    if (openBtn) {
        openBtn.addEventListener("click", openMenu);
    }

    // Clic sur le bouton de fermeture
    if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);
    }

    // Clic à l’extérieur du menu
    document.addEventListener("click", function (event) {
        if (sidenav.classList.contains("active") &&
            !sidenav.contains(event.target) &&
            event.target !== openBtn){
        closeMenu();
        }
    });

    // Fermeture avec la touche Échap
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && sidenav.classList.contains("active")) {
        closeMenu();
        }
    });
}

