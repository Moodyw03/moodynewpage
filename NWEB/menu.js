
// menu
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navMenu = document.querySelector(".top-nav nav");
  
    hamburgerMenu.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
  });
  