import Pixel from './pixel';
import Vector from './vector';
import Color from './color';

export default class Light extends Pixel {
  public readonly brightness: number;
  
  constructor(position: Vector, color: Color, brightness: number) {
    super(position, color);
    this.brightness = brightness;
  }
}
