import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import RoomsListPage from './pages/RoomsListPage'
import Message from './components/Message'
import { useContext, useEffect } from 'react'
import { MessageContext } from './contexts/MessageWrapper'
import NavBar from './components/NavBar'
import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {
  const location = useLocation()
  const { setMessage } = useContext(MessageContext)

  useEffect(() => {
    setTimeout(_ => setMessage({ type: 'good', message: '' }), 1000)
  }, [location])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/browse' element={<HomePage />} />
          <Route path='/rooms' element={<RoomsListPage />} />
        </Route>
      </Routes>
      <Message />
    </>
  )
}

export default App
