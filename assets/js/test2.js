const modal = document.getElementById("readme-modal");
const modalContent = document.getElementById("readme-content");
const closeBtn = document.getElementById("close-modal");

function afficherReadme(nomRepo) {
  fetch(`https://api.github.com/repos/qhzmn/${nomRepo}/readme`, {
    headers: {
      Accept: "application/vnd.github.v3.html"
    }
  })
  .then(response => {
    if (!response.ok) throw new Error("README introuvable");
    return response.text();
  })
  .then(readmeHTML => {
    modalContent.innerHTML = `
      <button id="close-modal" class="absolute top-2 right-2 text-red-600 text-xl">✖</button>
      <article class="markdown-body">${readmeHTML}</article>`;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Réattacher le bouton de fermeture
    document.getElementById("close-modal").addEventListener("click", fermerModal);
  })
  .catch(error => {
    modalContent.innerHTML = `<p>Erreur : ${error.message}</p>`;
    modal.classList.remove("hidden");
  });
}

function fermerModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") fermerModal();
});

modal.addEventListener("click", e => {
  if (e.target === modal) fermerModal();
});
