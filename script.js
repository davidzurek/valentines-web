/**
 * Valentine's Day Website - Interactive Behavior
 * Handles button interactions, animations, and celebrations
 */

// ========================================
// Constants & Configuration
// ========================================

const CONFIG = {
  yesButtonScaleIncrement: 0.3,
  balloonCount: 15,
  roseCount: 30,
  confettiDuration: 5000,
  balloonRemovalDelay: 8000,
  roseRemovalDelay: 6000,
};

const COLORS = {
  balloons: ["#ff6b9d", "#c06c84", "#ee4266", "#ff91af", "#ffd3e1"],
  confetti: ["#ff0000", "#ff69b4", "#ff1493", "#fff", "#ffc0cb"],
};

const NO_BUTTON_TEXTS = [
  "Oh no! Now I have to go cancel the engagement photographer",
  "Ah I see. Give me one minute... I have to cancel the engagement ring " +
    "I just ordered",
  "Great! Now that lobster dinner for two will be half off!",
  "You can't reject me because I already rejected myself first!",
  "If you change your mind but feel too shy to ask directly, just look me " +
    "square in the eyes and blink three times slowly",
  "Don't do me like that, my pride is extremely fragile right now",
  "I understand. But let me know if my application moves to the 'maybe' " +
    "pile by next year",
  "My wallet thanks you for your service",
  "Understood. I'll just be over here updating my LinkedIn status to " +
    "'Emotionally Unavailable' and staring at a wall for three to five business days.",
  "I respect the decision. Can I at least get some feedback for my next " +
    "interview?",
];

const YES_BUTTON_TEXTS = [
  "Wait, for real? Let me go cancel my professional pining appointment",
  "Cool! I'll try to act normal until then, but no promises",
  "Great! You definitely won't regret this — rubs hands together like a cartoon villain",
  "Perfect. I'll start practicing my 'chill person' face in the mirror now",
  "Excellent. Your application for a fun time has been officially approved",
  "Hold on, my phone must be glitching... it says you actually said yes?",
  "Nice! BRB, just going to do a quick victory lap around my room",
  "Sweet. Now I just have to figure out how to be a functioning human for two hours",
  "Awesome! My therapist is going to be so proud of me",
  "Aight, bet. See you then!",
];

// ========================================
// State Management
// ========================================

const state = {
  yesButtonScale: 1,
  noClickCount: 0,
};

// ========================================
// DOM Elements
// ========================================

const elements = {
  yesButton: null,
  noButton: null,
  modal: null,
  modalText: null,
  backgroundMusic: null,
  carltonIntro1: null,
  carltonIntro2: null,
  carltonINeedYou: null,
  carltonIMissYou: null,
  carltonIWonder: null,
  carltonRefrain: null,
};

// ========================================
// Utility Functions
// ========================================

/**
 * Get a random item from an array
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get a random number between min and max
 */
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// ========================================
// Audio Functions
// ========================================

/**
 * Stop all currently playing audio
 */
