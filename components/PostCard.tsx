import Link from 'next/link'
import CategoryBadge from './CategoryBadge'
import MoodBadge from './MoodBadge'
import type { InspirationalPost } from '@/types'
import type { CSSProperties } from 'react'

interface PostCardProps {
  post: InspirationalPost
  showCategory?: boolean
  className?: string
  style?: CSSProperties
}

export default function PostCard({ 
  post, 
  showCategory = true, 
  className = '',
  style = {}
}: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const shortQuote = post.metadata?.short_quote || ''
  const authorSpeaker = post.metadata?.author_speaker || ''
  const mood = post.metadata?.mood
  
  // Optimize image with imgix parameters (2x container size for high-resolution displays)
  const optimizedImageUrl = featuredImage?.imgix_url 
    ? `${featuredImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`
    : null

  return (
    <article 
      className={`card overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up ${className}`}
      style={style}
    >
      {/* Featured Image */}
      {optimizedImageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={optimizedImageUrl}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            width={800}
            height={600}
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        {/* Category and Mood */}
        <div className="flex items-center justify-between mb-4">
          {showCategory && category && (
            <CategoryBadge category={category} />
          )}
          {mood && (
            <MoodBadge mood={mood.value} />
          )}
        </div>
        
        {/* Title */}
        <h2 className="text-xl font-bold text-secondary-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        
        {/* Short Quote */}
        {shortQuote && (
          <p className="text-secondary-600 mb-4 line-clamp-3 leading-relaxed">
            "{shortQuote}"
          </p>
        )}
        
        {/* Author and Date */}
        <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
          {authorSpeaker && (
            <span>by {authorSpeaker}</span>
          )}
          <time dateTime={post.metadata?.publication_date || post.created_at}>
            {new Date(post.metadata?.publication_date || post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        
        {/* Read More Button */}
        <Link 
          href={`/posts/${post.slug}`}
          className="btn-primary text-sm px-4 py-2 w-full text-center hover:shadow-md transition-all duration-200"
        >
          Read Full Message →
        </Link>
      </div>
    </article>
  )
}