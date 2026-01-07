import { Queue, Worker, Job, QueueEvents } from 'bullmq'
import queueConfig from '#config/queue'
import logger from '@adonisjs/core/services/logger'

export interface EmailJobData {
  to: string | string[]
  subject: string
  html: string
  text?: string
  attachments?: Array<{
    filename: string
    content?: string
    path?: string
  }>
  priority?: 'high' | 'normal' | 'low'
  metadata?: Record<string, unknown>
}

export interface NotificationJobData {
  userId: number
  type: string
  title: string
  message: string
  data?: Record<string, unknown>
}

type JobData = EmailJobData | NotificationJobData

class QueueService {
  private queues: Map<string, Queue> = new Map()
  private workers: Map<string, Worker> = new Map()
  private queueEvents: Map<string, QueueEvents> = new Map()
  private isInitialized: boolean = false

  /**
   * Get or create a queue instance
   */
  getQueue(queueName: string): Queue {
    if (!this.queues.has(queueName)) {
      const queue = new Queue(queueName, {
        connection: queueConfig.connection,
        defaultJobOptions: queueConfig.defaultJobOptions,
      })
      this.queues.set(queueName, queue)
    }
    return this.queues.get(queueName)!
  }

  /**
   * Add a job to a queue
   */
  async addJob<T extends JobData>(
    queueName: string,
    jobName: string,
    data: T,
    options?: {
      delay?: number
      priority?: number
      attempts?: number
      jobId?: string
    }
  ): Promise<Job<T>> {
    const queue = this.getQueue(queueName)

    const jobOptions = {
      ...options,
      priority: options?.priority ?? this.getPriorityValue((data as EmailJobData).priority),
    }

    const job = await queue.add(jobName, data, jobOptions)
    logger.debug({ jobId: job.id, queueName, jobName }, 'Job added to queue')
    return job
  }

  /**
   * Register a worker for processing jobs
   */
  registerWorker(
    queueName: string,
    processor: (job: Job) => Promise<void>,
    concurrency?: number
  ): Worker {
    if (this.workers.has(queueName)) {
      return this.workers.get(queueName)!
    }

    const queueSettings = Object.values(queueConfig.queues).find((q) => q.name === queueName)
    const workerConcurrency = concurrency ?? queueSettings?.concurrency ?? 1

    const worker = new Worker(queueName, processor, {
      connection: queueConfig.connection,
      concurrency: workerConcurrency,
    })

    // Set up worker event listeners
    worker.on('completed', (job) => {
      logger.info({ jobId: job.id, queueName }, 'Job completed successfully')
    })

    worker.on('failed', (job, error) => {
      logger.error({ jobId: job?.id, queueName, error: error.message }, 'Job failed')
    })

    worker.on('error', (error) => {
      logger.error({ queueName, error: error.message }, 'Worker error')
    })

    worker.on('stalled', (jobId) => {
      logger.warn({ jobId, queueName }, 'Job stalled')
    })

    this.workers.set(queueName, worker)
    logger.info({ queueName, concurrency: workerConcurrency }, 'Worker registered')
    return worker
  }

  /**
   * Set up queue events monitoring
   */
  registerQueueEvents(queueName: string): QueueEvents {
    if (this.queueEvents.has(queueName)) {
      return this.queueEvents.get(queueName)!
    }

    const queueEvents = new QueueEvents(queueName, {
      connection: queueConfig.connection,
    })

    queueEvents.on('waiting', ({ jobId }) => {
      logger.debug({ jobId, queueName }, 'Job waiting in queue')
    })

    queueEvents.on('active', ({ jobId }) => {
      logger.debug({ jobId, queueName }, 'Job started processing')
    })

    queueEvents.on('completed', ({ jobId, returnvalue }) => {
      logger.debug({ jobId, queueName, returnvalue }, 'Job completed')
    })

    queueEvents.on('failed', ({ jobId, failedReason }) => {
      logger.error({ jobId, queueName, failedReason }, 'Job failed')
    })

    this.queueEvents.set(queueName, queueEvents)
    return queueEvents
  }

  /**
   * Get queue statistics
   */
  async getQueueStats(queueName: string) {
    const queue = this.getQueue(queueName)
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      queue.getWaitingCount(),
      queue.getActiveCount(),
      queue.getCompletedCount(),
      queue.getFailedCount(),
      queue.getDelayedCount(),
    ])

    return { waiting, active, completed, failed, delayed }
  }

  /**
   * Get failed jobs for debugging
   */
  async getFailedJobs(queueName: string, start = 0, end = 10) {
    const queue = this.getQueue(queueName)
    return queue.getFailed(start, end)
  }

  /**
   * Retry a failed job
   */
  async retryJob(queueName: string, jobId: string) {
    const queue = this.getQueue(queueName)
    const job = await queue.getJob(jobId)
    if (job) {
      await job.retry()
      logger.info({ jobId, queueName }, 'Job retried')
      return true
    }
    return false
  }

  /**
   * Remove a job
   */
  async removeJob(queueName: string, jobId: string) {
    const queue = this.getQueue(queueName)
    const job = await queue.getJob(jobId)
    if (job) {
      await job.remove()
      logger.info({ jobId, queueName }, 'Job removed')
      return true
    }
    return false
  }

  /**
   * Pause a queue
   */
  async pauseQueue(queueName: string) {
    const queue = this.getQueue(queueName)
    await queue.pause()
    logger.info({ queueName }, 'Queue paused')
  }

  /**
   * Resume a queue
   */
  async resumeQueue(queueName: string) {
    const queue = this.getQueue(queueName)
    await queue.resume()
    logger.info({ queueName }, 'Queue resumed')
  }

  /**
   * Clean old jobs
   */
  async cleanQueue(queueName: string, gracePeriod: number = 3600000) {
    const queue = this.getQueue(queueName)
    await queue.clean(gracePeriod, 1000, 'completed')
    await queue.clean(gracePeriod * 24 * 7, 1000, 'failed')
    logger.info({ queueName }, 'Queue cleaned')
  }

  /**
   * Convert priority string to number
   */
  private getPriorityValue(priority?: 'high' | 'normal' | 'low'): number {
    switch (priority) {
      case 'high':
        return 1
      case 'low':
        return 10
      case 'normal':
      default:
        return 5
    }
  }

  /**
   * Gracefully shutdown all queues and workers
   */
  async shutdown() {
    logger.info('Shutting down queue service...')

    // Close all workers first
    for (const [name, worker] of this.workers) {
      await worker.close()
      logger.debug({ queueName: name }, 'Worker closed')
    }

    // Close all queue events
    for (const [name, events] of this.queueEvents) {
      await events.close()
      logger.debug({ queueName: name }, 'Queue events closed')
    }

    // Close all queues
    for (const [name, queue] of this.queues) {
      await queue.close()
      logger.debug({ queueName: name }, 'Queue closed')
    }

    this.workers.clear()
    this.queueEvents.clear()
    this.queues.clear()
    this.isInitialized = false

    logger.info('Queue service shutdown complete')
  }

  /**
   * Check if service is ready
   */
  get ready() {
    return this.isInitialized
  }
}

// Export singleton instance
const queueService = new QueueService()
export default queueService
