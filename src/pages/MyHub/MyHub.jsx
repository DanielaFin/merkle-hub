import { useState } from 'react'
import { Link } from 'react-router-dom'
import { events, user } from '../../data/events'

const registeredEvents = events.filter(e => user.registeredEvents.includes(e.id))

const pastEvents = [
  {
    id: 99,
    title: 'Merkle DK Talk',
    displayDate: '28 May',
    category: 'Company',
    type: 'During work hours',
    status: 'Expired',
  },
  {
    id: 98,
    title: 'Wine & Paint',
    displayDate: '13 May',
    category: 'Creative',
    type: 'After work',
    status: 'Expired',
  },
]

const activityItems = [
  {
    id: 1,
    text: 'Registration for',
    highlight: 'QA Lunch @Bouillon',
    suffix: 'confirmed',
    color: '#97C459',
    time: '2h ago',
  },
  {
    id: 2,
    text: 'Saved',
    highlight: 'New dietary preference',
    suffix: 'vegan',
    color: '#D85A30',
    time: 'Yesterday',
  },
  {
    id: 3,
    text: 'Registration for',
    highlight: 'Coffee & Croissants☕️',
    suffix: 'confirmed',
    color: '#97C459',
    time: '3 days ago',
  },
]

function MyHub() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [emailReminders, setEmailReminders] = useState(true)
  const [teamsNotifs, setTeamsNotifs] = useState(true)
  const [calendarSync, setCalendarSync] = useState(false)

  const nextEvent = registeredEvents[0]
  const daysToGo = user.nextEvent.daysTo

  return (
    <div className="page">
      <p className="page-label">MY HUB</p>

      <div className="myhub-profile">
        <div className="myhub-avatar-wrap">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80"
            alt={user.name}
            className="myhub-avatar-img"
          />
        </div>
        <div className="myhub-profile-info">
          <h1 className="myhub-name">{user.name}</h1>
          <p className="myhub-role">{user.role} - {user.office}</p>
        </div>
        <button className="myhub-edit-btn">✏️ Edit</button>
      </div>

      <div className="myhub-stats">
        <div className="myhub-stat">
          <span className="myhub-stat-val">{user.eventsAttended}</span>
          <span className="myhub-stat-label">Events attended</span>
        </div>
        <div className="myhub-stat">
          <span className="myhub-stat-val">{user.upcomingEvents}</span>
          <span className="myhub-stat-label">Upcoming events</span>
        </div>
        <div className="myhub-stat myhub-stat-highlight">
          <span className="myhub-stat-val myhub-stat-days">{daysToGo} days to go</span>
          <span className="myhub-stat-label">{nextEvent?.title}</span>
        </div>
      </div>

      <div className="myhub-main">
        <div className="myhub-left">
          <div className="myhub-panel">
            <div className="myhub-tabs">
              <button
                className={`myhub-tab ${activeTab === 'upcoming' ? 'myhub-tab-active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={`myhub-tab ${activeTab === 'past' ? 'myhub-tab-active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past Events
              </button>
            </div>

            {activeTab === 'upcoming' && (
              <div>
                <p className="myhub-list-label">Registered events</p>
                {registeredEvents.length === 0 ? (
                  <div className="myhub-empty">
                    <p className="myhub-empty-text">No upcoming events.</p>
                    <Link to="/events" className="btn-primary" style={{display:'inline-block',marginTop:'12px'}}>
                      Browse events
                    </Link>
                  </div>
                ) : (
                  registeredEvents.map(event => (
                    <div key={event.id} className="myhub-event-row">
                      <div className="myhub-event-date">
                        <span className="myhub-event-date-num">
                          {event.displayDate.split(' ')[1]}
                        </span>
                        <span className="myhub-event-date-mon">
                          {event.displayDate.split(' ')[2]}
                        </span>
                      </div>
                      <div className="myhub-event-info">
                        <p className="myhub-event-title">{event.title}</p>
                        <p className="myhub-event-meta">
                          {event.category} · {event.type}
                        </p>
                      </div>
                      <span className="badge-confirmed">Confirmed</span>
                      <button className="btn-cancel">Cancel</button>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'past' && (
              <div>
                <p className="myhub-list-label">Past events</p>
                {pastEvents.map(event => (
                  <div key={event.id} className="myhub-event-row">
                    <div className="myhub-event-date">
                      <span className="myhub-event-date-num" style={{color:'var(--color-text-muted)'}}>
                        {event.displayDate.split(' ')[0]}
                      </span>
                      <span className="myhub-event-date-mon">
                        {event.displayDate.split(' ')[1]}
                      </span>
                    </div>
                    <div className="myhub-event-info">
                      <p className="myhub-event-title">{event.title}</p>
                      <p className="myhub-event-meta">
                        {event.category} · {event.type}
                      </p>
                    </div>
                    <span className="badge-expired">Expired</span>
                    <button className="btn-expired" disabled>Expired</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="myhub-right">
          <div className="myhub-panel">
            <div className="myhub-panel-header">
              <span className="myhub-panel-title">My preferences</span> 
              <button className="myhub-edit-small">✏️ Edit</button>
            </div>
            
            <div className="myhub-pref-section">
              <p className="myhub-pref-label">Dietary preference</p>
              <div className="myhub-tags" style={{marginTop:'8px'}}>
                <span className="myhub-tag myhub-tag-pink">{user.dietaryPreference}</span>
              </div>
            </div>

            <div className="myhub-pref-divider"></div>

            <div className="myhub-pref-section">
              <p className="myhub-pref-label">Favourite categories</p>
              <div className="myhub-tags" style={{marginTop:'8px'}}>
                {user.favouriteCategories.map(cat => (
                  <span key={cat} className="myhub-tag myhub-tag-pink">{cat}</span>
                ))}
              </div>
            </div>

            <div className="myhub-pref-divider"></div>

            <p className="myhub-notif-title">Notification settings</p>

            <div className="myhub-pref-item">
              <div>
                <p className="myhub-pref-label">Email reminders</p>
                <p className="myhub-pref-sub">24h before event</p>
              </div>
              <div
                className={`toggle ${emailReminders ? 'toggle-on' : 'toggle-off'}`}
                onClick={() => setEmailReminders(p => !p)}
              >
                <div className="toggle-dot"></div>
              </div>
            </div>

            <div className="myhub-pref-item">
              <div>
                <p className="myhub-pref-label">Teams notifications</p>
                <p className="myhub-pref-sub">New events, reminders</p>
              </div>
              <div
                className={`toggle ${teamsNotifs ? 'toggle-on' : 'toggle-off'}`}
                onClick={() => setTeamsNotifs(p => !p)}
              >
                <div className="toggle-dot"></div>
              </div>
            </div>

            <div className="myhub-pref-item" style={{borderBottom:'none'}}>
              <div>
                <p className="myhub-pref-label">Calendar sync</p>
                <p className="myhub-pref-sub">Add events to Outlook</p>
              </div>
              <div
                className={`toggle ${calendarSync ? 'toggle-on' : 'toggle-off'}`}
                onClick={() => setCalendarSync(p => !p)}
              >
                <div className="toggle-dot"></div>
              </div>
            </div>
          </div>

          <div className="myhub-panel">
            <p className="myhub-panel-title">My activity</p>
            {activityItems.map(item => (
              <div key={item.id} className="myhub-activity-item">
                <div
                  className="myhub-activity-dot"
                  style={{background: item.color}}
                ></div>
                <p className="myhub-activity-text">
                  {item.text}{' '}
                  <span style={{color:'var(--color-text-primary)',fontWeight:500}}>
                    {item.highlight}
                  </span>{' '}
                  {item.suffix}
                </p>
                <span className="myhub-activity-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyHub