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

function initBurgerMenu() {
    console.log('burger charge');
    const sidenav = document.getElementById("mySidenav");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");
    const mainContent = document.querySelector("main"); // conteneur hors menu


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
        if (
        sidenav.classList.contains("active") &&
        !sidenav.contains(event.target) &&
        event.target !== openBtn
        ) {
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


initBurgerMenu();


function initializeLanguage() {
  // 1. Check if a language preference is already saved in localStorage.
  let langue = localStorage.getItem('mainLanguage');

  // 2. If no language is found, use the user's browser language.
  //    If the browser language isn't available, default to 'fr'.
  if (!langue) {
    langue = navigator.language.substring(0, 2) || 'fr';
    localStorage.setItem('mainLanguage', langue);
  }

  // At this point, the 'langue' variable holds the correct language preference.
  // You would then call a function here to update the content on your page
  // based on this 'langue' value.
  // For example:
  // updatePageContent(langue);
  console.log('Langue actuelle :', langue);
}







