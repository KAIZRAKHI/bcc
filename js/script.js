// Full-screen mobile menu functionality
const mobileMenuToggle = document.getElementById("mobile-menu");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

// Function to open mobile menu
function openMobileMenu() {
  if (mobileMenuOverlay && mobileMenuToggle) {
    mobileMenuOverlay.classList.add("active");
    mobileMenuToggle.classList.add("active");
    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden";
  }
}

// Function to close mobile menu
function closeMobileMenu() {
  if (mobileMenuOverlay && mobileMenuToggle) {
    mobileMenuOverlay.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
    // Restore body scroll
    document.body.style.overflow = "";
  }
}

// Open menu when hamburger is clicked
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (mobileMenuOverlay.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

// Close menu when close button is clicked
if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMobileMenu();
  });
}

// Close menu when clicking outside menu container
if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener("click", (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMobileMenu();
    }
  });
}

// Close menu when navigation links are clicked
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    mobileMenuOverlay &&
    mobileMenuOverlay.classList.contains("active")
  ) {
    closeMobileMenu();
  }
});

// Handle window resize - close menu if window becomes desktop size
window.addEventListener("resize", () => {
  if (
    window.innerWidth > 768 &&
    mobileMenuOverlay &&
    mobileMenuOverlay.classList.contains("active")
  ) {
    closeMobileMenu();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const words = ["Brands", "Identities", "Success", "Visions"];
  const changingWord = document.getElementById("changing-word");

  if (changingWord) {
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        changingWord.textContent = currentWord.substring(0, letterIndex - 1);
        letterIndex--;
      } else {
        changingWord.textContent = currentWord.substring(0, letterIndex + 1);
        letterIndex++;
      }

      let speed = isDeleting ? 100 : 150;

      if (!isDeleting && letterIndex === currentWord.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 800;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  //Slideshow
  const clientLogos = document.querySelectorAll(".client-logo");

  if (clientLogos.length > 0) {
    let currentIndex = 0;

    function showNextLogo() {
      clientLogos[currentIndex].classList.remove("active");

      currentIndex = (currentIndex + 1) % clientLogos.length;

      clientLogos[currentIndex].classList.add("active");
    }

    setInterval(showNextLogo, 2000);
  }

  const filterTabs = document.querySelectorAll(".filter-tab");
  const serviceCategories = document.querySelectorAll(".services-category");
  const servicesContentArea = document.querySelector(".services-content-area");
  const dotIndicator = document.querySelector(".tab-dot-indicator");

  filterTabs.forEach((tab, index) => {});

  if (filterTabs.length === 0 || serviceCategories.length === 0) {
    console.error(
      "Required elements not found. Filter functionality will not work."
    );
    return;
  }

  function moveDotIndicator(targetTab) {
    if (!dotIndicator) return;

    const tabOffsetTop = targetTab.offsetTop;
    const tabHeight = targetTab.offsetHeight;

    const dotPosition = tabOffsetTop + tabHeight / 2 - 4; // -4 to center the 8px dot

    dotIndicator.classList.remove("jiggle");

    dotIndicator.style.setProperty("--dot-y", `${dotPosition}px`);

    dotIndicator.style.transform = `translateY(${dotPosition}px)`;

    setTimeout(() => {
      dotIndicator.classList.add("jiggle");

      setTimeout(() => {
        dotIndicator.classList.remove("jiggle");
      }, 600);
    }, 300);
  }

  function switchServiceCategory(targetCategory) {
    // Add loading state
    if (servicesContentArea) {
      servicesContentArea.classList.add("loading");
    }

    serviceCategories.forEach((category) => {
      const wasActive = category.classList.contains("active");
      category.classList.remove("active");
      if (wasActive) {
        console.log(
          "🚫 Removed active from:",
          category.getAttribute("data-category")
        );
      }
    });

    filterTabs.forEach((tab) => {
      const wasActive = tab.classList.contains("active");
      tab.classList.remove("active");
      if (wasActive) {
        console.log(
          "🚫 Removed active from tab:",
          tab.getAttribute("data-category")
        );
      }
    });

    const activeTab = document.querySelector(
      `.filter-tab[data-category="${targetCategory}"]`
    );
    if (activeTab) {
      activeTab.classList.add("active");

      moveDotIndicator(activeTab);
    } else {
    }

    const targetCategoryEl = document.querySelector(
      `.services-category[data-category="${targetCategory}"]`
    );
    if (targetCategoryEl) {
      targetCategoryEl.classList.add("active");
    } else {
    }

    if (servicesContentArea) {
      servicesContentArea.classList.remove("loading");
    }
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      const category = tab.getAttribute("data-category");

      if (!tab.classList.contains("active")) {
        switchServiceCategory(category);

        tab.style.transform = "scale(0.95)";
        setTimeout(() => {
          tab.style.transform = "";
        }, 150);
      } else {
      }
    });

    tab.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const category = tab.getAttribute("data-category");
        if (!tab.classList.contains("active")) {
          switchServiceCategory(category);
        }
      }
    });

    tab.setAttribute("tabindex", "0");
    tab.setAttribute("role", "button");
    tab.setAttribute("aria-pressed", "false");
  });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const tab = mutation.target;
        if (tab.classList.contains("filter-tab")) {
          const isActive = tab.classList.contains("active");
          tab.setAttribute("aria-pressed", isActive.toString());
        }
      }
    });
  });

  filterTabs.forEach((tab) => {
    observer.observe(tab, { attributes: true });
  });

  document.querySelector("#services").style.scrollBehavior = "smooth";

  filterTabs.forEach((tab) => {
    tab.addEventListener("touchstart", () => {
      tab.style.transform = "scale(0.98)";
    });

    tab.addEventListener("touchend", () => {
      setTimeout(() => {
        tab.style.transform = "";
      }, 100);
    });
  });

  const serviceCards = document.querySelectorAll(
    ".services-difference-1to1-card"
  );

  if ("IntersectionObserver" in window) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    serviceCards.forEach((card) => {
      card.style.animationPlayState = "paused";
      cardObserver.observe(card);
    });
  }

  const initialActiveTab = document.querySelector(".filter-tab.active");
  if (initialActiveTab && dotIndicator) {
    setTimeout(() => {
      moveDotIndicator(initialActiveTab);
    }, 100);
  }

  window.addEventListener("resize", () => {
    const currentActiveTab = document.querySelector(".filter-tab.active");
    if (currentActiveTab && dotIndicator) {
      moveDotIndicator(currentActiveTab);
    }
  });
});
