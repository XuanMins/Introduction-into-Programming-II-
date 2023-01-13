function Spectrum(){
	this.name = "Spectrum";

	this.draw = function(){
        push();
		var spectrum = fourier.analyze();
		noStroke();
        translate(150,0);
        fourier.analyze();
        
        for (var i = 0; i< spectrum.length; i++){
            var g = map(spectrum[i], 0, 255, 255, 0);
            fill(spectrum[i], g, random(0,255));
            var x = map(i, 0, spectrum.length, 0, width);
            var h = -height + map(spectrum[i], 0, 255, height, 0);
            rect(x, height, width / spectrum.length, h/2 );
            }
        pop();
        
        push();
        var f = new Floats1()
        floats.push(f);
        amp = fourier.getEnergy(20,200);
        translate(-5,-10);
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
               
        var energy = fourier.getEnergy('bass');
            noStroke();
            fill(random(200,255), random(0,220), random(0,255));
            ellipse(width/4,height/2, 50 + energy);

            var high_energy = fourier.getEnergy('highMid');
            noStroke();
            fill(random(0,100), random(0,255), random(0,255));
            ellipse(width*3/4,height/2, 50 + high_energy);
               
        
    }
}

class Floats1 {
    constructor(){
        this.pos = p5.Vector.random2D().mult(10);
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
            this.pos.add(this.vel);
            this.pos.add(this.vel);
        
        }
    }
    //Removing stars when it reaches the end of the screen
    fend(){
        if (this.pos.x <- width || this.pos.x > width || this.pos.y <- height || this.pos.y > height)
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
