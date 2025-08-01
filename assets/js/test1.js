document.addEventListener("DOMContentLoaded", () => {
    fetch("assets/json/projects.json")
    .then(res => res.json())
    .then(data => {
        const projets = data.projects;
        const container = document.getElementById("projects-all");
        if (!container) {
        console.error("Le conteneur projects-all est introuvable dans le HTML.");
        return;
        }
        projets.forEach(projet => {
            const div = document.createElement("div");
            div.classList.add("repo");
            
            div.innerHTML = `
            <h2><a href="${projet.url}" target="_blank">${projet.name}</a></h2>
            <hr>
            <p>${projet.description || "Aucune description"}</p>
            <p><strong>Langages :</strong> ${projet.languages.join(", ") || "Inconnu"}</p>
            <a href="${projet.url}" target="_blank" rel="noopener" class="button-project">Voir sur GitHub</a>
            <button class="button-project-readme" data-repo="${projet.readme}">Voir README</button>
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
});


