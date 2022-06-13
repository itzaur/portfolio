"use strict";
// import barba from '@barba/core';
// import barbaCss from '@barba/css';
// import Barba from 'barba.js';
// import { Cursor } from './export';
// import { MagnetLogo, addCustomCursor } from './cursor';
import { MagnetLogo, addCustomCursor } from "./cursor";
import FontFaceObserver from "./../node_modules/fontfaceobserver/fontfaceobserver";

function buttonFunctionality() {
  //ANCHOR Button
  const btnBig = document.querySelector(".btn-big");
  const btnSmall = document.querySelector(".btn-small");
  const menuPage = document.querySelector(".menu");
  const menuDoodle = document.querySelectorAll(
    ".menu__box path, .menu__box polygon"
  );
  const menuNavDoodle = document.querySelector(".menu__img img");
  const menuBtnClose = document.querySelector(".menu-btn-close");
  const menuLinks = document.querySelectorAll(".nav__item");
  let isOpen = false;
  let mediaQueryTransformX = -16;
  let mediaQueryTransformY = 5;
  let deltaX = window.innerWidth > 568 ? mediaQueryTransformX : 0;
  let deltaY = window.innerWidth > 568 ? mediaQueryTransformY : 0;

  btnBig.addEventListener("click", (e) => {
    btnBig.setAttribute("aria-selected", false);
    btnSmall.setAttribute("aria-selected", true);

    document.querySelectorAll('[data-tabindex="0"]').forEach((tab) => {
      tab.setAttribute("data-tabindex", "-1");
      tab.setAttribute("tabindex", "-1");
    });

    menuPage.querySelectorAll('[tabindex="-1"]').forEach((tab) => {
      tab.setAttribute("tabindex", "0");
    });

    document.querySelectorAll(".about-dot").forEach((dot) => {
      dot.setAttribute("tabindex", "-1");
    });

    menuTransitionRun();
  });

  btnSmall.addEventListener("click", (e) => {
    btnSmall.setAttribute("aria-selected", false);
    btnBig.setAttribute("aria-selected", true);

    menuTransitionStop();
  });

  //ANCHOR Animations
  //Letters animation
  btnBig.addEventListener("mouseenter", animateTextHoverRun);
  btnBig.addEventListener("mouseleave", animateTextHoverStop);

  checkMediaQuery();

  const timelineLetters = gsap.timeline({
    repeat: 0,
    yoyo: false,
  });

  function animateTextHoverRun() {
    timelineLetters.to(".text-cls-1", {
      translateX: "-1rem",
      duration: 0.2,
      ease: "back.out(1.7)",
      stagger: 0.05,
      opacity: 1,
    });
    timelineLetters.play();
  }

  function animateTextHoverStop() {
    timelineLetters.reverse();
  }

  //Menu animation
  //Menu transition
  const tlMenuTransition = gsap.timeline({
    paused: true,
  });

  tlMenuTransition
    .to(menuPage, {
      height: "calc(100vh - var(--padding-container) * 2)",
      // border: "1px solid black",
      // height: "100vh",
      ease: "bounce.out",
    })
    .from(
      menuDoodle,
      {
        y: -600,
        ease: "bounce.out",
        opacity: 0,
        duration: 0.3,
        stagger: { each: 0.001, from: "random" },
      },
      "<0.1"
    )
    .from(".menu__box img", {
      autoAlpha: 0,
      scale: 0,
      ease: "elastic.out(1, 0.3)",
      clearProps: "transform",
    })
    .from(
      menuNavDoodle,
      {
        opacity: 0,
        ease: "elastic.out(1, 0.3)",
        duration: 1.2,
        transform: `translate3d(${deltaX}vw, ${deltaY}vw, 1px) scale(0)`, //fix firefox bug
      },
      "<0.3"
    )
    .from(
      menuLinks,
      {
        y: -60,
        opacity: 0,
        stagger: 0.2,
        ease: "back.out(1.7)",
      },
      "<0.6"
    )
    .from(
      ".menu__star",
      {
        opacity: 0,
        scale: 0,
        stagger: 0.1,
        ease: "elastic.out(1, 0.3)",
      },
      "-=1"
    );

  function checkMediaQuery() {
    if (window.matchMedia("(max-width: 568px)").matches) {
      menuNavDoodle.style.transform = `translate3d(0, 0, 1px) scale(1)`;
    } else {
      menuNavDoodle.style.transform = `translate3d(-16vw, 5vw, 15px) scale(1)`;
    }
  }

  window.addEventListener("resize", checkMediaQuery);

  function menuTransitionRun() {
    if (window.matchMedia("(max-width: 568px)").matches) {
      gsap.to(menuNavDoodle, {
        transform: `translate3d(0, 0, 2px) scale(1)`,
      });
      gsap.from(
        menuBtnClose,
        {
          y: -100,
          opacity: 0,
          ease: "back.out(1.7)",
          duration: 0.6,
        },
        "+=1"
      );
    } else {
      gsap.to(menuNavDoodle, {
        transform: `translate3d(-16vw, 5vw, 10px) scale(1)`,
      });
      gsap.from(
        menuBtnClose,
        {
          x: -100,
          opacity: 0,
          ease: "back.out(1.7)",
          duration: 0.6,
        },
        "+=1.5"
      );
    }

    setTimeout(() => {
      tlMenuTransition.timeScale(0.8).play();
      isOpen = true;
    }, 100);
  }

  function menuTransitionStop(e) {
    const closeMenu = gsap.to(menuPage, {
      height: 0,
      ease: "power4.out",
      duration: 0.8,
      paused: true,
    });

    isOpen = false;

    // if (!isOpen) {
    //   //isOpen == false
    //   closeMenu.play();
    // }

    // tlMenuTransition.pause(0).reversed(true);

    if (e.target.getAttribute("href")) {
      closeMenu.pause();
    } else {
      closeMenu.play();
      tlMenuTransition.pause(0).reversed(true);
      gsap.to(".menu-btn-close", {
        x: -100,
        y: -100,
        clearProps: "x, y",
      });
    }

    btnBig.setAttribute("aria-selected", true);
    btnSmall.setAttribute("aria-selected", false);

    document.querySelectorAll('[data-tabindex="-1"]').forEach((tab) => {
      tab.setAttribute("data-tabindex", "0");
      tab.setAttribute("tabindex", "0");
    });

    menuPage.querySelectorAll('[tabindex="0"]').forEach((tab) => {
      tab.setAttribute("tabindex", "-1");
    });

    document.querySelectorAll(".about-dot").forEach((dot) => {
      dot.setAttribute("tabindex", "0");
    });
  }

  menuPage.addEventListener("click", menuTransitionStop);
}

