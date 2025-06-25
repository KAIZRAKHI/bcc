// Projects Carousel Functionality
class ProjectsCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.autoSlideInterval = null;
    this.autoSlideDelay = 5000; // 5 seconds

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Add event listeners
    this.prevBtn?.addEventListener("click", () => this.prevSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    // Add click listeners to dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Removed click listeners from slides - only buttons control navigation

    // Mouse interaction for 3D effect
    this.slides.forEach((slide) => {
      slide.addEventListener("mousemove", this.handleMouseMove.bind(this));
      slide.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
    });

    // Start autoplay
    this.startAutoSlide();

    // Pause autoplay on hover
    const carousel = document.getElementById("projectsCarousel");
    carousel?.addEventListener("mouseenter", () => this.stopAutoSlide());
    carousel?.addEventListener("mouseleave", () => this.startAutoSlide());

    // Initial update
    this.updateCarousel();

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    // Touch/swipe support
    this.addTouchSupport();
  }

  handleMouseMove(event) {
    const slide = event.currentTarget;
    if (!slide.classList.contains("active")) return;

    const rect = slide.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    const rotateX = (y / rect.height) * -10;
    const rotateY = (x / rect.width) * 10;

    slide.style.transform = `scale(1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  handleMouseLeave(event) {
    const slide = event.currentTarget;
    if (!slide.classList.contains("active")) return;

    slide.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)";
  }

  updateCarousel() {
    this.slides.forEach((slide, index) => {
      slide.classList.remove("active", "prev", "next", "hidden");

      if (index === this.currentSlide) {
        slide.classList.add("active");
      } else if (index === this.getPrevIndex()) {
        slide.classList.add("prev");
      } else if (index === this.getNextIndex()) {
        slide.classList.add("next");
      } else {
        slide.classList.add("hidden");
      }
    });

    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });
  }

  getPrevIndex() {
    return this.currentSlide === 0
      ? this.slides.length - 1
      : this.currentSlide - 1;
  }

  getNextIndex() {
    return this.currentSlide === this.slides.length - 1
      ? 0
      : this.currentSlide + 1;
  }

  prevSlide() {
    this.currentSlide = this.getPrevIndex();
    this.updateCarousel();
    this.restartAutoSlide();
  }

  nextSlide() {
    this.currentSlide = this.getNextIndex();
    this.updateCarousel();
    this.restartAutoSlide();
  }

  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlide = index;
      this.updateCarousel();
      this.restartAutoSlide();
    }
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  restartAutoSlide() {
    this.stopAutoSlide();
    setTimeout(() => {
      this.startAutoSlide();
    }, 1000); // Restart after 1 second
  }

  addTouchSupport() {
    const carousel = document.getElementById("projectsCarousel");
    if (!carousel) return;

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let minSwipeDistance = 50;

    carousel.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchmove",
      (e) => {
        // Prevent scrolling while swiping
        if (
          Math.abs(e.touches[0].clientX - startX) >
          Math.abs(e.touches[0].clientY - startY)
        ) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    carousel.addEventListener(
      "touchend",
      (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;

        const diffX = startX - endX;
        const diffY = startY - endY;

        // Check if horizontal swipe is more significant than vertical
        if (
          Math.abs(diffX) > Math.abs(diffY) &&
          Math.abs(diffX) > minSwipeDistance
        ) {
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }
      },
      { passive: true }
    );
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ProjectsCarousel();
});

// Image-only carousel - no buttons needed
