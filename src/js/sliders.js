import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const brendSwiper = new Swiper('.swiperBrend', {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 30,
  autoHeight: true,
  navigation: {
    nextEl: '.arr--next',
    prevEl: '.arr--prev',
  },
  breakpoints: {
    520: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});
