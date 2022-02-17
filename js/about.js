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
  });
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
    .from(".story__photo--doodle1", {
      scale: 0,
      duration: 1.8,
      ease: "elastic.out(1, 0.2)",
      opacity: 0,
      clearProps: "all",
    })
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
}

// export default pageSkillsInit;
export { pageSkillsInit, aboutAnimationInit };
