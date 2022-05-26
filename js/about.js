"use strict";
import { Cursor } from "./export";
import { MagnetLogo, addCustomCursor, buttonFunctionality } from "./export";

CustomEase.create("cubic2", "0.93, 0.02, 0.56, 0.95");
// CustomEase.create(
//   "backToBack",
//   "M0,0 C0.128,0.572 0.052,1.374 0.15,1.374 0.28,1.374 0.226,0.528 0.358,0.528 0.466,0.528 0.442,1.164 0.552,1.164 0.694,1.164 0.62,0.764 0.736,0.764 0.788,0.764 0.798,1.044 0.856,1.044 0.88,1.044 0.924,0.948 0.94,0.948 0.961,0.948 0.993,1 1,1"
// );
// gsap.registerPlugin(TextPlugin);

const gsapEase = {
  power1: "power1.out",
  power4: "power4.out",
  back: "back.out",
  elastic02: "elastic.out(1, 0.2)",
  elastic03: "elastic.out(1, 0.3)",
  elastic05: "elastic.out(1, 0.5)",
  elastic05_04: "elastic.out(0.5, 0.4)",
};

function pageSkillsInit() {
  gsap.registerPlugin(TextPlugin);
  const hobbiesItems = document.querySelectorAll(".hobbie");

  const btnBig = document.querySelector(".btn-big");
  const btnSmall = document.querySelector(".btn-small");

  hobbiesItems.forEach((hobbie) => {
    hobbie.addEventListener("click", addClass);
  });

  function addClass(e) {
    e.stopPropagation();
    removeActiveClass();
    const target = e.currentTarget;
    target.classList.add("active");
  }

  function removeActiveClass() {
    const activEl = document.querySelector(".active");
    if (activEl) {
      activEl.classList.remove("active");
    }
  }

  const skillsBtn = document.querySelectorAll(".skills__btn");
  const skillsBtnContainer = document.querySelector(".skills__btns");
  const skillsLevel = document.querySelectorAll(".skills-level");
  const skillsTimeline = gsap.timeline({ duration: 1 });

  function getSkillsAnim() {
    CustomEase.create("cubic", "0.175, 0.885, 0.32, 1.275");

    skillsTimeline
      .from(".starSkill", {
        //   x: -10,
        opacity: 0,
        scale: 0,
        ease: gsapEase.elastic03,
        duration: 1.2,
        clearProps: "all",
      })
      .fromTo(
        ".point span",
        {
          // x: -60,
          opacity: 0,
          scale: 0,
        },
        {
          // x: 0,
          opacity: 1,
          scale: 1,
          ease: "cubic",
          clearProps: "all",
          duration: 0.2,
        },
        "<0.3"
      );
  }

  skillsBtnContainer.addEventListener("click", (e) => {
    const clicked = e.target.closest(".skills__btn");
    const selectSkillsLevel = document.querySelector(
      `.skills-level--${clicked.dataset.tab}`
    );

    if (!clicked) return;

    skillsBtn.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-expanded", false);
      skillsLevel.forEach((skill) => {
        skill.setAttribute("aria-hidden", true);
      });
    });

    clicked.classList.add("active");
    clicked.setAttribute("aria-expanded", true);
    selectSkillsLevel.setAttribute("aria-hidden", false);

    getSkillsAnim();

    //Skills btns animation
    if (clicked.getAttribute("aria-expanded") === "true") {
      gsap.fromTo(
        clicked,
        {
          scale: 0,
        },
        {
          scale: 1,
          ease: gsapEase.elastic05,
          clearProps: "transform",
        }
      );
    }
  });

  function addHobbiesParallax() {
    const gymItem = document.querySelector(".hobbie--1");
    const gymDots = gymItem.querySelector(".hobbie__img:nth-child(2) img");
    const gymElements = gymItem.querySelector(".hobbie__img:nth-child(3) img");

    gymItem.addEventListener("mousemove", addParallax);
    gymItem.addEventListener("mouseout", removeParallax);
    function addParallax(e) {
      const x = e.pageX;
      const y = e.pageY;
      const coords = gymElements.getBoundingClientRect();
      const gymX = coords.left + gymElements.offsetWidth / 2;
      const gymY = coords.top + gymElements.offsetHeight / 2;
      const gymAngleX = (gymY - y) / 25;
      const gymAngleY = (gymX - x) / -25;

      if (gymItem.classList.contains("active")) {
        gymDots.style.transform = `translateX(${-gymAngleY}px) translateY(${-gymAngleX}px)`;
        gymDots.style.transition = `none`;

        gymElements.style.transform = `translateX(${gymAngleY}px) translateY(${gymAngleX}px)`;
        gymElements.style.transition = `none`;
      }
    }

    function removeParallax() {
      gymDots.style.transform = `translate3d(0px, 0px, 1px)`;
      gymDots.style.transition = `1s cubic-bezier(0.445, 0.05, 0.55, 0.95)`;

      gymElements.style.transform = `translate3d(0px, 0px, 1px)`;
      gymElements.style.transition = `1s cubic-bezier(0.445, 0.05, 0.55, 0.95)`;
    }

    const cassetteItem = document.querySelector(".hobbie--2");
    const cassette = cassetteItem.querySelector(".hobbie__img:first-child img");
    const cassetteDots = cassetteItem.querySelector(
      ".hobbie__img:nth-child(2) img"
    );
    const cassetteElements = cassetteItem.querySelector(
      ".hobbie__img:nth-child(3) img"
    );

    cassetteItem.addEventListener("mousemove", (e) => {
      let state = {
        mouseX: 0,
        mouseY: 0,
        height: cassetteItem.clientHeight,
        width: cassetteItem.clientWidth,
      };
      const x = e.pageX;
      const y = e.pageY;

      state.mouseX = x - cassetteItem.offsetLeft - state.width / 2;
      state.mouseY = y - cassetteItem.offsetTop - state.height / 2;
      const angleX = (state.mouseX / state.width) * -40;
      const angleY = (state.mouseY / state.height) * -40;
      const posX = (state.mouseX / state.width) * -40;
      const posY = (state.mouseY / state.height) * -40;

      if (cassetteItem.classList.contains("active")) {
        cassette.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
        cassette.style.transition = `none`;

        cassetteDots.style.transform = `rotateX(${angleY}deg) rotateY(${angleX}deg) translate(-50%, -50%)`;
        cassetteDots.style.transition = `none`;

        cassetteElements.style.transform = `translateX(${-posX}px) translateY(${-posY}px)`;
        cassetteElements.style.transition = `none`;
      }
    });

    cassetteItem.addEventListener("mouseout", () => {
      // cassette.style.transform = `rotateY(0deg) rotateX(0deg) `;
      // cassette.style.transform = `translateX(0px) translateY(0px)`;
      cassette.style.transform = `translate3d(0px, 0px, 1px)`;
      cassette.style.transition = `transform 1s cubic-bezier(0.445, 0.05, 0.55, 0.95)`;

      cassetteDots.style.transform = `rotateX(0deg) rotateY(0deg) translate3d(-50%, -50%, 1px)`;
      cassetteDots.style.transition = `transform 1s cubic-bezier(0.445, 0.05, 0.55, 0.95)`;

      // cassetteElements.style.transform = `rotateY(0deg) rotateX(0deg) `;
      cassetteElements.style.transform = `translate3d(0px, 0px, 1px)`;
      // cassetteElements.style.transform = `translateX(0px) translateY(0px)`;
      cassetteElements.style.transition = `transform 1s cubic-bezier(0.445, 0.05, 0.55, 0.95)`;
    });
  }
  addHobbiesParallax();

  //Eye move
  const catItem = document.querySelector(".hobbie--3");
  const cat = document.getElementById("cat");
  const eyeLeftPupil = cat.querySelector(".eye-left-pupil");
  const eyeRightPupil = cat.querySelector(".eye-right-pupil");

  const eyeLeft = cat.querySelector(".eye-left");
  const eyeLeftHighlight = cat.querySelector(".eye-left-highlight");
  const eyeRightHighlight = cat.querySelector(".eye-right-highlight");

  const eyeWidth = eyeLeft.getBoundingClientRect().width;
  const eyeHeight = eyeLeft.getBoundingClientRect().height;

  const pupilWidth = eyeLeftPupil.getBoundingClientRect().width;
  const pupilHeight = eyeLeftPupil.getBoundingClientRect().height;
  const xMove = (eyeWidth - pupilWidth) / 2;
  const yMove = (eyeHeight - pupilHeight) / 2;

  const eyeCoordsX = -698;
  const eyeCoordsY = -340.1;

  gsap.set(eyeLeftPupil, {
    x: eyeCoordsX,
    y: eyeCoordsY,
  });

  catItem.addEventListener("mousemove", moveEyes);
  function moveEyes(e) {
    const mouseXPercent = e.clientX / catItem.clientWidth;
    const mouseYPercent = e.clientY / catItem.clientHeight;
    const posX = ((mouseXPercent * 2 - 1) * xMove) / 0.8;
    const posY = ((mouseYPercent * 2 - 1) * yMove) / 0.8;

    if (catItem.classList.contains("active")) {
      eyeLeftPupil.style.transform = `translate3d(${eyeCoordsX + posX}px, ${
        eyeCoordsY + posY + 2
      }px, 1px)`;
      eyeRightPupil.style.transform = `translate3d(${eyeCoordsX + posX}px, ${
        eyeCoordsY + posY + 2
      }px, 1px)`;

      eyeLeftHighlight.style.transform = `translate3d(${
        eyeCoordsX + posX + 2
      }px, ${eyeCoordsY + posY + 2}px, 1px)`;
      eyeRightHighlight.style.transform = `translate3d(${
        eyeCoordsX + posX + 4
      }px, ${eyeCoordsY + posY}px, 1px)`;
    }
  }

  const hobbiesTimeline = gsap.timeline();

  hobbiesTimeline
    .set(".hobbie--1", {
      xPercent: -100,
      // opacity: 0,

      // autoAlpha: 0,
    })
    .set(".hobbie--2", {
      yPercent: -100,
      // autoAlpha: 0,
    })
    .set(".hobbie--3", {
      xPercent: 100,
      // autoAlpha: 0,
    })
    .set(".skills", {
      yPercent: 100,
      autoAlpha: 0,
    })
    .to(".hobbie--1", {
      xPercent: 0,
      // opacity: 1,
      // autoAlpha: 1,
      duration: 2,
      ease: gsapEase.power4,
      clearProps: "transform",
    })
    .to(
      ".hobbie--2",
      {
        yPercent: 0,
        // autoAlpha: 1,

        duration: 2.5,
        ease: gsapEase.power4,
        clearProps: "all",
      },
      "<0"
    )
    .to(
      ".hobbie--3",
      {
        xPercent: 0,
        // autoAlpha: 1,

        duration: 2.5,
        ease: gsapEase.power4,
        clearProps: "all",
      },
      "<0"
    )
    .to(
      ".skills",
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 2,
        ease: gsapEase.power4,
        clearProps: "all",
      },
      "<0"
    )
    .from(
      ".top-nav--hobbies",
      {
        yPercent: -130,
        autoAlpha: 1,
        duration: 0.8,
        ease: gsapEase.back,
      },
      "<1.5"
    )
    .from(
      ".top-nav--skills",
      {
        xPercent: 100,
        autoAlpha: 1,
        duration: 0.8,
        ease: gsapEase.back,
      },
      "<0"
    )
    .from(btnBig, {
      transform: "translate3d(0, 0, 1px) scale(0)",
      opacity: 0,
      ease: "Bounce.easeOut",
      duration: 1,
      clearProps: "transform",
    });
}

