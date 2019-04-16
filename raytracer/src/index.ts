import Config from './config/scene.json';
import Scene from './Scene';
import { Shape } from './Shapes/Shape';
import Sphere from './Shapes/Sphere';
import Vector from './Vector';
import Color from './Color';

async function main() {
  const canvas = document.createElement('canvas');
  const shapes: Shape[] = [
    new Sphere(new Vector(0, 0, -1), Color.WHITE, 0.5),
    new Sphere(new Vector(0, -100.5, -1), Color.WHITE, 100),
  ];

  if (canvas == null) {
    console.error('Failed to create canvas.');
    return;
  }

  document.title = Config.name;
  canvas.width = Config.width;
  canvas.height = Config.height;
  document.body.appendChild(canvas);

  const scene = new Scene(canvas.width, canvas.height);
  const context = canvas.getContext('2d');

  if (context == null) {
    console.error('Can\'t get the context.');
    return;
  }

  scene.render(context, shapes);
}

main();
