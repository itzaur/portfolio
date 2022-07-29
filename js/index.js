"use strict";
import "../scss/main.scss";
// import FDF from "../img/tlqmz5qzwoexbzbhkbvf.jpg";
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

  btnSmall.addEventListener("click", (e) => {
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
      height: "calc(100vh - var(--padding-container) * 2 + 1px)",
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

  // setTimeout(animateLetters1, 5500);
  // setTimeout(animateLetters2, 6200);
  // setTimeout(animateLetters3, 7200);
  // setTimeout(animateLetters4, 8500);

  //ANCHOR Photo
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

  doodlePositionStart();

  //ANCHOR Page animations
  const helloDots = document.querySelectorAll(
    '.hello-dots path:not([data-item="hello-doodle"])'
  );
  const helloDoodle = document.querySelectorAll('[data-item="hello-doodle"]');
  const dots = document.querySelectorAll('[data-name="pre-photo"] .cls-1');

  const tlPage = gsap.timeline({ duration: 1, rotation: 0.05, paused: true });

  // function getPageAnimation() {}
  tlPage
    .fromTo(
      ".photo",
      {
        x: 2400,
        transformOrigin: "top top",
        rotation: "50deg",
      },
      {
        x: photoTransformX,
        rotation: "0deg",
        ease: "elastic.out(0.5, 0.4)",
        clearProps: "transform",
        delay: 0.2,
        duration: 1.2,
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
        y: -500,
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
        onComplete: () => {
          setTimeout(animateLetters1, 500);
          setTimeout(animateLetters2, 1200);
          setTimeout(animateLetters3, 2200);
          setTimeout(animateLetters4, 3500);
        },
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
        duration: 1,
      },
      "<3.8"
    )
    .from(
      ".logo",
      {
        transform: "translate3d(0, 0, 1px) scale(0)",
        opacity: 0,
        ease: "Bounce.easeOut",
        duration: 1,
        onComplete: () => {
          const magnetLogo = new MagnetLogo(document.querySelector(".logo"));
        },
      },
      "<0"
    )
    .from(".color-game__item", {
      x: "-100%",
      autoAlpha: 0,
      stagger: {
        each: 0.2,
      },
      duration: 1,
      ease: "back.out(1.7)",
    });

  tlPage.play();

  // getPageAnimation();
  window.addEventListener("DOMContentLoaded", () => {
    tlPage.play();
  });

  // const nextPageLink = document.querySelectorAll("#corner-link");
  // nextPageLink.forEach((link) => {
  //   link.addEventListener("click", () => {
  //     tlPage.kill();
  //   });
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
      photo.offsetHeight * 0.25 -
      +window.getComputedStyle(photo, null).transform.match(/(-?[0-9\.]+)/g)[5])
  }px)`;
}

//ANCHOR Preloader
const preloadImages = (selector = "svg") => {
  return new Promise((resolve) => {
    // const cornerBox = document.querySelector("#wrapper__corner-box");
    // gsap.set(cornerBox, {
    //   scale: 170,
    // });
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

preloadImages().then(() => {
  document.body.classList.remove("loading");
  // const cornerBox = document.querySelector("#wrapper__corner-box");
  // gsap.to(cornerBox, {
  //   scale: 1,
  //   duration: 2,
  // });
});

export { homeInit, buttonFunctionality, doodlePositionResize };
