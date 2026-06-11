function DeleteModal({ event, onConfirm, onClose }) {
  return (
    <>
      <div className="notif-overlay" onClick={onClose}></div>
      <div className="confirm-modal">
        <div className="confirm-modal-icon" style={{background:'rgba(232,115,138,0.15)',color:'var(--color-pink)'}}>
          <i className="ti ti-trash" aria-hidden="true"></i>
        </div>
        <h2 className="confirm-modal-title">Delete this event?</h2>
        <p className="confirm-modal-sub">
          This will permanently remove the event and all its registrations.
        </p>
        <div className="confirm-modal-event">
          <div className="confirm-modal-dot" style={{background:'var(--color-pink)'}}></div>
          <div>
            <p className="confirm-modal-event-name">{event.title}</p>
            <p className="confirm-modal-event-meta">{event.date} · {event.categories}</p>
          </div>
        </div>
        <div className="confirm-modal-btns">
          <button className="confirm-btn-ghost" onClick={onClose}>Cancel</button>
          <button
            className="confirm-btn-primary"
            style={{background:'var(--color-pink)'}}
            onClick={onConfirm}
          >
            Yes, delete
          </button>
        </div>
      </div>
    </>
  )
}

export default DeleteModal