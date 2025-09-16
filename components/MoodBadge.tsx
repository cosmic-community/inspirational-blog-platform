interface MoodBadgeProps {
  mood: string
  className?: string
}

export default function MoodBadge({ mood, className = '' }: MoodBadgeProps) {
  const getMoodEmoji = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'uplifting':
        return '⬆️'
      case 'peaceful':
        return '🕊️'
      case 'energizing':
        return '⚡'
      case 'comforting':
        return '🤗'
      case 'motivating':
        return '🔥'
      default:
        return '💭'
    }
  }

  return (
    <span className={`mood-badge ${className}`}>
      <span className="text-xs">{getMoodEmoji(mood)}</span>
      {mood}
    </span>
  )
}