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
