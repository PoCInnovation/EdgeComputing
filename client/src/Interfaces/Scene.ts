export default interface Scene {
  id: number;
  name: string;
  width: number;
  height: number;
  config: string;
  isFinished: boolean;
  createdAt: Date;
  updatedAt: Date;
};
