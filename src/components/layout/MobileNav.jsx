import { Link, useLocation } from 'react-router-dom'

function MobileNav() {
  const location = useLocation()

  const links = [
    { name: 'Home', path: '/', icon: 'ti-home' },
    { name: 'Events', path: '/events', icon: 'ti-calendar' },
    { name: 'My Hub', path: '/myhub', icon: 'ti-user' },
    { name: 'Manage', path: '/manage', icon: 'ti-calendar-plus' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="mobile-nav">
      {links.map(link => (
        <Link
          key={link.name}
          to={link.path}
          className={`mobile-nav-item ${isActive(link.path) ? 'mobile-nav-item-active' : ''}`}
        >
          <i className={`ti ${link.icon} mobile-nav-icon`} aria-hidden="true"></i>
          <span className="mobile-nav-label">{link.name}</span>
        </Link>
      ))}
    </nav>
  )
}

export default MobileNav