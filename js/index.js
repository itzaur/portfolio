'use strict';
//ANCHOR Fonts
import FontFaceObserver from './../node_modules/fontfaceobserver/fontfaceobserver';
let font = new FontFaceObserver('d_CCMonologous', {
  weight: 700,
});

font
  .load()
  .then(function () {
    console.log('Font has loaded.');
  })
  .catch(function () {
    console.log('Font failed to load.');
  });

//ANCHOR Button
const btnBig = document.querySelector('.btn-big');
const btnSmall = document.querySelector('.btn-small');

btnBig.addEventListener('click', e => {
  btnBig.setAttribute('aria-selected', false);
  btnSmall.setAttribute('aria-selected', true);
});

btnSmall.addEventListener('click', e => {
  btnSmall.setAttribute('aria-selected', false);
  btnBig.setAttribute('aria-selected', true);
});

//ANCHOR Animations
//Letters animation
btnBig.addEventListener('mouseenter', animateTextHoverRun);
btnBig.addEventListener('mouseleave', animateTextHoverStop);
const timelineLetters = gsap.timeline({
  repeat: 0,
  yoyo: false,
});

function animateTextHoverRun() {
  timelineLetters.to('.text-cls-1', {
    translateX: '-1rem',
    duration: 0.2,
    ease: 'back.out(1.7)',
    stagger: 0.05,
    opacity: 1,
  });
  timelineLetters.play();
}

function animateTextHoverStop() {
  timelineLetters.reverse();
}

//Glasses animation
const timelineGlasses = gsap.timeline({
  repeat: -1,
  yoyo: false,
});

gsap.fromTo(
  '.glass',
  {
    x: -25,
    y: 8.5,
    ease: 'none',
    opacity: 0.8,
  },
  {
    x: 55,
    y: -25,
    duration: 0.5,
    ease: 'none',
    repeat: -1,
    repeatDelay: 6,
  }
);

timelineGlasses.to('.glass rect', {
  keyframes: [{ height: 80 }, { height: 22, x: -19, y: 13, opacity: 1 }],
  duration: 0.5,
  ease: 'none',
  repeat: -1,
  repeatDelay: 6,
});

//ANCHOR Doodle
const doodle = document.querySelector('.doodle');

const textSpan0 = document.querySelector('.span0');
const textSpan1 = document.querySelector('.span1');
const textSpan2 = document.querySelector('.span2');
const textSpan3 = document.querySelector('.span3');

const text = {
  string0: 'My name',
  string1: 'is Pavel!',
  string2: 'Welcome to',
  string3: 'my page!',
};
const str0 = text.string0.split('');
const str1 = text.string1.split('');
const str2 = text.string2.split('');
const str3 = text.string3.split('');

//Doodle animation
function animateLetters1() {
  if (str0.length > 0) {
    textSpan0.innerHTML += str0.shift();
  } else {
    clearTimeout(animateLetters1);
  }

  setTimeout(animateLetters1, 100);
}

function animateLetters2() {
  if (str1.length > 0) {
    textSpan1.innerHTML += str1.shift();
  } else {
    clearTimeout(animateLetters2);
  }

  setTimeout(animateLetters2, 100);
}

function animateLetters3() {
  if (str2.length > 0) {
    textSpan2.innerHTML += str2.shift();
  } else {
    clearTimeout(animateLetters3);
  }

  setTimeout(animateLetters3, 100);
}

function animateLetters4() {
  if (str3.length > 0) {
    textSpan3.innerHTML += str3.shift();
  } else {
    clearTimeout(animateLetters4);
  }

  setTimeout(animateLetters4, 100);
}
setTimeout(animateLetters1, 6000);
setTimeout(animateLetters2, 7000);
setTimeout(animateLetters3, 8000);
setTimeout(animateLetters4, 9300);

//ANCHOR Photo
const prePhoto = document.querySelector('.pre-photo');
const photo = document.querySelector('.photo');

