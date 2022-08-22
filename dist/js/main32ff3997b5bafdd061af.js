/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/about.js":
/*!*********************!*\
  !*** ./js/about.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aboutAnimationInit": () => (/* binding */ aboutAnimationInit),
/* harmony export */   "addDoorAnimationOnResize": () => (/* binding */ addDoorAnimationOnResize),
/* harmony export */   "contactPageInit": () => (/* binding */ contactPageInit),
/* harmony export */   "controlHoverOnCornerButton": () => (/* binding */ controlHoverOnCornerButton),
/* harmony export */   "cornerArrowAnimation": () => (/* binding */ cornerArrowAnimation),
/* harmony export */   "cornerArrowHoverEffect": () => (/* binding */ cornerArrowHoverEffect),
/* harmony export */   "pageSkillsInit": () => (/* binding */ pageSkillsInit)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/utils.js");


 // CustomEase.create("cubic", "0.175, 0.885, 0.32, 1.275");
// CustomEase.create("cubic2", "0.93, 0.02, 0.56, 0.95");
//ANCHOR Next page button animation

var animStatusRun = false;

function cornerArrowAnimation() {
  var cornerArrowTimeline = gsap.timeline({
    paused: true
  });
  cornerArrowTimeline.set("#corner-button svg g g path", {
    autoAlpha: 0
  });
  cornerArrowTimeline.fromTo("#corner-button svg g g path", {
    y: "-=".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(40, -40)),
    x: "+=".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(40, -40))
  }, {
    autoAlpha: 1,
    x: 0,
    y: 0,
    duration: 0.2,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    stagger: {
      each: 0.01
    }
  });

  if (!animStatusRun) {
    cornerArrowTimeline.play();
    document.querySelector("#corner-button svg").classList.remove("inactive-hover");
  } else {
    document.querySelector("#corner-button svg").classList.add("inactive-hover");
  }

  document.querySelector("#corner-link").addEventListener("focus", function () {
    document.querySelector("#corner-button svg").classList.remove("inactive-hover");
    cornerArrowTimeline.play();
  });
}

function controlHoverOnCornerButton(e) {
  var cornerArrow = document.querySelector("#wrapper__corner-box");

  if (e.target.closest("#wrapper__corner-box")) {
    cornerArrow.style.transform = "scale(8)";
  } else {
    cornerArrow.style.transform = "scale(3.75)";
  }
}

function cornerArrowHoverEffect() {
  var cornerArrow = document.querySelector("#wrapper__corner-box");
  var cornerBox = document.querySelector("#corner-box"); //Contact section corner element

  var contactCornerLetters = gsap.utils.toArray(".contact-elements");
  contactCornerLetters.forEach(function (letter) {
    var lettersTimeline = gsap.timeline({
      paused: true
    });
    lettersTimeline.from(letter, {
      x: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(-600, 600),
      y: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(-400, 400),
      scale: 0,
      duration: 1,
      rotation: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(-720, 720),
      transformOrigin: "center center"
    });
    cornerArrow.addEventListener("mouseenter", function () {
      // animStatusRun = false;
      lettersTimeline.play(0);
    });
    cornerArrow.addEventListener("mouseleave", function () {
      // animStatusRun = true;
      lettersTimeline.reverse();
    });
    cornerArrow.addEventListener("focus", function () {
      lettersTimeline.play(0);
    });
  });
  wrapper.addEventListener("mouseleave", function () {
    cornerArrow.style.transform = "scale(1)";
  });
  cornerArrow.addEventListener("mouseenter", function () {
    animStatusRun = false;
    cornerArrowAnimation();
  });
  cornerArrow.addEventListener("mouseleave", function () {
    animStatusRun = true;
    cornerArrowAnimation();
  });
  cornerArrow.addEventListener("focus", function () {
    animStatusRun = false;
    cornerArrowAnimation();
    cornerArrow.style.transform = "scale(8)";
  });
  cornerArrow.addEventListener("focusout", function () {
    animStatusRun = true;
    cornerArrowAnimation();
    cornerArrow.style.transform = "scale(3.75)";
  });
} //ANCHOR Vapor animation functionality


var vaporAnimationDuration, vaporMinValueX, vaporMaxValueX, vaporValueY;

function vaporAnimation(items) {
  gsap.set(items, {
    autoAlpha: 0,
    scale: 0.5,
    transformOrigin: "center bottom"
  });
  items.forEach(function (item, i) {
    gsap.timeline({
      repeat: -1,
      delay: i * 0.5
    }).to(item, {
      repeat: 1,
      autoAlpha: 1,
      duration: vaporAnimationDuration * 0.4,
      repeatDelay: vaporAnimationDuration * 0.2,
      yoyo: true,
      ease: "none"
    }).to(item, {
      y: "-=".concat(vaporValueY),
      x: "-=".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(vaporMinValueX, vaporMaxValueX)),
      scale: 1,
      rotation: 0.5,
      duration: vaporAnimationDuration,
      ease: "none"
    }, 0);
  });
}

