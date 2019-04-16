import Vector from './Vector';

export default class Ray {
  public readonly origin: Vector;
  public readonly direction: Vector;

  constructor(origin: Vector, direction: Vector) {
    this.origin = origin;
    this.direction = direction;
  }

  public pointAtParameter(t: number): Vector {
    return this.direction.clone().mul(t).add(this.origin);
  }
}
