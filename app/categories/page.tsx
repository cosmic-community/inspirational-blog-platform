import { getCategories } from '@/lib/cosmic'

export const metadata = {
  title: 'Categories - Inspirational Blog Platform',
  description: 'Explore inspirational content by categories: Personal Growth, Gratitude & Joy, and Hope & Faith.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="section-spacing animate-fade-in">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Inspiration Categories</h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Find the perfect content for your current journey. Each category offers unique perspectives on growth, gratitude, and hope.
          </p>
        </div>
        
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏷️</div>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-4">No Categories Yet</h2>
            <p className="text-secondary-600 max-w-md mx-auto">
              We're organizing our content to better serve your inspirational journey. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const color = category.metadata?.color || '#6B7280'
              const emoji = category.metadata?.icon_emoji || '🏷️'
              const name = category.metadata?.name || category.title
              const description = category.metadata?.description || ''
              
              return (
                <div 
                  key={category.id} 
                  className="card p-8 text-center hover:shadow-xl transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-8xl mb-6">{emoji}</div>
                  <h2 className="text-2xl font-bold text-secondary-900 mb-4">{name}</h2>
                  <p className="text-secondary-600 mb-8 leading-relaxed text-lg">{description}</p>
                  
                  <a 
                    href={`/categories/${category.slug}`}
                    className="btn-primary text-lg px-8 py-3 w-full hover:shadow-lg transition-all duration-200"
                    style={{ backgroundColor: color }}
                  >
                    Explore {name} →
                  </a>
                  
                  <div className="mt-6 text-center">
                    <span 
                      className="inline-block w-16 h-1 rounded-full"
                      style={{ backgroundColor: color }}
                    ></span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        
        {categories.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-secondary-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-secondary-900 mb-4">
                Can't decide where to start?
              </h3>
              <p className="text-secondary-600 mb-6">
                Browse all our inspirational posts and let the content guide your discovery journey.
              </p>
              <a href="/posts" className="btn-primary text-lg px-8 py-3">
                View All Posts
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}