const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

const icons = {
  light: "assets/icons/light.png",
  dark: "assets/icons/Moon.png"
};

function setTheme(theme) {
  const isDark = theme === "dark";
  body.classList.toggle("dark-mode", isDark);
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  if (themeIcon) {
    themeIcon.src = isDark ? icons.dark : icons.light;
  }
  localStorage.setItem("portfolio-theme", theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  setTheme(savedTheme || "light");

  themeToggle?.addEventListener("click", () => {
    setTheme(body.classList.contains("dark-mode") ? "light" : "dark");
  });
}

function initMenu() {
  menuToggle?.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navPanel?.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open menu");
    }
  });
}

function initFilters() {
  function applyFilter(filter) {
    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(/\s+/);
      const isFeatured = card.dataset.featured === "true";
      card.hidden = filter === "featured" ? !isFeatured : !categories.includes(filter);
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "featured";

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      applyFilter(filter);
    });
  });

  applyFilter("featured");
}

function initContactForm() {
  contactForm?.addEventListener("submit", () => {
    const button = contactForm.querySelector("button[type='submit']");
    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }
    if (formStatus) {
      formStatus.textContent = "Sending your message...";
    }
  });
}

initTheme();
initMenu();
initFilters();
initContactForm();
