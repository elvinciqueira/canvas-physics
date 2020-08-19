const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.globalCompositeOperation = "destination-over";
hue = Math.random() * 360;

let number = 0;
let scale = 10;

function drawFlower() {
  let angle = number * 18;
  let radius = scale * Math.sqrt(number);
  let positionX = radius * Math.sin(angle) + canvas.width / 2;
  let positionY = radius * Math.cos(angle) + canvas.height / 2;

  context.fillStyle = `hsl(${hue}, 100%, 50%)`;
  context.strokeStyle = "black";
  context.lineWidth = 4;

  context.beginPath();
  context.arc(positionX, positionY, number, 0, Math.PI * 2);
  context.closePath();
  context.fill();
  context.stroke();

  number++;
  hue += 0.5;
}

function animate() {
  drawFlower();

  if (number > 150) return;

  requestAnimationFrame(animate);
}

animate();
