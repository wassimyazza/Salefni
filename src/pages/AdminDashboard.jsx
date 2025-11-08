import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminDashboard() {
  const navigate = useNavigate()
  const [demandes, setDemandes] = useState([])
  const [filtreStatut, setFiltreStatut] = useState('tous')
  const [triPar, setTriPar] = useState('date')

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin')
    if(isAdmin !== 'true') {
      navigate('/admin')
    }
  }, [navigate])

  useEffect(() => {
    axios.get('http://localhost:3001/demandes')
      .then(response => {
        setDemandes(response.data)
      })
      .catch(error => {
        console.log('Erreur:', error)
      })
  }, [])

  function handleLogout() {
    localStorage.removeItem('isAdmin')
    navigate('/admin')
  }

  function getDemandesFiltrees() {
    let demandesFiltrees = demandes
    if(filtreStatut !== 'tous') {
      demandesFiltrees = demandes.filter(d => d.statut === filtreStatut)
    }
    return demandesFiltrees
  }

  function getDemandesTriees() {
    let demandesTriees = [...getDemandesFiltrees()]
    if(triPar === 'date') {
      demandesTriees.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if(triPar === 'nom') {
      demandesTriees.sort((a, b) => a.nom.localeCompare(b.nom))
    } else if(triPar === 'statut') {
      demandesTriees.sort((a, b) => a.statut.localeCompare(b.statut))
    }
    return demandesTriees
  }

  function exporterCSV() {
    const demandesAExporter = getDemandesTriees()
    
    const headers = ['ID', 'Nom', 'Email', 'Téléphone', 'Montant', 'Statut', 'Date', 'Revenu', 'Situation Pro']
    const lignes = demandesAExporter.map(d => [
      d.id,
      d.nom,
      d.email,
      d.telephone,
      d.montant,
      d.statut,
      new Date(d.date).toLocaleDateString(),
      d.revenu || '',
      d.situationPro || ''
    ])
    
    let csvContent = headers.join(',') + '\n'
    lignes.forEach(ligne => {
      csvContent += ligne.join(',') + '\n'
    })
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `demandes_credit_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function getStatutBadge(statut) {
    const badges = {
      'en_attente': 'badge-attente',
      'en_cours': 'badge-cours',
      'acceptee': 'badge-accepte',
      'refusee': 'badge-refuse'
    }
    return badges[statut] || ''
  }

  function getStatutTexte(statut) {
    const textes = {
      'en_attente': 'En attente',
      'en_cours': 'En cours',
      'acceptee': 'Acceptée',
      'refusee': 'Refusée'
    }
    return textes[statut] || statut
  }

  const demandesAffichees = getDemandesTriees()

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Tableau de bord - Demandes de crédit</h1>
        <div className="admin-header-actions">
          <button onClick={exporterCSV} className="btn-export">📥 Exporter en CSV</button>
          <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
        </div>
      </div>
      
      <div className="admin-filters">
        <div className="filter-group">
          <label>Filtrer par statut :</label>
          <select value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}>
            <option value="tous">Tous</option>
            <option value="en_attente">En attente</option>
            <option value="en_cours">En cours</option>
            <option value="acceptee">Acceptée</option>
            <option value="refusee">Refusée</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Trier par :</label>
          <select value={triPar} onChange={(e) => setTriPar(e.target.value)}>
            <option value="date">Date</option>
            <option value="nom">Nom</option>
            <option value="statut">Statut</option>
          </select>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>{demandes.length}</h3>
          <p>Total demandes</p>
        </div>
        <div className="stat-card">
          <h3>{demandes.filter(d => d.statut === 'en_attente').length}</h3>
          <p>En attente</p>
        </div>
        <div className="stat-card">
          <h3>{demandes.filter(d => d.statut === 'acceptee').length}</h3>
          <p>Acceptées</p>
        </div>
        <div className="stat-card">
          <h3>{demandes.filter(d => d.statut === 'refusee').length}</h3>
          <p>Refusées</p>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandesAffichees.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">Aucune demande pour le moment</td>
              </tr>
            ) : (
              demandesAffichees.map((demande) => (
                <tr key={demande.id}>
                  <td>{demande.id}</td>
                  <td>{demande.nom}</td>
                  <td>{demande.email}</td>
                  <td>{demande.montant} €</td>
                  <td>
                    <span className={`badge ${getStatutBadge(demande.statut)}`}>
                      {getStatutTexte(demande.statut)}
                    </span>
                  </td>
                  <td>{new Date(demande.date).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-view" onClick={() => navigate(`/admin/demande/${demande.id}`)}>Voir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard