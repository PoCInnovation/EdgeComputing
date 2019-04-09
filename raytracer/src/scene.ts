import Color from './color';
import Pixel from './pixel';
import Vector from './vector';

export default class Scene {
  public readonly width: number;
  public readonly height: number

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public render(context: CanvasRenderingContext2D) {
    let color = new Color(0, 0, 0);
    let vector = new Vector(0, 0, 0);

    for (let x = 0; x < this.width - 1; x++) {
      for (let y = 0; y < this.height - 1; y++) {
        color.r = 255 * (x / this.width);
        color.g = 255 * (y / this.height);
        let pixel = new Pixel(vector, color);
        context.fillStyle = pixel.color.toString();
        context.fillRect(x, y, x + 1, y + 1);
      }
    }
  }
}