function pageSkillsInit() {
  console.log("pageSkillsInit() started");
  gsap.registerPlugin(TextPlugin);
  var btnBig = document.querySelector(".btn-big");
  var hobbiesItems = document.querySelectorAll(".hobbie");
  var skillsBtn = document.querySelectorAll(".skills__btn");
  var skillsBtnContainer = document.querySelector(".skills__btns");
  var skillsLevel = document.querySelectorAll(".skills-level");
  hobbiesItems.forEach(function (hobbie) {
    hobbie.addEventListener("click", addClass);
  });

  function addClass(e) {
    e.stopPropagation();
    removeActiveClass();
    var target = e.currentTarget;
    target.classList.add("active");
  }

  function removeActiveClass() {
    var activEl = document.querySelector(".active");

    if (activEl) {
      activEl.classList.remove("active");
    }
  }

  skillsBtnContainer.addEventListener("click", function (e) {
    var clicked = e.target.closest(".skills__btn");
    var selectSkillsLevel = document.querySelector(".skills-level--".concat(clicked.dataset.tab));
    if (!clicked) return;
    skillsBtn.forEach(function (btn) {
      btn.classList.remove("active");
      btn.setAttribute("aria-expanded", false);
      skillsLevel.forEach(function (skill) {
        skill.setAttribute("aria-hidden", true);
      });
    });
    clicked.classList.add("active");
    clicked.setAttribute("aria-expanded", true);
    selectSkillsLevel.setAttribute("aria-hidden", false); //Skills btns animation

    var skillsTimeline = gsap.timeline({
      paused: true
    });
    skillsTimeline.fromTo(clicked, {
      scale: 0 // transform: `translate3d(0, 0, 1px) scale(0)`,

    }, {
      scale: 1,
      // transform: `translate3d(0, 0, 1px) scale(1)`,
      duration: 0.4,
      ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic05,
      clearProps: "transform"
    }).from("[aria-hidden=\"false\"] .starSkill", {
      opacity: 0,
      scale: 0,
      ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic03,
      duration: 0.5,
      clearProps: "all"
    }, "<0").fromTo("[aria-hidden=\"false\"] .point span", {
      x: -60,
      opacity: 0,
      scale: 0
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back_1_7,
      clearProps: "all",
      duration: 0.2
    }, "<0.3");

    if (clicked.getAttribute("aria-expanded") === "true") {
      skillsTimeline.play();
      gsap.to("[aria-hidden=\"true\"] .point span", {
        x: -60,
        opacity: 0,
        scale: 0,
        duration: 0.25,
        ease: "none",
        clearProps: "all"
      });
    }
  });

  function addHobbiesParallax() {
    var parallaxItems = document.querySelectorAll(".hobbie");
    var cassetteItem = document.querySelector(".hobbie--2");
    parallaxItems.forEach(function (item) {
      var partallaxDots = item.querySelector(".hobbie__img:nth-child(2) img");
      var parallaxElements = item.querySelector(".hobbie__img:nth-child(3) img");
      var cassette = cassetteItem.querySelector(".hobbie__img:first-child img");
      item.addEventListener("mousemove", addParallax);
      item.addEventListener("mouseout", removeParallax);

      function addParallax(e) {
        var x = e.pageX;
        var y = e.pageY;
        var coords = parallaxElements.getBoundingClientRect();
        var itemX = coords.left + parallaxElements.offsetWidth / 2;
        var itemY = coords.top + parallaxElements.offsetHeight / 2;
        var itemAngleX = (itemY - y) / 25;
        var itemAngleY = (itemX - x) / -25;
        var state = {
          mouseX: 0,
          mouseY: 0,
          height: cassetteItem.clientHeight,
          width: cassetteItem.clientWidth
        };
        state.mouseX = x - cassetteItem.offsetLeft - state.width / 2;
        state.mouseY = y - cassetteItem.offsetTop - state.height / 2;
        var posX = state.mouseX / state.width * -40;
        var posY = state.mouseY / state.height * -40;

        if (item.classList.contains("active")) {
          partallaxDots.style.transform = "translateX(".concat(-itemAngleY, "px) translateY(").concat(-itemAngleX, "px)");
          partallaxDots.style.transition = "none";
          parallaxElements.style.transform = "translateX(".concat(itemAngleY, "px) translateY(").concat(itemAngleX, "px) rotate(0.01deg)");
          parallaxElements.style.transition = "none";
        }

        if (item.classList.contains("active") && item.closest(".hobbie--2")) {
          cassette.style.transform = "translateX(".concat(posX, "px) translateY(").concat(posY, "px) rotate(0.01deg)");
          cassette.style.transition = "none";
        }
      }

      function removeParallax() {
        partallaxDots.style.transform = "translate3d(0px, 0px, 1px) rotate(0.01deg)";
        partallaxDots.style.transition = "1s cubic-bezier(0.445, 0.05, 0.55, 0.95)";
        parallaxElements.style.transform = "translate3d(0px, 0px, 1px) rotate(0.01deg)";
        parallaxElements.style.transition = "1s cubic-bezier(0.445, 0.05, 0.55, 0.95)";
        cassette.style.transform = "translate3d(0px, 0px, 1px) rotate(0.01deg)";
        cassette.style.transition = "transform 1s cubic-bezier(0.445, 0.05, 0.55, 0.95)";
      }
    });
  }

  addHobbiesParallax(); //Eye move

  var catItem = document.querySelector(".hobbie--3");
  var cat = document.getElementById("cat");
  var eyeLeftPupil = cat.querySelector(".eye-left-pupil");
  var eyeRightPupil = cat.querySelector(".eye-right-pupil");
  var eyeLeft = cat.querySelector(".eye-left");
  var eyeLeftHighlight = cat.querySelector(".eye-left-highlight");
  var eyeRightHighlight = cat.querySelector(".eye-right-highlight");
  var eyeWidth = eyeLeft.getBBox().width;
  var eyeHeight = eyeLeft.getBBox().height;
  var pupilWidth = eyeLeftPupil.getBBox().width;
  var pupilHeight = eyeLeftPupil.getBBox().height;
  var xMove = (eyeWidth - pupilWidth) / 2;
  var yMove = (eyeHeight - pupilHeight) / 2;
  var eyeCoordsX = -698;
  var eyeCoordsY = -340.1;
  gsap.set(eyeLeftPupil, {
    x: eyeCoordsX,
    y: eyeCoordsY
  });
  catItem.addEventListener("mousemove", moveEyes);

  function moveEyes(e) {
    var mouseXPercent = e.clientX / catItem.clientWidth;
    var mouseYPercent = e.clientY / catItem.clientHeight;
    var posX = (mouseXPercent * 2 - 1) * xMove / 0.9;
    var posY = (mouseYPercent * 2 - 1) * yMove / 0.9;

    if (catItem.classList.contains("active")) {
      eyeLeftPupil.style.transform = "translate3d(".concat(eyeCoordsX + posX, "px, ").concat(eyeCoordsY + posY + 2, "px, 1px)");
      eyeRightPupil.style.transform = "translate3d(".concat(eyeCoordsX + posX, "px, ").concat(eyeCoordsY + posY + 2, "px, 1px)");
      eyeLeftHighlight.style.transform = "translate3d(".concat(eyeCoordsX + posX + 2, "px, ").concat(eyeCoordsY + posY + 2, "px, 1px)");
      eyeRightHighlight.style.transform = "translate3d(".concat(eyeCoordsX + posX + 4, "px, ").concat(eyeCoordsY + posY, "px, 1px)");
    }
  }

  var hobbiesTimeline = gsap.timeline({
    delay: 0.5
  });
  hobbiesTimeline.set(".hobbie--1", {
    xPercent: -100
  }).set(".hobbie--2", {
    yPercent: -100
  }).set(".hobbie--3", {
    xPercent: 100
  }).set(".skills", {
    yPercent: 100,
    autoAlpha: 0
  }).to(".hobbie--1", {
    xPercent: 0,
    duration: 2,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power4,
    clearProps: "transform"
  }).to(".hobbie--2", {
    yPercent: 0,
    duration: 2.5,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power4,
    clearProps: "all"
  }, "<0").to(".hobbie--3", {
    xPercent: 0,
    duration: 2.5,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power4,
    clearProps: "all"
  }, "<0").to(".skills", {
    autoAlpha: 1,
    yPercent: 0,
    duration: 2,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power4,
    clearProps: "all"
  }, "<0").from(skillsBtn, {
    y: 800,
    duration: 1,
    stagger: {
      each: 0.2
    },
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    clearProps: "all"
  }, "<0").from(".skills__btn span", {
    yPercent: 250,
    z: 1,
    duration: 1,
    stagger: {
      each: 0.2
    },
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    clearProps: "transform"
  }, "<0").from(".starSkill", {
    scale: 0,
    duration: 0.5,
    stagger: {
      each: 0.05,
      from: "random"
    },
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    clearProps: "all"
  }, "<1").from(".point span", {
    autoAlpha: 0,
    x: -50,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    stagger: {
      each: 0.05,
      from: "random"
    },
    clearProps: "all"
  }, "<0.6").from(".top-nav--hobbies", {
    yPercent: -130,
    autoAlpha: 1,
    duration: 0.8,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back
  }, "<0.5").from(".top-nav--skills", {
    xPercent: 100,
    autoAlpha: 1,
    duration: 0.8,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back
  }, "<0").from(btnBig, {
    transform: "translate3d(0, 0, 1px) scale(0)",
    opacity: 0,
    ease: "Bounce.easeOut",
    duration: 1,
    clearProps: "transform"
  }, "<0.4");
}

