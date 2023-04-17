let x = 0
let y = 9
let z = 6
let a = 1
let b = 118
let c
//兔子颜色灰度值
let type = [255 , 50 , 200 , 100]
let count = 0
let rC
let cC
let rs
let mip = false
let rip = false
//调画面中兔子的行数和列数
let rows = 10
let columns = 10
function preload(){
    font1 = loadFont('lib/nps.ttf')
    font2 = loadFont('lib/srs.ttf')
    data = loadTable('lib/pieces.csv','csv', 'header')
    //取消右键菜单
    document.addEventListener('contextmenu',function(e){
        e.preventDefault();
    })
}

function setup(){
    createCanvas(columns*200, rows*200)
    cC = data.getColumnCount()
    rs = data.getRows()
    rC = data.getRowCount()
    // frameRate(5)
    background(255,88,16)
    for(let i = 0; i<columns-1 ;i++){
        for(let j = 0; j<rows-1 ;j++){
                changeRat()
                noFill()
                push()
                stroke(255)
                strokeWeight(5)
                translate(i*200+100,j*200+100)
                rect(0,0,200,200)
                pop()
            }
    }
}

function draw(){
    clearpiece()
    if(mip){
        rectMode(CENTER)
        // background(255,88,16)
        for(let i = 0; i<columns ;i++){
            for(let j = 0; j<rows ;j++){
                if(mouseX <(i+1)*200 && mouseX>i*200 && mouseY <(j+1)*200 && mouseY>j*200 ){
                    push()
                    noStroke()
                    fill(255,88,16)
                    rect(i*200+100,j*200+100,200,200)
                    pop()
                    changeRat()
                    rabbit(i,j)
                    mip = false
                }
        }
    }
}
}

function mouseClicked(){
        if(mip){
            mip = false
        }
        else{
            mip = true
        }
}

function rabbit(i,j){
    push()
        fill(d);
        strokeWeight(5);
        //耳朵
        rectMode(CENTER)
        push()
        translate(81+i*200,80+j*200)
        rotate(radians(-x))
        rect(0,0,40,116,20);
        pop()

        push()
        translate(119+i*200,80+j*200)
        rotate(radians(x))
        rect(0,0,40,116,20);
        pop()

        // 脸
        push()
        translate(i*200,j*200)
        ellipse(100, 117, 155, b);
        pop()

        //😓
        push()
        noStroke()
        translate(149+i*200,99+j*200)
        scale(a)
        fill(73,200,255);
        arc(0,0,20,20,0,PI*2);
        triangle(0,-26,-120/13,-50/13,120/13,-50/13)
        pop()

        //眼睛
        push()
        fill(0);
        noStroke();
        // ellipse(91.5,86,y);
        // ellipse(108.5,86,y);
        translate(97+i*200,86+j*200)
        ellipse(-y,0,6);
        pop()

        push()
        fill(0);
        noStroke();
        translate(101+i*200,86+j*200)
        ellipse(y,0,6);
        pop()

        push()
        fill(0);
        noStroke();
        translate(99+i*200,86+j*200)
        rect(1,17,38,z,110);
        pop()

        push()
        fill(0)
        textAlign(CENTER, CENTER)
        textSize(12);
        textFont(font1)
        translate(100+i*200,188+j*200)
        text(c, 0, 0, 200, 200)
        pop()
    pop()
}

function testCount(){
    if(count >= rC){
        count = 0
    }
}

function changeRat(){
    count++
    testCount()
    //耳朵的倾斜
    x = rs[count].arr[1]*10
    //眼间距
    y = rs[count].arr[2]
    //嘴厚度
    z = rs[count].arr[3]/10
    //😓
    a = rs[count].arr[4]/2000
    //脸
    b = data.getNum(count, 5) + 48
    //名字
    c = rs[count].arr[0]
    //品种
    let index = rs[count].arr[6]
    if(index == 'US'){
        d = type[0]
    }
    else if(index == 'Japan' ){
        d = type[1]
    }
    else if(index == 'Europe'){
        d = type[2]
    }
    else if(index == 'UK'){
        d = type[3]
    }
}

function fillpiece(){
    if(mip){
        rectMode(CENTER)
        // background(255,88,16)
        for(let i = 0; i<columns ;i++){
            for(let j = 0; j<rows ;j++){
                if(mouseX <(i+1)*200 && mouseX>i*200 && mouseY <(j+1)*200 && mouseY>j*200 ){
                    push()
                    noStroke()
                    fill(255,88,16)
                    rect(i*200+100,j*200+100,200,200)
                    pop()
                    changeRat()
                    rabbit(i,j)
                    mip = false
                }
            }
        }
    }
}

