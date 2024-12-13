import './App.css'
import { Routes, Route, useLocation, data } from 'react-router-dom'
import axios from 'axios'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import RoomsListPage from './pages/RoomsListPage'
import Message from './components/Message'
import { useContext, useEffect } from 'react'
import { MessageContext } from './contexts/MessageWrapper'
import NavBar from './components/NavBar'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { AuthContext } from './contexts/AuthWrapper'
import ProfilePage from './pages/ProfilePage'

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
    console.log('Token from app load: ', token)
    axios
      .get(API_URL + '/users/me', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            'flixmateToken'
          )}`,
        },
      })
      .then(({ data }) => {
        console.log(data)
        setUser(data)
      })
  }, [])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/browse' element={<HomePage />} />
          <Route path='/rooms' element={<RoomsListPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
      </Routes>
      <Message />
    </>
  )
}

export default App
