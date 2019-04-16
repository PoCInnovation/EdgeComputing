import Vector from './Vector';

export default class Ray {
  public readonly origin: Vector;
  public readonly direction: Vector;

  constructor(origin: Vector, direction: Vector) {
    this.origin = origin;
    this.direction = direction;
  }

  public pointAtParameter(t: number): Vector {
    return new Vector(this.direction.x, this.direction.y, this.direction.z).mul(t).add(this.origin);
  }
}
