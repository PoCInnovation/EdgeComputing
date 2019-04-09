import Vector from './vector';
import Color from './color';
import Scene from './scene';

function main() {
  let canvas = document.createElement('canvas');
  
  canvas.width = 200;
  canvas.height = 200;
  document.body.appendChild(canvas);
  const scene = new Scene(canvas.width, canvas.height);
  const context = canvas.getContext('2d');
  if (context == null) {
    console.error('Can\'t get the context.');
    return;
  }
  scene.render(context);
}

main();