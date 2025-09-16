import { getInspirationalPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getInspirationalPosts(),
    getCategories()
  ])

  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(3, 9)

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 section-spacing">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6 text-balance">
              Discover Daily
              <span className="text-primary-600 block">Inspiration</span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
              Find meaningful messages, uplifting quotes, and reflection questions to guide your journey of personal growth, gratitude, and hope.
            </p>
            
            {/* Category Preview */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              {categories.map((category) => (
                <CategoryBadge key={category.id} category={category} />
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/posts" className="btn-primary text-lg px-8 py-3">
                Explore All Posts
              </a>
              <a href="/categories" className="btn-secondary text-lg px-8 py-3">
                Browse Categories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="section-spacing">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Featured Inspiration</h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Handpicked messages to brighten your day and inspire your journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <PostCard 
                  key={post.id} 
                  post={post}
                  className={`animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="section-spacing bg-secondary-50">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Recent Posts</h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Fresh inspiration and wisdom to guide your daily reflections
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            
            {posts.length > 9 && (
              <div className="text-center mt-12">
                <a href="/posts" className="btn-primary text-lg px-8 py-3">
                  View All Posts
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="section-spacing">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Explore by Category</h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Find inspiration that resonates with your current journey and needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => {
                const color = category.metadata?.color || '#6B7280'
                const emoji = category.metadata?.icon_emoji || '🏷️'
                const name = category.metadata?.name || category.title
                const description = category.metadata?.description || ''
                
                return (
                  <div key={category.id} className="card p-8 text-center hover:shadow-lg transition-shadow duration-300">
                    <div className="text-6xl mb-4">{emoji}</div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-3">{name}</h3>
                    <p className="text-secondary-600 mb-6 leading-relaxed">{description}</p>
                    <a 
                      href={`/categories/${category.slug}`}
                      className="btn-primary"
                      style={{ backgroundColor: color }}
                    >
                      Explore {name}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}