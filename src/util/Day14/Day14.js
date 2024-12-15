const WIDE = 101;
const TALL = 103;
const cellSize = 6;
const padding = 3;
const activeColor = "#000";
const inactiveColor = "#fff";
const canvasElement = document.getElementById("matrixCanvas");
const ctx = canvasElement.getContext("2d");

function createEmptyGuardArea(w, h, val) {
  var arr = [];
  for (let i = 0; i < h; i++) {
    arr[i] = [];
    for (let j = 0; j < w; j++) {
      arr[i][j] = val;
    }
  }
  return arr;
}

function drawGuardArea(startIteration = 7340) {
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  const guardArea = generateGuardArea(data, startIteration);
  if (!guardArea || !guardArea.length) return;

  const rows = guardArea.length;
  const cols = guardArea[0].length;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cellX = x * (cellSize + padding);
      const cellY = y * (cellSize + padding);

      ctx.fillStyle = !guardArea[y][x] ? activeColor : inactiveColor;
      ctx.fillRect(cellX, cellY, cellSize, cellSize);
    }
  }

  setTimeout(() => requestAnimationFrame(() => drawGuardArea(1)), 1000);
}

function generateGuardArea(robots, startIteration = 1) {
  const guardArea = createEmptyGuardArea(WIDE, TALL, 0);
  robots.forEach((robot) => {
    const xDistance = robot.velocity[0] * startIteration;
    const yDistance = robot.velocity[1] * startIteration;
    let xFinalPosition = (robot.position[0] + xDistance) % WIDE;
    let yFinalPosition = (robot.position[1] + yDistance) % TALL;

    if (xFinalPosition < 0) {
      xFinalPosition = WIDE + xFinalPosition;
    }
    if (yFinalPosition < 0) {
      yFinalPosition = TALL + yFinalPosition;
    }

    robot.position = [xFinalPosition, yFinalPosition];
    guardArea[yFinalPosition][xFinalPosition] = 1;
  });
  return guardArea;
}

drawGuardArea(7340);
