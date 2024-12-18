import './App.css'
import { useContext, useEffect, useState } from 'react'
import { Routes, Route, useLocation, data } from 'react-router-dom'

import { MessageContext } from './contexts/MessageWrapper'
import ProtectedRoutes from './utils/ProtectedRoutes'

import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import RoomsListPage from './pages/RoomsListPage'
import ProfilePage from './pages/ProfilePage'
import TestPage from './pages/TestPage'

import Message from './components/Message'
import NavBar from './components/NavBar'
import ExtensionIndicator from './components/ExtensionIndicator'
import RoomMessengerPage from './pages/RoomMessengerPage'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const location = useLocation()
  const { setMessage } = useContext(MessageContext)

  useEffect(() => {
    setTimeout(_ => setMessage({ type: 'good', message: '' }), 1000)
  }, [location])

  // Close Navbar's Submenus
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const [desktopMenuIsOpen, setDesktopMenuIsOpen] = useState(false)

  function closeSubmenu() {
    setDesktopMenuIsOpen(false)
    setMobileMenuIsOpen(false)
  }

  return (
    <>
      <NavBar
        mobileMenuIsOpen={mobileMenuIsOpen}
        setMobileMenuIsOpen={setMobileMenuIsOpen}
        desktopMenuIsOpen={desktopMenuIsOpen}
        setDesktopMenuIsOpen={setDesktopMenuIsOpen}
      />
      <ExtensionIndicator />
      <Message />

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/browse' element={<HomePage />} />
          <Route path='/rooms' element={<RoomsListPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/rooms/:roomId' element={<RoomMessengerPage />} />
          <Route path='/test' element={<TestPage />} />
        </Route>
      </Routes>
      <Message />
    </>
  )
}

export default App
