import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  clickable?: boolean
  className?: string
}

export default function CategoryBadge({ 
  category, 
  clickable = true, 
  className = '' 
}: CategoryBadgeProps) {
  const color = category.metadata?.color || '#6B7280'
  const emoji = category.metadata?.icon_emoji || '🏷️'
  const name = category.metadata?.name || category.title

  const badgeStyle = {
    backgroundColor: `${color}15`,
    color: color,
    borderColor: `${color}30`,
  }

  const content = (
    <span 
      className={`category-badge border ${className}`}
      style={badgeStyle}
    >
      <span className="text-base">{emoji}</span>
      {name}
    </span>
  )

  if (clickable) {
    return (
      <Link 
        href={`/categories/${category.slug}`}
        className="hover:opacity-80 transition-opacity duration-200"
      >
        {content}
      </Link>
    )
  }

  return content
}