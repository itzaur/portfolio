'use strict';

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
doodle.style.transform = `translate(${
  window.innerWidth -
  doodle.offsetWidth -
  photo.offsetWidth * 0.8 +
  photoTransformX
}px, ${
  window.innerHeight -
  (photo.offsetHeight - photo.offsetHeight * 0.25 - photoTransformY)
}px)`;

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
