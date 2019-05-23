import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

import Config from '../config';
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

  console.log('Processing block', block.id, 'x:', block.x, 'y:', block.y);

  const canvas = createCanvas(block.scene.width, block.scene.height);
  const ctx = canvas.getContext('2d');
  const imageFile = path.join(Config.FILES_DIR, block.scene.image);

  await loadImage(imageFile)
    .then(image => ctx.drawImage(image, 0, 0, block.scene.width, block.scene.height))
    .catch(() => console.debug('Base image does not exist'));

  await loadImage(block.data).then(image => {
    ctx.drawImage(image, block.x, block.y, block.size, block.size);
    fs.writeFileSync(imageFile, canvas.toBuffer());
  });
};
