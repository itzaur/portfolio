"use strict";
import { gsapEase, randomNumber, installMediaQueryWatcher } from "./utils";

const scaleProperty1 = getComputedStyle(
  document.documentElement
).getPropertyValue("--scale-1"); //3.75
const scaleProperty2 = getComputedStyle(
  document.documentElement
).getPropertyValue("--scale-2"); //8

//ANCHOR Next page button animation
let animStatusRun = false;

function cornerArrowAnimation() {
  const cornerArrowTimeline = gsap.timeline({ paused: true });
  cornerArrowTimeline.set("#corner-button svg g g path", {
    autoAlpha: 0,
  });

  cornerArrowTimeline.fromTo(
    "#corner-button svg g g path",
    {
      y: `-=${randomNumber(40, -40)}`,
      x: `+=${randomNumber(40, -40)}`,
    },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      duration: 0.2,
      ease: gsapEase.back,
      stagger: { each: 0.01 },
    }
  );

  if (!animStatusRun) {
    cornerArrowTimeline.play();
    document
      .querySelector("#corner-button svg")
      .classList.remove("inactive-hover");
  } else {
    document
      .querySelector("#corner-button svg")
      .classList.add("inactive-hover");
  }

  document.querySelector("#corner-link").addEventListener("focus", () => {
    document
      .querySelector("#corner-button svg")
      .classList.remove("inactive-hover");
    cornerArrowTimeline.play();
  });
}

function controlHoverOnCornerButton(e) {
  const cornerArrow = document.querySelector("#wrapper__corner-box");

  if (e.target.closest("#wrapper__corner-box")) {
    cornerArrow.style.transform = `scale(${scaleProperty2})`;
  } else {
    cornerArrow.style.transform = `scale(${scaleProperty1})`;
  }
}

function cornerArrowHoverEffect() {
  const cornerArrow = document.querySelector("#wrapper__corner-box");
  // const cornerBox = document.querySelector("#corner-box");

  //Contact section corner element
  let contactCornerLetters = gsap.utils.toArray(".contact-elements");

  contactCornerLetters.forEach((letter) => {
    const lettersTimeline = gsap.timeline({ paused: true });
    lettersTimeline.from(letter, {
      x: randomNumber(-600, 600),
      y: randomNumber(-400, 400),
      scale: 0,
      duration: 1,
      rotation: randomNumber(-720, 720),
      transformOrigin: "center center",
    });

    cornerArrow.addEventListener("mouseenter", () => {
      // animStatusRun = false;
      lettersTimeline.play(0);
    });

    cornerArrow.addEventListener("mouseleave", () => {
      // animStatusRun = true;
      lettersTimeline.reverse();
    });

    cornerArrow.addEventListener("focus", () => {
      lettersTimeline.play(0);
    });
  });

  wrapper.addEventListener("mouseleave", () => {
    cornerArrow.style.transform = `scale(1)`;
  });

  cornerArrow.addEventListener("mouseenter", () => {
    animStatusRun = false;
    cornerArrowAnimation();
  });

  cornerArrow.addEventListener("mouseleave", () => {
    animStatusRun = true;
    cornerArrowAnimation();
  });

  cornerArrow.addEventListener("focus", () => {
    animStatusRun = false;
    cornerArrowAnimation();
    cornerArrow.style.transform = `scale(${scaleProperty2})`;
  });

  cornerArrow.addEventListener("focusout", () => {
    animStatusRun = true;
    cornerArrowAnimation();
    cornerArrow.style.transform = `scale(${scaleProperty1})`;
  });
}

//ANCHOR Vapor animation functionality
let vaporAnimationDuration, vaporMinValueX, vaporMaxValueX, vaporValueY;

function vaporAnimation(items) {
  gsap.set(items, {
    autoAlpha: 0,
    scale: 0.5,
    transformOrigin: "center bottom",
  });

  items.forEach((item, i) => {
    gsap
      .timeline({ repeat: -1, delay: i * 0.5 })
      .to(item, {
        repeat: 1,
        autoAlpha: 1,
        duration: vaporAnimationDuration * 0.4,
        repeatDelay: vaporAnimationDuration * 0.2,
        yoyo: true,
        ease: "none",
      })
      .to(
        item,
        {
          y: `-=${vaporValueY}`,
          x: `-=${randomNumber(vaporMinValueX, vaporMaxValueX)}`,
          scale: 1,
          rotation: 0.5,
          duration: vaporAnimationDuration,
          ease: "none",
        },
        0
      );
  });
}

