var canvas;
var gl; 

var points = [];

var NumTimesToSubdivide = 5;

window.onload = function init();
{
	canvas = document.getElementById("gl-canvas");

	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { alert("WebGL is not available");}

	var vertices [
	vec2( -1, -1),
	vec2(  0,  1),
	vec2(  1, -1)
	];

	divideTriangle( vertices[0], vertices[1], vertices[2], NumTimesToSubdivide);

	gl.viewpoint( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0 );

	var program = initShaders
}