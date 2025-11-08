import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function RequestForm() {
  const { simulationId } = useParams()
  const navigate = useNavigate()
  const [simulation, setSimulation] = useState(null)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [revenu, setRevenu] = useState('')
  const [situationPro, setSituationPro] = useState('CDI')
  const [commentaire, setCommentaire] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:3001/simulations/${simulationId}`)
      .then(response => {
        setSimulation(response.data)
      })
      .catch(error => {
        console.log('Erreur:', error)
      })
  }, [simulationId])

  function soumettredemande(e) {
    e.preventDefault()

    const nouvelleDemande = {
      nom: nom,
      email: email,
      telephone: telephone,
      revenu: revenu,
      situationPro: situationPro,
      commentaire: commentaire,
      montant: simulation.montant,
      statut: 'en_attente',
      date: new Date().toISOString(),
      simulationId: parseInt(simulationId),
      historique: [
        {
          statut: 'en_attente',
          date: new Date().toISOString()
        }
      ],
      notes: []
    }

    axios.post('http://localhost:3001/demandes', nouvelleDemande)
      .then(response => {
        const demandeCreee = response.data
        creerNotification(demandeCreee)
        alert('Votre demande a bien été envoyée !')
        navigate('/')
      })
      .catch(error => {
        console.log('Erreur:', error)
        alert('Erreur lors de l\'envoi de la demande')
      })
  }

  function creerNotification(demande) {
    const notification = {
      demandeId: demande.id,
      titre: "Nouvelle demande de crédit",
      message: `${demande.nom} a soumis une demande de crédit de ${demande.montant} €`,
      date: new Date().toISOString(),
      lue: false
    }
    
    axios.post('http://localhost:3001/notifications', notification)
      .then(() => {
        console.log('Notification créée avec succès')
      })
      .catch(error => {
        console.log('Erreur notification:', error)
      })
  }

  if(!simulation) {
    return <div className="loading">Chargement...</div>
  }

  return (
    <div className="request-form-container">
      <h1>Demande de Crédit</h1>
      
      <div className="simulation-recap">
        <h2>Récapitulatif de votre simulation</h2>
        <div className="recap-grid">
          <div className="recap-item">
            <span className="recap-label">Type de crédit :</span>
            <span className="recap-value">{simulation.typeCredit}</span>
          </div>
          <div className="recap-item">
            <span className="recap-label">Montant :</span>
            <span className="recap-value">{simulation.montant} €</span>
          </div>
          <div className="recap-item">
            <span className="recap-label">Durée :</span>
            <span className="recap-value">{simulation.duree} mois</span>
          </div>
          <div className="recap-item">
            <span className="recap-label">Mensualité :</span>
            <span className="recap-value highlight">{simulation.mensualite} €/mois</span>
          </div>
        </div>
      </div>

      <form onSubmit={soumettredemande}>
        <h2>Vos informations</h2>
        <div>
          <label>Nom complet</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div>
          <label>Téléphone</label>
          <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} required/>
        </div>
        <div>
          <label>Revenu mensuel (€)</label>
          <input type="number" value={revenu} onChange={(e) => setRevenu(e.target.value)} required/>
        </div>
        <div>
          <label>Situation professionnelle</label>
          <select value={situationPro} onChange={(e) => setSituationPro(e.target.value)} required>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Freelance">Freelance</option>
            <option value="Fonctionnaire">Fonctionnaire</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div>
          <label>Commentaire (optionnel)</label>
          <textarea value={commentaire} onChange={(e) => setCommentaire(e.target.value)} rows="4" placeholder="Informations complémentaires..."></textarea>
        </div>
        <button type="submit">Envoyer ma demande</button>
      </form>
    </div>
  )
}

export default RequestForm