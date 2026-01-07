import vine from '@vinejs/vine'

/**
 * Validator for creating a new customer
 */
export const createCustomerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
    email: vine.string().trim().email().normalizeEmail(),
    password: vine.string().minLength(8).maxLength(100),
    phone: vine
      .string()
      .trim()
      .regex(/^[0-9+\-\s()]+$/)
      .minLength(10)
      .maxLength(20)
      .optional(),
    gender: vine.enum(['male', 'female']).optional(),
    isActive: vine.boolean().optional(),
    isVerified: vine.boolean().optional(),
  })
)

/**
 * Validator for updating an existing customer
 */
export const updateCustomerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100).optional(),
    email: vine.string().trim().email().normalizeEmail().optional(),
    password: vine.string().minLength(8).maxLength(100).optional(),
    phone: vine
      .string()
      .trim()
      .regex(/^[0-9+\-\s()]+$/)
      .minLength(10)
      .maxLength(20)
      .optional(),
    gender: vine.enum(['male', 'female']).optional(),
    isActive: vine.boolean().optional(),
    isVerified: vine.boolean().optional(),
  })
)
