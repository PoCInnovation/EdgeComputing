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
  try {
    await newImage(job.data);
  } catch (err) {
    console.error('An error occured while processing image.', err);
  }

  done();
});

export { Queue };
