const canvas = document.getElementById("heartbeatCanvas");
const ctx = canvas.getContext("2d");
const heartbeatSound = document.getElementById("heartbeatSound");

// Set canvas size
canvas.width = 500;
canvas.height = 300;

// Heartbeat settings
let speed = 2;
let time = 0;
let isHovering = false;

function drawHeartbeat() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the heartbeat line (red)
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#d32f2f";
  
  for (let x = 0; x < canvas.width; x++) {
    const y = Math.sin(time + x * 0.05) * 30 + 
              Math.sin(time * 3 + x * 0.1) * 10 + 
              canvas.height / 3; // Adjusted to upper part of canvas
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Draw heart at the BOTTOM (centered)
  const heartSize = 20;
  const heartX = canvas.width / 2;
  const heartY = canvas.height - 50; // Position near bottom

  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.moveTo(heartX, heartY);
  ctx.bezierCurveTo(
    heartX, heartY - heartSize,
    heartX + heartSize * 1.5, heartY - heartSize,
    heartX + heartSize * 1.5, heartY
  );
  ctx.bezierCurveTo(
    heartX + heartSize * 1.5, heartY + heartSize / 2,
    heartX, heartY + heartSize * 1.5,
    heartX, heartY + heartSize
  );
  ctx.bezierCurveTo(
    heartX, heartY + heartSize * 1.5,
    heartX - heartSize * 1.5, heartY + heartSize / 2,
    heartX - heartSize * 1.5, heartY
  );
  ctx.bezierCurveTo(
    heartX - heartSize * 1.5, heartY - heartSize,
    heartX, heartY - heartSize,
    heartX, heartY
  );
  ctx.fill();

  time += 0.01 * speed;
  requestAnimationFrame(drawHeartbeat);
}

// Event listeners (same as before)
canvas.addEventListener("mouseover", () => {
  speed = 5;
  isHovering = true;
  heartbeatSound.play();
});

canvas.addEventListener("mouseout", () => {
  speed = 2;
  isHovering = false;
  heartbeatSound.pause();
});

canvas.addEventListener("click", () => {
  alert("You make my heart race every day. I love you! ❤️");
});

drawHeartbeat();