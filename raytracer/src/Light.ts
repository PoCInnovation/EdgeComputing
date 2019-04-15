import Pixel from './Pixel';
import Vector from './Vector';
import Color from './Color';

export default class Light extends Pixel {
  public readonly brightness: number;

  constructor(position: Vector, color: Color, brightness: number) {
    super(position, color);
    this.brightness = brightness;
  }
}
