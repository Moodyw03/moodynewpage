document.addEventListener("DOMContentLoaded", function () {
  const titleWords = document.querySelectorAll(".visuals-title div");
  const description = document.querySelector(".visual-description");

  // Animate each word with a delay
  titleWords.forEach((word, index) => {
    // Initial state
    word.style.opacity = "0";
    word.style.transform = "translateY(20px)";
    word.style.transition = "all 0.8s ease";

    // Animate with delay based on index
    setTimeout(() => {
      word.style.opacity = "1";
      word.style.transform = "translateY(0)";
    }, 300 * (index + 1));

    // Add hover effect
    word.addEventListener("mouseover", function () {
      this.style.color = "#000";
      this.style.transform = "scale(1.1)";
      this.style.cursor = "default";
    });

    word.addEventListener("mouseout", function () {
      this.style.color = "";
      this.style.transform = "scale(1)";
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
