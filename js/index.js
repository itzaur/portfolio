'use strict';

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
  console.log(e.target.closest('.btn-big'));
  // e.target.closest('.btn-big').classList.add('clicked');
  btnBig.setAttribute('aria-selected', false);
  btnSmall.setAttribute('aria-selected', true);
});

btnSmall.addEventListener('click', e => {
  console.log(e.target.closest('.btn-small'));
  btnSmall.setAttribute('aria-selected', false);
  btnBig.setAttribute('aria-selected', true);
});

btnBig.addEventListener('mouseenter', animateTextHoverRun);
btnBig.addEventListener('mouseleave', animateTextHoverStop);
const timelineLetters = gsap.timeline({
  repeat: 0,
  yoyo: false,
});

//Animations
//Letters animation
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

console.log(str0);

function animateLetters1() {
  if (str0.length > 0) {
    textSpan0.innerHTML += str0.shift();
  } else {
    clearTimeout(animateLetters1);
  }

  setTimeout(animateLetters1, 100);
}
animateLetters1();

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

setTimeout(animateLetters2, 1500);
setTimeout(animateLetters3, 2500);
setTimeout(animateLetters4, 3800);

const photo = document.querySelector('.photo');
const doodle = document.querySelector('.doodle');
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
  doodle.style.opacity = 1;
  doodle.style.transform = `translate(${
    window.innerWidth -
    doodle.offsetWidth -
    photo.offsetWidth * 0.8 +
    photoTransformX
  }px, ${
    window.innerHeight -
    (photo.offsetHeight - photo.offsetHeight * 0.25 - photoTransformY)
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
