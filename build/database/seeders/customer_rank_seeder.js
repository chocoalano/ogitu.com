import { BaseSeeder } from '@adonisjs/lucid/seeders';
import CustomerRank from '#models/customer_rank';
export default class CustomerRankSeeder extends BaseSeeder {
    async run() {
        await CustomerRank.query().delete();
        await CustomerRank.createMany([
            {
                name: 'Vapor Newbie',
                slug: 'vapor-newbie',
                icon: 'i-lucide-flame',
                color: 'slate',
                minOrders: 0,
                minSpent: 0,
                cashbackRate: 2,
                affiliateBonusRate: 0,
                benefits: ['Akses promo reguler', 'Support 24/7', 'Cashback 2%'],
                orderPriority: 1,
                isActive: true,
            },
            {
                name: 'Vapor Active',
                slug: 'vapor-active',
                icon: 'i-lucide-zap',
                color: 'cyan',
                minOrders: 5,
                minSpent: 1000000,
                cashbackRate: 5,
                affiliateBonusRate: 1,
                benefits: [
                    'Cashback 5%',
                    'Bonus affiliate +1%',
                    'Early access promo',
                    'Priority support',
                    'Free shipping (min. Rp200k)',
                ],
                orderPriority: 2,
                isActive: true,
            },
            {
                name: 'Vapor Pro',
                slug: 'vapor-pro',
                icon: 'i-lucide-crown',
                color: 'orange',
                minOrders: 15,
                minSpent: 5000000,
                cashbackRate: 10,
                affiliateBonusRate: 2,
                benefits: [
                    'Cashback 10%',
                    'Bonus affiliate +2%',
                    'VIP exclusive products',
                    'Free shipping semua order',
                    'Dedicated support',
                    'Birthday gift',
                    'Exclusive events invitation',
                ],
                orderPriority: 3,
                isActive: true,
            },
        ]);
    }
}
//# sourceMappingURL=customer_rank_seeder.js.map