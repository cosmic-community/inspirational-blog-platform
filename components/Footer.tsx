export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="max-w-7xl mx-auto container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">✨</span>
              </div>
              <span className="font-bold text-lg text-white">Inspirational</span>
            </div>
            <p className="text-secondary-400 leading-relaxed">
              A platform for sharing and discovering inspirational content that uplifts, motivates, and brings hope to your daily journey.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="/categories/personal-growth" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  🌱 Personal Growth
                </a>
              </li>
              <li>
                <a href="/categories/gratitude-joy" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  💫 Gratitude & Joy
                </a>
              </li>
              <li>
                <a href="/categories/hope-faith" className="text-secondary-400 hover:text-white transition-colors duration-200">
                  🌟 Hope & Faith
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <p className="text-secondary-400 mb-4">
              Join our community of inspiration seekers and share your journey of growth and positivity.
            </p>
            <div className="flex space-x-4">
              <span className="text-2xl">🤝</span>
              <span className="text-2xl">💝</span>
              <span className="text-2xl">🌈</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-800 mt-12 pt-8 text-center">
          <p className="text-secondary-400">
            © {new Date().getFullYear()} Inspirational Blog Platform. Built with love and powered by Cosmic.
          </p>
        </div>
      </div>
    </footer>
  )
}