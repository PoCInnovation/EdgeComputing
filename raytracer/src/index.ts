import Config from './config/scene.json';
import { Shape } from './Shapes/Shape';
import Lambertian from './Materials/Lambertian';
import Dielectric from './Materials/Dielectric';
import Metal from './Materials/Metal';
import Sphere from './Shapes/Sphere';
import Vector from './Vector';
import Camera from './Camera';
import Scene from './Scene';
import Color from './Color';

function readScene(): Shape[] {
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

async function main() {
  const canvas = document.createElement('canvas');
  const shapes: Shape[] = readScene();

  const lookFrom = new Vector(15, 1, -2);
  const lookAt = new Vector(0, 0, 0);

  const camera = new Camera(lookFrom, lookAt, new Vector(0, 1, 0),
                            20, Config.width / Config.height, 0,
                            (lookFrom.clone().sub(lookAt)).magnitude(), 0, 1);

  if (canvas == null) {
    console.error('Failed to create canvas.');
    return;
  }

  document.title = Config.name;
  canvas.width = Config.width;
  canvas.height = Config.height;
  document.body.appendChild(canvas);

  const scene = new Scene(Config.width, Config.height, Config.depth);
  const context = canvas.getContext('2d');

  if (context == null) {
    console.error('Can\'t get the context.');
    return;
  }

  scene.render(context, camera, shapes);
}

main();
