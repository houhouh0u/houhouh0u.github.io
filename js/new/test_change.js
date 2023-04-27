let w = 30
let h = 20
let particles = [];
let particlerow = [];
let a
let count = -1
var scrollT
let hei
let wid
function preload() {
    data = loadTable('data/bully.csv', 'csv', 'header')
}
function setup() {
    rs = data.getRows()
    // let wid = document.body.clientWidth
    // let hei = document.body.clientHeight
    wid = windowWidth * 0.6
    hei = wid / w * h
    var canvas = createCanvas(wid, hei)
    canvas.parent('canv1')
    $('#defaultCanvas0').attr('id', 'canvas2')
    $('#canvas2').attr('class', 'canvasUn')
    let len_w = wid / w
    let len_h = hei / h
    a = Math.min(len_w, len_h)
    world = new c2.World(new c2.Rect(0, 0, wid, hei));
    print(rs[0])
    for (i = 0; i < h; i++) {
        for (j = 0; j < w; j++) {
            // fill(255);
            // noStroke();
            count++
            let x = len_w / 2 + j * len_w;
            let y = len_h / 2 + i * len_h;
            let p = new flower(x, y);
            let r = a / 2;
            p.radius = r / 2
            p.side = r
            p.bullycount = parseInt(rs[count].arr[1]) + parseInt(rs[count].arr[2]) + parseInt(rs[count].arr[3])
            p.bully = rs[count].arr[1] + rs[count].arr[2] + rs[count].arr[3]
            p.age = rs[count].arr[4]
            p.sex = rs[count].arr[5]
            p.attackMount = rs[count].arr[6]
            p.fightMount = rs[count].arr[7]
            p.lonely = rs[count].arr[8]
            p.friendHelp = rs[count].arr[9]
            p.studentHelp = rs[count].arr[10]
            p.parentHelp = rs[count].arr[11]
            let underweight = rs[count].arr[12]
            let overweight = rs[count].arr[13]
            switch (true) {
                case overweight == 1:
                    p.figure = 3
                    break
                case underweight == 1:
                    p.figure = 1
                    break
                default:
                    p.figure = 2

            }
            push()
            translate(p.position.x, p.position.y);
            rectMode(CENTER);
            p.fundment()
            pop()
            p.color = color(255);
            particlerow.push(p)
            world.addParticle(p);
            // circle(x,y,r);
        }
        particles.push(particlerow)
        particlerow = []
    }

    console.log(particles)

    let collision = new c2.Collision();
    world.addInteractionForce(collision);

    // let pointField = new c2.PointField(new c2.Point(width/2, height/2), 2);
    // world.addForce(pointField);

    // let constForce = new c2.ConstForce(0, 1);
    // world.addForce(constForce);
    // let arc = new c2.Arc(width/2, height/2, width/3, 0, 2*PI);
    // let arcField = new c2.ArcField(arc, 1);
    // world.addForce(arcField);
    // let arc1 = new c2.Arc(width/2, height/2, width/7, 0, 2*PI);
    // let arcField1 = new c2.ArcField(arc1, 1);
    // world.addForce(arcField1);
    // all()

}

function draw() {
    // background(0);
    world.update();
    for (let i = 0; i < hei / windowHeight; i++) {
        push()
        stroke(255)
        line(0, i * windowHeight, wid, i * windowHeight)
        pop()
    }
    scrollT = window.pageYOffset || document.documentElement.scrollTop;
    print("test")

}

function all() {
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            let p = particles[i][j];
            let c = p.side * 2;
            push()
            translate(p.position.x, p.position.y);
            rectMode(CENTER);
            // fill(0);
            // stroke(255)
            // circle(0, 0, c);
            //四个瓣
            p.parentPetal()
            p.friendPetal()
            p.studentPetal()
            p.lonelyPetal()

            //内部的方
            fill(0);
            circle(0, 0, 96 / 170 * c);
            p.fundment()
            p.bullyCount()

            //恶之花
            p.evilFlower()

            //反击
            p.fightCount()
            pop()
        }

    }
}

