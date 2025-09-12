"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, User } from "lucide-react"
import { useCartStore, useAuthStore } from "@/lib/store"
import { mockProducts } from "@/lib/services/mock-data"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice } = useCartStore()
  const { user } = useAuthStore()
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const [showRegistration, setShowRegistration] = useState(false)
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

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

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault()

    if (registrationData.password !== registrationData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    if (registrationData.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres")
      return
    }

    // Mock registration - in real app would call API
    alert("Registro exitoso! Ahora puedes proceder al checkout")
    setShowRegistration(false)
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

              {!user && !showRegistration && (
                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <p className="font-medium">¿No tienes cuenta?</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Regístrate para un checkout más rápido y seguimiento de pedidos
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowRegistration(true)}>
                      Registrarse
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/auth">Iniciar Sesión</Link>
                    </Button>
                  </div>
                </div>
              )}

              {!user && showRegistration && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Crear Cuenta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegistration} className="space-y-4">
                      <div>
                        <Label htmlFor="reg-name">Nombre completo *</Label>
                        <Input
                          id="reg-name"
                          value={registrationData.name}
                          onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                          placeholder="Juan Pérez"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reg-email">Email *</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          value={registrationData.email}
                          onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                          placeholder="juan@email.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reg-phone">Teléfono *</Label>
                        <Input
                          id="reg-phone"
                          type="tel"
                          value={registrationData.phone}
                          onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                          placeholder="+54 11 1234-5678"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reg-password">Contraseña *</Label>
                        <Input
                          id="reg-password"
                          type="password"
                          value={registrationData.password}
                          onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}
                          placeholder="Mínimo 6 caracteres"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reg-confirm">Confirmar contraseña *</Label>
                        <Input
                          id="reg-confirm"
                          type="password"
                          value={registrationData.confirmPassword}
                          onChange={(e) =>
                            setRegistrationData({ ...registrationData, confirmPassword: e.target.value })
                          }
                          placeholder="Repetir contraseña"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" size="sm" className="flex-1">
                          Registrarse
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => setShowRegistration(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Checkout button */}
              <Button className="w-full bg-brand hover:bg-brand/90 mb-4" size="lg" asChild>
                <Link href="/pago">
                  Proceder al Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
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
