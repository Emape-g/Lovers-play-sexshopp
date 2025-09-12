"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Smartphone, ArrowLeft, CheckCircle, MapPin, Store, MessageCircle } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { mockProducts } from "@/lib/services/mock-data"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()
  const { items, clearCart, getTotalItems, getTotalPrice } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [paymentMethod] = useState("mercado-pago")

  const [shippingMethod, setShippingMethod] = useState("delivery")
  const [shippingCost, setShippingCost] = useState(0)

  // Form states
  const [billingData, setBillingData] = useState({
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })

  const cartItems = items
    .map((item) => {
      const product = mockProducts.find((p) => p.id === item.productId)
      return { ...item, product }
    })
    .filter((item) => item.product)

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product!.salePrice || item.product!.price
    return total + price * item.quantity
  }, 0)

  const shipping = shippingMethod === "pickup" || shippingMethod === "arrange" ? 0 : shippingCost
  const total = subtotal + shipping

  const breadcrumbItems = [{ label: "Carrito", href: "/carrito" }, { label: "Pago" }]

  const calculateShipping = () => {
    if (!billingData.city || !billingData.postalCode) {
      alert("Por favor completa la dirección para calcular el envío")
      return
    }

    // Mock shipping calculation based on city
    const shippingRates: Record<string, number> = {
      "buenos aires": 15.99,
      córdoba: 25.99,
      rosario: 20.99,
      mendoza: 35.99,
      default: 18.99,
    }

    const city = billingData.city.toLowerCase()
    const cost = shippingRates[city] || shippingRates.default
    setShippingCost(cost)
    alert(`Costo de envío calculado: $${cost.toFixed(2)}`)
  }

  const handleProcessPayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setOrderComplete(true)
    setIsProcessing(false)

    // Clear cart after successful payment
    setTimeout(() => {
      clearCart()
      router.push("/")
    }, 3000)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <CheckCircle className="h-24 w-24 mx-auto mb-6 text-green-500" />
            <h1 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-space-grotesk)]">
              ¡Pago Exitoso!
            </h1>
            <p className="text-muted-foreground mb-8 font-[family-name:var(--font-dm-sans)]">
              Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación en breve.
            </p>
            <p className="text-sm text-muted-foreground">Redirigiendo al inicio en 3 segundos...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold text-foreground mb-4">No hay productos en el carrito</h1>
            <Button asChild>
              <Link href="/catalogo">Ir al Catálogo</Link>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/carrito">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al carrito
                </Link>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={billingData.email}
                      onChange={(e) => setBillingData({ ...billingData, email: e.target.value })}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={billingData.phone}
                      onChange={(e) => setBillingData({ ...billingData, phone: e.target.value })}
                      placeholder="+54 11 1234-5678"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Método de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer">
                      <MapPin className="h-5 w-5" />
                      Envío a domicilio
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer">
                      <Store className="h-5 w-5" />
                      Retiro en local
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="arrange" id="arrange" />
                    <Label htmlFor="arrange" className="flex items-center gap-2 cursor-pointer">
                      <MessageCircle className="h-5 w-5" />
                      Arreglar con el vendedor
                    </Label>
                  </div>
                </RadioGroup>

                {shippingMethod === "delivery" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="address">Dirección *</Label>
                      <Input
                        id="address"
                        value={billingData.address}
                        onChange={(e) => setBillingData({ ...billingData, address: e.target.value })}
                        placeholder="Calle Principal 123"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ciudad *</Label>
                        <Input
                          id="city"
                          value={billingData.city}
                          onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
                          placeholder="Ciudad"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Código Postal *</Label>
                        <Input
                          id="postalCode"
                          value={billingData.postalCode}
                          onChange={(e) => setBillingData({ ...billingData, postalCode: e.target.value })}
                          placeholder="1234"
                          required
                        />
                      </div>
                    </div>
                    <Button variant="outline" onClick={calculateShipping} className="w-full bg-transparent">
                      Calcular Costo de Envío
                    </Button>
                    {shippingCost > 0 && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">Costo de envío: ${shippingCost.toFixed(2)}</p>
                      </div>
                    )}
                  </div>
                )}

                {shippingMethod === "pickup" && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">Dirección del local:</p>
                    <p className="text-sm text-muted-foreground">
                      Av. Corrientes 1234, CABA
                      <br />
                      Horarios: Lun-Vie 10:00-19:00, Sáb 10:00-14:00
                      <br />
                      Tel: +54 11 1234-5678
                    </p>
                  </div>
                )}

                {shippingMethod === "arrange" && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Te contactaremos por WhatsApp para coordinar la entrega según tu ubicación y preferencias.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Método de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 p-4 border rounded-lg bg-muted">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Mercado Pago</p>
                    <p className="text-sm text-muted-foreground">
                      Pago seguro con tarjetas, efectivo o saldo en cuenta
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-dm-sans)]">
                    Serás redirigido a Mercado Pago para completar tu pago de forma segura.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Products */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={`${item.productId}-${item.selectedVariant || "default"}`} className="flex gap-3">
                      <img
                        src={item.product!.images[0] || "/placeholder.svg"}
                        alt={item.product!.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.product!.name}</p>
                        <p className="text-xs text-muted-foreground">Cantidad: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium">
                        ${((item.product!.salePrice || item.product!.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                      {shippingMethod === "pickup"
                        ? "Retiro en local"
                        : shippingMethod === "arrange"
                          ? "Entrega coordinada"
                          : "Envío"}
                    </span>
                    <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-brand hover:bg-brand/90"
                  size="lg"
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Procesando..." : `Pagar con Mercado Pago $${total.toFixed(2)}`}
                </Button>

                {/* Trust badges */}
                <div className="pt-4 border-t border-border">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