function aboutAnimationInit() {
  console.log("aboutAnimationInit() started");
  gsap.registerPlugin(TextPlugin);
  var btnBig = document.querySelector(".btn-big"); //Slider mobile

  var storySlides = document.querySelectorAll(".story");
  var slidesBox = document.querySelector(".story__box");
  var slides = slidesBox.querySelectorAll(".story__photo");
  var tabList = slidesBox.querySelector("[role='tablist']"); // const aboutBtns = tabList.querySelectorAll("[role='tab']");

  var btnAboutSection = document.querySelector(".top-nav--about");
  var dotsBox = document.querySelector(".dots-box");
  var dots = dotsBox.querySelectorAll("[role='tab']");
  var KEYDOWN_LEFT = 37;
  var KEYDOWN_RIGHT = 39;
  tabList.addEventListener("keydown", function (e) {
    if (e.keyCode === KEYDOWN_RIGHT) {
      nextSlide();
    } else if (e.keyCode === KEYDOWN_LEFT) {
      prevSlide();
    }

    runBtnSliderAnimation();
  });
  var currentSlide = 0;

  function mobileGoToSlide(s) {
    slides.forEach(function (slide) {
      var gap = 20;
      slide.style.transform = "translate(calc(".concat(100 * -s, "% - ").concat(s * gap, "rem), 0)");
    });
    runBtnSliderAnimation();
  }

  function nextSlide() {
    currentSlide === slides.length - 1 ? currentSlide = 0 : currentSlide++;
    mobileGoToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide === 0 ? currentSlide = slides.length - 1 : currentSlide--;
    mobileGoToSlide(currentSlide);
  } //Slider desktop


  dotsBox.addEventListener("keydown", function (e) {
    if (e.keyCode === KEYDOWN_RIGHT) {
      desktopNextSlide();
    } else if (e.keyCode === KEYDOWN_LEFT) {
      desktopPrevSlide();
    }
  });
  dotsBox.addEventListener("click", function (e) {
    var dotClicked = e.target.getAttribute("aria-selected");
    if (!dotClicked) return;
    dots.forEach(function (dot) {
      dot.classList.remove("active");
      dot.setAttribute("aria-selected", false);
      dot.style.transition = "transform 0.8s ease-in-out";
    });
    e.target.classList.add("active");
    e.target.setAttribute("aria-selected", true);

    if (e.target.dataset.slide === "0") {
      desktopPrevSlide();
    } else if (e.target.dataset.slide === "1") {
      desktopNextSlide();
    }
  });
  storySlides.forEach(function (s, i) {
    s.style.transform = "translateX(".concat(100 * i, "%)");
    i === 0 ? s.style.opacity = "1" : s.style.opacity = "0";
  });

  function desktopGoToSlide(s) {
    storySlides.forEach(function (el, i) {
      el.style.transform = "translateX(".concat(100 * (i - s), "%)");
      el.style.opacity = "1";
    });
    runBtnSliderAnimation();
  }

  function runBtnSliderAnimation() {
    storySlides.forEach(function (slide) {
      var resultX;
      var aboutBtn2 = document.querySelector(".story--2 button");

      function getSlideCoordX() {
        var result = window.innerWidth - btnAboutSection.offsetWidth;
        resultX = +window.getComputedStyle(slide, null).transform.match(/(-?[0-9\.]+)/g)[4];

        if (resultX > 0 && resultX < result) {
          btnAboutSection.style.opacity = "0";
          btnAboutSection.style.visibility = "hidden";
          aboutBtn2.style.opacity = "1";
          aboutBtn2.style.visibility = "visible";
          aboutBtn2.style.zIndex = "6"; // isPlaying = false;
        } else if (resultX < 0 && resultX > -btnAboutSection.offsetWidth) {
          btnAboutSection.style.opacity = "1";
          btnAboutSection.style.visibility = "visible";
        }

        if (resultX < 0 || resultX > 0 && resultX < window.innerWidth) {
          requestAnimationFrame(getSlideCoordX); // isPlaying === true;
        } //Menu button animation


        if (resultX > 0 && resultX < btnBig.offsetWidth * 2) {
          btnBig.style.opacity = "0";
          btnBig.style.transition = "none";
        } else if (resultX < -btnBig.offsetWidth * 2 && resultX > -window.innerWidth + btnBig.offsetWidth * 2) {
          btnBig.style.opacity = "1";
          btnBig.style.transition = "opacity 0.2s linear";
        }
      }

      getSlideCoordX();
    });
  }

  function desktopNextSlide() {
    currentSlide === storySlides.length - 1 ? currentSlide = 1 : currentSlide++;
    desktopGoToSlide(currentSlide);
    activeDot(currentSlide);
    ellipseTimlineDesktop.play();
    ellipseTimlineMobile.play();
  }

  function desktopPrevSlide() {
    currentSlide === 0 ? currentSlide = 0 : currentSlide--;
    desktopGoToSlide(currentSlide);
    activeDot(currentSlide);
    ellipseTimlineDesktop.pause();
    ellipseTimlineMobile.pause();
  }

  function activeDot(slide) {
    dots.forEach(function (dot) {
      dot.classList.remove("active");
      document.querySelector(".about-dot[data-slide=\"".concat(slide, "\"]")).classList.add("active");
    });
  } //ANCHOR About-page (part1) doodle text animation


  var aboutTimeline = gsap.timeline({
    delay: 0.5
  });
  aboutTimeline.from(btnAboutSection, {
    right: btnAboutSection.offsetWidth * -1,
    left: "inherit",
    duration: 0.5,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    delay: 1,
    clearProps: "all"
  }).from(".story__photo--person", {
    xPercent: 100,
    duration: 1,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic05_04,
    opacity: 0,
    clearProps: "all"
  });
  var aboutTimeline2 = gsap.timeline();
  aboutTimeline2.from(".story__photo--doodle1", {
    scale: 0,
    duration: 1.8,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic02,
    opacity: 0,
    clearProps: "all"
  });
  var aboutTimeline3 = gsap.timeline();
  aboutTimeline3.from(".story__photo--doodle1 text tspan", {
    text: {
      value: ""
    },
    duration: 2,
    ease: "none",
    stagger: {
      each: 2
    }
  });
  var aboutTimeline4 = gsap.timeline();
  aboutTimeline4.from(".story__photo--doodle2", {
    scale: 0,
    y: -100,
    duration: 1.8,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic02,
    opacity: 0,
    clearProps: "transform"
  });
  var aboutTimeline5 = gsap.timeline();
  aboutTimeline5.from(".story__photo--doodle2 text tspan", {
    text: {
      value: ""
    },
    duration: 2,
    ease: "none",
    stagger: {
      each: 2
    }
  });
  var aboutTimeline6 = gsap.timeline({
    paused: true
  });
  aboutTimeline6.from(".about-dot", {
    y: 200,
    duration: 1,
    stagger: 0.2,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    opacity: 0,
    clearProps: "all",
    onComplete: function onComplete() {
      // activeDot(0);
      activeTabindex();
    }
  }).from(btnBig, {
    transform: "translate3d(0, 0, 1px) scale(0)",
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.bounce_ease_out,
    duration: 1,
    clearProps: "transform"
  });
  var aboutTimeline7 = gsap.timeline({
    paused: true
  });
  aboutTimeline7.from("[data-num='0']", {
    x: -100,
    opacity: 0,
    ease: Back.easeOut.config(1.7),
    clearProps: "transform"
  }).from("[data-num='1']", {
    x: 100,
    opacity: 0,
    ease: Back.easeOut.config(1.7),
    clearProps: "transform",
    onComplete: function onComplete() {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.installMediaQueryWatcher)("(max-width: 568px)", function (matches) {
        if (matches) {
          // mobileGoToSlide(0);
          tabList.querySelector("[data-num='1']").addEventListener("click", nextSlide);
          tabList.querySelector("[data-num='0']").addEventListener("click", prevSlide);
          slides.forEach(function (slide) {
            slide.style.transition = "transform 0.3s ease";
          });
        } else {
          slides.forEach(function (slide) {
            slide.style.removeProperty("transform");
          });
        }
      });
    }
  }, "<0");

  function activeTabindex() {
    document.querySelectorAll(".about-dot").forEach(function (dot) {
      dot.setAttribute("tabindex", "0");
    });
  }

  var master;
  var speed = {
    t4: 4,
    t6: 6,
    t10: 10
  };

  if (window.innerWidth < "568") {
    master = gsap.timeline().add(aboutTimeline).add(aboutTimeline2.delay(-1)).add(aboutTimeline3.delay(-0.5)).add(aboutTimeline7.play()).add(aboutTimeline4.timeScale(speed.t4)).add(aboutTimeline6.play().delay(-0.5)).add(aboutTimeline5);
  } else {
    master = gsap.timeline().add(aboutTimeline).add(aboutTimeline2.delay(-1)).add(aboutTimeline3.delay(-0.5)).add(aboutTimeline4).add(aboutTimeline5).add(aboutTimeline6.play()).add(aboutTimeline7.play());
  }

  var ellipseTimlineDesktop = gsap.timeline({
    duration: 1,
    paused: true
  });
  var ellipseTimlineMobile = gsap.timeline({
    duration: 1,
    paused: true
  });
  var ellipseTimlineDesktopText = gsap.timeline({
    duration: 1,
    paused: true
  });
  ellipseTimlineDesktop.from(".ellipse1", {
    y: -400,
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }).from(".ellipse2", {
    y: -400,
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }, "<0.3").from(".ellipse3a", {
    y: -1.91,
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }, "<0.3").from(".ellipse3b", {
    y: -400,
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }, "<0").from(".ellipse4", {
    y: -400,
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }, "<0.4").from(".ellipse-text", {
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }, "<0.5");
  ellipseTimlineDesktopText.from(".ellipse-text tspan", {
    text: {
      value: ""
    },
    duration: 2,
    delay: -1,
    ease: "none",
    stagger: {
      each: 2
    }
  });
  ellipseTimlineMobile.from(".ellipse-mobile1a", {
    y: -390,
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }).from(".ellipse-mobile1b", {
    y: -410,
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }, "<0").from(".ellipse-mobile2a", {
    y: -380,
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }, "<0.3").from(".ellipse-mobile2b", {
    y: -410,
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }, "<0").from(".ellipse-mobile3a", {
    y: 5.48,
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }, "<0.3").from(".ellipse-mobile3b", {
    y: -410,
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }, "<0").from(".ellipse-mobile4", {
    y: -410,
    autoAlpha: 0,
    // opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1,
    onComplete: function onComplete() {
      addDoorAnimationOnResize();
    }
  }, "<0.4").from(".ellipse-mobile-text", {
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power1
  }, "<0.5").from(".ellipse-mobile-text tspan", {
    text: {
      value: ""
    },
    duration: 2,
    ease: "none",
    stagger: {
      each: 2
    }
  });
  ellipseTimlineDesktop.eventCallback("onComplete", function () {
    ellipseTimlineDesktopText.play(0);
  });

  function changeTextAnimationSpeed(e) {
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.installMediaQueryWatcher)("(max-width: 568px)", function (matches) {
      if (matches) {
        if (e.target.closest(".story__photo--doodle1")) {
          aboutTimeline3.timeScale(speed.t6).eventCallback("onComplete", function () {
            master = gsap.timeline().remove(aboutTimeline).remove(aboutTimeline2).add(aboutTimeline7).add(aboutTimeline4.timeScale(speed.t6)).add(aboutTimeline6.delay(-0.5)).add(aboutTimeline5);
          });
        } else if (e.target.closest(".story__photo--doodle2")) {
          aboutTimeline5.timeScale(speed.t6);
        } else if (e.target.className.includes("skip-text-animation")) {
          aboutTimeline3.timeScale(speed.t6).eventCallback("onComplete", function () {
            master = gsap.timeline().remove(aboutTimeline).remove(aboutTimeline2).add(aboutTimeline7).add(aboutTimeline4.timeScale(speed.t6)).add(aboutTimeline6.delay(-0.5)).add(aboutTimeline5);
          });
          aboutTimeline5.timeScale(speed.t6);
          ellipseTimlineMobile.timeScale(speed.t10);
        }
      } else {
        if (e.target.closest(".story__photo--doodle1")) {
          aboutTimeline3.timeScale(speed.t6).eventCallback("onComplete", function () {
            master = gsap.timeline().remove(aboutTimeline).remove(aboutTimeline2).add(aboutTimeline4).add(aboutTimeline5).add(aboutTimeline6).add(aboutTimeline7);
          });
        } else if (e.target.closest(".story__photo--doodle2")) {
          aboutTimeline5.timeScale(speed.t6).eventCallback("onComplete", function () {
            master = gsap.timeline().remove(aboutTimeline).remove(aboutTimeline2).remove(aboutTimeline3).remove(aboutTimeline4).add(aboutTimeline6).add(aboutTimeline7);
          });
        } else if (e.target.className.includes("skip-text-animation")) {
          aboutTimeline3.timeScale(speed.t10).eventCallback("onComplete", function () {
            master = gsap.timeline().remove(aboutTimeline).remove(aboutTimeline2).add(aboutTimeline4).add(aboutTimeline5).add(aboutTimeline6).add(aboutTimeline7);
          });
          aboutTimeline5.timeScale(speed.t10).eventCallback("onComplete", function () {
            master = gsap.timeline().remove(aboutTimeline).remove(aboutTimeline2).remove(aboutTimeline3).remove(aboutTimeline4).add(aboutTimeline6).add(aboutTimeline7);
          });
          ellipseTimlineDesktopText.timeScale(speed.t10);
        }
      }
    });
  }

  slides.forEach(function (doodle) {
    doodle.addEventListener("click", changeTextAnimationSpeed);
  });
  document.querySelector(".face-doodle-desktop").addEventListener("click", function (e) {
    ellipseTimlineDesktopText.timeScale(speed.t10);
  });
  document.querySelector(".face-doodle-mobile").addEventListener("click", function (e) {
    ellipseTimlineMobile.timeScale(speed.t10);
  });
  document.querySelector(".skip-text-animation").addEventListener("click", changeTextAnimationSpeed); //About section part 2 (IT-door) vapor animation run

  var doorElements = gsap.utils.toArray(".door-element");
  vaporAnimationDuration = 1.5;
  vaporMinValueX = -10;
  vaporMaxValueX = 10;
  vaporValueY = 15;
  vaporAnimation(doorElements);
  window.addEventListener("resize", addDoorAnimationOnResize);
} //ANCHOR Door animation


