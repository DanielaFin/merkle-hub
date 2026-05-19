import { useState } from 'react'

const manageEvents = [
  {
    id: 1,
    title: 'QA Lunch @Bouillon',
    categories: 'Food · Drinks',
    date: '11 June',
    registered: 17,
    capacity: 33,
    status: 'Open',
  },
  {
    id: 2,
    title: 'Coffee & Croissants ☕️',
    categories: 'Food · Drinks',
    date: '15 June',
    registered: 6,
    capacity: 12,
    status: 'Open',
  },
  {
    id: 3,
    title: 'Lazertag 🔫',
    categories: 'Sports · Social',
    date: '27 Aug',
    registered: 0,
    capacity: 12,
    status: 'Draft',
  },
]

const pastManageEvents = [
  {
    id: 4,
    title: 'Knitting Picnic',
    categories: 'Creative',
    date: '30 May',
    registered: 17,
    capacity: 33,
    status: 'Expired',
  },
  {
    id: 5,
    title: 'Street Food 🍽️',
    categories: 'Food · Drinks',
    date: '24 May',
    registered: 24,
    capacity: 48,
    status: 'Expired',
  },
  {
    id: 6,
    title: 'Zumba Marathon',
    categories: 'Sports',
    date: '12 May',
    registered: 18,
    capacity: 18,
    status: 'Expired',
  },
]

function StatusBadge({ status }) {
  const styles = {
    Open: 'badge-status-open',
    Full: 'badge-status-full',
    Draft: 'badge-status-draft',
    Expired: 'badge-status-expired',
    Cancelled: 'badge-status-cancelled',
  }
  return (
    <span className={`badge-status ${styles[status] || ''}`}>
      {status}
    </span>
  )
}

function ProgressBar({ registered, capacity }) {
  const pct = capacity > 0 ? Math.round((registered / capacity) * 100) : 0
  const isFull = pct >= 100
  return (
    <div className="manage-progress-wrap">
      <div className="manage-progress-track">
        <div
          className={`manage-progress-fill ${isFull ? 'manage-progress-full' : ''}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        ></div>
      </div>
      <span className="manage-progress-text">{registered}/{capacity}</span>
    </div>
  )
}

function Manage() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    spots: '',
    budgetPerPerson: '',
    category: '',
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSaveDraft = () => {
    alert('Event saved as draft.')
  }

  const handlePublish = () => {
    alert('Event published!')
  }

  const displayEvents = activeTab === 'upcoming' ? manageEvents : pastManageEvents

  return (
    <div className="page">
      <p className="page-label">MANAGE</p>

      <div className="manage-stats">
        <div className="manage-stat">
          <span className="manage-stat-val">2</span>
          <span className="manage-stat-label">Events this month</span>
        </div>
        <div className="manage-stat">
          <span className="manage-stat-val">17</span>
          <span className="manage-stat-label">Participants</span>
        </div>
        <div className="manage-stat">
          <span className="manage-stat-val">52%</span>
          <span className="manage-stat-label">Fill rate</span>
        </div>
        <div className="manage-stat">
          <span className="manage-stat-val">8,450 DKK</span>
          <span className="manage-stat-label">Budget left</span>
        </div>
      </div>

      <div className="manage-main">
        <div className="manage-left">
          <div className="myhub-panel">
            <div className="myhub-tabs" style={{marginBottom:'16px'}}>
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

            <p className="myhub-list-label">Your events</p>

            <div className="manage-table">
              <div className="manage-table-header">
                <span>Date</span>
                <span>Event</span>
                <span>Registrations</span>
                <span>Status</span>
                <span></span>
              </div>

              {displayEvents.map(event => (
                <div key={event.id} className="manage-table-row">
                  <span className="manage-date">{event.date}</span>
                  <div className="manage-event-info">
                    <p className="manage-event-title">{event.title}</p>
                    <p className="manage-event-cat">{event.categories}</p>
                  </div>
                  <ProgressBar
                    registered={event.registered}
                    capacity={event.capacity}
                  />
                  <StatusBadge status={event.status} />
                  <div className="manage-actions">
                    <button className="manage-action-btn" title="Edit">✏️</button>
                    <button className="manage-action-btn" title="View participants">👤</button>
                    <button className="manage-action-btn" title="Delete">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="manage-right">
          <div className="myhub-panel">
            <p className="myhub-panel-title">Create event</p>

            <label className="manage-label">Event title*</label>
            <input
              className="manage-input"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="event title"
            />

            <label className="manage-label">Event description*</label>
            <textarea
              className="manage-input manage-textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="event description"
            />

            <label className="manage-label">Event picture</label>
            <div className="manage-upload">
              <span>☁️ upload a picture</span>
            </div>

            <div className="manage-form-row">
              <div>
                <label className="manage-label">Date*</label>
                <div className="manage-input-icon-wrap">
                  <span className="manage-input-icon">📅</span>
                  <input
                    className="manage-input manage-input-icon-field"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div>
                <label className="manage-label">Time*</label>
                <div className="manage-input-icon-wrap">
                  <span className="manage-input-icon">🕐</span>
                  <input
                    className="manage-input manage-input-icon-field"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    placeholder="00:00"
                  />
                </div>
              </div>
            </div>

            <label className="manage-label">Location</label>
            <input
              className="manage-input"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="venue name, city"
            />

            <div className="manage-form-row">
              <div>
                <label className="manage-label">Max spots</label>
                <input
                  className="manage-input"
                  name="spots"
                  value={form.spots}
                  onChange={handleChange}
                  placeholder="e.g. 20"
                />
              </div>
              <div>
                <label className="manage-label">Budget per person</label>
                <input
                  className="manage-input"
                  name="budgetPerPerson"
                  value={form.budgetPerPerson}
                  onChange={handleChange}
                  placeholder="e.g. 150 DKK"
                />
              </div>
            </div>

            <label className="manage-label">Category</label>
            <input
              className="manage-input"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Food, Drinks, Creative..."
            />

            <div className="manage-form-btns">
              <button className="manage-btn-draft" onClick={handleSaveDraft}>
                Save draft
              </button>
              <button className="manage-btn-publish" onClick={handlePublish}>
                Publish Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Manage