function homeInit() {
  //ANCHOR Button
  const btnBig = document.querySelector(".btn-big");
  const btnSmall = document.querySelector(".btn-small");
  //ANCHOR Fonts
  let font = new FontFaceObserver("d_CCMonologous", {
    weight: 700,
  });

  font
    .load()
    .then(function () {
      console.log("Font has loaded.");
    })
    .catch(function () {
      console.log("Font failed to load.");
    });

  buttonFunctionality();

  //Glasses animation
  const timelineGlasses = gsap.timeline({
    repeat: -1,
    yoyo: false,
  });

  gsap.fromTo(
    ".glass",
    {
      x: -25,
      y: 8.5,
      ease: "none",
      // opacity: 0.8,
      opacity: 1,
    },
    {
      x: 55,
      y: -25,
      duration: 0.5,
      ease: "none",
      repeat: -1,
      repeatDelay: 6,
    }
  );

  timelineGlasses.to(".glass rect", {
    keyframes: [{ height: 80 }, { height: 22, x: -336, y: 160, opacity: 1 }],
    duration: 0.5,
    ease: "none",
    repeat: -1,
    repeatDelay: 6,
  });

  //ANCHOR Doodle

  const textSpan0 = document.querySelector(".span0");
  const textSpan1 = document.querySelector(".span1");
  const textSpan2 = document.querySelector(".span2");
  const textSpan3 = document.querySelector(".span3");

  const doodleMobile = document.querySelector(".doodle-mobile");
  const textSpan0Mobile = doodleMobile.querySelector(".span0");
  const textSpan1Mobile = doodleMobile.querySelector(".span1");
  const textSpan2Mobile = doodleMobile.querySelector(".span2");
  const textSpan3Mobile = doodleMobile.querySelector(".span3");

  const text = {
    string0: "My name",
    string1: "is Pavel!",
    string2: "Welcome to",
    string3: "my page!",
  };
  const str0 = text.string0.split("");
  const str1 = text.string1.split("");
  const str2 = text.string2.split("");
  const str3 = text.string3.split("");

  const str0Mobile = text.string0.split("");
  const str1Mobile = text.string1.split("");
  const str2Mobile = text.string2.split("");
  const str3Mobile = text.string3.split("");

  //Doodle animation
  function animateLetters1() {
    if (str0.length > 0) {
      textSpan0.innerHTML += str0.shift();
      textSpan0Mobile.innerHTML += str0Mobile.shift();
    } else {
      clearTimeout(animateLetters1);
    }

    setTimeout(animateLetters1, 100);
  }

  function animateLetters2() {
    if (str1.length > 0) {
      textSpan1.innerHTML += str1.shift();
      textSpan1Mobile.innerHTML += str1Mobile.shift();
    } else {
      clearTimeout(animateLetters2);
    }

    setTimeout(animateLetters2, 100);
  }

  function animateLetters3() {
    if (str2.length > 0) {
      textSpan2.innerHTML += str2.shift();
      textSpan2Mobile.innerHTML += str2Mobile.shift();
    } else {
      clearTimeout(animateLetters3);
    }

    setTimeout(animateLetters3, 100);
  }

  function animateLetters4() {
    if (str3.length > 0) {
      textSpan3.innerHTML += str3.shift();
      textSpan3Mobile.innerHTML += str3Mobile.shift();
    } else {
      clearTimeout(animateLetters4);
    }

    setTimeout(animateLetters4, 100);
  }

  setTimeout(animateLetters1, 5500);
  setTimeout(animateLetters2, 6200);
  setTimeout(animateLetters3, 7200);
  setTimeout(animateLetters4, 8500);

  //ANCHOR Photo
  // const prePhoto = document.querySelector('.pre-photo');

  // const photoBox = photo.getBoundingClientRect();
  // const doodleBox = doodle.getBoundingClientRect();
  // const photoTransformY = photo.computedStyleMap().get('transform')[0].y.value;
  // const photoTransformX = photo.computedStyleMap().get('transform')[0].x.value;

  // const windowHeight = window.innerHeight;
  // const windowWidth = window.innerWidth;
  // const photoWindowHeight = photo.offsetHeight - photoTransformY;
  // const photoWindowWidth = photo.offsetWidth;
  // const visibleContentX = window.innerWidth - photo.getBoundingClientRect().left;
  // const visibleContentY = window.innerHeight - photo.getBoundingClientRect().top;

  const photo = document.querySelector(".photo");
  const doodle = document.querySelector(".doodle");

  const photoTransformY = +window
    .getComputedStyle(photo, null)
    .transform.match(/(-?[0-9\.]+)/g)[5];
  const photoTransformX = +window
    .getComputedStyle(photo, null)
    .transform.match(/(-?[0-9\.]+)/g)[4];

  function doodlePositionStart() {
    doodle.style.transform = `translate(${
      window.innerWidth -
      doodle.offsetWidth -
      photo.offsetWidth * 0.8 +
      photoTransformX
    }px, ${
      window.innerHeight -
      (photo.offsetHeight - photo.offsetHeight * 0.25 + -photoTransformY)
    }px)`;
  }

  // function doodlePositionResize() {
  //   doodle.style.transform = `translate(${
  //     window.innerWidth -
  //     doodle.offsetWidth -
  //     photo.offsetWidth * 0.8 +
  //     +window.getComputedStyle(photo, null).transform.match(/(-?[0-9\.]+)/g)[4]
  //   }px, ${
  //     window.innerHeight -
  //     (photo.offsetHeight -
  //       photo.offsetHeight * 0.25 -
  //       +window
  //         .getComputedStyle(photo, null)
  //         .transform.match(/(-?[0-9\.]+)/g)[5])
  //   }px)`;
  // }
  doodlePositionStart();
  // doodlePositionResize();
  // document.addEventListener('DOMContentLoaded', doodlePositionStart);

  // window.addEventListener('resize', doodlePositionResize);

  //ANCHOR Page animations
  const helloDots = document.querySelectorAll(
    '.hello-dots path:not([data-item="hello-doodle"])'
  );
  const helloDoodle = document.querySelectorAll('[data-item="hello-doodle"]');
  const dots = document.querySelectorAll('[data-name="pre-photo"] .cls-1');

  const tlPage = gsap.timeline({
    defaults: { duration: 1, repeat: 0, rotation: 0.05 },
  });

  function getPageAnimation() {
    tlPage
      .fromTo(
        ".photo",
        {
          x: 2400,
          transformOrigin: "top top",
          rotation: "50deg",
          // ease: 'back.out(1.7)',
          // ease: 'elastic.out(1, 0.3)',
          // duration: 1.5,
          // clearProps: 'transform',
        },
        {
          x: photoTransformX,
          rotation: "0deg",
          // ease: 'elastic.out(1, 0.6)',
          clearProps: "transform",
          // duration: 1.5,
        }
      )
      .from(dots, {
        opacity: 0,
        scale: 0,
        stagger: {
          each: 0.002,
          from: 15,
        },

        ease: "back.out(1.7)",
      })
      .from(
        helloDots,
        0.5,
        {
          y: -100,
          ease: "bounce.out",
          opacity: 0,
          stagger: { each: 0.003, from: "random" },
        },
        "<0.6"
      )
      .from(
        helloDoodle,
        0.6,
        { y: -300, ease: "bounce.out", opacity: 0, stagger: 0.03 },
        "<1.3"
      )
      .to(
        [".doodle", ".doodle-mobile"],
        {
          opacity: 1,
          ease: "back.out(1.7)",
        },
        "<0.5"
      )
      .from(
        btnBig,
        {
          transform: "translate3d(0, 0, 1px) scale(0)",
          opacity: 0,
          ease: "Bounce.easeOut",
          delay: 1,
        },
        "<4.8"
      )
      .from(
        ".logo",
        {
          transform: "translate3d(0, 0, 1px) scale(0)",
          opacity: 0,
          ease: "Bounce.easeOut",
          onComplete: () => {
            const magnetLogo = new MagnetLogo(document.querySelector(".logo"));
          },
        },
        "<0"
      )
      .from(".color-game__item", {
        x: "-100%",
        opacity: 0,
        stagger: {
          each: 0.2,
        },
        ease: "back.out(1.7)",
      });
  }

  getPageAnimation();

  const nextPageLink = document.querySelectorAll("#corner-link");
  nextPageLink.forEach((link) => {
    link.addEventListener("click", () => {
      tlPage.kill();
    });
  });

  //Menu animation
  //Menu transition
  // const menuPage = document.querySelector(".menu");
  // const menuDoodle = document.querySelectorAll(
  //   ".menu__box path, .menu__box polygon"
  // );
  // const menuNavDoodle = document.querySelector(".menu__img img");
  // const menuBtnClose = document.querySelector(".menu-btn-close");
  // const menuLinks = document.querySelectorAll(".nav__item");
  // let isOpen = false;
  // let mediaQueryTransformX = -16;
  // let mediaQueryTransformY = 5;
  // let deltaX = window.innerWidth > 568 ? mediaQueryTransformX : 0;
  // let deltaY = window.innerWidth > 568 ? mediaQueryTransformY : 0;

  // function checkMediaQuery() {
  //   if (window.matchMedia("(max-width: 568px)").matches) {
  //     menuNavDoodle.style.transform = `translate3d(0, 0, 1px) scale(1)`;
  //   } else {
  //     menuNavDoodle.style.transform = `translate3d(-16vw, 5vw, 1px) scale(1)`;
  //   }
  // }
  // checkMediaQuery();
  // window.addEventListener("resize", checkMediaQuery);

  // const tlMenuTransition = gsap.timeline({
  //   paused: true,
  // });

  // tlMenuTransition
  //   .to(menuPage, {
  //     height: "calc(100vh - var(--padding-container) * 2)",
  //     // height: "100vh",
  //     ease: "bounce.out",
  //   })
  //   .from(
  //     menuDoodle,
  //     {
  //       y: -600,
  //       ease: "bounce.out",
  //       opacity: 0,
  //       duration: 0.3,
  //       stagger: { each: 0.001, from: "random" },
  //     },
  //     "<0.1"
  //   )
  //   .from(".menu__box img", {
  //     autoAlpha: 0,
  //     scale: 0,
  //     ease: "elastic.out(1, 0.3)",
  //   })
  //   .from(
  //     menuNavDoodle,
  //     {
  //       opacity: 0,
  //       ease: "elastic.out(1, 0.3)",
  //       duration: 1.2,
  //       transform: `translate3d(${deltaX}vw, ${deltaY}vw, 1px) scale(0)`, //fix firefox bug
  //     },
  //     "<0.3"
  //   )
  //   .from(
  //     menuLinks,
  //     {
  //       y: -60,
  //       opacity: 0,
  //       stagger: 0.2,
  //       ease: "back.out(1.7)",
  //     },
  //     "<0.6"
  //   )
  //   .from(
  //     ".menu__star",
  //     {
  //       opacity: 0,
  //       scale: 0,
  //       stagger: 0.1,
  //       ease: "elastic.out(1, 0.3)",
  //     },
  //     "-=1"
  //   );

  // function getMenuAnimation() {
  //   tlMenuTransition.play();
  // }

  // function menuTransitionRun() {
  //   if (window.matchMedia("(max-width: 568px)").matches) {
  //     gsap.to(menuNavDoodle, {
  //       transform: `translate3d(0, 0, 2px) scale(1)`,
  //     });
  //     gsap.from(
  //       ".menu-btn-close",
  //       {
  //         y: -100,
  //         opacity: 0,
  //         ease: "back.out(1.7)",
  //         duration: 0.6,
  //       },
  //       "+=1"
  //     );
  //   } else {
  //     gsap.to(menuNavDoodle, {
  //       transform: `translate3d(-16vw, 5vw, 10px) scale(1)`,
  //     });
  //     gsap.from(
  //       ".menu-btn-close",
  //       {
  //         x: -100,
  //         opacity: 0,
  //         ease: "back.out(1.7)",
  //         duration: 0.6,
  //       },
  //       "+=1.5"
  //     );
  //   }

  //   setTimeout(() => {
  //     tlMenuTransition.timeScale(0.8).play();
  //     isOpen = true;
  //   }, 100);
  // }

  // function menuTransitionStop() {
  //   const closeMenu = gsap.to(menuPage, {
  //     height: 0,
  //     ease: "power4.out",
  //     duration: 0.8,
  //     paused: true,
  //   });

  //   isOpen = false;

  //   if (!isOpen) {
  //     //isOpen == false
  //     closeMenu.play();
  //   }

  //   tlMenuTransition.pause(0).reversed(true);

  //   gsap.to(".menu-btn-close", {
  //     x: -100,
  //     y: -100,
  //     clearProps: "x, y",
  //   });

  //   btnBig.setAttribute("aria-selected", true);
  //   btnSmall.setAttribute("aria-selected", false);
  // }

  // getMenuAnimation();

  // btnBig.addEventListener("click", menuTransitionRun);
  // btnBig.addEventListener("click", getMenuAnimation);
  // menuBtnClose.addEventListener("click", menuTransitionStop);
  // menuPage.addEventListener("click", menuTransitionStop);
  // gsap.to('.st19', {
  //   repeat: -1,
  //   duration: 2,
  //   yoyo: true,
  //   x: 5,
  //   ease: 'none',
  // });

  // //ANCHOR Next page animation
  // const cornerBtn = document.getElementById('corner-link');
  // cornerBtn.addEventListener('click', e => {
  //   // e.preventDefault();
  //   document.getElementById('wrapper').classList.add('flip');

  //   // window.setTimeout(() => {
  //   //   window.location.href = 'about.html';
  //   // }, 250);
  // });

  //ANCHOR Color game
  function colorGame() {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    const colorBtns = document.querySelectorAll(".color-game__item");
    const glassesElements = photo.querySelectorAll('[class*="glasses-el"]');
    const pullover = photo.querySelectorAll(".pullover");
    const beard = photo.querySelectorAll(".beard");

    colorBtns.forEach((btn) => {
      btn.addEventListener("click", changeColor);
    });

    colorBtns.forEach((btn) => {
      btn.addEventListener("keydown", (e) => {
        const KEYDOWN_SPACE = 32;
        const KEYDOWN_ENTER = 13;
        if (e.keyCode === KEYDOWN_SPACE || e.keyCode === KEYDOWN_ENTER) {
          changeColor(e);
        }
      });
    });

    function getRandomNumber() {
      return Math.floor(Math.random() * hex.length);
    }

    function changeColor(e) {
      let hexColor = "#";
      const HEX_COLOR_LENGTH = 6;
      for (let i = 0; i < HEX_COLOR_LENGTH; i++) {
        hexColor += hex[getRandomNumber()];
      }

      const attr = e.target.getAttribute("data-name");
      if (attr === "glasses") {
        glassesElements.forEach(
          (glassesEl) => (glassesEl.style.fill = hexColor)
        );
      } else if (attr === "pullover") {
        pullover.forEach((el) => (el.style.fill = hexColor));
      } else if (attr === "beard") {
        beard.forEach((el) => (el.style.fill = hexColor));
      } else if (attr === "grayscale") {
        document.querySelector(".page").classList.toggle("grayscale");
      }
    }
  }

  colorGame();

  // gsap.to(".glare", {
  //   opacity: 0,
  //   repeat: -1,
  //   duration: 2,
  //   yoyo: true,
  // });
}

