import type { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'
import db from '@adonisjs/lucid/services/db'
import queueService from '#services/queue_service'
import emailQueueService from '#services/email_queue_service'
import { DateTime } from 'luxon'
import os from 'node:os'

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  message: string
  latency?: number
}

interface SystemHealth {
  overall: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  uptime: number
  services: {
    database: HealthStatus
    redis: HealthStatus
    queue: HealthStatus
  }
  memory: {
    used: number
    total: number
    percentage: number
  }
}

interface QueueDashboardStats {
  email: {
    waiting: number
    active: number
    completed: number
    failed: number
    delayed: number
    isPaused: boolean
  }
  totals: {
    totalJobs: number
    successRate: number
    failedJobs: number
  }
}

export default class HealthController {
  /**
   * Get system health status
   */
  async health({ response }: HttpContext) {
    const startTime = Date.now()
    const health: SystemHealth = {
      overall: 'healthy',
      timestamp: DateTime.now().toISO(),
      uptime: process.uptime(),
      services: {
        database: await this.checkDatabase(),
        redis: await this.checkRedis(),
        queue: await this.checkQueue(),
      },
      memory: this.getMemoryUsage(),
    }

    // Determine overall health
    const statuses = Object.values(health.services)
    if (statuses.some((s) => s.status === 'unhealthy')) {
      health.overall = 'unhealthy'
    } else if (statuses.some((s) => s.status === 'degraded')) {
      health.overall = 'degraded'
    }

    return response.json({
      success: true,
      data: health,
      responseTime: Date.now() - startTime,
    })
  }

  /**
   * Get queue dashboard statistics
   */
  async queueStats({ response }: HttpContext) {
    try {
      const emailStats = await emailQueueService.getStats()
      const queue = queueService.getQueue('email')
      const isPaused = await queue.isPaused()

      const stats: QueueDashboardStats = {
        email: {
          ...emailStats,
          isPaused,
        },
        totals: {
          totalJobs: emailStats.completed + emailStats.failed,
          successRate:
            emailStats.completed + emailStats.failed > 0
              ? Math.round(
                  (emailStats.completed / (emailStats.completed + emailStats.failed)) * 100
                )
              : 100,
          failedJobs: emailStats.failed,
        },
      }

      return response.json({
        success: true,
        data: stats,
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
   * Get combined dashboard data (health + queue)
   */
  async dashboardData({ response }: HttpContext) {
    try {
      const [healthData, queueData] = await Promise.all([this.getHealthData(), this.getQueueData()])

      return response.json({
        success: true,
        data: {
          health: healthData,
          queue: queueData,
        },
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard data',
        error: error.message,
      })
    }
  }

  private async getHealthData() {
    return {
      timestamp: DateTime.now().toISO(),
      uptime: process.uptime(),
      services: {
        database: await this.checkDatabase(),
        redis: await this.checkRedis(),
        queue: await this.checkQueue(),
      },
      memory: this.getMemoryUsage(),
    }
  }

  private async getQueueData() {
    const emailStats = await emailQueueService.getStats()
    const queue = queueService.getQueue('email')
    const isPaused = await queue.isPaused()

    return {
      email: {
        ...emailStats,
        isPaused,
      },
      totals: {
        totalJobs: emailStats.completed + emailStats.failed,
        successRate:
          emailStats.completed + emailStats.failed > 0
            ? Math.round((emailStats.completed / (emailStats.completed + emailStats.failed)) * 100)
            : 100,
        failedJobs: emailStats.failed,
      },
    }
  }

  private async checkDatabase(): Promise<HealthStatus> {
    const start = Date.now()
    try {
      await db.rawQuery('SELECT 1')
      return {
        status: 'healthy',
        message: 'Database connection is active',
        latency: Date.now() - start,
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        message: `Database error: ${error.message}`,
        latency: Date.now() - start,
      }
    }
  }

  private async checkRedis(): Promise<HealthStatus> {
    const start = Date.now()
    try {
      await redis.ping()
      return {
        status: 'healthy',
        message: 'Redis connection is active',
        latency: Date.now() - start,
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        message: `Redis error: ${error.message}`,
        latency: Date.now() - start,
      }
    }
  }

  private async checkQueue(): Promise<HealthStatus> {
    const start = Date.now()
    try {
      const stats = await emailQueueService.getStats()
      const queue = queueService.getQueue('email')
      const isPaused = await queue.isPaused()

      if (isPaused) {
        return {
          status: 'degraded',
          message: 'Queue is paused',
          latency: Date.now() - start,
        }
      }

      if (stats.failed > 10) {
        return {
          status: 'degraded',
          message: `${stats.failed} failed jobs in queue`,
          latency: Date.now() - start,
        }
      }

      return {
        status: 'healthy',
        message: 'Queue is processing normally',
        latency: Date.now() - start,
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        message: `Queue error: ${error.message}`,
        latency: Date.now() - start,
      }
    }
  }

  private getMemoryUsage() {
    const used = process.memoryUsage()
    const totalMemory = os.totalmem()
    const usedMemory = used.heapUsed

    return {
      used: Math.round(usedMemory / 1024 / 1024), // MB
      total: Math.round(totalMemory / 1024 / 1024), // MB
      percentage: Math.round((usedMemory / totalMemory) * 100),
    }
  }
}
