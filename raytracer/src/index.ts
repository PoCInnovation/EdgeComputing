import Config from './config/scene.json';
import { Shape } from './Shapes/Shape';
import Lambertian from './Materials/Lambertian';
import Metal from './Materials/Metal';
import Sphere from './Shapes/Sphere';
import Vector from './Vector';
import Camera from './Camera';
import Scene from './Scene';
import Color from './Color';

async function main() {
  const canvas = document.createElement('canvas');
  const shapes: Shape[] = [
    new Sphere(new Vector(0, 0, -1), new Lambertian(new Color(0.8, 0.3, 0.3)), 0.5),
    new Sphere(new Vector(0, -100.5, -1), new Lambertian(new Color(0.8, 0.8, 0)), 100),
    new Sphere(new Vector(1, 0, -1), new Metal(new Color(0.8, 0.6, 0.2), 0), 0.5),
    new Sphere(new Vector(-1, 0, -1), new Metal(new Color(0.8, 0.8, 0.8), 0.3), 0.5),
  ];
  const camera = new Camera(
    new Vector(-2, -1, -1),
    new Vector(4, 0, 0),
    new Vector(0, 2, 0),
    new Vector(0, 0, 0),
  );

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
