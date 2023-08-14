console.log('hello');
// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const closeBtn = document.querySelector('.close');

/* function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
} */

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  if (modalbg instanceof HTMLElement) {
    modalbg.style.display = 'block';
  }
}

// close modal event
closeBtn?.addEventListener('click', closeModal);

// close modal
function closeModal() {
  if (modalbg instanceof HTMLElement) {
    modalbg.style.display = 'none';
  }
}
