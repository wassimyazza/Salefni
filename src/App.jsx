import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Simulate from './pages/Simulate'
import RequestForm from './pages/RequestForm'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Simulate />} />
          <Route path="/request/new/:simulationId" element={<RequestForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App