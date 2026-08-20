document.addEventListener("DOMContentLoaded", () => {
  // 1. Menú Móvil
  const menuToggle = document.getElementById("menuToggleBtn");
  const closeBtn = document.getElementById("closeMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  function openMenu() {
    if (mobileMenu) mobileMenu.classList.add("active");
  }

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove("active");
  }

  if (menuToggle) menuToggle.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  // 2. Desplazamiento Suave (Navegación por Anclas)
  const allNavLinks = document.querySelectorAll('a[href^="#"]');

  allNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        closeMenu();

        // Obtener altura real del navbar para el desfase
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // 3. Menús desplegables para pantallas táctiles
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".pill-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        if (window.innerWidth <= 1024) {
          e.stopPropagation();
          dropdown.classList.toggle("open");
        }
      });
    }
  });

  document.addEventListener("click", () => {
    dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
  });
});