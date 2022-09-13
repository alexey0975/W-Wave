document.addEventListener('DOMContentLoaded', () => {

  class Burger {
    #breakpoints
    #_elements
    #_breakpoint
    #_items

    constructor(selector, params = {}) {
      this.#breakpoints = params.breakpoints || null;
      this.btn = document.querySelector(selector);
      this.parrentClass = params.parrentClass || 'js-burger-parrent';
      this.itemsClass = params.itemsClass || 'js-burger__item'
      this.elements = params.elementsClass || 'js-menu';
      this.items = params.itemsClass || 'js-burger__item';

      this.menu = document.createElement('div');
      this.menu.classList.add(...['burger__menu', 'burger__menu--closed']);
      this.menu.style.position = 'absolute';
      this.menu.style.left = 0;
      this.menu.style.width = '100vw';
      this.menu.style.height = '100vh';
      this.menu.style.zIndex = '99';
      this.menu.style.transform = 'translateX(-110vw)';
      this.menu.style.overflow = 'hidden';

      this.btn.style.position = 'relative';
      this.btn.style.zIndex = '199';

      if (!this.parrent) throw new Error('Родительский элемент бургера не найден');
      if (!this.btn) throw new Error('Кнопка бургера не найдена');

      this.parrent.style.position = 'relative';
      this.parrent.prepend(this.menu);

      if (params.breakpoints && Object.keys(params.breakpoints).length) {
        this.breakpoint = params.breakpoints;
        this.elements = this.elementClassPath;
        this.items = this.itemsClassPath;
        let currentBreakpoint = this.breakpoint;

        window.addEventListener('resize', () => {
          this.breakpoint = params.breakpoints;

          if (this.breakpoint !== currentBreakpoint) {
            this.closeMenu();
            this.elements.forEach(element => {
              element.style.display = null;
            });

            this.menu.textContent = '';
            this.elements = this.elementClassPath;
            this.items = this.itemsClassPath;  
            currentBreakpoint = this.breakpoint;
          }
        });
      }

      this.btn.addEventListener('click', () => {
        this.toggleMenu();
      })
    }

    get items() {
      return this.#_items;
    }

    set items(itemClass) {
      this.#_items = document.getElementsByClassName(itemClass);
      Array.from(this.#_items).forEach(item => {
        item.addEventListener('click', () => {
          this.closeMenu();
        });
      });
    }

    get parrent() {
      const [parrent] = document.getElementsByClassName(this.parrentClass);
      return parrent;
    }

    get elementClassPath () {
      return this.breakpoint !== Infinity ?
        this.#breakpoints[this.breakpoint].elementsClass :
        this.elementsClass || 'js-menu';
    }

    get itemsClassPath () {
      return this.breakpoint !== Infinity ?
        this.#breakpoints[this.breakpoint].itemsClass :
        this.itemsClass || 'js-burger__item';
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
        const cloneEl = element.cloneNode(true);
        element.style.display = 'none';
        this.menu.append(cloneEl);
      });
    }

    get breakpoint() {
      return this.#_breakpoint;
    }

    set breakpoint(breakpoints) {
      this.#_breakpoint = Infinity;
      Object.keys(breakpoints).forEach(key => {
        const breakpoint = Number(key);
        if (
          breakpoint >= this.windowWith &&
          breakpoint <= this.#_breakpoint
        ) {
          this.#_breakpoint = breakpoint;
        }
      });
    }

    openMenu() {
      this.menu.style.transition = 'transform 600ms ease';
      this.menu.style.transform = null;
      this.menu.classList.remove('burger__menu--closed');
      this.btn.classList.add('burger--close');
      document.body.style.overflow = 'hidden';
    }

    closeMenu() {
      this.menu.style.transform = 'translateX(-110vw)';
      this.menu.style.transition = 'transform 600ms ease';
      this.menu.classList.add('burger__menu--closed');
      this.btn.classList.remove('burger--close');
      document.body.style.overflow = null;
    }

    toggleMenu() {
      if (this.menu.classList.contains('burger__menu--closed')) this.openMenu();
      else this.closeMenu();
    }
  }

  class Modal {

    constructor(selector, params = {}) {
      this.modal = document.querySelector(selector || '.js-modal');
      this.openBtnClass = params.openBtnClass || 'js-modal__open';
      this.doneBtnClass = params.doneBtnClass ||'js-modal__done';
      this.wrapperClass = params.wrapperClass || 'js-modal-wrapper';
      this.closeBtnClass = params.closeBtnClass || 'js-modal__close';

      [this.modalCloseBtn] = document.getElementsByClassName(this.closeBtnClass);
      [this.modalOpenBtn] = document.getElementsByClassName(this.openBtnClass);
      [this.modalDoneBtn] = document.getElementsByClassName(this.doneBtnClass);

      this.modalWrapper = document.createElement('div');
      this.modalWrapper.classList.add(this.wrapperClass);
      this.modalWrapper.style.position = 'absolute';
      this.modalWrapper.style.width = '100vw';
      this.modalWrapper.style.height = '100vh';
      this.modalWrapper.style.left = 0;
      this.modalWrapper.style.top = 0;
      this.modalWrapper.style.backgroundColor = 'rgba(0, 0, 0, .7)';
      this.modalWrapper.style.zIndex = '299';
      this.modalWrapper.classList.add('js-modal--close');
      this.modalWrapper.style.display = 'none';
      document.body.append(this.modalWrapper);
      this.modalWrapper._isWrapper = true;

      if (this.modal) {
        this.modalWrapper.append(this.modal);
        this.modal.classList.add('js-modal--capture');
      }

      this.modalWrapper.addEventListener('click', (event) => {
        if(!event.target._isWrapper) return;
        this.closeModal();
      });

      this.modalOpenBtn.addEventListener('click', (event) => {
        event.preventDefault();
        this.openModal();
      });

      this.modalCloseBtn.addEventListener('click', (event) => {
        event.preventDefault();
        this.closeModal();
      });

      this.modalDoneBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (params.doneAction) {
          doneAction();
        } else {
          this.closeModal();
        }
      })
    }

    openModal() {
      this.modalWrapper.style.display = 'block';
      document.body.style.overflow = 'hidden';
      this.modalWrapper.classList.remove('js-modal--close');
    }

    closeModal() {
      this.modalWrapper.style.display = 'none';
      document.body.style.overflow = null;
      this.modalWrapper.classList.add('js-modal--close');
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
        itemsClass: 'js-burger__link-768',
      },

      320: {
        elementsClass: 'js-menu-320',
        itemsClass: 'js-burger__link-320',
      },
    },
  });

  new Modal('.js-modal');
})
