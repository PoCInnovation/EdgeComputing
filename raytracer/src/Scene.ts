import Vector from './Vector';
import Ray from './Ray';
import { Shape, ShapeHit } from './Shapes/Shape';
import Color from './Color';
import Camera from './Camera';

export default class Scene {
  public readonly width: number;
  public readonly height: number;
  public readonly depth: number;

  constructor(width: number, height: number, depth: number) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  private randomInUnitSphere(): Vector {
    let p: Vector;
    do {
      p = new Vector(Math.random(), Math.random(), Math.random()).mul(2).sub(1);
    } while (p.dot() >= 1);
    return p;
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
      const target = hit.p.clone().add(hit.normal).add(this.randomInUnitSphere());
      return this.getColor(new Ray(hit.p, target.sub(hit.p)), shapes).mul(0.5);
      // return new Color(hit.normal.x + 1, hit.normal.y + 1, hit.normal.z + 1).mul(0.5);
    }
    const t = (Vector.unitVector(ray.direction).y + 1) * 0.5;
    return new Color(1, 1, 1).mul(1 - t).add(new Color(0.5, 0.7, 1).mul(t));
  }

  public render(context: CanvasRenderingContext2D, camera: Camera, shapes: Shape[]) {
    const imageData = context.createImageData(this.width, this.height);

    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const col = new Color(0, 0, 0);
        for (let z = 0; z < this.depth; z += 1) {
          col.add(this.getColor(camera.getRay(
            (x + Math.random()) / this.width,
            (y + Math.random()) / this.height,
          ), shapes));
        }
        col.div(this.depth);
        // col.r = Math.sqrt(col.r);
        // col.g = Math.sqrt(col.g);
        // col.b = Math.sqrt(col.b);

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
