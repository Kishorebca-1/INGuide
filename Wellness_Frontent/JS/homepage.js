const affirmations = [
  "I am allowed to move gently through today.",
  "I do not need to have everything figured out.",
  "Rest is part of the journey, not a reward for finishing it.",
  "I can make space for what I feel without becoming it.",
  "Small steps still count.",
  "I deserve kindness from myself, too.",
  "Today does not have to be perfect to be meaningful.",
  "I can pause, breathe, and begin again."
];

const boardMessages = {
  breathe: "A quiet corner for a 60-second breathing reset.",
  journal: "A few gentle prompts can help untangle a busy mind.",
  "check-in": "Ask yourself: What am I feeling? What do I need? What can wait?",
  rituals: "Small rituals make ordinary moments feel safe and familiar.",
  gratitude:
    "Name one small thing from today that felt warm, kind, funny or beautiful.",
  resources: "A curated space for supportive resources and trusted help.",
  comfort: "Soft words for difficult days, stored here for when you need them.",
  community: "A reminder that care becomes lighter when it is shared."
};

const flowerHost = document.getElementById("flowers");

const ringFlowers = [
  [21, 18, "var(--petal)", -10],
  [31, 12, "#d9a0ad", 6],
  [42, 10, "#e2c68e", -4],
  [54, 12, "#b9cba9", 8],
  [66, 18, "#d1b5d3", -8],
  [78, 30, "#e6c39d", 10],
  [89, 47, "#dca3ab", -4],
  [84, 63, "#b7cba8", 8],
  [74, 77, "#e4b9b9", -8],
  [59, 89, "#cdb0d4", 5],
  [41, 91, "#dfc18d", -6],
  [27, 80, "#d39eaa", 9],
  [13, 65, "#b9cba9", -6],
  [10, 48, "#d0b2d2", 5],
  [14, 34, "#e6c39d", -8]
];

ringFlowers.forEach(([x, y, color, tilt], index) => {
  const el = document.createElement("div");

  el.className =
    "flower " +
    (index % 3 === 0 ? "" : index % 2 ? "small" : "tiny");

  el.style.left = x + "%";
  el.style.top = y + "%";

  el.style.setProperty("--flower-color", color);
  el.style.setProperty("--stem-tilt", tilt + "deg");

  el.innerHTML = `
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="core"></span>
    <span class="leaf"></span>
    <span class="leaf right"></span>
  `;

  flowerHost.appendChild(el);
});

/*
 * A second layer of stems and blossoms
 * makes the wreath feel like a real gathered bouquet.
 */

const innerFlowers = [
  [29, 34, "#e4c29a", -16],
  [38, 27, "#d5a4b0", 8],
  [49, 30, "#b6c8a6", -7],
  [60, 33, "#c9add0", 12],
  [70, 42, "#dfb995", -9],
  [69, 57, "#dca6af", 7],
  [59, 67, "#b8caa8", -12],
  [48, 72, "#d5b0cf", 5],
  [38, 68, "#e3bf8f", 11],
  [29, 58, "#d8a5af", -6],
  [27, 46, "#b9caa9", 8],
  [49, 46, "#ead0a0", 0]
];

innerFlowers.forEach(([x, y, color, tilt], i) => {
  const el = document.createElement("div");

  el.className = "flower " + (i % 2 ? "small" : "tiny");

  el.style.left = x + "%";
  el.style.top = y + "%";

  el.style.setProperty("--flower-color", color);
  el.style.setProperty("--stem-tilt", tilt + "deg");

  el.style.opacity = ".92";

  el.innerHTML = `
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="core"></span>
    <span class="leaf"></span>
    <span class="leaf right"></span>
  `;

  flowerHost.appendChild(el);
});

const affirmation = document.getElementById("affirmation");

let affirmationIndex = 0;

document
  .getElementById("refreshAffirmation")
  .addEventListener("click", () => {
    affirmation.classList.add("fade");

    setTimeout(() => {
      affirmationIndex =
        (affirmationIndex + 1) % affirmations.length;

      affirmation.textContent = affirmations[affirmationIndex];

      affirmation.classList.remove("fade");
    }, 200);
  });

const announcement = document.getElementById("announcement");
const announcementText = document.getElementById("announcementText");
const closeAnnouncement =
  document.getElementById("closeAnnouncement");

function showAnnouncement(text) {
  announcementText.textContent = text;
  announcement.classList.add("show");
}

closeAnnouncement.addEventListener("click", () => {
  announcement.classList.remove("show");

  // A "carry-away" bird appears after the user closes the board.
  setTimeout(() => makeBird({ mode: "carry" }), 350);
});

