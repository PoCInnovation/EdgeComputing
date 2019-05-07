import Vector from './Vector';

export default class Ray {
  public readonly origin: Vector;
  public readonly direction: Vector;
  public readonly time: number;

  constructor(origin: Vector, direction: Vector, time: number) {
    this.origin = origin;
    this.direction = direction;
    this.time = time;
  }

  public pointAtParameter(t: number): Vector {
    return this.direction.clone().mul(t).add(this.origin);
  }
}
