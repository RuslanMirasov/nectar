import Inputmask from 'inputmask';

const phones = document.querySelectorAll('.input--tel');
const ruMask = new Inputmask('+7 (999) 999-99-99');
const etMask = new Inputmask('+372 9999 9999');
let currentMask = ruMask;
const pageUrlText = window.location.href;
const checkEn = pageUrlText.includes('en/');
const checkEt = pageUrlText.includes('et/');

if (checkEn == true || checkEt == true) {
  currentMask = etMask;
}

phones.forEach(phone => {
  currentMask.mask(phone);
});
