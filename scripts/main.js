document.addEventListener('DOMContentLoaded', () => {
  // Custom select
  new Choices('.js-select', {
    searchEnabled: false,
    shouldSort: false,
    position: 'bottom',
    classNames: {
      containerOuter: 'select',
      containerInner: 'select__inner',
      list: 'select__list',
      listSingle: 'select__list--single',
      listDropdown: 'select__list--dropdown',
      item: 'select__item',
      itemSelectable: 'select__item--selectable',
      itemChoice: 'select__item--option'
    },
  });

  // Accordion
  new Accordion('.accordion-wrapper', {
    elementClass: 'accordion',
    triggerClass: 'accordion__trigger',
    panelClass: 'accordion__panel',
  });

  // Carousel
  new Swiper('.carousel', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    wrapperClass: 'carousel__list',
    slideClass: 'carousel__item',

    navigation: {
      nextEl: '.carousel__btn--right',
      prevEl: '.carousel__btn--left',
    },

    breakpoints: {
      1025: {
        slidesPerView: 4,
      },

      321: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  });
})
