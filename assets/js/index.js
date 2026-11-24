let navLinks = document.querySelectorAll(".nav-links a");
let sections = document.querySelectorAll("main section[id]");
let themeButton = document.getElementById("theme-toggle-button");
let portfolioFilterBtn = document.querySelectorAll(".portfolio-filter");
let portfolioItems = document.querySelectorAll(".portfolio-item");
let testimonialCarousel = document.querySelector("#testimonials-carousel");
let testimonialCards = document.querySelectorAll(".testimonial-card");
let nextTestimonial = document.getElementById("next-testimonial");
let prevTestimonial = document.getElementById("prev-testimonial");
let carouselIndicators = document.querySelectorAll(".carousel-indicator");
let settingsToggle = document.getElementById("settings-toggle");
let settingsSidebar = document.getElementById("settings-sidebar");
let closeSettings = document.getElementById("close-settings");
let fontOptions = document.querySelectorAll(".font-option");
let themeColors = [
  {
    name: "blue",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#0ea5e9",
  },
  {
    name: "green",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    name: "pink",
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#f472b6",
  },
  {
    name: "purple",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },
  {
    name: "orange",
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
  {
    name: "red",
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },
];
let themeColorsGrid = document.getElementById("theme-colors-grid");
let resetBtn = document.getElementById("reset-settings");
let scrollToTop = document.getElementById("scroll-to-top");

let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.documentElement.classList.remove("dark");
} else {
  document.documentElement.classList.add("dark");
}

function changeActiveLink() {
  let currentSection = "";
  for (let i = 0; i < sections.length; i++) {
    let sectionTop = sections[i].offsetTop;

    if (window.scrollY >= sectionTop - 150) {
      currentSection = sections[i].getAttribute("id");
    }
  }

  // Loop through all navbar links
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");

    if (navLinks[i].getAttribute("href") === "#" + currentSection) {
      navLinks[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", changeActiveLink);

changeActiveLink();

themeButton.addEventListener("click", function changeTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
});
for (let i = 0; i < portfolioFilterBtn.length; i++) {
  portfolioFilterBtn[i].addEventListener("click", function displayItems() {
    for (let j = 0; j < portfolioFilterBtn.length; j++) {
      portfolioFilterBtn[j].classList.remove("active");
    }
    this.classList.add("active");
    let dataFilter = this.getAttribute("data-filter");

    for (let i = 0; i < portfolioItems.length; i++) {
      let dataCategory = portfolioItems[i].getAttribute("data-category");

      if (dataFilter === "all" || dataFilter === dataCategory) {
        portfolioItems[i].style.display = "";
      } else {
        portfolioItems[i].style.display = "none";
      }
    }
  });
}

let currentIndex = 0;
function updateIndicators() {
  for (let i = 0; i < carouselIndicators.length; i++) {
    carouselIndicators[i].classList.remove("bg-accent");
  }

  carouselIndicators[currentIndex].classList.add("bg-accent");
}

nextTestimonial.addEventListener("click", function nextCard() {
  if (currentIndex < testimonialCards.length - 3) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  let cardWidth = testimonialCards[0].offsetWidth;

  testimonialCarousel.style.transform = `translateX(+${cardWidth * currentIndex}px)`;
  updateIndicators();
});
prevTestimonial.addEventListener("click", function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = testimonialCards.length - 3;
  }

  let cardWidth = testimonialCards[0].offsetWidth;

  testimonialCarousel.style.transform = `translateX(+${cardWidth * currentIndex}px)`;
  updateIndicators();
});

for (let i = 0; i < carouselIndicators.length; i++) {
  carouselIndicators[i].addEventListener("click", function indecatorMovement() {
    for (let j = 0; j < carouselIndicators.length; j++) {
      carouselIndicators[j].classList.remove("active");
    }
    this.classList.add("active");
    let currentDataIndex = carouselIndicators[i].getAttribute("data-index");
    currentIndex = Number(currentDataIndex);
    let cardWidth = testimonialCards[0].offsetWidth;

    testimonialCarousel.style.transform = `translateX(+${cardWidth * currentIndex}px)`;
  });
}

settingsToggle.addEventListener("click", function toggleControl() {
  settingsSidebar.classList.remove("translate-x-full");

  settingsToggle.style.right = "20rem";

  settingsToggle.setAttribute("aria-expanded", "true");
  settingsSidebar.setAttribute("aria-hidden", "false");
});

closeSettings.addEventListener("click", function toggleControl() {
  settingsSidebar.classList.add("translate-x-full");

  settingsToggle.style.right = "0";

  settingsToggle.setAttribute("aria-expanded", "false");
  settingsSidebar.setAttribute("aria-hidden", "true");
});

for (let i = 0; i < fontOptions.length; i++) {
  fontOptions[i].addEventListener("click", function changeFont() {
    for (let j = 0; j < fontOptions.length; j++) {
      fontOptions[j].classList.remove("active");
      fontOptions[j].setAttribute("aria-checked", "false");
    }
    fontOptions[i].classList.add("active");
    fontOptions[i].setAttribute("aria-checked", "true");

    let selectedFont = this.getAttribute("data-font");
    document.body.classList.remove(
      "font-alexandria",
      "font-tajawal",
      "font-cairo",
    );
    document.body.classList.add("font-" + selectedFont);
  });
}

for (let i = 0; i < themeColors.length; i++) {
  let colorButton = document.createElement("button");

  colorButton.style.background = themeColors[i].primary;
  colorButton.style.width = "40px";
  colorButton.style.height = "40px";
  colorButton.style.borderRadius = "50%";

  themeColorsGrid.appendChild(colorButton);

  colorButton.addEventListener("click", function changeColor() {
    document.documentElement.style.setProperty(
      "--color-primary",
      themeColors[i].primary,
    );

    document.documentElement.style.setProperty(
      "--color-secondary",
      themeColors[i].secondary,
    );

    document.documentElement.style.setProperty(
      "--color-accent",
      themeColors[i].accent,
    );
  });
}

resetBtn.addEventListener("click", function resetSettings() {
  document.body.classList.remove(
    "font-alexandria",
    "font-tajawal",
    "font-cairo",
  );
  document.body.classList.add("font-tajawal");
  for (let i = 0; i < fontOptions.length; i++) {
    fontOptions[i].classList.remove("active");
    fontOptions[i].setAttribute("aria-checked", "false");
  }

  document.querySelector('[data-font="tajawal"]').classList.add("active");
  document
    .querySelector('[data-font="tajawal"]')
    .setAttribute("aria-checked", "true");
  document.documentElement.style.setProperty("--color-primary", "#6366f1");
  document.documentElement.style.setProperty("--color-secondary", "#8b5cf6");
  document.documentElement.style.setProperty("--color-accent", "#a855f7");
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 5000) {
    scrollToTop.classList.remove("opacity-0", "invisible");
    scrollToTop.classList.add("opacity-100", "visible");
  } else {
    scrollToTop.classList.remove("opacity-100", "visible");
    scrollToTop.classList.add("opacity-0", "invisible");
  }
});
scrollToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