function addDoorAnimationOnResize() {
  console.log("addDoorAnimationOnResize() started");
  var doodle = document.querySelector(".face-doodle-mobile .text-box");
  var door = document.querySelector(".story--2__door svg");
  var textIT = document.querySelectorAll(".story--2__door svg .it");
  var doodleCenterCoordY = doodle.getBoundingClientRect().top + doodle.getBoundingClientRect().height / 2;
  var doorCenterCoordY = door.getBoundingClientRect().top + door.getBoundingClientRect().height / 2;

  if (doodleCenterCoordY > doorCenterCoordY && doodleCenterCoordY > doorCenterCoordY + doodle.getBoundingClientRect().height / 2) {
    doodle.style.opacity = "1";
    textIT.forEach(function (text) {
      return text.style.fill = "#1d1d1b";
    });
  } else if (doodleCenterCoordY < doorCenterCoordY - doorCenterCoordY * 0.1 - doodle.getBoundingClientRect().height / 2) {
    doodle.style.opacity = "1";
    textIT.forEach(function (text) {
      return text.style.fill = "#1d1d1b";
    });
  } else {
    doodle.style.opacity = "0.8";
    doodle.style.transition = "opacity 0.3s linear";
    textIT.forEach(function (text) {
      return text.style.fill = "#ee7950";
    });
  }
}

function contactPageInit() {
  console.log("contactPageInit() started");
  var coffee = document.querySelector(".coffee");
  var flower = document.querySelector(".flower");
  var laptop = document.querySelector(".contact__laptop");
  var laptopDots = document.querySelector(".contact-dots");
  var laptopElements = document.querySelectorAll(".laptop-element");
  var contactPageAnimationRun = gsap.timeline({
    delay: 0.5
  });
  contactPageAnimationRun.from(".top-nav--contact", {
    xPercent: 100,
    autoAlpha: 0,
    duration: 1,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back
  }, "<0.6").from(laptop, {
    yPercent: 100,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic05_04,
    duration: 1
  }).from(laptopDots, {
    scale: 0,
    autoAlpha: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    duration: 0.5,
    clearProps: "all"
  }, "<0.5").from(flower, {
    y: -900,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    duration: 0.4,
    clearProps: "all"
  }).from(coffee, {
    x: -500,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    duration: 0.4,
    clearProps: "all",
    onComplete: function onComplete() {
      iconsTimeline.play(0.5);
      laptopElementsTimeline.play();
    }
  }).from(".paper", {
    x: 200,
    autoAlpha: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    duration: 0.3
  }).from(".pen", {
    x: 200,
    autoAlpha: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    duration: 0.3
  }).from(".btn-big", {
    transform: "translate3d(0, 0, 1px) scale(0)",
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.bounce_ease_out,
    duration: 1,
    clearProps: "transform"
  }).from(".laptop-text > *, .laptop-text > * > *, .laptop-mail-arrow, .laptop-mail", {
    scale: 1.2,
    autoAlpha: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic02,
    duration: 0.6,
    stagger: {
      each: 0.1
    },
    clearProps: "all",
    onComplete: function onComplete() {
      mailWiggle.play();
    }
  });
  var mailWiggle = gsap.timeline({
    repeat: -1,
    repeatDelay: 2,
    paused: true
  });
  mailWiggle.set(".laptop-mail", {
    transformOrigin: "60% 60%"
  }).to(".laptop-mail", 0.05, {
    rotation: 30
  }).to(".laptop-mail", 0.05, {
    rotation: 0,
    xPercent: 0,
    yPercent: 0
  }).to(".laptop-mail", 0.05, {
    rotation: -30
  }).to(".laptop-mail", 0.05, {
    rotation: 0,
    xPercent: 0,
    yPercent: 0
  }).to(".laptop-mail", 0.05, {
    rotation: 30
  }).to(".laptop-mail", 0.05, {
    rotation: 0,
    xPercent: 0,
    yPercent: 0
  }).to(".laptop-mail", 0.05, {
    rotation: -30
  }).to(".laptop-mail", 0.05, {
    rotation: 0,
    xPercent: 0,
    yPercent: 0
  }).to(".laptop-mail", 0.05, {
    rotation: 30
  }).to(".laptop-mail", 0.05, {
    rotation: 0,
    xPercent: 0,
    yPercent: 0
  }).to(".laptop-mail", 0.05, {
    rotation: -30
  }).to(".laptop-mail", 0.05, {
    rotation: 0,
    xPercent: 0,
    yPercent: 0
  });
  var iconsTimeline = gsap.timeline({
    paused: true
  });
  iconsTimeline.from(".social__item", {
    x: 500,
    rotation: 360,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    stagger: {
      each: 0.2
    },
    duration: 1
  }, "<1");
  var laptopElementsTimeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 3,
    clearProps: "all"
  });
  laptopElementsTimeline.to(".laptop-element--6", {
    opacity: 1,
    scale: 0.95,
    duration: 0.55,
    ease: "none"
  }).to(".laptop-element--7", {
    opacity: 1,
    scale: 0.95,
    rotation: 0.5,
    duration: 0.55,
    ease: "none"
  }, "+=0.05").to(".laptop-element--6", {
    opacity: 0
  }, "<-0.05").to(".laptop-element--7", {
    opacity: 0,
    rotation: 0.5,
    clearProps: "opacity"
  }, "<-0.02").from(laptopElements, {
    keyframes: {
      "0%": {
        opacity: 0
      },
      "77%": {
        opacity: 0.9
      },
      "100%": {
        opacity: 0
      }
    },
    scale: 0.95,
    stagger: {
      each: 0.2,
      from: "random"
    },
    duration: 0.55,
    ease: "none"
  }, "<-0.07"); //Coffee vapor animation run

  var coffeeVapor = gsap.utils.toArray(".vapor");
  vaporAnimationDuration = 4;
  vaporMinValueX = 0;
  vaporMaxValueX = 0;
  vaporValueY = 15;
  vaporAnimation(coffeeVapor); //ANCHOR Social icons animation

  var socialItems = document.querySelectorAll(".social__item");
  socialItems.forEach(function (item) {
    var socialWindow = {
      w: item.offsetWidth,
      h: item.offsetHeight
    };
    var leftTop = {
      x: 0,
      y: 0
    };
    var rightTop = {
      x: socialWindow.w,
      y: 0
    };
    var middleTop = {
      x: socialWindow.w / 2,
      y: 0
    };
    var socialActive = false;
    var d = "";

    var socialAnimate = function socialAnimate() {
      d = "\n      M ".concat(socialWindow.w, ", 0\n      L 0, 0\n      L ").concat(leftTop.x, " ").concat(leftTop.y, "\n      Q ").concat(middleTop.x, " ").concat(middleTop.y, "\n      ").concat(rightTop.x, " ").concat(rightTop.y, "\n      ");
      item.querySelector(".social__svg path").setAttribute("d", d);
      requestAnimationFrame(socialAnimate);
    };

    socialAnimate();
    item.addEventListener("mouseover", function () {
      socialActive = !socialActive;
      gsap.to([leftTop, rightTop], {
        y: socialActive ? socialWindow.h : 0,
        ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power3
      });
      gsap.to(middleTop, {
        y: socialActive ? socialWindow.h : 0,
        ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power3,
        delay: 0.1
      });
    });
    item.addEventListener("mouseout", function () {
      socialActive = false;
      gsap.to([leftTop, rightTop], {
        y: socialActive ? socialWindow.h : 0,
        ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power3
      });
      gsap.to(middleTop, {
        y: socialActive ? socialWindow.h : 0,
        ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power3,
        delay: 0.1
      });
    });

    var handleResize = function handleResize() {
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



/***/ }),

/***/ "./js/barba.js":
/*!*********************!*\
  !*** ./js/barba.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ "./scss/main.scss");
/* harmony import */ var _barba_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @barba/core */ "./node_modules/@barba/core/dist/barba.umd.js");
/* harmony import */ var _barba_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_barba_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./js/index.js");
/* harmony import */ var _about__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./about */ "./js/about.js");
/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cursor */ "./js/cursor.js");




 // import { timelineLetters } from "./animations";
// const btnBig = document.querySelector(".btn-big");

function animationEnter(container) {
  var cornerBox = container.querySelector("#wrapper__corner-box");
  var timelineEnter = gsap.timeline({
    duration: 0.5
  }); // gsap.set("#corner-button svg g g path", {
  //   autoAlpha: 0,
  // });

  timelineEnter.set("#corner-button svg g g path", {
    autoAlpha: 0
  }).set("#corner-button svg", {
    autoAlpha: 0
  }).set(cornerBox, {
    pointerEvents: "none",
    cursor: "none"
  }).to(cornerBox, {
    scale: 1,
    transformOrigin: "right bottom",
    duration: 1,
    onComplete: function onComplete() {
      // import("./about.js").then(({ cornerArrowHoverEffect }) => {
      //   cornerArrowHoverEffect();
      // });
      (0,_about__WEBPACK_IMPORTED_MODULE_3__.cornerArrowHoverEffect)();
      timelineEnter.to(["#corner-button svg, .contact-elements"], {
        autoAlpha: 1,
        duration: 1
      }).to(cornerBox, {
        pointerEvents: "auto",
        cursor: "auto"
      });
      ["mouseenter", "mousemove", "focusin"].forEach(function (event) {
        container.addEventListener(event, _about__WEBPACK_IMPORTED_MODULE_3__.controlHoverOnCornerButton);
      });
    }
  }).from(".corner-border path", {
    strokeWidth: "0.4"
  });
  return timelineEnter;
}

