const username = "qhzmn";
const modal = document.getElementById("readme-modal");
const modalContent = document.getElementById("readme-content");
const closeBtn = document.getElementById("close-modal");

function afficherReadme(nomRepo) {
  let lang = localStorage.getItem('mainLanguage') || 'fr';
  let fileToFetch = lang === "en" ? "readme" : "contents/README.fr.md";

  // Première tentative pour le fichier spécifique à la langue (ex: README.fr.md)
  fetch(`https://api.github.com/repos/${username}/${nomRepo}/${fileToFetch}`, {
    headers: {
      Accept: "application/vnd.github.v3.html"
    }
  })
  .then(response => {
    // Si la réponse n'est pas OK et que c'est une erreur 404, on passe à la version par défaut
    if (!response.ok && response.status === 404) {
      throw new Error("README not found, fallback to default.");
    } else if (!response.ok) {
      // Pour les autres erreurs, on les gère normalement
      throw new Error("Failed to fetch README.");
    }
    return response.text();
  })
  .then(readmeHTML => {
    // Si tout se passe bien, on affiche le contenu
    displayModalContent(nomRepo, readmeHTML);
  })
  .catch(error => {
    // Si la première tentative échoue (erreur 404), on essaie de récupérer le README par défaut
    if (error.message.includes("fallback to default")) {
      fetch(`https://api.github.com/repos/${username}/${nomRepo}/readme`, {
        headers: {
          Accept: "application/vnd.github.v3.html"
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("README par défaut introuvable.");
        }
        return response.text();
      })
      .then(readmeHTML => {
        displayModalContent(nomRepo, readmeHTML);
      })
      .catch(error => {
        // Gérer les erreurs si même le README par défaut ne peut être récupéré
        console.error("Erreur :", error);
        modalContent.innerHTML = `<p>${error.message}</p>`;
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    } else {
      // Gérer les autres erreurs qui ne sont pas des 404
      console.error("Erreur :", error);
      modalContent.innerHTML = `<p>${error.message}</p>`;
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  });
}

function displayModalContent(nomRepo, readmeHTML) {
  modalContent.innerHTML = `<h2>README de ${nomRepo}</h2><article class="markdown-body">${readmeHTML}</article>`;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// Fermer la modale
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
});

// Optionnel : fermer avec Échap
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
});