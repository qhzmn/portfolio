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

(function () {
    const sidenav = document.getElementById("mySidenav");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");

    openBtn.addEventListener("click", function () {
        sidenav.classList.add("active");
        sidenav.setAttribute("aria-hidden", "false");
    });

    closeBtn.addEventListener("click", function () {
        sidenav.classList.remove("active");
        sidenav.setAttribute("aria-hidden", "true");
    });

    document.addEventListener("click", function (event) {
        if (sidenav.classList.contains("active") &&
            !sidenav.contains(event.target) &&
            event.target !== openBtn) {
            sidenav.classList.remove("active");
            sidenav.setAttribute("aria-hidden", "true");
        }
    });
})
;



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







