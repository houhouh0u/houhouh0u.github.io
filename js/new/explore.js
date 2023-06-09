let n = 9596;
let particles = [];
let a;
let hei;
let wid;
let gap;
let ring;
let ringradiusarr = [];
var fff;
let order;
let bqarr = [];
let top_margin
let bottom_margin
let mip = false
function preload() {
    data = loadTable("../data/bully.csv", "csv", "header");
    pic = loadImage('../lib/text.png')
    font1 = loadFont('../lib/HTOWERT.TTF')
}
function setup() {
    rs = data.getRows();
    wid = windowWidth * 0.95;
    hei = wid * 5.5;
    top_margin = hei * 0.03
    bottom_margin = hei * 0.06
    var canvas = createCanvas(wid, hei + top_margin + bottom_margin);
    canvas.parent("canv1");
    $("#defaultCanvas0").attr("id", "canvas2");
    $("#canvas2").attr("class", "canvasUn");
    background(0);
    console.log(wid, hei + top_margin + bottom_margin)
    //球的大小
    a = wid * 0.01;
    //球间距
    gap = -a;
    // 所有数据存入particles并排序
    for (let i = 0; i < n; i++) {
        let p = new flower(1, 1);
        let r = a / 2;
        p.attachData(p, i, r);
        particles.push(p)
    }
    order = bubbleSort(particles);
    //设置花束的属性
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 2; i++) {
            let y = (hei * (j * 2 + i + 0.5)) / 10 - hei / 2 + top_margin;
            for (let k = 0; k < 3; k++) {
                let x = (wid * 1.4 * (k + 1)) / 4 - (wid * 1.4) / 2;
                let bq = new bouquet(x, y);
                bq.figure = k + 1;
                bq.sex = i;
                switch (true) {
                    case j == 0:
                        bq.age = "13 years old";
                        break;
                    case j == 1:
                        bq.age = "14 years old";
                        break;
                    case j == 2:
                        bq.age = "15 years old";
                        break;
                    case j == 3:
                        bq.age = "16 years old";
                        break;
                    case j == 4:
                        bq.age = "17 years old";
                        break;
                }
                bqarr.push(bq);
            }
        }
    }
    // 分配给每个花束
    for (let ii = 0; ii < n; ii++) {
        let p = particles[ii];
        for (let jj = 0; jj < bqarr.length; jj++) {
            if (
                p.age == bqarr[jj].age &&
                p.figure == bqarr[jj].figure &&
                p.sex == bqarr[jj].sex
            ) {
                bqarr[jj].flowers.push(p);
            }
        }
    }
    // 设置每个花束的位置并绘制
    for (let i = 0; i < bqarr.length; i++) {
        let bq = bqarr[i];
        bq.setposition();
        push();
        translate(bq.x, bq.y);
        bq.drawout();
        pop();
    }
    // 背景文字图片
    push()
    scale(0.99)
    imageMode(CENTER)
    image(pic, wid / 2, (hei + top_margin + bottom_margin) / 2, wid, hei + top_margin + bottom_margin)
    pop()
}

