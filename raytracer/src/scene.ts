import Color from './color';
import Pixel from './pixel';
import Vector from './vector';
import Ray from './ray';

export default class Scene {
  public readonly width: number;
  public readonly height: number

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public color(ray: Ray) : Pixel {
    let unitDirection = new Pixel(ray.direction.position, ray.direction.color);
    unitDirection.div(unitDirection.position.magnitude());
    let t = 0.5 * (unitDirection.position.y + 1);
    
    return new Pixel(new Vector(1, 1, 1), new Color(1, 1, 1))
      .mul(t)
      .add(new Pixel(new Vector(0.5, 0.7, 1), new Color(0.5, 0.7, 1))
      .mul(t));
  }

  public render(context: CanvasRenderingContext2D) {
    let color = new Color(0, 0, 0);
    let vector = new Vector(0, 0, 0);
    let lowerLeftCorner = new Pixel(new Vector(-2, -1, -1), new Color(-2, -1, -1));
    let horizontal = new Pixel(new Vector(4, 0, 0), new Color(4, 0, 0));
    let vertical = new Pixel(new Vector(0, 2, 0), new Color(0, 2, 0));
    let origin = new Pixel(new Vector(0, 0, 0), new Color(0, 0, 0));
    
    for (let x = 0; x < this.width - 1; x++) {
      for (let y = 0; y < this.height - 1; y++) {
        let ray = new Ray(origin, lowerLeftCorner
          .add(horizontal.mul(x / this.width))
          .add(vertical.mul(y / this.height)));
        let col = this.color(ray);
        color.r = 255 * col.color.r;
        color.g = 255 * col.color.g;
        color.b = 255 * col.color.b;

        context.fillStyle = color.toString();
        context.fillRect(x, y, x + 1, y + 1);
      }
    }
  }
}