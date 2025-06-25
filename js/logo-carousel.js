/**
 * Logo Carousel - Animated client logos display
 * Creates a rotating carousel effect similar to the React component
 */

class LogoCarousel {
  constructor() {
    // Client logos data using your existing images
    this.logos = [
      {
        id: 1,
        name: "Client 1",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client1.png",
      },
      {
        id: 2,
        name: "Client 3",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client3.png",
      },
      {
        id: 3,
        name: "Client 4",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client4.png",
      },
      {
        id: 4,
        name: "Client 5",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client5.png",
      },
      {
        id: 5,
        name: "Client 6",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client6.png",
      },
      {
        id: 6,
        name: "Client 7",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client7.png",
      },
      {
        id: 7,
        name: "Client 8",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client8.png",
      },
      {
        id: 8,
        name: "Client 9",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client9.png",
      },
      {
        id: 9,
        name: "Client 10",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client10.png",
      },
      {
        id: 10,
        name: "Client 11",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client11.png",
      },
      {
        id: 11,
        name: "Client 12",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client12.png",
      },
      {
        id: 12,
        name: "Client 13",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client13.png",
      },
      {
        id: 13,
        name: "Client 14",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client14.png",
      },
      {
        id: 14,
        name: "Client 15",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client15.png",
      },
      {
        id: 15,
        name: "Client 16",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client16.png",
      },
      {
        id: 16,
        name: "Client 17",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client17.png",
      },
      {
        id: 17,
        name: "Client 18",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client18.png",
      },
      {
        id: 18,
        name: "Client 19",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client19.png",
      },
      {
        id: 19,
        name: "Client 20",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client20.png",
      },
      {
        id: 20,
        name: "Client 21",
        src: "https://cdn.jsdelivr.net/gh/brandcrafters01/media@main/client21.png",
      },
    ];

    this.columns = 4; // Number of columns
    this.cycleDuration = 3000; // Duration for each logo in ms (increased for smoother transitions)
    this.columnDelay = 300; // Delay between columns in ms
    this.time = 0;
    this.logoColumns = [];
    this.intervalId = null;
    this.isTransitioning = new Array(4).fill(false); // Track transitions per column

    this.init();
  }

  /**
   * Initialize the carousel
   */
  init() {
    this.distributeLogos();
    this.startAnimation();
    this.setupIntersectionObserver();
  }

  /**
   * Distribute logos across columns
   */
  distributeLogos() {
    // Shuffle logos for random distribution
    const shuffled = [...this.logos].sort(() => Math.random() - 0.5);

    // Create columns array
    this.logoColumns = Array.from({ length: this.columns }, () => []);

    // Distribute logos to columns
    shuffled.forEach((logo, index) => {
      this.logoColumns[index % this.columns].push(logo);
    });

    // Ensure all columns have the same length by filling with random logos
    const maxLength = Math.max(...this.logoColumns.map((col) => col.length));
    this.logoColumns.forEach((col) => {
      while (col.length < maxLength) {
        const randomLogo =
          shuffled[Math.floor(Math.random() * shuffled.length)];
        col.push(randomLogo);
      }
    });
  }

  /**
   * Start the animation loop
   */
  startAnimation() {
    // Wait for initial animations to complete before starting transitions
    setTimeout(() => {
      this.intervalId = setInterval(() => {
        this.time += 150;
        this.updateColumns();
      }, 150);
    }, 1000); // Wait 1 second after page load
  }

  /**
   * Stop the animation
   */
  stopAnimation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Update all columns with current logos
   */
  updateColumns() {
    const columns = document.querySelectorAll(".logo-column");

    columns.forEach((column, columnIndex) => {
      if (this.logoColumns[columnIndex]) {
        this.updateColumn(column, columnIndex);
      }
    });
  }

  /**
   * Update a specific column
   */
  updateColumn(columnElement, columnIndex) {
    // Skip if already transitioning
    if (this.isTransitioning[columnIndex]) return;

    const columnLogos = this.logoColumns[columnIndex];
    const columnDelay = columnIndex * this.columnDelay;
    const adjustedTime =
      (this.time + columnDelay) % (this.cycleDuration * columnLogos.length);
    const currentIndex = Math.floor(adjustedTime / this.cycleDuration);
    const currentLogo = columnLogos[currentIndex];

    // Get the current wrapper
    const wrapper = columnElement.querySelector(".logo-wrapper");
    const currentImg = wrapper.querySelector(".logo-image");

    // Check if we need to change the logo
    if (currentImg.dataset.logoId !== String(currentLogo.id)) {
      this.transitionLogo(wrapper, currentLogo, columnIndex);
    }
  }

  /**
   * Transition to a new logo with animation
   */
  transitionLogo(wrapper, newLogo, columnIndex) {
    // Mark column as transitioning
    this.isTransitioning[columnIndex] = true;

    const currentImg = wrapper.querySelector(".logo-image");

    // Add fade-out animation
    wrapper.classList.add("logo-fade-out");

    setTimeout(() => {
      // Update the image
      currentImg.src = newLogo.src;
      currentImg.alt = newLogo.name;
      currentImg.dataset.logoId = newLogo.id;

      // Remove fade-out and add fade-in
      wrapper.classList.remove("logo-fade-out");
      wrapper.classList.add("logo-fade-in");

      // Remove fade-in class after animation and mark as not transitioning
      setTimeout(() => {
        wrapper.classList.remove("logo-fade-in");
        this.isTransitioning[columnIndex] = false;
      }, 500);
    }, 300); // Fade-out duration
  }

  /**
   * Setup intersection observer for performance
   */
  setupIntersectionObserver() {
    const carousel = document.getElementById("logoCarousel");
    if (!carousel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animation when carousel is visible
            if (!this.intervalId) {
              this.startAnimation();
            }
          } else {
            // Stop animation when carousel is not visible (performance optimization)
            this.stopAnimation();
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(carousel);
  }

  /**
   * Handle responsive behavior
   */
  handleResize() {
    // You can add responsive logic here if needed
    const carousel = document.querySelector(".logo-carousel");
    if (window.innerWidth <= 768) {
      // Mobile adjustments can be handled via CSS
    }
  }

  /**
   * Destroy the carousel instance
   */
  destroy() {
    this.stopAnimation();
    // Remove event listeners if any
    window.removeEventListener("resize", this.handleResize.bind(this));
  }
}

/**
 * Initialize the logo carousel when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the logo carousel
  const logoCarousel = new LogoCarousel();

  // Handle window resize
  window.addEventListener(
    "resize",
    logoCarousel.handleResize.bind(logoCarousel)
  );

  // Optional: Add to global scope for debugging
  window.logoCarousel = logoCarousel;
});

/**
 * Utility function to preload images for better performance
 */
function preloadImages(imageUrls) {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = LogoCarousel;
}
