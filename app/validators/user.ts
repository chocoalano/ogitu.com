import vine from '@vinejs/vine'

/**
 * Validator for creating a new user
 */
export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
    email: vine.string().trim().email().normalizeEmail(),
    password: vine.string().minLength(8).maxLength(100),
    role: vine.enum(['admin', 'superadmin']),
  })
)

/**
 * Validator for updating an existing user
 */
export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100).optional(),
    email: vine.string().trim().email().normalizeEmail().optional(),
    password: vine.string().minLength(8).maxLength(100).optional(),
    role: vine.enum(['admin', 'superadmin']).optional(),
  })
)
