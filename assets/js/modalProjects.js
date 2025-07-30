
const username = "qhzmn";
const modal = document.getElementById("readme-modal");
const modalContent = document.getElementById("readme-content");
const closeBtn = document.getElementById("close-modal");

function afficherReadme(nomRepo) {

  fetch(`https://api.github.com/repos/${username}/${nomRepo}/readme`, {
    headers: {
      Accept: "application/vnd.github.v3.html"
    }
  })
    .then(response => {
      if (!response.ok) {
        console.error("Erreur de lecture du README", response.status);
        throw new Error("README introuvable");
      }
      return response.text();
    })
    .then(readmeHTML => {
modalContent.innerHTML = `<h2>README de ${nomRepo}</h2><article class="markdown-body">${readmeHTML}</article>`;
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      
    })
    .catch(error => {
      console.error("Erreur :", error);
      modalContent.innerHTML = `<p>${error.message}</p>`;
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
}

// Fermer la modale
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
    document.body.style.overflow = "";

});

// Optionnel : fermer avec Échap
document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.classList.add("hidden");
      document.body.style.overflow = "";

});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";

  }
});
