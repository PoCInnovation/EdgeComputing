import Vector from './Vector';
import Ray from './Ray';

export default class Camera {
  public lowerLeftCorner: Vector;
  public horizontal: Vector;
  public vertical: Vector;
  public origin: Vector;

  constructor(lowerLeftCorner: Vector, horizontal: Vector, vertical: Vector, origin: Vector) {
    this.lowerLeftCorner = lowerLeftCorner;
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.origin = origin;
  }

  getRay(u: number, v: number): Ray {
    return new Ray(this.origin, this.lowerLeftCorner.clone()
      .add(this.horizontal.clone().mul(u))
      .add(this.vertical.clone().mul(v))
      .sub(this.origin));
  }
}
