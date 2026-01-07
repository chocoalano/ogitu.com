// Types for Home Page Components

export interface Category {
  name: string
  icon: string
  count: string
  href: string
  color?: string
}

export interface Product {
  id: number
  name: string
  price: string
  image: string
  rating: number
  sold: number
}

export interface FlashSaleProduct extends Product {
  originalPrice: string
  discount: string
}

export interface FeaturedProduct extends Product {
  badge: string
}

export interface Benefit {
  icon: string
  title: string
  description: string
}

export interface PromoItem {
  icon: string
  emoji: string
  title: string
  subtitle: string
  gradient: string
}

export interface Stat {
  value: string
  label: string
  gradient: string
}

export interface Countdown {
  hours: number
  minutes: number
  seconds: number
}
