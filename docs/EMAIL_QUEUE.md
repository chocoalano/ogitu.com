# Email Queue System Documentation

## Overview

Sistem email queue menggunakan **BullMQ** dengan **Redis** sebagai backend untuk mengirim email secara asynchronous. Ini memastikan:

- ✅ **Non-blocking**: Request tidak menunggu email terkirim
- ✅ **Retry automatic**: Email yang gagal akan dicoba ulang
- ✅ **Priority support**: OTP emails mendapat prioritas tinggi
- ✅ **Rate limiting**: Bulk emails dikirim secara bertahap
- ✅ **Monitoring**: Dashboard untuk melihat status queue

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Application   │────▶│    Redis     │────▶│  Queue Worker   │
│  (Add to queue) │     │   (BullMQ)   │     │ (Process email) │
└─────────────────┘     └──────────────┘     └─────────────────┘
                                                      │
                                                      ▼
                                              ┌──────────────┐
                                              │  SMTP Server │
                                              │ (Mailtrap)   │
                                              └──────────────┘
```

## Configuration

### Queue Config (`config/queue.ts`)

```typescript
const queueConfig = {
  connection: {
    host: env.get('REDIS_HOST', '127.0.0.1'),
    port: env.get('REDIS_PORT', 6379),
    password: env.get('REDIS_PASSWORD', ''),
    db: env.get('REDIS_DB', 0),
  },
  defaultJobOptions: {
    attempts: 3,           // Retry 3 times on failure
    backoff: {
      type: 'exponential',
      delay: 1000,         // Initial delay 1 second
    },
  },
}
```

### Environment Variables

Pastikan `.env` memiliki konfigurasi Redis:

```env
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
```

## Usage

### 1. Sending OTP Email (Already integrated)

```typescript
import OtpService from '#services/otp_service'

const otpService = new OtpService()
await otpService.sendOtp('user@example.com', 'login')
// Email akan dikirim via queue secara async
```

### 2. Queue Custom Email

```typescript
import emailQueueService from '#services/email_queue_service'

// Queue single email
await emailQueueService.queueEmail({
  to: 'user@example.com',
  subject: 'Hello',
  html: '<p>Hello World</p>',
  priority: 'normal', // 'high' | 'normal' | 'low'
})

// Queue welcome email
await emailQueueService.queueWelcomeEmail('user@example.com', 'John Doe')

// Queue order confirmation
await emailQueueService.queueOrderConfirmationEmail(
  'user@example.com',
  'ORD-12345',
  {
    items: [{ name: 'Product A', quantity: 2, price: 100000 }],
    total: 200000,
    shippingAddress: 'Jl. Example No. 123'
  }
)

// Queue order status update
await emailQueueService.queueOrderStatusEmail(
  'user@example.com',
  'ORD-12345',
  'shipped',
  'JNE123456789'
)
```

### 3. Queue Bulk Emails (Newsletter)

```typescript
import emailQueueService from '#services/email_queue_service'

const recipients = ['user1@example.com', 'user2@example.com', ...]
await emailQueueService.queueBulkEmails(
  recipients,
  'Newsletter Subject',
  '<p>Newsletter content</p>',
  { delay: 500 } // 500ms delay between each email
)
```

## Job Priorities

| Priority | Value | Use Case |
|----------|-------|----------|
| High | 1 | OTP, Password Reset |
| Normal | 5 | Order Confirmation, Welcome |
| Low | 10 | Newsletter, Promotional |

## Admin API Endpoints

### Queue Statistics
```
GET /admin/queue/stats
```

### Get Failed Jobs
```
GET /admin/queue/:queue/failed?start=0&end=20
```

### Retry Failed Job
```
POST /admin/queue/:queue/retry/:jobId
```

### Remove Job
```
DELETE /admin/queue/:queue/job/:jobId
```

### Pause Queue
```
POST /admin/queue/:queue/pause
```

### Resume Queue
```
POST /admin/queue/:queue/resume
```

### Clean Old Jobs
```
POST /admin/queue/:queue/clean
```

## Monitoring

### Get Queue Statistics

```typescript
const stats = await emailQueueService.getStats()
// {
//   waiting: 5,     // Jobs waiting to be processed
//   active: 2,      // Jobs being processed
//   completed: 100, // Jobs completed successfully
//   failed: 3,      // Jobs that failed
//   delayed: 10     // Jobs with delayed processing
// }
```

### Get Failed Jobs for Debugging

```typescript
const failedJobs = await emailQueueService.getFailedEmails(0, 10)
// Returns array of failed job details
```

### Retry Failed Job

```typescript
await emailQueueService.retryEmail('jobId')
```

## Error Handling

Jobs yang gagal akan:
1. Di-retry hingga 3 kali dengan exponential backoff
2. Disimpan dalam failed queue untuk debugging
3. Di-log ke logger

```typescript
// View failed job details
const failedJobs = await emailQueueService.getFailedEmails()
console.log(failedJobs[0].failedReason) // Error message
console.log(failedJobs[0].attemptsMade) // Number of attempts
```

## Best Practices

1. **Selalu gunakan queue untuk email** - Jangan send email secara synchronous
2. **Set priority yang tepat** - OTP/security emails harus high priority
3. **Monitor failed jobs** - Set up alert untuk failed jobs yang banyak
4. **Clean old jobs** - Jalankan cleanup secara berkala
5. **Use bulk for newsletters** - Gunakan `queueBulkEmails` dengan delay untuk menghindari rate limit

## Troubleshooting

### Email tidak terkirim
1. Check Redis connection
2. Check SMTP credentials di `.env`
3. Check failed jobs: `GET /admin/queue/email/failed`

### Queue penuh
1. Increase worker concurrency di `config/queue.ts`
2. Check Redis memory usage
3. Clean old completed jobs

### High latency
1. Check Redis performance
2. Consider adding more workers
3. Check SMTP server response time
