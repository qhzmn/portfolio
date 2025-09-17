function loadProjects(lang) {

    let file = lang === "en" 
    ? "assets/json/dataEn.json" 
    : "assets/json/dataFr.json";

    return fetch(file)
    .then(res => res.json())
    .then(data => {
        const projets = data.projects;
        const container = document.getElementById("projects-all");
        if (!container) {
        console.error("Le conteneur projects-all est introuvable dans le HTML.");
        return;
        }
        container.innerHTML = ""; // On vide avant de remplir
        projets.forEach(projet => {
            const div = document.createElement("div");
            div.classList.add("repo");
            
            div.innerHTML = `
            <h2><a href="${projet.url}" target="_blank">${projet.name}</a></h2>
            <hr>
            <p>${projet.description || "Aucune description"}</p>
            <p><strong data-i18n="languages"></strong>${projet.languages.join(', ') || 'Inconnu'}</p>
            <a href="${projet.url}" target="_blank" rel="noopener" class="button-project" data-i18n="button-github"></a>
            <button class="button-project-readme" data-repo="${projet.readme}" data-i18n="button-readme"></button>
            `;
            container.appendChild(div);
        });

        document.querySelectorAll(".button-project-readme").forEach(btn => {
            btn.addEventListener("click", () => {
            const repo = btn.getAttribute("data-repo");
            afficherReadme(repo);
            });
        });
    })
    .catch(err => console.error("Erreur chargement projets.json :", err));





}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("execution projet page");
  await loadProjects(localStorage.getItem('mainLanguage') || 'en');
  initPage();
});


// Écoute un événement envoyé par language.js
window.addEventListener("languageChange", (e) => {
  loadProjects(e.detail);
});





