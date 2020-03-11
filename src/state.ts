import { Camera } from "./component/camera";
import { vec3 } from "gl-matrix";
import { Controller } from './component/controller';
import { Quaternion } from './component/Quaternion';
import { colorCude } from "./utils/geo";

export class DemoState {
  public camera:Camera;
  public controller:Controller;
  public canvas:HTMLCanvasElement;

  public pickQuaternionVector:boolean = false;
  public quaternionVector:vec3 = vec3.clone([1, 0, 0]);
  public quaternion:Quaternion;

  public box:{
    positions:number[][]|vec3,
    colors:number[][]|vec3,
    count:number,
    cull:boolean,
  };

  public xzPlane:{
    positions:number[][]|vec3,
    colors:number[][]|vec3,
    count:number,
    cull: boolean,
  }

  public pickedMesh;
  constructor(regl) {
    this.camera = new Camera(regl._gl.canvas);
    this.canvas = regl._gl.canvas;
    vec3.copy(this.camera.target, [0,0,0]);
    vec3.copy(this.camera.eye, [5,5,5]);
    this.controller = new Controller(this.canvas, this);
    this.quaternion = new Quaternion();
    
    this.box = {
      positions:[],
      colors:[],
      count:0,
      cull: true,
    }
    colorCude(this.box.positions, this.box.colors);
    this.box.count = this.box.positions.length;

    this.xzPlane = {
      positions:[[-0.5, 0, -0.5], [0.5, 0, -0.5], [-0.5, 0, 0.5], [0.5, 0, -0.5], [0.5, 0, 0.5], [-0.5, 0, 0.5]],
      colors: [[1, 0.6, 0], [1, 0.6, 0], [1, 0.6, 0],
                [1, 0.6, 0], [1, 0.6, 0], [1, 0.6, 0]],
      count: 6,
      cull: false,
    }

    this.pickedMesh = this.box;
  }
}