import type { BackendProduct, Product } from "@/lib/types"

const API_URL = "http://127.0.0.1:5000/api"

// 🔹 Mapea el JSON del backend al tipo del frontend
export function mapBackendToProduct(p: BackendProduct): Product {
  return {
    id: String(p.id),
    name: p.nombre,
    slug: String(p.id), // usamos el id como slug por ahora
    images: [p.url_imagen_principal],
    price: p.precio,
    stock: p.stock,
    rating: p.valoracion_promedio,
    description: p.descripcion,
    shortDesc: p.descripcion?.slice(0, 60) || "",
    categoryIds: [], // sin categorías por ahora
    tags: [],
    featured: false,
    reviewsCount: 0,
    views: p.vistas || 0,
  }
}

// 🔹 Productos por categoría
export async function fetchProductosPorCategoria(categoriaId: number): Promise<Product[]> {
  const res = await fetch(`${API_URL}/productos/por_categoria/${categoriaId}`)
  if (!res.ok) throw new Error("Error cargando productos")
  const data = await res.json()
  return data.productos.map(mapBackendToProduct)
}

// 🔹 Producto por ID
export async function fetchProducto(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/productos/${id}`)
  if (!res.ok) throw new Error("Error cargando producto")
  const data = await res.json()
  return mapBackendToProduct(data)
}
