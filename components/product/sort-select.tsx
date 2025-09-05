"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFiltersStore } from "@/lib/store"
import type { SortOption } from "@/lib/types"

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevancia" },
  { value: "popularity", label: "Más Popular" },
  { value: "newest", label: "Más Reciente" },
  { value: "price-asc", label: "Precio: Menor a Mayor" },
  { value: "price-desc", label: "Precio: Mayor a Menor" },
  { value: "rating", label: "Mejor Calificado" },
]

export function SortSelect() {
  const { sortBy, setSortBy } = useFiltersStore()

  return (
    <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
