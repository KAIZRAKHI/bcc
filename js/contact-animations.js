// Contact Section Animations
class ContactAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupHoverEffects();
    this.setupSocialMediaTracking();
  }

  setupIntersectionObserver() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    // Observe contact cards
    const contactCards = document.querySelectorAll(".contact-card");
    contactCards.forEach((card) => {
      observer.observe(card);
    });

    // Observe social icons
    const socialIcons = document.querySelectorAll(".social-icon-link");
    socialIcons.forEach((icon) => {
      observer.observe(icon);
    });

    // Add CSS for fade-in animation
    this.addFadeInStyles();
  }

  setupHoverEffects() {
    // Enhanced hover effects for contact cards
    const contactCards = document.querySelectorAll(".contact-card");

    contactCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        this.animateCardHover(card, true);
      });

      card.addEventListener("mouseleave", () => {
        this.animateCardHover(card, false);
      });
    });

    // Social media icon hover effects
    const socialLinks = document.querySelectorAll(".social-icon-link");

    socialLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        this.animateSocialHover(link, true);
      });

      link.addEventListener("mouseleave", () => {
        this.animateSocialHover(link, false);
      });
    });
  }

  setupSocialMediaTracking() {
    // Track social media clicks for analytics
    const socialLinks = document.querySelectorAll(".social-icon-link");

    socialLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const platform = this.getSocialPlatform(link.href);
        this.trackSocialClick(platform);

        // Add click animation
        this.animateClick(link);
      });
    });
  }

  animateCardHover(card, isHovering) {
    const iconWrapper = card.querySelector(".contact-icon-wrapper");
    const title = card.querySelector(".contact-card-title");

    if (isHovering) {
      // Add glow effect
      iconWrapper.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.2)";
      title.style.color = "#f1f5f9";

      // Slight rotation animation
      iconWrapper.style.transform = "rotate(5deg) scale(1.1)";
    } else {
      iconWrapper.style.boxShadow = "none";
      title.style.color = "#ffffff";
      iconWrapper.style.transform = "rotate(0deg) scale(1)";
    }
  }

  animateSocialHover(link, isHovering) {
    const wrapper = link.querySelector(".social-icon-wrapper");
    const label = link.querySelector(".social-label");

    if (isHovering) {
      // Add subtle pulse animation
      wrapper.style.animation = "pulse 1.5s infinite";
      label.style.transform = "translateY(-2px)";
    } else {
      wrapper.style.animation = "none";
      label.style.transform = "translateY(0)";
    }
  }

  animateClick(element) {
    // Add click ripple effect
    element.style.transform = "scale(0.95)";

    setTimeout(() => {
      element.style.transform = "scale(1)";
    }, 150);
  }

  getSocialPlatform(url) {
    if (url.includes("instagram")) return "Instagram";
    if (url.includes("whatsapp") || url.includes("wa.me")) return "WhatsApp";
    if (url.includes("facebook")) return "Facebook";
    if (url.includes("linkedin")) return "LinkedIn";
    if (url.includes("twitter")) return "Twitter";
    if (url.includes("youtube")) return "YouTube";
    return "Unknown";
  }

  trackSocialClick(platform) {
    // Analytics tracking (can be integrated with Google Analytics, etc.)
    console.log(`Social media click: ${platform}`);

    // Example: Google Analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", "social_media_click", {
        platform: platform,
        page_location: window.location.href,
      });
    }
  }

  addFadeInStyles() {
    // Add CSS animation styles dynamically
    const styles = `
      <style>
        .contact-card,
        .social-icon-link {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .contact-card.fade-in,
        .social-icon-link.fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .contact-card:nth-child(1) { transition-delay: 0.1s; }
        .contact-card:nth-child(2) { transition-delay: 0.2s; }
        .contact-card:nth-child(3) { transition-delay: 0.3s; }
        
        .social-icon-link:nth-child(1) { transition-delay: 0.1s; }
        .social-icon-link:nth-child(2) { transition-delay: 0.2s; }
        .social-icon-link:nth-child(3) { transition-delay: 0.3s; }
        .social-icon-link:nth-child(4) { transition-delay: 0.4s; }
        .social-icon-link:nth-child(5) { transition-delay: 0.5s; }
        .social-icon-link:nth-child(6) { transition-delay: 0.6s; }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .contact-icon-wrapper {
          transition: all 0.3s ease;
        }
        
        .social-label {
          transition: all 0.3s ease;
        }
      </style>
    `;

    document.head.insertAdjacentHTML("beforeend", styles);
  }
}

// Initialize contact animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ContactAnimations();
});

// Smooth scroll to contact section
function scrollToContact() {
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Export for potential use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = ContactAnimations;
}
