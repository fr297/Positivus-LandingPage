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
});
