document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const mixBoxes = document.querySelectorAll(".gridbox-mixes:not(.big-one)");

  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();

    mixBoxes.forEach((box) => {
      const mixTitle =
        box.querySelector(".sound-link")?.textContent.toLowerCase() || "";
      const shouldShow = mixTitle.includes(searchTerm);
      box.style.display = shouldShow ? "flex" : "none";
    });
  });
});
