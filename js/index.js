"use strict";
import { gsapEase } from "./utils";
import { MagnetLogo } from "./cursor";
// import FontFaceObserver from "./../node_modules/fontfaceobserver/fontfaceobserver";

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

  btnBig.addEventListener("click", () => {
    btnBig.setAttribute("aria-expanded", false);
    btnSmall.setAttribute("aria-expanded", true);

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

  btnSmall.addEventListener("click", () => {
    btnSmall.setAttribute("aria-expanded", false);
    btnBig.setAttribute("aria-expanded", true);

    menuTransitionStop();
  });

  //ANCHOR Animations
  //Letters animation
  btnBig.addEventListener("mouseenter", animateTextHoverRun);
  btnBig.addEventListener("focus", animateTextHoverRun);
  btnBig.addEventListener("mouseleave", animateTextHoverStop);
  btnBig.addEventListener("focusout", animateTextHoverStop);

  checkMediaQuery();

  const timelineLetters = gsap.timeline({
    paused: true,
  });

  timelineLetters.to(".text-cls-1", {
    x: -10,
    duration: 0.2,
    ease: gsapEase.back_1_7,
    stagger: 0.05,
    opacity: 1,
  });

  function animateTextHoverRun() {
    return timelineLetters.play();
  }

  function animateTextHoverStop() {
    return timelineLetters.reverse();
  }

  //Menu animation
  //Menu transition
  const tlMenuTransition = gsap.timeline({
    paused: true,
  });

  tlMenuTransition
    .to(menuPage, {
      y: 0,
      ease: gsapEase.bounce_out,
    })
    .from(
      menuDoodle,
      {
        y: -600,
        ease: gsapEase.bounce_out,
        opacity: 0,
        duration: 0.4,
        stagger: { each: 0.002, from: "random" },
      },
      "<0.1"
    )
    .to(
      ".menu__box img",
      {
        autoAlpha: 1,
        scale: 1,
        ease: gsapEase.elastic03,
        duration: 1,
      },
      "<0.1"
    )
    .from(
      menuNavDoodle,
      {
        opacity: 0,
        ease: gsapEase.elastic03,
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
        stagger: 0.15,
        ease: gsapEase.back_1_7,
      },
      "<0.6"
    )
    .from(
      ".menu__star",
      {
        opacity: 0,
        scale: 0,
        stagger: 0.1,
        ease: gsapEase.elastic03,
      },
      "<0.5"
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
        transform: `translate3d(0, 0, 1px) scale(1)`,
      });
      gsap.from(menuBtnClose, {
        y: -100,
        opacity: 0,
        duration: 0.6,
        delay: 2.8,
        ease: gsapEase.back_1_7,
      });
    } else {
      gsap.to(menuNavDoodle, {
        transform: `translate3d(-16vw, 5vw, 10px) scale(1)`,
      });
      gsap.from(menuBtnClose, {
        x: -100,
        opacity: 0,
        duration: 0.6,
        delay: 2.8,
        ease: gsapEase.back_1_7,
      });
    }

    setTimeout(() => {
      tlMenuTransition.timeScale(0.8).play(0);
      isOpen = true;
    }, 100);
  }

  function menuTransitionStop(e) {
    const closeMenu = gsap.to(menuPage, {
      yPercent: -100,
      ease: gsapEase.power4,
      duration: 0.8,
      paused: true,
      clearProps: "transform",
    });

    isOpen = false;

    if (e.target.getAttribute("href")) {
      closeMenu.pause();
      e.target.classList.add("inactive-cursor");
    } else {
      closeMenu.play(0);
    }

    btnBig.setAttribute("aria-expanded", true);
    btnSmall.setAttribute("aria-expanded", false);

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
  const btnBig = document.querySelector(".btn-big");

  //ANCHOR Fonts
  // let font = new FontFaceObserver("d_CCMonologous", {
  //   weight: 700,
  // });

  // font
  //   .load()
  //   .then(function () {
  //     console.log("Font has loaded.");
  //   })
  //   .catch(function () {
  //     console.log("Font failed to load.");
  //   });

  //ANCHOR Glasses animation
  const timelineGlasses = gsap.timeline();

  timelineGlasses
    .fromTo(
      ".glass",
      {
        x: -25,
        y: 8.5,
        opacity: 0.8,
      },
      {
        x: 55,
        y: -25,
        duration: 0.5,
        repeatDelay: 6,
        ease: "none",
        repeat: -1,
      }
    )
    .to(
      ".glass rect",
      {
        keyframes: [
          { height: 80 },
          { height: 22, x: -336, y: 160, opacity: 0.8 },
        ],
        duration: 0.5,
        ease: "none",
        repeat: -1,
        repeatDelay: 6,
      },
      "<0"
    );

  //ANCHOR Doodle
  const doodle = document.querySelector(".doodle");
  const doodleMobile = document.querySelector(".doodle-mobile");

  //ANCHOR Photo
  const photo = document.querySelector(".photo");
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
      (photo.offsetHeight - photo.offsetHeight * 0.3 + -photoTransformY)
    }px)`;
  }

  //ANCHOR Page animations
  const logo = document.querySelector(".logo");
  const helloDots = document.querySelectorAll(
    '.hello-dots path:not([data-item="hello-doodle"])'
  );
  const helloDoodle = document.querySelectorAll('[data-item="hello-doodle"]');
  const dots = document.querySelectorAll('[data-name="pre-photo"] .cls-1');
  const colorGameItem = document.querySelectorAll(".color-game__item");

  const timelinePageAnimation = gsap.timeline({
    duration: 1,
    rotation: 0.05,
    paused: true,
  });

  timelinePageAnimation
    .from(photo, {
      xPercent: 200,
      transformOrigin: "center",
      rotation: 50,
      delay: 0.4,
      duration: 1.2,
      ease: gsapEase.elastic05_04,
      clearProps: "transform",
      onComplete: () => {
        return doodlePositionStart();
      },
    })
    .from(
      dots,
      {
        opacity: 0,
        scale: 0,
        stagger: {
          each: 0.002,
          from: 15,
        },
        duration: 0.6,
        ease: gsapEase.elastic05,
      },
      "<0.5"
    )
    .from(
      helloDots,
      {
        y: -500,
        ease: gsapEase.bounce_out,
        opacity: 0,
        stagger: { each: 0.003, from: "random" },
      },
      "<0"
    )
    .from(
      helloDoodle,
      {
        y: -300,
        ease: gsapEase.bounce_out,
        opacity: 0,
        stagger: 0.03,
      },
      "<0.6"
    )
    .to(
      [doodle, doodleMobile],
      {
        opacity: 1,
        ease: gsapEase.back_1_7,
      },
      "<0.5"
    )
    .from(".doodle .doodle__text tspan", {
      text: {
        value: "",
      },
      duration: 0.6,
      ease: "none",
      stagger: {
        each: 0.6,
      },
    })
    .from(
      ".doodle-mobile .doodle__text tspan",
      {
        text: {
          value: "",
        },
        duration: 0.6,
        ease: "none",
        stagger: {
          each: 0.6,
        },
      },
      "<0"
    )
    .from(
      btnBig,
      {
        transform: "translate3d(0, 0, 1px) scale(0)",
        opacity: 0,
        ease: gsapEase.bounce_ease_out,
        delay: 1,
        duration: 1,
      },
      "<1.5"
    )
    .from(
      logo,
      {
        transform: "translate3d(0, 0, 1px) scale(0)",
        opacity: 0,
        ease: gsapEase.bounce_ease_out,
        duration: 1,
        onComplete: () => {
          const magnetLogo = new MagnetLogo(logo);
          return magnetLogo;
        },
      },
      "<0"
    )
    .from(
      colorGameItem,
      {
        xPercent: -100,
        autoAlpha: 0,
        stagger: {
          each: 0.2,
        },
        duration: 1,
        ease: gsapEase.back,
        onComplete: () => {
          return colorGame();
        },
      },
      "<0.5"
    );

  timelinePageAnimation.play();

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
}

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
      photo.offsetHeight * 0.3 -
      +window.getComputedStyle(photo, null).transform.match(/(-?[0-9\.]+)/g)[5])
  }px)`;
}

export { homeInit, buttonFunctionality, doodlePositionResize };
