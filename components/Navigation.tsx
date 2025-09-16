import Link from 'next/link'

export default function Navigation() {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/categories', label: 'Categories' },
    { href: '/posts', label: 'All Posts' },
  ]

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}