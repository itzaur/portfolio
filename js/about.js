"use strict";
import { Cursor } from "./export";
import { MagnetLogo, addCustomCursor } from "./export";

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
    // if (target.classList.contains("active")) {
    //   addHobbiesParallax();
    // }
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
        ease: "elastic.out(1, 0.3)",
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
          ease: "elastic.out(1, 0.5)",
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
  const gsapEase = {
    power4: "power4.out",
    back: "back.out",
  };

  const hobbie1Before = window.getComputedStyle(
    document.querySelector(".hobbie--1"),
    ":before"
  );

  // const hobbie2Before = CSSRulePlugin.getRule(".hobbie--2::before");
  // const hobbie3Before = CSSRulePlugin.getRule(".hobbie--3::before");
  // console.log(hobbie1Before, hobbie2Before, hobbie3Before);

  hobbiesTimeline
    .set(".hobbie--1", {
      xPercent: -100,
      // opacity: 0,

      // autoAlpha: 0,
    })
    // .set(hobbie1Before, {
    //   xPercent: -100,
    //   autoAlpha: 0,
    // })
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
    // .fromTo(
    //   hobbie1Before,
    //   {
    //     backgroundColor: "transparent",
    //   },
    //   {
    //     backgroundColor: "HSL(var(--primary-hs) 0%)",
    //   }
    // )
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

function aboutAnimationInit() {
  //Slider
  const slidesBox = document.querySelector(".story__box");
  const slides = slidesBox.querySelectorAll(".story__photo");
  const tabList = document.querySelector("[role='tablist']");
  const aboutBtns = tabList.querySelectorAll("[role='tab']");

  tabList.addEventListener("keydown", (e) => {
    const KEYDOWN_LEFT = 37;
    const KEYDOWN_RIGHT = 39;

    if (e.keyCode === KEYDOWN_RIGHT) {
      nextSlide();
    } else if (e.keyCode === KEYDOWN_LEFT) {
      prevSlide();
    }
  });

  let currentSlide = 0;
  function goToSlide(s) {
    slides.forEach((slide) => {
      const gap = 20;
      slide.style.transform = `translate(calc(${100 * -s}% - ${
        s * gap
      }rem), 0)`;
    });
  }

  function nextSlide() {
    currentSlide === slides.length - 1 ? (currentSlide = 0) : currentSlide++;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide === 0 ? (currentSlide = slides.length - 1) : currentSlide--;
    goToSlide(currentSlide);
  }

  function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
    var mql = window.matchMedia(mediaQuery);
    mql.addListener(function (e) {
      return layoutChangedCallback(e.matches);
    });
    layoutChangedCallback(mql.matches);
  }

  const aboutTimeline = gsap.timeline();
  aboutTimeline
    .from(".top-nav--about", {
      xPercent: 100,
      duration: 0.5,
      ease: "power1.out",
      delay: 1,
      clearProps: "all",
    })
    .from(".story__photo--person", {
      xPercent: 100,
      duration: 2,
      ease: "elastic.out(1, 0.3)",
      opacity: 0,
      clearProps: "all",
    })
    .from(
      ".story__photo--doodle1",
      {
        scale: 0,
        duration: 1.8,
        ease: "elastic.out(1, 0.2)",
        opacity: 0,
        clearProps: "all",
      },
      "<1.2"
    )
    .from(
      ".story__photo--doodle2",
      {
        scale: 0,
        y: -100,
        duration: 1.8,
        ease: "elastic.out(1, 0.2)",
        opacity: 0,
        clearProps: "all",
      },
      "+=0.5"
    )
    .from(
      ".story__photo--doodle3",
      {
        scale: 0,
        y: -200,
        duration: 1.8,
        ease: "elastic.out(1, 0.2)",
        opacity: 0,
        clearProps: "all",
      },
      "+=0.5"
    )
    .from("[data-num='0']", {
      x: -100,
      opacity: 0,
      ease: Back.easeOut.config(1.7),
    })
    .from(
      "[data-num='1']",
      {
        x: 100,
        opacity: 0,
        ease: Back.easeOut.config(1.7),
        onComplete: () => {
          installMediaQueryWatcher("(max-width: 568px)", function (matches) {
            if (matches) {
              goToSlide(0);
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

  // const cc = document.querySelectorAll("#corner-button svg .cls-3");
  // console.log(cc);
  // gsap.fromTo(
  //   "#corner-button svg .cls-3, #corner-button svg .cls-2, #corner-button svg .cls-1, #corner-button svg .cls-4",
  //   {
  //     rotation: 0,
  //     transformOrigin: "center center",
  //     // opacity: 0,
  //   },
  //   {
  //     rotation: 360,
  //     opacity: 1,
  //     ease: "none",
  //     duration: 30,
  //     transformOrigin: "center center",
  //   }
  // );
}

// export default pageSkillsInit;
export { pageSkillsInit, aboutAnimationInit };
