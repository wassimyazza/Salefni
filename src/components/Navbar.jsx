import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h2 className="navbar-logo">Salefni</h2>
        <div className="navbar-links">
          <Link to="/">Simulation</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar