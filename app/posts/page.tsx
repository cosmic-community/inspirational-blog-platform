import { getInspirationalPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const metadata = {
  title: 'All Posts - Inspirational Blog Platform',
  description: 'Browse all inspirational posts, quotes, and reflections for personal growth and motivation.',
}

export default async function PostsPage() {
  const posts = await getInspirationalPosts()

  return (
    <div className="section-spacing animate-fade-in">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">All Inspirational Posts</h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover our complete collection of uplifting messages, wisdom, and reflections to inspire your journey.
          </p>
          
          {posts.length > 0 && (
            <p className="mt-4 text-secondary-500">
              Showing {posts.length} post{posts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-4">No Posts Yet</h2>
            <p className="text-secondary-600 max-w-md mx-auto">
              We're working on bringing you inspiring content. Check back soon for uplifting messages and reflections.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}