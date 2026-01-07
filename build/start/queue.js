import emailQueueService from '#services/email_queue_service';
import logger from '@adonisjs/core/services/logger';
emailQueueService.initialize();
logger.info('Queue workers initialized');
//# sourceMappingURL=queue.js.map