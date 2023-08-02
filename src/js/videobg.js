import throttle from 'lodash.throttle';
const videoBackrounds = document.querySelectorAll('.video-bg');

window.addEventListener('load', throttle(videoBgLoading, 250));
window.addEventListener('resize', throttle(videoBgLoading, 250));

function videoBgLoading() {
  if (videoBackrounds.length > 0) {
    videoBackrounds.forEach(videoBackround => {
      videoBackround.innerHTML = '';
      const desctopUrl = videoBackround.dataset.desctop;
      const mobilUrl = videoBackround.dataset.mobil;
      if (window.innerWidth >= 1024) {
        videoBackround.insertAdjacentHTML('beforeend', `<source type='video/mp4' src='${desctopUrl}' />`);
      } else {
        videoBackround.insertAdjacentHTML('beforeend', `<source type='video/mp4' src='${mobilUrl}' />`);
      }
    });
  }
}
