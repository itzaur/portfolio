import "../scss/main.scss";
import "../pavel.cv.pdf";
import barba from "@barba/core";
import { buttonFunctionality, doodlePositionResize, homeInit } from "./index";
import {
  addDoorAnimationOnResize,
  controlHoverOnCornerButton,
  cornerArrowHoverEffect,
  aboutAnimationInit,
  pageSkillsInit,
  contactPageInit,
} from "./about";
import { addCustomCursor } from "./cursor";

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
    .set("#corner-button svg path", {
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
  const timelineLeave = gsap.timeline();
  const scaleValue = window.innerWidth > 568 ? 120 : 60;

  ["mouseenter", "mousemove"].forEach((event) => {
    container.removeEventListener(event, controlHoverOnCornerButton);
  });

  timelineLeave
    .set("#corner-button svg", {
      autoAlpha: 0,
    })
    .to(cornerBox, {
      scale: scaleValue,
      pointerEvents: "none",
      cursor: "none",
      duration: 1,
      transformOrigin: "right bottom",
      onStart: () => {
        const hoverElements = container.querySelectorAll(
          ".nav__link, [data-hover-star='hover']"
        );
        hoverElements.forEach((el) => {
          el.setAttribute("data-hover-star", "not-hover");
        });
      },
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
  // debug: true,

  transitions: [
    {
      name: "default-transition",
      once(data) {
        animationEnter(data.next.container);
      },
      leave(data) {
        const done = this.async();
        animationLeave(data.current.container, done);
      },
      enter(data) {
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
        setTimeout(() => homeInit(), 0);
      },
    },
    {
      namespace: "about-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
        window.removeEventListener("resize", addDoorAnimationOnResize);
      },
      afterEnter: () => {
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
    addCustomCursor();
    buttonFunctionality();
    resolve();
  });

  return afterEnterPromiseAll;
});

const preloadImages = (selector = "svg") => {
  return new Promise((resolve) => {
    imagesLoaded(document.querySelectorAll(selector), resolve);
  });
};

preloadImages().then(() => {
  document.body.classList.remove("loading");
});
