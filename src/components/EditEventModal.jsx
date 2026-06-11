import { useState } from 'react'

function EditEventModal({ event, onClose }) {
  const [form, setForm] = useState({
    title: event.title,
    date: event.date,
    categories: event.categories,
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <div className="notif-overlay" onClick={onClose}></div>
      <div className="edit-event-modal">
        <div className="notif-panel-header">
          <span className="notif-panel-title">Edit event</span>
          <button className="notif-panel-close" onClick={onClose}>
            <i className="ti ti-x" aria-hidden="true"></i>
          </button>
        </div>
        <div className="edit-event-body">
          <label className="manage-label">Event title</label>
          <input
            className="manage-input"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <label className="manage-label">Date</label>
          <input
            className="manage-input"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <label className="manage-label">Category</label>
          <input
            className="manage-input"
            name="categories"
            value={form.categories}
            onChange={handleChange}
          />
          <div className="confirm-modal-btns" style={{marginTop:'16px'}}>
            <button className="confirm-btn-ghost" onClick={onClose}>Cancel</button>
            <button className="confirm-btn-primary" onClick={onClose}>Save changes</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditEventModal