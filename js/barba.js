import "../scss/main.scss";
// import "../img/svg/boom_white.svg";

import barba from "@barba/core";
import { homeInit, buttonFunctionality, doodlePositionResize } from "./index";
import {
  addDoorAnimationOnResize,
  controlHoverOnCornerButton,
  cornerArrowHoverEffect,
  aboutAnimationInit,
  pageSkillsInit,
  contactPageInit,
} from "./about";
import { addCustomCursor } from "./cursor";
// import { timelineLetters } from "./animations";

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context("../img", false, /.(png|jpe?g|svg)$/));

//ANCHOR Fix viewport units on mobile
function documentHeight() {
  const doc = document.documentElement;
  doc.style.setProperty("--real-height", `${window.innerHeight}px`);
}
window.addEventListener("resize", documentHeight);
documentHeight();

function animationEnter(container) {
  const cornerBox = container.querySelector("#wrapper__corner-box");
  const timelineEnter = gsap.timeline({ duration: 0.5 });

  timelineEnter
    .set("#corner-button svg g g path", {
      autoAlpha: 0,
    })
    .set("#corner-button svg", {
      autoAlpha: 0,
    })
    .set(cornerBox, {
      pointerEvents: "none",
      cursor: "none",
    })
    .to(cornerBox, {
      scale: 1,
      transformOrigin: "right bottom",
      duration: 1.2,

      onComplete: () => {
        // import("./about.js").then(({ cornerArrowHoverEffect }) => {
        //   cornerArrowHoverEffect();
        // });
        cornerArrowHoverEffect();

        timelineEnter
          .to(["#corner-button svg, .contact-elements"], {
            autoAlpha: 1,
            duration: 1,
          })
          .to(cornerBox, {
            pointerEvents: "auto",
            cursor: "auto",
          });

        ["mouseenter", "mousemove", "focusin"].forEach((event) => {
          container.addEventListener(event, controlHoverOnCornerButton);
        });
      },
    })
    .from(".corner-border path", {
      strokeWidth: "0.4",
    });

  return timelineEnter;
}

function animationLeave(container, done) {
  const cornerBox = container.querySelector("#wrapper__corner-box");
  const timelineLeave = gsap.timeline({ duration: 0.1 });

  ["mouseenter", "mousemove"].forEach((event) => {
    container.removeEventListener(event, controlHoverOnCornerButton);
  });

  timelineLeave
    .set("#corner-button svg", {
      autoAlpha: 0,
    })
    .to(cornerBox, {
      scale: 170,
      pointerEvents: "none",
      cursor: "none",
      duration: 1.5,
      transformOrigin: "right bottom",
      onComplete: () => done(),
    })
    .to(
      ".corner-border path",
      {
        strokeWidth: "0.4",
      },
      "<0"
    );

  return timelineLeave;
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
        // import("./index").then(({ homeInit }) => {
        //   homeInit();
        // });
        homeInit();
      },
    },
    {
      namespace: "about-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
        window.removeEventListener("resize", addDoorAnimationOnResize);
      },
      afterEnter: () => {
        // import("./about.js").then(({ aboutAnimationInit }) => {
        //   aboutAnimationInit();
        // });
        aboutAnimationInit();
      },
    },
    {
      namespace: "skills-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
        window.removeEventListener("resize", addDoorAnimationOnResize);
      },
      afterEnter: () => {
        // import("./about.js").then(({ pageSkillsInit }) => {
        //   pageSkillsInit();
        // });
        pageSkillsInit();
      },
    },
    {
      namespace: "contact-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
        window.removeEventListener("resize", addDoorAnimationOnResize);
      },
      afterEnter: () => {
        // import("./about.js").then(({ contactPageInit }) => {
        //   contactPageInit();
        // });
        contactPageInit();
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
    // import("./cursor").then(({ addCustomCursor }) => {
    //   addCustomCursor();
    // });

    addCustomCursor();

    // import("./index.js").then(({ buttonFunctionality }) => {
    //   buttonFunctionality();
    // });
    buttonFunctionality();

    // timelineLetters.reversed()
    //   ? timelineLetters.play(0)
    //   : timelineLetters.reverse();
    // timelineLetters.play(0);

    // timelineLetters.play(0);

    resolve();
  });

  return afterEnterPromiseAll;
});

