export function colorCude(points, colors) {
  quad( 1, 0, 3, 2, 4, points, colors);
  quad( 2, 3, 7, 6, 1, points, colors);
  quad( 3, 0, 4, 7, 3, points, colors);
  quad( 6, 5, 1, 2, 4, points, colors );
  quad( 4, 5, 6, 7, 1, points, colors);
  quad( 5, 4, 0, 1, 3, points, colors );  
}

function quad(a, b, c, d, col, points, colors) {
  var vertices = [
    [ -0.5, -0.5,  0.5 ],
    [ -0.5,  0.5,  0.5 ],
    [  0.5,  0.5,  0.5 ],
    [  0.5, -0.5,  0.5 ],
    [ -0.5, -0.5, -0.5 ],
    [ -0.5,  0.5, -0.5 ],
    [  0.5,  0.5, -0.5 ],
    [  0.5, -0.5, -0.5 ]
  ];

  var vertexColors = [
    [ 0.0, 0.0, 0.0 ],  // black
    [ 1.0, 0.0, 0.0 ],  // red
    [ 1.0, 1.0, 0.0 ],  // yellow
    [ 0.0, 1.0, 0.0 ],  // green
    [ 0.0, 0.0, 1.0 ],  // blue
    [ 1.0, 0.0, 1.0 ],  // magenta
    [ 0.0, 1.0, 1.0 ],  // cyan
    [ 1.0, 1.0, 1.0 ]   // white
  ];

  var indices = [a,b,c,a,c,d];
  for (var i = 0; i< indices.length; ++i) {
    points.push(vertices[indices[i]]);
    colors.push(vertexColors[a]);
  }
}
