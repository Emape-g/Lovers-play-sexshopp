export type Category = {
  id: string
  name: string
  slug: string
  count?: number
  parentId?: string | null
}

export type Product = {
  id: string
  name: string
  slug: string
  images: string[]
  price: number
  salePrice?: number
  rating?: number
  reviewsCount?: number
  categoryIds: string[]
  tags?: string[]
  stock?: number
  shortDesc?: string
  description?: string
  specs?: Record<string, string>
  views?: number
  featured?: boolean
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  cover: string
  excerpt: string
  content: string
  date: string
  tags?: string[]
}

export type ShippingMethod = {
  id: string
  name: string
  eta: string
  regions: string[]
  priceRules: string
  icon?: string
}

export type CartItem = {
  productId: string
  quantity: number
  selectedVariant?: string
}

export type User = {
  id: string
  email: string
  name: string
  avatar?: string
}

export type FilterState = {
  categories: string[]
  priceRange: [number, number]
  rating: number[]
  inStock: boolean
  tags: string[]
}

export type SortOption = "relevance" | "price-asc" | "price-desc" | "popularity" | "newest" | "rating"
