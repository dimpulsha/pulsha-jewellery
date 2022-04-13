// import {Swiper} from './vendor/swiper.js';

const sliderElement = document.querySelector('.swiper');
if (sliderElement) {

  const swiper =
    new Swiper('.swiper', {
      direction: 'horizontal',
      loop: false,

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
}

const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const focusElementArray = ['input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])', 'a:not([disabled]):not([aria-hidden])', 'div[tabindex]:not([aria-hidden])'];

const loginPopup = document.querySelector('#login-popup');
const menuPopup = document.querySelector('.header__container');

const createSwitchField = (focusListArray, target) => (evt) => {
  const fieldList = target.querySelectorAll(focusListArray);
  const nodesList = Array.prototype.slice.call(fieldList);

  if (evt.key === 'Tab') {
    if (evt.shiftKey) {
      if (evt.target === nodesList[0]) {
        evt.preventDefault();
        nodesList[nodesList.length - 1].focus();
      }
    } else {
      if (evt.target === nodesList[nodesList.length - 1]) {
        evt.preventDefault();
        nodesList[0].focus();
      }
    }
  }
};

const faqAccordeonButtons = document.querySelectorAll('.faq__question-head button');

if (faqAccordeonButtons) {
  faqAccordeonButtons.forEach((element) => {
    const parent = element.closest('.accordeon-item');
    element.addEventListener('click', () => {
      parent.classList.toggle('accordeon-item--open');
    });
  }
  );
}

const menuButton = document.querySelector('.header__menu-button');
const page = document.querySelector('.page');

const removeFilterClass = () => {
  page.classList.remove('page--filter-open');
};

const menuFieldSwitch = createSwitchField(focusElementArray, menuPopup);

if (menuButton) {
  menuButton.addEventListener('click', () => {
    page.classList.toggle('page--menu-open');

    if (page.classList.contains('page--menu-open')) {
      menuPopup.addEventListener('keydown', menuFieldSwitch);
    }

    if (!page.classList.contains('page--menu-open')) {
      menuPopup.removeEventListener('keydown', menuFieldSwitch);
    }
  });
}

const onEscCloseFilter = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    removeFilterClass();
  }
};

const filter = document.querySelector('.filter-form');
const catalogControl = document.querySelector('.catalog__filter-control');

const menuFilterSwitch = createSwitchField(focusElementArray, filter);

if (filter) {
  const fieldsetControl = filter.querySelectorAll('.filter-form__fieldset-control');
  const filterCloseButton = filter.querySelector('.filter-form__close-button');

  if (catalogControl) {
    catalogControl.addEventListener('click', () => {
      page.classList.add('page--filter-open');
      document.addEventListener('keydown', onEscCloseFilter);
      filter.addEventListener('keydown', menuFilterSwitch);
    });
  }

  if (fieldsetControl) {
    fieldsetControl.forEach((element) => {
      const parent = element.closest('fieldset');
      element.addEventListener('click', () => {
        parent.classList.toggle('filter-form__fieldset--open');
      });
    });
  }

  if (filterCloseButton) {
    filterCloseButton.addEventListener('click', () => {
      page.classList.remove('page--filter-open');
      document.removeEventListener('keydown', onEscCloseFilter);
      filter.removeEventListener('keydown', menuFilterSwitch);
    });
  }
}

const userInfo = {
  userEmail: '',
};

const testStorage = () => {
  try {
    userInfo.userEmail = localStorage.getItem('email');
    return true;
  } catch (err) {
    return false;
  }
};

const saveData = (form) => {
  localStorage.setItem('email', form.querySelector('#email').value);
};

const loadData = (form) => {
  if (testStorage()) {
    form.querySelector('#email').value = userInfo.userEmail;
  }
};

const closePopupKey = (evt) => {
  if (isEscKey(evt)) {
    page.classList.remove('page__login-popup--open');
    removeEventListener('click', closePopup);
    removeEventListener('keydown', closePopupKey);
  }
};

const closePopup = (evt) => {
  const target = evt.target;
  const loginForm = document.querySelector('.login__content');
  const loginCloseButton = document.querySelector('.login__close-button');
  const isForm = target === loginForm || loginForm.contains(target);
  const isButton = target === loginCloseButton || loginCloseButton.contains(target);

  if (!isForm || isButton) {
    page.classList.remove('page__login-popup--open');
    removeEventListener('click', closePopup);
    removeEventListener('keydown', closePopupKey);
  }
};

const loginHeadLink = document.querySelectorAll('.menu-login');

const loginSwichField = createSwitchField(focusElementArray, loginPopup);

if (loginHeadLink) {
  loginHeadLink.forEach((element) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      page.classList.add('page__login-popup--open');

      const loginForm = loginPopup.querySelector('.login__form');
      const formEmail = loginForm.querySelector('#email');
      const loginSubmit = loginForm.querySelector('.login__submit-button');

      loadData(loginForm);
      formEmail.focus();
      const onLoginSubmit = () => saveData(loginForm);

      loginPopup.addEventListener('click', closePopup);
      document.addEventListener('keydown', closePopupKey);
      loginPopup.addEventListener('keydown', loginSwichField);
      loginSubmit.addEventListener('click', onLoginSubmit);
    });
  });
}

page.classList.remove('no-js');
