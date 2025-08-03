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
})();




