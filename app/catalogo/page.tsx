"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { CategorySidebar } from "@/components/product/category-sidebar"
import { ProductGrid } from "@/components/product/product-grid"
import { SortSelect } from "@/components/product/sort-select"
import { Button } from "@/components/ui/button"
import { Filter, Grid, List } from "lucide-react"
import { useFiltersStore } from "@/lib/store"
import { mockProducts } from "@/lib/services/mock-data"

export default function CatalogPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { filters, sortBy, searchQuery } = useFiltersStore()

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = product.name.toLowerCase().includes(query)
        const matchesTags = product.tags?.some((tag) => tag.toLowerCase().includes(query))
        if (!matchesName && !matchesTags) return false
      }

      // Category filter
      if (filters.categories.length > 0) {
        const hasMatchingCategory = product.categoryIds.some((catId) => filters.categories.includes(catId))
        if (!hasMatchingCategory) return false
      }

      // Price filter
      const price = product.salePrice || product.price
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false
      }

      // Rating filter
      if (filters.rating.length > 0 && product.rating) {
        const hasMatchingRating = filters.rating.some((rating) => product.rating! >= rating)
        if (!hasMatchingRating) return false
      }

      // Stock filter
      if (filters.inStock && (!product.stock || product.stock <= 0)) {
        return false
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case "price-desc":
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "popularity":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
      case "newest":
        // Mock: sort by id (assuming higher id = newer)
        filtered.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
      default:
        // Relevance: featured first, then by views
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return (b.views || 0) - (a.views || 0)
        })
    }

    return filtered
  }, [filters, sortBy, searchQuery])

  const breadcrumbItems = [{ label: "Catálogo" }]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-[family-name:var(--font-poppins)]">
            Catálogo de Productos
          </h1>
          <p className="text-muted-foreground font-[family-name:var(--font-inter)]">
            Descubre nuestra colección completa de productos de bienestar íntimo
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <CategorySidebar />
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-4">
                {/* Mobile filter button */}
                <Button variant="outline" size="sm" onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>

                {/* Results count */}
                <span className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                  {filteredAndSortedProducts.length} productos encontrados
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* View mode toggle */}
                <div className="flex items-center border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort select */}
                <SortSelect />
              </div>
            </div>

            {/* Products grid */}
            <ProductGrid products={filteredAndSortedProducts} />
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-80 bg-background border-r border-border overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold font-[family-name:var(--font-poppins)]">Filtros</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)}>
                  ✕
                </Button>
              </div>
              <CategorySidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
