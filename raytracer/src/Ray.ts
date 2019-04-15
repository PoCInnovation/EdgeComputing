import Pixel from './Pixel';
import Vector from './Vector';

export default class Ray {
  public readonly origin: Pixel;
  public readonly direction: Pixel;

  constructor(origin: Pixel | Vector, direction: Pixel | Vector) {
    if (origin instanceof Pixel) {
      this.origin = origin;
    } else {
      this.origin = new Pixel(origin);
    }
    if (direction instanceof Pixel) {
      this.direction = direction;
    } else {
      this.direction = new Pixel(direction);
    }
  }

  public pointAtParameter(t: number): Pixel {
    return new Pixel(this.direction.position, this.direction.color).mul(t).add(this.origin);
  }
}