// let resultX;
// let id = null;

// let isPlaying = false;
// gsap.registerPlugin(TextPlugin);

// //ANCHOR Button
// const btnBig = document.querySelector(".btn-big");
// const btnSmall = document.querySelector(".btn-small");

// const menuNavDoodle = document.querySelector(".menu__img img");

// function checkMediaQuery() {
//   if (window.matchMedia("(max-width: 568px)").matches) {
//     menuNavDoodle.style.transform = `translate3d(0, 0, 1px) scale(1)`;
//   } else {
//     menuNavDoodle.style.transform = `translate3d(-16vw, 5vw, 1px) scale(1)`;
//   }
// }

// checkMediaQuery();

function aboutAnimationInit() {
  // buttonFunctionality();

  const btnBig = document.querySelector(".btn-big");
  const btnSmall = document.querySelector(".btn-small");
  // const menuNavDoodle = document.querySelector(".menu__img img");

  gsap.registerPlugin(TextPlugin);
  //Slider mobile
  const storySlides = document.querySelectorAll(".story");
  const slidesBox = document.querySelector(".story__box");
  const slides = slidesBox.querySelectorAll(".story__photo");
  const tabList = slidesBox.querySelector("[role='tablist']");
  // const aboutBtns = tabList.querySelectorAll("[role='tab']");
  const btnAboutSection = document.querySelector(".top-nav--about");
  const dotsBox = document.querySelector(".dots-box");
  const dots = dotsBox.querySelectorAll("[role='tab']");
  const KEYDOWN_LEFT = 37;
  const KEYDOWN_RIGHT = 39;

  tabList.addEventListener("keydown", (e) => {
    if (e.keyCode === KEYDOWN_RIGHT) {
      nextSlide();
    } else if (e.keyCode === KEYDOWN_LEFT) {
      prevSlide();
    }

    runBtnSliderAnimation();
  });

  let currentSlide = 0;
  function mobileGoToSlide(s) {
    slides.forEach((slide) => {
      const gap = 20;
      slide.style.transform = `translate(calc(${100 * -s}% - ${
        s * gap
      }rem), 0)`;
    });

    runBtnSliderAnimation();
  }

  function nextSlide() {
    currentSlide === slides.length - 1 ? (currentSlide = 0) : currentSlide++;
    mobileGoToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide === 0 ? (currentSlide = slides.length - 1) : currentSlide--;
    mobileGoToSlide(currentSlide);
  }

  //Slider desktop
  dotsBox.addEventListener("keydown", (e) => {
    if (e.keyCode === KEYDOWN_RIGHT) {
      desktopNextSlide();
    } else if (e.keyCode === KEYDOWN_LEFT) {
      desktopPrevSlide();
    }

    runBtnSliderAnimation();
  });

  dotsBox.addEventListener("click", (e) => {
    const dotClicked = e.target.getAttribute("aria-selected");

    if (!dotClicked) return;

    dots.forEach((dot) => {
      dot.classList.remove("active");
      dot.setAttribute("aria-selected", false);
      dot.style.transition = `transform 0.8s ease-in-out`;
    });

    e.target.classList.add("active");
    e.target.setAttribute("aria-selected", true);

    if (e.target.dataset.slide === "0") {
      desktopPrevSlide();
    } else if (e.target.dataset.slide === "1") {
      desktopNextSlide();
    }
  });

  storySlides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * i}%)`;
    i === 0 ? (s.style.opacity = "1") : (s.style.opacity = "0");
  });

  function desktopGoToSlide(s) {
    storySlides.forEach((el, i) => {
      el.style.transform = `translateX(${100 * (i - s)}%)`;
      el.style.opacity = "1";
    });

    runBtnSliderAnimation();
  }

  function runBtnSliderAnimation() {
    storySlides.forEach((slide) => {
      let resultX;
      const aboutBtn2 = document.querySelector(".story--2 button");

      function getSlideCoordX() {
        const result = window.innerWidth - btnAboutSection.offsetWidth;
        resultX = +window
          .getComputedStyle(slide, null)
          .transform.match(/(-?[0-9\.]+)/g)[4];

        if (resultX > 0 && resultX < result) {
          btnAboutSection.style.opacity = "0";
          btnAboutSection.style.visibility = "hidden";

          aboutBtn2.style.opacity = "1";
          aboutBtn2.style.visibility = "visible";
          aboutBtn2.style.zIndex = "6";

          // isPlaying = false;
        } else if (resultX < 0 && resultX > -btnAboutSection.offsetWidth) {
          btnAboutSection.style.opacity = "1";
          btnAboutSection.style.visibility = "visible";
        }

        if (resultX < 0 || (resultX > 0 && resultX < window.innerWidth)) {
          requestAnimationFrame(getSlideCoordX);
          // isPlaying === true;
        }

        //Menu button animation
        if (resultX > 0 && resultX < btnBig.offsetWidth * 2) {
          btnBig.style.opacity = "0";
          btnBig.style.transition = "none";
        } else if (
          resultX < -btnBig.offsetWidth * 2 &&
          resultX > -window.innerWidth + btnBig.offsetWidth * 2
        ) {
          btnBig.style.opacity = "1";
          btnBig.style.transition = "opacity 0.2s linear";
        }
      }

      getSlideCoordX();
    });
  }

  function desktopNextSlide() {
    currentSlide === storySlides.length - 1
      ? (currentSlide = 1)
      : currentSlide++;

    desktopGoToSlide(currentSlide);
    activeDot(currentSlide);
    // storySlides[currentSlide].classList.add("visible");
    // storySlides[currentSlide - 1].classList.remove("visible");

    ellipseTimlineDesktop.play();
    ellipseTimlineMobile.play();
  }

  function desktopPrevSlide() {
    currentSlide === 0 ? (currentSlide = 0) : currentSlide--;

    desktopGoToSlide(currentSlide);
    activeDot(currentSlide);

    // storySlides[currentSlide].classList.add("visible");
    // storySlides[currentSlide + 1].classList.remove("visible");

    ellipseTimlineDesktop.pause();
    ellipseTimlineMobile.pause();
  }

  function activeDot(slide) {
    dots.forEach((dot) => {
      dot.classList.remove("active");
      document
        .querySelector(`.about-dot[data-slide="${slide}"]`)
        .classList.add("active");
      // dot.style.transition = `transform 0.3s ease-in-out`;
    });
  }

  function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
    let mql = window.matchMedia(mediaQuery);
    mql.addListener(function (e) {
      return layoutChangedCallback(e.matches);
    });
    layoutChangedCallback(mql.matches);
  }

  //ANCHOR About-page (part1) doodle text animation
  const aboutTimeline = gsap.timeline();
  aboutTimeline
    .from(btnAboutSection, {
      right: btnAboutSection.offsetWidth * -1,
      left: "inherit",
      duration: 0.5,
      ease: gsapEase.back,
      delay: 1,
      clearProps: "all",
    })
    .from(".story__photo--person", {
      xPercent: 100,
      duration: 2,
      ease: gsapEase.elastic03,
      opacity: 0,
      clearProps: "all",
    });

  const aboutTimeline2 = gsap.timeline();
  aboutTimeline2.from(".story__photo--doodle1", {
    scale: 0,
    duration: 1.8,
    ease: gsapEase.elastic02,
    opacity: 0,
    clearProps: "all",
  });

  const aboutTimeline3 = gsap.timeline();
  aboutTimeline3.from(".story__photo--doodle1 text tspan", {
    text: {
      value: "",
    },
    duration: 2,
    ease: "none",
    stagger: {
      each: 2,
    },
  });

  const aboutTimeline4 = gsap.timeline();
  aboutTimeline4.from(".story__photo--doodle2", {
    scale: 0,
    y: -100,
    duration: 1.8,
    ease: gsapEase.elastic02,
    opacity: 0,
    clearProps: "transform",
  });

  const aboutTimeline5 = gsap.timeline();
  aboutTimeline5.from(".story__photo--doodle2 text tspan", {
    text: {
      value: "",
    },
    duration: 2,
    ease: "none",
    stagger: {
      each: 2,
    },
    // onComplete: () => {
    //   aboutTimeline6.play();
    // },
  });

  const aboutTimeline6 = gsap.timeline({ paused: true });
  aboutTimeline6
    .from(".about-dot", {
      y: 200,
      duration: 1,
      stagger: 0.2,
      ease: gsapEase.back,
      opacity: 0,
      clearProps: "all",
      onComplete: () => {
        // activeDot(0);
        activeTabindex();
      },
    })
    .from(btnBig, {
      transform: "translate3d(0, 0, 1px) scale(0)",
      opacity: 0,
      ease: "Bounce.easeOut",
      duration: 1,
      clearProps: "transform",
    });

  // document.querySelector(".btns-box")

  const aboutTimeline7 = gsap.timeline({ paused: true });
  aboutTimeline7
    .from("[data-num='0']", {
      x: -100,
      opacity: 0,
      ease: Back.easeOut.config(1.7),
      clearProps: "transform",
    })
    .from(
      "[data-num='1']",
      {
        x: 100,
        opacity: 0,
        ease: Back.easeOut.config(1.7),
        clearProps: "transform",
        onComplete: () => {
          installMediaQueryWatcher("(max-width: 568px)", function (matches) {
            if (matches) {
              // mobileGoToSlide(0);
              tabList
                .querySelector("[data-num='1']")
                .addEventListener("click", nextSlide);
              tabList
                .querySelector("[data-num='0']")
                .addEventListener("click", prevSlide);

              slides.forEach((slide) => {
                slide.style.transition = `transform 0.3s ease`;
              });
            } else {
              slides.forEach((slide) => {
                slide.style.removeProperty("transform");
              });
            }
          });
        },
      },
      "<0"
    );

  function activeTabindex() {
    document.querySelectorAll(".about-dot").forEach((dot) => {
      dot.setAttribute("tabindex", "0");
    });
  }

  let master;
  const speed = {
    t4: 4,
    t6: 6,
    t10: 10,
  };

  if (window.innerWidth < "568") {
    master = gsap
      .timeline()
      .add(aboutTimeline)
      .add(aboutTimeline2.delay(-1))
      .add(aboutTimeline3.delay(-0.5))
      .add(aboutTimeline7.play())
      .add(aboutTimeline4.timeScale(speed.t4))
      .add(aboutTimeline6.play().delay(-0.5))
      .add(aboutTimeline5);
  } else {
    master = gsap
      .timeline()
      .add(aboutTimeline)
      .add(aboutTimeline2.delay(-1))
      .add(aboutTimeline3.delay(-0.5))
      .add(aboutTimeline4)
      .add(aboutTimeline5)
      .add(aboutTimeline6.play())
      .add(aboutTimeline7.play());
  }

  const ellipseTimlineDesktop = gsap.timeline({ duration: 1, paused: true });
  const ellipseTimlineMobile = gsap.timeline({ duration: 1, paused: true });
  const ellipseTimlineDesktopText = gsap.timeline({
    duration: 1,
    paused: true,
  });

  ellipseTimlineDesktop
    .from(".ellipse1", {
      y: -400,
      opacity: 0,
      ease: gsapEase.power1,
    })
    .from(
      ".ellipse2",
      {
        y: -400,
        opacity: 0,
        ease: gsapEase.power1,
      },
      "<0.3"
    )
    .from(
      ".ellipse3a",
      {
        y: -1.91,
        opacity: 0,
        ease: gsapEase.power1,
      },
      "<0.3"
    )
    .from(
      ".ellipse3b",
      {
        y: -400,
        opacity: 0,
        ease: gsapEase.power1,
      },
      "<0"
    )
    .from(
      ".ellipse4",
      {
        y: -400,
        opacity: 0,
        ease: gsapEase.power1,
      },
      "<0.4"
    )
    .from(
      ".ellipse-text",
      {
        opacity: 0,
        ease: gsapEase.power1,
      },
      "<0.5"
    );

  ellipseTimlineDesktopText.from(".ellipse-text tspan", {
    text: {
      value: "",
    },
    duration: 2,
    delay: -1,
    ease: "none",
    stagger: {
      each: 2,
    },
  });

  ellipseTimlineMobile
    .from(".ellipse-mobile1a", {
      y: -390,
      opacity: 0,
      ease: gsapEase.power1,
    })
    .from(
      ".ellipse-mobile1b",
      {
        y: -410,
        opacity: 0,
        ease: gsapEase.power1,
      },
      "<0"
    )
    .from(
      ".ellipse-mobile2a",
      {
        y: -380,
        opacity: 0,
        ease: gsapEase.power1,
      },
      "<0.3"
    )
    .from(
      ".ellipse-mobile2b",
      {
        y: -410,
        opacity: 0,
        ease: gsapEase.power1,
      },
      "<0"
    )
    .from(
      ".ellipse-mobile3a",
      {
        y: 5.48,
        opacity: 0,
        ease: gsapEase.power1,
      },
      "<0.3"
    )
    .from(
      ".ellipse-mobile3b",
      {
        y: -410,
        opacity: 0,
        ease: gsapEase.power1,
      },
      "<0"
    )
    .from(
      ".ellipse-mobile4",
      {
        y: -410,
        autoAlpha: 0,
        // opacity: 0,
        ease: gsapEase.power1,
        onComplete: () => {
          addDoorAnimationOnResize();
        },
      },
      "<0.4"
    )
    .from(
      ".ellipse-mobile-text",
      {
        opacity: 0,
        ease: gsapEase.power1,
      },
      "<0.5"
    )
    .from(".ellipse-mobile-text tspan", {
      text: {
        value: "",
      },
      duration: 2,
      ease: "none",
      stagger: {
        each: 2,
      },
    });

  ellipseTimlineDesktop.eventCallback("onComplete", function () {
    ellipseTimlineDesktopText.play(0);
  });

  slides.forEach((doodle) => {
    doodle.addEventListener("click", (e) => {
      installMediaQueryWatcher("(max-width: 568px)", function (matches) {
        if (matches) {
          if (e.target.closest(".story__photo--doodle1") === doodle) {
            aboutTimeline3
              .timeScale(speed.t6)
              .eventCallback("onComplete", function () {
                master = gsap
                  .timeline()
                  .remove(aboutTimeline)
                  .remove(aboutTimeline2)
                  .add(aboutTimeline7)
                  .add(aboutTimeline4.timeScale(speed.t6))
                  .add(aboutTimeline6.delay(-0.5))
                  .add(aboutTimeline5);
              });
          } else if (e.target.closest(".story__photo--doodle2") === doodle) {
            aboutTimeline5.timeScale(speed.t6);
          }
        } else {
          if (e.target.closest(".story__photo--doodle1") === doodle) {
            aboutTimeline3
              .timeScale(speed.t6)
              .eventCallback("onComplete", function () {
                master = gsap
                  .timeline()
                  .remove(aboutTimeline)
                  .remove(aboutTimeline2)
                  .add(aboutTimeline4)
                  .add(aboutTimeline5)
                  .add(aboutTimeline6)
                  .add(aboutTimeline7);
              });
          } else if (e.target.closest(".story__photo--doodle2") === doodle) {
            aboutTimeline5
              .timeScale(speed.t6)
              .eventCallback("onComplete", function () {
                master = gsap
                  .timeline()
                  .remove(aboutTimeline)
                  .remove(aboutTimeline2)
                  .remove(aboutTimeline3)
                  .remove(aboutTimeline4)
                  .add(aboutTimeline6)
                  .add(aboutTimeline7);
              });
          }
        }
      });
    });
  });

  document
    .querySelector(".face-doodle-desktop")
    .addEventListener("click", (e) => {
      ellipseTimlineDesktopText.timeScale(speed.t10);
    });

  document
    .querySelector(".face-doodle-mobile")
    .addEventListener("click", (e) => {
      ellipseTimlineMobile.timeScale(speed.t10);
    });

  // //ANCHOR Door animation
  // function addDoorAnimationOnResize() {
  //   const doodle = document.querySelector(".face-doodle-mobile .text-box");
  //   const door = document.querySelector(".story--2__door svg");
  //   const textIT = document.querySelectorAll(".story--2__door svg .it");
  //   const doodleCenterCoordY =
  //     doodle.getBoundingClientRect().top +
  //     doodle.getBoundingClientRect().height / 2;
  //   const doorCenterCoordY =
  //     door.getBoundingClientRect().top +
  //     door.getBoundingClientRect().height / 2;

  //   if (
  //     doodleCenterCoordY > doorCenterCoordY &&
  //     doodleCenterCoordY >
  //       doorCenterCoordY + doodle.getBoundingClientRect().height / 2
  //   ) {
  //     // doodle.style.fill = "white";
  //     doodle.style.opacity = "1";
  //     textIT.forEach((text) => (text.style.fill = "#1d1d1b"));
  //   } else if (
  //     doodleCenterCoordY <
  //     doorCenterCoordY -
  //       doorCenterCoordY * 0.1 -
  //       doodle.getBoundingClientRect().height / 2
  //   ) {
  //     // doodle.style.fill = "white";
  //     doodle.style.opacity = "1";
  //     textIT.forEach((text) => (text.style.fill = "#1d1d1b"));
  //   } else {
  //     // doodle.style.fill = "red";
  //     doodle.style.opacity = "0.8";
  //     doodle.style.transition = "opacity 0.3s linear";
  //     textIT.forEach((text) => (text.style.fill = "#ee7950"));
  //   }
  // }
  // // addDoorAnimationOnResize();

  // // if (!window.location.href.includes("about")) {
  // //   aboutTimeline6.kill();
  // //   // console.log(window.location.href.includes("about"));
  // //   window.removeEventListener("resize", addDoorAnimationOnResize);
  // //   console.log("not about");
  // // }

  // window.addEventListener("resize", addDoorAnimationOnResize);
  window.addEventListener("resize", addDoorAnimationOnResize);
}

//ANCHOR Door animation
function addDoorAnimationOnResize() {
  const doodle = document.querySelector(".face-doodle-mobile .text-box");
  const door = document.querySelector(".story--2__door svg");
  const textIT = document.querySelectorAll(".story--2__door svg .it");
  const doodleCenterCoordY =
    doodle.getBoundingClientRect().top +
    doodle.getBoundingClientRect().height / 2;
  const doorCenterCoordY =
    door.getBoundingClientRect().top + door.getBoundingClientRect().height / 2;

  if (
    doodleCenterCoordY > doorCenterCoordY &&
    doodleCenterCoordY >
      doorCenterCoordY + doodle.getBoundingClientRect().height / 2
  ) {
    // doodle.style.fill = "white";
    doodle.style.opacity = "1";
    textIT.forEach((text) => (text.style.fill = "#1d1d1b"));
  } else if (
    doodleCenterCoordY <
    doorCenterCoordY -
      doorCenterCoordY * 0.1 -
      doodle.getBoundingClientRect().height / 2
  ) {
    // doodle.style.fill = "white";
    doodle.style.opacity = "1";
    textIT.forEach((text) => (text.style.fill = "#1d1d1b"));
  } else {
    // doodle.style.fill = "red";
    doodle.style.opacity = "0.8";
    doodle.style.transition = "opacity 0.3s linear";
    textIT.forEach((text) => (text.style.fill = "#ee7950"));
  }
}

function contactPageInit() {
  const coffee = document.querySelector(".coffee");
  const flower = document.querySelector(".flower");
  const laptop = document.querySelector(".contact__laptop");
  const laptopDots = document.querySelector(".contact-dots");
  const laptopElements = document.querySelectorAll(".laptop-element");

  const contactPageAnimationRun = gsap.timeline();
  contactPageAnimationRun
    .from(
      ".top-nav--contact",
      {
        x: 600,
        autoAlpha: 0,
        duration: 1,
        ease: gsapEase.back,
      },
      "<0.6"
    )
    .from(laptop, {
      yPercent: 100,
      ease: gsapEase.elastic05_04,
      duration: 1,
    })
    .from(
      laptopDots,
      {
        scale: 0,
        autoAlpha: 0,
        ease: gsapEase.back,
        duration: 0.5,
        clearProps: "all",
      },
      "<0.5"
    )
    .from(".paper", {
      x: 200,
      autoAlpha: 0,
      ease: gsapEase.back,
      duration: 0.3,
    })
    .from(".pen", {
      x: 200,
      autoAlpha: 0,
      ease: gsapEase.back,
      duration: 0.3,
    })
    .from(flower, {
      y: -900,
      ease: gsapEase.back,
      duration: 0.4,
    })
    .from(coffee, {
      x: -500,
      ease: gsapEase.back,
      duration: 0.4,
      onComplete: () => {
        iconsTimeline.play(0.5);
        laptopElementsTimeline.play();
      },
    })
    .from(".btn-big", {
      transform: "translate3d(0, 0, 1px) scale(0)",
      opacity: 0,
      ease: "Bounce.easeOut",
      duration: 1,
      clearProps: "transform",
    })
    .from(
      ".laptop-text > *, .laptop-text > * > *, .laptop-mail-arrow, .laptop-mail",
      {
        autoAlpha: 0,
        ease: gsapEase.elastic02,
        duration: 0.6,
        stagger: { each: 0.1, from: "random" },
        clearProps: "all",
        onComplete: () => {
          mailWiggle.play();
        },
      }
    );

  const mailWiggle = gsap.timeline({
    repeat: -1,
    repeatDelay: 2,
    paused: true,
  });

  mailWiggle
    .set(".laptop-mail", { transformOrigin: "60% 60%" })
    .to(".laptop-mail", 0.05, {
      rotation: 30,
    })
    .to(".laptop-mail", 0.05, {
      rotation: 0,
      xPercent: 0,
      yPercent: 0,
    })
    .to(".laptop-mail", 0.05, {
      rotation: -30,
    })
    .to(".laptop-mail", 0.05, {
      rotation: 0,
      xPercent: 0,
      yPercent: 0,
    })
    .to(".laptop-mail", 0.05, {
      rotation: 30,
    })
    .to(".laptop-mail", 0.05, {
      rotation: 0,
      xPercent: 0,
      yPercent: 0,
    })
    .to(".laptop-mail", 0.05, {
      rotation: -30,
    })
    .to(".laptop-mail", 0.05, {
      rotation: 0,
      xPercent: 0,
      yPercent: 0,
    })
    .to(".laptop-mail", 0.05, {
      rotation: 30,
    })
    .to(".laptop-mail", 0.05, {
      rotation: 0,
      xPercent: 0,
      yPercent: 0,
    })
    .to(".laptop-mail", 0.05, {
      rotation: -30,
    })
    .to(".laptop-mail", 0.05, {
      rotation: 0,
      xPercent: 0,
      yPercent: 0,
    });

  const iconsTimeline = gsap.timeline({ paused: true });
  iconsTimeline.from(
    ".social__item",
    {
      x: 400,
      rotation: 360,
      ease: "power1.out",
      stagger: { each: 0.2 },
      duration: 1,
    },
    "<1"
  );

  const laptopElementsTimeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 3,
  });

  laptopElementsTimeline
    .to(".laptop-element--6", {
      opacity: 1,
      scale: 0.95,
      duration: 0.55,
      ease: "none",
    })
    .to(
      ".laptop-element--7",
      {
        opacity: 1,
        scale: 0.95,
        duration: 0.55,
        ease: "none",
      },
      "+=0.05"
    )
    .to(
      ".laptop-element--6",
      {
        opacity: 0,
      },
      "<-0.05"
    )
    .to(
      ".laptop-element--7",
      {
        opacity: 0,
        clearProps: "opacity",
      },
      "<-0.02"
    )
    .from(
      ".laptop-element",
      {
        // keyframes: {
        //   "0%": { opacity: 0.1 },
        //   "2%": { opacity: 1 },
        //   "8%": { opacity: 0.1 },
        //   "9%": { opacity: 1 },
        //   "12%": { opacity: 0.1 },
        //   "20%": { opacity: 1 },
        //   "25%": { opacity: 0.3 },
        //   "30%": { opacity: 1 },
        //   "70%": { opacity: 0.7 },
        //   "72%": { opacity: 0.2 },
        //   "77%": { opacity: 0.9 },
        //   "100%": { opacity: 0 },
        // },
        keyframes: {
          "0%": { opacity: 0 },
          "77%": { opacity: 0.9 },
          "100%": { opacity: 0 },
        },
        scale: 0.95,
        stagger: {
          each: 0.2,
          from: "random",
        },
        duration: 0.55,
        ease: "none",
      },
      "<-0.07"
    );

  let vapor = gsap.utils.toArray(".vapor");
  gsap.set(vapor, {
    autoAlpha: 0,
    scale: 0.5,
    transformOrigin: "center bottom",
  });
  let vaporDuration = 4;

  vapor.forEach((el, i) => {
    gsap
      .timeline({ repeat: -1, delay: i * 0.5 })
      .to(el, {
        duration: vaporDuration * 0.4,
        autoAlpha: 1,
        repeat: 1,
        yoyo: true,
        repeatDelay: vaporDuration * 0.2,
        ease: "none",
      })
      .to(
        el,
        {
          duration: vaporDuration,
          y: "-=15",
          ease: "none",
          scale: 1,
        },
        0
      );
  });

  // const blink = gsap.timeline({ repeat: -1, repeatDelay: 3 });
  // blink
  //   .from(".laptop-element--6", {
  //     opacity: 0,
  //     scale: 0.95,

  //     duration: 0.15,
  //     ease: "none",
  //     // repeatDelay: 6,
  //   })
  //   .from(
  //     ".laptop-element--7",
  //     {
  //       opacity: 0,
  //       scale: 0.95,

  //       duration: 0.15,
  //       ease: "none",
  //       // repeatDelay: 6,
  //     },
  //     "+=0.05"
  //   )
  //   .to(
  //     ".laptop-element--6",
  //     {
  //       opacity: 0,
  //     },
  //     "<-0.05"
  //   )
  //   .to(
  //     ".laptop-element--7",
  //     {
  //       opacity: 0,
  //     },
  //     "<0"
  //   );

  //ANCHOR Social icons animation
  const socialItems = document.querySelectorAll(".social__item");

  socialItems.forEach((item) => {
    const socialWindow = {
      w: item.offsetWidth,
      h: item.offsetHeight,
    };

    const leftTop = {
      x: 0,
      y: 0,
    };

    const rightTop = {
      x: socialWindow.w,
      y: 0,
    };

    const middleTop = {
      x: socialWindow.w / 2,
      y: 0,
    };

    let socialActive = false;
    let d = "";

    const socialAnimate = () => {
      d = `
      M ${socialWindow.w}, 0
      L 0, 0
      L ${leftTop.x} ${leftTop.y}
      Q ${middleTop.x} ${middleTop.y}
      ${rightTop.x} ${rightTop.y}
      `;

      item.querySelector(".social__svg path").setAttribute("d", d);
      requestAnimationFrame(socialAnimate);
    };

    socialAnimate();

    item.addEventListener("mouseover", () => {
      socialActive = !socialActive;

      gsap.to([leftTop, rightTop], {
        y: socialActive ? socialWindow.h : 0,
        ease: "power3.out",
      });

      gsap.to(middleTop, {
        y: socialActive ? socialWindow.h : 0,
        ease: "power3.out",
        delay: 0.1,
      });
    });

    item.addEventListener("mouseout", () => {
      socialActive = false;
      gsap.to([leftTop, rightTop], {
        y: socialActive ? socialWindow.h : 0,
        ease: "power3.out",
      });

      gsap.to(middleTop, {
        y: socialActive ? socialWindow.h : 0,
        ease: "power3.out",
        delay: 0.1,
      });
    });

    const handleResize = () => {
      socialWindow.w = item.offsetWidth;
      socialWindow.h = item.offsetHeight;
      item.querySelector("svg").setAttribute("width", socialWindow.w);
      item.querySelector("svg").setAttribute("height", socialWindow.h / 2);
      middleTop.x = socialWindow.w / 2;
      rightTop.x = socialWindow.w;
    };

    handleResize();

    window.addEventListener("resize", handleResize);
  });

  // socialBox.addEventListener("mouseover", (e) => {
  //   const hovered = e.target.closest(".social__item");
  //   if (!hovered) return;

  //   socialItems.forEach((item) => {
  //     item.classList.remove("active");
  //   });

  //   hovered.classList.add("active");

  //   const activeSocialItem = document.querySelector(".active");
  //   console.log(activeSocialItem);
  // });

  // socialBox.addEventListener("mouseout", (e) => {
  //   socialItems.forEach((item) => {
  //     item.classList.remove("active");
  //   });
  // });
}

export {
  pageSkillsInit,
  aboutAnimationInit,
  addDoorAnimationOnResize,
  contactPageInit,
};