const photoBox = photo.getBoundingClientRect();
const doodleBox = doodle.getBoundingClientRect();
// const photoTransformY = photo.computedStyleMap().get('transform')[0].y.value;
// const photoTransformX = photo.computedStyleMap().get('transform')[0].x.value;
const photoTransformY = +window
  .getComputedStyle(photo, null)
  .transform.match(/(-?[0-9\.]+)/g)[5];
const photoTransformX = +window
  .getComputedStyle(photo, null)
  .transform.match(/(-?[0-9\.]+)/g)[4];
console.log(photoTransformY);

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const photoWindowHeight = photo.offsetHeight - photoTransformY;
const photoWindowWidth = photo.offsetWidth;
const visibleContentX = window.innerWidth - photo.getBoundingClientRect().left;
const visibleContentY = window.innerHeight - photo.getBoundingClientRect().top;

document.addEventListener('DOMContentLoaded', function () {
  doodle.style.transform = `translate(${
    window.innerWidth -
    doodle.offsetWidth -
    photo.offsetWidth * 0.8 +
    photoTransformX
  }px, ${
    window.innerHeight -
    (photo.offsetHeight - photo.offsetHeight * 0.25 + -photoTransformY)
  }px)`;
});

window.addEventListener('resize', function () {
  doodle.style.transform = `translate(${
    window.innerWidth -
    doodle.offsetWidth -
    photo.offsetWidth * 0.8 +
    +window.getComputedStyle(photo, null).transform.match(/(-?[0-9\.]+)/g)[4]
  }px, ${
    window.innerHeight -
    (photo.offsetHeight -
      photo.offsetHeight * 0.25 -
      +window.getComputedStyle(photo, null).transform.match(/(-?[0-9\.]+)/g)[5])
  }px)`;
});

//ANCHOR Page animations
const helloDots = document.querySelectorAll(
  '.hello-dots path:not([data-item="hello-doodle"])'
);
const helloDoodle = document.querySelectorAll('[data-item="hello-doodle"]');
const dots = document.querySelectorAll('[data-name="pre-photo"] .cls-1');

const tlPage = gsap.timeline({
  defaults: { duration: 1, repeat: 0, rotation: 0.05 },
});

function getPageAnimation() {
  tlPage
    .fromTo(
      '.photo',
      {
        x: 2400,
        transformOrigin: 'top top',
        rotation: '50deg',
        ease: 'back.out(1.7)',
        clearProps: 'transform',
      },
      {
        x: photoTransformX,
        rotation: '0deg',
        clearProps: 'transform',
        duration: 1.5,
      }
    )
    .from(dots, {
      opacity: 0,
      scale: 0,
      stagger: {
        each: 0.002,
        from: 15,
      },

      ease: 'back.out(1.7)',
    })
    .from(
      helloDots,
      0.5,
      {
        y: -100,
        ease: 'bounce.out',
        opacity: 0,
        stagger: { each: 0.003, from: 'random' },
      },
      '<0.6'
    )
    .from(
      helloDoodle,
      0.6,
      { y: -100, ease: 'bounce.out', opacity: 0, stagger: 0.03 },
      '<1.3'
    )
    .to(
      '.doodle',
      {
        opacity: 1,
        ease: 'back.out(1.7)',
      },
      '<0.5'
    )
    .from(
      btnBig,
      {
        transform: 'translate3d(0, 0, 1px) scale(0)',
        opacity: 0,
        ease: 'Bounce.easeOut',
        delay: 1,
      },
      '<4.8'
    )
    .from(
      '.logo',
      {
        transform: 'translate3d(0, 0, 1px) scale(0)',
        opacity: 0,
        ease: 'Bounce.easeOut',
      },
      '<0'
    )
    .from('.color-game__item', {
      x: '-100%',
      opacity: 0,
      stagger: {
        each: 0.2,
      },
      ease: 'back.out(1.7)',
    });
}

getPageAnimation();

