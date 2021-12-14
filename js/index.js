'use strict';
// const btns = document.querySelectorAll('.btn');
// btns.forEach(btn => {
//   btn.addEventListener('click', () => {
//     // console.log(e.target.closest('.btn'));
//     // const clicked = e.target.closest('.btn').getAttribute('aria-selected');
//     // if (clicked === 'true') {
//     //   e.target.closest('.btn').setAttribute('aria-selected', false);
//     // }
//     btn.setAttribute('aria-selected', true);
//     console.log(btn.getAttribute('aria-selected'));
//   });
// });
// var foo = 1;
// function a() {
//   var bar = 2;
// }
// a();
// console.log(foo);

// for (var i = 1; i <= 10; i++) {
//   function xer(x) {
//     setTimeout(() => {
//       console.log(x);
//     }, 0);
//   }
//   xer(i);

//   setTimeout(() => {
//     console.log(x);
//   }, 1000);
// }

// console.log([] === []);
// console.log({} == {});
// ///////
// const groceries = ['apple', null, 'milk', undefined, 'bread', ''];
// const cleanList = groceries.filter(Boolean);
// console.log(cleanList);

// const bigNumber = 1_000_000;
// console.log(bigNumber);

// const people = [
//   {
//     name: 'Lisa',
//     age: 20,
//   },
//   {
//     name: 'Pete',
//     age: 22,
//   },
//   {
//     name: 'Caroline',
//     age: 60,
//   },
// ];
// let [age] = people;
// console.log(age);
// [{ age }] = people;

// console.log(age);

// console.log('2' + false);

// let arr = [1, true, '3', false];
// let result = arr.reduce((acc, item) => {
//   console.log(acc);
//   console.log(item);
//   return acc + item;
// }, 0);
// console.log(result);

// const btnBig = document.querySelector('[aria-selected="true"]');
// const btnSmall = document.querySelector('[aria-selected="false"]');
// const btnBig = document.querySelector('.btn svg[aria-selected="true"]');
// const btnSmall = document.querySelector('.btn svg[aria-selected="false"]');

// const btnBig = document.querySelector('.btn');
// btnBig.addEventListener('click', e => {
//   console.log(e.target.parentNode.children);
//   const part1 = document.querySelector('.part1');

//   part1.setAttribute(
//     'd',
//     'M12.25,86.57l-.78,14c-.55,17.21,17.8,31.75,41,32.5s42.43-12.6,43-29.8l1.12-15.34Z'
//   );
//   console.log(part1);
//   // const pathList = e.target.parentNode.children;
//   // const pathD = [...pathList];
//   // console.log(pathD);
// });

// const btns = document.querySelectorAll('.btn');

// btns.forEach(btn => {
//   btn.addEventListener('click', e => {
//     console.log(e.target.getAttribute('class'));
//     // e.target.setAttribute(
//     //   'd',
//     //   'M96.56,89.61c-.46,14.51-19.64,25.67-42.82,24.93s-42-13.12-41.51-27.63S32.24,61.24,55.42,62,97,75.1,96.56,89.61Z'
//     // );
//   });
// });
// console.log(btnBig);

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
// const doodleGs = document.querySelectorAll('.doodle g');
// const doodlePolygons = document.querySelectorAll('.doodle polygon');

// doodleGs.forEach((doodleG, i) => {
//   let doodleBox = doodlePolygons[i].getBBox();
//   // console.log(doodleBox);
//   let center = {
//     x: doodleBox.x + doodleBox.width / 2,
//     y: doodleBox.y + doodleBox.height / 2,
//   };

//   let text = doodleG.querySelector('text');
//   console.log(text);
//   if (text == null) return;
//   text.setAttributeNS(null, 'x', center.x);
//   text.setAttributeNS(null, 'y', center.y);
//   // console.log(text);
//   let textSpan = text.querySelectorAll('tspan');
//   let textSpanLength = textSpan[0].getComputedTextLength();
//   console.log(textSpanLength);
//   textSpan[1].setAttributeNS(null, 'dx', -textSpanLength);
//   textSpan[2].setAttributeNS(null, 'dx', -textSpanLength);
//   console.log(textSpan);
// });
// const doodlePolygon = document.querySelector('.doodle-cls-2');
// addDoodleText(doodlePolygon, 'Some text hgjgjhghj');
// function addDoodleText(bgPath, doodleText) {
//   let bbox = bgPath.getBBox();
//   let center = {
//     x: bbox.x + bbox.width / 2,
//     y: bbox.y + bbox.height / 2,
//   };
//   let textElem = document.createElementNS(bgPath.namespaceURL, 'text');
//   textElem.setAttribute('x', center.x);
//   textElem.setAttribute('y', center.y);
//   textElem.setAttribute('text-anchor', 'middle');
//   textElem.classList.add('doodle__text');
//   textElem.textContent = doodleText;
//   bgPath.after(textElem);
//   console.log(center);
// }
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
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const photoWindowHeight = photo.offsetHeight - 150;
const photoWindowWidth = photo.offsetWidth;
doodle.style.transform = `translate(${
  window.innerWidth - doodle.offsetWidth - photo.offsetWidth * 0.8
}px, ${
  window.innerHeight - (photo.offsetHeight - photo.offsetHeight * 0.25 - 150)
}px)`;
// console.log(photoBox);

window.addEventListener('resize', function () {
  // const doodleBox = doodle.getBoundingClientRect();
  // console.log(doodleBox.right);
  // doodleBox.right === photoBox.left;
  // console.log(doodleBox.right);
  // console.log(photoBox.left);
  // doodle.style.transform = `translate(${
  //   photoBox.left - photoBox.width / 2
  // }px, ${photoBox.top + photoBox.height / 3}px)`;
  // console.log(doodle);
  // console.log(window.innerHeight);
  // console.log(window.innerWidth);
  // const leftTopCoord = window.innerHeight - photoBox.height;
  // console.log(leftTopCoord);

  doodle.style.transform = `translate(${
    window.innerWidth - doodle.offsetWidth - photo.offsetWidth * 0.8
  }px, ${
    window.innerHeight - (photo.offsetHeight - photo.offsetHeight * 0.25 - 150)
  }px)`;
  // console.log(window.innerHeight, window.innerWidth);
  console.log(window.innerHeight, photo.offsetHeight);
});
