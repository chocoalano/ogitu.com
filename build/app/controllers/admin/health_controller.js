import redis from '@adonisjs/redis/services/main';
import db from '@adonisjs/lucid/services/db';
import queueService from '#services/queue_service';
import emailQueueService from '#services/email_queue_service';
import { DateTime } from 'luxon';
import os from 'node:os';
export default class HealthController {
    async health({ response }) {
        const startTime = Date.now();
        const health = {
            overall: 'healthy',
            timestamp: DateTime.now().toISO(),
            uptime: process.uptime(),
            services: {
                database: await this.checkDatabase(),
                redis: await this.checkRedis(),
                queue: await this.checkQueue(),
            },
            memory: this.getMemoryUsage(),
        };
        const statuses = Object.values(health.services);
        if (statuses.some((s) => s.status === 'unhealthy')) {
            health.overall = 'unhealthy';
        }
        else if (statuses.some((s) => s.status === 'degraded')) {
            health.overall = 'degraded';
        }
        return response.json({
            success: true,
            data: health,
            responseTime: Date.now() - startTime,
        });
    }
    async queueStats({ response }) {
        try {
            const emailStats = await emailQueueService.getStats();
            const queue = queueService.getQueue('email');
            const isPaused = await queue.isPaused();
            const stats = {
                email: {
                    ...emailStats,
                    isPaused,
                },
                totals: {
                    totalJobs: emailStats.completed + emailStats.failed,
                    successRate: emailStats.completed + emailStats.failed > 0
                        ? Math.round((emailStats.completed / (emailStats.completed + emailStats.failed)) * 100)
                        : 100,
                    failedJobs: emailStats.failed,
                },
            };
            return response.json({
                success: true,
                data: stats,
            });
        }
        catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to fetch queue statistics',
                error: error.message,
            });
        }
    }
    async dashboardData({ response }) {
        try {
            const [healthData, queueData] = await Promise.all([this.getHealthData(), this.getQueueData()]);
            return response.json({
                success: true,
                data: {
                    health: healthData,
                    queue: queueData,
                },
            });
        }
        catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to fetch dashboard data',
                error: error.message,
            });
        }
    }
    async getHealthData() {
        return {
            timestamp: DateTime.now().toISO(),
            uptime: process.uptime(),
            services: {
                database: await this.checkDatabase(),
                redis: await this.checkRedis(),
                queue: await this.checkQueue(),
            },
            memory: this.getMemoryUsage(),
        };
    }
    async getQueueData() {
        const emailStats = await emailQueueService.getStats();
        const queue = queueService.getQueue('email');
        const isPaused = await queue.isPaused();
        return {
            email: {
                ...emailStats,
                isPaused,
            },
            totals: {
                totalJobs: emailStats.completed + emailStats.failed,
                successRate: emailStats.completed + emailStats.failed > 0
                    ? Math.round((emailStats.completed / (emailStats.completed + emailStats.failed)) * 100)
                    : 100,
                failedJobs: emailStats.failed,
            },
        };
    }
    async checkDatabase() {
        const start = Date.now();
        try {
            await db.rawQuery('SELECT 1');
            return {
                status: 'healthy',
                message: 'Database connection is active',
                latency: Date.now() - start,
            };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                message: `Database error: ${error.message}`,
                latency: Date.now() - start,
            };
        }
    }
    async checkRedis() {
        const start = Date.now();
        try {
            await redis.ping();
            return {
                status: 'healthy',
                message: 'Redis connection is active',
                latency: Date.now() - start,
            };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                message: `Redis error: ${error.message}`,
                latency: Date.now() - start,
            };
        }
    }
    async checkQueue() {
        const start = Date.now();
        try {
            const stats = await emailQueueService.getStats();
            const queue = queueService.getQueue('email');
            const isPaused = await queue.isPaused();
            if (isPaused) {
                return {
                    status: 'degraded',
                    message: 'Queue is paused',
                    latency: Date.now() - start,
                };
            }
            if (stats.failed > 10) {
                return {
                    status: 'degraded',
                    message: `${stats.failed} failed jobs in queue`,
                    latency: Date.now() - start,
                };
            }
            return {
                status: 'healthy',
                message: 'Queue is processing normally',
                latency: Date.now() - start,
            };
        }
        catch (error) {
            return {
                status: 'unhealthy',
                message: `Queue error: ${error.message}`,
                latency: Date.now() - start,
            };
        }
    }
    getMemoryUsage() {
        const used = process.memoryUsage();
        const totalMemory = os.totalmem();
        const usedMemory = used.heapUsed;
        return {
            used: Math.round(usedMemory / 1024 / 1024),
            total: Math.round(totalMemory / 1024 / 1024),
            percentage: Math.round((usedMemory / totalMemory) * 100),
        };
    }
}
//# sourceMappingURL=health_controller.js.map