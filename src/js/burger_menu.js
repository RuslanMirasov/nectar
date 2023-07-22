//BURGER MENU
const openMenuBtn = document.querySelectorAll('[data-menu-open]');
const menu = document.querySelector('.menu-backdrop');
const burger = document.querySelector('.burger');
const body = document.querySelector('.body');
const fixEl = [].filter.call(document.all, e => getComputedStyle(e).position == 'fixed');
let fixPadding = window.innerWidth - document.querySelector('.main').offsetWidth;

//NAVIGATION
const menuBackdrop = document.querySelector('.menu-backdrop');
const navigation = document.querySelector('.menu__list');
const navigationItems = navigation.querySelectorAll('li');
const assetsPath = document.querySelector('.js-assets').value;
const arrowMarkup = `<div class="menuArrow"><svg class="menuList__arrow"><use href="${assetsPath}img/icons.svg#arr_down"></use></svg></div>`;

navigationItems.forEach(navItem => {
  if (navItem.querySelector('ul')) {
    navItem.insertAdjacentHTML('beforeend', arrowMarkup);
  }
});

menuBackdrop.addEventListener('click', e => {
  if (window.innerWidth < 1054) {
    if (e.target.classList.contains('menu-backdrop')) {
      menuToggle();
    }
    if (e.target.classList.contains('menuArrow')) {
      e.target.classList.toggle('is-hovered');
      e.target.closest('li').querySelector('ul').classList.toggle('is-hovered');
      const submenu = e.target.closest('li').querySelector('ul');
      if (submenu.classList.contains('is-hovered')) {
        $(submenu).slideDown();
      } else {
        $(submenu).slideUp();
      }
    }
  }
});

// MOBIL MENU OPEN / CLOSE
openMenuBtn.forEach(openBtn => {
  openBtn.addEventListener('click', menuToggle);
});

function menuToggle() {
  menu.classList.toggle('is-open');
  burger.classList.toggle('is-open');
  body.classList.toggle('lock');
  closeOllSubmenus();
  scrollbarChange();
}

window.addEventListener('resize', sctollbarWidthFix);
window.addEventListener('orientationchange', sctollbarWidthFix);

function sctollbarWidthFix() {
  fixPadding = window.innerWidth - document.querySelector('.main').offsetWidth;
}

//SCROLL BAR MODIFY
function scrollbarChange() {
  fixEl.forEach(fixedElement => {
    if (body.classList.contains('lock')) {
      body.style.paddingRight = fixPadding + 'px';
      fixedElement.style.paddingRight = fixPadding + 'px';
    } else {
      body.style.paddingRight = '0px';
      fixedElement.style.paddingRight = '0px';
    }
  });
}

function closeOllSubmenus() {
  if (window.innerWidth < 1054 && !body.classList.contains('lock')) {
    setTimeout(() => {
      $('.menu__list ul').slideUp();
      $('.menu__list ul').removeClass('is-hovered');
      $('.menuArrow').removeClass('is-hovered');
    }, 500);
  }
}
