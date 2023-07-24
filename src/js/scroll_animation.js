/*
data-animation="fade-in" - вызов анимации с названием эффекта
data-repeat              - если есть, повторяет анимацию при скроле
data-delay="500"         - задержка анимации в милисекундах
*/
import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', event => {
  const amimateElements = document.querySelectorAll('[data-animation]');
  const body = document.querySelector('.body');
  const header = document.querySelector('.header');
  const SCREEN_GAP = 50;

  window.addEventListener('scroll', throttle(animate, 250));
  window.addEventListener('resize', throttle(animate, 250));
  window.addEventListener('load', function () {
    setTimeout(animate, 500);
  });

  function animate() {
    if (window.scrollY > 0) {
      header.classList.add('fix');
    } else {
      header.classList.remove('fix');
    }
    amimateElements.forEach(element => {
      const windowHeight = window.innerHeight;
      const animationRepeat = element.dataset.repeat;
      const animationDelay = element.dataset.delay;
      const elementScrolltop = element.getBoundingClientRect().top;
      const elementScrollbottom = elementScrolltop + element.offsetHeight;
      let delay = 0;
      if (animationDelay) {
        delay = animationDelay;
      }
      if (elementScrollbottom > SCREEN_GAP && elementScrolltop < windowHeight - SCREEN_GAP) {
        setTimeout(function () {
          element.classList.add('animate');
        }, delay);
      } else {
        if (animationRepeat) {
          element.classList.remove('animate');
        }
      }
    });
  }
});
