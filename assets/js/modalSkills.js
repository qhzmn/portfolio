const modal = document.getElementById('modal');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.skill-btn').forEach(button => {
  button.addEventListener('click', () => {
    const desc = button.getAttribute('data-desc');
    modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
  });
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
