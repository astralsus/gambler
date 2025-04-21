const luckyIcons = ['🎲', '💰', '💎', '🔔', '7️⃣', '🃏'];
let wallet = 100;

const spinnySquares = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];

const casinoShell = document.getElementById("machineWrapper");

function grabSymbol() {
  return luckyIcons[Math.floor(Math.random() * luckyIcons.length)];
}

function doTheSpin() {
  if (wallet < 10) {
    document.getElementById('result').innerText = '💸 Broke, buddy!';
    return;
  }

  wallet -= 10;
  document.getElementById('balance').innerText = `Balance: $${wallet}`;
  document.getElementById('result').innerText = '🎲 Rolling...';

  let finalRoll = [];

  spinnySquares.forEach((square, i) => {
    square.style.transform = 'rotateX(360deg)';
    setTimeout(() => {
      const emoji = grabSymbol();
      square.innerText = emoji;
      square.style.transform = 'rotateX(0deg)';
      finalRoll[i] = emoji;

      if (i === spinnySquares.length - 1) {
        destinyCheck(finalRoll);
      }
    }, 500 + i * 300);
  });
}

function destinyCheck([x, y, z]) {
  const resultBox = document.getElementById('result');
  casinoShell.classList.remove("win", "jackpot");

  if (x === '7️⃣' && y === '7️⃣' && z === '7️⃣') {
    resultBox.innerText = '💥 SEVENS JACKPOT!!! +$500';
    wallet += 500;
    casinoShell.classList.add("jackpot");
  } else if (x === y && y === z) {
    resultBox.innerText = '🎉 Triple Threat! +$100';
    wallet += 100;
    casinoShell.classList.add("win");
  } else if (x === y || y === z || x === z) {
    resultBox.innerText = '🟡 Double Match! +$20';
    wallet += 20;
  } else {
    resultBox.innerText = '😵 No luck this round!';
  }

  document.getElementById('balance').innerText = `Balance: $${wallet}`;
}

function cashRain() {
  wallet += 50;
  document.getElementById('balance').innerText = `Balance: $${wallet}`;
  document.getElementById('result').innerText = '💰 +$50 added!';
}

const joystick = document.getElementById("lever");
let pulling = false;
let originY = 0;

joystick.addEventListener("mousedown", (e) => {
  pulling = true;
  originY = e.clientY;
  joystick.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
  if (pulling) {
    pulling = false;
    joystick.style.cursor = "grab";
    joystick.style.top = `0px`;
  }
});

document.addEventListener("mousemove", (e) => {
  if (!pulling) return;

  let yDistance = e.clientY - originY;
  yDistance = Math.min(100, Math.max(0, yDistance));
  joystick.style.top = `${yDistance}px`;

  if (yDistance > 80) {
    pulling = false;
    joystick.style.cursor = "grab";
    joystick.style.top = `0px`;
    doTheSpin();
  }
});
