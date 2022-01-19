import barba from '@barba/core';
import { aboutPageSkillsInit } from './export';

function animationEnter(container) {
  const cornerBox = container.querySelector('#wrapper__corner-box');

  const tl = gsap.timeline();

  tl.to(
    cornerBox,
    {
      duration: 0.5,
      width: 2000,
      height: 2000,
      ease: 'Expo.easeInOut',
    },
    '<-0.2'
  )
    .from(container, {
      opacity: 0,
      duration: 0.0001,
    })
    .fromTo(
      cornerBox,
      {
        width: 2000,
        height: 2000,
      },
      {
        width: 20,
        height: 20,
        clearProps: 'all',
        duration: 0.5,
        ease: 'Expo.easeInOut',
        delay: 0,
      },
      '<-0.0001'
    );
  return tl;
}

function animationLeave(container, done) {
  const cornerBox = container.querySelector('#wrapper__corner-box');

  const tl = gsap.timeline();

  tl.set(cornerBox, { width: 160, height: 160, autoAlpha: 1 }).fromTo(
    cornerBox,
    {
      width: 160,
      height: 160,
    },
    {
      width: 2000,
      height: 2000,
      ease: 'Expo.easeInOut',
      duration: 1,
      clearProps: 'all',
      onComplete: () => done(),
    }
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
        // console.log('once');
      },
      leave(data) {
        const done = this.async();
        animationLeave(data.current.container, done);

        // console.log('leaving');
      },
      enter(data) {
        // console.log('entering');
        animationEnter(data.next.container);
        // aboutPageSkillsInit();
      },
    },
  ],
});

// barba.hooks.beforeEnter(() => {

// });

barba.hooks.afterEnter(() => {
  aboutPageSkillsInit();
});
