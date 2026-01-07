import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasOne, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import type { HasOne, HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Address from './address.js'
import Order from './order.js'
import Review from './review.js'
import CartItem from './cart_item.js'
import Wishlist from './wishlist.js'
import Wallet from './wallet.js'
import Affiliate from './affiliate.js'
import CustomerRank from './customer_rank.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class Customer extends compose(BaseModel, AuthFinder) {
  static rememberMeTokens = DbRememberMeTokensProvider.forModel(Customer)

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare phone: string | null

  @column.date()
  declare birthDate: DateTime | null

  @column()
  declare gender: 'male' | 'female' | null

  @column()
  declare avatar: string | null

  @column()
  declare isActive: boolean

  @column()
  declare isVerified: boolean

  @column()
  declare rankId: number | null

  @column()
  declare referredByCode: string | null

  @column()
  declare totalOrdersCount: number

  @column()
  declare totalSpent: number

  @column({ serializeAs: null })
  declare verificationToken: string | null

  @column.dateTime()
  declare emailVerifiedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Address)
  declare addresses: HasMany<typeof Address>

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review>

  @hasMany(() => CartItem)
  declare cartItems: HasMany<typeof CartItem>

  @hasMany(() => Wishlist)
  declare wishlists: HasMany<typeof Wishlist>

  @hasOne(() => Wallet)
  declare wallet: HasOne<typeof Wallet>

  @hasOne(() => Affiliate)
  declare affiliate: HasOne<typeof Affiliate>

  @belongsTo(() => CustomerRank, { foreignKey: 'rankId' })
  declare rank: BelongsTo<typeof CustomerRank>
}
