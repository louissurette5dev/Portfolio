// =======================
// THEME TOGGLE (DARK/LIGHT)
// =======================
const themeToggleBtn = document.getElementById("themeToggle");

function setTheme(dark) {
  if (dark) {
    document.body.classList.add("dark-theme");
    themeToggleBtn.textContent = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-theme");
    themeToggleBtn.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

// On load: restore theme
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    setTheme(true);
  } else if (saved === "light") {
    setTheme(false);
  } else {
    // default to system preference
    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark);
  }
})();

themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-theme");
  setTheme(!isDark);
});

// =======================
// MOBILE MENU (HAMBURGER)
// =======================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close menu when clicking a link (mobile)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// =======================
// GSAP ANIMATIONS
// =======================
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero intro animation
  gsap.from(".hero-content", {
    y: 40,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out"
  });

  // Light parallax on hero as you scroll
  gsap.to(".hero-content", {
    y: 40,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Mark elements we want to reveal
  document.querySelectorAll(".section-inner, .project-card, .skill-card").forEach((el) => {
    el.classList.add("reveal");
  });

  // Reveal sections on scroll
  document.querySelectorAll(".reveal").forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  });
}
