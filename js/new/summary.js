let w = 30;
let h = 300;
let particles = [];
let particlerow = [];
let a = 0;
let count = -1;
let scrollT = 0;
let hei = 0;
let wid = 0;
let canvaWidth = 0;
let beg = 0;
function preload() {
  data = loadTable("data/bully.csv", "csv", "header");
  Frank = loadFont("lib/FRAHV.TTF");
  Image1 = loadImage("lib/1.png");
  Image2 = loadImage("lib/2.png");
  Image3 = loadImage("lib/3.png");
  Image4 = loadImage("lib/4.png");
  Image5 = loadImage("lib/5.png");
  Image6 = loadImage("lib/6.png");
  Image7 = loadImage("lib/7.png");
  font2 = loadFont("lib/Yu Gothic Light.ttf");
}
function setup() {
  rs = data.getRows();
  //设置画布大小
  canvaWidth = windowWidth * 0.8;
  wid = windowWidth * 0.4;
  beg = (canvaWidth - wid) / 2;
  hei = (wid / w) * h;
  var canvas1 = createCanvas(canvaWidth, hei);
  canvas1.parent("canv1");
  a = wid / w
  translate(beg, 0);
  //循环将每个flower实例化并存入二维数组particles
  for (i = 0; i < h; i++) {
    for (j = 0; j < w; j++) {
      count++;
      let x = a / 2 + j * a;
      let y = a / 2 + i * a;
      let p = new flower(x, y);
      let r = a / 2;
      p.radius = r / 2;
      p.side = r;
      p.bullycount =
        parseInt(rs[count].arr[1]) +
        parseInt(rs[count].arr[2]) +
        parseInt(rs[count].arr[3]);
      p.bully = rs[count].arr[1] + rs[count].arr[2] + rs[count].arr[3];
      p.age = rs[count].arr[4];
      p.sex = rs[count].arr[5];
      p.attackMount = rs[count].arr[6];
      p.fightMount = rs[count].arr[7];
      p.lonely = rs[count].arr[8];
      p.friendHelp = rs[count].arr[9];
      p.studentHelp = rs[count].arr[10];
      p.parentHelp = rs[count].arr[11];
      let underweight = rs[count].arr[12];
      let overweight = rs[count].arr[13];
      switch (true) {
        case overweight == 1:
          p.figure = 3;
          break;
        case underweight == 1:
          p.figure = 1;
          break;
        default:
          p.figure = 2;
      }
      push();
      translate(p.position.x, p.position.y);
      rectMode(CENTER);
      p.fundment();
      pop();
      p.color = color(255);
      particlerow.push(p);
    }
    particles.push(particlerow);
    particlerow = [];
  }
}

