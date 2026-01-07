import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import logger from '@adonisjs/core/services/logger'

export default class extends BaseSeeder {
  async run() {
    // Create default superadmin account
    await User.updateOrCreate(
      { email: 'admin@ogitu.com' },
      {
        fullName: 'Super Admin',
        email: 'admin@ogitu.com',
        password: 'password',
        role: 'superadmin',
      }
    )

    logger.info('✅ SuperAdmin created:')
    logger.info('   Email: admin@ogitu.com')
    logger.info('   Password: password')
    logger.info('   ⚠️  Please change the password after first login!')
  }
}
