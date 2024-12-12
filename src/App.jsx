import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import RoomsListPage from './pages/RoomsListPage'
import Message from './components/Message'
import { useContext, useEffect } from 'react'
import { MessageContext } from './contexts/MessageWrapper'

function App() {
  const location = useLocation()
  const { setMessage } = useContext(MessageContext)

  useEffect(() => {
    setTimeout(_ => setMessage({ type: 'good', message: '' }), 1000)
  }, [location])
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/browse' element={<HomePage />} />
        <Route path='/rooms' element={<RoomsListPage />} />
      </Routes>
      <Message />
    </>
  )
}

export default App
