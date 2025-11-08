import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Simulate from './pages/Simulate'
import RequestForm from './pages/RequestForm'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import DemandeDetail from './pages/DemandeDetail'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Simulate />} />
          <Route path="/request/new/:simulationId" element={<RequestForm />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/demande/:id" element={<DemandeDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App