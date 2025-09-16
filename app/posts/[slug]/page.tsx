// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getInspirationalPost, getInspirationalPosts } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'
import MoodBadge from '@/components/MoodBadge'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getInspirationalPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getInspirationalPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: `${post.title} - Inspirational Blog Platform`,
    description: post.metadata?.short_quote || post.metadata?.message?.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.metadata?.short_quote || 'Inspirational content for personal growth',
      images: post.metadata?.featured_image?.imgix_url ? [
        {
          url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
        }
      ] : undefined,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getInspirationalPost(slug)
  
  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const mood = post.metadata?.mood
  const shortQuote = post.metadata?.short_quote
  const message = post.metadata?.message
  const reflectionQuestions = post.metadata?.reflection_questions
  const authorSpeaker = post.metadata?.author_speaker
  const publicationDate = post.metadata?.publication_date

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="section-spacing animate-fade-in">
      <article className="max-w-4xl mx-auto container-padding">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            {category && <CategoryBadge category={category} />}
            {mood && <MoodBadge mood={mood.value} />}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6 text-balance">
            {post.title}
          </h1>
          
          {shortQuote && (
            <blockquote className="text-xl italic text-primary-600 border-l-4 border-primary-500 pl-6 mb-6">
              "{shortQuote}"
            </blockquote>
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-secondary-500">
            <div className="flex items-center gap-4">
              {authorSpeaker && (
                <span>by <strong className="text-secondary-700">{authorSpeaker}</strong></span>
              )}
              {publicationDate && (
                <time dateTime={publicationDate}>{formatDate(publicationDate)}</time>
              )}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-96 object-cover"
              width={600}
              height={300}
            />
          </div>
        )}

        {/* Content */}
        {message && (
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}

        {/* Reflection Questions */}
        {reflectionQuestions && (
          <div className="bg-secondary-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
              🤔 Reflection Questions
            </h2>
            <div className="prose max-w-none text-secondary-700">
              <p className="leading-relaxed">{reflectionQuestions}</p>
            </div>
          </div>
        )}

        {/* Share/Navigation */}
        <footer className="border-t border-secondary-200 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-secondary-600">Found this inspiring?</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💙</span>
                <span className="text-2xl">🔄</span>
                <span className="text-2xl">📢</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="/posts" 
                className="btn-secondary"
              >
                ← All Posts
              </a>
              {category && (
                <a 
                  href={`/categories/${category.slug}`}
                  className="btn-primary"
                  style={{ backgroundColor: category.metadata?.color }}
                >
                  More {category.metadata?.name}
                </a>
              )}
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}