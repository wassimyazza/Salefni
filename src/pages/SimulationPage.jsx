import { useState } from 'react'

function SimulationPage() {
  const [montant, setMontant] = useState('')
  const [duree, setDuree] = useState('')
  const [taux, setTaux] = useState('')
  const [mensualite, setMensualite] = useState(0)

  function calculerCredit() {
    const m = parseFloat(montant)
    const d = parseFloat(duree)
    const t = parseFloat(taux) / 100 / 12
    const mensualiteCalculee = (m * t) / (1 - Math.pow(1 + t, -d))
    setMensualite(mensualiteCalculee.toFixed(2))
  }

  return (
    <div>
      <h1>Simulation de Crédit</h1>
      <div>
        <label>Montant (€)</label>
        <input type="number" value={montant} onChange={(e) => setMontant(e.target.value)}/>
      </div>
      <div>
        <label>Durée (mois)</label>
        <input type="number" value={duree} onChange={(e) => setDuree(e.target.value)}/>
      </div>
      <div>
        <label>Taux (%)</label>
        <input type="number" value={taux} onChange={(e) => setTaux(e.target.value)}/>
      </div>
      <button onClick={calculerCredit}>Calculer</button>
      {mensualite > 0 && (
        <div>
          <h2>Résultat</h2>
          <p>Mensualité : {mensualite} €</p>
        </div>
      )}
    </div>
  )
}

export default SimulationPage