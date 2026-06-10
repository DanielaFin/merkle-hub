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
            : 'Your event is now live and visible to all Merkle employees. Registrations will appear in your event table.'}
        </p>

        <div className="confirm-modal-btns" style={{gridTemplateColumns:'1fr'}}>
          <button className="confirm-btn-primary" onClick={onClose}>
            {isDraft ? 'Back to Manage' : 'View your events'}
          </button>
        </div>
      </div>
    </>
  )
}

export default ManageModal