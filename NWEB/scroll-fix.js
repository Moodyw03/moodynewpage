document.addEventListener("DOMContentLoaded", function () {
  // Prevent body scroll when touching inputs on iOS
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      document.body.style.position = "relative";
    });
    input.addEventListener("blur", function () {
      document.body.style.position = "";
    });
  });

  // Fix for iOS momentum scrolling
  document.addEventListener(
    "touchmove",
    function (e) {
      if (e.target.closest(".scrollable-content")) {
        e.stopPropagation();
      }
    },
    { passive: true }
  );

  // Reset viewport height for mobile browsers
  function resetViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  window.addEventListener("resize", resetViewportHeight);
  window.addEventListener("orientationchange", resetViewportHeight);
  resetViewportHeight();
});
