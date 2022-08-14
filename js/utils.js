const gsapEase = {
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
  elastic05_04: "elastic.out(0.5, 0.4)",
};

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
  let mql = window.matchMedia(mediaQuery);
  mql.addListener(function (e) {
    return layoutChangedCallback(e.matches);
  });
  layoutChangedCallback(mql.matches);
}

const lerp = function (start, end, n) {
  return (1 - n) * start + n * end;
};

const distance = function (x1, y1, x2, y2) {
  let a = x1 - x2;
  let b = y1 - y2;

  return Math.hypot(a, b);
};

const getMousePosition = (e) => {
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

export {
  gsapEase,
  randomNumber,
  installMediaQueryWatcher,
  lerp,
  getMousePosition,
  distance,
};
