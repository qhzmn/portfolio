// Dans skillmodal.js
document.addEventListener("DOMContentLoaded", () => {

const skillsAll = document.getElementById('skills-all'); // Ou tout autre conteneur parent

skillsAll.addEventListener('click', (event) => {
    console.log("btn-clic");
  // Vérifie si l'élément cliqué est un bouton avec la classe 'skill-btn'
  if (event.target.classList.contains('skill-btn')) {
    
    const button = event.target;
    const desc = button.getAttribute('data-desc');
    modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
  }
});

modalClose.addEventListener('click', () => {
  modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) { 
    modal.setAttribute('aria-hidden', 'true');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    modal.setAttribute('aria-hidden', 'true');
  }
});


});

