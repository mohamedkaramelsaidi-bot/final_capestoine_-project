document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  const errorName = document.getElementById('errorName');
  const errorEmail = document.getElementById('errorEmail');
  const errorMessage = document.getElementById('errorMessage');

  let valid = true;
  errorName.textContent = '';
  errorEmail.textContent = '';
  errorMessage.textContent = '';

  name.classList.remove('border-red-500');
  email.classList.remove('border-red-500');
  message.classList.remove('border-red-500');

  if (!name.value.trim()) {
    errorName.textContent = 'Please enter your name.';
    name.classList.add('border-red-500');
    valid = false;
  }

  const emailValue = email.value.trim();
  if (!emailValue || !/^\S+@\S+\.\S+$/.test(emailValue)) {
    errorEmail.textContent = 'Please enter a valid email address.';
    email.classList.add('border-red-500');
    valid = false;
  }

  if (!message.value.trim()) {
    errorMessage.textContent = 'Please enter your message.';
    message.classList.add('border-red-500');
    valid = false;
  }

  if (!valid) return;

  name.value = '';
  email.value = '';
  message.value = '';

  showToast('contact_success');
});

window.addEventListener('DOMContentLoaded', () => {
  if (typeof loadLang === 'function') loadLang();
  if (typeof applyLang === 'function') applyLang();
});