document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const gridBoxes = document.querySelectorAll(".grid-box");

  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();

    gridBoxes.forEach((box) => {
      const albumTitle = box
        .querySelector(".album-title")
        .textContent.toLowerCase();
      const shouldShow = albumTitle.includes(searchTerm);
      box.style.display = shouldShow ? "flex" : "none";
    });
  });
});
