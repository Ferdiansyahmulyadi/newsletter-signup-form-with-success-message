'use strict';

let mainContainer = document.querySelector('.container');
const form = document.getElementById('form');
let signUpForm = document.querySelector('.sign-up-form');

let successMessage = document.createElement('div');

function render(emailInput) {
  successMessage.className = 'success-message';
  successMessage.innerHTML = `
    <div class="thank-you-message">
      <img
        src="/assets/images/icon-success.svg"
        class="success-icon"
        alt="success icon"
      />
      <h1 class="h1-mobile">Thanks for subscribing!</h1>
      <p>
        A confirmation email has been sent to
        <span>${emailInput}</span>. Please open it and click the
        button inside to confirm your subscription.
      </p>
    </div>
    <div class="dismiss-message-btn">
      <p class="dismiss-message">Dismiss message</p>
    </div>
  `;
}

const handleSubmit = (e) => {
  e.preventDefault(e);

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  render(data.email);

  if (data.email === '') {
    alert('Please enter a valid email address');
    return;
  } else if (!data.email.includes('@')) {
    alert('Please enter a valid email address');
    return;
  } else if (!data.email.includes('.')) {
    alert('Please enter a valid email address');
    return;
  } else {
    mainContainer.replaceChild(successMessage, signUpForm);
    let dismissMessageBtn = document.querySelector('.dismiss-message-btn');

    dismissMessageBtn.addEventListener('click', () => {
      mainContainer.replaceChild(signUpForm, successMessage);
    });
  }
};

form.addEventListener('submit', handleSubmit);
