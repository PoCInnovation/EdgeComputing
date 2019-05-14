import Color from './Color';
import Config from './config/scene.json';
import Dielectric from './Materials/Dielectric';
import Lambertian from './Materials/Lambertian';
import Metal from './Materials/Metal';
import { Shape } from './Shapes/Shape';
import Sphere from './Shapes/Sphere';
import Vector from './Vector';

export default function readScene(): Shape[] {
  const shapes: Shape[] = [];

  Config.objects.forEach((obj) => {
    if (obj.material.name === 'Dielectric' && obj.material.refIdx !== undefined) {
      shapes[shapes.length] = new Sphere(
        new Vector(obj.position.x, obj.position.y, obj.position.z),
        new Dielectric(obj.material.refIdx),
        obj.radius);
    } else if (obj.material.name === 'Lambertian') {
      shapes[shapes.length] = new Sphere(
        new Vector(obj.position.x, obj.position.y, obj.position.z),
        new Lambertian(new Color(obj.material.reflection.r,
                                 obj.material.reflection.b,
                                 obj.material.reflection.b)),
        obj.radius);
    } else if (obj.material.name === 'Metal') {
      shapes[shapes.length] = new Sphere(
        new Vector(obj.position.x, obj.position.y, obj.position.z),
        new Metal(new Color(obj.material.reflection.r,
                            obj.material.reflection.b,
                            obj.material.reflection.b),
                  (obj.material.blur !== undefined) ? obj.material.blur : 0),
        obj.radius);
    }
  });
  return shapes;
}
