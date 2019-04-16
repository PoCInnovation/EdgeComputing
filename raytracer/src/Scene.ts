import Vector from './Vector';
import Ray from './Ray';
import { Shape, ShapeHit } from './Shapes/Shape';
import Color from './Color';

export default class Scene {
  public readonly width: number;
  public readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  private getColor(ray: Ray, shapes: Shape[]): Color {
    let hit: ShapeHit = { visible: false };
    let max = Infinity;

    shapes.forEach((shape) => {
      const newHit = shape.hit(ray, 0, max);
      if (newHit.visible) {
        hit = newHit;
        max = (newHit.t !== undefined) ? newHit.t : max;
      }
    });
    if (hit.visible && hit.normal !== undefined && hit.p !== undefined) {
      return new Color(hit.normal.x + 1, hit.normal.y + 1, hit.normal.z + 1).mul(0.5);
    }
    const t = (Vector.unitVector(ray.direction).y + 1) * 0.5;
    return new Color(1, 1, 1).mul(1 - t).add(new Color(0.5, 0.7, 1).mul(t));
  }

  public render(context: CanvasRenderingContext2D, shapes: Shape[]) {
    const imageData = context.createImageData(this.width, this.height);
    const origin = new Vector(0, 0, 0);

    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const ray = new Ray(origin, new Vector(-2, -1, -1)
          .add(new Vector(4, 0, 0).mul(x / this.width))
          .add(new Vector(0, 2, 0).mul(y / this.height)));
        const col = this.getColor(ray, shapes);
        const pos = (x << 2) + ((this.height - y) * imageData.width << 2);

        imageData.data[pos] = 0xff * col.r;
        imageData.data[pos + 1] = 0xff * col.g;
        imageData.data[pos + 2] = 0xff * col.b;
        imageData.data[pos + 3] = 0xff;
      }
    }
    context.putImageData(imageData, 0, 0);
  }
}
