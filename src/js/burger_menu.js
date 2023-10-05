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
const menuArrowMarkup = `<div class="menuArrow"><svg viewBox="0 0 16 16" class="menuList__arrow"><path d="M8.00004 11L8.70715 11.7071C8.31662 12.0976 7.68346 12.0976 7.29293 11.7071L8.00004 11ZM13.7072 6.70711L8.70715 11.7071L7.29293 10.2929L12.2929 5.2929L13.7072 6.70711ZM7.29293 11.7071L2.29294 6.70711L3.70714 5.2929L8.70715 10.2929L7.29293 11.7071Z"/></svg></div>`;

navigationItems.forEach(navItem => {
  if (navItem.querySelector('ul')) {
    navItem.insertAdjacentHTML('beforeend', menuArrowMarkup);
    navItem.querySelector('a').style.pointerEvents = 'none';
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