const preloadImages = (selector = "svg") => {
  return new Promise((resolve) => {
    imagesLoaded(document.querySelectorAll(selector), resolve);

    // imagesLoaded(
    //   "#wrapper",
    //   {
    //     background: ".color-game__item",
    //   },
    //   function (imgLoad) {
    //     return imgLoad;
    //     // console.log(imgLoad);
    //   }
    // );
    // console.log(document.querySelectorAll(selector));
  });
};

preloadImages().then(() => {
  document.body.classList.remove("loading");
});

//ANCHOR largest-contentful-paint API
// let hiddenTime = document.visibilityState === "hidden" ? 0 : Infinity;

// document.addEventListener(
//   "visibilitychange",
//   (event) => {
//     hiddenTime = Math.min(hiddenTime, event.timeStamp);
//   },
//   { once: true }
// );

// new PerformanceObserver((entryList) => {
//   entryList.getEntries().forEach((entry) => {
//     if (entry.startTime < hiddenTime) {
//       // This entry occurred before the page was hidden
//       console.log(entry);
//     }
//   });
// }).observe({ type: "largest-contentful-paint", buffered: true });

// window.addEventListener("DOMContentLoaded", () => {
//   document.body.classList.add("first-load");

//   transitionCheckupOutside();
//   transitionCheckupInside();

//   pageTransitions();
// });

// function createFlipCornerAnimation() {
//   timelineLetters.play();
// }

// createFlipCornerAnimation();

// function pageTransitions() {
//   barba.hooks.beforeEnter((data) => {
//     console.log(data);
//     let beforeEnterPromiseAll = new Promise(function (resolve) {
//       if (!document.body.classList.contains("first-load")) {
//         document.body.classList.add("" + data.next.namespace);
//         document.body.classList.remove("" + data.current.namespace);
//       }

//       resolve();
//     });

//     return beforeEnterPromiseAll;
//   });

//   barba.hooks.enter(({ current, next }) => {
//     let enterPromiseAll = new Promise(function (resolve) {
//       current.container.remove();

//       resolve();
//     });

//     return enterPromiseAll;
//   });

//   barba.hooks.afterEnter((data) => {
//     let afterEnterPromiseAll = new Promise(function (resolve) {
//       if (!document.body.classList.contains("first-load")) {
//         initRefireCallbacks();

//         document.body.classList.remove("is-transitioning");
//       }

//       resolve();
//     });

//     return afterEnterPromiseAll;
//   });

//   barba.init({
//     prevent: ({ el }) =>
//       el.classList && el.classList.contains("prevent-transition"),
//     prevent: ({ event }) => {
//       if (event.type === "click") {
//         if (barba.transitions.isRunning) {
//           event.preventDefault();

//           return true;
//         }
//       }
//     },

//     cacheIgnore: false,
//     prefetchIgnore: false,
//     timeout: 5000,
//     debug: true,

//     transitions: [
//       {
//         name: "default",

//         beforeOnce(current, next, trigger) {},

//         once(current, next, trigger) {},

//         afterOnce(current, next, trigger) {},

//         beforeLeave(current, next, trigger) {},

//         leave(current, next, trigger) {
//           let leavePromise = new Promise(function (resolve) {
//             let outTransition = gsap.timeline({
//               force3D: true,
//             });

//             const cornerBox = document.querySelector("#wrapper__corner-box");

//             outTransition
//               .set("#corner-button svg", {
//                 autoAlpha: 0,
//               })
//               .to(cornerBox, {
//                 scale: 170,
//                 pointerEvents: "none",
//                 cursor: "none",
//                 duration: 1,
//                 transformOrigin: "right bottom",
//               })
//               .to(
//                 ".corner-border path",
//                 {
//                   strokeWidth: "0.5",
//                 },
//                 "<0"
//               )
//               .then(() => {
//                 resolve();
//               });
//           });

