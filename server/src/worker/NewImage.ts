import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

import Block from '../entities/Block';

export interface newImageProps {
  blockID: number;
};

export const newImage = async ({ blockID }: newImageProps) => {

  console.debug('Received newImage task');

  const block = await Block.findOne(blockID, { relations: ['scene'] });

  if (block === undefined) {
    console.error('Invalid block');
    return;
  }

  const canvas = createCanvas(block.scene.width, block.scene.height);
  const ctx = canvas.getContext('2d');

  loadImage(block.data).then(image => {
    ctx.drawImage(image, block.x, block.y, block.size, block.size);
    fs.writeFileSync('./test.png', canvas.toBuffer());
  });
};