class flower extends c2.Particle {
    constructor(x, y) {
        super()
        this.radius = 1;
        this.mass = 1;
        this.position = new c2.Vector(x, y);
        this.previousPosition = this.position.copy();
        this._force = new c2.Vector();
        this.bully = 0
        this.bully_school
        this.bully_notschool
        this.bully_cyber
        this.age
        this.sex
        this.attackMount
        this.fightMount
        this.lonely
        this.friendHelp
        this.studentHelp
        this.parentHelp
        this.figure
    }

    fundment() {
        let age = this.age
        let sex = this.sex
        let figure = this.figure
        let c = this.side * 2;
        push();
        fill(0);
        circle(0, 0, 170 / 170 * c);
        fill(255);
        let ed = 1
        let step = 0.07
        //年龄
        switch (true) {
            case age == "12 years old":
                ed = 1 - step * 5
                break
            case age == "13 years old":
                ed = 1 - step * 4
                break
            case age == "14 years old":
                ed = 1 - step * 3
                break
            case age == "15 years old":
                ed = 1 - step * 2
                break
            case age == "16 years old":
                ed = 1 - step
                break
            case age == "17 years old":
                ed = 1
                break
            default:
                ed = 1
        }
        scale(ed)
        if (sex == 0) {
            rotate(PI / 4);
        } else {
            rotate(0)
        }
        //身型
        let ff
        switch (true) {
            case figure == 1:
                ff = 0
                break
            case figure == 2:
                ff = 12
                break
            default:
                ff = 24
        }
        rect(0, 0, 65 / 170 * c, 65 / 170 * c, ff / 170 * c);
        pop();
    }

    bullyCount_b_school() {
        let age = this.age
        let sex = this.sex
        let figure = this.figure
        let bully = this.bully
        let c = this.side * 2;
        push();
        fill(0);
        circle(0, 0, 170 / 170 * c);
        fill(255);
        let ed = 1
        let step = 0.07
        //年龄
        switch (true) {
            case age == "12 years old":
                ed = 1 - step * 5
                break
            case age == "13 years old":
                ed = 1 - step * 4
                break
            case age == "14 years old":
                ed = 1 - step * 3
                break
            case age == "15 years old":
                ed = 1 - step * 2
                break
            case age == "16 years old":
                ed = 1 - step
                break
            case age == "17 years old":
                ed = 1
                break
            default:
                ed = 1
        }
        scale(ed)
        if (sex == 0) {
            rotate(PI / 4);
        } else {
            rotate(0)
        }
        //身型
        let ff
        switch (true) {
            case figure == 1:
                ff = 0
                break
            case figure == 2:
                ff = 12
                break
            default:
                ff = 24
        }
        //霸凌次数影响填充颜色
        if (bully[0] == '1') {
            fill('#bb0b00');
        } else {
            fill(255)
        }
        rect(0, 0, 65 / 170 * c, 65 / 170 * c, ff / 170 * c);
        pop();
    }
    bullyCount_b_notschool() {
        let age = this.age
        let sex = this.sex
        let figure = this.figure
        let bully = this.bully
        let c = this.side * 2;
        push();
        fill(0);
        circle(0, 0, 170 / 170 * c);
        fill(255);
        let ed = 1
        let step = 0.07
        //年龄
        switch (true) {
            case age == "12 years old":
                ed = 1 - step * 5
                break
            case age == "13 years old":
                ed = 1 - step * 4
                break
            case age == "14 years old":
                ed = 1 - step * 3
                break
            case age == "15 years old":
                ed = 1 - step * 2
                break
            case age == "16 years old":
                ed = 1 - step
                break
            case age == "17 years old":
                ed = 1
                break
            default:
                ed = 1
        }
        scale(ed)
        if (sex == 0) {
            rotate(PI / 4);
        } else {
            rotate(0)
        }
        //身型
        let ff
        switch (true) {
            case figure == 1:
                ff = 0
                break
            case figure == 2:
                ff = 12
                break
            default:
                ff = 24
        }
        //霸凌次数影响填充颜色
        if (bully[0] + bully[1] == '11') {
            fill('#700700');
        } else if (bully[0] + bully[1] == '10' || bully[0] + bully[1] == '01') {
            fill('#bb0b00')
        } else {
            fill(255);
        }
        rect(0, 0, 65 / 170 * c, 65 / 170 * c, ff / 170 * c);
        pop();
    }
    bullyCount_b_cyber() {
        let age = this.age
        let sex = this.sex
        let figure = this.figure
        let bullycount = this.bullycount
        let c = this.side * 2;
        push();
        fill(0);
        circle(0, 0, 170 / 170 * c);
        fill(255);
        let ed = 1
        let step = 0.07
        //年龄
        switch (true) {
            case age == "12 years old":
                ed = 1 - step * 5
                break
            case age == "13 years old":
                ed = 1 - step * 4
                break
            case age == "14 years old":
                ed = 1 - step * 3
                break
            case age == "15 years old":
                ed = 1 - step * 2
                break
            case age == "16 years old":
                ed = 1 - step
                break
            case age == "17 years old":
                ed = 1
                break
            default:
                ed = 1
        }
        scale(ed)
        if (sex == 0) {
            rotate(PI / 4);
        } else {
            rotate(0)
        }
        //身型
        let ff
        switch (true) {
            case figure == 1:
                ff = 0
                break
            case figure == 2:
                ff = 12
                break
            default:
                ff = 24
        }
        //霸凌次数影响填充颜色
        switch (true) {
            case bullycount == 3:
                fill('#4b0400');
                break
            case bullycount == 1:
                fill('#bb0b00');
                break
            case bullycount == 2:
                fill('#700700');
                break
            default:
                fill(255);
        }
        rect(0, 0, 65 / 170 * c, 65 / 170 * c, ff / 170 * c);
        pop();
    }

