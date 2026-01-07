import queueService from '#services/queue_service';
import emailQueueService from '#services/email_queue_service';
export default class QueueController {
    async stats({ response }) {
        try {
            const emailStats = await emailQueueService.getStats();
            return response.json({
                success: true,
                data: {
                    email: emailStats,
                },
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
    async failedJobs({ request, response }) {
        try {
            const queueName = request.param('queue', 'email');
            const start = request.input('start', 0);
            const end = request.input('end', 20);
            const failedJobs = await queueService.getFailedJobs(queueName, start, end);
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
            });
        }
        catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to fetch failed jobs',
                error: error.message,
            });
        }
    }
    async retryJob({ request, response }) {
        try {
            const queueName = request.param('queue', 'email');
            const jobId = request.param('jobId');
            if (!jobId) {
                return response.status(400).json({
                    success: false,
                    message: 'Job ID is required',
                });
            }
            const result = await queueService.retryJob(queueName, jobId);
            if (result) {
                return response.json({
                    success: true,
                    message: 'Job has been retried',
                });
            }
            return response.status(404).json({
                success: false,
                message: 'Job not found',
            });
        }
        catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to retry job',
                error: error.message,
            });
        }
    }
    async removeJob({ request, response }) {
        try {
            const queueName = request.param('queue', 'email');
            const jobId = request.param('jobId');
            if (!jobId) {
                return response.status(400).json({
                    success: false,
                    message: 'Job ID is required',
                });
            }
            const result = await queueService.removeJob(queueName, jobId);
            if (result) {
                return response.json({
                    success: true,
                    message: 'Job has been removed',
                });
            }
            return response.status(404).json({
                success: false,
                message: 'Job not found',
            });
        }
        catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to remove job',
                error: error.message,
            });
        }
    }
    async pauseQueue({ request, response }) {
        try {
            const queueName = request.param('queue', 'email');
            await queueService.pauseQueue(queueName);
            return response.json({
                success: true,
                message: `Queue ${queueName} has been paused`,
            });
        }
        catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to pause queue',
                error: error.message,
            });
        }
    }
    async resumeQueue({ request, response }) {
        try {
            const queueName = request.param('queue', 'email');
            await queueService.resumeQueue(queueName);
            return response.json({
                success: true,
                message: `Queue ${queueName} has been resumed`,
            });
        }
        catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to resume queue',
                error: error.message,
            });
        }
    }
    async cleanQueue({ request, response }) {
        try {
            const queueName = request.param('queue', 'email');
            await queueService.cleanQueue(queueName);
            return response.json({
                success: true,
                message: `Queue ${queueName} has been cleaned`,
            });
        }
        catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Failed to clean queue',
                error: error.message,
            });
        }
    }
}
//# sourceMappingURL=queue_controller.js.map