
document.addEventListener("DOMContentLoaded", () => {
  const username = "qhzmn";

  const groupWeb = ["JavaScript", "HTML", "CSS", "PHP"];
  const webProjects = [];

  const groupReseaux = [];
  const reseauxProjects = [];

  const groupDev = ["Python", "C++", "C"];
  const devProjects = [];

  const groupMethodes = [];
  const methodesProjects = [];

  const webList = document.getElementById("projects-web");
  const devList = document.getElementById("projects-dev");
  const reseauxList = document.getElementById("projects-reseaux");
  const methodesList = document.getElementById("projects-methodes");

  fetch(`https://api.github.com/users/${username}/repos`, {
    
  })
  .then(res => res.json())
  .then(async repos => {
    for (const repo of repos) {
      const langRes = await fetch(repo.languages_url, {
        headers: {
          Authorization: `token ${token}`
        }
      });
      const langs = await langRes.json();
      const repoLanguages = Object.keys(langs);

      // Vérifie si au moins un langage est dans groupWeb
      const hasWebLang = repoLanguages.some(lang => groupWeb.includes(lang));
      const hasDevLang = repoLanguages.some(lang => groupDev.includes(lang));
      const hasReseauxLang = repoLanguages.some(lang => groupReseaux.includes(lang));
      const hasDMethodesLang = repoLanguages.some(lang => groupMethodes.includes(lang));


      if (hasWebLang) {
        webProjects.push({
          name: repo.name,
          url: repo.html_url,
          languages: repoLanguages
        });
      }
      if (hasDevLang) {
        devProjects.push({
          name: repo.name,
          url: repo.html_url,
          languages: repoLanguages
        });
      }
      if (hasReseauxLang) {
        reseauxProjects.push({
          name: repo.name,
          url: repo.html_url,
          languages: repoLanguages
        });
      }
      if (hasDMethodesLang) {
        methodesProjects.push({
          name: repo.name,
          url: repo.html_url,
          languages: repoLanguages
        });
      }

}

      reseauxProjects.push(
      {
        name: "calendrier-coiffeuse",
        url: "https://github.com/qhzmn/calendrier-coiffeuse",
        languages: ["PHP", "CSS", "Twig", "JavaScript", "HTML"]
      }
    );

    methodesProjects.push(
      {
        name: "calendrier-coiffeuse",
        url: "https://github.com/qhzmn/calendrier-coiffeuse",
        languages: ["PHP", "CSS", "Twig", "JavaScript", "HTML"]
      }
    );


    

    function displayProjects(listContainer, projects) {
    if (!listContainer) return;
    listContainer.innerHTML = "";
    projects.forEach(proj => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${proj.url}" target="_blank">${proj.name}</a> (${proj.languages.join(", ")})`;
      listContainer.appendChild(li);
    });
  }

  // Affichage des listes
  displayProjects(webList, webProjects);
  displayProjects(devList, devProjects);
  displayProjects(methodesList, methodesProjects);
  //displayProjects(reseauxList, reseauxProjects);

})
.catch(err => console.error("Erreur GitHub API :", err));
});