    bullyCount() {
        let age = this.age
        let sex = this.sex
        let figure = this.figure
        let bullycount = this.bullycount
        let c = this.side * 2;
        push();
        fill(0);
        circle(0, 0, 96 / 170 * c);
        fill(255);
        let ed = 1
        let step = 0.07
        //年龄
        switch (true) {
            case age == "12 years old":
                ed = 1 - step * 5
                break
            case age == "13 years old":
                ed = 1 - step * 4
                break
            case age == "14 years old":
                ed = 1 - step * 3
                break
            case age == "15 years old":
                ed = 1 - step * 2
                break
            case age == "16 years old":
                ed = 1 - step
                break
            case age == "17 years old":
                ed = 1
                break
            default:
                ed = 1
        }
        scale(ed)
        if (sex == 0) {
            rotate(PI / 4);
        } else {
            rotate(0)
        }
        //身型
        let ff
        switch (true) {
            case figure == 1:
                ff = 0
                break
            case figure == 2:
                ff = 12
                break
            default:
                ff = 24
        }
        //霸凌次数影响填充颜色
        switch (true) {
            case bullycount == 0:
                fill(255);
                break
            case bullycount == 1:
                fill('#bb0b00');
                break
            case bullycount == 2:
                fill('#700700');
                break
            default:
                fill('#4b0400');
        }
        rect(0, 0, 65 / 170 * c, 65 / 170 * c, ff / 170 * c);
        pop();
    }

    evilFlower() {
        let am = this.attackMount
        let bully = this.bully
        let c = this.side * 2;
        let att = 0;
        //霸凌次数
        switch (true) {
            case am == "10 or more times":
                att = 6
                break
            case am == "8 or 9 times":
                att = 5
                break
            case am == "6 or 7 times":
                att = 4
                break
            case am == "4 or 5 times":
                att = 3
                break
            case am == "2 or 3 times":
                att = 2
                break
            case am == "1 time":
                att = 1
                break
            default:
                att = 0
        }
        //恶之花描边
        for (let iii = 0; iii < att; iii++) {
            push();
            rotate(radians(60 * iii));
            switch (true) {
                case bully == 0:
                    stroke(255);
                    break
                case bully == 1:
                    stroke('#bb0b00');
                    break
                case bully == 2:
                    stroke('#700700');
                    break
                default:
                    stroke('#4b0400');
            }
            strokeWeight(1 / 170 * c);
            fill(0);
            beginShape();
            vertex(0, 0);
            vertex(4 / 170 * c, -7 / 170 * c);
            vertex(0, -24 / 170 * c);
            vertex(-4 / 170 * c, -7 / 170 * c);
            endShape(CLOSE);
            pop();

        }
    }

