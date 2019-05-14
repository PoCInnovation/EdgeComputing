import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';

import Camera from './Camera';
import Config from './config/scene.json';
import readScene from './Parser';
import Scene from './Scene';
import { Shape } from './Shapes/Shape';
import Vector from './Vector';

const client = new ApolloClient({
  link: createHttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
});

async function main() {
  const from = new Vector(Config.camera.from.x, Config.camera.from.y, Config.camera.from.z);
  const at = new Vector(Config.camera.at.x, Config.camera.at.y, Config.camera.at.z);
  const vUp = new Vector(Config.camera.vUp.x, Config.camera.vUp.y, Config.camera.vUp.z);
  const camera = new Camera(from, at, vUp, Config.camera.vFov, Config.width / Config.height,
                            Config.camera.aperture,
                            (from.clone().sub(at)).magnitude(), Config.camera.t0, Config.camera.t1);

  const scene = new Scene(Config.width, Config.height, Config.depth);
  const shapes: Shape[] = readScene();

  scene.renderBlock(camera, shapes, 0, 0, 200);
}

main();
