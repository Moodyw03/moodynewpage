document.addEventListener("DOMContentLoaded", function () {
  // Function to animate titles
  function animateTitles(containerClass) {
    const titleWords = document.querySelectorAll(`${containerClass} div`);

    // Initial state for all words
    titleWords.forEach((word, index) => {
      word.style.opacity = "0";
      word.style.transform = "translateX(-30px)";
      word.style.transition = "all 0.8s ease";

      // Animate each word with delay
      setTimeout(() => {
        word.style.opacity = "1";
        word.style.transform = "translateX(0)";
      }, 300 * (index + 1));

      // Add hover effects
      word.addEventListener("mouseover", function () {
        this.style.transform = "translateX(20px) scale(1.1)";
        this.style.color = "#000";
        this.style.cursor = "default";
      });

      word.addEventListener("mouseout", function () {
        this.style.transform = "translateX(0) scale(1)";
        this.style.color = "";
      });
    });

    // Add continuous floating animation after initial animation
    setTimeout(() => {
      titleWords.forEach((word) => {
        word.style.animation = "float 3s ease-in-out infinite";
      });
    }, 2000);
  }

  // Add floating keyframes to the document
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
    `;
  document.head.appendChild(styleSheet);

  // Initialize animations for both pages
  if (document.querySelector(".contact-title")) {
    animateTitles(".contact-title");
  }
  if (document.querySelector(".press-title")) {
    animateTitles(".press-title");
  }
});