document.querySelectorAll(".board").forEach((board) => {
  board.addEventListener("click", () => {
    // Keep your existing animation
    board.classList.remove("rattle");

    void board.offsetWidth;

    board.classList.add("rattle");

    // Get the feature that was clicked
    const pageName = board.dataset.page;

    // Remember the feature
    sessionStorage.setItem(
      "afterLogin",
      pageName + ".html"
    );

    // Go to login
    setTimeout(() => {
      window.location.href = "../Authentication/Login.html";
    }, 220);
  });
});

function createPetal(x, y, index) {
  const p = document.createElement("div");

  p.className = "petal";

  const colors = [
    "#e9b7ba",
    "#f1d09b",
    "#c8d9c2",
    "#d5bdd9"
  ];

  p.style.left = x + "px";
  p.style.top = y + "px";

  p.style.setProperty(
    "--pc",
    colors[index % colors.length]
  );

  p.style.setProperty(
    "--drift",
    (Math.random() - 0.5) * 180 + "px"
  );

  p.style.setProperty(
    "--fall",
    2.2 + Math.random() * 2.5 + "s"
  );

  document
    .getElementById("petalLayer")
    .appendChild(p);

  p.addEventListener("animationend", () => {
    p.remove();
  });
}

function makePetalRain() {
  const count = 75;

  const originY = 17 + Math.random() * 18;

  for (let i = 0; i < count; i++) {
    const x =
      window.innerWidth *
      (0.15 + Math.random() * 0.7);

    const y =
      window.innerHeight *
        (originY / 100) +
      Math.random() * 50;

    setTimeout(() => {
      createPetal(x, y, i);
    }, i * 20);
  }
}

function makeBird({ mode = "normal", callback } = {}) {
  const bird = document.createElement("div");

  bird.className = "bird";

  const colors = [
    "#dca6b8",
    "#a9bdcd",
    "#d7b26f",
    "#b6c7a7"
  ];

  const color =
    colors[Math.floor(Math.random() * colors.length)];

  bird.style.setProperty("--bird-color", color);

  bird.style.setProperty(
    "--top",
    3 + Math.random() * 20 + "%"
  );

  bird.style.setProperty(
    "--duration",
    11 + Math.random() * 6 + "s"
  );

  bird.innerHTML = `
    <div class="wing a"></div>
    <div class="wing b"></div>
    <div class="body"></div>
    <div class="tail"></div>
    <div class="beak"></div>
  `;

  document
    .getElementById("flyingLayer")
    .appendChild(bird);

  bird.addEventListener("animationend", () => {
    bird.remove();

    if (callback) {
      callback();
    }
  });

  if (mode === "announcement") {
    // As the bird crosses, it leaves a visual trail of petals behind.
    const petalTimer = setInterval(() => {
      if (!document.body.contains(bird)) {
        clearInterval(petalTimer);
        return;
      }

      const r = bird.getBoundingClientRect();

      for (let i = 0; i < 3; i++) {
        createPetal(
          r.left + r.width / 2,
          r.top + r.height / 2,
          Math.floor(Math.random() * 10)
        );
      }
    }, 120);
  }

  return bird;
}

function makeButterfly() {
  const b = document.createElement("div");

  b.className = "butterfly";

  b.style.setProperty(
    "--wing",
    [
      "#c8a9cf",
      "#e5aeb8",
      "#b7cfc3"
    ][Math.floor(Math.random() * 3)]
  );

  b.style.setProperty(
    "--top",
    5 + Math.random() * 18 + "%"
  );

  b.style.setProperty(
    "--duration",
    14 + Math.random() * 7 + "s"
  );

  b.innerHTML = '<div class="dot"></div>';

  document
    .getElementById("flyingLayer")
    .appendChild(b);

  b.addEventListener("animationend", () => {
    b.remove();
  });
}

function playAnnouncementSequence() {
  makeBird({
    mode: "announcement",

    callback: () =>
      setTimeout(
        () =>
          showAnnouncement(
            "A tiny garden announcement: take a slow breath today. You are allowed to make today softer."
          ),
        180
      )
  });
}

// Ambient motion: a little bird or butterfly now and then.
setInterval(() => {
  if (Math.random() > 0.45) {
    makeBird();
  } else {
    makeButterfly();
  }
}, 6500);

// Demo announcement every ~27 seconds.
// Remove this interval once connected to real announcements.
setTimeout(() => playAnnouncementSequence(), 8000);

setInterval(
  () => playAnnouncementSequence(),
  27000
);