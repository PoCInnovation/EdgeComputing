import Pixel from './pixel';

export default class Ray {
  public readonly origin: Pixel;
  public readonly direction: Pixel;

  constructor(origin: Pixel, direction: Pixel) {
    this.origin = origin;
    this.direction = direction;
  }

  public pointAtParameter(t: number): Pixel {
    return new Pixel(this.direction.position, this.direction.color).mul(t).add(this.origin);
  }
}