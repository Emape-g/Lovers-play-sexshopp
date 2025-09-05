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
import { mockProducts } from "@/lib/services/mock-data"
import { ProductGrid } from "@/components/product/product-grid"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()

  const product = mockProducts.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.categoryIds.some((cat) => product.categoryIds.includes(cat)))
    .slice(0, 4)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
    })
  }

  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  const breadcrumbItems = [{ label: "Catálogo", href: "/catalogo" }, { label: product.name }]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Product details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="aspect-square overflow-hidden rounded-xl border border-border">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail images */}
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

          {/* Product info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.featured && <Badge className="bg-brand text-brand-foreground">Destacado</Badge>}
              {discountPercentage > 0 && <Badge variant="destructive">-{discountPercentage}%</Badge>}
              {product.stock && product.stock <= 5 && <Badge variant="outline">Últimas {product.stock} unidades</Badge>}
            </div>

            {/* Title and rating */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 font-[family-name:var(--font-poppins)]">
                {product.name}
              </h1>
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
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              {product.salePrice ? (
                <>
                  <span className="text-3xl font-bold text-brand font-[family-name:var(--font-poppins)]">
                    ${product.salePrice}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">${product.price}</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)]">
                  ${product.price}
                </span>
              )}
            </div>

            {/* Short description */}
            {product.shortDesc && (
              <p className="text-lg text-muted-foreground font-[family-name:var(--font-inter)]">{product.shortDesc}</p>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Quantity and add to cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium font-[family-name:var(--font-inter)]">Cantidad:</span>
                <div className="flex items-center border border-border rounded-lg">
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
                </div>
                {product.stock && <span className="text-sm text-muted-foreground">{product.stock} disponibles</span>}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-brand hover:bg-brand/90"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.stock === 0 ? "Agotado" : "Agregar al Carrito"}
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-brand" />
                <p className="text-sm font-medium">Compra Segura</p>
              </div>
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-brand" />
                <p className="text-sm font-medium">Envío Discreto</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-brand" />
                <p className="text-sm font-medium">30 días devolución</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product details tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            <TabsTrigger value="shipping">Envío</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-card-foreground leading-relaxed font-[family-name:var(--font-inter)]">
                {product.description || "Descripción detallada del producto próximamente."}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              {product.specs ? (
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                      <dt className="font-medium text-card-foreground font-[family-name:var(--font-inter)]">{key}:</dt>
                      <dd className="text-muted-foreground font-[family-name:var(--font-inter)]">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
                  Especificaciones técnicas próximamente.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-card-foreground mb-4 font-[family-name:var(--font-poppins)]">
                Información de Envío
              </h3>
              <ul className="space-y-2 text-card-foreground font-[family-name:var(--font-inter)]">
                <li>• Envío gratuito en compras mayores a $50</li>
                <li>• Entrega en 2-5 días hábiles</li>
                <li>• Empaque discreto garantizado</li>
                <li>• Seguimiento incluido</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
                Sistema de reseñas próximamente.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6 font-[family-name:var(--font-poppins)]">
              Productos Relacionados
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
