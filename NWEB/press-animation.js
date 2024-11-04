document.addEventListener("DOMContentLoaded", function () {
  const titleWords = document.querySelectorAll(".press-title div");
  const description = document.querySelector(".press-description");

  // Initial state setup
  titleWords.forEach((word, index) => {
    // Set initial styles
    word.style.opacity = "0";
    word.style.transform = "translateY(20px)";
    word.style.transition = "all 0.8s ease";

    // Animate each word with delay
    setTimeout(() => {
      word.style.opacity = "1";
      word.style.transform = "translateY(0)";
    }, 300 * (index + 1));

    // Add hover effects
    word.addEventListener("mouseover", function () {
      this.style.transform = "translateX(20px)";
      this.style.color = "#000";
      this.style.cursor = "default";
    });

    word.addEventListener("mouseout", function () {
      this.style.transform = "translateY(0)";
      this.style.color = "";
    });
  });

  // Animate description
  if (description) {
    description.style.opacity = "0";
    description.style.transform = "translateY(20px)";
    description.style.transition = "all 1s ease";

    // Animate description after title animation
    setTimeout(() => {
      description.style.opacity = "1";
      description.style.transform = "translateY(0)";
    }, 1200);
  }
});
