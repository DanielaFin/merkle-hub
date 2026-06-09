import { useState } from 'react'
import { user } from '../data/events'

const dietaryOptions = [
  'Vegan', 'Gluten-free', 'Vegetarian',
  'Pregnancy', 'Lactose-free', 'Pescetarian',
]

const categoryOptions = [
  { name: 'Creative'},
  { name: 'Food'},
  { name: 'Drinks'},
  { name: 'Sports'},
  { name: 'Social'},
  { name: 'Company'},
]

export default function PreferencesPanel({ onClose }) {
  const [selectedDietary, setSelectedDietary] = useState(
    user.dietaryPreference ? [user.dietaryPreference] : []
  )
  const [selectedCategories, setSelectedCategories] = useState(
    user.favouriteCategories || []
  )

  const toggleDietary = (option) => {
    setSelectedDietary(prev =>
      prev.includes(option) ? prev.filter(d => d !== option) : [...prev, option]
    )
  }

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  return (
    <>
      <div className="notif-overlay" onClick={onClose}></div>
      <div className="pref-panel notif-panel-open">
        <div className="notif-panel-header">
          <span className="notif-panel-title">Edit my preferences</span>
          <button className="notif-panel-close" onClick={onClose}>
            <i className="ti ti-x" aria-hidden="true"></i>
          </button>
        </div>

        <div className="pref-panel-body">
          <div className="pref-panel-section">
            <p className="pref-panel-section-title">Dietary preference</p>
            <p className="pref-panel-section-sub">Select all that apply</p>
            <div className="pref-options-grid">
              {dietaryOptions.map(option => (
                <button
                  key={option}
                  className={`pref-option-btn ${selectedDietary.includes(option) ? 'pref-option-btn-active' : ''}`}
                  onClick={() => toggleDietary(option)}
                >
                  {selectedDietary.includes(option) && (
                    <i className="ti ti-check" style={{fontSize:'11px'}} aria-hidden="true"></i>
                  )}
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="pref-panel-divider"></div>

          <div className="pref-panel-section">
            <p className="pref-panel-section-title">Favourite categories</p>
            <p className="pref-panel-section-sub">Get notified about events in these categories</p>
            <div className="pref-options-grid">
              {categoryOptions.map(cat => (
                <button
                  key={cat.name}
                  className={`pref-option-btn ${selectedCategories.includes(cat.name) ? 'pref-option-btn-active' : ''}`}
                  onClick={() => toggleCategory(cat.name)}
                >
                  {selectedCategories.includes(cat.name) && (
                    <i className="ti ti-check" style={{fontSize:'11px'}} aria-hidden="true"></i>
                  )}
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pref-panel-footer">
          <button className="pref-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="pref-btn-save" onClick={onClose}>Save preferences</button>
        </div>
      </div>
    </>
  )
}