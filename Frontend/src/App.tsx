
import './App.css'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import SignupLoginForm from './Components/Signupform'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ServicesDash from './Pages/ServicesDash'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignupLoginForm />} />
          <Route path="/servicesdashboard" element={<ServicesDash />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
