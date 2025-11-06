import { useNavigate } from 'react-router-dom'
import AmortizationTable from './AmortizationTable'

function SimulationResult({ resultat, typeCredit, montant, duree, taux, simulationId }) {
  const navigate = useNavigate()

  function handleDemandeCredit() {
    navigate(`/request/new/${simulationId}`)
  }

  return (
    <div className="resultat">
      <h2>Résultat de votre simulation</h2>
      <div className="info-box">
        <p>Type de crédit : {typeCredit}</p>
        <p>Montant emprunté : {montant} €</p>
        <p>Durée : {duree} mois</p>
        <p>Taux annuel : {taux} %</p>
      </div>
      <div className="info-box highlight">
        <h3>Votre mensualité</h3>
        <p className="big-number">{resultat.mensualite} €</p>
      </div>
      <div className="info-box">
        <p>Montant total à rembourser : {resultat.coutTotal} €</p>
        <p>Coût du crédit : {resultat.coutCredit} €</p>
      </div>
      <AmortizationTable tableau={resultat.tableau} />
      <button onClick={handleDemandeCredit} className="btn-demande">Faire une demande de crédit</button>
    </div>
  )
}

export default SimulationResult