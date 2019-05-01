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
import MovingSphere from './Shapes/MovingSphere';

function randomScene(n: number): Shape[] {
  const shapes: Shape[] = [
    new Sphere(new Vector(0, -1000, 0), new Lambertian(new Color(0.5, 0.5, 0.5)), 1000),
  ];
  let i = 1;

  for (let a = -5; a < 5; a += 1) {
    for (let b = -5; b < 5; b += 1) {
      const chooseMath = Math.random();
      const center = new Vector(a + 0.9 * Math.random(), 0.2, b + 0.9 * Math.random());

      if (center.clone().sub(new Vector(4, 0.2, 0)).magnitude() > 0.9) {
        i += 1;
        if (chooseMath < 0.8) {
          const mat = new Lambertian(
            new Color(Math.random() * Math.random(),
                      Math.random() * Math.random(),
                      Math.random() * Math.random()));
          shapes[i] = new Sphere(center, mat, 0.2);
        } else if (chooseMath < 0.95) {
          shapes[i] = new Sphere(center, new Metal(
            new Color(0.5 * (1 + Math.random()),
                      0.5 * (1 + Math.random()),
                      0.5 * (1 + Math.random())),
            0.5 * (1 + Math.random())),
                                 0.2);
        } else {
          shapes[i] = new Sphere(center, new Dielectric(1.5), 0.2);
        }
      }
    }
  }

  shapes[i + 1] = new Sphere(new Vector(0, 1, 0), new Dielectric(1.5), 1);
  shapes[i + 2] = new Sphere(new Vector(-4, 1, 0), new Lambertian(new Color(0.4, 0.2, 0.1)), 1);
  shapes[i + 3] = new Sphere(new Vector(4, 1, 0), new Metal(new Color(0.7, 0.6, 0.5), 0), 1);
  return shapes;
}

async function main() {
  const canvas = document.createElement('canvas');
  const shapes: Shape[] = randomScene(500);

  const lookFrom = new Vector(13, 2, 3);
  const lookAt = new Vector(0, 0, 0);

  const camera = new Camera(lookFrom, lookAt, new Vector(0, 1, 0),
                            20, Config.width / Config.height, 0, 10, 0, 1);

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
