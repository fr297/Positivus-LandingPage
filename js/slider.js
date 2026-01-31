import Splide from "@splidejs/splide";

import "@splidejs/splide/css/core";
import "../scss/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const slider = new Splide("#testSlider", {
    type: "loop",
    perPage: 1,
    focus: "center",
    perMove: 1,
    drag: true,
    fixedWidth: "50%",

    breakpoints: {
      1024: {
        fixedWidth: "70%",
      },
      768: {
        fixedWidth: "100%",
      },
    },
  }).mount();

  const MOBILE_BREAKPOINT = 1024;
  let splideInstances = new Map();
  const PEEK = 60;
  function mountSplideFor(el) {
    if (splideInstances.has(el)) return;
    const caseSlider = new Splide(el, {
      type: "loop", // зацикленный слайдер
      perMove: 1, // двигаем по 1 слайду
      gap: "15px", // расстояние между слайдами
      focus: "left", // центрируем активный слайд
      pagination: true,
      arrows: false,
      drag: true,
      fixedWidth: `calc(90% - ${PEEK}px)`,
      dragMinThreshold: { mouse: 8, touch: 18 },
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      caseSlider.options = { ...caseSlider.options, autoplay: false, speed: 0 };
    }
    caseSlider.mount();
    splideInstances.set(el, caseSlider);
  }
  function destroySplideFor(el) {
    const inst = splideInstances.get(el);
    if (inst) {
      inst.destroy(false);
      splideInstances.delete(el);
    }
  }
  function applyMobileOnlySliders() {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const nodes = document.querySelectorAll(".splide[data-mobile-only]");

    nodes.forEach((el) => {
      if (isMobile) {
        mountSplideFor(el);
      } else {
        destroySplideFor(el);
      }
    });
  }
  function debounce(fn, wait = 150) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(null, args), wait);
    };
  }
  applyMobileOnlySliders();
  window.addEventListener("resize", debounce(applyMobileOnlySliders, 150));
});
