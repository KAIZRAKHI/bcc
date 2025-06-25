// Filter Projects
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      if (filter === "all" || filter === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeButton = document.querySelector(".close-btn");

  modal.style.display = "none";

  document.querySelectorAll(".clickable-image").forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImage.src = this.src;
    });
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  const videoItems = document.querySelectorAll(
    '.portfolio-item[data-category="video"]'
  );

  videoItems.forEach((item) => {
    const iframe = item.querySelector("iframe");
    if (iframe) {
      const title = iframe.getAttribute("title");
      item.setAttribute("data-title", title);
    }
  });
});
