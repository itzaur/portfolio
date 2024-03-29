//ANCHOR Cursor
import { gsapEase, lerp, getMousePosition, distance } from "./utils";

let mouse = {
  x: 0,
  y: 0,
};

// window.addEventListener("mousemove", function (ev) {
//   mouse = getMousePosition(ev);
// });

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
        ease: gsapEase.power3_ease_out,
      });
      requestAnimationFrame(() => this.render());
      window.removeEventListener("mousemove", this.onMouseMove);
    };
    window.addEventListener("mousemove", this.onMouseMove);

    if (this.DOM.item === null) return;
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

    if (this.DOM.item === null) return;

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
      ease: gsapEase.power3_ease_out,
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
  document
    .querySelectorAll(".nav__link, [data-hover-star='hover']")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.enter();

        if (el.getAttribute("data-hover-star") === "not-hover") {
          cursor.leave();
        }
      });
      el.addEventListener("mouseleave", () => cursor.leave());
    });

  window.addEventListener("mousemove", function (ev) {
    mouse = getMousePosition(ev);
  });
}

export { MagnetLogo, addCustomCursor };
