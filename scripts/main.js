document.addEventListener('DOMContentLoaded', () => {
  class Burger {
    constructor(selector, params) {
      this.btn = document.querySelector(selector);
      [this.parrent] = document.getElementsByClassName(params.parrentClass || 'js-burger-parrent');
      this.elements = params.elementsClass || 'js-menu';

      if (!this.parrent) throw new Error('Родительский элемент бургера не найден');
      if (!this.btn) throw new Error('Кнопка бургера не найдена');

      this.parrent.style.position = 'relative';

      if (params.breakpoints && Object.keys(params.breakpoints).length) {
        this.breakpoint = params.breakpoints;
        this.elements = this.breakpoint === Infinity ?
          params.elementsClass : params.breakpoints[this.breakpoint].elementsClass;

        let currentBreakpoint = this.breakpoint;

        window.addEventListener('resize', () => {
          this.breakpoint = params.breakpoints;

          if (this.breakpoint !== currentBreakpoint) {
            const classPath = this.breakpoint !== Infinity ?
              params.breakpoints[this.breakpoint].elementsClass :
              params.elementsClass;

            this.elements.forEach(element => element.style.display = null);
            this.elements = classPath;

            currentBreakpoint = this.breakpoint;
          }
        });
      }

      this.btn.addEventListener('click', () => {
        this.toggleMenu();
      })
    }

    get windowWith() {
      return window.innerWidth;
    }

    get elements() {
      return this._elements;
    }

    set elements(value) {
      this._elements = Array.from(document.getElementsByClassName(value));
      this._elements.forEach(element => element.style.display = 'none');
    }

    get breakpoint() {
      return this._breakpoint;
    }

    set breakpoint(breakpoints) {
      let currentBreakpoint = Infinity;

      Object.keys(breakpoints).forEach(key => {
        const breakpoint = Number(key);
        if (
          currentBreakpoint > breakpoint &&
          breakpoint >= this.windowWith
        ) {
          currentBreakpoint = breakpoint;
        }
      });

      this._breakpoint = currentBreakpoint;
    }

    toggleMenu() {
      this.elements.forEach(element => {
        if (element.style.display === 'none')
          element.style.display = null;
        else element.style.display = 'none';
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

  new Burger('.js-burger', {
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
