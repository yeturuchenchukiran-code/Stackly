
// ======================
// SEARCH FUNCTIONALITY (IMPROVED)
// ======================
function searchApps() {
  const inputEl = document.getElementById("searchInput");
  const input = inputEl ? inputEl.value.toLowerCase().trim() : "";

  const cards = document.querySelectorAll(".qcard");

  if (!cards.length) return;

  cards.forEach(card => {
    const title = (card.dataset.app || card.textContent).toLowerCase();

    const match = title.includes(input);

    // smoother UX (instead of display none)
    card.style.opacity = match ? "1" : "0.15";
    card.style.transform = match ? "scale(1)" : "scale(0.95)";
    card.style.pointerEvents = match ? "auto" : "none";
  });
}

// ======================
// MOBILE NAVIGATION (SAFE + CLEAN)
// ======================
function toggleNav() {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger-btn");

  if (!navLinks || !hamburger) return;

  const isActive = navLinks.classList.toggle("active");

  hamburger.setAttribute("aria-expanded", isActive);
}

// ======================
// SCROLL EFFECT (THROTTLED STYLE)
// ======================
let lastScroll = 0;

function handleScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const currentScroll = window.scrollY;

  if (currentScroll > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }

  lastScroll = currentScroll;
}

window.addEventListener("scroll", handleScroll, { passive: true });

// ======================
// ORBIT INTERACTION (SMOOTH)
// ======================
function setupOrbitInteraction() {
  const orbit = document.getElementById("orbit");
  if (!orbit) return;

  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  document.addEventListener("mousemove", (e) => {
    targetY = (e.clientX / window.innerWidth - 0.5) * 40;
    targetX = (e.clientY / window.innerHeight - 0.5) * -40;
  });

  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    orbit.style.transform =
      `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

    requestAnimationFrame(animate);
  }

  animate();
}

// ======================
// INIT
// ======================
document.addEventListener("DOMContentLoaded", () => {

  // search
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("searchInput");

  if (searchBtn) {
    searchBtn.addEventListener("click", searchApps);
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") searchApps();
    });
  }

  // nav
  const hamburger = document.getElementById("hamburger-btn");
  if (hamburger) {
    hamburger.addEventListener("click", toggleNav);
  }

  // orbit
  setupOrbitInteraction();

  // close menu on click
  document.querySelectorAll(".links a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navLinks")?.classList.remove("active");
      document.getElementById("hamburger-btn")?.setAttribute("aria-expanded", "false");
    });
  });
});

// ======================
// GLOBAL ERROR HANDLER
// ======================
window.addEventListener("error", (e) => {
  console.error("UI Runtime Error:", e.message);
});