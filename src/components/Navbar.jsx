import { Link } from 'react-router-dom'
import NotificationBell from './NotificationBell'

function Navbar() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h2 className="navbar-logo">Salefni</h2>
        <div className="navbar-links">
          <Link to="/">Simulation</Link>
          <Link to="/admin">Admin</Link>
          {isAdmin && <NotificationBell />}
        </div>
      </div>
    </nav>
  )
}

export default Navbar