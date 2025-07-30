function includeHTML(id, url, callback) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (typeof callback === "function") callback(); 
    })
    .catch(error => {
      console.error("Erreur d'inclusion :", error);
    });
}

includeHTML("header", "navbar.html", () => {
  const script = document.createElement("script");
  script.src = "assets/js/navbar.js";
  document.body.appendChild(script);
});

includeHTML("footer", "footer.html");


