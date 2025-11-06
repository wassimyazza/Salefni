export function calcMonthlyPayment(montant, duree, taux) {
  const m = parseFloat(montant)
  const d = parseFloat(duree)
  const t = parseFloat(taux) / 100 / 12
  const mensualite = (m * t) / (1 - Math.pow(1 + t, -d))
  return mensualite
}

export function calcTotalCost(mensualite, duree) {
  return mensualite * parseFloat(duree)
}

export function calcCreditCost(totalCost, montant) {
  return totalCost - parseFloat(montant)
}

export function amortizationSchedule(montant, duree, taux, mensualite) {
  const m = parseFloat(montant)
  const d = parseFloat(duree)
  const t = parseFloat(taux) / 100 / 12
  let tableau = []
  let capital = m
  const maxRows = d < 3 ? d : 3
  for(let i = 1; i <= maxRows; i++) {
    let interets = capital * t
    let principal = mensualite - interets
    capital = capital - principal
    tableau.push({
      mois: i,
      mensualite: mensualite.toFixed(2),
      principal: principal.toFixed(2),
      interets: interets.toFixed(2),
      reste: capital.toFixed(2)
    })
  }
  return tableau
}