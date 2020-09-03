import * as React from 'react';
import * as ReactDOM from 'react-dom';


import createREGL = require('regl');
import { createREGLCache } from './gl/regl';
import { Camera } from './component/camera';
import glMain = require('./gl/main');
import { DemoMain } from './reactComponent/main';
import { DemoState } from './state';

// let camera:Camera;
async function start() {
  const regl = createREGL({
    extensions: [
      'OES_element_index_uint',
      'OES_texture_float',
    ],
    attributes: {
      alpha: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: true,
    }
  });
  let [l, h, w] = [16, 16, 16];
  const light = {
    pos1: [1.09375 * l, 1.884375 * h, 1.40625 * w],
    pos2: [-0.0625 * l, -0.1875 * h, -0.3125 * w],
    maxLightDistance: 1.818 * Math.pow(l * l + h * h + w * w, 0.5),
  };
  // const canvas = regl._gl.canvas;
  // camera = new Camera((canvas as HTMLCanvasElement));
  const requireREGL = createREGLCache(regl);
  const renderFrame = requireREGL(glMain);
  // camera.target[0] = 0;
  // camera.target[2] = 0;

  const state = new DemoState(regl);

  const reactContainer = document.createElement('div');
  reactContainer.id = 'react-container';
  const containerStyle = reactContainer.style;
  containerStyle.width = '100%';
  containerStyle.height = '100%';
  containerStyle.position = 'absolute';
  containerStyle.left = '0';
  containerStyle.top = '0';
  containerStyle.margin = '0';
  containerStyle.padding = '0';
  document.body.appendChild(reactContainer);

  regl.frame(() => {
    state.camera.updateCamera();
    renderFrame({
      quaternion: [state.quaternion.x, state.quaternion.y, state.quaternion.z, state.quaternion.w],
      vector: state.quaternion.axis,
      mesh:state.pickedMesh,
      camera: state.camera,
      light,
    });

    ReactDOM.render(
      <DemoMain state={state}/>,
      reactContainer);
  });
}

start().catch((err) => console.log(err));