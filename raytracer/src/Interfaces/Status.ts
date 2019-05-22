import { BlockInterface } from '@edge-computing/interfaces';

export interface StatusInterface {
  working: boolean;
  block?: BlockInterface;
}
