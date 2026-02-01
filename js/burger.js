"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".burgerBtn"),
    burger = document.querySelector(".burger"),
    info = document.querySelector(".burgerInfo");

  burgerBtn.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    info.classList.add("slide-bottom");
  });
});
