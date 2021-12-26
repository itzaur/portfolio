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
setTimeout(animateLetters1, 4500);
setTimeout(animateLetters2, 5500);
setTimeout(animateLetters3, 6500);
setTimeout(animateLetters4, 7800);

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

const tlPage = gsap.timeline({ defaults: { duration: 1, repeat: 0 } });
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
      scale: 0,
      opacity: 0,
      ease: 'Bounce.easeOut',
      delay: 1,
    },
    '<3.8'
  )
  .from(
    '.logo',
    {
      scale: 0,
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

// pageElementsAnimation();

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