function stopAllAudio() {
  // Stop background music
  elements.backgroundMusic.pause();
  elements.backgroundMusic.currentTime = 0;

  // Stop all Carlton audio files
  const carltonAudios = [
    elements.carltonIntro1,
    elements.carltonIntro2,
    elements.carltonINeedYou,
    elements.carltonIMissYou,
    elements.carltonIWonder,
    elements.carltonRefrain,
  ];

  carltonAudios.forEach((audio) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

/**
 * Play Carlton audio based on click count
 * Cycles every 9 clicks starting from click 10
 */
function playCarltonAudio(clickCount) {
  // Normalize click count to cycle every 12 clicks
  const normalizedCount = ((clickCount - 1) % 12) + 1;

  // Map of click positions to audio elements
  const audioMap = {
    1: elements.carltonIntro1,
    3: elements.carltonIntro2,
    4: elements.carltonINeedYou,
    5: elements.carltonIMissYou,
    6: elements.carltonIWonder,
    7: elements.carltonRefrain,
  };

  // Play the audio if there's one for this click count
  const audio = audioMap[normalizedCount];
  if (audio) {
    // Stop all currently playing audio
    stopAllAudio();

    audio.play().catch((error) => {
      console.log("Audio playback prevented:", error);
    });
  }
}

// ========================================
// Animation Functions
// ========================================

/**
 * Trigger confetti celebration
 */
function celebrateWithConfetti() {
  const end = Date.now() + CONFIG.confettiDuration;

  (function frame() {
    // Left side confetti
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: COLORS.confetti,
    });

    // Right side confetti
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: COLORS.confetti,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

/**
 * Create floating balloons
 */
function createBalloons() {
  for (let i = 0; i < CONFIG.balloonCount; i++) {
    setTimeout(() => {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.backgroundColor = getRandomItem(COLORS.balloons);
      balloon.style.animationDuration = `${getRandomNumber(4, 7)}s`;
      balloon.style.animationDelay = `${getRandomNumber(0, 2)}s`;

      document.body.appendChild(balloon);

      // Remove balloon after animation
      setTimeout(() => {
        balloon.remove();
      }, CONFIG.balloonRemovalDelay);
    }, i * 200);
  }
}

/**
 * Create falling roses
 */
function createRoses() {
  for (let i = 0; i < CONFIG.roseCount; i++) {
    setTimeout(() => {
      const rose = document.createElement("div");
      rose.className = "rose";
      rose.textContent = "🌹";
      rose.style.left = `${Math.random() * 100}%`;
      rose.style.animationDuration = `${getRandomNumber(3, 5)}s`;
      rose.style.animationDelay = `${getRandomNumber(0, 1)}s`;

      document.body.appendChild(rose);

      // Remove rose after animation
      setTimeout(() => {
        rose.remove();
      }, CONFIG.roseRemovalDelay);
    }, i * 100);
  }
}

/**
 * Shake the yes button
 */
function shakeYesButton() {
  elements.yesButton.classList.add("shake");
  setTimeout(() => {
    elements.yesButton.classList.remove("shake");
  }, 500);
}

// ========================================
// Event Handlers
// ========================================

/**
 * Handle "No" button click
 */
function handleNoButtonClick() {
  // Increment click count first
  state.noClickCount++;

  // Play Carlton audio based on click count
  playCarltonAudio(state.noClickCount);

  // Increase yes button size
  state.yesButtonScale += CONFIG.yesButtonScaleIncrement;
  elements.yesButton.style.transform = `scale(${state.yesButtonScale})`;

  // Shake yes button
  shakeYesButton();

  // Change no button text randomly
  const randomText = getRandomItem(NO_BUTTON_TEXTS);
  elements.noButton.textContent = randomText;
  elements.noButton.style.fontSize = "1.1rem";
  elements.noButton.style.padding = "1rem 1.5rem";
  elements.noButton.style.textTransform = "none";
  elements.noButton.style.whiteSpace = "normal";
  elements.noButton.style.wordWrap = "break-word";
  elements.noButton.style.lineHeight = "1.5";
  elements.noButton.style.width = "350px";
  elements.noButton.style.maxWidth = "400px";
  elements.noButton.style.height = "auto";
}

/**
 * Handle "Yes" button click
 */
function handleYesButtonClick() {
  // Trigger all celebrations
  celebrateWithConfetti();
  createBalloons();
  createRoses();

  // Stop all audio and play background music
  stopAllAudio();
  elements.backgroundMusic.play().catch((error) => {
    console.log("Audio autoplay prevented:", error);
  });

  // Show modal with random text
  const randomText = getRandomItem(YES_BUTTON_TEXTS);
  elements.modalText.textContent = randomText;
  elements.modal.classList.add("active");
}

/**
 * Close the modal
 */
function closeModal() {
  elements.modal.classList.remove("active");
}

// ========================================
// Initialization
// ========================================

/**
 * Initialize the application
 */
function init() {
  // Cache DOM elements
  elements.yesButton = document.getElementById("yesButton");
  elements.noButton = document.getElementById("noButton");
  elements.modal = document.getElementById("modal");
  elements.modalText = document.getElementById("modalText");
  elements.backgroundMusic = document.getElementById("backgroundMusic");
  elements.carltonIntro1 = document.getElementById("carltonIntro1");
  elements.carltonIntro2 = document.getElementById("carltonIntro2");
  elements.carltonINeedYou = document.getElementById("carltonINeedYou");
  elements.carltonIMissYou = document.getElementById("carltonIMissYou");
  elements.carltonIWonder = document.getElementById("carltonIWonder");
  elements.carltonRefrain = document.getElementById("carltonRefrain");

  // Attach event listeners
  elements.yesButton.addEventListener("click", handleYesButtonClick);
  elements.noButton.addEventListener("click", handleNoButtonClick);

  // Make closeModal function globally accessible for inline handler
  window.closeModal = closeModal;
}

// Initialize when DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
