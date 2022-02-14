"use strict";
import { Cursor } from "./export";
import { MagnetLogo, addCustomCursor } from "./export";

function pageSkillsInit() {
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
// pageSkillsInit();
function aboutAnimationInit() {
  const aboutTimeline = gsap.timeline();
  aboutTimeline
    .from(".top-nav--about", {
      // scale: 0,
      xPercent: 100,
      duration: 0.5,
      ease: "power1.out",
      // stagger: 0.1,
      // opacity: 0,
      delay: 1,
      clearProps: "all",
    })
    .from(".story__photo--person", {
      // scale: 0,
      xPercent: 100,
      duration: 2,
      ease: "elastic.out(1, 0.3)",
      // stagger: 0.1,
      opacity: 0,
      clearProps: "all",
    })
    .from(".story__photo--doodle1", {
      scale: 0,
      duration: 1.8,
      ease: "elastic.out(1, 0.2)",
      // stagger: 0.1,
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
        // stagger: 0.1,
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
        // stagger: 0.1,
        opacity: 0,
        clearProps: "all",
      },
      "+=0.5"
    );
}

const tabList = document.querySelector("[role='tablist']");
const aboutBtns = tabList.querySelectorAll("[role='tab']");

tabList.addEventListener("keydown", (e) => {
  console.log(e.keyCode);
  const KEYDOWN_LEFT = 37;
  const KEYDOWN_RIGHT = 39;

  if (e.keyCode === KEYDOWN_RIGHT) {
    document.querySelector(
      ".story__photo--doodle2"
    ).style.transform = `translate(-100%, 0)`;
  }
});

// export default pageSkillsInit;
export { pageSkillsInit, aboutAnimationInit };
