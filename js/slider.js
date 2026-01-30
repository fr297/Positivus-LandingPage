import Splide from "@splidejs/splide";

import "@splidejs/splide/css/core";
import "../scss/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const slider = new Splide("#testSlider", {
    type: "slide",
    perPage: 1,
    perMove: 1,
    fixedWidth: "600px", // или нужный px
    gap: "50px",
    focus: false, // <- отключаем центрирование
    loop: false,
    drag: true,
    dragMinThreshold: { touch: 18, mouse: 10 },
    flickPower: 0,
    flickMaxPages: 1,
    waitForTransition: true,
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
