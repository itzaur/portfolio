import barba from "@barba/core";
import { doodlePositionResize } from "./index";
import { addDoorAnimationOnResize, controlHoverOnCornerButton } from "./about";

function animationEnter(container) {
  const cornerBox = container.querySelector("#wrapper__corner-box");

  gsap.set("#corner-button svg g g path", {
    autoAlpha: 0,
  });
  const timelineEnter = gsap.timeline();

  timelineEnter
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
        import("./about.js").then(({ cornerArrowHoverEffect }) => {
          cornerArrowHoverEffect();
        });

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

  ["mouseenter", "mousemove"].forEach((event) => {
    container.removeEventListener(event, controlHoverOnCornerButton);
  });

  const timelineLeave = gsap.timeline();

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
        import("./index").then(({ homeInit }) => {
          homeInit();
        });
      },
    },
    {
      namespace: "about-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
      },
      afterEnter: () => {
        import("./about.js").then(({ aboutAnimationInit }) => {
          aboutAnimationInit();
        });
      },
    },
    {
      namespace: "skills-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
        window.removeEventListener("resize", addDoorAnimationOnResize);
      },
      afterEnter: () => {
        import("./about.js").then(({ pageSkillsInit }) => {
          pageSkillsInit();
        });
      },
    },
    {
      namespace: "contact-page",
      beforeEnter: () => {
        window.removeEventListener("resize", doodlePositionResize);
      },
      afterEnter: () => {
        import("./about.js").then(({ contactPageInit }) => {
          contactPageInit();
        });
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
    import("./cursor").then(({ addCustomCursor }) => {
      addCustomCursor();
    });

    import("./index.js").then(({ buttonFunctionality }) => {
      buttonFunctionality();
    });

    resolve();
  });

  return afterEnterPromiseAll;
});
