import kue from 'kue';

import { newImage } from './NewImage';

export const QueueTypes = {
  NEW_IMAGE: 'newImage'
};

const Queue = kue.createQueue({
  redis: {
    host: process.env.REDIS_HOST || 'redis'
  }
});

Queue.process(QueueTypes.NEW_IMAGE, async (job: any, done: Function) => {
  await newImage(job.data);
  done();
});

export { Queue };
