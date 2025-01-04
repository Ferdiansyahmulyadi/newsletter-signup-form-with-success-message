'use strict';

// global variables
let isDesktop = false;
let isMobile = true;

// query selectors
let mainContainer = document.querySelector('.container');

let signUpFormMobile = document.createElement('div');
let signUpFormDesktop = document.createElement('div');
let successMessage = document.createElement('div');

// render functions
function renderSuccessMessage(emailInput) {
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

function renderSignUpMobile() {
  console.log('mobile');
  signUpFormMobile.className = 'sign-up-form';
  signUpFormMobile.innerHTML = `
    <img
      src="./assets/images/illustration-sign-up-mobile.svg"
      class="sign-up-illustration"
      alt="sign up illustration"
    />
    <div class="sign-up-benefits">
      <h1 class="h1-style">Stay updated!</h1>
      <p>Join 60,000+ product managers receiving monthly updates on:</p>
      <ul>
        <li>
          <img src="/assets/images/icon-list.svg" alt="icon list" />
          <p>Product discovery and building what matters</p>
        </li>
        <li>
          <img src="/assets/images/icon-list.svg" alt="icon list" />
          <p>Measuring to ensure updates are a success</p>
        </li>
        <li>
          <img src="/assets/images/icon-list.svg" alt="icon list" />
          <p>And much more!</p>
        </li>
      </ul>
    </div>
    <form id="form" novalidate>
      <div class="email-group">
        <label for="email" class="email-label">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          class="email-input"
          placeholder="email@company.com"
          autocomplete="on"
        />
      </div>
      <button type="submit" class="submit-button">
        Subscribe to monthly newsletter
      </button>
    </form>
  `;
}

function renderSignUpDesktop() {
  console.log('desktop');
  signUpFormDesktop.className = 'sign-up-form';
  signUpFormDesktop.innerHTML = `
    <div class="sign-up-benefits">
      <h1 class="h1-style">Stay updated!</h1>
      <p>Join 60,000+ product managers receiving monthly updates on:</p>
      <ul>
        <li>
          <img src="/assets/images/icon-list.svg" alt="icon list" />
          <p>Product discovery and building what matters</p>
        </li>
        <li>
          <img src="/assets/images/icon-list.svg" alt="icon list" />
          <p>Measuring to ensure updates are a success</p>
        </li>
        <li>
          <img src="/assets/images/icon-list.svg" alt="icon list" />
          <p>And much more!</p>
        </li>
      </ul>
      <form id="form" novalidate>
        <div class="email-group">
          <label for="email" class="email-label">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            class="email-input"
            placeholder="email@company.com"
            autocomplete="on"
          />
        </div>
        <button type="submit" class="submit-button">
          Subscribe to monthly newsletter
        </button>
      </form>
    </div>
    <img
      src="/assets/images/illustration-sign-up-desktop.svg"
      class="sign-up-illustration"
      alt="sign up illustration"
    />
  `;
}

function checkInitialWindowSize() {
  if (window.innerWidth >= 992) {
    isDesktop = true;
    isMobile = false;
    renderSignUpDesktop();
    mainContainer.appendChild(signUpFormDesktop);
    let form = document.getElementById('form');
    form.addEventListener('submit', handleSubmit);
  } else {
    isDesktop = false;
    isMobile = true;
    renderSignUpMobile();
    mainContainer.appendChild(signUpFormMobile);
    let form = document.getElementById('form');
    form.addEventListener('submit', handleSubmit);
  }
}

// event handlers
const handleSubmit = (e) => {
  e.preventDefault(e);

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  renderSuccessMessage(data.email);

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
    if (window.innerWidth >= 992) {
      mainContainer.replaceChild(successMessage, signUpFormDesktop);
      let dismissMessageBtn = document.querySelector('.dismiss-message-btn');

      dismissMessageBtn.addEventListener('click', () => {
        mainContainer.replaceChild(signUpFormDesktop, successMessage);
      });
    } else {
      mainContainer.replaceChild(successMessage, signUpFormMobile);
      let dismissMessageBtn = document.querySelector('.dismiss-message-btn');

      dismissMessageBtn.addEventListener('click', () => {
        mainContainer.replaceChild(signUpFormMobile, successMessage);
      });
    }
  }
};

// event listeners
window.addEventListener('resize', () => {
  console.log(window.innerWidth);
  console.log(window.innerHeight);

  if (window.innerWidth >= 992) {
    if (isMobile) {
      isMobile = false;
      isDesktop = true;
      renderSignUpDesktop();
      mainContainer.replaceChild(signUpFormDesktop, signUpFormMobile);
      let form = document.getElementById('form');
      form.addEventListener('submit', handleSubmit);
    } else if (isDesktop) {
      return;
    }
  } else {
    if (isDesktop) {
      isMobile = true;
      isDesktop = false;
      renderSignUpMobile();
      mainContainer.replaceChild(signUpFormMobile, signUpFormDesktop);
      let form = document.getElementById('form');
      form.addEventListener('submit', handleSubmit);
    } else if (isMobile) {
      return;
    }
  }
});

// initial render
checkInitialWindowSize();