// export { colorGame };
// colorGame();
// const timelineColorGame = gsap.timeline().to('.color-game__item', {
//   x: Math.floor(Math.random() * 6),
//   y: Math.floor(Math.random() * 6),
//   repeat: -1,
//   ease: 'power1.out',
//   yoyo: true,
// });

//Logo
// const logo = document.querySelector('.logo');
// const logoElements = document.querySelectorAll('.logo path, .logo rect');
// const x = Math.floor(Math.random() * 15);

// const tlLogo = gsap.timeline();
// tlLogo.to(logoElements, {
//   x: 4,
//   duration: 0.5,
//   ease: 'bounce.out',

//   stagger: { each: 0.03, from: 'random' },
//   // paused: true,
// });

// function getLogoAnim() {
//   tlLogo.play();
// }

// function stopLogoAnim() {
//   tlLogo.reverse();
// }

// logo.addEventListener('mouseenter', getLogoAnim);
// logo.addEventListener('mouseleave', stopLogoAnim);

// barba.hooks.beforeEnter(({ current, next }) => {
//   var beforeEnterPromiseAll = new Promise(function (resolve) {
//     // killOldScrollTriggers();
//     // destroySmoothScrollbar();

//     resolve();
//   });

//   return beforeEnterPromiseAll;
// });

