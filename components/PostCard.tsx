import Link from 'next/link'
import type { InspirationalPost } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'
import MoodBadge from '@/components/MoodBadge'

interface PostCardProps {
  post: InspirationalPost
  showCategory?: boolean
  className?: string
}

export default function PostCard({ post, showCategory = true, className = '' }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const mood = post.metadata?.mood
  const shortQuote = post.metadata?.short_quote
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
    <article className={`card animate-fade-in ${className}`}>
      {featuredImage && (
        <div className="aspect-w-16 aspect-h-9 bg-secondary-100">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-48 object-cover"
            width={400}
            height={225}
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {showCategory && category && (
              <CategoryBadge category={category} />
            )}
            {mood && (
              <MoodBadge mood={mood.value} />
            )}
          </div>
          {publicationDate && (
            <time className="text-sm text-secondary-500" dateTime={publicationDate}>
              {formatDate(publicationDate)}
            </time>
          )}
        </div>
        
        <h2 className="text-xl font-semibold text-secondary-900 mb-3 line-clamp-2">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-primary-600 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h2>
        
        {shortQuote && (
          <blockquote className="text-secondary-600 italic mb-4 line-clamp-2">
            "{shortQuote}"
          </blockquote>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-secondary-500">
            {post.metadata?.author_speaker && (
              <span>by {post.metadata.author_speaker}</span>
            )}
          </div>
          
          <Link 
            href={`/posts/${post.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  )
}