function setup() {
    createCanvas(2000,2000);
}
function draw() {
    background(0);
    noStroke();
    //小单位边长
    let a = 15;
    translate(a/2,a/2);
    rectMode(CENTER);
    fill(0);
    rect(0,0,a,a);
    //四个圆
    fill(255);
    circle(-18/170*a,-18/170*a,70/170*a);
    fill(255,200);
    circle(18/170*a,-18/170*a,70/170*a);
    fill(255,150);
    circle(-18/170*a,18/170*a,70/170*a);
    fill(255,100);
    circle(18/170*a,18/170*a,70/170*a);
    //内部
    fill(0);
    circle(0,0,96/170*a);
    push();
    fill(255);
    rotate(PI/4);
    rect(0,0,60/170*a,60/170*a,8/170*a);
    pop();

    //恶之花
    let att = 6;
    for(i=0;i<att;i++){
        push();
        rotate(radians(60*i));
        stroke(255);
        strokeWeight(1);
        fill(0);
        beginShape();
        vertex(0,0);
        vertex(4/170*a,-7/170*a);
        vertex(0,-24/170*a);
        vertex(-4/170*a,-7/170*a);
        endShape(CLOSE);
        pop();

    }

    //反击
    let fig = 4;
    for(i=0;i<fig;i++){
        push();
        rotate(radians(90*i));
        noStroke();
        fill(255);
        beginShape();
        vertex(0,-53/170*a);
        bezierVertex(-4/170*a,-58/170*a,-4/170*a,-65/170*a,0,-70/170*a);
        vertex(0,-70/170*a);
        bezierVertex(4/170*a,-65/170*a,4/170*a,-58/170*a,0,-53/170*a);
        endShape(CLOSE);
        pop();
    }
    
    
    // push();
    // rotate(radians(60));
    // stroke(255);
    // strokeWeight(1);
    // fill(0);
    // beginShape();
    // vertex(0,0);
    // vertex(6,-11);
    // vertex(0,-38);
    // vertex(-6,-11);
    // endShape(CLOSE);
    // pop();

    // push();
    // rotate(radians(120));
    // stroke(255);
    // strokeWeight(1);
    // fill(0);
    // beginShape();
    // vertex(0,0);
    // vertex(6,-11);
    // vertex(0,-38);
    // vertex(-6,-11);
    // endShape(CLOSE);
    // pop();

    // push();
    // rotate(radians(180));
    // stroke(255);
    // strokeWeight(1);
    // fill(0);
    // beginShape();
    // vertex(0,0);
    // vertex(6,-11);
    // vertex(0,-38);
    // vertex(-6,-11);
    // endShape(CLOSE);
    // pop();

    // push();
    // rotate(radians(240));
    // stroke(255);
    // strokeWeight(1);
    // fill(0);
    // beginShape();
    // vertex(0,0);
    // vertex(6,-11);
    // vertex(0,-38);
    // vertex(-6,-11);
    // endShape(CLOSE);
    // pop();

    // push();
    // rotate(radians(300));
    // stroke(255);
    // strokeWeight(1);
    // fill(0);
    // beginShape();
    // vertex(0,0);
    // vertex(6,-11);
    // vertex(0,-38);
    // vertex(-6,-11);
    // endShape(CLOSE);
    // pop();



}
