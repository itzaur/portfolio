"use strict";
import { Cursor } from "./export";
import { MagnetLogo, addCustomCursor } from "./export";

CustomEase.create("cubic2", "0.93, 0.02, 0.56, 0.95");
gsap.registerPlugin(TextPlugin);

const gsapEase = {
  power1: "power1.out",
  power4: "power4.out",
  back: "back.out",
  elastic02: "elastic.out(1, 0.2)",
  elastic03: "elastic.out(1, 0.3)",
  elastic05: "elastic.out(1, 0.5)",
};

function pageSkillsInit() {
  const hobbiesItems = document.querySelectorAll(".hobbie");

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
    );
}

// let resultX;
// let id = null;
// let isPlaying = false;
// gsap.registerPlugin(TextPlugin);
function aboutAnimationInit() {
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
      dot.style.transition = `transform 0.3s ease-in-out`;
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
  });

  const aboutTimeline6 = gsap.timeline();
  aboutTimeline6.from(".about-dot", {
    y: 200,
    duration: 1,
    stagger: 0.2,
    ease: gsapEase.back,
    opacity: 0,
    clearProps: "all",
    onComplete: () => {
      activeDot(0);
      activeTabindex();
    },
  });

  function activeTabindex() {
    document.querySelectorAll(".about-dot").forEach((dot) => {
      dot.setAttribute("tabindex", "0");
    });
  }

  const aboutTimeline7 = gsap.timeline();
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
              mobileGoToSlide(0);
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
      .add(aboutTimeline7)
      .add(aboutTimeline4.timeScale(speed.t4))
      .add(aboutTimeline6.delay(-0.5))
      .add(aboutTimeline5);
  } else {
    master = gsap
      .timeline()
      .add(aboutTimeline)
      .add(aboutTimeline2.delay(-1))
      .add(aboutTimeline3.delay(-0.5))
      .add(aboutTimeline4)
      .add(aboutTimeline5)
      .add(aboutTimeline6)
      .add(aboutTimeline7);
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

  //ANCHOR Door animation
  function addDoorAnimationOnResize() {
    const doodle = document.querySelector(".face-doodle-mobile .text-box");
    const door = document.querySelector(".story--2__door svg");
    const textIT = document.querySelectorAll(".story--2__door svg .it");
    const doodleCenterCoordY =
      doodle.getBoundingClientRect().top +
      doodle.getBoundingClientRect().height / 2;
    const doorCenterCoordY =
      door.getBoundingClientRect().top +
      door.getBoundingClientRect().height / 2;

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
  // addDoorAnimationOnResize();
  window.addEventListener("resize", addDoorAnimationOnResize);
}

export { pageSkillsInit, aboutAnimationInit };
