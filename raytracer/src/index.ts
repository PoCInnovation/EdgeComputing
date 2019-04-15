import Scene from './scene';

function main() {
  const canvas = document.createElement('canvas');

  if (canvas == null) {
    console.error('Failed to create canvas.');
    return;
  }

  canvas.width = 200;
  canvas.height = 100;
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