function animationLeave(container, done) {
  var cornerBox = container.querySelector("#wrapper__corner-box");
  var timelineLeave = gsap.timeline({
    duration: 0.1
  });
  ["mouseenter", "mousemove"].forEach(function (event) {
    container.removeEventListener(event, _about__WEBPACK_IMPORTED_MODULE_3__.controlHoverOnCornerButton);
  });
  timelineLeave.set("#corner-button svg", {
    autoAlpha: 0
  }).to(cornerBox, {
    scale: 170,
    pointerEvents: "none",
    cursor: "none",
    duration: 1,
    transformOrigin: "right bottom",
    onComplete: function onComplete() {
      return done();
    }
  }).to(".corner-border path", {
    strokeWidth: "0.4"
  }, "<0");
  return timelineLeave;
}

_barba_core__WEBPACK_IMPORTED_MODULE_1___default().init({
  debug: true,
  transitions: [{
    name: "default-transition",
    once: function once(data) {
      animationEnter(data.next.container);
      console.log("once");
    },
    leave: function leave(data) {
      var done = this.async();
      animationLeave(data.current.container, done);
      console.log("leaving");
    },
    enter: function enter(data) {
      console.log("entering");
      animationEnter(data.next.container);
    }
  }],
  views: [{
    namespace: "home-page",
    beforeEnter: function beforeEnter() {
      window.addEventListener("resize", _index__WEBPACK_IMPORTED_MODULE_2__.doodlePositionResize);
      window.removeEventListener("resize", _about__WEBPACK_IMPORTED_MODULE_3__.addDoorAnimationOnResize);
    },
    afterEnter: function afterEnter() {
      // import("./index").then(({ homeInit }) => {
      //   homeInit();
      // });
      (0,_index__WEBPACK_IMPORTED_MODULE_2__.homeInit)();
    }
  }, {
    namespace: "about-page",
    beforeEnter: function beforeEnter() {
      window.removeEventListener("resize", _index__WEBPACK_IMPORTED_MODULE_2__.doodlePositionResize);
    },
    afterEnter: function afterEnter() {
      // import("./about.js").then(({ aboutAnimationInit }) => {
      //   aboutAnimationInit();
      // });
      (0,_about__WEBPACK_IMPORTED_MODULE_3__.aboutAnimationInit)();
    }
  }, {
    namespace: "skills-page",
    beforeEnter: function beforeEnter() {
      window.removeEventListener("resize", _index__WEBPACK_IMPORTED_MODULE_2__.doodlePositionResize);
      window.removeEventListener("resize", _about__WEBPACK_IMPORTED_MODULE_3__.addDoorAnimationOnResize);
    },
    afterEnter: function afterEnter() {
      // import("./about.js").then(({ pageSkillsInit }) => {
      //   pageSkillsInit();
      // });
      (0,_about__WEBPACK_IMPORTED_MODULE_3__.pageSkillsInit)();
    }
  }, {
    namespace: "contact-page",
    beforeEnter: function beforeEnter() {
      window.removeEventListener("resize", _index__WEBPACK_IMPORTED_MODULE_2__.doodlePositionResize);
    },
    afterEnter: function afterEnter() {
      // import("./about.js").then(({ contactPageInit }) => {
      //   contactPageInit();
      // });
      (0,_about__WEBPACK_IMPORTED_MODULE_3__.contactPageInit)();
    }
  }]
});
_barba_core__WEBPACK_IMPORTED_MODULE_1___default().hooks.beforeEnter(function (_ref) {
  var current = _ref.current,
      next = _ref.next;
  var beforeEnterPromiseAll = new Promise(function (resolve) {
    resolve();
  });
  return beforeEnterPromiseAll;
});
_barba_core__WEBPACK_IMPORTED_MODULE_1___default().hooks.enter(function (_ref2) {
  var current = _ref2.current,
      next = _ref2.next;
  var enterPromiseAll = new Promise(function (resolve) {
    current.container.remove();
    resolve();
  });
  return enterPromiseAll;
});
_barba_core__WEBPACK_IMPORTED_MODULE_1___default().hooks.afterEnter(function (_ref3) {
  var current = _ref3.current,
      next = _ref3.next;
  var afterEnterPromiseAll = new Promise(function (resolve) {
    // import("./cursor").then(({ addCustomCursor }) => {
    //   addCustomCursor();
    // });
    (0,_cursor__WEBPACK_IMPORTED_MODULE_4__.addCustomCursor)(); // import("./index.js").then(({ buttonFunctionality }) => {
    //   buttonFunctionality();
    // });

    (0,_index__WEBPACK_IMPORTED_MODULE_2__.buttonFunctionality)(); // timelineLetters.reversed()
    //   ? timelineLetters.play(0)
    //   : timelineLetters.reverse();
    // timelineLetters.play(0);
    // timelineLetters.play(0);

    resolve();
  });
  return afterEnterPromiseAll;
});

var preloadImages = function preloadImages() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "svg";
  return new Promise(function (resolve) {
    imagesLoaded(document.querySelectorAll(selector), resolve); // imagesLoaded(
    //   "#wrapper",
    //   {
    //     background: ".color-game__item",
    //   },
    //   function (imgLoad) {
    //     return imgLoad;
    //     // console.log(imgLoad);
    //   }
    // );
    // console.log(document.querySelectorAll(selector));
  });
};

preloadImages().then(function () {
  document.body.classList.remove("loading");
});
var hiddenTime = document.visibilityState === "hidden" ? 0 : Infinity;
document.addEventListener("visibilitychange", function (event) {
  hiddenTime = Math.min(hiddenTime, event.timeStamp);
}, {
  once: true
});
new PerformanceObserver(function (entryList) {
  entryList.getEntries().forEach(function (entry) {
    if (entry.startTime < hiddenTime) {
      // This entry occurred before the page was hidden
      console.log(entry);
    }
  });
}).observe({
  type: "largest-contentful-paint",
  buffered: true
}); // window.addEventListener("DOMContentLoaded", () => {
//   document.body.classList.add("first-load");
//   transitionCheckupOutside();
//   transitionCheckupInside();
//   pageTransitions();
// });
// function createFlipCornerAnimation() {
//   timelineLetters.play();
// }
// createFlipCornerAnimation();
// function pageTransitions() {
//   barba.hooks.beforeEnter((data) => {
//     console.log(data);
//     let beforeEnterPromiseAll = new Promise(function (resolve) {
//       if (!document.body.classList.contains("first-load")) {
//         document.body.classList.add("" + data.next.namespace);
//         document.body.classList.remove("" + data.current.namespace);
//       }
//       resolve();
//     });
//     return beforeEnterPromiseAll;
//   });
//   barba.hooks.enter(({ current, next }) => {
//     let enterPromiseAll = new Promise(function (resolve) {
//       current.container.remove();
//       resolve();
//     });
//     return enterPromiseAll;
//   });
//   barba.hooks.afterEnter((data) => {
//     let afterEnterPromiseAll = new Promise(function (resolve) {
//       if (!document.body.classList.contains("first-load")) {
//         initRefireCallbacks();
//         document.body.classList.remove("is-transitioning");
//       }
//       resolve();
//     });
//     return afterEnterPromiseAll;
//   });
//   barba.init({
//     prevent: ({ el }) =>
//       el.classList && el.classList.contains("prevent-transition"),
//     prevent: ({ event }) => {
//       if (event.type === "click") {
//         if (barba.transitions.isRunning) {
//           event.preventDefault();
//           return true;
//         }
//       }
//     },
//     cacheIgnore: false,
//     prefetchIgnore: false,
//     timeout: 5000,
//     debug: true,
//     transitions: [
//       {
//         name: "default",
//         beforeOnce(current, next, trigger) {},
//         once(current, next, trigger) {},
//         afterOnce(current, next, trigger) {},
//         beforeLeave(current, next, trigger) {},
//         leave(current, next, trigger) {
//           let leavePromise = new Promise(function (resolve) {
//             let outTransition = gsap.timeline({
//               force3D: true,
//             });
//             const cornerBox = document.querySelector("#wrapper__corner-box");
//             outTransition
//               .set("#corner-button svg", {
//                 autoAlpha: 0,
//               })
//               .to(cornerBox, {
//                 scale: 170,
//                 pointerEvents: "none",
//                 cursor: "none",
//                 duration: 1,
//                 transformOrigin: "right bottom",
//               })
//               .to(
//                 ".corner-border path",
//                 {
//                   strokeWidth: "0.5",
//                 },
//                 "<0"
//               )
//               .then(() => {
//                 resolve();
//               });
//           });
//           return leavePromise;
//         },
//         afterLeave(current, next, trigger) {},
//         beforeEnter(current, next, trigger) {},
//         enter(current, next, trigger) {},
//         afterEnter(current, next, trigger) {
//           let afterEnterPromise = new Promise(function (resolve) {
//             let inTransition = gsap.timeline({ force3D: true });
//             const cornerBox = document.querySelector("#wrapper__corner-box");
//             inTransition
//               .set("#corner-button svg g g path", {
//                 autoAlpha: 0,
//               })
//               .set("#corner-button svg", {
//                 autoAlpha: 0,
//               })
//               .set(cornerBox, {
//                 pointerEvents: "none",
//                 cursor: "none",
//               })
//               .to(cornerBox, {
//                 scale: 1,
//                 transformOrigin: "right bottom",
//                 duration: 1,
//                 onComplete: () => {
//                   // import("./about.js").then(({ cornerArrowHoverEffect }) => {
//                   //   cornerArrowHoverEffect();
//                   // });
//                   cornerArrowHoverEffect();
//                   inTransition
//                     .to(["#corner-button svg, .contact-elements"], {
//                       autoAlpha: 1,
//                       duration: 1,
//                     })
//                     .to(cornerBox, {
//                       pointerEvents: "auto",
//                       cursor: "auto",
//                     });
//                   ["mouseenter", "mousemove", "focusin"].forEach((event) => {
//                     document.addEventListener(
//                       event,
//                       controlHoverOnCornerButton
//                     );
//                   });
//                 },
//               })
//               .from(".corner-border path", {
//                 strokeWidth: "0.5",
//                 onComplete: () => {
//                   resolve();
//                 },
//               });
//           });
//           return afterEnterPromise;
//         },
//       },
//     ],
//     views: [
//       {
//         namespace: "home-page",
//         beforeLeave(data) {
//           timelineLetters.pause(0);
//         },
//         afterLeave(data) {},
//         beforeEnter(data) {},
//         afterEnter(data) {
//           homeInit();
//         },
//       },
//       {
//         namespace: "about-page",
//         beforeLeave(data) {
//           // timelineLetters.pause(0);
//         },
//         afterLeave(data) {},
//         beforeEnter(data) {},
//         afterEnter(data) {
//           aboutAnimationInit();
//         },
//       },
//       {
//         namespace: "skills-page",
//         beforeLeave(data) {
//           // timelineLetters.pause(0);
//         },
//         afterLeave(data) {},
//         beforeEnter(data) {},
//         afterEnter(data) {
//           pageSkillsInit();
//         },
//       },
//       {
//         namespace: "contact-page",
//         beforeLeave(data) {
//           // timelineLetters.pause(0);
//         },
//         afterLeave(data) {},
//         beforeEnter(data) {},
//         afterEnter(data) {
//           contactPageInit();
//         },
//       },
//     ],
//   });
// }
// function transitionCheckupOutside() {
//   let links = document.querySelectorAll('a[href]:not([target="_blank"])');
//   let cbk = function (e) {
//     if (!this.closest("main").length > 0) {
//       if (e.currentTarget.href === window.location.href) {
//         e.preventDefault();
//         e.stopPropagation();
//       } else {
//         if (document.body.classList.contains("first-load")) {
//           document.body.classList.remove("first-load");
//         }
//       }
//     }
//   };
//   for (let i = 0; i < links.length; i++) {
//     links[i].addEventListener("click", cbk);
//   }
// }
// function transitionCheckupInside() {
//   let links = document.querySelectorAll('main a[href]:not([target="_blank"])');
//   let cbk = function (e) {
//     if (e.currentTarget.href === window.location.href) {
//       e.preventDefault();
//       e.stopPropagation();
//     } else {
//       if (document.body.classList.contains("first-load")) {
//         document.body.classList.remove("first-load");
//       }
//     }
//   };
//   for (let i = 0; i < links.length; i++) {
//     links[i].addEventListener("click", cbk);
//   }
// }
// function initRefireCallbacks() {
//   transitionCheckupInside();
// }

