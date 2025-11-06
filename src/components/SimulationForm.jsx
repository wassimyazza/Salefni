function SimulationForm({ onCalculate }) {
  return (
    <div>
      <h1>Simulation de Crédit</h1>
      <form onSubmit={onCalculate}>
        <div>
          <label>Type de crédit</label>
          <select name="typeCredit" required>
            <option value="consommation">Crédit Consommation</option>
            <option value="auto">Crédit Auto</option>
            <option value="immobilier">Crédit Immobilier</option>
          </select>
        </div>
        <div>
          <label>Montant (€)</label>
          <input type="number" name="montant" min="1000" required/>
        </div>
        <div>
          <label>Durée (mois)</label>
          <input type="number" name="duree" max="480" required/>
        </div>
        <div>
          <label>Taux annuel (%)</label>
          <input type="number" name="taux" step="0.1" min="0.1" required/>
        </div>
        <button type="submit">Calculer ma simulation</button>
      </form>
    </div>
  )
}

export default SimulationForm