    fightCount() {
        let fm = this.fightMount
        let c = this.side * 2;
        let fig = 0;
        switch (true) {
            case fm == "12 or more times":
                fig = 4
                break
            case fm == "8 to 11 times":
                fig = 3
                break
            case fm == "4 to 7 times":
                fig = 2
                break
            case fm == "1 to 3 times":
                fig = 1
                break
            default:
                fig = 0
        }
        for (let ii = 0; ii < fig; ii++) {
            push();
            rotate(radians(90 * ii));
            noStroke();
            fill(255);
            beginShape();
            vertex(0, -53 / 170 * c);
            bezierVertex(-4 / 170 * c, -58 / 170 * c, -4 / 170 * c, -65 / 170 * c, 0, -70 / 170 * c);
            vertex(0, -70 / 170 * c);
            bezierVertex(4 / 170 * c, -65 / 170 * c, 4 / 170 * c, -58 / 170 * c, 0, -53 / 170 * c);
            endShape(CLOSE);
            pop();
        }
    }

    parentPetal() {
        let ph = this.parentHelp
        let c = this.side * 2;
        switch (true) {
            case ph == "Never":
                fill(25, 25, 25);
                break
            case ph == "Rarely":
                fill(76, 76, 76);
                break
            case ph == "Sometimes":
                fill(140, 140, 140);
                break
            case ph == "Most of the time":
                fill(178, 178, 178);
                break
            default:
                fill(255, 255, 255);
        }
        circle(-18 / 170 * c, -18 / 170 * c, 70 / 170 * c);
        this.bullyCount()
        this.evilFlower()
        this.fightCount()
    }

    friendPetal() {
        let fh = this.friendHelp
        let c = this.side * 2;
        switch (true) {
            case fh == "0":
                fill(25, 25, 25);
                break
            case fh == "1":
                fill(76, 76, 76);
                break
            case fh == "2":
                fill(153, 153, 153);
                break
            default:
                fill(255, 255, 255);
        }
        circle(18 / 170 * c, -18 / 170 * c, 70 / 170 * c);
        this.bullyCount()
        this.evilFlower()
        this.fightCount()
    }

    studentPetal() {
        let sh = this.studentHelp
        let c = this.side * 2;
        switch (true) {
            case sh == "Never":
                fill(25, 25, 25);
                break
            case sh == "Rarely":
                fill(76, 76, 76);
                break
            case sh == "Sometimes":
                fill(140, 140, 140);
                break
            case sh == "Most of the time":
                fill(178, 178, 178);
                break
            default:
                fill(255, 255, 255);
        }
        circle(-18 / 170 * c, 18 / 170 * c, 70 / 170 * c);
        this.bullyCount()
        this.evilFlower()
        this.fightCount()
    }

