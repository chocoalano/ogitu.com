import env from '#start/env';
const queueConfig = {
    connection: {
        host: env.get('REDIS_HOST', '127.0.0.1'),
        port: env.get('REDIS_PORT', 6379),
        password: env.get('REDIS_PASSWORD', ''),
        db: env.get('REDIS_DB', 0),
    },
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
        removeOnComplete: {
            count: 100,
            age: 3600,
        },
        removeOnFail: {
            count: 1000,
            age: 86400 * 7,
        },
    },
    queues: {
        email: {
            name: 'email',
            concurrency: 5,
        },
        notification: {
            name: 'notification',
            concurrency: 10,
        },
    },
};
export default queueConfig;
//# sourceMappingURL=queue.js.map