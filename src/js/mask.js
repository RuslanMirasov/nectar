import Inputmask from 'inputmask';

const phones = document.querySelectorAll('.input--tel');
const ruMask = new Inputmask('+7 (999) 999-99-99');

phones.forEach(phone => {
  ruMask.mask(phone);
});
