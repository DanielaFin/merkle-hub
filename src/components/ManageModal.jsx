import { Link } from 'react-router-dom'

function ManageModal({ type, onClose }) {
  const isDraft = type === 'draft'

  return (
    <>
      <div className="notif-overlay" onClick={onClose}></div>
      <div className="confirm-modal">
        <div
          className="confirm-modal-icon"
          style={{
            background: isDraft
              ? 'rgba(239,159,39,0.15)'
              : 'rgba(151,196,89,0.15)',
            color: isDraft
              ? 'var(--color-amber)'
              : 'var(--color-green)',
          }}
        >
          <i
            className={`ti ${isDraft ? 'ti-file' : 'ti-circle-check'}`}
            aria-hidden="true"
          ></i>
        </div>

        <h2 className="confirm-modal-title">
          {isDraft ? 'Draft saved!' : 'Event published!'}
        </h2>

        <p className="confirm-modal-sub">
          {isDraft
            ? 'Your event has been saved as a draft. You can continue editing and publish it when ready.'
            : 'Your event is live and open for registrations.'}
        </p>

        <div className="confirm-modal-btns">
          {isDraft ? (
            <button
              className="confirm-btn-primary"
              style={{gridColumn:'1/-1'}}
              onClick={onClose}
            >
              Back to Manage
            </button>
          ) : (
            <>
              <button className="confirm-btn-ghost" onClick={onClose}>
                Stay on page
              </button>
              <Link
                to="/events"
                className="confirm-btn-primary"
                onClick={onClose}
              >
                View the event
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ManageModal