//           return leavePromise;
//         },

//         afterLeave(current, next, trigger) {},

//         beforeEnter(current, next, trigger) {},

//         enter(current, next, trigger) {},

//         afterEnter(current, next, trigger) {
//           let afterEnterPromise = new Promise(function (resolve) {
//             let inTransition = gsap.timeline({ force3D: true });

//             const cornerBox = document.querySelector("#wrapper__corner-box");

//             inTransition
//               .set("#corner-button svg g g path", {
//                 autoAlpha: 0,
//               })
//               .set("#corner-button svg", {
//                 autoAlpha: 0,
//               })
//               .set(cornerBox, {
//                 pointerEvents: "none",
//                 cursor: "none",
//               })
//               .to(cornerBox, {
//                 scale: 1,
//                 transformOrigin: "right bottom",
//                 duration: 1,

//                 onComplete: () => {
//                   // import("./about.js").then(({ cornerArrowHoverEffect }) => {
//                   //   cornerArrowHoverEffect();
//                   // });
//                   cornerArrowHoverEffect();

//                   inTransition
//                     .to(["#corner-button svg, .contact-elements"], {
//                       autoAlpha: 1,
//                       duration: 1,
//                     })
//                     .to(cornerBox, {
//                       pointerEvents: "auto",
//                       cursor: "auto",
//                     });

//                   ["mouseenter", "mousemove", "focusin"].forEach((event) => {
//                     document.addEventListener(
//                       event,
//                       controlHoverOnCornerButton
//                     );
//                   });
//                 },
//               })
//               .from(".corner-border path", {
//                 strokeWidth: "0.5",

//                 onComplete: () => {
//                   resolve();
//                 },
//               });
//           });

//           return afterEnterPromise;
//         },
//       },
//     ],

//     views: [
//       {
//         namespace: "home-page",

//         beforeLeave(data) {
//           timelineLetters.pause(0);
//         },

//         afterLeave(data) {},

//         beforeEnter(data) {},

//         afterEnter(data) {
//           homeInit();
//         },
//       },

//       {
//         namespace: "about-page",

//         beforeLeave(data) {
//           // timelineLetters.pause(0);
//         },

//         afterLeave(data) {},

//         beforeEnter(data) {},

//         afterEnter(data) {
//           aboutAnimationInit();
//         },
//       },

//       {
//         namespace: "skills-page",

//         beforeLeave(data) {
//           // timelineLetters.pause(0);
//         },

//         afterLeave(data) {},

//         beforeEnter(data) {},

//         afterEnter(data) {
//           pageSkillsInit();
//         },
//       },

//       {
//         namespace: "contact-page",

//         beforeLeave(data) {
//           // timelineLetters.pause(0);
//         },

//         afterLeave(data) {},

//         beforeEnter(data) {},

//         afterEnter(data) {
//           contactPageInit();
//         },
//       },
//     ],
//   });
// }

// function transitionCheckupOutside() {
//   let links = document.querySelectorAll('a[href]:not([target="_blank"])');

//   let cbk = function (e) {
//     if (!this.closest("main").length > 0) {
//       if (e.currentTarget.href === window.location.href) {
//         e.preventDefault();
//         e.stopPropagation();
//       } else {
//         if (document.body.classList.contains("first-load")) {
//           document.body.classList.remove("first-load");
//         }
//       }
//     }
//   };

//   for (let i = 0; i < links.length; i++) {
//     links[i].addEventListener("click", cbk);
//   }
// }

// function transitionCheckupInside() {
//   let links = document.querySelectorAll('main a[href]:not([target="_blank"])');

//   let cbk = function (e) {
//     if (e.currentTarget.href === window.location.href) {
//       e.preventDefault();
//       e.stopPropagation();
//     } else {
//       if (document.body.classList.contains("first-load")) {
//         document.body.classList.remove("first-load");
//       }
//     }
//   };

//   for (let i = 0; i < links.length; i++) {
//     links[i].addEventListener("click", cbk);
//   }
// }

// function initRefireCallbacks() {
//   transitionCheckupInside();
// }
