const icons = ['💎', '🎲', '🪙', '7️⃣', '🃏', '🔔'];
let money = 100;

const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3")
];

const result = document.getElementById("result");
const balance = document.getElementById("balance");
const lever = document.getElementById("lever");
const spinButton = document.getElementById("spinButton");

function getRandomSymbol() {
  return icons[Math.floor(Math.random() * icons.length)];
}

function spin() {
  if (money < 10) {
    result.innerText = "❌ Not enough money!";
    return;
  }

  money -= 10;
  balance.innerText = `Balance: $${money}`;
  result.innerText = "🎰 Spinning...";

  const outcome = [];

  reels.forEach((reel, index) => {
    setTimeout(() => {
      const symbol = getRandomSymbol();
      reel.innerText = symbol;
      outcome[index] = symbol;

      if (index === reels.length - 1) {
        checkWin(outcome);
      }
    }, 300 * index);
  });
}

function checkWin([a, b, c]) {
  if (a === b && b === c) {
    result.innerText = "🎉 JACKPOT! +$200";
    money += 200;
  } else if (a === b || b === c || a === c) {
    result.innerText = "✨ Nice! +$50";
    money += 50;
  } else {
    result.innerText = "😓 Try again!";
  }
  balance.innerText = `Balance: $${money}`;
}

// Button click
spinButton.addEventListener("click", spin);

// Lever drag
let dragging = false;
let startY = 0;

lever.addEventListener("mousedown", (e) => {
  dragging = true;
  startY = e.clientY;
  lever.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
  if (dragging) {
    dragging = false;
    lever.style.top = "0px";
    lever.style.cursor = "grab";
  }
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  let deltaY = e.clientY - startY;
  deltaY = Math.max(0, Math.min(100, deltaY));
  lever.style.top = `${deltaY}px`;

  if (deltaY > 70) {
    dragging = false;
    lever.style.top = "0px";
    spin();
  }
});
