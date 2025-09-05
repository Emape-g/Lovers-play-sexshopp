import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, Shield, Clock } from "lucide-react"
import { mockShippingMethods } from "@/lib/services/mock-data"

export default function ShippingPage() {
  const breadcrumbItems = [{ label: "Información de Envíos" }]

  const shippingZones = [
    {
      zone: "Zona Metropolitana",
      cities: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla"],
      standardTime: "1-2 días",
      expressTime: "Mismo día",
      cost: "Desde $8.99",
    },
    {
      zone: "Zona Nacional",
      cities: ["Resto del país"],
      standardTime: "3-5 días",
      expressTime: "2-3 días",
      cost: "Desde $12.99",
    },
    {
      zone: "Zona Remota",
      cities: ["Áreas rurales y remotas"],
      standardTime: "5-7 días",
      expressTime: "3-5 días",
      cost: "Desde $18.99",
    },
  ]

  const faqItems = [
    {
      question: "¿Cómo garantizan la discreción en el envío?",
      answer:
        "Todos nuestros productos se envían en cajas neutras sin ningún logo o referencia al contenido. El remitente aparece como 'LP Commerce' y no hay indicación externa del tipo de productos que contiene el paquete.",
    },
    {
      question: "¿Puedo rastrear mi pedido?",
      answer:
        "Sí, una vez que tu pedido sea enviado, recibirás un número de seguimiento por email. Podrás rastrear tu paquete en tiempo real a través de nuestra página web o directamente en el sitio de la paquetería.",
    },
    {
      question: "¿Qué pasa si no estoy en casa cuando llega el paquete?",
      answer:
        "Si no estás disponible, la paquetería dejará un aviso de entrega. Podrás reprogramar la entrega o recoger el paquete en la sucursal más cercana. También ofrecemos entrega en puntos de recogida para mayor conveniencia.",
    },
    {
      question: "¿Hay envío gratuito?",
      answer:
        "Sí, ofrecemos envío gratuito en pedidos superiores a $50. Para pedidos menores, aplicamos una tarifa de envío que varía según la zona de entrega.",
    },
    {
      question: "¿Entregan en fines de semana?",
      answer:
        "Las entregas estándar se realizan de lunes a viernes. Sin embargo, con nuestro servicio express, también realizamos entregas los sábados en zonas metropolitanas.",
    },
    {
      question: "¿Qué medidas de seguridad toman durante el envío?",
      answer:
        "Todos los productos están asegurados durante el transporte. Utilizamos empaques resistentes y seguros. En caso de daño o pérdida, reemplazamos el producto sin costo adicional.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-poppins)]">
            Información de Envíos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
            Envío discreto, seguro y confiable. Tu privacidad es nuestra prioridad.
          </p>
        </div>

        {/* Shipping methods */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center font-[family-name:var(--font-poppins)]">
            Métodos de Envío
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockShippingMethods.map((method) => (
              <Card key={method.id} className="relative overflow-hidden">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <CardTitle className="font-[family-name:var(--font-poppins)]">{method.name}</CardTitle>
                  <CardDescription>{method.eta}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <Badge variant="outline" className="mb-2">
                      {method.regions.join(", ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                    {method.priceRules}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Shipping zones table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center font-[family-name:var(--font-poppins)]">
            Zonas de Entrega
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-semibold text-card-foreground font-[family-name:var(--font-poppins)]">
                        Zona
                      </th>
                      <th className="text-left p-4 font-semibold text-card-foreground font-[family-name:var(--font-poppins)]">
                        Ciudades
                      </th>
                      <th className="text-left p-4 font-semibold text-card-foreground font-[family-name:var(--font-poppins)]">
                        Envío Estándar
                      </th>
                      <th className="text-left p-4 font-semibold text-card-foreground font-[family-name:var(--font-poppins)]">
                        Envío Express
                      </th>
                      <th className="text-left p-4 font-semibold text-card-foreground font-[family-name:var(--font-poppins)]">
                        Costo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingZones.map((zone, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="p-4 font-medium text-card-foreground font-[family-name:var(--font-inter)]">
                          {zone.zone}
                        </td>
                        <td className="p-4 text-muted-foreground font-[family-name:var(--font-inter)]">
                          {zone.cities.join(", ")}
                        </td>
                        <td className="p-4 text-card-foreground font-[family-name:var(--font-inter)]">
                          {zone.standardTime}
                        </td>
                        <td className="p-4 text-card-foreground font-[family-name:var(--font-inter)]">
                          {zone.expressTime}
                        </td>
                        <td className="p-4 font-semibold text-brand font-[family-name:var(--font-poppins)]">
                          {zone.cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center font-[family-name:var(--font-poppins)]">
            ¿Por qué elegir nuestro servicio de envío?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 mx-auto mb-4 text-brand" />
                <h3 className="font-semibold text-card-foreground mb-2 font-[family-name:var(--font-poppins)]">
                  100% Discreto
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                  Empaque neutro sin referencias al contenido
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Package className="h-12 w-12 mx-auto mb-4 text-brand" />
                <h3 className="font-semibold text-card-foreground mb-2 font-[family-name:var(--font-poppins)]">
                  Empaque Seguro
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                  Protección completa durante el transporte
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 mx-auto mb-4 text-brand" />
                <h3 className="font-semibold text-card-foreground mb-2 font-[family-name:var(--font-poppins)]">
                  Entrega Rápida
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                  Tiempos de entrega garantizados
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Truck className="h-12 w-12 mx-auto mb-4 text-brand" />
                <h3 className="font-semibold text-card-foreground mb-2 font-[family-name:var(--font-poppins)]">
                  Seguimiento
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                  Rastrea tu pedido en tiempo real
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center font-[family-name:var(--font-poppins)]">
            Preguntas Frecuentes sobre Envíos
          </h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-[family-name:var(--font-poppins)]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-[family-name:var(--font-inter)]">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