function clearpiece(){
    if(mouseIsPressed){
        if(mouseButton == RIGHT){
            if(rip){
                rip = false
            }
            else{
                rip = true
            }
        }
    }

    if(rip){
        rectMode(CENTER)
        // background(255,88,16)
        for(let i = 0; i<columns ;i++){
            for(let j = 0; j<rows ;j++){
                if(mouseX <(i+1)*200 && mouseX>i*200 && mouseY <(j+1)*200 && mouseY>j*200 ){
                    push()
                    noStroke()
                    fill(255,88,16)
                    rect(i*200+100,j*200+100,200,200)
                    pop()
                    push()
                    stroke(255)
                    strokeWeight(5)
                    line(i*200+100, j*200, i*200+100, j*200+200)//竖线
                    line(i*200, j*200+100, i*200+200, j*200+100)//横线
                    pop()

                    if(i == 0){
                        push()
                        noStroke()
                        fill(255,88,16)
                        rect(i*200+100,j*200+100,200,200)
                        pop()
                        push()
                        stroke(255)
                        strokeWeight(5)
                        line(i*200+100, j*200, i*200+100, j*200+200)//竖线
                        line(i*200+100, j*200+100, i*200+200, j*200+100)//横线
                        pop()
                    }
                    if(i == columns-1){
                        push()
                        noStroke()
                        fill(255,88,16)
                        rect(i*200+100,j*200+100,200,200)
                        pop()
                        push()
                        stroke(255)
                        strokeWeight(5)
                        line(i*200+100, j*200, i*200+100, j*200+200)//竖线
                        line(i*200, j*200+100, i*200+100, j*200+100)//横线
                        pop()
                    }
                    if(j == 0){
                        push()
                        noStroke()
                        fill(255,88,16)
                        rect(i*200+100,j*200+100,200,200)
                        pop()
                        push()
                        stroke(255)
                        strokeWeight(5)
                        line(i*200+100, j*200+100, i*200+100, j*200+200)//竖线
                        line(i*200, j*200+100, i*200+200, j*200+100)//横线
                        pop()
                    }
                    if(j == rows-1){
                        push()
                        noStroke()
                        fill(255,88,16)
                        rect(i*200+100,j*200+100,200,200)
                        pop()
                        push()
                        stroke(255)
                        strokeWeight(5)
                        line(i*200+100, j*200, i*200+100, j*200+100)//竖线
                        line(i*200, j*200+100, i*200+200, j*200+100)//横线
                        pop()
                    }
                    if(i==0 && j == 0){
                        push()
                        noStroke()
                        fill(255,88,16)
                        rect(i*200+100,j*200+100,200,200)
                        pop()
                        push()
                        stroke(255)
                        strokeWeight(5)
                        line(i*200+100, j*200+100, i*200+100, j*200+200)//竖线
                        line(i*200+100, j*200+100, i*200+200, j*200+100)//横线
                        pop()
                    }
                    if(i==0 && j == rows-1){
                        push()
                        noStroke()
                        fill(255,88,16)
                        rect(i*200+100,j*200+100,200,200)
                        pop()
                        push()
                        stroke(255)
                        strokeWeight(5)
                        line(i*200+100, j*200, i*200+100, j*200+100)//竖线
                        line(i*200+100, j*200+100, i*200+200, j*200+100)//横线
                        pop()
                    }
                    if(i==columns-1 && j == 0){
                        push()
                        noStroke()
                        fill(255,88,16)
                        rect(i*200+100,j*200+100,200,200)
                        pop()
                        push()
                        stroke(255)
                        strokeWeight(5)
                        line(i*200, j*200+100, i*200+100, j*200+100)//竖线
                        line(i*200+100, j*200+200, i*200+100, j*200+100)//横线
                        pop()
                    }
                    if(i==columns-1 && j == rows-1){
                        push()
                        noStroke()
                        fill(255,88,16)
                        rect(i*200+100,j*200+100,200,200)
                        pop()
                        push()
                        stroke(255)
                        strokeWeight(5)
                        line(i*200+100, j*200, i*200+100, j*200+100)//竖线
                        line(i*200, j*200+100, i*200+100, j*200+100)//横线
                        pop()
                    }
                    rip = false
                }
            }
        }
    }
}