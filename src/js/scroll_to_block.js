const scrollLinks = document.querySelectorAll('[data-scrollto]');
const poddomen = document.querySelector('.poddomen').value;
const header = document.querySelector('.header');
const body = document.querySelector('.body');
const menu = document.querySelector('.menu-backdrop');
const burger = document.querySelector('.burger');

const pageUrlText = window.location.href;
const checkEn = pageUrlText.includes('en/');
const checkEt = pageUrlText.includes('et/');

let languagePege = '';
if (checkEn) {
  languagePege = 'en/';
} else if (checkEt) {
  languagePege = 'et/';
}
// SCROLL TO BLOCK
scrollLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    if (document.querySelector(`.${this.dataset.scrollto}`)) {
      let distance = document.querySelector('.' + this.dataset.scrollto).offsetTop - header.getBoundingClientRect().height;
      window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
      if (body.classList.contains('lock')) {
        menu.classList.toggle('is-open');
        burger.classList.toggle('is-open');
        body.classList.toggle('lock');
      }
    } else {
      const homePage = `${window.location.protocol}//${window.location.host}${poddomen}/${languagePege}#${this.dataset.scrollto}`;
      document.location = homePage;
    }
  });
});
