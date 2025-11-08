import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    if(email === 'admin@salefni.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true')
      navigate('/admin/dashboard')
    } else {
      alert('Email ou mot de passe incorrect')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Connexion Admin</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div>
            <label>Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <button type="submit">Se connecter</button>
        </form>
        <div className="login-info">
          <p>Email : admin@salefni.com</p>
          <p>Mot de passe : admin123</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin