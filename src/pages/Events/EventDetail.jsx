import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { events, user } from '../../data/events'

function EventDetail() {
  const { id } = useParams()
  const event = events.find(e => e.id === parseInt(id))
  const [selectedOptions, setSelectedOptions] = useState({})

  if (!event) {
    return (
      <div className="page">
        <p className="page-label">EVENTS</p>
        <div className="ed-not-found">
          <p className="ed-not-found-title">Event not found</p>
          <Link to="/events" className="btn-primary" style={{display:'inline-block'}}>
            Back to events
          </Link>
        </div>
      </div>
    )
  }

  const isRegistered = user.registeredEvents.includes(event.id)
  const isFull = event.status === 'Full'
  const fillPct = Math.round((event.registered / event.spots) * 100)
  const attendees = ['DS', 'NP', 'BH', 'NS', 'FH', 'MJ']

  const handleOptionChange = (fieldId, value) => {
    setSelectedOptions(prev => ({ ...prev, [fieldId]: value }))
  }

  return (
    <div className="page">
      <div className="ed-breadcrumb">
        <Link to="/events" className="ed-breadcrumb-link">EVENTS</Link>
        <span className="ed-breadcrumb-sep">›</span>
        <span className="ed-breadcrumb-active">{event.title}</span>
      </div>

      <div className="ed-main">
        <div className="ed-left">
          <div className="ed-card">
            <div className="ed-banner">
              <img src={event.image} alt={event.title} className="ed-banner-img" />
              <span className="ed-banner-badge">{event.category}</span>
              {isFull && <span className="ed-banner-full">Full</span>}
              {!isFull && event.spotsLeft > 0 && (
                <span className="ed-banner-spots">{event.spotsLeft} spots left</span>
              )}
            </div>

            <div className="ed-body">
              <h1 className="ed-title">{event.title}</h1>
              <div className="ed-organiser">
                <div className="ed-organiser-avatar">
                  {event.organiser.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="ed-organiser-name">Created by {event.organiser}</span>
              </div>

              <div className="ed-meta-grid">
                <div className="ed-meta-item">
                  <span className="ed-meta-icon">📅</span>
                  <div>
                    <p className="ed-meta-label">Date</p>
                    <p className="ed-meta-val">{event.displayDate} 2026</p>
                  </div>
                </div>
                <div className="ed-meta-item">
                  <span className="ed-meta-icon">🕐</span>
                  <div>
                    <p className="ed-meta-label">Time</p>
                    <p className="ed-meta-val">{event.time}</p>
                  </div>
                </div>
                <div className="ed-meta-item">
                  <span className="ed-meta-icon">📍</span>
                  <div>
                    <p className="ed-meta-label">Location</p>
                    <p className="ed-meta-val">{event.location}</p>
                  </div>
                </div>
                <div className="ed-meta-item">
                  <span className="ed-meta-icon">💰</span>
                  <div>
                    <p className="ed-meta-label">Cost</p>
                    <p className="ed-meta-val">{event.cost}</p>
                  </div>
                </div>
              </div>

              <div className="ed-section">
                <p className="ed-section-label">About this event</p>
                <p className="ed-description">{event.description}</p>
              </div>

              <div className="ed-section">
                <p className="ed-section-label">Who's going</p>
                <div className="ed-attendees">
                  <div className="ed-avatar-stack">
                    {attendees.slice(0, Math.min(event.registered, 6)).map((initials, i) => (
                      <div key={i} className="ed-avatar">{initials}</div>
                    ))}
                  </div>
                  <span className="ed-attendees-text">
                    {event.registered} out of {event.spots} spots filled
                  </span>
                </div>
                <div className="ed-progress-wrap">
                  <div className="ed-progress-track">
                    <div
                      className="ed-progress-fill"
                      style={{ width: `${Math.min(fillPct, 100)}%` }}
                    ></div>
                  </div>
                  <span className="ed-progress-label">{fillPct}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ed-right">
          {isFull ? (
            <div className="ed-panel">
              <p className="ed-panel-title">The event is fully booked!</p>
              <button className="ed-btn-full" disabled>Fully Booked</button>
              <p className="ed-confirm-note">
                You'll be notified on Merkle Hub if spots become available.
              </p>
            </div>
          ) : isRegistered ? (
            <div className="ed-panel">
              <p className="ed-panel-title">You are registered for this event</p>
              <Link to="/myhub" className="ed-btn-registrations">
                Your registrations
              </Link>
              <p className="ed-confirm-note">
                You'll be notified on Merkle Hub if there's any changes.
              </p>
            </div>
          ) : (
            <div className="ed-panel">
              <p className="ed-panel-title">Register for this event</p>

              <label className="ed-label">Your name*</label>
              <input
                className="ed-input"
                placeholder="Your name"
                defaultValue={user.name}
              />

              {event.customFields && event.customFields.map(field => (
                <div key={field.id} className="ed-custom-field">
                  <label className="ed-label">{field.label}</label>
                  <div className="ed-options-list">
                    {field.options.map(option => (
                      <label
                        key={option}
                        className={`ed-option ${selectedOptions[field.id] === option ? 'ed-option-selected' : ''}`}
                      >
                        <input
                          type={field.type}
                          name={field.id}
                          value={option}
                          checked={selectedOptions[field.id] === option}
                          onChange={() => handleOptionChange(field.id, option)}
                          className="ed-option-input"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {!event.customFields && (
                <>
                  <label className="ed-label">Note for organiser (optional)</label>
                  <input
                    className="ed-input"
                    placeholder="Wishes, notes..."
                  />
                </>
              )}

              <button className="ed-btn-register">Register</button>
              <p className="ed-confirm-note">
                You'll be notified on Merkle Hub once registration is confirmed.
              </p>
            </div>
          )}

          <div className="ed-panel" style={{marginTop:'12px'}}>
            <p className="ed-panel-title">Event details</p>
            <div className="ed-details-list">
              <div className="ed-details-row">
                <span className="ed-details-icon">👥</span>
                <span className="ed-details-label">Capacity</span>
                <span className="ed-details-val">{event.spots} people</span>
              </div>
              <div className="ed-details-row">
                <span className="ed-details-icon">⏱️</span>
                <span className="ed-details-label">Duration</span>
                <span className="ed-details-val">2.5hrs</span>
              </div>
              <div className="ed-details-row">
                <span className="ed-details-icon">🕐</span>
                <span className="ed-details-label">Deadline</span>
                <span className="ed-details-val">
                  {parseInt(event.displayDate.split(' ')[1]) - 2} {event.displayDate.split(' ')[2]}
                </span>
              </div>
              <div className="ed-details-row">
                <span className="ed-details-icon">👤</span>
                <span className="ed-details-label">Organised by</span>
                <span className="ed-details-val">{event.organiser}</span>
              </div>
            </div>
            <div className="ed-action-btns">
              <button className="ed-action-btn">📅 Add to calendar</button>
              <button className="ed-action-btn">↗ Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail