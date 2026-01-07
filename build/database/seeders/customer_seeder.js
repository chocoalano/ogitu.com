import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Customer from '#models/customer';
import { DateTime } from 'luxon';
import logger from '@adonisjs/core/services/logger';
export default class extends BaseSeeder {
    async run() {
        const customers = [
            {
                fullName: 'Ahmad Fauzi',
                email: 'ahmad.fauzi@gmail.com',
                password: 'password',
                phone: '081234567890',
                birthDate: '1990-05-15',
                gender: 'male',
                isActive: true,
                isVerified: true,
            },
            {
                fullName: 'Siti Rahayu',
                email: 'siti.rahayu@gmail.com',
                password: 'password',
                phone: '081298765432',
                birthDate: '1995-08-22',
                gender: 'female',
                isActive: true,
                isVerified: true,
            },
            {
                fullName: 'Budi Santoso',
                email: 'budi.santoso@gmail.com',
                password: 'password',
                phone: '085612345678',
                birthDate: '1988-03-10',
                gender: 'male',
                isActive: true,
                isVerified: true,
            },
            {
                fullName: 'Dewi Lestari',
                email: 'dewi.lestari@gmail.com',
                password: 'password',
                phone: '087812345678',
                birthDate: '1992-11-28',
                gender: 'female',
                isActive: true,
                isVerified: true,
            },
            {
                fullName: 'Rudi Hermawan',
                email: 'rudi.hermawan@gmail.com',
                password: 'password',
                phone: '081356789012',
                birthDate: '1985-07-05',
                gender: 'male',
                isActive: true,
                isVerified: true,
            },
            {
                fullName: 'Rina Wulandari',
                email: 'rina.wulandari@gmail.com',
                password: 'password',
                phone: '082145678901',
                birthDate: '1993-09-18',
                gender: 'female',
                isActive: true,
                isVerified: true,
            },
            {
                fullName: 'Doni Pratama',
                email: 'doni.pratama@gmail.com',
                password: 'password',
                phone: '085678901234',
                birthDate: '1991-12-03',
                gender: 'male',
                isActive: true,
                isVerified: true,
            },
            {
                fullName: 'Maya Sari',
                email: 'maya.sari@gmail.com',
                password: 'password',
                phone: '081567890123',
                birthDate: '1994-04-25',
                gender: 'female',
                isActive: true,
                isVerified: true,
            },
            {
                fullName: 'Eko Wijaya',
                email: 'eko.wijaya@gmail.com',
                password: 'password',
                phone: '087890123456',
                birthDate: '1987-06-12',
                gender: 'male',
                isActive: true,
                isVerified: true,
            },
            {
                fullName: 'Fitri Handayani',
                email: 'fitri.handayani@gmail.com',
                password: 'password',
                phone: '082234567890',
                birthDate: '1996-02-08',
                gender: 'female',
                isActive: true,
                isVerified: true,
            },
        ];
        for (const customer of customers) {
            await Customer.updateOrCreate({ email: customer.email }, {
                fullName: customer.fullName,
                email: customer.email,
                password: customer.password,
                phone: customer.phone,
                birthDate: customer.birthDate ? DateTime.fromISO(customer.birthDate) : null,
                gender: customer.gender,
                isActive: customer.isActive,
                isVerified: customer.isVerified,
                emailVerifiedAt: customer.isVerified ? DateTime.now() : null,
            });
        }
        logger.info('✅ Customers seeded:');
        logger.info(`   ${customers.length} customers created`);
        logger.info('   Default password: password');
    }
}
//# sourceMappingURL=customer_seeder.js.map