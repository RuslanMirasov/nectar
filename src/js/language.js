const languageButton = document.querySelector('.language');
const languageItems = document.querySelector('[data-language]');
const poddomen = document.querySelector('.poddomen').value;
const pageUrlText = window.location.href;
const pageHost = window.location.host;
const pagePathname = window.location.pathname;
const pageProtocol = window.location.protocol;
const checkEn = pageUrlText.includes('en/');
const checkEt = pageUrlText.includes('et/');

if (languageButton) {
  if (checkEn === true) {
    languageButton.querySelector('.js-current-language').innerHTML = 'en';
    languageButton.querySelector('[data-language="en"]').remove();
  } else if (checkEt === true) {
    languageButton.querySelector('.js-current-language').innerHTML = 'et';
    languageButton.querySelector('[data-language="et"]').remove();
  } else {
    languageButton.querySelector('[data-language="ru"]').remove();
  }

  window.addEventListener('click', languageEvents);

  function languageEvents(e) {
    if (e.target.classList.contains('language')) {
      languageButton.classList.toggle('is-open');
    } else {
      if (languageButton.classList.contains('is-open')) {
        languageButton.classList.remove('is-open');
      }
    }

    if (e.target.classList.contains('language__link')) {
      const currentLang = e.target.dataset.language;
      let newpath = pagePathname.replace('en/', '').replace('et/', '').replace(poddomen, '');
      let newlang = '';
      if (currentLang !== 'ru') {
        newlang = `/${currentLang}`;
      }
      const newUrl = `${pageProtocol}//${pageHost}${poddomen}${newlang}${newpath}`;
      window.location.href = newUrl;
    }
  }
}
