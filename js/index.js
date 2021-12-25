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

// setInterval(() => {
//   timelineGlasses.play();
// }, 6000);
// timelineGlasses
//   .to('.glass rect', 1, {
//     height: 60,
//     ease: 'none',
//   })
//   .to('.glass rect', 2, {
//     height: 40,
//     ease: 'none',
//   })
//   .to('.glass rect', 5, {
//     height: 20,
//     ease: 'none',
//   });
// keyframes: {
//   '0%': { height: 60, ease: 'none' },
//   '20%': { height: 50, ease: 'none' },
//   '40%': { height: 40, ease: 'none' },
//   '60%': { height: 30, ease: 'none' },
//   '80%': { height: 20, ease: 'none' },
//   '100%': { height: 10, ease: 'none' },
// },
// height: '10',

// const tl = gsap.timeline({
//   repeat: -1, // Makes animation repeat infinitely
//   yoyo: true, // Animation will go back-and-forth like a yoyo
// });

// tl.to('.st36', {
//   fill: '#fff',
//   duration: 3,
// });

// gsap.from('.photo', { duration: 2.5, ease: 'bounce.out', y: '100%' });
// const tl = gsap.timeline({
//   repeat: -1, // Makes animation repeat infinitely
//   yoyo: true, // Animation will go back-and-forth like a yoyo
// });

// tl.to('.glass', {
//   translateY: '100%', // Move .mask elements down by 100%
//   duration: 3,
// }).to(
//   '.st0',
//   {
//     attr: {
//       fill: '#ffd11b', // Change the "fill" attribute of #bg-color
//     },
//     duration: 2,
//   },
//   '<+=1'
// ); // Start 1s after the previous animation

//ANCHOR Button
const btnBig = document.querySelector('.btn-big');
const btnSmall = document.querySelector('.btn-small');
console.log(btnBig);
btnBig.addEventListener('click', e => {
  btnBig.setAttribute('aria-selected', false);
  btnSmall.setAttribute('aria-selected', true);
});

btnSmall.addEventListener('click', e => {
  btnSmall.setAttribute('aria-selected', false);
  btnBig.setAttribute('aria-selected', true);
});

//Animations
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
setTimeout(animateLetters1, 3500);
setTimeout(animateLetters2, 4500);
setTimeout(animateLetters3, 5500);
setTimeout(animateLetters4, 6800);

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

const dots = document.querySelectorAll('[data-name="pre-photo"] .cls-1');
const tlPage = gsap.timeline({ defaults: { duration: 1, repeat: 0 } });
tlPage
  .from('.photo', {
    x: '200%',
    ease: 'back.out(1.7)',
    clearProps: 'transform',
  })
  .from(dots, {
    opacity: 0,
    scale: 0,
    stagger: {
      each: 0.002,
      from: 15,
    },

    ease: 'back.out(1.7)',
  })
  .to(
    '.doodle',
    {
      opacity: 1,
      ease: 'back.out(1.7)',
    },
    '<0.2'
  )
  .from(btnBig, {
    y: -500,
    opacity: 0,
    ease: 'elastic.out(1, 0.3)',
  })
  .from(
    '.logo',
    {
      y: -500,
      opacity: 0,
      ease: 'elastic.out(1, 0.3)',
    },
    '<0'
  );

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
