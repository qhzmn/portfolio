
const container = document.getElementById("repos");


fetch(`https://api.github.com/users/${username}/repos?sort=updated`, {
  headers: {
      Authorization: `token ${token}`
    }
})
  .then(response => response.json())
  .then(repos => {
    repos.forEach(repo => {
      const div = document.createElement("div");
      div.className = "repo";
      div.innerHTML = `
        
        <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
        <hr>
        <p>${repo.description || "Aucune description"}</p>
        <p>Langage : ${repo.language || "Inconnu"}</p>
        <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener" class="button-style">Voir le projet sur GitHub</a>

      `;

      const button = document.createElement("button");
      button.textContent = "Voir le README";
      button.classList.add("button-style");  // ajoute cette classe

      button.addEventListener("click", () => afficherReadme(repo.name));
      div.appendChild(button);

      container.appendChild(div);

      
    });
  })
  .catch(error => {
    container.innerHTML = "<p>Erreur lors du chargement des projets.</p>";
    console.error(error);
  });
