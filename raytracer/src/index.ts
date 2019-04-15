import Scene from './Scene';

function main() {
  const canvas = document.createElement('canvas');

  if (canvas == null) {
    console.error('Failed to create canvas.');
    return;
  }

  canvas.width = 1000;
  canvas.height = 500;
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