function draw() {
    if (mip) {
        background(0)
        let x = mouseX
        let y = mouseY
        push()
        scale(0.99)
        imageMode(CENTER)
        image(pic, wid / 2, (hei + top_margin + bottom_margin) / 2, wid, hei + top_margin + bottom_margin)
        pop()
        for (let i = 0; i < bqarr.length; i++) {
            let bq = bqarr[i];
            push();
            translate(bq.x, bq.y);
            bq.drawout();
            pop();
        }
        //判断点击位置并画出弹窗
        for (let i = 0; i < bqarr.length; i++) {
            let bq = bqarr[i];
            let bq_x = bq.x + wid * 0.5
            let bq_y = bq.y + hei / 2
            if (dist(x, y, bq_x, bq_y) < bq.radius) {
                for (let j = 0; j < bq.flowers.length; j++) {
                    let fl = bq.flowers[j]
                    if (dist(x, y, bq.x + fl.position.x, bq.y + fl.position.y) < fl.radius) {
                        let temp = fl.side
                        fl.side = 50
                        push()
                        fill(0)
                        stroke(255)
                        let m = 350
                        let n = 100
                        if (x + m > wid) {
                            translate(-(x + m - wid + 10), 0)
                        }
                        rect(x, y, m, n)
                        noStroke()
                        translate(x + 50, y + n / 2);
                        rectMode(CENTER);
                        fl.bullyCount()
                        fl.evilFlower();
                        //反击
                        fl.fightCount();
                        //四个瓣
                        fl.parentPetal();
                        fl.friendPetal();
                        fl.studentPetal();
                        fl.lonelyPetal();
                        let gender
                        let fig
                        if (fl.sex == 0) {
                            gender = 'female'
                        } else {
                            gender = 'male'
                        }
                        switch (fl.figure) {
                            case 1:
                                fig = 'underweight'
                                break
                            case 3:
                                fig = 'overweight'
                                break
                            default:
                                fig = 'regular'
                        }
                        let text1 = fl.age + ';' + gender + ";" + fig + ";" + fl.bullycount + " types of bullying"
                        let text2 = "Physically attacked: " + fl.attackMount + ";" + "Fights: " + fl.fightMount + ";" + "Parents understand: " + fl.parentHelp + ";" + "Friends number: " + fl.friendHelp + ";" + 'Others are helpful: ' + fl.studentHelp + ';' + "Feel lonely: " + fl.lonely
                        textFont(font1)
                        textSize(12)
                        fill(255)
                        text(text1, 200, 10, 300, 100)
                        fill(147)
                        text(text2, 175, 30, 250, 100)
                        pop()
                        fl.side = temp
                    }
                }
            }
        }
        mip = false
    }
    let scrollT = window.pageYOffset || document.documentElement.scrollTop;
    //鼠标滚动到开头时添加跳转按钮
    if (scrollT == 0 && $(".back").length == 0) {
        var button = $("<button>");
        button.attr("class", "back");
        $("body").append(button);
        $(".back").click(function () {
            window.location.href = "summary.html";
        });
    } else if(scrollT != 0) {
        $(".back").remove();
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
    //绑定数据
    attachData(p, count, r) {
        p.radius = r;
        p.side = r;
        p.score = parseInt(rs[count].arr[14]);
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
//一团（花束）数据集合
class bouquet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.age;
        this.figure;
        this.sex;
        this.radius;
        this.flowers = [];
    }
    setposition() {
        //给每个粒子添加新的位置
        let count = 0;
        let ringradiusarr = [];
        let ring = howmanyrings(this.flowers.length);
        for (let i = 0; i < ring; i++) {
            if (i == 0) {
                ringradiusarr.push(1);
            } else {
                ringradiusarr.push(ringcount(i));
            }
        }
        this.radius = (2 * a + gap) * ringradiusarr.length
        for (let i = 0; i < ringradiusarr.length; i++) {
            let rr = (2 * a + gap) * i;
            let anglestep = 0;
            for (let j = 0; j < ringradiusarr[i]; j++) {
                if (count < this.flowers.length) {
                    count++;
                    anglestep += (2 * PI) / ringradiusarr[i];
                    let x = rr * Math.cos(anglestep) + wid / 2;
                    let y = rr * Math.sin(anglestep) + hei / 2;
                    let p = this.flowers[qiuhe(ringradiusarr, i) + j];
                    p.position = new c2.Vector(x, y);
                }
            }
        }
    }
    drawout() {
        for (let i = 0; i < this.flowers.length; i++) {
            let p = this.flowers[i];
            push();
            translate(p.position.x, p.position.y);
            rectMode(CENTER);
            p.bullyCount();
            pop();
        }
    }
}
//第index圈能排几个
function ringcount(index) {
    let ringcot = 1;
    let ringindx = index + 1;
    let x = 2 * a + gap;
    let ringradius = (ringindx - 1) * x;
    anglestep = Math.asin(x / 2 / ringradius) * 2;
    ringcot = Math.round((2 * PI) / anglestep);
    return ringcot;
}
//计算圆环的数量
function howmanyrings(index) {
    let count = 1;
    let number = 1;
    while (number < index) {
        number += ringcount(count);
        count++;
    }
    return count;
}
//求数组前ii项的和
function qiuhe(arr, ii) {
    let sum = 0;
    for (var i = 0; i < ii; i++) {
        sum += arr[i];
    }
    return sum;
}
//冒泡排序
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j].score < arr[j + 1].score) {
                //相邻元素两两对比
                var temp = arr[j + 1]; //元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
//控制鼠标点击避免多次触发
function mouseClicked() {
    if (mip) {
        mip = false
    } else {
        mip = true
    }
}