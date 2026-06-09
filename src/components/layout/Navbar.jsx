import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { user } from '../../data/events'

const notifications = [
  {
    id: 1,
    text: 'Registration for',
    highlight: 'Pottery Workshop',
    suffix: 'confirmed',
    color: '#97C459',
    time: '2h ago',
    unread: true,
  },
  {
    id: 2,
    text: 'New',
    highlight: 'Creative',
    suffix: 'event added — Wine & Paint',
    color: '#D85A30',
    time: 'Yesterday',
    unread: true,
  },
  {
    id: 3,
    text: 'Registration for',
    highlight: 'QA Lunch',
    suffix: 'confirmed',
    color: '#6B6B85',
    time: '3 days ago',
    unread: false,
  },
]

function Navbar() {
  const location = useLocation()
  const [notifOpen, setNotifOpen] = useState(false)

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'My Hub', path: '/myhub' },
    { name: 'Manage', path: '/manage' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-dot"></div>
            <span className="navbar-logo-text">Merkle Social Hub</span>
          </Link>
          <div className="navbar-links">
            {links.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`navbar-link ${isActive(link.path) ? 'navbar-link-active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="navbar-right">
          <div
            className="navbar-bell"
            onClick={() => setNotifOpen(true)}
          >
            <i className="ti ti-bell" style={{fontSize:'20px'}} aria-hidden="true"></i>
            {unreadCount > 0 && (
              <span className="navbar-bell-dot"></span>
            )}
          </div>
          <Link to="/myhub" className="navbar-avatar">
            {user.initials}
          </Link>
        </div>
      </nav>

      {notifOpen && (
        <div
          className="notif-overlay"
          onClick={() => setNotifOpen(false)}
        ></div>
      )}

      <div className={`notif-panel ${notifOpen ? 'notif-panel-open' : ''}`}>
        <div className="notif-panel-header">
          <span className="notif-panel-title">Notifications</span>
          <button
            className="notif-panel-close"
            onClick={() => setNotifOpen(false)}
          >
            <i className="ti ti-x" aria-hidden="true"></i>
          </button>
        </div>
        <div className="notif-panel-list">
          {notifications.map(notif => (
            <div
              key={notif.id}
              className={`notif-item ${notif.unread ? 'notif-item-unread' : ''}`}
            >
              <div
                className="notif-dot"
                style={{background: notif.color}}
              ></div>
              <p className="notif-text">
                {notif.text}{' '}
                <span className="notif-highlight">{notif.highlight}</span>{' '}
                {notif.suffix}
              </p>
              <span className="notif-time">{notif.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar