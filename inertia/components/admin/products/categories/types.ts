// Types for Category Management
export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  image: string | null
  isActive: boolean
  sortOrder: number
  parentId: number | null
  children: Category[]
}

export interface ParentCategory {
  id: number
  name: string
}

export interface CategoryStats {
  totalCategories: number
  mainCategories: number
  subCategories: number
  activeCategories: number
}

export interface CategoryFormData {
  name: string
  description: string
  parentId: number | null
  isActive: boolean
  image: File | null
}
