// Array of words to be displayed for each section
const wordsExploring = [
  "Novo Bop",
  "Skip and Detail",
  "Arrows of Time",
  "Blue Cars Go Away",
  "Axiom",
  "656f6c6863",
  "Snowball",
  "Music",
  "Vegetable Law",
  "You and Me",
  "Flashbacks",
  "Orbiter",
  "Tantra",
  "Rollin'",
  "Dub Ibixa",
];

const wordsTheNext = [
  "Focus",
  "Planetary Loves",
  "Deep Inside",
  "Lizard Hands",
  "The Tree",
  "Fantastic Reversing Hook",
  "Kalena",
  "Eyrie",
  "At Helena's",
  "Acid Lovin'",
  "Astronaut",
  "Lost Insah",
  "Chloe's Dream",
  "Strange Ways to Have Fun",
  "Voices",
  "Hours After",
];

const wordsPossibility = [
  "Strive",
  "Idaho",
  "Gone",
  "Akin with You",
  "Occurrence 4",
  "Impossible Equals",
  "June Child",
  "Hindsight",
  "Camouflage Ladder",
  "Human Condition",
  "Tale 53",
  "Reflections Of Neon",
  "LA Without A Map",
  "12.0 Parsecs",
  "Live Your Life to Vega",
];

// Function to change text on hover with delay
function changeTextOnHover(elementId, wordArray, offsetDelay = 0) {
  const heroSection = document.querySelector(".hero");
  const element = document.querySelector(elementId);
  let index = 0;
  let lastChangeTime = 0;
  const baseDelay = 800; // Increased base delay to 800ms (0.8 seconds)

  heroSection.addEventListener("mousemove", () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastChangeTime > baseDelay) {
      setTimeout(() => {
        element.textContent = wordArray[index];
        index = (index + 1) % wordArray.length;
      }, offsetDelay);
      lastChangeTime = currentTime;
    }
  });
}

// Apply changeText function to each element with different offset delays
changeTextOnHover(".exploring", wordsExploring, 0); // First section changes immediately
changeTextOnHover(".the-next", wordsTheNext, 250); // Second section changes after 250ms
changeTextOnHover(".possibility", wordsPossibility, 500); // Third section changes after 500ms

function adjustHeroLayout() {
  const hero = document.querySelector(".hero");
  const infoBottom = document.querySelector(".info-bottom");
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  const is14ProMax = window.innerWidth >= 414 && window.innerWidth <= 430;

  // 14 Pro Max specific adjustments
  if (is14ProMax && !isLandscape) {
    const heroHeight = hero.offsetHeight;

    // Calculate dynamic spacing based on viewport height
    const vh = window.innerHeight * 0.01;
    const textSpacing = 8 * vh; // 8vh between text elements

    const textPositions = {
      exploring: 0.12 * heroHeight,
      theNext: 0.12 * heroHeight + textSpacing,
      possibility: 0.12 * heroHeight + textSpacing * 2,
    };

    Object.entries(textPositions).forEach(([cls, position]) => {
      const el = document.querySelector(`.${cls}`);
      if (el) {
        el.style.top = `${position}px`;
        el.style.transform = "translateY(0)";
      }
    });

    // More aggressive spacing adjustments
    infoBottom.style.bottom = `${5 * vh}px`; // 5vh from bottom
    hero.style.paddingBottom = `${2 * vh}px`; // 2vh padding
    hero.style.minHeight = `${window.innerHeight - 15 * vh}px`; // Reserve space
  }

  // Universal vertical centering
  const centerElements = () => {
    const heroHeight = hero.offsetHeight;

    ["exploring", "the-next", "possibility"].forEach((cls, idx) => {
      const el = document.querySelector(`.${cls}`);
      if (el) {
        const offset = isLandscape ? 0.15 + idx * 0.25 : 0.2 + idx * 0.25;
        el.style.top = `${heroHeight * offset}px`;
      }
    });
  };

  // Adjust info-bottom position
  if (isLandscape) {
    infoBottom.style.bottom = "5%";
  } else {
    if (window.innerWidth <= 390) {
      infoBottom.style.bottom = "7%";
    }
  }

  centerElements();
}

// Optimized resize handler
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(adjustHeroLayout, 100);
});

// Initial setup
window.addEventListener("load", adjustHeroLayout);
