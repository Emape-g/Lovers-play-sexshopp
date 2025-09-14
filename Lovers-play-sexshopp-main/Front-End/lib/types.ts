// 📂 Categorías del catálogo
export type Category = {
  id: string
  name: string
  slug: string
  count?: number
  parentId?: string | null
}

// 🛍️ Producto principal que se muestra en catálogo/front
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

// 📝 Posts de blog
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

// 🚚 Métodos de envío
export type ShippingMethod = {
  id: string
  name: string
  eta: string
  regions: string[]
  priceRules: string
  icon?: string
}

// 🛒 Item dentro del carrito
export interface CartItem {
  productId: string
  name: string
  price: number
  salePrice?: number
  image: string
  quantity: number
}

// 👤 Usuario autenticado
export type User = {
  id: string
  email: string
  name: string
  avatar?: string
}

// 🔎 Estado de filtros para catálogo
export type FilterState = {
  categories: string[]
  priceRange: [number, number]
  rating: number[]
  inStock: boolean
  tags: string[]
}

// 📦 Producto proveniente del backend (mapeo API → front)
export type BackendProduct = {
  id: number
  nombre: string
  precio: number
  stock: number
  url_imagen_principal: string
  valoracion_promedio?: number
  vistas?: number
  descripcion?: string
}

// 🔽 Opciones de ordenamiento
export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "popularity"
  | "newest"
  | "rating"

