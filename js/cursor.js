//ANCHOR Cursor
let mouse = {
  x: 0,
  y: 0,
};

const lerp = function (start, end, n) {
  return (1 - n) * start + n * end;
};

const distance = function (x1, y1, x2, y2) {
  let a = x1 - x2;
  let b = y1 - y2;

  return Math.hypot(a, b);
};

const calcWindowSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const getRandomFloat = function (min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
};

const getMousePosition = (e) => {
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

window.addEventListener("mousemove", function (ev) {
  mouse = getMousePosition(ev);
});

class Cursor {
  constructor(item) {
    this.DOM = { item: item };
    this.DOM.item.style.opacity = 0;
    this.bounds = this.DOM.item.getBoundingClientRect();
    this.renderStyles = {
      tx: { previous: 0, current: 0, amount: 0.2 },
      ty: { previous: 0, current: 0, amount: 0.2 },
      scale: { previous: 1, current: 1, amount: 0.15 },
      opacity: { previous: 1, current: 1, amount: 0.1 },
    };
    this.onMouseMove = () => {
      this.renderStyles.tx.previous = this.renderStyles.tx.current =
        mouse.x - this.bounds.width / 2;
      this.renderStyles.ty.previous = this.renderStyles.ty.current =
        mouse.y - this.bounds.height / 2;
      gsap.to(this.DOM.item, {
        duration: 0.85,
        opacity: 1,
        ease: "power3.easeOut",
      });
      requestAnimationFrame(() => this.render());
      window.removeEventListener("mousemove", this.onMouseMove);
    };
    window.addEventListener("mousemove", this.onMouseMove);
  }

  render() {
    this.renderStyles["tx"].current = mouse.x - this.bounds.width / 2;
    this.renderStyles["ty"].current = mouse.y - this.bounds.height / 2;

    for (const key in this.renderStyles) {
      this.renderStyles[key].previous = lerp(
        this.renderStyles[key].previous,
        this.renderStyles[key].current,
        this.renderStyles[key].amount
      );
      // console.log(this.renderStyles[key].previous);
    }

    this.DOM.item.style.transform = `translate(${this.renderStyles["tx"].previous}px, ${this.renderStyles["ty"].previous}px) scale(${this.renderStyles["scale"].previous})`;
    this.DOM.item.style.opacity = this.renderStyles["opacity"].previous;

    requestAnimationFrame(() => this.render());
  }

  enter() {
    this.renderStyles["scale"].current = 2.5;
    this.renderStyles["opacity"].current = 0.5;
  }

  leave() {
    this.renderStyles["scale"].current = 1;
    this.renderStyles["opacity"].current = 1;
  }
}

class MagnetLogo {
  constructor(item) {
    this.DOM = { item: item };
    this.renderStyles = {
      tx: { previous: 0, current: 0, amount: 0.1 },
      ty: { previous: 0, current: 0, amount: 0.1 },
      scale: { previous: 1, current: 1, amount: 0.2 },
    };

    this.state = {
      hover: false,
    };

    this.initEvent();
    this.calculateSizePosition();
    requestAnimationFrame(() => this.render());
  }

  calculateSizePosition() {
    this.rect = this.DOM.item.getBoundingClientRect();
    this.distanceToTrigger = this.rect.width * 1.9;
  }

  initEvent() {
    this.onResize = () => this.calculateSizePosition();
    window.addEventListener("resize", this.onResize);
    window.addEventListener("load", this.onResize);
  }

  render() {
    const distanceMouseElement = distance(
      mouse.x + window.scrollX,
      mouse.y + window.scrollY,
      this.rect.left + this.rect.width / 2,
      this.rect.top + this.rect.height / 2
    );

    let x = 0;
    let y = 0;

    if (distanceMouseElement < this.distanceToTrigger) {
      x =
        (mouse.x + window.scrollX - (this.rect.left + this.rect.width / 2)) *
        0.3;
      y =
        (mouse.y + window.scrollY - (this.rect.top + this.rect.height / 2)) *
        0.3;

      if (!this.state.hover) {
        this.enter();
      }
    } else if (this.state.hover) {
      this.leave();
    }

    this.renderStyles["tx"].current = x;
    this.renderStyles["ty"].current = y;

    for (const key in this.renderStyles) {
      this.renderStyles[key].previous = lerp(
        this.renderStyles[key].previous,
        this.renderStyles[key].current,
        this.renderStyles[key].amount
      );
    }

    this.DOM.item.style.transform = `translate(${this.renderStyles["tx"].previous}px, ${this.renderStyles["ty"].previous}px) scale(${this.renderStyles["scale"].previous})`;

    requestAnimationFrame(() => this.render());
  }

  enter() {
    this.state.hover = true;
    this.renderStyles["scale"].current = 1.3;
    gsap.killTweensOf(this.DOM.item);
    gsap.to(this.DOM.item, {
      duration: 4,
      startAt: { yPercent: 75 },
      yPercent: 0,
      ease: "power3.easeOut",
    });
  }

  leave() {
    this.state.hover = false;
    this.renderStyles["scale"].current = 1;

    // gsap.killTweensOf(this.DOM.item);

    gsap.to(this.DOM.item, {
      ease: "power3.easeOut",
      yPercent: -75,
    });
  }
}

function addCustomCursor() {
  const cursor = new Cursor(document.querySelector(".cursor"));
  // const magnetLogo = new MagnetLogo(document.querySelector('.logo'));
  document
    .querySelectorAll("button, .menu-btn-close, .logo, .color-game__item")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.enter());
      el.addEventListener("mouseleave", () => cursor.leave());
    });

  // document.querySelectorAll('.logo').forEach(el => {
  //   el.addEventListener('mouseenter', () => magnetLogo.enter());
  //   el.addEventListener('mouseleave', () => magnetLogo.leave());
  // });
}

// window.addEventListener('DOMContentLoaded', () => {
//   const cursor = new Cursor(document.querySelector('.cursor'));
//   // const magnetLogo = new MagnetLogo(document.querySelector('.logo'));
//   document
//     .querySelectorAll('a, .btn, .menu-btn-close, .logo, .color-game__item')
//     .forEach(el => {
//       el.addEventListener('mouseenter', () => cursor.enter());
//       el.addEventListener('mouseleave', () => cursor.leave());
//     });
// });

// const cursor = new Cursor(document.querySelector('.cursor'));
// document
//   .querySelectorAll('a, .btn, .menu-btn-close, .logo, .color-game__item')
//   .forEach(el => {
//     el.addEventListener('mouseenter', () => cursor.enter());
//     el.addEventListener('mouseleave', () => cursor.leave());
//   });

// const magnetLogo = new MagnetLogo(document.querySelector('.logo'));

// document.querySelectorAll('.logo').forEach(el => {
//   el.addEventListener('mouseenter', () => magnetLogo.enter());
//   el.addEventListener('mouseleave', () => magnetLogo.leave());
// });
export { MagnetLogo, addCustomCursor };
export default Cursor;
