import './NavBar.css'
import logo from '../assets/images/logo.png'

import React, { useState, useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'

import { MessageContext } from '../contexts/MessageWrapper'
import { AuthContext } from '../contexts/AuthWrapper'

import SearchBar from './SearchBar'
import NavSelectOption from './NavSelectOption'
import { Sling as Hamburger } from 'hamburger-react'

const API_URL = import.meta.env.VITE_API_URL
const pathsWithoutNav = ['/', '/auth']

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })
  const [mobileMenuIsOpen, setMobileMenu] = useState(false)
  const [onPathWithNav, setOnPathWithNav] = useState(false)

  const { setMessage } = useContext(MessageContext)
  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    const onWhiteListedPath = !pathsWithoutNav.includes(location.pathname)

    if (onWhiteListedPath) setOnPathWithNav(true)
    if (!onWhiteListedPath) setOnPathWithNav(false)
  }, [location])

  function createRoom() {
    console.log('Creating a room...')
  }

  // FIXME use logout function from AuthContext instead
  async function handleLogOut() {
    const { data } = await axios.post(
      API_URL + '/auth/logout',
      {},
      { withCredentials: true }
    )
    console.log(data)

    // Logout
    setUser(null)
    window.localStorage.removeItem('flixmateToken')

    // Notify extension about Logout
    document.dispatchEvent(new Event('FlixMateDisconnect'))

    setMessage({ type: 'good', message: 'Succesfully logged out!' })
    navigate('/')
  }

  return (
    <div className={`navbar-container ${onPathWithNav ? 'visible' : ''}`}>
      {/* Mobile NavBar*/}
      {isMobile && (
        <>
          <div className='image-container'>
            <img src={logo} alt='FlixMate Logo' />
          </div>
          <SearchBar />
          <Hamburger toggled={mobileMenuIsOpen} toggle={setMobileMenu} />
        </>
      )}

      {/* Mobile NavBar Options*/}
      {isMobile && (
        <ul
          className={
            'option-container mobile' + (mobileMenuIsOpen ? ' isActive' : '')
          }
          onClick={() => setMobileMenu(!mobileMenuIsOpen)}
        >
          <li>
            <Link to='/rooms'>Rooms</Link>
          </li>
          <li>
            <Link to={'/profile'}>Profile</Link>
          </li>
          <li onClick={handleLogOut}>Log Out</li>
        </ul>
      )}

      {/* Desktop NavBar*/}
      {!isMobile && (
        <>
          <div className='image-container'>
            <img src={logo} alt='FlixMate Logo' />
          </div>
          <SearchBar />
          <Link onClick={createRoom}>Rooms</Link>
          <NavSelectOption handleLogOut={handleLogOut} />
        </>
      )}
    </div>
  )
}

export default NavBar
