var w = window.innerWidth *0.9;
var h = window.innerHeight * 0.9;
var svg = document.getElementsByTagName('svg')[0];
svg.setAttribute("height",h);
svg.setAttribute("width",w);
var createcirc = function(e){

    
    //svg.appendChild(c);
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("r","10");
    c.setAttribute("fill","yellow");
    
    //svg.appendChild(c);
    return c;
};

var event = function(e){
    
    console.log('circle' );
    if(this.getAttribute('fill') == 'green'){
	this.parentElement.removeChild(this);
    }else{
	this.setAttribute("fill",'green');
	e.stopPropagation();
    };
};


var addcircH = function(x, y){
    if (x < 5 && y < 5){
	x = Math.random() * w;
	y = Math.random() * h;
    };
    console.log('svg' + this);
    var d = createcirc();
    d.addEventListener('click',event,true);
    d.setAttribute('cx', x);
    d.setAttribute('cy', y);
    svg.appendChild(d);
    
};
var addcirc = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    addcircH(x, y);
} 
   
svg.addEventListener('click', addcirc);
var but = document.getElementById("clear");
var clearer = function(e){
    console.log('hi3');
    while(svg.hasChildNodes()){
	svg.removeChild(svg.lastChild);
    };
};
but.addEventListener('click', clearer);
