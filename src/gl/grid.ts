export = function(regl) {

  const drawPlane = regl({
    frag: `
    precision mediump float;
    void main () {
      gl_FragColor = vec4(0.25, 0.25, 0.25, 1);
    }`,
    vert: `
    precision mediump float;
    uniform mat4 projection, view;
    attribute vec2 position;
    void main () {
      gl_Position = projection * view * vec4(position.x, 0, position.y, 1);
    }`,
    attributes: {
      position: (() => {
        const points:number[] = [];
        for (let i = -100; i <= 100; ++i) {
          points.push(
            i , -100,
            i, 100,
            -100, i,
            100, i);
        }
        return points;
      })(),
    },
    count: 201 * 2 * 2,
    primitive: 'lines',
  });

  return drawPlane;
}