// barba.hooks.enter(({ current, next }) => {
//   var enterPromiseAll = new Promise(function (resolve) {
//     current.container.remove();

//     resolve();
//   });

//   return enterPromiseAll;
// });

// barba.hooks.afterEnter(({ current, next }) => {
//   var afterEnterPromiseAll = new Promise(function (resolve) {
//     // initSmoothScrollbar();
//     // initScrollTriggers();
//     // const cursor = new Cursor(document.querySelector('.cursor'));
//     // getPageAnimation();
//     // initJS();
//     resolve();
//   });

//   return afterEnterPromiseAll;
// });
// barba.init({
//   debug: true,
// });

function doodlePositionResize() {
  const photo = document.querySelector(".photo");
  const doodle = document.querySelector(".doodle");

  doodle.style.transform = `translate(${
    window.innerWidth -
    doodle.offsetWidth -
    photo.offsetWidth * 0.8 +
    +window.getComputedStyle(photo, null).transform.match(/(-?[0-9\.]+)/g)[4]
  }px, ${
    window.innerHeight -
    (photo.offsetHeight -
      photo.offsetHeight * 0.25 -
      +window.getComputedStyle(photo, null).transform.match(/(-?[0-9\.]+)/g)[5])
  }px)`;
}

window.addEventListener("DOMContentLoaded", addCustomCursor);

// imagesLoaded(
//   document.querySelector('.page'),
//   { background: true },
//   function (instance) {
//     console.log('all images are loaded');
//     console.log('page background image loaded');
//   }
// );

//ANCHOR Preloader
// gsap.registerPlugin(CSSRulePlugin);

// const rule = CSSRulePlugin.getRule('.loading:after');
// gsap.to(rule, {
//   duration: 1,
//   cssRule: {
//     opacity: 1,
//   },
//   repeat: -1,
//   yoyo: true,
//   ease: 'power4.out',
// });

const preloadImages = (selector = "svg") => {
  return new Promise((resolve) => {
    imagesLoaded(document.querySelectorAll(selector), resolve);
  });
};

preloadImages().then(() => {
  document.body.classList.remove("loading");
});

// const whatNext = (yourOpinionOfMe) => {
//   if (yourOpinionOfMe === "good") {
//     console.log("please email me at adam.kuhn20@gmail.com");
//   } else {
//     console.log(`thank you for taking the time to review my credentials. And I’d
//   appreciate any feedback you may have for me.`);
//   }
// };

export { homeInit, buttonFunctionality, doodlePositionResize };
