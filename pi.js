const playPause = document.getElementById("play-pause");

let theta = 0;
let thetaOfSecondaryLine = 0;
const pi = Math.PI;
const trail = [];

let play = true;

playPause.addEventListener("click", () => {
  play = !play;
  if (play) {
    playPause.innerHTML = "Pause";
    window.requestAnimationFrame(piBeingIrrational);
  } else {
    playPause.innerHTML = "Play";
  }
});

function piBeingIrrational() {
  const canvas = document.getElementById("canvas");

  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = "black";
  ctx.clearRect(0, 0, 300, 300);
  ctx.strokeRect(0, 0, 300, 300);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const radius = 40;

  const primaryHandEndX = centerX + radius * Math.cos(theta);
  const primaryHandEndY = centerY + radius * Math.sin(theta);

  ctx.save();
  ctx.lineWidth = 0.8;

  ctx.translate(centerX, centerY);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(primaryHandEndX - centerX, primaryHandEndY - centerY);
  ctx.stroke();

  const drawingHandEndX = primaryHandEndX + radius * Math.cos(theta * pi);
  const drawingHandEndY = primaryHandEndY + radius * Math.sin(theta * pi);

  ctx.beginPath();
  ctx.moveTo(primaryHandEndX - centerX, primaryHandEndY - centerY);
  ctx.lineTo(drawingHandEndX - centerX, drawingHandEndY - centerY);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(primaryHandEndX - centerX, primaryHandEndY - centerY, 2, 0, pi * 2);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  trail.push({
    x: drawingHandEndX,
    y: drawingHandEndY,
  });

  ctx.beginPath();
  ctx.moveTo(trail[0].x, trail[0].y);
  for (let i = 1; i < trail.length; i++) {
    ctx.lineTo(trail[i].x, trail[i].y);
  }
  ctx.stroke();

  theta += (pi / 180) * 1.5;

  if (play) {
    window.requestAnimationFrame(piBeingIrrational);
  }
}

window.requestAnimationFrame(piBeingIrrational);
