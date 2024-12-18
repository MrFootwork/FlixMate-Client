import './App.css'
import { useContext, useEffect } from 'react'
import { Routes, Route, useLocation, data } from 'react-router-dom'
import axios from 'axios'

import { MessageContext } from './contexts/MessageWrapper'
import { AuthContext } from './contexts/AuthWrapper'
import ProtectedRoutes from './utils/ProtectedRoutes'

import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import RoomsListPage from './pages/RoomsListPage'
import ProfilePage from './pages/ProfilePage'

import Message from './components/Message'
import NavBar from './components/NavBar'
import ExtensionIndicator from './components/ExtensionIndicator'
import RoomMessengerPage from './pages/RoomMessengerPage'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const location = useLocation()
  const { setMessage } = useContext(MessageContext)
  const { setUser, token, setToken } = useContext(AuthContext)

  useEffect(() => {
    setTimeout(_ => setMessage({ type: 'good', message: '' }), 1000)
  }, [location])

  useEffect(() => {
    setToken(window.localStorage.getItem('flixmateToken'))

    axios
      .get(API_URL + '/users/me', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            'flixmateToken'
          )}`,
        },
      })
      .then(({ data }) => {
        setUser(data)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      <NavBar />
      <ExtensionIndicator />

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/browse' element={<HomePage />} />
          <Route path='/rooms' element={<RoomsListPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/rooms/:roomId' element={<RoomMessengerPage />} />
        </Route>
      </Routes>
      <Message />
    </>
  )
}

export default App
