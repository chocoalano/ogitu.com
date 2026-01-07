/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring session package
  |----------------------------------------------------------
  */
  SESSION_DRIVER: Env.schema.enum(['cookie', 'memory'] as const),
  COOKIE_SECURE: Env.schema.boolean.optional(),

  /*
  |----------------------------------------------------------
  | Variables for configuring database connection
  |----------------------------------------------------------
  */
  DB_HOST: Env.schema.string({ format: 'host' }),
  DB_PORT: Env.schema.number(),
  DB_USER: Env.schema.string(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for RajaOngkir API
  |----------------------------------------------------------
  */
  RAJAONGKIR_API_KEY_SHIPPING: Env.schema.string(),
  RAJAONGKIR_API_KEY_DELIVERY: Env.schema.string(),
  RAJAONGKIR_BASE_URL: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for Midtrans Payment Gateway
  |----------------------------------------------------------
  */
  MIDTRANS_SERVER_KEY: Env.schema.string(),
  MIDTRANS_CLIENT_KEY: Env.schema.string(),
  MIDTRANS_IS_PRODUCTION: Env.schema.boolean(),
  MIDTRANS_SNAP_URL: Env.schema.string(),
  MIDTRANS_API_URL: Env.schema.string(),
  MIDTRANS_SNAP_JS_URL: Env.schema.string.optional(),

  /*
  |----------------------------------------------------------
  | Variables for configuring the drive package
  |----------------------------------------------------------
  */
  DRIVE_DISK: Env.schema.enum(['spaces'] as const),
  SPACES_KEY: Env.schema.string(),
  SPACES_SECRET: Env.schema.string(),
  SPACES_REGION: Env.schema.string(),
  SPACES_BUCKET: Env.schema.string(),
  SPACES_ENDPOINT: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for Redis cache
  |----------------------------------------------------------
  */
  REDIS_HOST: Env.schema.string({ format: 'host' }),
  REDIS_PORT: Env.schema.number(),
  REDIS_PASSWORD: Env.schema.string.optional(),
  REDIS_DB: Env.schema.number.optional(),

  /*
  |----------------------------------------------------------
  | Variables for SMTP Mail (Mailtrap)
  |----------------------------------------------------------
  */
  SMTP_HOST: Env.schema.string.optional(),
  SMTP_PORT: Env.schema.number.optional(),
  SMTP_USERNAME: Env.schema.string.optional(),
  SMTP_PASSWORD: Env.schema.string.optional(),
  MAIL_FROM_ADDRESS: Env.schema.string.optional(),
  MAIL_FROM_NAME: Env.schema.string.optional(),

  /*
  |----------------------------------------------------------
  | Variables for configuring the limiter package
  |----------------------------------------------------------
  */
  LIMITER_STORE: Env.schema.enum(['redis', 'database', 'memory'] as const)
})
