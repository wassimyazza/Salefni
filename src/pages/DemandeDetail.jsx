import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function DemandeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [demande, setDemande] = useState(null)
  const [simulation, setSimulation] = useState(null)
  const [nouveauStatut, setNouveauStatut] = useState('')
  const [nouvelleNote, setNouvelleNote] = useState('')

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin')
    if(isAdmin !== 'true') {
      navigate('/admin')
    }
  }, [navigate])

  useEffect(() => {
    chargerDemande()
  }, [id])

  function chargerDemande() {
    axios.get(`http://localhost:3001/demandes/${id}`)
      .then(response => {
        setDemande(response.data)
        setNouveauStatut(response.data.statut)
        if(response.data.simulationId) {
          axios.get(`http://localhost:3001/simulations/${response.data.simulationId}`)
            .then(res => {
              setSimulation(res.data)
            })
        }
      })
      .catch(error => {
        console.log('Erreur:', error)
      })
  }

  function changerStatut() {
    const nouvelHistorique = demande.historique || []
    nouvelHistorique.push({
      statut: nouveauStatut,
      date: new Date().toISOString()
    })

    const demandeModifiee = {
      ...demande,
      statut: nouveauStatut,
      historique: nouvelHistorique
    }

    axios.put(`http://localhost:3001/demandes/${id}`, demandeModifiee)
      .then(() => {
        alert('Statut mis à jour avec succès !')
        chargerDemande()
      })
      .catch(error => {
        console.log('Erreur:', error)
        alert('Erreur lors de la mise à jour')
      })
  }

  function ajouterNote() {
    if(nouvelleNote.trim() === '') {
      alert('Veuillez saisir une note')
      return
    }

    const notesExistantes = demande.notes || []
    notesExistantes.push({
      auteur: 'Admin',
      date: new Date().toISOString(),
      contenu: nouvelleNote
    })

    const demandeModifiee = {
      ...demande,
      notes: notesExistantes
    }

    axios.put(`http://localhost:3001/demandes/${id}`, demandeModifiee)
      .then(() => {
        alert('Note ajoutée avec succès !')
        setNouvelleNote('')
        chargerDemande()
      })
      .catch(error => {
        console.log('Erreur:', error)
        alert('Erreur lors de l\'ajout de la note')
      })
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

  if(!demande) {
    return <div className="loading">Chargement...</div>
  }

  return (
    <div className="demande-detail-container">
      <div className="detail-header">
        <button onClick={() => navigate('/admin/dashboard')} className="btn-back">← Retour</button>
        <h1>Détail de la demande #{demande.id}</h1>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h2>Informations du demandeur</h2>
          <div className="info-row">
            <span className="info-label">Nom complet :</span>
            <span className="info-value">{demande.nom}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email :</span>
            <span className="info-value">{demande.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Téléphone :</span>
            <span className="info-value">{demande.telephone}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Revenu mensuel :</span>
            <span className="info-value">{demande.revenu} €</span>
          </div>
          <div className="info-row">
            <span className="info-label">Situation professionnelle :</span>
            <span className="info-value">{demande.situationPro}</span>
          </div>
          {demande.commentaire && (
            <div className="info-row-full">
              <span className="info-label">Commentaire :</span>
              <p className="info-value">{demande.commentaire}</p>
            </div>
          )}
        </div>

        <div className="detail-card">
          <h2>Simulation associée</h2>
          {simulation ? (
            <>
              <div className="info-row">
                <span className="info-label">Type de crédit :</span>
                <span className="info-value">{simulation.typeCredit}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Montant emprunté :</span>
                <span className="info-value">{simulation.montant} €</span>
              </div>
              <div className="info-row">
                <span className="info-label">Durée :</span>
                <span className="info-value">{simulation.duree} mois</span>
              </div>
              <div className="info-row">
                <span className="info-label">Taux annuel :</span>
                <span className="info-value">{simulation.taux} %</span>
              </div>
              <div className="info-row highlight-row">
                <span className="info-label">Mensualité :</span>
                <span className="info-value highlight-value">{simulation.mensualite} €</span>
              </div>
              <div className="info-row">
                <span className="info-label">Coût total :</span>
                <span className="info-value">{simulation.coutTotal} €</span>
              </div>
            </>
          ) : (
            <p>Aucune simulation associée</p>
          )}
        </div>

        <div className="detail-card">
          <h2>Statut actuel</h2>
          <div className="statut-current">
            <span className={`badge ${getStatutBadge(demande.statut)}`}>
              {getStatutTexte(demande.statut)}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Date de création :</span>
            <span className="info-value">{new Date(demande.date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="detail-card">
          <h2>Changer le statut</h2>
          <div className="statut-change-section">
            <label>Nouveau statut :</label>
            <select value={nouveauStatut} onChange={(e) => setNouveauStatut(e.target.value)} className="statut-select">
              <option value="en_attente">En attente</option>
              <option value="en_cours">En cours</option>
              <option value="acceptee">Acceptée</option>
              <option value="refusee">Refusée</option>
            </select>
            <button onClick={changerStatut} className="btn-update-statut" disabled={nouveauStatut === demande.statut}>
              Mettre à jour le statut
            </button>
          </div>
        </div>

        <div className="detail-card full-width">
          <h2>Historique des statuts</h2>
          {demande.historique && demande.historique.length > 0 ? (
            <div className="historique-list">
              {demande.historique.map((item, index) => (
                <div key={index} className="historique-item">
                  <span className={`badge ${getStatutBadge(item.statut)}`}>
                    {getStatutTexte(item.statut)}
                  </span>
                  <span className="historique-date">
                    {new Date(item.date).toLocaleDateString()} à {new Date(item.date).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun historique disponible</p>
          )}
        </div>

        <div className="detail-card full-width">
          <h2>Ajouter une note interne</h2>
          <div className="note-form">
            <textarea value={nouvelleNote} onChange={(e) => setNouvelleNote(e.target.value)} placeholder="Saisir votre note ici..." rows="4" className="note-textarea"></textarea>
            <button onClick={ajouterNote} className="btn-add-note">Ajouter la note</button>
          </div>
        </div>

        <div className="detail-card full-width">
          <h2>Notes internes ({demande.notes ? demande.notes.length : 0})</h2>
          {demande.notes && demande.notes.length > 0 ? (
            <div className="notes-list">
              {demande.notes.map((note, index) => (
                <div key={index} className="note-item">
                  <div className="note-header">
                    <span className="note-author">{note.auteur}</span>
                    <span className="note-date">{new Date(note.date).toLocaleDateString()} à {new Date(note.date).toLocaleTimeString()}</span>
                  </div>
                  <p className="note-content">{note.contenu}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucune note interne</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DemandeDetail