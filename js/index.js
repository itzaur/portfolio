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
