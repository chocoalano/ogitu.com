import { Queue, Worker, QueueEvents } from 'bullmq';
import queueConfig from '#config/queue';
import logger from '@adonisjs/core/services/logger';
class QueueService {
    queues = new Map();
    workers = new Map();
    queueEvents = new Map();
    isInitialized = false;
    getQueue(queueName) {
        if (!this.queues.has(queueName)) {
            const queue = new Queue(queueName, {
                connection: queueConfig.connection,
                defaultJobOptions: queueConfig.defaultJobOptions,
            });
            this.queues.set(queueName, queue);
        }
        return this.queues.get(queueName);
    }
    async addJob(queueName, jobName, data, options) {
        const queue = this.getQueue(queueName);
        const jobOptions = {
            ...options,
            priority: options?.priority ?? this.getPriorityValue(data.priority),
        };
        const job = await queue.add(jobName, data, jobOptions);
        logger.debug({ jobId: job.id, queueName, jobName }, 'Job added to queue');
        return job;
    }
    registerWorker(queueName, processor, concurrency) {
        if (this.workers.has(queueName)) {
            return this.workers.get(queueName);
        }
        const queueSettings = Object.values(queueConfig.queues).find((q) => q.name === queueName);
        const workerConcurrency = concurrency ?? queueSettings?.concurrency ?? 1;
        const worker = new Worker(queueName, processor, {
            connection: queueConfig.connection,
            concurrency: workerConcurrency,
        });
        worker.on('completed', (job) => {
            logger.info({ jobId: job.id, queueName }, 'Job completed successfully');
        });
        worker.on('failed', (job, error) => {
            logger.error({ jobId: job?.id, queueName, error: error.message }, 'Job failed');
        });
        worker.on('error', (error) => {
            logger.error({ queueName, error: error.message }, 'Worker error');
        });
        worker.on('stalled', (jobId) => {
            logger.warn({ jobId, queueName }, 'Job stalled');
        });
        this.workers.set(queueName, worker);
        logger.info({ queueName, concurrency: workerConcurrency }, 'Worker registered');
        return worker;
    }
    registerQueueEvents(queueName) {
        if (this.queueEvents.has(queueName)) {
            return this.queueEvents.get(queueName);
        }
        const queueEvents = new QueueEvents(queueName, {
            connection: queueConfig.connection,
        });
        queueEvents.on('waiting', ({ jobId }) => {
            logger.debug({ jobId, queueName }, 'Job waiting in queue');
        });
        queueEvents.on('active', ({ jobId }) => {
            logger.debug({ jobId, queueName }, 'Job started processing');
        });
        queueEvents.on('completed', ({ jobId, returnvalue }) => {
            logger.debug({ jobId, queueName, returnvalue }, 'Job completed');
        });
        queueEvents.on('failed', ({ jobId, failedReason }) => {
            logger.error({ jobId, queueName, failedReason }, 'Job failed');
        });
        this.queueEvents.set(queueName, queueEvents);
        return queueEvents;
    }
    async getQueueStats(queueName) {
        const queue = this.getQueue(queueName);
        const [waiting, active, completed, failed, delayed] = await Promise.all([
            queue.getWaitingCount(),
            queue.getActiveCount(),
            queue.getCompletedCount(),
            queue.getFailedCount(),
            queue.getDelayedCount(),
        ]);
        return { waiting, active, completed, failed, delayed };
    }
    async getFailedJobs(queueName, start = 0, end = 10) {
        const queue = this.getQueue(queueName);
        return queue.getFailed(start, end);
    }
    async retryJob(queueName, jobId) {
        const queue = this.getQueue(queueName);
        const job = await queue.getJob(jobId);
        if (job) {
            await job.retry();
            logger.info({ jobId, queueName }, 'Job retried');
            return true;
        }
        return false;
    }
    async removeJob(queueName, jobId) {
        const queue = this.getQueue(queueName);
        const job = await queue.getJob(jobId);
        if (job) {
            await job.remove();
            logger.info({ jobId, queueName }, 'Job removed');
            return true;
        }
        return false;
    }
    async pauseQueue(queueName) {
        const queue = this.getQueue(queueName);
        await queue.pause();
        logger.info({ queueName }, 'Queue paused');
    }
    async resumeQueue(queueName) {
        const queue = this.getQueue(queueName);
        await queue.resume();
        logger.info({ queueName }, 'Queue resumed');
    }
    async cleanQueue(queueName, gracePeriod = 3600000) {
        const queue = this.getQueue(queueName);
        await queue.clean(gracePeriod, 1000, 'completed');
        await queue.clean(gracePeriod * 24 * 7, 1000, 'failed');
        logger.info({ queueName }, 'Queue cleaned');
    }
    getPriorityValue(priority) {
        switch (priority) {
            case 'high':
                return 1;
            case 'low':
                return 10;
            case 'normal':
            default:
                return 5;
        }
    }
    async shutdown() {
        logger.info('Shutting down queue service...');
        for (const [name, worker] of this.workers) {
            await worker.close();
            logger.debug({ queueName: name }, 'Worker closed');
        }
        for (const [name, events] of this.queueEvents) {
            await events.close();
            logger.debug({ queueName: name }, 'Queue events closed');
        }
        for (const [name, queue] of this.queues) {
            await queue.close();
            logger.debug({ queueName: name }, 'Queue closed');
        }
        this.workers.clear();
        this.queueEvents.clear();
        this.queues.clear();
        this.isInitialized = false;
        logger.info('Queue service shutdown complete');
    }
    get ready() {
        return this.isInitialized;
    }
}
const queueService = new QueueService();
export default queueService;
//# sourceMappingURL=queue_service.js.map