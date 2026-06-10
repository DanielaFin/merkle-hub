function CancelModal({ event, onConfirm, onClose }) {
  return (
    <>
      <div className="notif-overlay" onClick={onClose}></div>
      <div className="confirm-modal">
        <div className="confirm-modal-icon" style={{background:'rgba(232,115,138,0.15)',color:'var(--color-pink)'}}>
          <i className="ti ti-calendar-off" aria-hidden="true"></i>
        </div>
        <h2 className="confirm-modal-title">Cancel your spot?</h2>
        <p className="confirm-modal-sub">
          Your spot will be released and someone else may take it.
        </p>
        <div className="confirm-modal-event">
          <div className="confirm-modal-dot" style={{background:'var(--color-pink)'}}></div>
          <div>
            <p className="confirm-modal-event-name">{event.title}</p>
            <p className="confirm-modal-event-meta">
              {event.displayDate} · {event.time} · {event.location}
            </p>
          </div>
        </div>
        <div className="confirm-modal-btns">
          <button className="confirm-btn-ghost" onClick={onClose}>
            Keep my spot
          </button>
          <button
            className="confirm-btn-primary"
            style={{background:'var(--color-pink)'}}
            onClick={onConfirm}
          >
            Yes, cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default CancelModal