let rotation = 0;
let rotationOfSecondaryLine = 0;
const trail = [];
function piBeingIrrational(){

  const canvas = document.getElementById("canvas");

  const ctx = canvas.getContext("2d");

  
  ctx.strokeStyle = "black";
  ctx.clearRect(0,0,150,150);
  ctx.strokeRect(0,0,150,150);
  // ctx.scale(0.5,0.5);
  ctx.save();

  ctx.lineWidth = 2;
  ctx.translate(75,75);
  ctx.beginPath();
  ctx.rotate(rotation);
  ctx.moveTo(0,0);
  ctx.lineTo(20,0);
  ctx.stroke();
  


  ctx.translate(20,0);
  ctx.beginPath();
  ctx.rotate(rotationOfSecondaryLine);
  ctx.moveTo(0,0);
  ctx.lineTo(0,20);
  ctx.stroke();



  ctx.beginPath();
  ctx.arc(0, 0, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  trail.push({ x: 20* Math.cos(rotation), y:  20*Math.sin(rotation) });

  // Draw dots at the positions in the trail array
  ctx.fillStyle = "red"; // Set dot color
  for (const point of trail) {
    
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  // Limit the trail to a certain length (adjust as needed)
  if (trail.length > 100) {
    trail.shift();
  }

  rotation += (Math.PI / 180) * 0.5;
  rotationOfSecondaryLine += (Math.PI / 180) * 0.5;

  ctx.restore();

  // window.requestAnimationFrame(piBeingIrrational);
}

window.requestAnimationFrame(piBeingIrrational);





 
