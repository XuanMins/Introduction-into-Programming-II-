//displays and handles clicks on the playback button.
function PlaybackButton(){
	
	this.x = width*0.95;
	this.y = 20;
	this.width = 30;
	this.height = 30;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	this.draw = function(){
		if(this.playing){
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		}
		else{	
			triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);

		}
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function(){
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			if (sound.isPlaying()) {
    			sound.pause();
                noLoop();
  			} else {
    			sound.play();
                loop();
  			}
  			this.playing = !this.playing;
  			return true;
		}
			return false;
	};

}