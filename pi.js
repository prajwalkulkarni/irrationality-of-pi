const playPause = document.getElementById("play-pause");

let rotation = 0;
let rotationOfSecondaryLine = 0;
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
  // ctx.scale(0.5,0.5);
  ctx.save();

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const radius = 40;

  const primaryHandX = centerX + radius * Math.cos(rotation);
  const primaryHandY = centerY + radius * Math.sin(rotation);

  ctx.lineWidth = 0.8;

  ctx.translate(centerX, centerY);
  ctx.beginPath();
  ctx.rotate(rotation);
  ctx.moveTo(0, 0);
  ctx.lineTo(primaryHandX - centerX, primaryHandY - centerY);
  ctx.stroke();

  const drawingHandX =
    primaryHandX + radius * Math.cos(rotationOfSecondaryLine + rotation);
  const drawingHandY =
    primaryHandY + radius * Math.sin(rotationOfSecondaryLine + rotation);

  // ctx.translate(20,0);
  ctx.beginPath();
  // ctx.rotate(rotationOfSecondaryLine);
  ctx.moveTo(primaryHandX - centerX, primaryHandY - centerY);
  ctx.lineTo(drawingHandX - centerX, drawingHandY - centerY);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(primaryHandX - centerX, primaryHandY - centerY, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  trail.push({
    x: drawingHandX - centerX,
    y: drawingHandY - centerY,
  });

  ctx.beginPath();
  ctx.moveTo(trail[0].x, trail[0].y);
  for (let i = 1; i < trail.length; i++) {
    ctx.lineTo(trail[i].x, trail[i].y);
  }
  ctx.stroke();

  rotation += (Math.PI / 180) * 0.5;
  rotationOfSecondaryLine += (Math.PI / 180) * 0.5 * Math.PI * 2;

  ctx.restore();

  if (play) {
    window.requestAnimationFrame(piBeingIrrational);
  }
}

window.requestAnimationFrame(piBeingIrrational);
