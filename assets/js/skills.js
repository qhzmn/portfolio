function loadSkills(lang) {
  let file = lang === "en" 
    ? "assets/json/dataEn.json" 
    : "assets/json/dataFr.json";

  return fetch(file)
    .then(res => res.json())
    .then(data => { 
      const container = document.getElementById("skills-all");
      if (!container) {
        console.error("Le conteneur skills-all est introuvable dans le HTML.");
        return;
      }

      container.innerHTML = ""; // Vider avant de re-remplir

      data.skills.forEach(skill => {
        const section = document.createElement("section");
        section.classList.add("container-competence");
        section.innerHTML = `
          <h2>${skill.category}</h2>
          <hr>
        `;

        // Liste des compétences
        const ulSkills = document.createElement("ul");
        ulSkills.classList.add("skills-list");
        skill.items.forEach(item => {
          const stars = '⭐'.repeat(item.rating) + ' ☆'.repeat(5-item.rating);
          ulSkills.innerHTML += `
            <li>
              <button class="skill-btn" data-desc="${item.description}">${item.name}</button>
              <span class="skill-rating">${stars}</span>
            </li>
          `;
        });
        section.appendChild(ulSkills);

        // Certifications
        if (skill.certifications.length > 0) {
          section.innerHTML += `<h3 data-i18n='certifications-subtitle'></h3>`;
          const ulCertifications = document.createElement("ul");
          ulCertifications.classList.add("formation-list");
          skill.certifications.forEach(cert => {
            ulCertifications.innerHTML += `
              <li>${cert.name}<span class="year">(${cert.year})</span></li>
            `;
          });
          section.appendChild(ulCertifications);
        }

        // Projets
        if (skill.projects.length > 0) {
          section.innerHTML += `<h3 data-i18n='skills-subtitle'></h3>`;
          const ulProjects = document.createElement("ul");
          ulProjects.classList.add("projects-list");
          skill.projects.forEach(idProject => {
            const project = data.projects.find(p => p.id === idProject);
            if (project) {
              ulProjects.innerHTML += `
                <li><a href="${project.url}" target="_blank">${project.name}</a> (${project.languages.join(", ")})</li>
              `;
            }
          });
          section.appendChild(ulProjects);
        }

        container.appendChild(section);
      });
    })
    .catch(err => console.error("Erreur lors du chargement des compétences :", err));
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadSkills(localStorage.getItem('mainLanguage') || 'en');
  initPage();
});

// Écoute un événement envoyé par language.js
window.addEventListener("languageChange", (e) => {
  loadSkills(e.detail);
});