/***/ }),

/***/ "./js/cursor.js":
/*!**********************!*\
  !*** ./js/cursor.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MagnetLogo": () => (/* binding */ MagnetLogo),
/* harmony export */   "addCustomCursor": () => (/* binding */ addCustomCursor)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

//ANCHOR Cursor

var mouse = {
  x: 0,
  y: 0
}; // window.addEventListener("mousemove", function (ev) {
//   mouse = getMousePosition(ev);
// });

var Cursor = /*#__PURE__*/function () {
  function Cursor(item) {
    var _this = this;

    _classCallCheck(this, Cursor);

    this.DOM = {
      item: item
    };
    this.DOM.item.style.opacity = 0;
    this.bounds = this.DOM.item.getBoundingClientRect();
    this.renderStyles = {
      tx: {
        previous: 0,
        current: 0,
        amount: 0.2
      },
      ty: {
        previous: 0,
        current: 0,
        amount: 0.2
      },
      scale: {
        previous: 1,
        current: 1,
        amount: 0.15
      },
      opacity: {
        previous: 1,
        current: 1,
        amount: 0.1
      }
    };

    this.onMouseMove = function () {
      _this.renderStyles.tx.previous = _this.renderStyles.tx.current = mouse.x - _this.bounds.width / 2;
      _this.renderStyles.ty.previous = _this.renderStyles.ty.current = mouse.y - _this.bounds.height / 2;
      gsap.to(_this.DOM.item, {
        duration: 0.85,
        opacity: 1,
        ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power3_ease_out
      });
      requestAnimationFrame(function () {
        return _this.render();
      });
      window.removeEventListener("mousemove", _this.onMouseMove);
    };

    window.addEventListener("mousemove", this.onMouseMove);
    if (this.DOM.item === null) return;
  }

  _createClass(Cursor, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      this.renderStyles["tx"].current = mouse.x - this.bounds.width / 2;
      this.renderStyles["ty"].current = mouse.y - this.bounds.height / 2;

      for (var key in this.renderStyles) {
        this.renderStyles[key].previous = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.lerp)(this.renderStyles[key].previous, this.renderStyles[key].current, this.renderStyles[key].amount);
      }

      this.DOM.item.style.transform = "translate(".concat(this.renderStyles["tx"].previous, "px, ").concat(this.renderStyles["ty"].previous, "px) scale(").concat(this.renderStyles["scale"].previous, ")");
      this.DOM.item.style.opacity = this.renderStyles["opacity"].previous;
      requestAnimationFrame(function () {
        return _this2.render();
      });
    }
  }, {
    key: "enter",
    value: function enter() {
      this.renderStyles["scale"].current = 2.5;
      this.renderStyles["opacity"].current = 0.5;
    }
  }, {
    key: "leave",
    value: function leave() {
      this.renderStyles["scale"].current = 1;
      this.renderStyles["opacity"].current = 1;
    }
  }]);

  return Cursor;
}();

var MagnetLogo = /*#__PURE__*/function () {
  function MagnetLogo(item) {
    var _this3 = this;

    _classCallCheck(this, MagnetLogo);

    this.DOM = {
      item: item
    };
    this.renderStyles = {
      tx: {
        previous: 0,
        current: 0,
        amount: 0.1
      },
      ty: {
        previous: 0,
        current: 0,
        amount: 0.1
      },
      scale: {
        previous: 1,
        current: 1,
        amount: 0.2
      }
    };
    this.state = {
      hover: false
    };
    if (this.DOM.item === null) return;
    this.initEvent();
    this.calculateSizePosition();
    requestAnimationFrame(function () {
      return _this3.render();
    });
  }

  _createClass(MagnetLogo, [{
    key: "calculateSizePosition",
    value: function calculateSizePosition() {
      this.rect = this.DOM.item.getBoundingClientRect();
      this.distanceToTrigger = this.rect.width * 1.9;
    }
  }, {
    key: "initEvent",
    value: function initEvent() {
      var _this4 = this;

      this.onResize = function () {
        return _this4.calculateSizePosition();
      };

      window.addEventListener("resize", this.onResize);
      window.addEventListener("load", this.onResize);
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var distanceMouseElement = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.distance)(mouse.x + window.scrollX, mouse.y + window.scrollY, this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height / 2);
      var x = 0;
      var y = 0;

      if (distanceMouseElement < this.distanceToTrigger) {
        x = (mouse.x + window.scrollX - (this.rect.left + this.rect.width / 2)) * 0.3;
        y = (mouse.y + window.scrollY - (this.rect.top + this.rect.height / 2)) * 0.3;

        if (!this.state.hover) {
          this.enter();
        }
      } else if (this.state.hover) {
        this.leave();
      }

      this.renderStyles["tx"].current = x;
      this.renderStyles["ty"].current = y;

      for (var key in this.renderStyles) {
        this.renderStyles[key].previous = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.lerp)(this.renderStyles[key].previous, this.renderStyles[key].current, this.renderStyles[key].amount);
      }

      this.DOM.item.style.transform = "translate(".concat(this.renderStyles["tx"].previous, "px, ").concat(this.renderStyles["ty"].previous, "px) scale(").concat(this.renderStyles["scale"].previous, ")");
      requestAnimationFrame(function () {
        return _this5.render();
      });
    }
  }, {
    key: "enter",
    value: function enter() {
      this.state.hover = true;
      this.renderStyles["scale"].current = 1.3;
      gsap.killTweensOf(this.DOM.item);
      gsap.to(this.DOM.item, {
        duration: 4,
        startAt: {
          yPercent: 75
        },
        yPercent: 0,
        ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power3_ease_out
      });
    }
  }, {
    key: "leave",
    value: function leave() {
      this.state.hover = false;
      this.renderStyles["scale"].current = 1; // gsap.killTweensOf(this.DOM.item);

      gsap.to(this.DOM.item, {
        ease: "power3.easeOut",
        yPercent: -75
      });
    }
  }]);

  return MagnetLogo;
}();

function addCustomCursor() {
  var cursor = new Cursor(document.querySelector(".cursor"));
  document.querySelectorAll(".nav__link, [data-hover-star]").forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      return cursor.enter();
    });
    el.addEventListener("mouseleave", function () {
      return cursor.leave();
    });
  });
  window.addEventListener("mousemove", function (ev) {
    mouse = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getMousePosition)(ev);
  });
}



/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buttonFunctionality": () => (/* binding */ buttonFunctionality),
/* harmony export */   "doodlePositionResize": () => (/* binding */ doodlePositionResize),
/* harmony export */   "homeInit": () => (/* binding */ homeInit)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/utils.js");
/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cursor */ "./js/cursor.js");
 // import "../scss/main.scss";


 // import FontFaceObserver from "./../node_modules/fontfaceobserver/fontfaceobserver";
// import { animateTextHoverRun, animateTextHoverStop } from "./animations";

