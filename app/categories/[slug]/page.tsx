// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategory, getPostsByCategory, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  const name = category.metadata?.name || category.title
  const description = category.metadata?.description
  
  return {
    title: `${name} - Inspirational Blog Platform`,
    description: description || `Explore inspirational content in the ${name} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  
  const color = category.metadata?.color || '#6B7280'
  const emoji = category.metadata?.icon_emoji || '🏷️'
  const name = category.metadata?.name || category.title
  const description = category.metadata?.description || ''

  return (
    <div className="section-spacing animate-fade-in">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="text-8xl mb-4">{emoji}</div>
            <CategoryBadge category={category} clickable={false} className="text-lg px-6 py-2" />
          </div>
          
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">{name}</h1>
          
          {description && (
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          
          <div className="mt-8">
            <div 
              className="inline-block w-24 h-1 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">{emoji}</div>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
              No posts in {name} yet
            </h2>
            <p className="text-secondary-600 max-w-md mx-auto mb-8">
              We're working on bringing you inspiring content in this category. 
              Check back soon or explore other categories!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/categories" className="btn-secondary">
                ← All Categories
              </a>
              <a href="/posts" className="btn-primary">
                Browse All Posts
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-secondary-600 text-center">
                {posts.length} inspiring {posts.length === 1 ? 'post' : 'posts'} in {name}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} showCategory={false} />
              ))}
            </div>
            
            {/* Navigation */}
            <div className="text-center mt-12 pt-8 border-t border-secondary-200">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/categories" className="btn-secondary">
                  ← All Categories
                </a>
                <a href="/posts" className="btn-primary">
                  Browse All Posts
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}