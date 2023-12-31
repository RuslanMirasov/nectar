import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const brendSwiper = new Swiper('.swiperBrend', {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 30,
  speed: 600,
  autoHeight: true,
  navigation: {
    nextEl: '.swiperBrend--next',
    prevEl: '.swiperBrend--prev',
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

const gallerySwiper = new Swiper('.swiperGallery', {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 600,
  autoHeight: true,
  navigation: {
    nextEl: '.swiperGallery--next',
    prevEl: '.swiperGallery--prev',
  },
});

const beforafterSwiper = new Swiper('.beforafterSwiper', {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 600,
  autoHeight: true,
  navigation: {
    nextEl: '.beforafter--next',
    prevEl: '.beforafter--prev',
  },
  breakpoints: {
    1280: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});
