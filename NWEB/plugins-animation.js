// Text scramble animation for plugins title
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#$%&()~ΔΠΣΩθλτφψ01010101";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 30); // Faster start
      const end = start + Math.floor(Math.random() * 30); // Faster completion
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", () => {
  // Clear any existing styles that might affect positioning
  document.querySelectorAll(".plugins-title div").forEach((el) => {
    el.style.position = "relative";
    el.style.top = "auto";
    el.style.left = "auto";
    el.style.right = "auto";
    el.style.bottom = "auto";
  });

  const titleElements = document.querySelectorAll(".plugins-title div");
  const fx = [];

  // Create scramblers for each title element
  titleElements.forEach((el) => {
    fx.push(new TextScramble(el));
  });

  // Store original text content
  const originalText = [];
  titleElements.forEach((el) => {
    originalText.push(el.textContent);
    el.textContent = "";
  });

  // Ensure elements are in the correct order for animation
  // The order is: AUDIO, PLUGINS, & TOOLS (exploring, the-next, possibility)
  const exploring = document.querySelector(".plugins-title .exploring");
  const theNext = document.querySelector(".plugins-title .the-next");
  const possibility = document.querySelector(".plugins-title .possibility");

  // Start animations in sequence
  setTimeout(() => {
    if (exploring) fx[0].setText(originalText[0]); // AUDIO
    setTimeout(() => {
      if (theNext) fx[1].setText(originalText[1]); // PLUGINS
      setTimeout(() => {
        if (possibility) fx[2].setText(originalText[2]); // & TOOLS
      }, 250);
    }, 250);
  }, 300);

  // Add animation to replay when clicked
  const titleContainer = document.querySelector(".plugins-title");
  if (titleContainer) {
    titleContainer.addEventListener("click", () => {
      // Add a subtle flash effect when clicked
      titleContainer.style.animation = "flash 0.5s";
      setTimeout(() => {
        titleContainer.style.animation = "";
      }, 500);

      // Replay animations with a slight delay between each word
      titleElements.forEach((el, i) => {
        el.innerHTML = "";
        setTimeout(() => {
          fx[i].setText(originalText[i]);
        }, i * 150);
      });
    });

    // Add flash animation keyframes
    const flashAnimation = document.createElement("style");
    flashAnimation.textContent = `
      @keyframes flash {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(flashAnimation);
  }
});
