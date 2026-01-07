import Category from '#models/category'

export interface CategoryListDTO {
  id: number
  name: string
  slug: string
  description: string | null
  image: string | null
  icon: string
  href: string
  color: string
}

export interface CategoryNavDTO {
  label: string
  to: string
  icon: string
}

const CATEGORY_ICONS: Record<string, string> = {
  'pod-system': 'i-lucide-cpu',
  'mod-kit': 'i-lucide-zap',
  'liquid-premium': 'i-lucide-flask-conical',
  'salt-nicotine': 'i-lucide-droplets',
  'atomizer-coil': 'i-lucide-circle-dot',
  'accessories': 'i-lucide-package',
  'disposable': 'i-lucide-battery',
}

const CATEGORY_NAV_ICONS: Record<string, string> = {
  'pod-system': 'i-heroicons-device-phone-mobile',
  'mod-kit': 'i-heroicons-cpu-chip',
  'liquid-premium': 'i-heroicons-beaker',
  'salt-nicotine': 'i-heroicons-sparkles',
  'atomizer-coil': 'i-heroicons-cog-6-tooth',
  'accessories': 'i-heroicons-puzzle-piece',
  'disposable': 'i-heroicons-battery-50',
}

const CATEGORY_COLORS: Record<string, string> = {
  'pod-system': 'purple',
  'mod-kit': 'pink',
  'liquid-premium': 'blue',
  'salt-nicotine': 'cyan',
  'atomizer-coil': 'violet',
  'accessories': 'fuchsia',
  'disposable': 'orange',
}

export default class CategoryTransformer {
  /**
   * Transform category to list DTO
   */
  static toListDTO(category: Category): CategoryListDTO {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      icon: CATEGORY_ICONS[category.slug] || 'i-lucide-box',
      href: `/collections/${category.slug}`,
      color: CATEGORY_COLORS[category.slug] || 'primary',
    }
  }

  /**
   * Transform categories to list DTOs
   */
  static toListDTOs(categories: Category[]): CategoryListDTO[] {
    return categories.map((category) => this.toListDTO(category))
  }

  /**
   * Transform category to navigation DTO
   */
  static toNavDTO(category: Category): CategoryNavDTO {
    return {
      label: category.name,
      to: `/collections/${category.slug}`,
      icon: CATEGORY_NAV_ICONS[category.slug] || 'i-heroicons-cube',
    }
  }

  /**
   * Transform categories to navigation DTOs
   */
  static toNavDTOs(categories: Category[]): CategoryNavDTO[] {
    return categories.map((category) => this.toNavDTO(category))
  }
}
