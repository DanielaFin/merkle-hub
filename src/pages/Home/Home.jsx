import { Link } from 'react-router-dom'
import { events, categories, user } from '../../data/events'
console.log(events)

function Home() {
  const upcomingEvents = events.slice(0, 3)

  return (
    <div className="page">

      {/* Hero */}
      <div className="hero">
        <div className="hero-left">
          <p className="hero-date">Monday, 8 June 2026</p>
          <h1 className="hero-title">
            Hi {user.name.split(' ')[0]},<br />
            which events are you joining this week?
          </h1>
          <p className="hero-sub">{events.length} events coming up at Merkle Aarhus</p>
          <div className="hero-btns">
            <Link to="/events" className="btn-primary">Browse all events</Link>
            <Link to="/myhub" className="btn-secondary">My registrations</Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="stat-card">
            <span className="stat-val">{events.length}</span>
            <span className="stat-label">Events this week</span>
          </div>
          <div className="stat-card">
            <span className="stat-val">{user.registeredEvents.length}</span>
            <span className="stat-label">You are registered for</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Browse by category</h2>
          <Link to="/events" className="section-link">See all events →</Link>
        </div>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link
              to={`/events?category=${cat.name}`}
              key={cat.name}
              className="category-card"
            >
              <span className="category-icon">{cat.icon}</span>
              <span className={`category-name category-${cat.name.toLowerCase()}`}>
                {cat.name}
              </span>
              <span className="category-count">
                {events.filter(e => e.category === cat.name).length} events
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Coming up */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Coming up next</h2>
          <Link to="/events" className="section-link">View calendar →</Link>
        </div>
        <div className="upcoming-grid">
          {upcomingEvents.map(event => (
            <Link to={`/events/${event.id}`} key={event.id} className="upcoming-card">
              <div className="upcoming-date">
                <span className="upcoming-date-num">
                  {event.displayDate.split(' ')[1]}
                </span>
                <span className="upcoming-date-mon">
                  {event.displayDate.split(' ')[2]}
                </span>
              </div>
              <div className="upcoming-info">
                <p className="upcoming-title">{event.title}</p>
                <p className="upcoming-meta">{event.time} · {event.location}</p>
                <span className={`badge badge-${event.category.toLowerCase()}`}>
                  {event.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home