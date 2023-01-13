//draw the waveform to the screen
function WavePattern() {
	//vis name
	this.name = "Wavepattern";

	//draw the wave form to the screen
	this.draw = function() {
        noFill();
        strokeWeight(3);
        stroke(random(0,255), random(0,255), random(0,255));
        triangle(width/2, (height/2)-295, width/2-280, (height/2)+160, width/2+280, (height/2)+160);
        triangle(width/2, (height/2)+295, width/2-280, (height/2)-140, width/2+280, (height/2)-140);
        
		push();
		noFill();
		stroke(random(0,255), random(0,255), random(0,255));
		strokeWeight(2);
        
		beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
                for (var i = 0; i < wave.length; i++) {
                    //for each element of the waveform map it to screen
                    //coordinates and make a new vertex at the point.
                    var x = map(i, 0, wave.length, width*0.2, width/1.2);
                    var y = map(wave[i], -1, 1, 0, height);

                    vertex(x, y+6);
                }
        endShape();
        
        pop();

        push();
        translate(width/2,height/2);
        var f = new Floats2()
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
class Floats2 {
    constructor(){
        this.pos = p5.Vector.random2D().mult(5);
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