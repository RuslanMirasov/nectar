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
