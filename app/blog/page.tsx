"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { BlogList } from "@/components/blog/blog-list"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { mockBlogPosts } from "@/lib/services/mock-data"

export default function BlogPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const filteredPosts = useMemo(() => {
    return mockBlogPosts.filter((post) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = post.title.toLowerCase().includes(query)
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query)
        const matchesContent = post.content.toLowerCase().includes(query)
        const matchesTags = post.tags?.some((tag) => tag.toLowerCase().includes(query))

        if (!matchesTitle && !matchesExcerpt && !matchesContent && !matchesTags) {
          return false
        }
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const hasMatchingTag = post.tags?.some((tag) => selectedTags.includes(tag))
        if (!hasMatchingTag) return false
      }

      return true
    })
  }, [selectedTags, searchQuery])

  const breadcrumbItems = [{ label: "Blog" }]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-poppins)]">
            Blog de Bienestar Íntimo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
            Descubre consejos, guías y artículos sobre bienestar íntimo, salud sexual y relaciones saludables
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filter button */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                {filteredPosts.length} artículo{filteredPosts.length !== 1 ? "s" : ""} encontrado
                {filteredPosts.length !== 1 ? "s" : ""}
              </p>
              <Button variant="outline" size="sm" onClick={() => setIsSidebarOpen(true)}>
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Desktop results count */}
            <div className="hidden lg:block mb-6">
              <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)]">
                {filteredPosts.length} artículo{filteredPosts.length !== 1 ? "s" : ""} encontrado
                {filteredPosts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Blog posts */}
            <BlogList posts={filteredPosts} />
          </div>

          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <BlogSidebar selectedTags={selectedTags} onTagsChange={setSelectedTags} onSearch={setSearchQuery} />
          </aside>
        </div>
      </main>

      <Footer />

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-80 bg-background border-l border-border overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold font-[family-name:var(--font-poppins)]">Filtros</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)}>
                  ✕
                </Button>
              </div>
              <BlogSidebar selectedTags={selectedTags} onTagsChange={setSelectedTags} onSearch={setSearchQuery} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
