"use client"

import type React from "react"

import Link from "next/link"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/store"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const { addItem } = useCartStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      quantity: 1,
    })
  }

  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  return (
    <div
      className={`group relative bg-card rounded-xl border border-border shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden ${className}`}
    >
      <Link href={`/producto/${product.slug}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && <Badge className="bg-brand text-brand-foreground">Destacado</Badge>}
            {discountPercentage > 0 && <Badge variant="destructive">-{discountPercentage}%</Badge>}
            {product.stock && product.stock <= 5 && (
              <Badge variant="outline" className="bg-background/80">
                Últimas {product.stock}
              </Badge>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button size="sm" variant="ghost" className="bg-background/80 hover:bg-background/90 h-8 w-8 p-0">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Agregar a favoritos</span>
            </Button>
            <Button size="sm" variant="ghost" className="bg-background/80 hover:bg-background/90 h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
              <span className="sr-only">Vista rápida</span>
            </Button>
          </div>

          {/* Out of stock overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Agotado
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviewsCount || 0})</span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2 font-[family-name:var(--font-poppins)]">
            {product.name}
          </h3>

          {/* Description */}
          {product.shortDesc && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 font-[family-name:var(--font-inter)]">
              {product.shortDesc}
            </p>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-bold text-brand font-[family-name:var(--font-poppins)]">
                    ${product.salePrice}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-card-foreground font-[family-name:var(--font-poppins)]">
                  ${product.price}
                </span>
              )}
            </div>
          </div>

          {/* Add to cart button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-brand hover:bg-brand/90"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock === 0 ? "Agotado" : "Agregar al Carrito"}
          </Button>
        </div>
      </Link>
    </div>
  )
}
