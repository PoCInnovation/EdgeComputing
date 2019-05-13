import { BlockInterface } from './Block';

export interface SceneInterface {
  id: number;
  name: string;
  width: number;
  height: number;
  config: string;
  isFinished: boolean;
  blocks: BlockInterface[];
  createdAt: Date;
  updatedAt: Date;
};