//Menu animation
//Menu transition
const menuPage = document.querySelector('.menu');
const menuDoodle = document.querySelectorAll(
  '.menu__box path, .menu__box polygon'
);
const menuNavDoodle = document.querySelector('.menu__img svg');
const menuBtnClose = document.querySelector('.menu-btn-close');
const menuLinks = document.querySelectorAll('.nav__item');
let isOpen = false;
let mediaQueryTransformX = -16;
let mediaQueryTransformY = 5;
let deltaX = window.innerWidth > 568 ? mediaQueryTransformX : 0;
let deltaY = window.innerWidth > 568 ? mediaQueryTransformY : 0;
function checkMediaQuery() {
  if (window.matchMedia('(max-width: 568px)').matches) {
    menuNavDoodle.style.transform = `translate3d(0, 0, 1px) scale(1)`;
  } else {
    menuNavDoodle.style.transform = `translate3d(-16vw, 5vw, 1px) scale(1)`;
  }
}
checkMediaQuery();
window.addEventListener('resize', checkMediaQuery);

const tlMenuTransition = gsap.timeline({
  paused: true,
});

tlMenuTransition
  .to(menuPage, {
    height: 'calc(100vh - var(--padding-container) * 2)',
    ease: 'bounce.out',
  })
  .from(
    menuDoodle,
    {
      y: -100,
      ease: 'bounce.out',
      opacity: 0,
      duration: 0.3,
      stagger: { each: 0.001, from: 'random' },
    },
    '<0.1'
  )
  .from(
    menuNavDoodle,
    {
      opacity: 0,
      ease: 'elastic.out(1, 0.3)',
      duration: 1.2,
      transform: `translate3d(${deltaX}vw, ${deltaY}vw, 1px) scale(0)`, //fix firefox bug
    },
    '<0.3'
  )
  .from(
    menuLinks,
    {
      y: -60,
      opacity: 0,
      stagger: 0.2,
      ease: 'back.out(1.7)',
    },
    '<0.6'
  )
  .from(
    '.star',
    {
      opacity: 0,
      scale: 0,
      stagger: 0.1,
      ease: 'elastic.out(1, 0.3)',
    },
    '-=1'
  );

function menuTransition() {
  if (window.matchMedia('(max-width: 568px)').matches) {
    gsap.to(menuNavDoodle, {
      transform: `translate3d(0, 0, 2px) scale(1)`,
    });
    gsap.from(
      '.menu-btn-close',
      {
        y: -100,
        opacity: 0,
        ease: 'back.out(1.7)',
        duration: 0.6,
      },
      '+=1'
    );
  } else {
    gsap.to(menuNavDoodle, {
      transform: `translate3d(-16vw, 5vw, 10px) scale(1)`,
    });
    gsap.from(
      '.menu-btn-close',
      {
        x: -100,
        opacity: 0,
        ease: 'back.out(1.7)',
        duration: 0.6,
      },
      '+=1.5'
    );
  }

  setTimeout(() => {
    tlMenuTransition.timeScale(0.8).play();
    isOpen = true;
  }, 100);
}

btnBig.addEventListener('click', menuTransition);

menuBtnClose.addEventListener('click', function (e) {
  const closeMenu = gsap.to(menuPage, {
    height: 0,
    ease: 'power4.out',
    duration: 0.8,
    paused: true,
  });

  isOpen = false;

  if (!isOpen) {
    //isOpen == false
    closeMenu.play();
  }

  tlMenuTransition.pause(0).reversed(true);

  gsap.to('.menu-btn-close', {
    x: -100,
    y: -100,
    clearProps: 'x, y',
  });

  btnBig.setAttribute('aria-selected', true);
  btnSmall.setAttribute('aria-selected', false);
});

gsap.to('.st19', {
  repeat: -1,
  duration: 2,
  yoyo: true,
  x: 5,
  ease: 'none',
});

