const playPause = document.getElementById("play-pause");
const zoomIn = document.getElementById("plus");
const zoomOut = document.getElementById("minus");
const reset = document.getElementById("reset");

playPause.addEventListener("click", () => {
  play = !play;
  if (play) {
    playPause.innerHTML = "Pause";
    playPause.style.width = "60px";
    piBeingIrrational();
  } else {
    playPause.innerHTML = "Play";
    playPause.style.width = "50px";
  }
});

let scale = 1.2;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener("click", (e) => {
  ctx.translate(e.offsetX, e.offsetY);
  ctx.scale(scale, scale);
  ctx.translate(-e.offsetX, -e.offsetY);
  if (!play) {
    piBeingIrrational();
  }
});
zoomIn.addEventListener("click", (e) => {
  ctx.translate(150, 150);
  ctx.scale(scale, scale);
  ctx.translate(-150, -150);
  if (!play) {
    piBeingIrrational();
  }
});

zoomOut.addEventListener("click", () => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (!play) {
    piBeingIrrational();
  }
});

let theta = 0.8901179185171084;
const pi = Math.PI;
const trail = [];
let play = true;

reset.addEventListener("click", () => {
  theta = 0.8901179185171084;
  trail.length = 0;

  if (!play) {
    piBeingIrrational();
  }
});
function piBeingIrrational() {
  ctx.strokeStyle = "black";
  ctx.clearRect(0, 0, 300, 300);
  ctx.strokeRect(0, 0, 300, 300);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const radius = 40;

  const primaryHandEndX = centerX - radius * Math.cos(theta);
  const primaryHandEndY = centerY - radius * Math.sin(theta);

  ctx.save();
  ctx.lineWidth = 0.5;

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

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(trail[0].x, trail[0].y);
  ctx.lineWidth = 0.5;
  for (let i = 1; i < trail.length; i++) {
    ctx.lineTo(trail[i].x, trail[i].y);
  }
  ctx.stroke();
  ctx.restore();

  theta -= (pi / 180) * 1.5;

  //The angles and arithemetic operations are inverted to have an anticlockwise rotation.

  if (play) {
    window.requestAnimationFrame(piBeingIrrational);
  }
}

window.requestAnimationFrame(piBeingIrrational);
