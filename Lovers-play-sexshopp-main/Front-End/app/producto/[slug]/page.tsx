"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Shield, Truck, RotateCcw } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { ProductGrid } from "@/components/product/product-grid"
import type { Product } from "@/lib/types"
import { fetchProducto } from "@/lib/services/api"

// ✅ props de la página
interface ProductPageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 🔥 Traer el producto desde el backend ya mapeado a `Product`
  const product: Product | null = await fetchProducto(Number(params.id))

  if (!product) {
    notFound()
  }

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()

  // 🔥 Breadcrumb corregido → usa `product.name`
  const breadcrumbItems = [
    { label: "Catálogo", href: "/catalogo" },
    { label: product.name }
  ]

  // 🔥 Agregar al carrito → usa `productId` porque CartItem espera eso
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
    })
  }

  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  // 🔥 Productos relacionados (ejemplo usando mismo tipo `Product`)
  const relatedProducts: Product[] = [] // luego podés traerlos del backend

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Imagen principal */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl border border-border">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                      selectedImage === index ? "border-brand" : "border-border"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info del producto */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.featured && <Badge className="bg-brand text-brand-foreground">Destacado</Badge>}
              {discountPercentage > 0 && <Badge variant="destructive">-{discountPercentage}%</Badge>}
              {product.stock && product.stock <= 5 && <Badge variant="outline">Últimas {product.stock} unidades</Badge>}
            </div>

            {/* Título y rating */}
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewsCount || 0} reseñas)
                </span>
              </div>
            )}

            {/* Precio */}
            <div className="flex items-center gap-4">
              {product.salePrice ? (
                <>
                  <span className="text-3xl font-bold text-brand">${product.salePrice}</span>
                  <span className="text-xl text-muted-foreground line-through">${product.price}</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
              )}
            </div>

            {/* Descripción */}
            {product.shortDesc && <p className="text-lg text-muted-foreground">{product.shortDesc}</p>}

            {/* Cantidad + botón carrito */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                disabled={product.stock ? quantity >= product.stock : false}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-brand hover:bg-brand/90"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock === 0 ? "Agotado" : "Agregar al Carrito"}
              </Button>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Productos Relacionados</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}


