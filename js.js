var w = window.innerWidth *0.9;
var h = window.innerHeight * 0.9;
var svg = document.getElementsByTagName('svg')[0];
svg.setAttribute("height",h);
svg.setAttribute("width",w);

var moving = false;

var createcirc = function(e){
    //svg.appendChild(c);
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("r","10");
    c.setAttribute("fill","yellow");
    
    //svg.appendChild(c);
    return c;
};


var change = function(e) {
    if (this.getAttribute('fill') == 'green') {
	addcircH(Math.random() * w,
		 Math.random() * h,
		 this.getAttribute("r"),
		 Math.random() < 0.5 ? true : false);
	this.parentElement.removeChild(this);
    } else {
	this.setAttribute("fill",'green');
    }
    e.stopPropagation();
} 

var addCirc = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    addcircH(x, y, 50, false);    
}
var addcircH = function(x, y, r, dir){
    // Creation
    console.log(x);
    console.log(y);
    var d = createcirc();
    d.addEventListener('click', change, true);
    d.setAttribute('cx', x);
    d.setAttribute('cy', y);
    d.setAttribute('r', r);
    svg.appendChild(d);
	
    var direction = dir; // False means Right
    var ydirection = false;
    var rand = Math.random() * 3 + 1;
    var randx = Math.random() * 3 + 1;

    // Movement
    var move = function() {
	if (moving) {
	    d.setAttribute("cy", y);
	    d.setAttribute("cx", x);	    
	    
	    if (x >= w ){ // Move Left 
		direction = true;
	    };
	    if (x <= 0){ // Move Right
		direction = false;
	    };
	    if (y >= h){
		ydirection = true;
	    };
	    if (y <=  0){
		ydirection = false;
	    };

	    var side = x < w/2 ? "left" : "right";
	    if (direction == false){
		x+=randx;
	    }else{
		x-=randx;
	    };
	    if (ydirection == false){
		y+=rand;
	    }else{
		y-=rand;
	    };

	    if (x < w/2 && side == "right") {
		side = "left";
		r /= 2;
		d.setAttribute("r", r);
		addcircH(x + randx,y,r,false);
	    }
	    else if (x > w/2 && side == "left") {
		side = "right";
		r /= 2;
		d.setAttribute("r", r);
		addcircH(x - randx,y,r,true);
	    };	    
	    
	    if (r < 1) {
		svg.removeChild(d);
		return;
	    }
	};
	window.requestAnimationFrame( move )

    };
    move();
};

svg.addEventListener('click', addCirc);
var but = document.getElementById("clear");
var clearer = function(e){
    console.log('hi3');
    while(svg.hasChildNodes()){
	svg.removeChild(svg.lastChild);
    };
    moving = false;
};
but.addEventListener('click', clearer);

document.getElementById('move').addEventListener('click', function(e){moving = true;});

console.log("Loaded js.")
