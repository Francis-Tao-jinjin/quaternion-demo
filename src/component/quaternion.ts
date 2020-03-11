import {
  mat4,
  vec3,
  vec4,
} from 'gl-matrix';

export class Quaternion { 
  public x:number;
  public y:number;
  public z:number;
  public w:number;

  public axis:vec3 = vec3.clone([1,0,0]);
  public halfAngle:number = 0;

  constructor(x:number=0,y:number=0,z:number=0,w:number=1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  // axis is normalized vector
  public setFromAxisAngle(axis:number[]|vec3, angle:number) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
    const halfAngle = angle / 2;
    const s = Math.sin( halfAngle );

		this.x = axis[0] * s;
		this.y = axis[1] * s;
		this.z = axis[2] * s;
    this.w = Math.cos( halfAngle );
    vec3.copy(this.axis, axis);
    this.halfAngle = halfAngle;
    return this;
  }

  public inverse() {
    this.x *= - 1;
		this.y *= - 1;
    this.z *= - 1;
    return this;
  }
}