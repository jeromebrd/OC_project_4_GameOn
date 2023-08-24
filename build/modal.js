"use strict";
// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const closeBtn = document.querySelector('.close');
const formData = document.querySelectorAll('.formData');
// DOM elem (Form)
const formElem = document.querySelector('form');
const firstnameElem = document.querySelector('#first');
const lastnameElem = document.querySelector('#last');
const emailElem = document.querySelector('#email');
const numberElem = document.querySelector('#quantity');
const radiosElem = document.querySelectorAll('input[type="radio"].checkbox-input');
const generalTermsElem = document.querySelector('#checkbox1');
// regex
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const numberRegex = /^\d+$/;
// Error messages
const errorMessages = {
    stringLength: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    email: 'Email non valide',
    birthdate: 'Vous devez entrer votre date de naissance.',
    nbTournament: 'Entrez un nombre',
    city: 'Vous devez choisir une option.',
    generalTerms: 'Vous devez vérifier que vous acceptez les termes et conditions.',
};
function editNav() {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
        x.className += ' responsive';
    }
    else {
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
closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', closeModal);
// close modal
function closeModal() {
    if (modalbg instanceof HTMLElement) {
        modalbg.style.display = 'none';
    }
}
// set error message for each wrong input
const setErrorMessage = (elem, message) => {
    var _a, _b;
    (_a = elem.parentElement) === null || _a === void 0 ? void 0 : _a.setAttribute('data-error-visible', 'true');
    (_b = elem.parentElement) === null || _b === void 0 ? void 0 : _b.setAttribute('data-error', message);
};
// hide error message
const hideErrorMessage = (elem) => {
    var _a, _b;
    (_a = elem.parentElement) === null || _a === void 0 ? void 0 : _a.removeAttribute('data-error-visible');
    (_b = elem.parentElement) === null || _b === void 0 ? void 0 : _b.removeAttribute('data-error');
};
// conditions of validation form
// Text input
const validInput = (elem, message, regex) => {
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
const validNumberInput = (elem, message, regex) => {
    if (!regex.test(elem.value)) {
        setErrorMessage(elem, message);
        return false;
    }
    hideErrorMessage(elem);
    return true;
};
// City radio input
const validRadioInput = (elems, message) => {
    const isVerified = Array.from(elems).some((el) => el.checked); // some : test if one or more array elem pass a test => return a boolean
    if (!isVerified) {
        elems.forEach((elem) => setErrorMessage(elem, message));
        return false;
    }
    elems.forEach((elem) => hideErrorMessage(elem));
    return true;
};
// Generals Terms Input
const validCheckInput = (elem, message) => {
    if (!elem.checked) {
        setErrorMessage(elem, message);
        return false;
    }
    hideErrorMessage(elem);
    return true;
};
// event listener each form elem
// firstname element
firstnameElem === null || firstnameElem === void 0 ? void 0 : firstnameElem.addEventListener('input', () => validInput(firstnameElem, errorMessages.stringLength));
// lastname element
lastnameElem === null || lastnameElem === void 0 ? void 0 : lastnameElem.addEventListener('input', () => validInput(lastnameElem, errorMessages.stringLength));
// Email element
emailElem === null || emailElem === void 0 ? void 0 : emailElem.addEventListener('input', () => validInput(emailElem, errorMessages.email, emailRegex));
// quantity element (number of tournament participation)
numberElem === null || numberElem === void 0 ? void 0 : numberElem.addEventListener('input', () => validNumberInput(numberElem, errorMessages.nbTournament, numberRegex));
// checkbox element (generals terms)
generalTermsElem === null || generalTermsElem === void 0 ? void 0 : generalTermsElem.addEventListener('input', () => {
    validCheckInput(generalTermsElem, errorMessages.generalTerms);
});
// radio element (city)
radiosElem.forEach((radioElem) => radioElem.addEventListener('change', () => {
    validRadioInput(radiosElem, errorMessages.city);
}));
// validation form
const validate = (e) => {
    e.preventDefault();
    // Check conditions of form validity
    const checkFirstnameInput = firstnameElem instanceof HTMLInputElement
        ? validInput(firstnameElem, errorMessages.stringLength)
        : false;
    const checkLastnameInput = lastnameElem instanceof HTMLInputElement
        ? validInput(lastnameElem, errorMessages.stringLength)
        : false;
    const checkEmailInput = emailElem instanceof HTMLInputElement
        ? validInput(emailElem, errorMessages.email, emailRegex)
        : false;
    const checkNumberInput = numberElem instanceof HTMLInputElement
        ? validNumberInput(numberElem, errorMessages.nbTournament, numberRegex)
        : false;
    const checkRadioInput = validRadioInput(radiosElem, errorMessages.city);
    const checkCheckboxInput = generalTermsElem instanceof HTMLInputElement
        ? validCheckInput(generalTermsElem, errorMessages.generalTerms)
        : false;
    // if each input is verified
    if (checkFirstnameInput &&
        checkLastnameInput &&
        checkEmailInput &&
        checkNumberInput &&
        checkRadioInput &&
        checkCheckboxInput) {
        // if each input is verified => applying code behind
        console.log('form ok !');
    }
    else {
        console.log('form : invalide');
    }
};
formElem === null || formElem === void 0 ? void 0 : formElem.addEventListener('submit', (e) => validate(e));
