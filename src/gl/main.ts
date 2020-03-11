import { vec3, mat4 } from 'gl-matrix';
import { REGL, REGLLoader } from './regl';
import glAxis = require('./axis');
import glPlane = require('./grid');
import glCube = require('./box');
import glSphere = require('./sphere');
import glLine = require('./line');
import glPoint = require('./point');

export = function(regl:REGL, requireREGL:REGLLoader) {

  const drawAxis = requireREGL(glAxis);
  const drawPlane = requireREGL(glPlane);
  const drawCube = requireREGL(glCube);
  const drawSphere = requireREGL(glSphere);
  const drawLine = requireREGL(glLine);
  const drawPoint = requireREGL(glPoint);

  const setup = regl({
    context: {
      quaternion: regl.prop('quaternion'),
      eye: regl.prop('camera.eye'),
      view: regl.prop('camera.view'),
      projection: regl.prop('camera.projection'),
      invView: regl.prop('camera.invView'),
      invProjection: regl.prop('camera.invProjection'),
      gamma: regl.prop('camera.gamma'),
      maxLightDistance: regl.prop('light.maxLightDistance'),
      lightPos1: regl.prop('light.pos1'),
      lightPos2: regl.prop('light.pos2'),
    },
    uniforms: {
      quaternion: regl.context('quaternion'),
      eye: regl.context('eye'),
      view: regl.context('view'),
      projection: regl.context('projection'),
      invView: regl.context('invView'),
      invProjection: regl.context('invProjection'),
      gamma: regl.context('gamma'),
      maxLightDistance: regl.context('maxLightDistance'),
      lightPos1: regl.context('lightPos1'),
      lightPos2: regl.context('lightPos2'),
    }
  });

  return function(props) {
    setup(props, ({tick}) => {
      regl.clear({
        color: [0.361, 0.392, 0.424, 1],
        depth: 1,
      });

      const w = 16;
      const b = 16;
      const h = 16;

      drawPlane();

      drawCube(props.mesh);
      drawSphere();
      drawAxis([{
        color: [0.96, 0.26, 0.21],
        primitive: 'lines',
        alpha: 1,
        count: 8,
        position: [0, 0, 0, w + w / 32, 0, 0, 0, 0.005, 0, w + w / 32, 0.005, 0, 0, 0, 0.005, w + w / 32, 0, 0.005, 0, 0.005, 0.005, w + w / 32, 0.005, 0.005],
      },
      {
        color: [0.46, 0.87, 0],
        primitive: 'lines',
        alpha: 1,
        count: 8,
        position: [0, 0, 0, 0, h + h / 32, 0, 0.005, 0, 0, 0.005, h + h / 32, 0, 0, 0, 0.005, 0, h + h / 32, 0.005, 0.005, 0, 0.005, 0.005, h + h / 32, 0.005],
      },
      {
        color: [0.13, 0.59, 0.95],
        primitive: 'lines',
        alpha: 1,
        // shift: [0,0,0],
        count: 8,
        position: [0, 0, 0, 0, 0, b + b / 32, 0.005, 0, 0, 0.005, 0, b + b / 32, 0, 0.005, 0, 0, 0.005, b + b / 32, 0.005, 0.005, 0, 0.005, 0.005, b + b / 32],
      }]);

      drawLine({
        color:[0.8235294117647058, 0.8156862745098039, 0.8156862745098039],
        width: 0.0075,
        start:[0,0,0],
        end: props.vector
      });
      drawPoint();
    });
  }
}