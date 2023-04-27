const FRAME_RATE = 60;
const DURATION = FRAME_RATE * 1;
let mouseCount = 0;
let currentFrame = 0;
let xcenter;
let ycenter;
let counter = 0;
let num = 1;
let startTime = 0;
let degree = 0;
let rectSize = 1;
let rectRadius = 12;

function preload() {
  font1 = loadFont("lib/HTOWERT.TTF");
  font2 = loadFont("lib/Yu Gothic Light.ttf");
  font3 = loadFont("lib/VINERITC.TTF");
  data = loadTable("data/bully.csv", "csv", "header");
  Frank = loadFont("lib/FRAHV.TTF");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canv1");
  $("#defaultCanvas0").attr("id", "canvas2");
  xcenter = width / 2;
  ycenter = height / 2;
  frameRate(FRAME_RATE);
  textSize(22);
  textAlign(CENTER);
  textFont(font1);
  textStyle(ITALIC);
}
function draw() {
  background(0);
  noStroke();
  rectMode(CENTER);
  var c1 = color(210);
  var c2 = color(110);
  var shine = lerpColor(c1, c2, 0.5 * (1 + sin(frameCount * 0.05)));
  push();
  //绘制作品标题和创作者使其一直悬浮在上方
  textAlign(CENTER);
  textSize(36);
  fill(153, 0, 0);
  textFont(font3);
  text("Wallflower", width / 2, height * 0.06);
  textSize(12);
  fill(149);
  textFont(font2);
  text(
    "b y  C h a o y u a n ,  S H A N · Y    H o u h o u h o u  a n d   S P R i n g ",
    width * 0.5,
    height * 0.084
  );
  pop();
  if (mouseCount == 0) {
    //开场的loading 动画
    push();
    textSize(36);
    text("Who are you?", width / 2, height * 0.3);
    pop();
    //引用millis函数，millis是一个整数，是自程序开始以来的毫秒数，elapsedTime代表动画开始的时间
    let elapsedTime = millis() - startTime;
    //动画开始循环
    if (elapsedTime >= 1300) {
      //该动画一共有12帧，用num的循环来使动画循环，num初始值为1，逐渐增加
      num = (num % 12) + 1;
      startTime = millis();
    }

    if (num == 1) {
      //degree初始值为0，代表中间矩形的旋转角度，旋转四十五度到九十度之间代表为男性
      //绘制male对应的图形
      //矩形下方的提示文字
      fill(255);
      text("Male", width / 2, height * 0.7);
      if (degree >= 45 && degree < 90) {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        //动画效果
        rotate(radians(degree));
        rect(0, 0, 142, 142, 12);
        pop();
        //每绘制一次degree增加一次，以达到执行else来绘制男性的目的
        degree++;
      } else {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        rect(0, 0, 142, 142, 12);
        pop();
        degree = 0;
      }
    }
    if (num == 2) {
      //female
      fill(255);
      text("Female", width / 2, height * 0.7);
      if (degree < 45) {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        rotate(radians(degree));
        rect(0, 0, 142, 142, 12);
        pop();
        //每绘制一次degree增加一次，以达到执行else来绘制女性的目的
        degree++;
      } else {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
      }
    }
    if (num == 3) {
      //rectSize = 1为初始值
      //绘制年龄为12岁的对应矩形大小
      //填充年龄为十二的对应矩形大小
      fill(255);
      text("12 years old", width / 2, height * 0.7);
      if (rectSize > 0.5) {
        //慢慢绘制变小
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        //rect大小随rectSize变化
        scale(rectSize);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
        rectSize = rectSize - 0.01;
      } else {
        //矩形过小后停止绘制
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(0.5);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
      }
    }
    if (num == 4) {
      //rectSize = 0.5为初始值
      //绘制年龄为13岁的对应矩形大小
      //填充年龄为十三的对应矩形大小
      fill(255);
      text("13 years old", width / 2, height * 0.7);
      if (rectSize < 0.58) {
        //慢慢绘制变大
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(rectSize);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
        rectSize = rectSize + 0.003;
      } else {
        //矩形过大后停止绘制
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(0.58);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
      }
    }
    if (num == 5) {
      //年龄为14对应的动画
      fill(255);
      text("14 years old", width / 2, height * 0.7);
      if (rectSize < 0.64) {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(rectSize);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
        rectSize = rectSize + 0.003;
      } else {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(0.64);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
      }
    }
    if (num == 6) {
      //年龄为15对应的动画
      fill(255);
      text("15 years old", width / 2, height * 0.7);
      if (rectSize < 0.72) {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(rectSize);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
        rectSize = rectSize + 0.003;
      } else {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(0.72);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
      }
    }
    if (num == 7) {
      //年龄为16对应的动画
      fill(255);
      text("16 years old", width / 2, height * 0.7);
      if (rectSize < 0.85) {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(rectSize);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
        rectSize = rectSize + 0.003;
      } else {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(0.85);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
      }
    }
    if (num == 8) {
      //年龄为17对应的动画
      fill(255);
      text("17 years old", width / 2, height * 0.7);
      if (rectSize < 0.95) {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(rectSize);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
        rectSize = rectSize + 0.003;
      } else {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(0.95);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
      }
    }
    if (num == 9) {
      //年龄为18对应的动画
      fill(255);
      text("18 years old", width / 2, height * 0.7);
      if (rectSize < 1) {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(rectSize);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
        rectSize = rectSize + 0.003;
      } else {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        scale(1);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
      }
    }
    if (num == 10) {
      //矩形圆角大小发生变化，初始值为12，开始减小使矩形尖锐
      //underweight
      fill(255);
      text("underweight", width / 2, height * 0.7);
      if (rectRadius > 0.5) {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        rotate(radians(45));
        rect(0, 0, 142, 142, rectRadius);
        pop();
        rectRadius = rectRadius - 0.2;
        // print(rectRadius);
      } else {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        rotate(radians(45));
        rect(0, 0, 142, 142, 0);
        pop();
      }
    }
    if (num == 11) {
      //矩形圆角大小发生变化，初始值为0.5，开始变大使矩形圆滑
      //overweight
      fill(255);
      text("overweight", width / 2, height * 0.7);
      if (rectRadius < 30) {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        rotate(radians(45));
        rect(0, 0, 142, 142, rectRadius);
        pop();
        rectRadius = rectRadius + 0.5;
        // print(rectRadius);
      } else {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        rotate(radians(45));
        rect(0, 0, 142, 142, 30);
        pop();
      }
    }
    if (num == 12) {
      //矩形圆角大小发生变化，初始值为30，开始变小使矩形尖锐
      //regular
      fill(255);
      text("regular", width / 2, height * 0.7);
      if (rectRadius > 12) {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        rotate(radians(45));
        rect(0, 0, 142, 142, rectRadius);
        pop();
        rectRadius = rectRadius - 0.4;
      } else {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        rotate(radians(45));
        rect(0, 0, 142, 142, 12);
        pop();
      }
    }
    //12次循环完毕开始进入到下一次循环
  }
  push();
  fill(shine);
  textSize(18);
  textFont(font2);
  text("Click to Start", width / 2, height * 0.9);
  pop();

  push();
  //统一以下矩形绘制以画布中心为原点
  translate(xcenter, ycenter); //开始点击之后绘制图案以及填写文字的相对坐标为画布中心
  if (mouseCount == 1) {
    //鼠标第一次点击后的效果
    blackCover(); //覆盖之前的文字效果
    textSize(18);
    textAlign(CENTER);
    textFont(font2);
    fill(142);
    text("Click to Continue", 0, height * 0.4);
    fill(255);
    push();
    translate(-xcenter, -ycenter);
    textSize(36);
    textFont(font1);
    text("Please introduce yourself.", width / 2, height * 0.28);
    textSize(22);
    text(
      '"A 17 years old female student with regular figure."',
      width / 2,
      height * 0.7
    ); //填写以上文字
    pop();
    scale(2.0);
    rotate(PI / 4); //将坐标系旋转45°绘制菱形
    fill(255);
    rect(0, 0, 62, 62, 8); //绘制正常状态的17岁女性的方形
  }
  if (mouseCount == 2) {
    //鼠标第二次点击后的效果
    push();
    blackCover();
    pop();
    textUpper(
      //第二次以后文字排布以及格式相同，引用函数来填写
      "Have you ever been bullied at school in the past 12 months?",
      '"Yes."',
      "A 17 years old female student with regular figure.",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );
    push();
    scale(2.0);
    noStroke();
    rotate(PI / 4);
    fill(187, 11, 0);
    rect(0, 0, 62, 62, 8);
    pop(); //绘制遭受过校园霸凌的后所代表的矩形的颜色
  }
  if (mouseCount == 3) {
    push();
    blackCover();
    textUpper(
      "Have you ever been bullied outside the school in the past 12 months?",
      '"Yes."',
      "A 17 years old female student with regular figure.",
      "Have been bullied in school.",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );
    scale(2.0);
    noStroke();
    rotate(PI / 4);
    fill(112, 7, 0);
    rect(0, 0, 62, 62, 8);
    pop(); //绘制遭受过校园以及校外霸凌的后所代表的矩形的颜色
  }
  if (mouseCount == 4) {
    push();
    blackCover();
    textUpper(
      "Have you ever been cyber bullied in the past 12 months?",
      '"No."',
      "A 17 years old female student with regular figure.",
      "Have been bullied in school.",
      "Have been bullied outside the school.",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );
    scale(2.0);
    fill(112, 7, 0);
    rotate(PI / 4);
    rect(0, 0, 62, 62, 8); //绘制遭受过校园以及校外霸凌但没有受过网络霸凌所代表的矩形的颜色
    pop();
  }

  if (mouseCount >= 5) {
    //第五次点击之后每点击一次，画布效果变成叠加态，在原有基础上加上下一次的变化
    blackCover();
    textUpper(
      "How many times have you been physical attacked?",
      '"6-7times"',
      "A 17 years old female student with regular figure.",
      "Have been bullied in school.",
      "Have been bullied outside the school.",
      "Have not been cyber bullied.",
      "",
      "",
      "",
      "",
      "",
      ""
    );
    push();
    scale(2.0);
    fill(112, 7, 0);
    rotate(PI / 4);
    rect(0, 0, 62, 62, 8); //绘制遭受过校园以及校外霸凌但没有受过网络霸凌所代表的矩形的颜色
    rotate(-PI / 4);
    noFill();
    stroke(0);
    //绘制中间花蕊描边过程的动画，使用了dzy\lib\p5.anims.js库。绘制了五瓣花蕊的额描边过程，在开始时设置const FRAME_RATE = 60;
    //animS.quad()的第一个参数是一个唯一的实例ID，以便动画状态可以跨帧保存。
    //第二个参数是该动画最后的总帧数，FRAME_RATE * 1.5使其在1.5秒内绘制完。
    animS.quad("flower1", FRAME_RATE * 1.5, 0, 0, -4, -7, 0, -24, 4, -7);
    rotate(PI / 3);
    animS.quad("flower2", FRAME_RATE * 1.5, 0, 0, -4, -7, 0, -24, 4, -7);
    rotate(PI / 3);
    animS.quad("flower3", FRAME_RATE * 1.5, 0, 0, -4, -7, 0, -24, 4, -7);
    rotate(PI / 3);
    animS.quad("flower4", FRAME_RATE * 1.5, 0, 0, -4, -7, 0, -24, 4, -7);
    rotate(PI / 3);
    animS.quad("flower5", FRAME_RATE * 1.5, 0, 0, -4, -7, 0, -24, 4, -7);
    pop();
  }
  if (mouseCount >= 5 && frameCount - currentFrame > 100) {
    //currentFrame函数读取鼠标点击时程序已被展示的影格数量，frameCount存着自程序开始已被展示的影格数量，
    // frameCount - currentFrame相差一百且第五次点击后开始绘制，花蕊自动填充
    blackCover();
    textUpper(
      "How many times have you been physical attacked?",
      '"6-7times"',
      "A 17 years old female student with regular figure.",
      "Have been bullied in school.",
      "Have been bullied outside the school.",
      "Have been not cyber bullied.",
      "",
      "",
      "",
      "",
      "",
      ""
    );
    push();
    scale(2.0);
    noStroke();
    fill(0);
    //相同位置使用相同的函数但是没有描边只有填充
    animS.quad("flower7", FRAME_RATE * 1.5, 0, 0, -4, -7, 0, -24, 4, -7);
    rotate(PI / 3);
    animS.quad("flower8", FRAME_RATE * 1.5, 0, 0, -4, -7, 0, -24, 4, -7);
    rotate(PI / 3);
    animS.quad("flower9", FRAME_RATE * 1.5, 0, 0, -4, -7, 0, -24, 4, -7);
    rotate(PI / 3);
    animS.quad("flower10", FRAME_RATE * 1.5, 0, 0, -4, -7, 0, -24, 4, -7);
    rotate(PI / 3);
    animS.quad("flower11", FRAME_RATE * 1.5, 0, 0, -4, -7, 0, -24, 4, -7);
    pop();
  }
  if (mouseCount >= 6) {
    blackCover();
    push();
    scale(2.0);
    noStroke();
    fill(0);
    rotate(-PI / 3);
    //将花蕊动画效果覆盖，不再显示绘制的动画
    stamen();
    stamen();
    stamen();
    stamen();
    stamen();
    pop();
    textUpper(
      "How many times have you been involved in physical fightings?",
      '"4-7times"',
      "A 17 years old female student with regular figure.",
      "Have been bullied in school.",
      "Have been bullied outside the school.",
      "Have been not cyber bullied.",
      "Have been physically attack for 6-7 times.",
      "",
      "",
      "",
      "",
      ""
    );
    push();
    scale(2.0);
    stroke(255);
    noFill();
    strokeWeight(1);
    //绘制外部刺的动画，仅描边，由贝塞尔曲线组成const DURATION = FRAME_RATE * 1，每条都在一秒内完成绘制;
    animS.shape("fight1", DURATION, [
      [0, -54],
      [-4.1, -59.7, -4.1, -67, 0, -72],
      [0, -72],
      [4.1, -67, 4.1, -59.7, 0, -54],
    ]);
    rotate(PI / 2);
    animS.shape("fight2", DURATION, [
      [0, -54],
      [-4.1, -59.7, -4.1, -67, 0, -72],
      [0, -72],
      [4.1, -67, 4.1, -59.7, 0, -54],
    ]);
    pop();
  }
  if (mouseCount >= 6 && frameCount - currentFrame > 100) {
    //currentFrame函数读取鼠标点击时程序已被展示的影格数量，frameCount存着自程序开始已被展示的影格数量，
    // frameCount - currentFrame相差一百且第六次点击后开始绘制，刺自动填充
    blackCover();
    textUpper(
      "How many times have you been involved in physical fightings?",
      '"4-7times"',
      "A 17 years old female student with regular figure.",
      "Have been bullied in school.",
      "Have been bullied outside the school.",
      "Have been not cyber bullied.",
      "Have been physically attack for 6-7 times.",
      "",
      "",
      "",
      "",
      ""
    );
    push();
    scale(2.0);
    fill(255);
    //绘制外部刺的动画，沿着四条贝塞尔曲线组成进行填充，每次都在0.5秒内完成绘制;
    animS.shape("fight3", FRAME_RATE * 0.5, [
      [0, -54],
      [-4.1, -59.7, -4.1, -67, 0, -72],
      [0, -72],
      [4.1, -67, 4.1, -59.7, 0, -54],
    ]);
    rotate(PI / 2);
    animS.shape("fight4", FRAME_RATE * 0.5, [
      [0, -54],
      [-4.1, -59.7, -4.1, -67, 0, -72],
      [0, -72],
      [4.1, -67, 4.1, -59.7, 0, -54],
    ]);
    pop();
  }

  if (mouseCount >= 7) {
    //绘制外部左上角的花瓣
    push();
    scale(2.0);
    rotate(-PI / 2);
    getTwoOutSideacr();
    getTwoOutSideacr();
    pop();
    blackCover();
    textUpper(
      "Do your parents understand the problems?",
      '"Sometimes."',
      "A 17 years old female student with regular figure.",
      "Have been bullied in school.",
      "Have been bullied outside the school.",
      "Have been not cyber bullied.",
      "Have been physically attack for 6-7 times.",
      "Get involved in fightings for 4-7 times.",
      "",
      "",
      "",
      ""
    );
    push();
    scale(2.0);
    rotate(-PI / 2);
    fill(140);
    //该花瓣由两个圆弧叠加而成，由设计稿计算两条圆弧对应的位置以及弧度，引用库填充覆盖绘制完成
    animS.arc(
      "smallcircle1",
      FRAME_RATE * 1,
      18.5,
      -18.5,
      73,
      73,
      (PI * 4) / 3,
      (PI * 13) / 6
    );
    fill(0);
    animS.arc(
      "bigcircle1",
      FRAME_RATE * 1,
      0,
      0,
      100,
      100,
      (PI * 3) / 2,
      PI * 2
    );
    pop();
  }
  if (mouseCount >= 8) {
    //同理绘制右上角花瓣
    blackCover();
    textUpper(
      "How many close friends do you have?",
      '"3 or more"',
      "A 17 years old female student with regular figure.",
      "Have been bullied in school.",
      "Have been bullied outside the school.",
      "Have been not cyber bullied.",
      "Have been physically attack for 6-7 times.",
      "Get involved in fightings for 4-7 times.",
      "Her parents sometimes understand the problem.",
      "",
      "",
      ""
    );
    push();
    scale(2.0);
    noStroke();
    fill(250);
    animS.arc(
      "smallcircle2",
      FRAME_RATE * 1,
      18.5,
      -18.5,
      73,
      73,
      (PI * 4) / 3,
      (PI * 13) / 6
    );
    fill(0);
    animS.arc(
      "bigcircle2",
      FRAME_RATE * 1,
      0,
      0,
      100,
      100,
      (PI * 3) / 2,
      PI * 2
    );
    pop();
  }
  if (mouseCount >= 9) {
    //绘制左下角的花瓣
    blackCover();
    textUpper(
      "Do your think other students are kind and helpful?",
      '"Rarely."',
      "A 17 years old female student with regular figure.",
      "Have been bullied in school.",
      "Have been bullied outside the school.",
      "Have been not cyber bullied.",
      "Have been physically attack for 6-7 times.",
      "Get involved in fightings for 4-7 times.",
      "Her parents sometimes understand the problem.",
      "She has 3 or more close friends.",
      "",
      ""
    );
    push();
    scale(2.0);
    rotate(PI);
    fill(76);
    animS.arc(
      "smallcircle3",
      FRAME_RATE * 1,
      18.5,
      -18.5,
      73,
      73,
      (PI * 4) / 3,
      (PI * 13) / 6
    );
    fill(0);
    animS.arc(
      "bigcircle3",
      FRAME_RATE * 1,
      0,
      0,
      100,
      100,
      (PI * 3) / 2,
      PI * 2
    );
    pop();
  }
  if (mouseCount >= 10) {
    //绘制右下角的花瓣
    blackCover();
    textUpper(
      "How often do you feel lonely?",
      '"Always."',
      "A 17 years old female student with regular figure.",
      "Have been bullied in school.",
      "Have been bullied outside the school.",
      "Have been not cyber bullied.",
      "Have been physically attack for 6-7 times.",
      "Get involved in fightings for 4-7 times.",
      "Her parents sometimes understand the problem.",
      "She has 3 or more close friends.",
      "She thinks other students are rarely kind and helpful.",
      ""
    );
    push();
    scale(2.0);
    rotate(PI / 2);
    fill(25);
    animS.arc(
      "smallcircle4",
      FRAME_RATE * 1,
      18.5,
      -18.5,
      73,
      73,
      (PI * 4) / 3,
      (PI * 13) / 6
    );
    fill(0);
    animS.arc(
      "bigcircle4",
      FRAME_RATE * 1,
      0,
      0,
      100,
      100,
      (PI * 3) / 2,
      PI * 2
    );
    pop();
  }
  if (mouseCount >= 11) {
    //结语
    blackCover();
    textUpper(
      "That is all, thank you.",
      "",
      "A 17 years old female student with regular figure.",
      "Have been bullied in school.",
      "Have been bullied outside the school.",
      "Have been not cyber bullied.",
      "Have been physically attack for 6-7 times.",
      "Get involved in fightings for 4-7 times.",
      "Her parents sometimes understand the problem.",
      "She has 3 or more close friends.",
      "She always feels lonely.",
      "She thinks other students are rarely kind and helpful."
    );
    fill(0);
    rect(0, height * 0.4, 200, 50);
    fill(255);
    textSize(18);
    textAlign(CENTER);
    textFont(font2);
    fill(142);
    text("Click to Continue", 0, height * 0.4);
  }
  if (mouseCount >= 12) {
    //引导探索接下来界面
    blackCover();
    fill(0);
    rect(0, height * 0.4, 200, 150);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    fill(142);
    textFont(font1);
    text("What about others?", 0, height * 0.3);
    textSize(18);
    textFont(font2);
    text("Click to View", 0, height * 0.4);
    noFill();
    stroke(255);
    strokeWeight(0.45);
    line(-6, height * 0.42, 0, height * 0.425);
    line(0, height * 0.425, 6, height * 0.42);
    //实现点击后转移界面，过渡到下一个界面
    $("#canvas2").attr("class", "canvasU");
    print($("button").length);
    if ($("button").length == 0 && $("#canvas2").attr("class") == "canvasU") {
      var button = $("<button>");
      button.attr("class", "load");
      $("body").append(button);
    }
    $(".load").click(function () {
      window.location.href = "html/summary.html";
    });
  }
  pop();
}

