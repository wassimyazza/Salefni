import { useState } from 'react'
import axios from 'axios'
import SimulationForm from '../components/SimulationForm'
import SimulationResult from '../components/SimulationResult'
import { calcMonthlyPayment, calcTotalCost, calcCreditCost, amortizationSchedule } from '../utils/loanCalc'

function Simulate() {
  const [resultat, setResultat] = useState(null)
  const [formData, setFormData] = useState(null)
  const [simulationId, setSimulationId] = useState(null)

  function handleCalculate(e) {
    e.preventDefault()
    const typeCredit = e.target.typeCredit.value
    const montant = e.target.montant.value
    const duree = e.target.duree.value
    const taux = e.target.taux.value

    const mensualite = calcMonthlyPayment(montant, duree, taux)
    const coutTotal = calcTotalCost(mensualite, duree)
    const coutCredit = calcCreditCost(coutTotal, montant)
    const tableau = amortizationSchedule(montant, duree, taux, mensualite)

    const resultatCalcul = {
      mensualite: mensualite.toFixed(2),
      coutTotal: coutTotal.toFixed(2),
      coutCredit: coutCredit.toFixed(2),
      tableau: tableau
    }

    setResultat(resultatCalcul)
    setFormData({ typeCredit, montant, duree, taux })
    enregistrerSimulation(typeCredit, montant, duree, taux, resultatCalcul)
  }

  function enregistrerSimulation(typeCredit, montant, duree, taux, resultatCalcul) {
    const simulation = {
      typeCredit: typeCredit,
      montant: montant,
      duree: duree,
      taux: taux,
      mensualite: resultatCalcul.mensualite,
      coutTotal: resultatCalcul.coutTotal,
      coutCredit: resultatCalcul.coutCredit,
      date: new Date().toISOString()
    }

    axios.post('http://localhost:3001/simulations', simulation)
      .then(response => {
        setSimulationId(response.data.id)
      })
      .catch(error => {
        console.log('Erreur:', error)
      })
  }

  return (
    <div>
      <SimulationForm onCalculate={handleCalculate} />
      {resultat && formData && (
        <SimulationResult 
          resultat={resultat} 
          typeCredit={formData.typeCredit}
          montant={formData.montant}
          duree={formData.duree}
          taux={formData.taux}
          simulationId={simulationId}
        />
      )}
    </div>
  )
}

export default Simulate