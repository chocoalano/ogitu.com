import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customer_ranks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.string('slug', 50).notNullable().unique()
      table.string('icon', 100).nullable() // Icon class or emoji
      table.string('color', 50).nullable() // Color for badge
      table.integer('min_orders').defaultTo(0).notNullable()
      table.integer('min_spent').defaultTo(0).notNullable() // Minimum total spent
      table.decimal('cashback_rate', 5, 2).defaultTo(0).notNullable() // Cashback percentage
      table.decimal('affiliate_bonus_rate', 5, 2).defaultTo(0).notNullable() // Extra affiliate commission
      table.json('benefits').nullable() // Array of benefit strings
      table.integer('order_priority').defaultTo(0).notNullable()
      table.boolean('is_active').defaultTo(true).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    // Insert default ranks
    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          name: 'Bronze Vaper',
          slug: 'bronze',
          icon: '🥉',
          color: 'amber',
          min_orders: 0,
          min_spent: 0,
          cashback_rate: 0,
          affiliate_bonus_rate: 0,
          benefits: JSON.stringify(['Akses promo reguler', 'Support 24/7']),
          order_priority: 1,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Silver Vaper',
          slug: 'silver',
          icon: '🥈',
          color: 'gray',
          min_orders: 5,
          min_spent: 500000,
          cashback_rate: 1,
          affiliate_bonus_rate: 0.5,
          benefits: JSON.stringify([
            'Cashback 1%',
            'Bonus affiliate +0.5%',
            'Early access promo',
            'Priority support',
          ]),
          order_priority: 2,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Gold Vaper',
          slug: 'gold',
          icon: '🥇',
          color: 'yellow',
          min_orders: 15,
          min_spent: 2000000,
          cashback_rate: 2,
          affiliate_bonus_rate: 1,
          benefits: JSON.stringify([
            'Cashback 2%',
            'Bonus affiliate +1%',
            'Exclusive deals',
            'Free shipping (min. Rp200k)',
            'Priority support',
          ]),
          order_priority: 3,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Platinum Vaper',
          slug: 'platinum',
          icon: '💎',
          color: 'cyan',
          min_orders: 30,
          min_spent: 5000000,
          cashback_rate: 3,
          affiliate_bonus_rate: 1.5,
          benefits: JSON.stringify([
            'Cashback 3%',
            'Bonus affiliate +1.5%',
            'VIP exclusive products',
            'Free shipping semua order',
            'Dedicated support',
            'Birthday gift',
          ]),
          order_priority: 4,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Diamond Vaper',
          slug: 'diamond',
          icon: '👑',
          color: 'violet',
          min_orders: 50,
          min_spent: 10000000,
          cashback_rate: 5,
          affiliate_bonus_rate: 2,
          benefits: JSON.stringify([
            'Cashback 5%',
            'Bonus affiliate +2%',
            'Diamond exclusive products',
            'Free express shipping',
            'Personal account manager',
            'Exclusive events invitation',
            'Special birthday rewards',
          ]),
          order_priority: 5,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