function buttonFunctionality() {
  //ANCHOR Button
  var btnBig = document.querySelector(".btn-big");
  var btnSmall = document.querySelector(".btn-small");
  var menuPage = document.querySelector(".menu");
  var menuDoodle = document.querySelectorAll(".menu__box path, .menu__box polygon");
  var menuNavDoodle = document.querySelector(".menu__img img");
  var menuBtnClose = document.querySelector(".menu-btn-close");
  var menuLinks = document.querySelectorAll(".nav__item");
  var isOpen = false;
  var mediaQueryTransformX = -16;
  var mediaQueryTransformY = 5;
  var deltaX = window.innerWidth > 568 ? mediaQueryTransformX : 0;
  var deltaY = window.innerWidth > 568 ? mediaQueryTransformY : 0;
  btnBig.addEventListener("click", function () {
    btnBig.setAttribute("aria-expanded", false);
    btnSmall.setAttribute("aria-expanded", true);
    document.querySelectorAll('[data-tabindex="0"]').forEach(function (tab) {
      tab.setAttribute("data-tabindex", "-1");
      tab.setAttribute("tabindex", "-1");
    });
    menuPage.querySelectorAll('[tabindex="-1"]').forEach(function (tab) {
      tab.setAttribute("tabindex", "0");
    });
    document.querySelectorAll(".about-dot").forEach(function (dot) {
      dot.setAttribute("tabindex", "-1");
    });
    menuTransitionRun();
  });
  btnSmall.addEventListener("click", function () {
    btnSmall.setAttribute("aria-expanded", false);
    btnBig.setAttribute("aria-expanded", true);
    menuTransitionStop();
  }); //ANCHOR Animations
  //Letters animation

  btnBig.addEventListener("mouseenter", animateTextHoverRun);
  btnBig.addEventListener("focus", animateTextHoverRun);
  btnBig.addEventListener("mouseleave", animateTextHoverStop);
  btnBig.addEventListener("focusout", animateTextHoverStop);
  checkMediaQuery();
  var timelineLetters = gsap.timeline({
    // repeat: 0,
    // yoyo: false,
    paused: true
  });
  timelineLetters.to(".text-cls-1", {
    x: -10,
    duration: 0.2,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back_1_7,
    stagger: 0.05,
    opacity: 1
  });

  function animateTextHoverRun() {
    return timelineLetters.play();
  }

  function animateTextHoverStop() {
    return timelineLetters.reverse();
  } //Menu animation
  //Menu transition


  var tlMenuTransition = gsap.timeline({
    paused: true
  });
  tlMenuTransition.set(".menu__box img", {
    xPercent: -50,
    yPercent: -50
  }).to(menuPage, {
    // height: "calc(100vh - var(--padding-container) * 2 + 1px)",
    y: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.bounce_out
  }).from(menuDoodle, {
    y: -600,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.bounce_out,
    opacity: 0,
    duration: 0.3,
    stagger: {
      each: 0.001,
      from: "random"
    }
  }, "<0.1").from(".menu__box img", {
    autoAlpha: 0,
    scale: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic03,
    clearProps: "transform"
  }).from(menuNavDoodle, {
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic03,
    duration: 1.2,
    transform: "translate3d(".concat(deltaX, "vw, ").concat(deltaY, "vw, 1px) scale(0)") //fix firefox bug

  }, "<0.3").from(menuLinks, {
    y: -60,
    opacity: 0,
    stagger: 0.2,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back_1_7
  }, "<0.6").from(".menu__star", {
    opacity: 0,
    scale: 0,
    stagger: 0.1,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic03
  }, "<0.5");

  function checkMediaQuery() {
    if (window.matchMedia("(max-width: 568px)").matches) {
      menuNavDoodle.style.transform = "translate3d(0, 0, 1px) scale(1)";
    } else {
      menuNavDoodle.style.transform = "translate3d(-16vw, 5vw, 15px) scale(1)";
    }
  }

  window.addEventListener("resize", checkMediaQuery);

  function menuTransitionRun() {
    if (window.matchMedia("(max-width: 568px)").matches) {
      gsap.to(menuNavDoodle, {
        transform: "translate3d(0, 0, 2px) scale(1)"
      });
      gsap.from(menuBtnClose, {
        y: -100,
        opacity: 0,
        duration: 0.6,
        delay: 2.8,
        ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back_1_7
      } // "+=1"
      );
    } else {
      gsap.to(menuNavDoodle, {
        transform: "translate3d(-16vw, 5vw, 10px) scale(1)"
      });
      gsap.from(menuBtnClose, {
        x: -100,
        opacity: 0,
        duration: 0.6,
        delay: 2.8,
        ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back_1_7
      } // "+=1.5"
      );
    }

    setTimeout(function () {
      tlMenuTransition.timeScale(0.8).play(0);
      isOpen = true;
    }, 100);
  }

  function menuTransitionStop(e) {
    var closeMenu = gsap.to(menuPage, {
      // height: 0,
      yPercent: -100,
      ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.power4,
      duration: 0.8,
      paused: true,
      clearProps: "transform"
    });
    isOpen = false;

    if (e.target.getAttribute("href")) {
      closeMenu.pause();
      e.target.classList.add("inactive-cursor");
    } else {
      closeMenu.play(0); // tlMenuTransition.reverse();
      // tlMenuTransition.pause(0).reversed(true);
      // gsap.to(".menu-btn-close", {
      //   x: -100,
      //   y: -100,
      //   clearProps: "x, y",
      // });
    }

    btnBig.setAttribute("aria-expanded", true);
    btnSmall.setAttribute("aria-expanded", false);
    document.querySelectorAll('[data-tabindex="-1"]').forEach(function (tab) {
      tab.setAttribute("data-tabindex", "0");
      tab.setAttribute("tabindex", "0");
    });
    menuPage.querySelectorAll('[tabindex="0"]').forEach(function (tab) {
      tab.setAttribute("tabindex", "-1");
    });
    document.querySelectorAll(".about-dot").forEach(function (dot) {
      dot.setAttribute("tabindex", "0");
    });
  }

  menuPage.addEventListener("click", menuTransitionStop);
}

