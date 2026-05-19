import { Link } from 'react-router-dom'
import { events, categories, user } from '../../data/events'

function Home() {
  const upcomingEvents = events.slice(0, 3)
  const today = new Date()
  const dateString = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="page">

      <p className="page-label">HOME</p>

      <div className="hero">
        <div className="hero-left">
          <p className="hero-date">{dateString}</p>
          <h1 className="hero-title">
            Hi {user.name.split(' ')[0]},<br />
            which events are you joining this week?
          </h1>
          <p className="hero-sub">{events.length} events coming up in Aarhus</p>
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
            <span className="stat-label">You are joining</span>
          </div>
        </div>
      </div>

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
              <span className="category-name">{cat.name}</span>
              <span className="category-count">
                {events.filter(e => e.category === cat.name).length} events
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Coming up next</h2>
          <Link to="/events" className="section-link">View calendar →</Link>
        </div>
        <div className="event-cards-grid">
  {upcomingEvents.map(event => (
    <Link to={`/events/${event.id}`} key={event.id} className="event-card">
      <div className="event-card-img">
        <img src={event.image} alt={event.title} />
      </div>
      <div className="event-card-body">
        <p className="event-card-title">{event.title}</p>
        <div className="event-card-meta">
          <span className="event-card-meta-icon">📅</span>
          {event.displayDate} · {event.time}
        </div>
        <div className="event-card-meta">
          <span className="event-card-meta-icon">📍</span>
          {event.location}
        </div>
        <div className="event-card-footer">
          {event.status === 'Full' ? (
            <button className="btn-fully-booked" disabled>Fully Booked</button>
          ) : user.registeredEvents.includes(event.id) ? (
            <button className="btn-joined">✓ Joined</button>
          ) : (
            <button className="btn-join">Join</button>
          )}
        </div>
      </div>
    </Link>
  ))}
</div>
      </div>

    </div>
  )
}

export default Home