"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useFiltersStore } from "@/lib/store"
import { mockCategories } from "@/lib/services/mock-data"

interface CategorySidebarProps {
  className?: string
}

export function CategorySidebar({ className = "" }: CategorySidebarProps) {
  const { filters, setFilters, clearFilters } = useFiltersStore()
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((id) => id !== categoryId)

    setFilters({ categories: newCategories })
  }

  const handlePriceChange = (value: number[]) => {
    setFilters({ priceRange: [value[0], value[1]] as [number, number] })
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    const newRatings = checked ? [...filters.rating, rating] : filters.rating.filter((r) => r !== rating)

    setFilters({ rating: newRatings })
  }

  const handleStockChange = (checked: boolean) => {
    setFilters({ inStock: checked })
  }

  return (
    <div className={`bg-card rounded-xl border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-card-foreground font-[family-name:var(--font-poppins)]">Filtros</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Limpiar
        </Button>
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-medium text-card-foreground mb-3 font-[family-name:var(--font-poppins)]">Categorías</h3>
          <div className="space-y-2">
            {mockCategories.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm text-card-foreground cursor-pointer flex-1 font-[family-name:var(--font-inter)]"
                  >
                    {category.name}
                  </label>
                  <span className="text-xs text-muted-foreground">({category.count})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium text-card-foreground mb-3 font-[family-name:var(--font-poppins)]">
            Rango de Precio
          </h3>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-medium text-card-foreground mb-3 font-[family-name:var(--font-poppins)]">Calificación</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating.includes(rating)}
                  onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm text-card-foreground cursor-pointer flex items-center gap-1 font-[family-name:var(--font-inter)]"
                >
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < rating ? "text-yellow-400" : "text-muted-foreground"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span>y más</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Stock */}
        <div>
          <h3 className="font-medium text-card-foreground mb-3 font-[family-name:var(--font-poppins)]">
            Disponibilidad
          </h3>
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" checked={filters.inStock} onCheckedChange={handleStockChange} />
            <label
              htmlFor="in-stock"
              className="text-sm text-card-foreground cursor-pointer font-[family-name:var(--font-inter)]"
            >
              Solo productos en stock
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
