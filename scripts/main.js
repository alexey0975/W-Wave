document.addEventListener('DOMContentLoaded', () => {

  class Burger {
    #breakpoints
    #_elements
    #_breakpoint

    constructor(selector, params) {
      this.#breakpoints = params.breakpoints || null;
      this.btn = document.querySelector(selector);
      this.parrentClass = params.parrentClass || 'js-burger-parrent';
      this.elements = params.elementsClass || 'js-menu';

      this.btn.style.position = 'relative';
      this.btn.style.zIndex = '199';

      if (!this.parrent) throw new Error('Родительский элемент бургера не найден');
      if (!this.btn) throw new Error('Кнопка бургера не найдена');

      this.parrent.style.position = 'relative';

      if (params.breakpoints && Object.keys(params.breakpoints).length) {
        this.breakpoint = params.breakpoints;
        this.elements = this.elementClassPath;

        let currentBreakpoint = this.breakpoint;

        window.addEventListener('resize', () => {
          this.breakpoint = params.breakpoints;

          if (this.breakpoint !== currentBreakpoint) {
            this.elements.forEach(element => {
              element.classList.remove('menu--closed');
              element.style.position = null;
              element.style.transition = null;
              element.style.transform = null;
            });
            this.elements = this.elementClassPath;

            currentBreakpoint = this.breakpoint;
          }
        });
      }

      this.btn.addEventListener('click', () => {
        this.toggleMenu();
      })
    }

    get parrent() {
      const [parrent] = document.getElementsByClassName(this.parrentClass);
      return parrent;
    }

    get elementClassPath () {
      return this.breakpoint ?
        this.#breakpoints[this.breakpoint].elementsClass :
        this.elementsClass || 'js-menu';
    }

    get windowWith() {
      return window.innerWidth;
    }

    get elements() {
      return this.#_elements;
    }

    set elements(value) {
      this.#_elements = Array.from(document.getElementsByClassName(value));
      this.#_elements.forEach(element => {
        element.style.position = 'absolute';
        element.style.transform = 'translateX(-110vw)';
        element.classList.add('menu--closed');
      });
    }

    get breakpoint() {
      return this.#_breakpoint;
    }

    set breakpoint(breakpoints) {
      this.#_breakpoint = 0;

      Object.keys(breakpoints).forEach(key => {
        const breakpoint = Number(key);
        if (
          this.#_breakpoint <= breakpoint &&
          breakpoint > this.windowWith
        ) {
          this.#_breakpoint = breakpoint;
        }
      });
    }

    toggleMenu() {
      this.elements.forEach(element => {
        if (element.classList.contains('menu--closed')) {
          element.style.transition = 'transform 600ms ease';
          element.style.transform = null;
          element.classList.remove('menu--closed');
          this.btn.classList.add('burger--close');
          document.body.style.overflow = 'hidden';
        }
        else {
          element.style.transform = 'translateX(-110vw)';
          element.style.transition = 'transform 600ms ease';
          element.classList.add('menu--closed');
          this.btn.classList.remove('burger--close');
          document.body.style.overflow = null;
        };
      });
    }
  }

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

  const burger = new Burger('.js-burger', {
    breakpoints: {
      768: {
        elementsClass: 'js-menu-768',
      },

      320: {
        elementsClass: 'js-menu-320',
      },
    },
  });
})
