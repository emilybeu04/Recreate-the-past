let baseHue;
let colorOffsets = [];

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  baseHue = random(360);

  // store random offsets for each grid cell
  for (let i = 0; i < 16; i++) {
    colorOffsets[i] = random(-30, 30);
  }
}

function draw() {
  background(0, 0, 95);

  let cols = 4;
  let rows = 4;

  let cellW = width / cols;
  let cellH = height / rows;

  let mx = map(mouseX, 0, width, -20, 20);
  let my = map(mouseY, 0, height, -20, 20);

  let breathe = sin(frameCount * 0.015) * 8;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let index = i + j * cols;

      let x = i * cellW + cellW / 2;
      let y = j * cellH + cellH / 2;

      let hueShift = baseHue + index * 12 + colorOffsets[index];

      // OUTER
      fill((hueShift + 40) % 360, 40, 85);
      rect(x, y, cellW * 0.9 + breathe * 0.5, cellH * 0.9 + breathe * 0.5);

      // MIDDLE
      fill((hueShift + 80) % 360, 55, 75);
      rect(
        x + mx * 0.3,
        y + my * 0.3,
        cellW * 0.6 + breathe * 0.3,
        cellH * 0.6 + breathe * 0.3
      );

      // INNER
      fill((hueShift + 140) % 360, 65, 90);
      rect(
        x + mx * 0.6,
        y + my * 0.6,
        cellW * 0.35 + breathe * 0.2,
        cellH * 0.35 + breathe * 0.2
      );

      // CORE
      fill((hueShift + 200) % 360, 30, 95);
      rect(
        x + mx,
        y + my,
        cellW * 0.15 + breathe * 0.1,
        cellH * 0.15 + breathe * 0.1
      );
    }
  }

  // subtle overlay texture
  fill(0, 0, 100, 4);
  rect(width / 2, height / 2, width, height);
}

function mousePressed() {
  let cols = 4;
  let rows = 4;

  let cellW = width / cols;
  let cellH = height / rows;

  // find which cell was clicked
  let i = floor(mouseX / cellW);
  let j = floor(mouseY / cellH);

  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    let index = i + j * cols;

    // shift that cell’s color palette
    colorOffsets[index] = random(-80, 80);
  }
}