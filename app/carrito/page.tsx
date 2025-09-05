"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { mockProducts } from "@/lib/services/mock-data"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice } = useCartStore()
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const cartItems = items
    .map((item) => {
      const product = mockProducts.find((p) => p.id === item.productId)
      return {
        ...item,
        product,
      }
    })
    .filter((item) => item.product)

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product!.salePrice || item.product!.price
    return total + price * item.quantity
  }, 0)

  const shipping = subtotal >= 50 ? 0 : 8.99
  const discount = appliedPromo === "WELCOME10" ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  const handleApplyPromo = () => {
    if (promoCode === "WELCOME10") {
      setAppliedPromo(promoCode)
    } else {
      alert("Código promocional inválido")
    }
  }

  const breadcrumbItems = [{ label: "Carrito de Compras" }]

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="max-w-2xl mx-auto text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-poppins)]">
              Tu carrito está vacío
            </h1>
            <p className="text-muted-foreground mb-8 font-[family-name:var(--font-inter)]">
              Parece que aún no has agregado ningún producto a tu carrito
            </p>
            <Button size="lg" className="bg-brand hover:bg-brand/90" asChild>
              <Link href="/catalogo">Explorar Productos</Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-poppins)]">
                Carrito de Compras ({getTotalItems()} {getTotalItems() === 1 ? "producto" : "productos"})
              </h1>
              <Button variant="outline" size="sm" onClick={clearCart}>
                <Trash2 className="h-4 w-4 mr-2" />
                Vaciar carrito
              </Button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedVariant || "default"}`}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <div className="flex gap-4">
                    {/* Product image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product!.images[0] || "/placeholder.svg"}
                        alt={item.product!.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-card-foreground font-[family-name:var(--font-poppins)]">
                            <Link
                              href={`/producto/${item.product!.slug}`}
                              className="hover:text-brand transition-colors"
                            >
                              {item.product!.name}
                            </Link>
                          </h3>
                          {item.selectedVariant && (
                            <p className="text-sm text-muted-foreground">Variante: {item.selectedVariant}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.productId)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-2 font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-bold text-lg text-card-foreground font-[family-name:var(--font-poppins)]">
                            ${((item.product!.salePrice || item.product!.price) * item.quantity).toFixed(2)}
                          </div>
                          {item.product!.salePrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ${(item.product!.price * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-card-foreground mb-6 font-[family-name:var(--font-poppins)]">
                Resumen del Pedido
              </h2>

              {/* Promo code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Código promocional"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" onClick={handleApplyPromo}>
                    Aplicar
                  </Button>
                </div>
                {appliedPromo && (
                  <p className="text-sm text-green-600 mt-2">Código "{appliedPromo}" aplicado correctamente</p>
                )}
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-card-foreground">
                  <span className="font-[family-name:var(--font-inter)]">Subtotal</span>
                  <span className="font-[family-name:var(--font-poppins)]">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-card-foreground">
                  <span className="font-[family-name:var(--font-inter)]">Envío</span>
                  <span className="font-[family-name:var(--font-poppins)]">
                    {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="font-[family-name:var(--font-inter)]">Descuento</span>
                    <span className="font-[family-name:var(--font-poppins)]">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold text-card-foreground">
                  <span className="font-[family-name:var(--font-poppins)]">Total</span>
                  <span className="font-[family-name:var(--font-poppins)]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping info */}
              {subtotal < 50 && (
                <div className="bg-muted rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                    Agrega ${(50 - subtotal).toFixed(2)} más para obtener envío gratuito
                  </p>
                </div>
              )}

              {/* Checkout button */}
              <Button className="w-full bg-brand hover:bg-brand/90 mb-4" size="lg">
                Proceder al Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/catalogo">Continuar Comprando</Link>
              </Button>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl mb-1">🔒</div>
                    <p className="text-xs text-muted-foreground">Pago Seguro</p>
                  </div>
                  <div>
                    <div className="text-xl mb-1">📦</div>
                    <p className="text-xs text-muted-foreground">Envío Discreto</p>
                  </div>
                  <div>
                    <div className="text-xl mb-1">↩️</div>
                    <p className="text-xs text-muted-foreground">30 días devolución</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
