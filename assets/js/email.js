emailjs.init("70cwznpxKMigjDefQ"); 

const form = document.getElementById('contact-form');
const status = document.getElementById('status');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  emailjs.sendForm('service_2mzeq9o', 'template_49zrnyk', this)
    .then(() => {
      status.textContent = "Message envoyé avec succès !";
      status.style.color = "green";
      form.reset();
    }, (error) => {
      status.textContent = "Erreur lors de l'envoi : " + error.text;
      status.style.color = "red";
    });
});
