import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function Header() {
  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">✨</span>
              </div>
              <span className="font-bold text-xl text-secondary-900">Inspirational</span>
            </Link>
          </div>
          
          <Navigation />
        </div>
      </div>
    </header>
  )
}