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
var foo = 1;
function a() {
  var bar = 2;
}
a();
console.log(foo);

for (var i = 1; i <= 10; i++) {
  function xer(x) {
    setTimeout(() => {
      console.log(x);
    }, 0);
  }
  xer(i);

  setTimeout(() => {
    console.log(x);
  }, 1000);
}

console.log([] === []);
console.log({} == {});
const btnBig = document.querySelector('[aria-selected="true"]');
const btnSmall = document.querySelector('[aria-selected="false"]');

btnBig.addEventListener('click', () => {
  btnBig.setAttribute('aria-selected', false);
  btnSmall.setAttribute('aria-selected', true);
});

btnSmall.addEventListener('click', () => {
  btnSmall.setAttribute('aria-selected', false);
  btnBig.setAttribute('aria-selected', true);
});
