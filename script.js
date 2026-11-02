// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Custom Cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 5 + "px";
  cursor.style.top = my - 5 + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + "px";
  ring.style.top = ry - 18 + "px";
  requestAnimationFrame(animRing);
}
animRing();

// Scroll Progress
const scrollLine = document.getElementById("scrollLine");
window.addEventListener("scroll", () => {
  const pct =
    window.scrollY / (document.body.scrollHeight - window.innerHeight);
  scrollLine.style.width = pct * 100 + "%";
});

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = i * 0.06 + "s";
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 }
);
reveals.forEach((el) => obs.observe(el));


// Mobile navigation
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    navLinks.classList.toggle("is-open", !open);
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Projects category filters
const projectFilters = document.querySelectorAll("[data-project-filter]");
const projectCards = document.querySelectorAll("[data-project-card]");
projectFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.projectFilter;
    projectFilters.forEach((filterButton) => {
      const active = filterButton === button;
      filterButton.classList.toggle("is-active", active);
      filterButton.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      card.hidden = selected !== "all" && card.dataset.category !== selected;
    });
  });
});
