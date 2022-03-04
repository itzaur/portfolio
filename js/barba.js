import barba from "@barba/core";
import {
  MagnetLogo,
  pageSkillsInit,
  aboutAnimationInit,
  addCustomCursor,
  homeInit,
} from "./export";
import { doodlePositionResize } from "./index";
// import { pageSkillsInit } from './export';
// import { Cursor } from './export';
// import {
//   // MagnetLogo,
//   addCustomCursor,
//   homeInit,
//   // doodlePositionResize,
//   // doodlePositionStart,
// } from './export';
// import { doodleInit } from './export';
// import MagnetLogo from './export';

function animationEnter(container) {
  const cornerBox = container.querySelector("#wrapper__corner-box");
  // container.querySelector('#corner-content').style.background = 'red';
  const tl = gsap.timeline();

  tl.from(cornerBox, {
    width: 2000,
    height: 2000,
    duration: 1,
    clearProps: "all",
  }).from(
    container,
    {
      opacity: 0,
      clearProps: "all",
    },
    "<0.2"
  );

  return tl;
}

function animationLeave(container, done) {
  const cornerBox = container.querySelector("#wrapper__corner-box");

  const tl = gsap.timeline();

  tl.to(cornerBox, {
    width: 2000,
    height: 2000,
    duration: 1,
    clearProps: "all",
    onComplete: () => done(),
  }).to(
    container,
    {
      opacity: 0,
    },
    "<0.4"
  );

  return tl;
}

barba.init({
  debug: true,
  transitions: [
    {
      name: "default-transition",
      once(data) {
        animationEnter(data.next.container);
        console.log("once");
      },
      leave(data) {
        const done = this.async();
        animationLeave(data.current.container, done);
        console.log("leaving");
      },
      enter(data) {
        console.log("entering");
        animationEnter(data.next.container);
      },
    },
  ],
  views: [
    {
      namespace: "home-page",
      beforeEnter: () => {
        window.addEventListener("resize", doodlePositionResize);
      },
      afterEnter: () => {
        homeInit();
        addCustomCursor();
      },
    },
    {
      namespace: "about-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
      },
      afterEnter: () => {
        aboutAnimationInit();
        addCustomCursor();
      },
    },
    {
      namespace: "skills-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
      },
      afterEnter: () => {
        pageSkillsInit();
        addCustomCursor();
      },
    },
    {
      namespace: "test-page",
      beforeEnter: () => {
        // window.removeEventListener("resize", doodlePositionResize);
      },
      afterEnter: () => {
        // homeInit();
        // addCustomCursor();
        console.log("test afterEnter");
      },
    },
  ],
});
