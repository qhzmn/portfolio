fetch("assets/json/projects.json")
  .then(res => res.json())
  .then(data => { 

    afficherProjetsParDomaine("projects-web", data.projects, data.categories.web);
    afficherProjetsParDomaine("projects-reseaux", data.projects, data.categories.reseaux);
    afficherProjetsParDomaine("projects-methodes", data.projects, data.categories.methodes);
    afficherProjetsParDomaine("projects-dev", data.projects, data.categories.dev);
  });

function afficherProjetsParDomaine(idContainer, allProjects, projectIds) {
  const container = document.getElementById(idContainer);
  if (!container || !allProjects || !projectIds) return;

  container.innerHTML = ""; 

  projectIds.forEach(id => {
    const projet = allProjects.find(p => p.id === id);
    if (!projet) return;

    const li = document.createElement("li");
    li.innerHTML = `<a href="${projet.url}" target="_blank">${projet.name}</a> (${projet.languages.join(", ")})`;
    container.appendChild(li);
  });
}
