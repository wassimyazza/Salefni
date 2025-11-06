import { useState } from 'react'

function SimulationPage() {
  const [typeCredit, setTypeCredit] = useState('consommation')
  const [montant, setMontant] = useState('')
  const [duree, setDuree] = useState('')
  const [taux, setTaux] = useState('')
  const [resultat, setResultat] = useState(null)

  function calculerCredit() {
    const m = parseFloat(montant)
    const d = parseFloat(duree)
    const tauxNum = parseFloat(taux)
    const t = tauxNum / 100 / 12
    const mensualiteCalculee = (m * t) / (1 - Math.pow(1 + t, -d))
    const total = mensualiteCalculee * d
    const coutCredit = total - m

    setResultat({
      mensualite: mensualiteCalculee.toFixed(2),
      coutTotal: total.toFixed(2),
      coutCredit: coutCredit.toFixed(2)
    })
  }

  return (
    <div>
      <h1>Simulation de Crédit</h1>
      <div>
        <label>Type de crédit</label>
        <select value={typeCredit} onChange={(e) => setTypeCredit(e.target.value)}>
          <option value="consommation">Crédit Consommation</option>
          <option value="auto">Crédit Auto</option>
          <option value="immobilier">Crédit Immobilier</option>
        </select>
      </div>
      <div>
        <label>Montant (€)</label>
        <input type="number" value={montant} onChange={(e) => setMontant(e.target.value)}/>
      </div>
      <div>
        <label>Durée (mois)</label>
        <input type="number" value={duree} onChange={(e) => setDuree(e.target.value)}/>
      </div>
      <div>
        <label>Taux annuel (%)</label>
        <input type="number" step="0.1" value={taux} onChange={(e) => setTaux(e.target.value)}/>
      </div>
      <button onClick={calculerCredit}>Calculer ma simulation</button>
      {resultat && (
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
        </div>
      )}
    </div>
  )
}

export default SimulationPage