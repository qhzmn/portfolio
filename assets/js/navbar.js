const links = document.querySelectorAll(".nav-link");
const currentPage = window.location.pathname.split("/").pop();
console.log(currentPage);

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
