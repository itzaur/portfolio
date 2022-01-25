import barba from '@barba/core';
import { aboutPageSkillsInit } from './export';
import { Cursor } from './export';
import {
  MagnetLogo,
  addCustomCursor,
  homeInit,
  // doodlePositionStart,
} from './export';
// import { doodleInit } from './export';
// import MagnetLogo from './export';
function init() {
  function animationEnter(container) {
    const cornerBox = container.querySelector('#wrapper__corner-box');
    // container.querySelector('#corner-content').style.background = 'red';

    const tl = gsap.timeline();

    tl.from(cornerBox, {
      width: 2000,
      height: 2000,
      duration: 1,
      clearProps: 'all',
    }).from(
      container,
      {
        opacity: 0,
        clearProps: 'all',
      },
      '<0.2'
    );

    return tl;
  }

  function animationLeave(container, done) {
    const cornerBox = container.querySelector('#wrapper__corner-box');

    const tl = gsap.timeline();

    tl.to(cornerBox, {
      width: 2000,
      height: 2000,
      duration: 1,
      clearProps: 'all',
      onComplete: () => done(),
    }).to(
      container,
      {
        opacity: 0,
      },
      '<0.4'
    );

    return tl;
  }

  // barba.hooks.before(data => {
  //   const cornerBox = container.querySelector('#wrapper__corner-box');
  //   gsap.set(cornerBox, { width: 1600, height: 1600, autoAlpha: 1 });
  // });

  barba.init({
    debug: true,
    transitions: [
      {
        name: 'default-transition',
        once(data) {
          animationEnter(data.next.container);
          // addCustomCursor();

          console.log('once');
        },
        leave(data) {
          const done = this.async();
          animationLeave(data.current.container, done);

          console.log('leaving');
        },
        enter(data) {
          console.log('entering');
          animationEnter(data.next.container);
        },
      },
    ],
    views: [
      {
        namespace: 'home-page',
        afterEnter: data => {
          console.log('afterEnter home-page', data.next.container);
          homeInit();
          // doodlePositionStart();
          addCustomCursor();
          // doodlePositionResize(data.next.container);
          window.addEventListener('resize', () => {
            console.log('home-page resize');
          });
        },
      },
      {
        namespace: 'about-page',
        afterEnter: data => {
          console.log('afterEnter about-page', data.next.container);
          aboutPageSkillsInit();
          addCustomCursor();
          // doodlePositionResize(data.next.container);
          window.addEventListener('resize', () => {
            console.log('about-page resize');
          });
        },
      },
    ],
  });

  // function doodlePositionResize(container) {
  //   container.querySelector('.doodle').style.transform = `translate(${
  //     window.innerWidth -
  //     container.querySelector('.doodle').offsetWidth -
  //     container.querySelector('.photo').offsetWidth * 0.8 +
  //     +window
  //       .getComputedStyle(container.querySelector('.photo'), null)
  //       .transform.match(/(-?[0-9\.]+)/g)[4]
  //   }px, ${
  //     window.innerHeight -
  //     (container.querySelector('.photo').offsetHeight -
  //       container.querySelector('.photo').offsetHeight * 0.25 -
  //       +window
  //         .getComputedStyle(container.querySelector('.photo'), null)
  //         .transform.match(/(-?[0-9\.]+)/g)[5])
  //   }px)`;
  // }
}

// barba.hooks.beforeEnter(() => {
//   // // const magnet = new MagnetLogo(document.querySelector('.logo'));
//   // cursor.enter();
//   // window.addEventListener('DOMContentLoaded', addCustomCursor);
//   // window.removeEventListener('DOMContentLoaded', addCustomCursor);
//   console.log('barba.hooks.beforeEnter');
// });

// barba.hooks.afterEnter(() => {
//   aboutPageSkillsInit();

//   console.log('barba.hooks.afterEnter');
//   addCustomCursor();
//   // doodleInit();
//   // colorGame();
//   // homeInit();
//   // const magnetLogo = new MagnetLogo(document.querySelector('.logo'));
// });
window.addEventListener('load', function () {
  init();
});
