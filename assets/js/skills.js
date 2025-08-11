document.addEventListener("DOMContentLoaded", () => {

fetch("assets/json/projects.json")
  .then(res => res.json())
  .then(data => { 
    const skills = data.skills;
    const container = document.getElementById("skills-all");
    if (!container) {
      console.error("Le conteneur projects-all est introuvable dans le HTML.");
      return;
    }
    skills.forEach(skill => {
      const section = document.createElement("section");
      section.classList.add("container-competence");
      section.innerHTML = `
      <h2>${skill.category}</h2>
      <hr>
      `;
      const items = skill.items;
      const ulSkills = document.createElement("ul");
      ulSkills.classList.add("skills-list");
      items.forEach(item => {
        const stars = '⭐'.repeat(item.rating) + ' ☆'.repeat(5-item.rating);
        
        ulSkills.innerHTML = ulSkills.innerHTML + `
        <li>
        <button class="skill-btn" data-desc="${item.description}">${item.name}</button>
        <span class="skill-rating">${stars}</span>
        </li>
        `;
        section.appendChild(ulSkills);  
      });


      const certifications = skill.certifications;
      const ulCertifiactions = document.createElement("ul");
      ulCertifiactions.classList.add("formation-list");
      if (certifications!=0){
        section.innerHTML = section.innerHTML + `<h3>Certifications</h3>`
      };
      certifications.forEach(certification => {
        
        ulCertifiactions.innerHTML = ulCertifiactions.innerHTML + `
        <li>${certification.name}<span class="year">(${certification.year})</span></li>`;
        section.appendChild(ulCertifiactions);  
      });

      const idProjects = skill.projects;
      const allProjects = data.projects;
      const ulProjects = document.createElement("ul");
      ulProjects.classList.add("projects-list");
      if (idProjects!=0){
        section.innerHTML = section.innerHTML + `<h3>Projets liés aux compétences</h3>`
      };
      idProjects.forEach(idProject => {
        const project = allProjects.find(p => p.id === idProject);
        if (!project)  return;
        
        ulProjects.innerHTML = ulProjects.innerHTML+`<li><a href="${project.url}" target="_blank">${project.name}</a> (${project.languages.join(", ")})</li>`;
        
      });
      section.appendChild(ulProjects);


      
      
      
      container.appendChild(section);
    
    
    })

  });
    console.log("JS chargé");
    console.log(document.querySelectorAll('.skill-btn'));




});