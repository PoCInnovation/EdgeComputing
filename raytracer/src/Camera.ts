import Vector from './Vector';
import Ray from './Ray';

export default class Camera {
  public lowerLeftCorner: Vector;
  public horizontal: Vector;
  public vertical: Vector;
  public origin: Vector;

  constructor(vfov: number, aspect: number, lookFrom: Vector, lookAt: Vector, vUp: Vector) {
    const halfHeight = Math.tan(vfov * Math.PI / 180 / 2);
    const halfWidth = aspect * halfHeight;
    const w = lookFrom.clone().sub(lookAt).unit();
    const u = vUp.cross(w).unit();
    const v = w.cross(u);

    this.origin = lookFrom;
    this.lowerLeftCorner = this.origin.clone().sub(
      u.clone().mul(halfWidth)).sub(v.clone().mul(halfHeight)).sub(w);
    this.horizontal = u.clone().mul(2 * halfWidth);
    this.vertical = v.clone().mul(2 * halfHeight);
  }

  public getRay(u: number, v: number): Ray {
    return new Ray(this.origin, this.lowerLeftCorner.clone()
      .add(this.horizontal.clone().mul(u))
      .add(this.vertical.clone().mul(v))
      .sub(this.origin));
  }
}