function homeInit() {
  var btnBig = document.querySelector(".btn-big"); // const btnSmall = document.querySelector(".btn-small");
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

  var timelineGlasses = gsap.timeline();
  timelineGlasses.fromTo(".glass", {
    x: -25,
    y: 8.5,
    opacity: 0.8
  }, {
    x: 55,
    y: -25,
    duration: 0.5,
    repeatDelay: 6,
    ease: "none",
    repeat: -1
  }).to(".glass rect", {
    keyframes: [{
      height: 80
    }, {
      height: 22,
      x: -336,
      y: 160,
      opacity: 0.8
    }],
    duration: 0.5,
    ease: "none",
    repeat: -1,
    repeatDelay: 6
  }, "<0"); //ANCHOR Doodle

  var doodle = document.querySelector(".doodle"); // const textSpan0 = doodle.querySelector(".span0");
  // const textSpan1 = doodle.querySelector(".span1");
  // const textSpan2 = doodle.querySelector(".span2");
  // const textSpan3 = doodle.querySelector(".span3");

  var doodleMobile = document.querySelector(".doodle-mobile"); // const textSpan0Mobile = doodleMobile.querySelector(".span0");
  // const textSpan1Mobile = doodleMobile.querySelector(".span1");
  // const textSpan2Mobile = doodleMobile.querySelector(".span2");
  // const textSpan3Mobile = doodleMobile.querySelector(".span3");
  // const text = {
  //   string0: "My name",
  //   string1: "is Pavel!",
  //   string2: "Welcome to",
  //   string3: "my page!",
  // };
  // const str0 = text.string0.split("");
  // const str1 = text.string1.split("");
  // const str2 = text.string2.split("");
  // const str3 = text.string3.split("");
  // const str0Mobile = text.string0.split("");
  // const str1Mobile = text.string1.split("");
  // const str2Mobile = text.string2.split("");
  // const str3Mobile = text.string3.split("");
  // //Doodle animation
  // function animateLetters1() {
  //   if (str0.length > 0) {
  //     textSpan0.innerHTML += str0.shift();
  //     textSpan0Mobile.innerHTML += str0Mobile.shift();
  //   } else {
  //     clearTimeout(animateLetters1);
  //   }
  //   setTimeout(animateLetters1, 100);
  // }
  // function animateLetters2() {
  //   if (str1.length > 0) {
  //     textSpan1.innerHTML += str1.shift();
  //     textSpan1Mobile.innerHTML += str1Mobile.shift();
  //   } else {
  //     clearTimeout(animateLetters2);
  //   }
  //   setTimeout(animateLetters2, 100);
  // }
  // function animateLetters3() {
  //   if (str2.length > 0) {
  //     textSpan2.innerHTML += str2.shift();
  //     textSpan2Mobile.innerHTML += str2Mobile.shift();
  //   } else {
  //     clearTimeout(animateLetters3);
  //   }
  //   setTimeout(animateLetters3, 100);
  // }
  // function animateLetters4() {
  //   if (str3.length > 0) {
  //     textSpan3.innerHTML += str3.shift();
  //     textSpan3Mobile.innerHTML += str3Mobile.shift();
  //   } else {
  //     clearTimeout(animateLetters4);
  //   }
  //   setTimeout(animateLetters4, 100);
  // }
  //ANCHOR Photo

  var photo = document.querySelector(".photo");
  var photoTransformY = +window.getComputedStyle(photo, null).transform.match(/(-?[0-9\.]+)/g)[5];
  var photoTransformX = +window.getComputedStyle(photo, null).transform.match(/(-?[0-9\.]+)/g)[4];

  function doodlePositionStart() {
    doodle.style.transform = "translate(".concat(window.innerWidth - doodle.offsetWidth - photo.offsetWidth * 0.8 + photoTransformX, "px, ").concat(window.innerHeight - (photo.offsetHeight - photo.offsetHeight * 0.25 + -photoTransformY), "px)");
  } // doodlePositionStart();
  //ANCHOR Page animations


  var logo = document.querySelector(".logo");
  var helloDots = document.querySelectorAll('.hello-dots path:not([data-item="hello-doodle"])');
  var helloDoodle = document.querySelectorAll('[data-item="hello-doodle"]');
  var dots = document.querySelectorAll('[data-name="pre-photo"] .cls-1');
  var colorGameItem = document.querySelectorAll(".color-game__item");
  var timelinePageAnimation = gsap.timeline({
    duration: 1,
    rotation: 0.05,
    paused: true
  }); // gsap.set(helloDots, {
  //   autoAlpha: 0,
  // });
  // gsap.set(dots, {
  //   autoAlpha: 0,
  // });
  // function helloDotsAnim() {
  //   const tl = gsap.timeline();
  //   tl.from(helloDots, {
  //     y: -500,
  //     stagger: { each: 0.003, from: "random" },
  //     duration: 0.8,
  //     delay: 0.5,
  //     ease: gsapEase.bounce_out,
  //   }).to(
  //     helloDots,
  //     {
  //       autoAlpha: 1,
  //     },
  //     "<0"
  //   );
  // }
  // function dotsAnim() {
  //   const tl = gsap.timeline();
  //   tl.from(dots, {
  //     scale: 0,
  //     delay: 0.5,
  //     stagger: {
  //       each: 0.002,
  //       from: 15,
  //     },
  //     duration: 0.6,
  //     ease: gsapEase.elastic05,
  //   }).to(
  //     dots,
  //     {
  //       autoAlpha: 1,
  //     },
  //     "<0"
  //   );
  // }

  timelinePageAnimation.from(photo, {
    xPercent: 200,
    transformOrigin: "center",
    rotation: 50,
    delay: 0.4,
    duration: 1.2,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic05_04,
    clearProps: "transform",
    onComplete: function onComplete() {
      return doodlePositionStart();
    } // onStart: () => {
    //   dotsAnim();
    //   helloDotsAnim();
    // },

  }).from(dots, {
    opacity: 0,
    scale: 0,
    stagger: {
      each: 0.002,
      from: 15
    },
    duration: 0.6,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.elastic05
  }, "<0.5").from(helloDots, {
    y: -500,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.bounce_out,
    opacity: 0,
    stagger: {
      each: 0.003,
      from: "random"
    }
  }, "<0.4").from(helloDoodle, {
    y: -300,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.bounce_out,
    opacity: 0,
    stagger: 0.03
  }, "<1.2").to([doodle, doodleMobile], {
    opacity: 1,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back_1_7 // onComplete: () => {
    //   setTimeout(animateLetters1, 500);
    //   setTimeout(animateLetters2, 1200);
    //   setTimeout(animateLetters3, 2200);
    //   setTimeout(animateLetters4, 3500);
    // },

  }, "<0.5").from(".doodle .doodle__text tspan", {
    text: {
      value: ""
    },
    duration: 1,
    ease: "none",
    stagger: {
      each: 1
    }
  }).from(".doodle-mobile .doodle__text tspan", {
    text: {
      value: ""
    },
    duration: 1,
    ease: "none",
    stagger: {
      each: 1
    }
  }, "<0").from(btnBig, {
    transform: "translate3d(0, 0, 1px) scale(0)",
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.bounce_ease_out,
    delay: 1,
    duration: 1
  }, "<3").from(logo, {
    transform: "translate3d(0, 0, 1px) scale(0)",
    opacity: 0,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.bounce_ease_out,
    duration: 1,
    onComplete: function onComplete() {
      var magnetLogo = new _cursor__WEBPACK_IMPORTED_MODULE_1__.MagnetLogo(logo);
      return magnetLogo; // import("./cursor").then(({ MagnetLogo }) => {
      //   const magnetLogo = new MagnetLogo(logo);
      // });
    }
  }, "<0").from(colorGameItem, {
    xPercent: -100,
    autoAlpha: 0,
    stagger: {
      each: 0.2
    },
    duration: 1,
    ease: _utils__WEBPACK_IMPORTED_MODULE_0__.gsapEase.back,
    onComplete: function onComplete() {
      return colorGame();
    }
  }, "<0.5");
  timelinePageAnimation.play(); // const nextPageLink = document.querySelectorAll("#corner-link");
  // nextPageLink.forEach((link) => {
  //   link.addEventListener("click", () => {
  //     tlPage.kill();
  //   });
  // });
  //ANCHOR Color game

  function colorGame() {
    // const photo = document.querySelector(".photo");
    var hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    var colorBtns = document.querySelectorAll(".color-game__item");
    var glassesElements = photo.querySelectorAll('[class*="glasses-el"]');
    var pullover = photo.querySelectorAll(".pullover");
    var beard = photo.querySelectorAll(".beard");
    colorBtns.forEach(function (btn) {
      btn.addEventListener("click", changeColor);
    });
    colorBtns.forEach(function (btn) {
      btn.addEventListener("keydown", function (e) {
        var KEYDOWN_SPACE = 32;
        var KEYDOWN_ENTER = 13;

        if (e.keyCode === KEYDOWN_SPACE || e.keyCode === KEYDOWN_ENTER) {
          changeColor(e);
        }
      });
    });

    function getRandomNumber() {
      return Math.floor(Math.random() * hex.length);
    }

    function changeColor(e) {
      var hexColor = "#";
      var HEX_COLOR_LENGTH = 6;

      for (var i = 0; i < HEX_COLOR_LENGTH; i++) {
        hexColor += hex[getRandomNumber()];
      }

      var attr = e.target.getAttribute("data-name");

      if (attr === "glasses") {
        glassesElements.forEach(function (glassesEl) {
          return glassesEl.style.fill = hexColor;
        });
      } else if (attr === "pullover") {
        pullover.forEach(function (el) {
          return el.style.fill = hexColor;
        });
      } else if (attr === "beard") {
        beard.forEach(function (el) {
          return el.style.fill = hexColor;
        });
      } else if (attr === "grayscale") {
        document.querySelector(".page").classList.toggle("grayscale");
      }
    }
  }
}

function doodlePositionResize() {
  var photo = document.querySelector(".photo");
  var doodle = document.querySelector(".doodle");
  doodle.style.transform = "translate(".concat(window.innerWidth - doodle.offsetWidth - photo.offsetWidth * 0.8 + +window.getComputedStyle(photo, null).transform.match(/(-?[0-9\.]+)/g)[4], "px, ").concat(window.innerHeight - (photo.offsetHeight - photo.offsetHeight * 0.25 - +window.getComputedStyle(photo, null).transform.match(/(-?[0-9\.]+)/g)[5]), "px)");
} //ANCHOR Preloader
// const preloadImages = (selector = "svg") => {
//   return new Promise((resolve) => {
//     imagesLoaded(
//       document.querySelectorAll(selector),
//       { background: ".color-game__item" },
//       resolve
//     );
//     // imagesLoaded(
//     //   "#wrapper",
//     //   {
//     //     background: ".color-game__item",
//     //   },
//     //   function (imgLoad) {
//     //     return imgLoad;
//     //     // console.log(imgLoad);
//     //   }
//     // );
//     // console.log(document.querySelectorAll(selector));
//   });
// };
// preloadImages().then(() => {
//   document.body.classList.remove("loading");
// });
// var hiddenTime = document.visibilityState === "hidden" ? 0 : Infinity;
// document.addEventListener(
//   "visibilitychange",
//   (event) => {
//     hiddenTime = Math.min(hiddenTime, event.timeStamp);
//   },
//   { once: true }
// );
// new PerformanceObserver((entryList) => {
//   entryList.getEntries().forEach((entry) => {
//     if (entry.startTime < hiddenTime) {
//       // This entry occurred before the page was hidden
//       console.log(entry);
//     }
//   });
// }).observe({ type: "largest-contentful-paint", buffered: true });




/***/ }),

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "getMousePosition": () => (/* binding */ getMousePosition),
/* harmony export */   "gsapEase": () => (/* binding */ gsapEase),
/* harmony export */   "installMediaQueryWatcher": () => (/* binding */ installMediaQueryWatcher),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "randomNumber": () => (/* binding */ randomNumber)
/* harmony export */ });
var gsapEase = {
  power1: "power1.out",
  power3: "power3.out",
  power3_ease_out: "power3.easeOut",
  power4: "power4.out",
  back: "back.out",
  back_1_7: "back.out(1.7)",
  bounce_out: "bounce.out",
  bounce_ease_out: "Bounce.easeOut",
  elastic02: "elastic.out(1, 0.2)",
  elastic03: "elastic.out(1, 0.3)",
  elastic05: "elastic.out(1, 0.5)",
  elastic05_04: "elastic.out(0.5, 0.4)"
};

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
  var mql = window.matchMedia(mediaQuery);
  mql.addListener(function (e) {
    return layoutChangedCallback(e.matches);
  });
  layoutChangedCallback(mql.matches);
}

var lerp = function lerp(start, end, n) {
  return (1 - n) * start + n * end;
};

var distance = function distance(x1, y1, x2, y2) {
  var a = x1 - x2;
  var b = y1 - y2;
  return Math.hypot(a, b);
};

var getMousePosition = function getMousePosition(e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
};



/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("d4df876100e48b3584f7")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkportfolio"] = self["webpackChunkportfolio"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=false&live-reload=true")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./js/barba.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main32ff3997b5bafdd061af.js.map