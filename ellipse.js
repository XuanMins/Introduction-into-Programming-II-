function Ellipse(){
	this.name = "Ellipses";
	this.draw = function(){
        background(0);
        push();
        stroke(random(0,255), random(0,255), random(0,255));
        noFill();
        smooth(0.9);
        translate(width/2, height/2);
        
        fourier.analyze();
        amp = fourier.getEnergy(20,200);
        
        var waves = fourier.waveform();
        
        for (var c = -1; c <= 1; c += 2)
            {
                beginShape()
                for (var i = 0; i <= 180; i+=0.5)
                    {
                        strokeWeight(4);
                        var a = floor(map(i, 0, 180, 0, waves.length - 1));
                        var r = map(waves[a], -1, 1, 100, 400)
                        var x = r * sin(i) * c;
                        var y = r * cos(i);
                        vertex(x,y);
                    }
                endShape()
                
                beginShape()
                for (var i = 0; i <= 180; i+= 0.5)
                    {
                        strokeWeight(2.5);
                        var a = floor(map(i, 0, 270, 0, waves.length - 1));

                        var f = map(waves[a], -1, 1, 50, 150)

                        var x = f * sin(i) * c;
                        var y = f * cos(i);
                        vertex(x,y);
                    }
                endShape()
                
                beginShape()
                for (var i = 0; i <= 180; i+= 0.5)
                    {
                        strokeWeight(1);
                        var a = floor(map(i, 0, 400, 0, waves.length - 1));

                        var f = map(waves[a], -1, 1, 5, 20)

                        var x = f * sin(i) * c;
                        var y = f * cos(i);
                        vertex(x,y);
                    }
                endShape()
            }
        
        var f = new Floats()
        floats.push(f);
        
        for(var p = floats.length -1; p >= 0 ; p--){
            if (!floats[p].fend())
                {
                    floats[p].update(amp > 220);
                    floats[p].show();
                }
            else
                {
                    floats.splice(p, 1);
                }
}
        pop();
    }
}

class Floats {
    constructor(){
        this.pos = p5.Vector.random2D().mult(100);
        this.vel = createVector(0,0);
        this.acc = this.pos.copy().mult(random(0.001,0.0001));
    }
    update(cond) {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if (cond){
            this.pos.add(this.vel);
            this.pos.add(this.vel);
            this.pos.add(this.vel);
        }
    }
    //Removing stars when it reaches the end of the screen
    fend(){
        if (this.pos.x <- width / 2 || this.pos.x > width / 2 || this.pos.y <- height / 2 || this.pos.y > height / 2)
            {
                return true;
            }
        else
            {
                return false;
            }
    }
    show() {
        noStroke();
        fill(random(0,255), random(0,255), random(0,255));
        
        push();
        triangle(this.pos.x, this.pos.y-2.8, this.pos.x-4, this.pos.y+4.5, this.pos.x+4, this.pos.y+4.5)
        triangle(this.pos.x, this.pos.y+6.8, this.pos.x-4, this.pos.y, this.pos.x+4, this.pos.y)
        pop();
    }
}