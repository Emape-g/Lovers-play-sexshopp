"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut, Edit } from "lucide-react"
import { useAuthStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    address: "123 Calle Principal, Ciudad, País",
  })

  if (!isAuthenticated || !user) {
    router.push("/auth")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSaveProfile = () => {
    // Mock save functionality
    setIsEditing(false)
    alert("Perfil actualizado correctamente")
  }

  // Mock order data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Entregado",
      total: 89.99,
      items: 2,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "En tránsito",
      total: 34.99,
      items: 1,
    },
  ]

  // Mock wishlist data
  const wishlist = [
    {
      id: "1",
      name: "Vibrador de Lujo Rosa",
      price: 69.99,
      image: "/elegant-pink-luxury-vibrator.jpg",
    },
    {
      id: "2",
      name: "Lubricante Premium Natural",
      price: 24.99,
      image: "/premium-natural-lubricant-bottle-elegant.jpg",
    },
  ]

  const breadcrumbItems = [{ label: "Mi Perfil" }]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <div className="max-w-4xl mx-auto">
          {/* Profile header */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-brand-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-card-foreground font-[family-name:var(--font-poppins)]">
                  {user.name}
                </h1>
                <p className="text-muted-foreground font-[family-name:var(--font-inter)]">{user.email}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="wishlist">Favoritos</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-[family-name:var(--font-poppins)]">Información Personal</CardTitle>
                      <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? "Cancelar" : "Editar"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4">
                      <Button onClick={handleSaveProfile} className="bg-brand hover:bg-brand/90">
                        Guardar Cambios
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancelar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-poppins)]">Historial de Pedidos</CardTitle>
                  <CardDescription>Revisa el estado de tus pedidos anteriores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-4">
                            <Package className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-semibold text-card-foreground font-[family-name:var(--font-poppins)]">
                                Pedido {order.id}
                              </p>
                              <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                                {new Date(order.date).toLocaleDateString("es-ES")} • {order.items} producto
                                {order.items !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={order.status === "Entregado" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                            <p className="text-lg font-bold text-card-foreground mt-1 font-[family-name:var(--font-poppins)]">
                              ${order.total}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                          {order.status === "Entregado" && (
                            <Button variant="outline" size="sm">
                              Reordenar
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-poppins)]">Lista de Favoritos</CardTitle>
                  <CardDescription>Productos que has guardado para más tarde</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border border-border rounded-lg p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-card-foreground mb-1 font-[family-name:var(--font-poppins)]">
                              {item.name}
                            </h3>
                            <p className="text-lg font-bold text-brand font-[family-name:var(--font-poppins)]">
                              ${item.price}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" className="bg-brand hover:bg-brand/90">
                                Agregar al Carrito
                              </Button>
                              <Button variant="outline" size="sm">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-poppins)]">Configuración de Cuenta</CardTitle>
                  <CardDescription>Gestiona tus preferencias y configuración de privacidad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-4 font-[family-name:var(--font-poppins)]">
                      Notificaciones
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-inter)]">Ofertas y promociones</span>
                        <Button variant="outline" size="sm">
                          Activado
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-inter)]">Actualizaciones de pedidos</span>
                        <Button variant="outline" size="sm">
                          Activado
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-inter)]">Newsletter del blog</span>
                        <Button variant="outline" size="sm">
                          Desactivado
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold text-card-foreground mb-4 font-[family-name:var(--font-poppins)]">
                      Privacidad
                    </h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Settings className="h-4 w-4 mr-2" />
                        Descargar mis datos
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Settings className="h-4 w-4 mr-2" />
                        Eliminar mi cuenta
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
