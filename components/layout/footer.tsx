import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const quickLinks = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contacto" },
  ]

  const categories = [
    { name: "Juguetes para Parejas", href: "/catalogo/juguetes-parejas" },
    { name: "Juguetes Femeninos", href: "/catalogo/juguetes-femeninos" },
    { name: "Lubricantes", href: "/catalogo/lubricantes" },
    { name: "Lencería", href: "/catalogo/lenceria" },
  ]

  const support = [
    { name: "Envíos y Devoluciones", href: "/envios" },
    { name: "Preguntas Frecuentes", href: "/faq" },
    { name: "Guía de Tallas", href: "/guia-tallas" },
    { name: "Atención al Cliente", href: "/contacto" },
  ]

  const legal = [
    { name: "Términos y Condiciones", href: "/terminos" },
    { name: "Política de Privacidad", href: "/privacidad" },
    { name: "Política de Cookies", href: "/cookies" },
    { name: "Aviso Legal", href: "/aviso-legal" },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-brand rounded-lg p-2">
                <span className="text-brand-foreground font-bold text-lg font-[family-name:var(--font-poppins)]">
                  LP
                </span>
              </div>
              <span className="font-bold text-xl text-card-foreground font-[family-name:var(--font-poppins)]">
                LoversPlay
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md font-[family-name:var(--font-inter)]">
              Tu tienda de confianza para el bienestar íntimo. Productos de alta calidad, envío discreto y atención
              personalizada.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@loversplay.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Calle Principal, Ciudad</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4 font-[family-name:var(--font-poppins)]">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-brand transition-colors duration-200 font-[family-name:var(--font-inter)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4 font-[family-name:var(--font-poppins)]">
              Categorías
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-muted-foreground hover:text-brand transition-colors duration-200 font-[family-name:var(--font-inter)]"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4 font-[family-name:var(--font-poppins)]">Soporte</h3>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-brand transition-colors duration-200 font-[family-name:var(--font-inter)]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-md">
            <h3 className="font-semibold text-card-foreground mb-2 font-[family-name:var(--font-poppins)]">
              Suscríbete a nuestro newsletter
            </h3>
            <p className="text-muted-foreground mb-4 text-sm font-[family-name:var(--font-inter)]">
              Recibe ofertas exclusivas y consejos de bienestar íntimo
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Tu email" className="flex-1" />
              <Button className="bg-brand hover:bg-brand/90">Suscribirse</Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
              © 2024 LoversPlay. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap gap-4">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-brand transition-colors duration-200 font-[family-name:var(--font-inter)]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
