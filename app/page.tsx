import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/layout/hero"
import { ShippingMethods } from "@/components/shipping/shipping-methods"
import { ProductGrid } from "@/components/product/product-grid"
import { BlogList } from "@/components/blog/blog-list"
import { Button } from "@/components/ui/button"
import { mockProducts, mockBlogPosts } from "@/lib/services/mock-data"
import Link from "next/link"

export const metadata: Metadata = {
  title: "LoversPlay - Tienda de Bienestar Íntimo",
  description:
    "Descubre nuestra colección de productos de bienestar íntimo de alta calidad. Envío discreto y atención personalizada.",
}

export default function HomePage() {
  const featuredProducts = mockProducts.filter((product) => product.featured)
  const popularProducts = mockProducts.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4)
  const latestBlogPosts = mockBlogPosts.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Hero />

        {/* Why choose us section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-[family-name:var(--font-poppins)]">
              ¿Por qué elegirnos?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2 font-[family-name:var(--font-poppins)]">
                  Envío Discreto
                </h3>
                <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
                  Todos nuestros productos se envían en empaques completamente discretos
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2 font-[family-name:var(--font-poppins)]">
                  Calidad Premium
                </h3>
                <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
                  Productos de las mejores marcas con materiales seguros y certificados
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2 font-[family-name:var(--font-poppins)]">
                  Asesoría Experta
                </h3>
                <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
                  Nuestro equipo te ayuda a encontrar el producto perfecto para ti
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-poppins)]">
                Productos Destacados
              </h2>
              <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
                Nuestra selección de productos más populares
              </p>
            </div>
            <ProductGrid products={featuredProducts} className="mb-8" />
            <div className="text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/catalogo">Ver Todos los Productos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Popular products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-poppins)]">
                Más Vistos
              </h2>
              <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
                Los productos que más interesan a nuestros clientes
              </p>
            </div>
            <ProductGrid products={popularProducts} />
          </div>
        </section>

        {/* Shipping methods */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <ShippingMethods />
          </div>
        </section>

        {/* Latest blog posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-poppins)]">
                Últimos Artículos
              </h2>
              <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
                Consejos y guías sobre bienestar íntimo
              </p>
            </div>
            <BlogList posts={latestBlogPosts} className="mb-8" />
            <div className="text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">Ver Todos los Artículos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="py-16 bg-card border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-4 font-[family-name:var(--font-poppins)]">
                Compra con Confianza
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-semibold text-card-foreground mb-1 font-[family-name:var(--font-poppins)]">
                  Pago Seguro
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">SSL y encriptación</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📦</div>
                <h3 className="font-semibold text-card-foreground mb-1 font-[family-name:var(--font-poppins)]">
                  Envío Gratis
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">En compras +$50</p>
              </div>
              <div>
                <div className="text-3xl mb-2">↩️</div>
                <h3 className="font-semibold text-card-foreground mb-1 font-[family-name:var(--font-poppins)]">
                  30 Días
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                  Garantía devolución
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold text-card-foreground mb-1 font-[family-name:var(--font-poppins)]">
                  Soporte 24/7
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">Atención experta</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
