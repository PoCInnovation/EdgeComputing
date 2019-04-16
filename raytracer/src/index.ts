import Config from './config/scene.json';
import Scene from './Scene';
import { Shape } from './Shapes/Shape';
import Sphere from './Shapes/Sphere';
import Vector from './Vector';
import Color from './Color';
import Camera from './Camera';

async function main() {
  const canvas = document.createElement('canvas');
  const shapes: Shape[] = [
    new Sphere(new Vector(0, 0, -1), Color.WHITE, 0.5),
    new Sphere(new Vector(0, -100.5, -1), Color.WHITE, 100),
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
