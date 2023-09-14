// interfaces
interface ErrorMessages {
  stringLength: string;
  email: string;
  birthdate: string;
  nbTournament: string;
  city: string;
  generalTerms: string;
}

// DOM Elements
const modalbg: HTMLElement | null = document.querySelector('.bground');
const modalBtn: NodeListOf<HTMLElement> =
  document.querySelectorAll('.modal-btn');
const closesBtn: NodeListOf<HTMLElement> =
  document.querySelectorAll('.close-modal');
const formData: NodeListOf<HTMLElement> =
  document.querySelectorAll('.formData');

// DOM elem (Form)
const formElem: HTMLFormElement | null = document.querySelector('form');
const firstnameElem: HTMLInputElement | null = document.querySelector('#first');
const lastnameElem: HTMLInputElement | null = document.querySelector('#last');
const emailElem: HTMLInputElement | null = document.querySelector('#email');
const numberElem: HTMLInputElement | null = document.querySelector('#quantity');
const radiosElem: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  'input[type="radio"].checkbox-input'
);
const generalTermsElem: HTMLInputElement | null =
  document.querySelector('#checkbox1');

// regex
const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const numberRegex: RegExp = /^\d+$/;

// Error messages
const errorMessages: ErrorMessages = {
  stringLength: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
  email: 'Email non valide',
  birthdate: 'Vous devez entrer votre date de naissance.',
  nbTournament: 'Entrez un nombre',
  city: 'Vous devez choisir une option.',
  generalTerms:
    'Vous devez vérifier que vous acceptez les termes et conditions.',
};

function editNav() {
  var x: HTMLElement = document.getElementById('myTopnav')!;
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  if (modalbg instanceof HTMLElement) {
    modalbg.style.display = 'block';
  }
}
// close modal event
closesBtn.forEach((btn) => btn.addEventListener('click', closeModal));

// close modal
function closeModal() {
  if (modalbg instanceof HTMLElement) {
    modalbg.style.display = 'none';
  }
}

// set error message for each wrong input
const setErrorMessage = (elem: HTMLInputElement, message: string) => {
  elem.parentElement?.setAttribute('data-error-visible', 'true');
  elem.parentElement?.setAttribute('data-error', message);
};
// hide error message
const hideErrorMessage = (elem: HTMLInputElement) => {
  elem.parentElement?.removeAttribute('data-error-visible');
  elem.parentElement?.removeAttribute('data-error');
};

// conditions of validation form. I created a function for each input type.
// Text input (reusable)
const validInput = (
  elem: HTMLInputElement,
  message: string,
  regex?: RegExp
) => {
  if (elem.value === '' || elem.value.length < 2) {
    setErrorMessage(elem, message);
    return false;
  }
  if (regex && !regex.test(elem.value)) {
    return false;
  }
  hideErrorMessage(elem);
  return true;
};

// Tournament quantity input
const validNumberInput = (
  elem: HTMLInputElement,
  message: string,
  regex: RegExp
) => {
  if (!regex.test(elem.value)) {
    setErrorMessage(elem, message);
    return false;
  }
  hideErrorMessage(elem);
  return true;
};

// City radio input
const validRadioInput = (
  elems: NodeListOf<HTMLInputElement>,
  message: string
) => {
  const isVerified = Array.from(elems).some((el) => el.checked); // some : test if one or more array elem pass a test => return a boolean
  if (!isVerified) {
    elems.forEach((elem) => setErrorMessage(elem, message));
    return false;
  }
  elems.forEach((elem) => hideErrorMessage(elem));
  return true;
};
// Generals Terms Input
const validCheckInput = (elem: HTMLInputElement, message: string) => {
  if (!elem.checked) {
    setErrorMessage(elem, message);
    return false;
  }
  hideErrorMessage(elem);
  return true;
};

// event listener each form elem
// firstname element
firstnameElem?.addEventListener('input', () =>
  validInput(firstnameElem, errorMessages.stringLength)
);
// lastname element
lastnameElem?.addEventListener('input', () =>
  validInput(lastnameElem, errorMessages.stringLength)
);
// Email element
emailElem?.addEventListener('input', () =>
  validInput(emailElem, errorMessages.email, emailRegex)
);
// quantity element (number of tournament participation)
numberElem?.addEventListener('input', () =>
  validNumberInput(numberElem, errorMessages.nbTournament, numberRegex)
);
// checkbox element (generals terms)
generalTermsElem?.addEventListener('input', () => {
  validCheckInput(generalTermsElem, errorMessages.generalTerms);
});
// radio element (city)
radiosElem.forEach((radioElem) =>
  radioElem.addEventListener('change', () => {
    validRadioInput(radiosElem, errorMessages.city);
  })
);
// validation form
const validate = (e: Event) => {
  e.preventDefault();

  // Check conditions of form validity
  const checkFirstnameInput =
    firstnameElem instanceof HTMLInputElement
      ? validInput(firstnameElem, errorMessages.stringLength)
      : false;
  const checkLastnameInput =
    lastnameElem instanceof HTMLInputElement
      ? validInput(lastnameElem, errorMessages.stringLength)
      : false;
  const checkEmailInput =
    emailElem instanceof HTMLInputElement
      ? validInput(emailElem, errorMessages.email, emailRegex)
      : false;
  const checkNumberInput =
    numberElem instanceof HTMLInputElement
      ? validNumberInput(numberElem, errorMessages.nbTournament, numberRegex)
      : false;
  const checkRadioInput = validRadioInput(radiosElem, errorMessages.city);
  const checkCheckboxInput =
    generalTermsElem instanceof HTMLInputElement
      ? validCheckInput(generalTermsElem, errorMessages.generalTerms)
      : false;

  // if each input is verified
  if (
    checkFirstnameInput &&
    checkLastnameInput &&
    checkEmailInput &&
    checkNumberInput &&
    checkRadioInput &&
    checkCheckboxInput
  ) {
    // if each input is verified => applying code behind
    const thanksElem: HTMLElement | null =
      document.querySelector('.thanks-visiting');
    if (formElem != null && thanksElem != null) {
      formElem.style.display = 'none';
      thanksElem.style.display = 'flex';
    }
  } else {
    console.log('form : invalide');
  }
};
formElem?.addEventListener('submit', (e: Event) => validate(e));