function draw() {
  background(0);
  let height = windowHeight;
  scrollT = window.pageYOffset || document.documentElement.scrollTop;
  //switch判断scrollT(鼠标滚轮滚动距离)大小来显示不同的样式的flower
  switch (true) {
    case scrollT > height && scrollT <= height * 2:
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          let p = particles[i][j];
          push();
          translate(p.position.x + beg, p.position.y);
          rectMode(CENTER);
          p.bullyCount_sep(1);
          pop();
        }
      }
      break;
    case scrollT > height * 2 && scrollT <= height * 3:
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          let p = particles[i][j];
          push();
          translate(p.position.x + beg, p.position.y);
          rectMode(CENTER);
          p.bullyCount_sep(2);
          pop();
        }
      }
      break;
    case scrollT > height * 3 && scrollT <= height * 4:
      // console.log("第三次");
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          let p = particles[i][j];
          push();
          translate(p.position.x + beg, p.position.y);
          rectMode(CENTER);
          p.bullyCount_sep(3);
          pop();
        }
      }
      break;
    case scrollT > height * 4 && scrollT <= height * 5 - 50:
      // console.log("恶之花和打架");
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          let p = particles[i][j];
          push();
          translate(p.position.x + beg, p.position.y);
          rectMode(CENTER);
          p.bullyCount();
          p.evilFlower();
          p.fightCount();
          pop();
        }
      }
      break;
    case scrollT > height * 5 - 50:
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          let p = particles[i][j];
          push();
          translate(p.position.x + beg, p.position.y);
          rectMode(CENTER);
          p.lonelyPetal();
          p.studentPetal();
          p.friendPetal();
          p.parentPetal();
          p.bullyCount();
          p.evilFlower();
          pop();
        }
      }
      break;
    default:
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          let p = particles[i][j];
          push();
          translate(p.position.x + beg, p.position.y);
          rectMode(CENTER);
          p.fundment();
          pop();
        }
      }
  }
  //绘制注释图片和跳转文字提示
  fill(0, 230);
  noStroke();
  rectMode(CENTER);
  rect(width * 0.5, 0, canvaWidth, 635);
  rect(width * 0.5, windowHeight + 605, canvaWidth, 175);
  rect(width * 0.5, windowHeight * 2 + 585, canvaWidth, 175);

  rect(width * 0.5, windowHeight * 3 + 622, canvaWidth, 200);
  rect(width * 0.5, windowHeight * 4 + 595, canvaWidth, 175);
  rect(width * 0.5, windowHeight * 5 + 505, canvaWidth, 235);
  rect(width * 0.5, hei - 100, canvaWidth, 552);
  noFill();
  stroke(255);
  strokeWeight(0.45);
  line(
    canvaWidth / 2 - 6,
    windowHeight * 0.047,
    canvaWidth / 2,
    windowHeight * 0.042
  );
  line(
    canvaWidth / 2,
    windowHeight * 0.042,
    canvaWidth / 2 + 6,
    windowHeight * 0.047
  );
  textSize(18);
  textAlign(CENTER);
  textFont(font2);
  fill(142);
  text("Back to Introduction", canvaWidth / 2, windowHeight * 0.1);
  noStroke();
  imageMode(CENTER);
  image(Image1, canvaWidth / 2, windowHeight * 0.25);
  image(Image2, canvaWidth / 2, windowHeight + 605);
  image(Image3, canvaWidth / 2, windowHeight * 2 + 590);
  image(Image4, canvaWidth / 2, windowHeight * 3 + 620);
  image(Image5, canvaWidth / 2, windowHeight * 4 + 600);
  image(Image6, canvaWidth / 2, windowHeight * 5 + 505);
  image(Image7, canvaWidth / 2, hei - 250);

  textSize(18);
  textFont(font2);
  text("Click to Explore", canvaWidth / 2, hei - 110);
  noFill();
  stroke(255);
  strokeWeight(0.45);
  line(canvaWidth / 2 - 6, hei - 80, canvaWidth / 2, hei - 75);
  line(canvaWidth / 2, hei - 75, canvaWidth / 2 + 6, hei - 80);
  noStroke();
  //鼠标滚动到首尾时添加跳转按钮
  if (scrollT == 0 && $(".back").length == 0) {
    var button = $("<button>");
    button.attr("class", "back");
    $("body").append(button);
    $(".back").click(function () {
      window.location.href = "introduction.html";
    });
  } else {
    $(".back").remove();
  }
  if (scrollT > hei - 1.5 * windowHeight && $(".next").length == 0) {
    var button = $("<button>");
    button.attr("class", "next");
    $("body").append(button);
    $(".next").click(function () {
      window.location.href = "explore.html";
    });
  } else {
    $(".next").remove();
  }
}

