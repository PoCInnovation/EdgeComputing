import { SceneInterface } from './Scene';

export interface BlockInterface {
  id: number;
  size: number;
  x: number;
  y: number;
  updatedAt: Date;
  confirmations: number;
  data: string;
  scene: SceneInterface;
};
