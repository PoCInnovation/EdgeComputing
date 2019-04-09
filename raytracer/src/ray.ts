import Pixel from './pixel';
import Vector from './vector';
import Color from './color';

export default class Ray {
  public origin: Pixel;
  public direction: Pixel;
  
  constructor(origin: Pixel, direction: Pixel) {
    this.origin = origin;
    this.direction = direction;
  }

  public pointAtParameter(t: number): Pixel {
    return new Pixel(new Vector(0, 0, 0), new Color(0, 0, 0));
  }
}