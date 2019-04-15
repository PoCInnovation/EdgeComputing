import Scene from './Scene';
import Config from './config/scene.json';

function main() {
  const canvas = document.createElement('canvas');

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

  scene.render(context);
}

main();