function mouseClicked() {
  //记录鼠标点击次数
  mouseCount++;
  currentFrame = frameCount;
}
function getTwoOutSideacr() {
  //绘制刺的两条贝塞尔曲线
  rotate(PI / 2);
  fill(255);
  stroke(255);
  beginShape();
  vertex(0, -54);
  bezierVertex(-4.1, -59.7, -4.1, -67, 0, -72);
  bezierVertex(4.1, -67, 4.1, -59.7, 0, -54);
  endShape();
}

function textUpper(
  text1,
  text2,
  text3,
  text4,
  text5,
  text6,
  text7,
  text8,
  text9,
  text10,
  text11,
  text12
) {
  //文字的位置安排
  push();
  translate(-xcenter, -ycenter);
  fill(255);
  textSize(36);
  text(text1, width / 2, height * 0.28);
  textSize(22);
  text(text2, width / 2, height * 0.7);
  textSize(16);
  textAlign(LEFT);
  fill(220);
  text(text3, width * 0.1, height * 0.4 + 40);
  text(text4, width * 0.1, height * 0.4 + 70);
  text(text5, width * 0.1, height * 0.4 + 100);
  text(text6, width * 0.1, height * 0.4 + 130);
  text(text7, width * 0.1, height * 0.4 + 160);
  text(text8, width * 0.7, height * 0.4 + 40);
  text(text9, width * 0.7, height * 0.4 + 70);
  text(text10, width * 0.7, height * 0.4 + 100); //10
  text(text11, width * 0.7, height * 0.4 + 130);
  text(text12, width * 0.7, height * 0.4 + 160);
  textAlign(CENTER);
  textSize(18);
  textFont(font2);
  fill(142);
  text("Click to Continue", width * 0.5, height * 0.9);
  pop();
}
function blackCover() {
  //覆盖上一层文字的黑板
  push();
  translate(-xcenter, -ycenter);
  fill(0);
  rect(xcenter, height / 4, 1050, height / 8);
  rect((width * 1) / 5, height / 2, 500, 550);
  rect((width * 4) / 5, height / 2, 500, height / 4);
  rect(xcenter, (height * 3) / 4, 500, height / 5);
  rect(width / 2, height * 0.9, 200, 50);
  pop();
}
function stamen() {
  //绘制实心的刺
  rotate(PI / 3);
  beginShape();
  vertex(0, 0);
  vertex(-4, -7);
  vertex(0, -24);
  vertex(4, -7);
  endShape(CLOSE);
}
