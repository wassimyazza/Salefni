import { useState } from 'react'

function SimulationPage() {
  const [typeCredit, setTypeCredit] = useState('consommation')
  const [montant, setMontant] = useState('')
  const [duree, setDuree] = useState('')
  const [taux, setTaux] = useState('')
  const [mensualite, setMensualite] = useState(0)
  const [coutTotal, setCoutTotal] = useState(0)

  function calculerCredit() {
    const m = parseFloat(montant)
    const d = parseFloat(duree)
    const t = parseFloat(taux) / 100 / 12
    const mensualiteCalculee = (m * t) / (1 - Math.pow(1 + t, -d))
    const total = mensualiteCalculee * d
    setMensualite(mensualiteCalculee.toFixed(2))
    setCoutTotal(total.toFixed(2))
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
        <input type="number" value={taux} onChange={(e) => setTaux(e.target.value)}/>
      </div>
      <button onClick={calculerCredit}>Calculer ma simulation</button>
      {mensualite > 0 && (
        <div className="resultat">
          <h2>Résultat de votre simulation</h2>
          <p>Type de crédit : {typeCredit}</p>
          <p>Mensualité : {mensualite} €/mois</p>
          <p>Coût total du crédit : {coutTotal} €</p>
          <p>Montant emprunté : {montant} €</p>
          <p>Coût du crédit : {(coutTotal - montant).toFixed(2)} €</p>
        </div>
      )}
    </div>
  )
}

export default SimulationPage