    lonelyPetal() {
        let lonely = this.lonely
        let c = this.side * 2;
        switch (true) {
            case lonely == "Never":
                fill(255, 255, 255);
                break
            case lonely == "Rarely":
                fill(178, 178, 178);
                break
            case lonely == "Sometimes":
                fill(140, 140, 140);
                break
            case lonely == "Most of the time":
                fill(76, 76, 76);
                break
            default:
                fill(25, 25, 25);
        }
        circle(18 / 170 * c, 18 / 170 * c, 70 / 170 * c);
        this.bullyCount()
        this.evilFlower()
        this.fightCount()
    }
}
// function mouseWheel() {
//     // scrollT = document.documentElement.scrollTop || document.body.scrollTop;
//     scrollT = window.pageYOffset || document.documentElement.scrollTop;
//     let height = windowHeight
//     switch (true) {
//         case scrollT > height && scrollT <= height * 2:
//             for (let i = 0; i < h; i++) {
//                 for (let j = 0; j < w; j++) {
//                     let p = particles[i][j]
//                     push()
//                     translate(p.position.x, p.position.y);
//                     rectMode(CENTER);
//                     p.bullyCount_b_school()
//                     pop()
//                 }
//             }
//             break
//         case scrollT > height * 2 && scrollT <= height * 3:
//             for (let i = 0; i < h; i++) {
//                 for (let j = 0; j < w; j++) {
//                     let p = particles[i][j]
//                     push()
//                     translate(p.position.x, p.position.y);
//                     rectMode(CENTER);
//                     p.bullyCount_b_notschool()
//                     pop()
//                 }
//             }
//             break
//         case scrollT > height * 3 && scrollT <= height * 4:
//             for (let i = 0; i < h; i++) {
//                 for (let j = 0; j < w; j++) {
//                     let p = particles[i][j]
//                     push()
//                     translate(p.position.x, p.position.y);
//                     rectMode(CENTER);
//                     p.bullyCount_b_cyber()
//                     pop()
//                 }
//             }
//             break
//         case scrollT > height * 4 && scrollT <= height * 5:
//             for (let i = 0; i < h; i++) {
//                 for (let j = 0; j < w; j++) {
//                     let p = particles[i][j]
//                     push()
//                     translate(p.position.x, p.position.y);
//                     rectMode(CENTER);
//                     p.bullyCount()
//                     p.evilFlower()
//                     p.fightCount()
//                     pop()
//                 }
//             }
//             break
//         case scrollT > height * 5 && scrollT <= height * 6:
//             for (let i = 0; i < h; i++) {
//                 for (let j = 0; j < w; j++) {
//                     let p = particles[i][j]
//                     push()
//                     translate(p.position.x, p.position.y);
//                     rectMode(CENTER);
//                     p.parentPetal()
//                     p.bullyCount()
//                     p.evilFlower()
//                     pop()
//                 }
//             }
//             break
//         case scrollT > height * 6 && scrollT <= height * 7:
//             for (let i = 0; i < h; i++) {
//                 for (let j = 0; j < w; j++) {
//                     let p = particles[i][j]
//                     push()
//                     translate(p.position.x, p.position.y);
//                     rectMode(CENTER);
//                     p.friendPetal()
//                     p.bullyCount()
//                     p.evilFlower()
//                     pop()
//                 }
//             }
//             break
//         case scrollT > height * 7 && scrollT <= height * 8:
//             for (let i = 0; i < h; i++) {
//                 for (let j = 0; j < w; j++) {
//                     let p = particles[i][j]
//                     push()
//                     translate(p.position.x, p.position.y);
//                     rectMode(CENTER);
//                     p.studentPetal()
//                     p.bullyCount()
//                     p.evilFlower()
//                     pop()
//                 }
//             }
//             break
//         case scrollT > height * 8:
//             for (let i = 0; i < h; i++) {
//                 for (let j = 0; j < w; j++) {
//                     let p = particles[i][j]
//                     push()
//                     translate(p.position.x, p.position.y);
//                     rectMode(CENTER);
//                     p.lonelyPetal()
//                     p.bullyCount()
//                     p.evilFlower()
//                     pop()
//                 }
//             }
//             break
//         default:
//             for (let i = 0; i < h; i++) {
//                 for (let j = 0; j < w; j++) {
//                     let p = particles[i][j]
//                     push()
//                     translate(p.position.x, p.position.y);
//                     rectMode(CENTER);
//                     p.fundment()
//                     pop()
//                 }
//             }
//         // case scrollT <= height:
//         //     p.fundment()
//         //     console.log('test2')
//         //     break   
//     }

// }

// moudle.exports = flower