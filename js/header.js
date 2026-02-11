const header = document.querySelector(".header"),
  sectionTrigger = document.querySelector(".partners");

const headerObserver = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) {
      header.classList.add("headerFixed");
    } else {
      header.classList.remove("headerFixed");
    }
  },
  {
    root: null,
    threshold: 0,
  },
);

headerObserver.observe(sectionTrigger);
