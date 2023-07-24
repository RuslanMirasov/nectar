const tabNavigation = document.querySelectorAll('[data-tabnav]');

tabNavigation.forEach(nav => {
  nav.addEventListener('click', e => {
    if (e.target.classList.contains('button--tab') && !e.target.classList.contains('active')) {
      const allTabsButtons = nav.querySelectorAll('[data-tab]');
      const tabNumber = e.target.dataset.tab;
      const tabSection = e.target.closest('.section');
      const currentTab = tabSection.querySelector(`.tab[data-tab="${tabNumber}"]`);

      allTabsButtons.forEach(btn => {
        if (btn.dataset.tab === tabNumber) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      tabSection.querySelectorAll('.tab').forEach(tab => {
        tabHide(tab);
      });
      tabShow(currentTab);
    }
  });
});

function tabHide(tab) {
  tab.style.display = 'none';
  tab.style.opacity = '0';
  tab.style.pointerEvents = 'none';
  tab.style.visibility = 'hidden';
}

function tabShow(tab) {
  tab.style.display = 'block';
  setTimeout(function () {
    tab.style.opacity = '1';
    tab.style.pointerEvents = 'all';
    tab.style.visibility = 'visible';
  }, 10);
}
