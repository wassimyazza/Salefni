function AmortizationTable({ tableau }) {
  return (
    <div className="info-box">
      <h3>Tableau d'amortissement (3 premiers mois)</h3>
      <table>
        <thead>
          <tr>
            <th>Mois</th>
            <th>Mensualité</th>
            <th>Principal</th>
            <th>Intérêts</th>
            <th>Reste dû</th>
          </tr>
        </thead>
        <tbody>
          {tableau.map((ligne) => (
            <tr key={ligne.mois}>
              <td>{ligne.mois}</td>
              <td>{ligne.mensualite} €</td>
              <td>{ligne.principal} €</td>
              <td>{ligne.interets} €</td>
              <td>{ligne.reste} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AmortizationTable