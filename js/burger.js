"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".burgerBtn"),
    burger = document.querySelector(".burger"),
    info = document.querySelector(".burgerInfo");

  const item = document.querySelectorAll(".burgerNavItem");
  const btn = document.querySelector(".burgerCtaBtn");

  burgerBtn.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    info.classList.toggle("slide-bottom");
    burgerBtn.classList.toggle("closeBtn");
    document.body.classList.toggle("noScroll");
  });

  item.forEach((item) => {
    item.addEventListener("click", () => {
      burger.classList.toggle("is-active");
      info.classList.toggle("slide-bottom");
      burgerBtn.classList.toggle("closeBtn");
      document.body.classList.toggle("noScroll");
    });
  });

  btn.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    info.classList.toggle("slide-bottom");
    burgerBtn.classList.toggle("closeBtn");
    document.body.classList.toggle("noScroll");
  });
});
