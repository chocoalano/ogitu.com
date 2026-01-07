/*
|--------------------------------------------------------------------------
| Queue Worker Preload
|--------------------------------------------------------------------------
|
| This file initializes the queue workers when the application starts.
| Workers will process jobs in the background using BullMQ and Redis.
|
*/

import emailQueueService from '#services/email_queue_service'
import logger from '@adonisjs/core/services/logger'

/**
 * Initialize email queue worker
 * This runs when the application boots
 */
emailQueueService.initialize()

logger.info('Queue workers initialized')
