import { v4 } from 'uuid';


export const GenerateFileName = (ext: string) => `${v4}.${ext}`;
