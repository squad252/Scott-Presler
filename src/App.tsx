import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeroSectionMain from './Pages/HeroSection'
import ProtectedRoute from './lib/ProtectedRoute'
import Admin from './Pages/Admin'


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HeroSectionMain />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </>
  )
}

export default App
