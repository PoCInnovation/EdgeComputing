import { Shape, ShapeHit } from './Shapes/Shape';
import { Material } from './Materials/Material';
import Vector from './Vector';
import Camera from './Camera';
import Color from './Color';
import Ray from './Ray';

export default class Scene {
  public readonly width: number;
  public readonly height: number;
  public readonly depth: number;

  constructor(width: number, height: number, depth: number) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  private getColor(ray: Ray, shapes: Shape[], depth: number): Color {
    let hit: ShapeHit | undefined;
    let max = Infinity;
    let material: Material | undefined;

    shapes.forEach((shape) => {
      const newHit = shape.hit(ray, 0.001, max);
      if (newHit !== undefined) {
        hit = newHit;
        material = shape.material;
        max = (newHit.t !== undefined) ? newHit.t : max;
      }
    });
    if (hit !== undefined && material !== undefined) {
      const res = material.scatter(ray, hit);

      if (depth < 50 && res !== undefined) {
        return res.attenuation.mul(this.getColor(res.scattered, shapes, depth + 1));
      }
      return new Color(0, 0, 0);
    }
    const t = (ray.direction.unit().y + 1) * 0.5;
    return new Color(1, 1, 1).mul(1 - t).add(new Color(0.5, 0.7, 1).mul(t));
  }

  public render(context: CanvasRenderingContext2D, camera: Camera, shapes: Shape[]) {
    const imageData = context.createImageData(this.width, this.height);

    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const col = new Color(0, 0, 0);
        for (let z = 0; z < this.depth; z += 1) {
          col.add(this.getColor(
            camera.getRay(
              (x + Math.random()) / this.width,
              (y + Math.random()) / this.height),
            shapes, 0));
        }
        col.div(this.depth).sqrt();

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
