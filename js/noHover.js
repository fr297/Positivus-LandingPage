"use strict";

document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(hover: none)").matches) {
    document.body.classList.add("no-hover");
  }
});
