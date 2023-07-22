const mainContent = document.querySelector('.main');
const header = document.querySelector('.header');
const sectionHero = document.querySelector('.section--hero');
let headerHeight = 0;

if (!sectionHero) {
  window.addEventListener('load', mainPaddingTop);
  window.addEventListener('resize', mainPaddingTop);
} else {
  header.classList.add('header--light');
}

// MAIN PADDING-TOP OPTIONS
function mainPaddingTop() {
  headerHeight = header.getBoundingClientRect().height;
  mainContent.style.paddingTop = headerHeight + 'px';
}
