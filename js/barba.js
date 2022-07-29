import barba from "@barba/core";
import {
  MagnetLogo,
  pageSkillsInit,
  aboutAnimationInit,
  addCustomCursor,
  homeInit,
  buttonFunctionality,
  contactPageInit,
  cornerArrowAnimation,
  cornerArrowHoverEffect,
} from "./export";
import { doodlePositionResize } from "./index";
import { addDoorAnimationOnResize, controlHoverOnCornerButton } from "./about";

function animationEnter(container) {
  const cornerBox = container.querySelector("#wrapper__corner-box");
  gsap.set("#corner-button svg g g path", {
    autoAlpha: 0,
  });
  const tl = gsap.timeline();
  tl.set("#corner-button svg", {
    autoAlpha: 0,
  }).set(cornerBox, {
    pointerEvents: "none",
    cursor: "none",
  });

  tl.to(cornerBox, {
    scale: 1,
    z: 1,
    transformOrigin: "right bottom",
    duration: 1,
    // clearProps: "transform",
    onComplete: () => {
      cornerArrowHoverEffect();
      tl.to(["#corner-button svg, .contact-elements"], {
        autoAlpha: 1,
        duration: 1,
        // clearProps: "all",
      }).to(cornerBox, {
        pointerEvents: "auto",
        cursor: "auto",
      });
      ["mouseenter", "mousemove", "focusin"].forEach((event) => {
        container.addEventListener(event, controlHoverOnCornerButton);
      });
    },
  }).from(".corner-border path", {
    strokeWidth: "0.5",
  });
  // .from(
  //   container,
  //   {
  //     opacity: 0,
  //     clearProps: "all",
  //     // onComplete: () => {
  //     //   cornerArrowHoverEffect();
  //     //   tl.set("#corner-button svg", {
  //     //     autoAlpha: 1,
  //     //     clearProps: "all",
  //     //   });
  //     // },
  //   },
  //   "<0.2"
  // );

  return tl;
}

function animationLeave(container, done) {
  const cornerBox = container.querySelector("#wrapper__corner-box");

  ["mouseenter", "mousemove"].forEach((event) => {
    container.removeEventListener(event, controlHoverOnCornerButton);
  });

  const tl = gsap.timeline();

  tl.set("#corner-button svg", {
    autoAlpha: 0,
  })
    .to(cornerBox, {
      scale: 170,
      z: 1,
      pointerEvents: "none",
      cursor: "none",
      duration: 1,
      transformOrigin: "right bottom",
      // clearProps: "transform",
      onComplete: () => done(),
    })
    .to(
      ".corner-border path",
      {
        strokeWidth: "0.5",
      },
      "<0"
    );
  // .to(
  //   container,
  //   {
  //     opacity: 0,
  //     duration: 1,
  //     clearProps: "all",
  //   },
  //   "<0"
  // );

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
        window.removeEventListener("resize", addDoorAnimationOnResize);
      },
      afterEnter: () => {
        homeInit();
      },
    },
    {
      namespace: "about-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
      },
      afterEnter: () => {
        aboutAnimationInit();
        buttonFunctionality();
      },
    },
    {
      namespace: "skills-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
        window.removeEventListener("resize", addDoorAnimationOnResize);
      },
      afterEnter: () => {
        pageSkillsInit();
        buttonFunctionality();
      },
    },
    {
      namespace: "contact-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
      },
      afterEnter: () => {
        // homeInit();
        // addCustomCursor();
        contactPageInit();
        buttonFunctionality();
      },
    },
  ],
});

barba.hooks.beforeEnter(({ current, next }) => {
  let beforeEnterPromiseAll = new Promise(function (resolve) {
    resolve();
  });

  return beforeEnterPromiseAll;
});

barba.hooks.enter(({ current, next }) => {
  let enterPromiseAll = new Promise(function (resolve) {
    current.container.remove();

    resolve();
  });

  return enterPromiseAll;
});

barba.hooks.afterEnter(({ current, next }) => {
  let afterEnterPromiseAll = new Promise(function (resolve) {
    addCustomCursor();
    resolve();
  });

  return afterEnterPromiseAll;
});
