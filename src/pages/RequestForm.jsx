import { useParams } from 'react-router-dom'

function RequestForm() {
  const { simulationId } = useParams()

  return (
    <div>
      <h1>Demande de Crédit</h1>
      <p>Simulation ID : {simulationId}</p>
      <p>Formulaire de demande à venir...</p>
    </div>
  )
}

export default RequestForm