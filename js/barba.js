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

function animationEnter(container) {
  const cornerBox = container.querySelector("#wrapper__corner-box");
  const timelineEnter = gsap.timeline({ duration: 0.5 });

  // gsap.set("#corner-button svg g g path", {
  //   autoAlpha: 0,
  // });

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
      duration: 1,

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
      strokeWidth: "0.5",
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
      duration: 1,
      transformOrigin: "right bottom",
      onComplete: () => done(),
    })
    .to(
      ".corner-border path",
      {
        strokeWidth: "0.5",
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

var hiddenTime = document.visibilityState === "hidden" ? 0 : Infinity;

document.addEventListener(
  "visibilitychange",
  (event) => {
    hiddenTime = Math.min(hiddenTime, event.timeStamp);
  },
  { once: true }
);

new PerformanceObserver((entryList) => {
  entryList.getEntries().forEach((entry) => {
    if (entry.startTime < hiddenTime) {
      // This entry occurred before the page was hidden
      console.log(entry);
    }
  });
}).observe({ type: "largest-contentful-paint", buffered: true });
