import { useState } from 'react'
import { Link } from 'react-router-dom'
import { events, filters, user } from '../../data/events'

const calendarDays = [
  { day: 'M' }, { day: 'T' }, { day: 'W' },
  { day: 'T' }, { day: 'F' }, { day: 'S' }, { day: 'S' },
]

const allDates = [
  null, null, null, null, null, null, null,
  1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28,
  29, 30, null, null, null, null, null,
]

const eventDates = [8, 11, 15, 17, 23, 26]
const todayDate = 8

function Events() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedDate, setSelectedDate] = useState(null)

  const filteredEvents = events.filter(event => {
    const matchesFilter =
      activeFilter === 'All' ||
      event.category === activeFilter ||
      (activeFilter === 'After Work' && event.type === 'After work')
    const matchesDate = selectedDate
      ? parseInt(event.date.split('-')[2]) === selectedDate
      : true
    return matchesFilter && matchesDate
  })

  const suggestedEvents = events.filter(e =>
    user.favouriteCategories.includes(e.category)
  ).slice(0, 3)

  const handleDateClick = (date) => {
    if (!date || !eventDates.includes(date)) return
    setSelectedDate(prev => prev === date ? null : date)
  }

  const clearFilter = () => {
    setSelectedDate(null)
    setActiveFilter('All')
  }

  return (
    <div className="page">
      <p className="page-label">
        EVENTS{activeFilter !== 'All' ? ` > ${activeFilter}` : ''}
        {selectedDate ? ` > ${selectedDate} June 2026` : ''}
      </p>

      <div className="filter-row">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-pill ${activeFilter === f && !selectedDate ? 'filter-pill-active' : ''}`}
            onClick={() => { setActiveFilter(f); setSelectedDate(null) }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="events-main">
        <div className="events-left">
          <div className="events-list-header">
            {selectedDate ? (
              <div className="filter-status">
                <h2 className="section-title">
                  Upcoming events - {selectedDate} June 2026 ({filteredEvents.length})
                </h2>
                <button className="clear-filter-btn" onClick={clearFilter}>
                  Clear filter ×
                </button>
              </div>
            ) : (
              <h2 className="section-title">
                Upcoming events - {activeFilter === 'All' ? 'JUNE 2026' : activeFilter} ({filteredEvents.length})
              </h2>
            )}
          </div>

          {filteredEvents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <p className="empty-title">No events found.</p>
              <p className="empty-sub">
                There are no events matching your current filter(s).
              </p>
              <button className="btn-ghost" onClick={clearFilter}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="event-cards-grid">
              {filteredEvents.map(event => (
                <Link
                  to={`/events/${event.id}`}
                  key={event.id}
                  className="event-card"
                >
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
                        <button className="btn-fully-booked" disabled>
                          Fully Booked
                        </button>
                      ) : user.registeredEvents.includes(event.id) ? (
                        <button className="btn-joined">
                          ✓ Joined
                        </button>
                      ) : (
                        <button className="btn-join">Join</button>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="events-right">
          <div className="calendar-widget">
            <div className="calendar-header">
              <span className="calendar-month">June 2026</span>
              <div className="calendar-nav">
                <button className="calendar-nav-btn">‹</button>
                <button className="calendar-nav-btn">›</button>
              </div>
            </div>
            <div className="calendar-grid">
              {calendarDays.map((d, i) => (
                <div key={i} className="calendar-day-header">{d.day}</div>
              ))}
              {allDates.map((date, i) => (
                <div
                  key={i}
                  onClick={() => handleDateClick(date)}
                  className={[
                    'calendar-day',
                    !date ? 'calendar-day-empty' : '',
                    date === todayDate ? 'calendar-day-today' : '',
                    date && eventDates.includes(date) && date !== todayDate
                      ? 'calendar-day-has-event' : '',
                    date === selectedDate ? 'calendar-day-selected' : '',
                    date && eventDates.includes(date) ? 'calendar-day-clickable' : '',
                  ].join(' ')}
                >
                  {date || ''}
                  {date && eventDates.includes(date) && date !== todayDate && (
                    <span className="calendar-dot"></span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="suggested-panel">
            <p className="suggested-title">SUGGESTED FOR YOU</p>
            {suggestedEvents.map(event => (
              <Link
                to={`/events/${event.id}`}
                key={event.id}
                className="suggested-item"
              >
                <div className="suggested-date">
                  <span className="suggested-date-num">
                    {event.displayDate.split(' ')[1]}
                  </span>
                  <span className="suggested-date-mon">
                    {event.displayDate.split(' ')[2]}
                  </span>
                </div>
                <div className="suggested-info">
                  <p className="suggested-name">{event.title}</p>
                  <p className="suggested-meta">{event.time} · {event.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events