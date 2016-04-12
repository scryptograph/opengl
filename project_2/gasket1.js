// Project 2 - CS 4395
// Jerry Paul
// Spring 2016
// Texas Tech University
// Code Developed from http://www.cs.unm.edu/~angel/WebGL/7E/02/
// 

// Username : jepaul
// Class    : CS 4395
// Assignment : Project 2
// Date Completed : 04/11/2016

var gl;
var points;
var NumPoints=0;
var oldNums=0;
var incrementValue=10;//change this value to make the figure be drawn faster
var ID;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.
    
    vertices = [
        vec2(-0.75 , -0.75 ),
        vec2(  0.5,  0.75 ),
        vec2(  0.6, -0.6 )
    ];

    // Specify a starting point p for our iterations
    // p must lie inside any set of three vertices
    
    var u = add( vertices[0], vertices[1] );
    var v = add( vertices[0], vertices[2] );
    var p = scale( 0.25, add( u, v ) );

    // And, add our initial point into our array of points
    
    points = [ p ];

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0, 0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	count=0;
	window.addEventListener("mousedown", function(event){
      if(event.which==1)//left click
	  {
		ID = setInterval(draw,1);//draw,# where number is how quickly to draw
	  }
	  if(event.which==3)//right click
	  {
		  clearInterval(ID);

	  }
	  if(event.which==2)//middle click
	  {
		  close();
	  }
    });
	render();
};

function draw()
{	
	for ( var i = oldNums; points.length < NumPoints; ++i ) {
		var j = Math.floor(Math.random() * 3);		
		p = add( points[i], vertices[j] );
		p = scale( 0.5, p );
		points.push( p );
	}
	if(NumPoints>0)
		oldNums=NumPoints-1;
	NumPoints+=incrementValue;
	gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );		
	render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, points.length );
}
