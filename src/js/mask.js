import intlTelInput from 'intl-tel-input';

const phones = document.querySelectorAll('.input--tel');
const root = document.querySelector('.js-assets').value;
phones.forEach(phone => {
  intlTelInput(phone, {
    utilsScript: root + 'js/utils.js',
    initialCountry: 'auto',
    geoIpLookup: callback => {
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(data => callback(data.country_code))
        .catch(() => callback('us'));
    },
    customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
      console.log(selectedCountryData);
      if (selectedCountryData.dialCode === '7') {
        return '+7 (000) 000 00-00';
      } else if (selectedCountryData.dialCode === '372') {
        return '+372 0000 0000';
      } else {
        return selectedCountryPlaceholder;
      }
    },
  });
});

// import Inputmask from 'inputmask';

// const phones = document.querySelectorAll('.input--tel');
// const ruMask = new Inputmask('+7 (999) 999-99-99');
// const etMask = new Inputmask('+372 9999 9999');
// let currentMask = ruMask;
// const pageUrlText = window.location.href;
// const checkEn = pageUrlText.includes('en/');
// const checkEt = pageUrlText.includes('et/');

// if (checkEn == true || checkEt == true) {
//   currentMask = etMask;
// }

// phones.forEach(phone => {
//   currentMask.mask(phone);
// });
