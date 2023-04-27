function setup1() {
  var canvas1 = createCanvas(200, 200);
  canvas1.parent("canv2");
}

function draw() {
  background(250, 0, 90, 50);
}

new p5(setup1);
