import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const links = [
    { name: 'Events', path: '/events' },
    { name: 'My Hub', path: '/myhub' },
    { name: 'Manage', path: '/manage' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
        <div className="navbar-logo-dot"></div>
        <span className="navbar-logo-text">Merkle Social Hub</span>
        </Link>
        <div className="navbar-links">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${location.pathname === link.path ? 'navbar-link-active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-bell">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
        <div className="navbar-avatar">DS</div>
      </div>
    </nav>
  )
}

export default Navbar