//ANCHOR Next page animation
const cornerBtn = document.getElementById('corner-link');
cornerBtn.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('wrapper').classList.add('flip');

  window.setTimeout(() => {
    window.location.href = 'test.html';
  }, 250);
});

//ANCHOR Color game
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
const colorBtns = document.querySelectorAll('.color-game__item');
const glassesElements = photo.querySelectorAll('[class*="glasses-el"]');
const pullover = photo.querySelectorAll('.pullover');
const beard = photo.querySelectorAll('.beard');

colorBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    let hexColor = '#';
    const HEX_COLOR_LENGTH = 6;
    for (let i = 0; i < HEX_COLOR_LENGTH; i++) {
      hexColor += hex[getRandomNumber()];
    }

    const attr = e.target.getAttribute('data-name');
    if (attr === 'glasses') {
      glassesElements.forEach(glassesEl => (glassesEl.style.fill = hexColor));
    } else if (attr === 'pullover') {
      pullover.forEach(el => (el.style.fill = hexColor));
    } else if (attr === 'beard') {
      beard.forEach(el => (el.style.fill = hexColor));
    } else if (attr === 'grayscale') {
      document.querySelector('.page').classList.toggle('grayscale');
    }
  });
});

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}

// const timelineColorGame = gsap.timeline().to('.color-game__item', {
//   x: Math.floor(Math.random() * 6),
//   y: Math.floor(Math.random() * 6),
//   repeat: -1,
//   ease: 'power1.out',
//   yoyo: true,
// });

//Logo
// const logo = document.querySelector('.logo');
// const logoElements = document.querySelectorAll('.logo path, .logo rect');
// const x = Math.floor(Math.random() * 15);

// const tlLogo = gsap.timeline();
// tlLogo.to(logoElements, {
//   x: 4,
//   duration: 0.5,
//   ease: 'bounce.out',

//   stagger: { each: 0.03, from: 'random' },
//   // paused: true,
// });

// function getLogoAnim() {
//   tlLogo.play();
// }

// function stopLogoAnim() {
//   tlLogo.reverse();
// }

// logo.addEventListener('mouseenter', getLogoAnim);
// logo.addEventListener('mouseleave', stopLogoAnim);

//ANCHOR Cursor
let mouse = {
  x: 0,
  y: 0,
};

const lerp = function (start, end, n) {
  return (1 - n) * start + n * end;
};

const distance = function (x1, y1, x2, y2) {
  let a = x1 - x2;
  let b = y1 - y2;
  return Math.hypot(a, b);
};

const calcWindowSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const getRandomFloat = function (min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
};

