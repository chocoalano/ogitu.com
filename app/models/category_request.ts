import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import User from './user.js'

export default class CategoryRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column()
  declare parentId: number | null

  @column()
  declare status: 'pending' | 'approved' | 'rejected'

  @column()
  declare rejectionReason: string | null

  @column()
  declare approvedCategoryId: number | null

  @column()
  declare reviewedBy: number | null

  @column.dateTime()
  declare reviewedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Category, {
    foreignKey: 'parentId',
  })
  declare parentCategory: BelongsTo<typeof Category>

  @belongsTo(() => Category, {
    foreignKey: 'approvedCategoryId',
  })
  declare approvedCategory: BelongsTo<typeof Category>

  @belongsTo(() => User, {
    foreignKey: 'reviewedBy',
  })
  declare reviewer: BelongsTo<typeof User>
}
