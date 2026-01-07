import env from '#start/env'

const queueConfig = {
  connection: {
    host: env.get('REDIS_HOST', '127.0.0.1'),
    port: env.get('REDIS_PORT', 6379),
    password: env.get('REDIS_PASSWORD', ''),
    db: env.get('REDIS_DB', 0),
  },

  /**
   * Default job options
   */
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential' as const,
      delay: 1000, // 1 second initial delay
    },
    removeOnComplete: {
      count: 100, // Keep last 100 completed jobs
      age: 3600, // Keep completed jobs for 1 hour
    },
    removeOnFail: {
      count: 1000, // Keep last 1000 failed jobs for debugging
      age: 86400 * 7, // Keep failed jobs for 7 days
    },
  },

  /**
   * Queue specific configurations
   */
  queues: {
    email: {
      name: 'email',
      concurrency: 5, // Process 5 emails at a time
    },
    notification: {
      name: 'notification',
      concurrency: 10,
    },
  },
}

export default queueConfig
