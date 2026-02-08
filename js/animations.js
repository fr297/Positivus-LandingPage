"use strict";

document.addEventListener("DOMContentLoaded", () => {
  (function animate() {
    const title = document.querySelectorAll(".about"),
      servicesItem = document.querySelectorAll(".servicesItem"),
      callToAction = document.querySelector(".callToAction"),
      caseList = document.querySelectorAll(".caseItem"),
      testimonials = document.querySelector("#testSlider"),
      accordion = document.querySelectorAll(".accordion-item"),
      teamItem = document.querySelectorAll(".teamItem"),
      form = document.querySelector(".formWrapper"),
      footer = document.querySelector(".footer");

    const allBlocksForAnimation = [
      ...title,
      ...servicesItem,
      callToAction,
      ...caseList,
      testimonials,
      ...accordion,
      ...teamItem,
      form,
      footer,
    ];

    let options = {
      threshold: 0.55,
    };

    if (document.documentElement.clientWidth < 1024) {
      options.threshold = 0.3;
    } else if (document.documentElement.clientWidth < 768) {
      options.threshold = 0.15;
    } else if (
      document.documentElement.clientWidth <= 1024 &&
      document.documentElement.clientHeight < 601
    ) {
      options.threshold = 0.1;
    } else if (
      document.documentElement.clientWidth <= 1280 &&
      document.documentElement.clientHeight < 801
    ) {
      options.threshold = 0.1;
    }

    function animationAnimated(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add("animated");
        }
      });
    }

    const observer = new IntersectionObserver(animationAnimated, options);

    allBlocksForAnimation.forEach((block) => observer.observe(block));
  })();
});
