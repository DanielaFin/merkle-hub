const participants = [
  { id: 1, initials: 'DS', name: 'Daisy Silva', role: 'Front-end Engineer', dietary: 'Vegan' },
  { id: 2, initials: 'NP', name: 'Nina Petersen', role: 'UX Designer', dietary: 'None' },
  { id: 3, initials: 'BH', name: 'Bobby Halsbeck', role: 'Project Manager', dietary: 'Gluten-free' },
  { id: 4, initials: 'NS', name: 'Nanna Sørensen', role: 'Developer', dietary: 'None' },
  { id: 5, initials: 'FH', name: 'Frederik Hansen', role: 'Strategist', dietary: 'Vegetarian' },
]

function ParticipantsModal({ event, onClose }) {
  return (
    <>
      <div className="notif-overlay" onClick={onClose}></div>
      <div className="participants-modal">
        <div className="notif-panel-header">
          <span className="notif-panel-title">Participants — {event.title}</span>
          <button className="notif-panel-close" onClick={onClose}>
            <i className="ti ti-x" aria-hidden="true"></i>
          </button>
        </div>
        <div className="participants-count">
          <span className="participants-count-val">{event.registered}</span>
          <span className="participants-count-label">of {event.capacity} spots filled</span>
          <div className="participants-progress-track">
            <div
              className="participants-progress-fill"
              style={{width:`${Math.round((event.registered / event.capacity) * 100)}%`}}
            ></div>
          </div>
        </div>
        <div className="participants-list">
          {participants.slice(0, event.registered).map(p => (
            <div key={p.id} className="participant-row">
              <div className="participant-avatar">{p.initials}</div>
              <div className="participant-info">
                <p className="participant-name">{p.name}</p>
                <p className="participant-role">{p.role}</p>
              </div>
              {p.dietary !== 'None' && (
                <span className="participant-dietary">{p.dietary}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ParticipantsModal