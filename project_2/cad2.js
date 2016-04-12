//Project 2 - CS 4395
// Jerry Paul
// Spring 2016
// Texas Tech University
// Code Developed from http://www.cs.unm.edu/~angel/WebGL/7E/02/
// 

// Username : jepaul
// Class    : CS 4395
// Assignment : Project 2
// Date Completed : 04/11/2016


var canvas;
var gl;

var maxNumVertices  = 200;
var index = 0;
 
var t;
var numPolygons = 0;
var numIndices = [];
numIndices[0] = 0;
var start = [0];
var c1=0;
var c2=0;
var c3=0;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
	function changeBackground () 
	{
		var r = parseInt(document.getElementById('red').value, 10),
		g = parseInt(document.getElementById('green').value, 10),
		b = parseInt(document.getElementById('blue').value, 10);
		document.getElementById('change').style.backgroundColor = 'rgb('+r+', '+g+', '+b+')';
	} 
	
	document.getElementById("red").onchange = function() 
	{
		changeBackground();
		c1 = (event.srcElement.value/255);
	};
	document.getElementById("green").onchange = function() 
	{
		changeBackground();
		c2 = (event.srcElement.value/255);
	};
	document.getElementById("blue").onchange = function() 
	{
		changeBackground();
		c3 = (event.srcElement.value/255);
	};

    var a = document.getElementById("Button1")
    a.addEventListener("click", function(){
    numPolygons++;
    numIndices[numPolygons] = 0;
    start[numPolygons] = index;
    render();
    });

    canvas.addEventListener("mousedown", function(event){
        t  = vec2(2*event.clientX/canvas.width-1, 
           2*(canvas.height-event.clientY)/canvas.height-1);
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));

        //t = vec4(colors[cindex]);
		t = vec4(c1,c2,c3,1.0);
        
        gl.bindBuffer( gl.ARRAY_BUFFER, cBufferId );
        gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));

        numIndices[numPolygons]++;
        index++;
    } );


    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );


    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW );
    var vPos = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPos, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPos );
    
    var cBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
}

function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT );

    for(var i=0; i<numPolygons; i++) {
        gl.drawArrays( gl.TRIANGLE_FAN, start[i], numIndices[i] );
    }
}
