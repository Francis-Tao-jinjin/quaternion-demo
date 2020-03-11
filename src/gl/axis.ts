export = function(regl) {
  return regl({
    blend: {
      enable: true,
      func: {
        srcRGB: 'src alpha',
        srcAlpha: 1,
        dstRGB: 'one minus src alpha',
        dstAlpha: 1,
      },
      equation: {
        rgb: 'add',
        alpha: 'add',
      },
      color: [0, 0, 0, 0],
    },
    frag: `
      precision mediump float;
      uniform vec3 color;
      uniform float alpha;
      void main() {
        gl_FragColor = vec4(color, alpha);
      }
      `,
      vert: `
      precision mediump float;
      attribute vec3 position;
      uniform mat4 projection, view;
      void main() {
        gl_Position = projection * view * vec4(position, 1);
        gl_PointSize = 3.0;
      }
      `,
      attributes: {
        position: regl.prop('position'),
      },
      uniforms: {
        alpha: regl.prop('alpha'),
        color: regl.prop('color'),
      },
      lineWidth: 1,
      count: regl.prop('count'),
      primitive: regl.prop('primitive'),
  });
}