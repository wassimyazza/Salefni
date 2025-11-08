import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function NotificationBell() {
  const [notifications, setNotifications] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    chargerNotifications()
    const interval = setInterval(chargerNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  function chargerNotifications() {
    axios.get('http://localhost:3001/notifications?lue=false')
      .then(response => {
        setNotifications(response.data)
      })
      .catch(error => {
        console.log('Erreur:', error)
      })
  }

  function marquerCommeLue(id) {
    axios.patch(`http://localhost:3001/notifications/${id}`, { lue: true })
      .then(() => {
        chargerNotifications()
      })
      .catch(error => {
        console.log('Erreur:', error)
      })
  }

  function voirDemande(notification) {
    marquerCommeLue(notification.id)
    setShowDropdown(false)
    navigate(`/admin/demande/${notification.demandeId}`)
  }

  function marquerToutCommeLu() {
    const promises = notifications.map(notif => 
      axios.patch(`http://localhost:3001/notifications/${notif.id}`, { lue: true })
    )
    Promise.all(promises).then(() => {
      chargerNotifications()
    })
  }

  return (
    <div className="notification-container">
      <button className="notification-bell" onClick={() => setShowDropdown(!showDropdown)}>
        🔔
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </button>
      {showDropdown && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications ({notifications.length})</h3>
            {notifications.length > 0 && (
              <button onClick={marquerToutCommeLu} className="btn-mark-all">Tout marquer comme lu</button>
            )}
          </div>
          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="no-notifications">Aucune nouvelle notification</p>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className="notification-item" onClick={() => voirDemande(notif)}>
                  <div className="notification-content">
                    <p className="notification-title">{notif.titre}</p>
                    <p className="notification-message">{notif.message}</p>
                    <span className="notification-time">{new Date(notif.date).toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell