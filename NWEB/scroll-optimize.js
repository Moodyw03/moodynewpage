document.addEventListener("DOMContentLoaded", function () {
  // Check if device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Optimize scroll performance on mobile
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener(
      "scroll",
      function () {
        lastScroll = window.scrollY;

        if (!ticking) {
          window.requestAnimationFrame(function () {
            // Optimize footer visibility
            const footer = document.querySelector("footer");
            if (footer) {
              if (lastScroll > 100) {
                footer.style.transform = "translateY(100%)";
                footer.style.transition = "transform 0.3s ease-out";
              } else {
                footer.style.transform = "translateY(0)";
              }
            }

            // Optimize scroll performance for heavy elements
            const heavyElements = document.querySelectorAll(
              "img, iframe, .visual-box, .grid-box"
            );
            heavyElements.forEach((element) => {
              if (isElementInViewport(element)) {
                element.style.willChange = "transform";
              } else {
                element.style.willChange = "auto";
              }
            });

            ticking = false;
          });

          ticking = true;
        }
      },
      { passive: true }
    );

    // Optimize touch events
    document.addEventListener("touchstart", function () {}, { passive: true });
    document.addEventListener("touchmove", function () {}, { passive: true });

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // Reset scroll position on page load
    window.scrollTo(0, 0);

    // Optimize image loading
    const images = document.querySelectorAll("img[src]");
    images.forEach((img) => {
      img.loading = "lazy";
    });
  }
});