//每个小单位的类flower
class flower {
  constructor(x, y) {
    this.radius = 1;
    this.mass = 1;
    this.position = new c2.Vector(x, y);
    this.previousPosition = this.position.copy();
    this._force = new c2.Vector();
    this.bully = 0;
    this.bully_school;
    this.bully_notschool;
    this.bully_cyber;
    this.age;
    this.sex;
    this.attackMount;
    this.fightMount;
    this.lonely;
    this.friendHelp;
    this.studentHelp;
    this.parentHelp;
    this.figure;
  }
  //绘制flower的基本属性性别、年龄和体型
  fundment() {
    let age = this.age;
    let sex = this.sex;
    let figure = this.figure;
    let c = this.side * 2;
    push();
    fill(0);
    circle(0, 0, (170 / 170) * c);
    fill(255);
    let ed = 1;
    let step = 0.07;
    //年龄
    switch (true) {
      case age == "12 years old":
        ed = 1 - step * 5;
        break;
      case age == "13 years old":
        ed = 1 - step * 4;
        break;
      case age == "14 years old":
        ed = 1 - step * 3;
        break;
      case age == "15 years old":
        ed = 1 - step * 2;
        break;
      case age == "16 years old":
        ed = 1 - step;
        break;
      case age == "17 years old":
        ed = 1;
        break;
      default:
        ed = 1;
    }
    scale(ed);
    if (sex == 0) {
      rotate(PI / 4);
    } else {
      rotate(0);
    }
    //身型
    let ff;
    switch (true) {
      case figure == 1:
        ff = 0;
        break;
      case figure == 2:
        ff = 12;
        break;
      default:
        ff = 24;
    }
    rect(0, 0, (65 / 170) * c, (65 / 170) * c, (ff / 170) * c);
    pop();
  }
  //方的颜色
  bullyCount_sep(aa) {
    let age = this.age;
    let sex = this.sex;
    let figure = this.figure;
    let bully = this.bully;
    let bullycount = this.bullycount;
    let c = this.side * 2;
    push();
    fill(0);
    circle(0, 0, (170 / 170) * c);
    fill(255);
    let ed = 1;
    let step = 0.07;
    //年龄
    switch (true) {
      case age == "12 years old":
        ed = 1 - step * 5;
        break;
      case age == "13 years old":
        ed = 1 - step * 4;
        break;
      case age == "14 years old":
        ed = 1 - step * 3;
        break;
      case age == "15 years old":
        ed = 1 - step * 2;
        break;
      case age == "16 years old":
        ed = 1 - step;
        break;
      case age == "17 years old":
        ed = 1;
        break;
      default:
        ed = 1;
    }
    scale(ed);
    if (sex == 0) {
      rotate(PI / 4);
    } else {
      rotate(0);
    }
    //身型
    let ff;
    switch (true) {
      case figure == 1:
        ff = 0;
        break;
      case figure == 2:
        ff = 12;
        break;
      default:
        ff = 24;
    }
    //霸凌次数影响填充颜色
    if (aa == 1) {
      if (bully[0] == "1") {
        fill("#bb0b00");
      } else {
        fill(255);
      }
    }

    if (aa == 2) {
      if (bully[0] + bully[1] == "11") {
        fill("#700700");
      } else if (bully[0] + bully[1] == "10" || bully[0] + bully[1] == "01") {
        fill("#bb0b00");
      } else {
        fill(255);
      }
    }

    if (aa == 3) {
      switch (true) {
        case bullycount == 3:
          fill("#4b0400");
          break;
        case bullycount == 1:
          fill("#bb0b00");
          break;
        case bullycount == 2:
          fill("#700700");
          break;
        default:
          fill(255);
      }
    }
    rect(0, 0, (65 / 170) * c, (65 / 170) * c, (ff / 170) * c);
    pop();
  }
  bullyCount() {
    let age = this.age;
    let sex = this.sex;
    let figure = this.figure;
    let bullycount = this.bullycount;
    let c = this.side * 2;
    push();
    fill(0);
    circle(0, 0, (96 / 170) * c);
    fill(255);
    let ed = 1;
    let step = 0.07;
    //年龄
    switch (true) {
      case age == "12 years old":
        ed = 1 - step * 5;
        break;
      case age == "13 years old":
        ed = 1 - step * 4;
        break;
      case age == "14 years old":
        ed = 1 - step * 3;
        break;
      case age == "15 years old":
        ed = 1 - step * 2;
        break;
      case age == "16 years old":
        ed = 1 - step;
        break;
      case age == "17 years old":
        ed = 1;
        break;
      default:
        ed = 1;
    }
    scale(ed);
    if (sex == 0) {
      rotate(PI / 4);
    } else {
      rotate(0);
    }
    //身型
    let ff;
    switch (true) {
      case figure == 1:
        ff = 0;
        break;
      case figure == 2:
        ff = 12;
        break;
      default:
        ff = 24;
    }
    //霸凌次数影响填充颜色
    switch (true) {
      case bullycount == 0:
        fill(255);
        break;
      case bullycount == 1:
        fill("#bb0b00");
        break;
      case bullycount == 2:
        fill("#700700");
        break;
      default:
        fill("#4b0400");
    }
    rect(0, 0, (65 / 170) * c, (65 / 170) * c, (ff / 170) * c);
    pop();
  }
  //受霸凌次数
  evilFlower() {
    let am = this.attackMount;
    let bully = this.bully;
    let c = this.side * 2;
    let att = 0;
    //霸凌次数
    switch (true) {
      case am == "10 or more times":
        att = 6;
        break;
      case am == "8 or 9 times":
        att = 5;
        break;
      case am == "6 or 7 times":
        att = 4;
        break;
      case am == "4 or 5 times":
        att = 3;
        break;
      case am == "2 or 3 times":
        att = 2;
        break;
      case am == "1 time":
        att = 1;
        break;
      default:
        att = 0;
    }
    //恶之花描边
    for (let iii = 0; iii < att; iii++) {
      push();
      rotate(radians(60 * iii));
      switch (true) {
        case bully == 0:
          stroke(255);
          break;
        case bully == 1:
          stroke("#bb0b00");
          break;
        case bully == 2:
          stroke("#700700");
          break;
        default:
          stroke("#4b0400");
      }
      strokeWeight((1 / 170) * c);
      fill(0);
      beginShape();
      vertex(0, 0);
      vertex((4 / 170) * c, (-7 / 170) * c);
      vertex(0, (-24 / 170) * c);
      vertex((-4 / 170) * c, (-7 / 170) * c);
      endShape(CLOSE);
      pop();
    }
  }
  //参与打斗次数
  fightCount() {
    let fm = this.fightMount;
    let c = this.side * 2;
    let fig = 0;
    switch (true) {
      case fm == "12 or more times":
        fig = 4;
        break;
      case fm == "8 to 11 times":
        fig = 3;
        break;
      case fm == "4 to 7 times":
        fig = 2;
        break;
      case fm == "1 to 3 times":
        fig = 1;
        break;
      default:
        fig = 0;
    }
    for (let ii = 0; ii < fig; ii++) {
      push();
      rotate(radians(90 * ii));
      noStroke();
      fill(255);
      beginShape();
      vertex(0, (-53 / 170) * c);
      bezierVertex(
        (-4 / 170) * c,
        (-58 / 170) * c,
        (-4 / 170) * c,
        (-65 / 170) * c,
        0,
        (-70 / 170) * c
      );
      vertex(0, (-70 / 170) * c);
      bezierVertex(
        (4 / 170) * c,
        (-65 / 170) * c,
        (4 / 170) * c,
        (-58 / 170) * c,
        0,
        (-53 / 170) * c
      );
      endShape(CLOSE);
      pop();
    }
  }
  //父母是否理解
  parentPetal() {
    let ph = this.parentHelp;
    let c = this.side * 2;
    switch (true) {
      case ph == "Never":
        fill(25, 25, 25);
        break;
      case ph == "Rarely":
        fill(76, 76, 76);
        break;
      case ph == "Sometimes":
        fill(140, 140, 140);
        break;
      case ph == "Most of the time":
        fill(178, 178, 178);
        break;
      default:
        fill(255, 255, 255);
    }
    circle((-18 / 170) * c, (-18 / 170) * c, (70 / 170) * c);
    this.bullyCount();
    this.evilFlower();
    this.fightCount();
  }
  //有几个朋友
  friendPetal() {
    let fh = this.friendHelp;
    let c = this.side * 2;
    switch (true) {
      case fh == "0":
        fill(25, 25, 25);
        break;
      case fh == "1":
        fill(76, 76, 76);
        break;
      case fh == "2":
        fill(153, 153, 153);
        break;
      default:
        fill(255, 255, 255);
    }
    circle((18 / 170) * c, (-18 / 170) * c, (70 / 170) * c);
    this.bullyCount();
    this.evilFlower();
    this.fightCount();
  }
  //同学是否有帮助
  studentPetal() {
    let sh = this.studentHelp;
    let c = this.side * 2;
    switch (true) {
      case sh == "Never":
        fill(25, 25, 25);
        break;
      case sh == "Rarely":
        fill(76, 76, 76);
        break;
      case sh == "Sometimes":
        fill(140, 140, 140);
        break;
      case sh == "Most of the time":
        fill(178, 178, 178);
        break;
      default:
        fill(255, 255, 255);
    }
    circle((-18 / 170) * c, (18 / 170) * c, (70 / 170) * c);
    this.bullyCount();
    this.evilFlower();
    this.fightCount();
  }
  //是否感到孤独
  lonelyPetal() {
    let lonely = this.lonely;
    let c = this.side * 2;
    switch (true) {
      case lonely == "Never":
        fill(255, 255, 255);
        break;
      case lonely == "Rarely":
        fill(178, 178, 178);
        break;
      case lonely == "Sometimes":
        fill(140, 140, 140);
        break;
      case lonely == "Most of the time":
        fill(76, 76, 76);
        break;
      default:
        fill(25, 25, 25);
    }
    circle((18 / 170) * c, (18 / 170) * c, (70 / 170) * c);
    this.bullyCount();
    this.evilFlower();
    this.fightCount();
  }
}