const getMousePosition = e => {
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

window.addEventListener('mousemove', function (ev) {
  mouse = getMousePosition(ev);
});

class Cursor {
  constructor(item) {
    this.DOM = { item: item };
    this.DOM.item.style.opacity = 0;
    this.bounds = this.DOM.item.getBoundingClientRect();
    this.renderStyles = {
      tx: { previous: 0, current: 0, amount: 0.2 },
      ty: { previous: 0, current: 0, amount: 0.2 },
      scale: { previous: 1, current: 1, amount: 0.15 },
      opacity: { previous: 1, current: 1, amount: 0.1 },
    };
    this.onMouseMove = () => {
      this.renderStyles.tx.previous = this.renderStyles.tx.current =
        mouse.x - this.bounds.width / 2;
      this.renderStyles.ty.previous = this.renderStyles.ty.current =
        mouse.y - this.bounds.height / 2;
      gsap.to(this.DOM.item, {
        duration: 0.85,
        opacity: 1,
        ease: 'power3.easeOut',
      });
      requestAnimationFrame(() => this.render());
      window.removeEventListener('mousemove', this.onMouseMove);
    };
    window.addEventListener('mousemove', this.onMouseMove);
  }

  render() {
    this.renderStyles['tx'].current = mouse.x - this.bounds.width / 2;
    this.renderStyles['ty'].current = mouse.y - this.bounds.height / 2;

    for (const key in this.renderStyles) {
      this.renderStyles[key].previous = lerp(
        this.renderStyles[key].previous,
        this.renderStyles[key].current,
        this.renderStyles[key].amount
      );
      // console.log(this.renderStyles[key].previous);
    }

    this.DOM.item.style.transform = `translate(${this.renderStyles['tx'].previous}px, ${this.renderStyles['ty'].previous}px) scale(${this.renderStyles['scale'].previous})`;
    this.DOM.item.style.opacity = this.renderStyles['opacity'].previous;

    requestAnimationFrame(() => this.render());
  }

  enter() {
    this.renderStyles['scale'].current = 2.5;
    this.renderStyles['opacity'].current = 0.5;
  }

  leave() {
    this.renderStyles['scale'].current = 1;
    this.renderStyles['opacity'].current = 1;
  }
}

class MagnetLogo {
  constructor(item) {
    this.DOM = { item: item };
    this.renderStyles = {
      tx: { previous: 0, current: 0, amount: 0.1 },
      ty: { previous: 0, current: 0, amount: 0.1 },
      scale: { previous: 1, current: 1, amount: 0.2 },
    };

    this.state = {
      hover: false,
    };

    this.initEvent();
    this.calculateSizePosition();
    requestAnimationFrame(() => this.render());
  }

  calculateSizePosition() {
    this.rect = this.DOM.item.getBoundingClientRect();
    this.distanceToTrigger = this.rect.width * 1.9;
  }

  initEvent() {
    this.onResize = () => this.calculateSizePosition();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('load', this.onResize);
  }

  render() {
    const distanceMouseElement = distance(
      mouse.x + window.scrollX,
      mouse.y + window.scrollY,
      this.rect.left + this.rect.width / 2,
      this.rect.top + this.rect.height / 2
    );

    let x = 0;
    let y = 0;

    if (distanceMouseElement < this.distanceToTrigger) {
      x =
        (mouse.x + window.scrollX - (this.rect.left + this.rect.width / 2)) *
        0.3;
      y =
        (mouse.y + window.scrollY - (this.rect.top + this.rect.height / 2)) *
        0.3;

      if (!this.state.hover) {
        this.enter();
      }
    } else if (this.state.hover) {
      this.leave();
    }

    this.renderStyles['tx'].current = x;
    this.renderStyles['ty'].current = y;

    for (const key in this.renderStyles) {
      this.renderStyles[key].previous = lerp(
        this.renderStyles[key].previous,
        this.renderStyles[key].current,
        this.renderStyles[key].amount
      );
    }

    this.DOM.item.style.transform = `translate(${this.renderStyles['tx'].previous}px, ${this.renderStyles['ty'].previous}px) scale(${this.renderStyles['scale'].previous})`;

    requestAnimationFrame(() => this.render());
  }

  enter() {
    this.state.hover = true;
    this.renderStyles['scale'].current = 1.3;
    gsap.killTweensOf(this.DOM.item);

    gsap.to(this.DOM.item, {
      duration: 4,
      startAt: { yPercent: 75 },
      yPercent: 0,
      ease: 'power3.easeOut',
    });
  }

  leave() {
    this.state.hover = false;
    this.renderStyles['scale'].current = 1;
    // gsap.killTweensOf(this.DOM.item);
    gsap.to(this.DOM.item, {
      ease: 'power3.easeOut',
      yPercent: -75,
    });
  }
}

const cursor = new Cursor(document.querySelector('.cursor'));
document
  .querySelectorAll('a, .btn, .menu-btn-close, .logo, .color-game__item')
  .forEach(el => {
    el.addEventListener('mouseenter', () => cursor.enter());
    el.addEventListener('mouseleave', () => cursor.leave());
  });

const magnetLogo = new MagnetLogo(document.querySelector('.logo'));
// document.querySelectorAll('.logo').forEach(el => {
//   el.addEventListener('mouseenter', () => magnetLogo.enter());
//   el.addEventListener('mouseleave', () => magnetLogo.leave());
// });
