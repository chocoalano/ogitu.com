import type { HttpContext } from '@adonisjs/core/http'
import queueService from '#services/queue_service'
import emailQueueService from '#services/email_queue_service'

export default class QueueController {
  /**
   * Get queue dashboard statistics
   */
  async stats({ response }: HttpContext) {
    try {
      const emailStats = await emailQueueService.getStats()

      return response.json({
        success: true,
        data: {
          email: emailStats,
        },
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to fetch queue statistics',
        error: error.message,
      })
    }
  }

  /**
   * Get failed jobs for a specific queue
   */
  async failedJobs({ request, response }: HttpContext) {
    try {
      const queueName = request.param('queue', 'email')
      const start = request.input('start', 0)
      const end = request.input('end', 20)

      const failedJobs = await queueService.getFailedJobs(queueName, start, end)

      return response.json({
        success: true,
        data: failedJobs.map((job) => ({
          id: job.id,
          name: job.name,
          data: job.data,
          failedReason: job.failedReason,
          attemptsMade: job.attemptsMade,
          processedOn: job.processedOn,
          finishedOn: job.finishedOn,
        })),
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to fetch failed jobs',
        error: error.message,
      })
    }
  }

  /**
   * Retry a failed job
   */
  async retryJob({ request, response }: HttpContext) {
    try {
      const queueName = request.param('queue', 'email')
      const jobId = request.param('jobId')

      if (!jobId) {
        return response.status(400).json({
          success: false,
          message: 'Job ID is required',
        })
      }

      const result = await queueService.retryJob(queueName, jobId)

      if (result) {
        return response.json({
          success: true,
          message: 'Job has been retried',
        })
      }

      return response.status(404).json({
        success: false,
        message: 'Job not found',
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to retry job',
        error: error.message,
      })
    }
  }

  /**
   * Remove a job
   */
  async removeJob({ request, response }: HttpContext) {
    try {
      const queueName = request.param('queue', 'email')
      const jobId = request.param('jobId')

      if (!jobId) {
        return response.status(400).json({
          success: false,
          message: 'Job ID is required',
        })
      }

      const result = await queueService.removeJob(queueName, jobId)

      if (result) {
        return response.json({
          success: true,
          message: 'Job has been removed',
        })
      }

      return response.status(404).json({
        success: false,
        message: 'Job not found',
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to remove job',
        error: error.message,
      })
    }
  }

  /**
   * Pause a queue
   */
  async pauseQueue({ request, response }: HttpContext) {
    try {
      const queueName = request.param('queue', 'email')
      await queueService.pauseQueue(queueName)

      return response.json({
        success: true,
        message: `Queue ${queueName} has been paused`,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to pause queue',
        error: error.message,
      })
    }
  }

  /**
   * Resume a queue
   */
  async resumeQueue({ request, response }: HttpContext) {
    try {
      const queueName = request.param('queue', 'email')
      await queueService.resumeQueue(queueName)

      return response.json({
        success: true,
        message: `Queue ${queueName} has been resumed`,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to resume queue',
        error: error.message,
      })
    }
  }

  /**
   * Clean old jobs from a queue
   */
  async cleanQueue({ request, response }: HttpContext) {
    try {
      const queueName = request.param('queue', 'email')
      await queueService.cleanQueue(queueName)

      return response.json({
        success: true,
        message: `Queue ${queueName} has been cleaned`,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to clean queue',
        error: error.message,
      })
    }
  }
}
