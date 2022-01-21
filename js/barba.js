import barba from '@barba/core';
import { aboutPageSkillsInit } from './export';

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
  transitions: [
    {
      name: 'default-transition',
      once(data) {
        animationEnter(data.next.container);
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
});

// barba.hooks.beforeEnter(() => {

// });

barba.hooks.afterEnter(() => {
  aboutPageSkillsInit();
});
