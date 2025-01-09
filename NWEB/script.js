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
