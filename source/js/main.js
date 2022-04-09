// import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js';

const swiper =
new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.slider__arrows-item--next',
    prevEl: '.slider__arrows-item--prew',
  },

  slidesPerView: 4,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
      pagination: {
        el: '.slider__pagination',
        type: 'fraction',
        // clickable: true,
        renderFraction(currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
        },
      },
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
      pagination: {
        el: '.slider__pagination',
        type: 'bullets',
        clickable: true,
        renderBullet(index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
      slidesPerGroup: 4,
      pagination: {
        el: '.slider__pagination',
        type: 'bullets',
        clickable: true,
        renderBullet(index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    },
  },
});

// faq
const faqAccordeonButtons = document.querySelectorAll('.faq__question-head button');

if (faqAccordeonButtons) {
  for (let i = 0; i < faqAccordeonButtons.length; i++) {
    const parent = faqAccordeonButtons[i].closest('.accordeon-item');
    faqAccordeonButtons[i].addEventListener('click', () => {
      parent.classList.toggle('accordeon-item--open');
    });
  }
}

// главное меню
const menuButton = document.querySelector('.header__menu-button');
const page = document.querySelector('.page');
menuButton.addEventListener('click', () => {
  page.classList.toggle('page--menu-open');
});

// import {iosVhFix} from './utils/ios-vh-fix';
// import {initModals} from './modules/modals/init-modals';

// ---------------------------------

// window.addEventListener('DOMContentLoaded', () => {

//   // Utils
//   // ---------------------------------

//   iosVhFix();

//   // Modules
//   // ---------------------------------

//   // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
//   // в load следует добавить скрипты, не участвующие в работе первого экрана
//   window.addEventListener('load', () => {
//     initModals();
//   });
// });

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
