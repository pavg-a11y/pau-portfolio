document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     MENÚ MÓVIL
  ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      });

    });

  }


  /* =========================================================
     CARRUSELES
     Funciona automáticamente con TODOS los .carousel
  ========================================================= */

  document.querySelectorAll(".carousel").forEach((carousel) => {

    const track = carousel.querySelector(".carousel-track");
    const prevButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");

    if (!track) return;


    /* ---------------------------------------------------------
       Calcula cuánto debe avanzar según el tamaño real
       de cada tarjeta.
    --------------------------------------------------------- */

    const getScrollAmount = () => {

      const firstCard = track.firstElementChild;

      if (!firstCard) {
        return track.clientWidth * 0.8;
      }

      const trackStyles = window.getComputedStyle(track);

      const gap =
        parseFloat(trackStyles.columnGap) ||
        parseFloat(trackStyles.gap) ||
        0;

      const cardWidth =
        firstCard.getBoundingClientRect().width;

      return cardWidth + gap;

    };


    /* ---------------------------------------------------------
       FLECHA IZQUIERDA
    --------------------------------------------------------- */

    if (prevButton) {

      prevButton.addEventListener("click", () => {

        track.scrollBy({
          left: -getScrollAmount(),
          behavior: "smooth"
        });

      });

    }


    /* ---------------------------------------------------------
       FLECHA DERECHA
    --------------------------------------------------------- */

    if (nextButton) {

      nextButton.addEventListener("click", () => {

        track.scrollBy({
          left: getScrollAmount(),
          behavior: "smooth"
        });

      });

    }

  });
/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
});
