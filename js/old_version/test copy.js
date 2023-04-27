//Created by Ren Yuan
//123
//test message
let w = 7
let h = 10
let particles = [];
let particlerow = [];
let a

function setup() {
    // let wid = document.body.clientWidth
    // let hei = document.body.clientHeight
    let wid = windowWidth* 0.6
    let hei = wid/w*h
    var canvas = createCanvas(wid, hei)
    canvas.parent('canv1')
    $('#defaultCanvas0').attr('id','canvas2')
    $('#canvas2').attr('class','canvasUn')
    let len_w = wid / w
    let len_h = hei / h
    a = Math.min(len_w, len_h)
    world = new c2.World(new c2.Rect(0, 0, wid, hei));

    for (i = 0; i < h; i++) {
        for (j = 0; j < w; j++) {
            // fill(255);
            // noStroke();
            let x = len_w / 2 + j * len_w;
            let y = len_h / 2 + i * len_h;
            let p = new c2.Particle(x, y);
            let r = a / 10;
            p.radius = r
            p.lonely = Math.round(random(0, 1))
            p.color = color(255);
            particlerow.push(p)
            world.addParticle(p);
            // circle(x,y,r);
        }
        particles.push(particlerow)
        particlerow = []
    }
    console.log(world.particles)
    let collision = new c2.Collision();
    world.addInteractionForce(collision);
    let pointField = new c2.PointField(new c2.Point( wid/2,  hei/2), 1);
    world.addForce(pointField);
}

function draw() {
    background(0);
    world.update();
    for (let i = 0; i < h; i++) {
        for (j = 0; j < w; j++) {
            let p = particles[i][j]
            push()
            stroke('#333333');
            strokeWeight(1);
            fill(p.color);
            circle(p.position.x, p.position.y, p.radius);
            pop()
        }

    }

}




