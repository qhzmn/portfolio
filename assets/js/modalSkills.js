document.addEventListener("DOMContentLoaded", () => {
  const skillsAll = document.getElementById('skills-all'); // conteneur parent

  skillsAll.addEventListener('click', (event) => {
    console.log("clic sur skills");

    // Vérifie si on a cliqué sur un <li> ou un de ses enfants
    const li = event.target.closest('li');
    if (!li) return;

    // Récupère le bouton à l’intérieur du li
    const button = li.querySelector('.skill-btn');
    if (!button) return;

    // Maintenant, peu importe où on clique dans le <li>, on utilise le bouton comme référence
    const desc = button.getAttribute('data-desc');
    modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
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
