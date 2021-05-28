main();

//
// Start here
//

function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };
  const textcanvas = document.getElementById('text');
  const ctx = textcanvas.getContext('2d');
  
  ctx.font = '20px helvetica';
  ctx.fillStyle = 'white'
  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl);

  // Draw the scene
  drawScene(gl, programInfo, buffers);

  ctx.fillText("Football Game", 50, 50);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
function initBuffers(gl) {

  // Create a buffer for all shapes

  const positionBuffer_bg = gl.createBuffer();
  const positionBuffer_lines = gl.createBuffer();
  const positionBuffer_rect1 = gl.createBuffer();
  const positionBuffer_rect2 = gl.createBuffer();
  const positionBuffer_circle = gl.createBuffer();
  const positionBuffer_semicirc1 = gl.createBuffer();
  const positionBuffer_semicirc2 = gl.createBuffer();
  const positionBuffer_dot1 = gl.createBuffer();
  const positionBuffer_dot2 = gl.createBuffer();

  // Creating Position Matrix for different Shapes
  //1. Central Circle
  var positions_circle = [];
  var colors_circle = [];

  for (var i=0.0; i<=360; i+=1) {
    // degrees to radians
    var j = i * Math.PI / 180;
    
    positions_circle.push(Math.sin(j)*0.3,Math.cos(j)*0.3);
    
    colors_circle.push(0.0,0.0,0.0,1.0);
    }

  //2. left semi Circle
  var positions_semicirc1 = [];
  var colors_semicirc1 = [];

  for (var i=0.0; i<=180; i+=1) {
    // degrees to radians
    var j = i * Math.PI / 180;
    positions_semicirc1.push(Math.sin(j)*0.3-2.67,Math.cos(j)*0.3);
    
    colors_semicirc1.push(0.0,0.0,0.0,1.0);
    }

  //3. right semi Circle
  var positions_semicirc2 = [];
  var colors_semicirc2 = [];

  for (var i=180; i<=360; i+=1) {
    // degrees to radians
    var j = i * Math.PI / 180;
    positions_semicirc2.push(Math.sin(j)*0.3+2.67,Math.cos(j)*0.3);
    
    colors_semicirc2.push(0.0,0.0,0.0,1.0);
    }
  //4. left dot
  var positions_dot1= [];
  var colors_dot1 = [];

  for (var i=0; i<=360; i+=1) {
    // degrees to radians
    var j = i * Math.PI / 180;
    positions_dot1.push(Math.sin(j)*0.05-3.2,Math.cos(j)*0.05,-3.2,0);
    
    colors_dot1.push(0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0);
    }
  //5. right dot
  var positions_dot2 = [];
  var colors_dot2 = [];

  for (var i=0; i<=360; i+=1) {
    // degrees to radians
    var j = i * Math.PI / 180;
    positions_dot2.push(Math.sin(j)*0.05+3.2,Math.cos(j)*0.05,3.2,0);
    
    colors_dot2.push(0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0);
    }
  //4. playground background
  const positions_bg = [
     4.0,  2.0,
    -4.0,  2.0,
    -4.0, -2.0,
     4.0, -2.0,
     4.0,  2.0,
  ];
  const positions_lines = [
    0.0,  2.0,
    0.0, -2.0,
    -4.0, 1.25,
    -2.67, 1.25,
    -2.67, 1.25,
    -2.67, -1.25,
    -2.67,-1.25,
     -4.0, -1.25,
     4.0, 1.25,
     2.67, 1.25,
     2.67, 1.25,
     2.67, -1.25,
     2.67,-1.25,
     4, -1.25,
     4.0,  2.0,
     -4.0,  2.0,
     -4.0,  2.0,
     -4.0, -2.0,
     -4.0, -2.0,
      4.0, -2.0,
      4.0, -2.0,
      4.0,  2.0,
      -4.03,  0.78,
      -3.47,  0.78,
      -3.47,  0.78,
      -3.47, -0.78,
      -3.47, -0.78,
      -4.03, -0.78,
      -4.03, -0.78,
      -4.03,  0.78,
      4.03,  0.78,
      3.47,  0.78,
      3.47,  0.78,
      3.47, -0.78,
      3.47, -0.78,
      4.03, -0.78,
      4.03, -0.78,
      4.03,  0.78,
 ];
 const positions_rect1 = [
  -4.0,  0.75,
  -3.5,  0.75,
  -3.5, -0.75,
  -4.0, -0.75,
  -4.0,  0.75,
];
 const positions_rect2 = [
   4.0,  0.75,
   3.5,  0.75,
   3.5, -0.75,
   4.0, -0.75,
   4.0,  0.75,
];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer_bg);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions_bg), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer_lines);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions_lines), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer_rect1);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions_rect1), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer_rect2);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions_rect2), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer_circle);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions_circle), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer_semicirc1);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions_semicirc1), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer_semicirc2);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions_semicirc2), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer_dot1);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions_dot1), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer_dot2);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions_dot2), gl.STATIC_DRAW);
  


  // Now set up the colors for the vertices

  var colors_bg = [
    0.2,  0.80,  0.2,  1.0,
    0.2,  0.80,  0.2,  1.0,    
    0.2,  0.80,  0.2,  1.0,    
    0.2,  0.80,  0.2,  1.0,
    0.2,  0.80,  0.2,  1.0,
        
  ];

  var colors_lines = [
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black

    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black    
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black

    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black    
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black

    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    

  ];
  var colors_rect1 = [
    1.0,  1.0,  1.0,  0.70,
    1.0,  1.0,  1.0,  0.70,    
    1.0,  1.0,  1.0,  0.70,    
    1.0,  1.0,  1.0,  0.70,
    1.0,  1.0,  1.0,  0.70,
        
  ];
  var colors_rect2 = [
    1.0,  1.0,  1.0,  1.0,
    1.0,  1.0,  1.0,  1.0,    
    1.0,  1.0,  1.0,  1.0,    
    1.0,  1.0,  1.0,  1.0,
    1.0,  1.0,  1.0,  1.0,
        
  ];

  /*var colors_circle = [
    0.0,  0.0,  0.0,  1.0,
        
  ];*/
  

  const colorBuffer_bg = gl.createBuffer();
  const colorBuffer_lines = gl.createBuffer();
  const colorBuffer_rect1 = gl.createBuffer();
  const colorBuffer_rect2 = gl.createBuffer();
  const colorBuffer_circle = gl.createBuffer();
  const colorBuffer_semicirc1 = gl.createBuffer();
  const colorBuffer_semicirc2= gl.createBuffer();
  const colorBuffer_dot1 = gl.createBuffer();
  const colorBuffer_dot2= gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_bg);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors_bg), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_lines);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors_lines), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_rect1);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors_rect1), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_rect2);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors_rect2), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_circle);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors_circle), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_semicirc1);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors_semicirc1), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_semicirc2);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors_semicirc2), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_dot1);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors_dot1), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer_dot2);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors_dot2), gl.STATIC_DRAW);


  return {
    position_bg: positionBuffer_bg,
    color_bg: colorBuffer_bg,
    position_lines: positionBuffer_lines,
    color_lines: colorBuffer_lines,
    position_rect1: positionBuffer_rect1,
    color_rect1: colorBuffer_rect1,
    position_rect2: positionBuffer_rect2,
    color_rect2: colorBuffer_rect2,
    position_circle: positionBuffer_circle,
    color_circle: colorBuffer_circle,
    position_semicirc1: positionBuffer_semicirc1,
    color_semicirc1: colorBuffer_semicirc1,
    position_semicirc2: positionBuffer_semicirc2,
    color_semicirc2: colorBuffer_semicirc2,
    position_dot1: positionBuffer_dot1,
    color_dot1: colorBuffer_dot1,
    position_dot2: positionBuffer_dot2,
    color_dot2: colorBuffer_dot2

  };
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.54, 0.27, 0.07, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, 0.0, -8.0]);  // amount to translate

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position_bg);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color_bg);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 5;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }

  //// DRAWING LINES

    // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position_lines);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color_lines);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }


  {
    const offset = 0;
    const vertexCount = 38;
    gl.drawArrays(gl.LINES, offset, vertexCount);
  }
  //// DRAWING rect1

    // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position_rect1);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color_rect1);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }


  {
    const offset = 0;
    const vertexCount = 5;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }

  //// DRAWING rect2

    // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position_rect2);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color_rect2);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }


  {
    const offset = 0;
    const vertexCount = 5;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);

  }
  
  //// DRAWING CIRCLE

    // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position_circle);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color_circle);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  //gl_point_size=5;
  {
    const offset = 0;
    const vertexCount = 361;
    gl_PointSize = 5.0;

    gl.drawArrays(gl.POINTS, offset, vertexCount);
  }  

  //// DRAWING Semi CIRCLE 1

    // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position_semicirc1);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color_semicirc1);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  //gl_point_size=5;
  {
    const offset = 0;
    const vertexCount = 181;
    gl_PointSize = 5.0;

    gl.drawArrays(gl.POINTS, offset, vertexCount);
  }
  //// DRAWING Semi CIRCLE 2

    // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position_semicirc2);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color_semicirc2);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  //gl_point_size=5;
  {
    const offset = 0;
    const vertexCount = 181;
    gl_PointSize = 30.0;

    gl.drawArrays(gl.POINTS, offset, vertexCount);
  }
  //// DRAWING dot 1

    // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position_dot1);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color_dot1);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  //gl_point_size=5;
  {
    const offset = 0;
    const vertexCount = 682;
    gl_PointSize = 30.0;

    gl.drawArrays(gl.LINES, offset, vertexCount);
  }
  //// DRAWING dot 2

    // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position_dot2);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color_dot2);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  //gl_point_size=5;
  {
    const offset = 0;
    const vertexCount = 682;
    gl_PointSize = 30.0;

    gl.drawArrays(gl.LINES, offset, vertexCount);
  }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