function pageSkillsInit() {
  gsap.registerPlugin(TextPlugin);
  const btnBig = document.querySelector(".btn-big");
  const hobbiesItems = document.querySelectorAll(".hobbie");
  const skillsBtn = document.querySelectorAll(".skills__btn");
  const skillsBtnContainer = document.querySelector(".skills__btns");
  const skillsLevel = document.querySelectorAll(".skills-level");

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

    //Skills btns animation
    const skillsTimeline = gsap.timeline({ paused: true });
    skillsTimeline
      .fromTo(
        clicked,
        {
          scale: 0,
          // transform: `translate3d(0, 0, 1px) scale(0)`,
        },
        {
          scale: 1,
          // transform: `translate3d(0, 0, 1px) scale(1)`,
          duration: 0.4,
          ease: gsapEase.elastic05,
          clearProps: "transform",
        }
      )
      .from(
        `[aria-hidden="false"] .starSkill`,
        {
          opacity: 0,
          scale: 0,
          ease: gsapEase.elastic03,
          duration: 0.5,
          clearProps: "all",
        },
        "<0"
      )
      .from(
        `[aria-hidden="false"] .point span`,
        {
          x: -30,
          opacity: 0,
          scale: 0,
          duration: 0.2,
          ease: gsapEase.back_1_7,
          clearProps: "all",
        },
        "<0.3"
      );

    if (clicked.getAttribute("aria-expanded") === "true") {
      skillsTimeline.play();

      gsap.to(`[aria-hidden="true"] .point span`, {
        x: -30,
        opacity: 0,
        scale: 0,
        duration: 0.25,
        ease: "none",
        clearProps: "all",
      });
    }
  });

  function addHobbiesParallax() {
    const parallaxItems = document.querySelectorAll(".hobbie");
    const cassetteItem = document.querySelector(".hobbie--2");

    parallaxItems.forEach((item) => {
      const partallaxDots = item.querySelector(".hobbie__img:nth-child(2) img");
      const parallaxElements = item.querySelector(
        ".hobbie__img:nth-child(3) img"
      );
      const cassette = cassetteItem.querySelector(
        ".hobbie__img:first-child img"
      );

      item.addEventListener("mousemove", addParallax);
      item.addEventListener("mouseout", removeParallax);

      function addParallax(e) {
        const x = e.pageX;
        const y = e.pageY;
        const coords = parallaxElements.getBoundingClientRect();
        const itemX = coords.left + parallaxElements.offsetWidth / 2;
        const itemY = coords.top + parallaxElements.offsetHeight / 2;
        const itemAngleX = (itemY - y) / 25;
        const itemAngleY = (itemX - x) / -25;

        let state = {
          mouseX: 0,
          mouseY: 0,
          height: cassetteItem.clientHeight,
          width: cassetteItem.clientWidth,
        };

        state.mouseX = x - cassetteItem.offsetLeft - state.width / 2;
        state.mouseY = y - cassetteItem.offsetTop - state.height / 2;
        const posX = (state.mouseX / state.width) * -40;
        const posY = (state.mouseY / state.height) * -40;

        if (item.classList.contains("active")) {
          partallaxDots.style.transform = `translateX(${-itemAngleY}px) translateY(${-itemAngleX}px)`;
          partallaxDots.style.transition = `none`;

          parallaxElements.style.transform = `translateX(${itemAngleY}px) translateY(${itemAngleX}px) rotate(0.01deg)`;
          parallaxElements.style.transition = `none`;
        }

        if (item.classList.contains("active") && item.closest(".hobbie--2")) {
          cassette.style.transform = `translateX(${posX}px) translateY(${posY}px) rotate(0.01deg)`;
          cassette.style.transition = `none`;
        }
      }

      function removeParallax() {
        partallaxDots.style.transform = `translate3d(0px, 0px, 1px) rotate(0.01deg)`;
        partallaxDots.style.transition = `1s cubic-bezier(0.445, 0.05, 0.55, 0.95)`;

        parallaxElements.style.transform = `translate3d(0px, 0px, 1px) rotate(0.01deg)`;
        parallaxElements.style.transition = `1s cubic-bezier(0.445, 0.05, 0.55, 0.95)`;

        cassette.style.transform = `translate3d(0px, 0px, 1px) rotate(0.01deg)`;
        cassette.style.transition = `transform 1s cubic-bezier(0.445, 0.05, 0.55, 0.95)`;
      }
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
  const eyeWidth = eyeLeft.getBBox().width;
  const eyeHeight = eyeLeft.getBBox().height;
  const pupilWidth = eyeLeftPupil.getBBox().width;
  const pupilHeight = eyeLeftPupil.getBBox().height;
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
    const posX = ((mouseXPercent * 2 - 1) * xMove) / 0.9;
    const posY = ((mouseYPercent * 2 - 1) * yMove) / 0.9;

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

  const hobbiesTimeline = gsap.timeline({ delay: 0.7 });

  hobbiesTimeline
    .set(".hobbie--1", {
      xPercent: -100,
    })
    .set(".hobbie--2", {
      yPercent: -100,
    })
    .set(".hobbie--3", {
      xPercent: 100,
    })
    .set(".skills", {
      yPercent: 100,
      autoAlpha: 0,
    })
    .to(".hobbie--1", {
      xPercent: 0,
      duration: 2,
      ease: gsapEase.power4,
      clearProps: "transform",
    })
    .to(
      ".hobbie--2",
      {
        yPercent: 0,
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
      skillsBtn,
      {
        y: 800,
        duration: 1,
        stagger: { each: 0.2 },
        ease: gsapEase.back,
        clearProps: "all",
      },
      "<0"
    )
    .from(
      ".skills__btn span",
      {
        yPercent: 250,
        z: 1,
        duration: 1,
        stagger: { each: 0.2 },
        ease: gsapEase.back,
        clearProps: "transform",
      },
      "<0"
    )
    .from(
      ".starSkill",
      {
        scale: 0,
        duration: 0.5,
        stagger: { each: 0.05, from: "random" },
        ease: gsapEase.back,
        clearProps: "all",
      },
      "<1"
    )
    .from(
      ".point span",
      {
        autoAlpha: 0,
        x: -50,
        ease: gsapEase.back,
        stagger: { each: 0.05, from: "random" },
        clearProps: "all",
      },
      "<0.6"
    )
    .from(
      ".top-nav--hobbies",
      {
        yPercent: -130,
        autoAlpha: 1,
        duration: 0.8,
        ease: gsapEase.back,
      },
      "<0.5"
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
    .from(
      btnBig,
      {
        transform: "translate3d(0, 0, 1px) scale(0)",
        opacity: 0,
        ease: gsapEase.bounce_ease_out,
        duration: 1,
        clearProps: "transform",
      },
      "<0.4"
    );
}

function aboutAnimationInit() {
  gsap.registerPlugin(TextPlugin);
  const btnBig = document.querySelector(".btn-big");

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

    ellipseTimlineDesktop.play();
    ellipseTimlineMobile.play();
  }

  function desktopPrevSlide() {
    currentSlide === 0 ? (currentSlide = 0) : currentSlide--;

    desktopGoToSlide(currentSlide);
    activeDot(currentSlide);

    ellipseTimlineDesktop.pause();
    ellipseTimlineMobile.pause();
  }

  function activeDot(slide) {
    dots.forEach((dot) => {
      dot.classList.remove("active");
      document
        .querySelector(`.about-dot[data-slide="${slide}"]`)
        .classList.add("active");
    });
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
      duration: 1,
      ease: gsapEase.elastic05_04,
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
      ease: gsapEase.bounce_ease_out,
      duration: 1,
      clearProps: "transform",
    });

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

  function changeTextAnimationSpeed(e) {
    installMediaQueryWatcher("(max-width: 568px)", function (matches) {
      if (matches) {
        if (e.target.closest(".story__photo--doodle1")) {
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
        } else if (e.target.closest(".story__photo--doodle2")) {
          aboutTimeline5.timeScale(speed.t6);
        } else if (e.target.className.includes("skip-text-animation")) {
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
          aboutTimeline5.timeScale(speed.t6);
          ellipseTimlineMobile.timeScale(speed.t10);
        }
      } else {
        if (e.target.closest(".story__photo--doodle1")) {
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
        } else if (e.target.closest(".story__photo--doodle2")) {
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
        } else if (e.target.className.includes("skip-text-animation")) {
          aboutTimeline3
            .timeScale(speed.t10)
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
          aboutTimeline5
            .timeScale(speed.t10)
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
          ellipseTimlineDesktopText.timeScale(speed.t10);
        }
      }
    });
  }

  slides.forEach((doodle) => {
    doodle.addEventListener("click", changeTextAnimationSpeed);
  });

  document
    .querySelector(".face-doodle-desktop")
    .addEventListener("click", () => {
      ellipseTimlineDesktopText.timeScale(speed.t10);
    });

  document
    .querySelector(".face-doodle-mobile")
    .addEventListener("click", () => {
      ellipseTimlineMobile.timeScale(speed.t10);
    });

  document
    .querySelector(".skip-text-animation")
    .addEventListener("click", changeTextAnimationSpeed);

  //About section part 2 (IT-door) vapor animation run
  let doorElements = gsap.utils.toArray(".door-element");
  vaporAnimationDuration = 1.5;
  vaporMinValueX = -10;
  vaporMaxValueX = 10;
  vaporValueY = 15;
  vaporAnimation(doorElements);

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
    doodle.style.opacity = "1";
    textIT.forEach((text) => (text.style.fill = "#1d1d1b"));
  } else if (
    doodleCenterCoordY <
    doorCenterCoordY -
      doorCenterCoordY * 0.1 -
      doodle.getBoundingClientRect().height / 2
  ) {
    doodle.style.opacity = "1";
    textIT.forEach((text) => (text.style.fill = "#1d1d1b"));
  } else {
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

  const contactPageAnimationRun = gsap.timeline({ delay: 0.2 });
  contactPageAnimationRun
    .from(
      ".top-nav--contact",
      {
        xPercent: 100,
        autoAlpha: 0,
        duration: 0.5,
        delay: 0.5,
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
    .from(flower, {
      y: -900,
      ease: gsapEase.back,
      duration: 0.4,
      clearProps: "all",
    })
    .from(coffee, {
      x: -500,
      ease: gsapEase.back,
      duration: 0.4,
      clearProps: "all",
      onComplete: () => {
        iconsTimeline.play(0.5);
        laptopElementsTimeline.play();
      },
    })
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
    .from(".btn-big", {
      transform: "translate3d(0, 0, 1px) scale(0)",
      opacity: 0,
      ease: gsapEase.bounce_ease_out,
      duration: 1,
      clearProps: "transform",
    })
    .from(
      ".laptop-text > *, .laptop-text > * > *, .laptop-mail-arrow, .laptop-mail",
      {
        scale: 1.2,
        autoAlpha: 0,
        ease: gsapEase.elastic02,
        duration: 0.6,
        stagger: { each: 0.1 },
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
      x: 500,
      rotation: 360,
      ease: gsapEase.back,
      stagger: { each: 0.2 },
      duration: 1,
    },
    "<1"
  );

  const laptopElementsTimeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 3,

    clearProps: "all",
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
        rotation: 0.5,
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
        rotation: 0.5,
        // clearProps: "opacity",
      },
      "<-0.02"
    )
    .from(
      laptopElements,
      {
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

  //Coffee vapor animation run
  let coffeeVapor = gsap.utils.toArray(".vapor");
  vaporAnimationDuration = 4;
  vaporMinValueX = 0;
  vaporMaxValueX = 0;
  vaporValueY = 15;
  vaporAnimation(coffeeVapor);

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
        ease: gsapEase.power3,
      });

      gsap.to(middleTop, {
        y: socialActive ? socialWindow.h : 0,
        ease: gsapEase.power3,
        delay: 0.1,
      });
    });

    item.addEventListener("mouseout", () => {
      socialActive = false;
      gsap.to([leftTop, rightTop], {
        y: socialActive ? socialWindow.h : 0,
        ease: gsapEase.power3,
      });

      gsap.to(middleTop, {
        y: socialActive ? socialWindow.h : 0,
        ease: gsapEase.power3,
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
}

export {
  pageSkillsInit,
  aboutAnimationInit,
  addDoorAnimationOnResize,
  contactPageInit,
  cornerArrowAnimation,
  cornerArrowHoverEffect,
  controlHoverOnCornerButton,
};
