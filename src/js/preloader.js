const preloaderWrapper = document.querySelector('.preloader');
window.addEventListener('load', preloaderHide);

//PRELOADER
function preloaderHide() {
  setTimeout(function () {
    preloaderWrapper.classList.add('is--hidden');
  }, 300);
}
