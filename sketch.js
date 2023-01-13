//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
//variable for the dots
var floats = [];

function preload(){
	sound = loadSound('assets/TNT时代少年团 —《侠(XIA)》认人歌词版 CNPINENG《乌托邦III • 侠》.mp3');
}

function setup(){
	 createCanvas(windowWidth, windowHeight);
	 background(0);
	 controls = new ControlsAndInput();
     angleMode(DEGREES);
	 //instantiate the fft object
	 fourier = new p5.FFT();
	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Ellipse());

}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}

