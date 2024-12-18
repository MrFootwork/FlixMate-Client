import './NavBar.css'
import logo from '../assets/images/logo.png'

import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { Sling as Hamburger } from 'hamburger-react'

import config from '../../config'

import { MessageContext } from '../contexts/MessageWrapper'
import { AuthContext } from '../contexts/AuthWrapper'
import { ThemeContext } from '../contexts/ThemeWrapper'

import SearchBar from './SearchBar'
import NavSelectOption from './NavSelectOption'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

const API_URL = config.API_URL
const pathsWithoutNav = ['/', '/auth']

function NavBar({
  desktopMenuIsOpen,
  mobileMenuIsOpen,
  setDesktopMenuIsOpen,
  setMobileMenuIsOpen,
}) {
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })

  const { setMessage } = useContext(MessageContext)
  const { setUser } = useContext(AuthContext)

  // PATH CHECK
  const location = useLocation()
  const [onPathWithNav, setOnPathWithNav] = useState(false)

  useEffect(() => {
    const onWhiteListedPath = !pathsWithoutNav.includes(location.pathname)

    if (onWhiteListedPath) setOnPathWithNav(true)
    if (!onWhiteListedPath) setOnPathWithNav(false)
  }, [location])

  // AUTH HANDLING
  // TODO use logout function from AuthContext instead
  async function handleLogOut() {
    const { data } = await axios.post(
      API_URL + '/auth/logout',
      {},
      { withCredentials: true }
    )
    console.log('LOGOUT RESPONSE: ', data)

    // Logout
    setUser(null)
    window.localStorage.removeItem('flixmateToken')

    // Notify extension about Logout
    document.dispatchEvent(new Event('FlixMateDisconnect'))

    setMessage({ type: 'good', message: 'Succesfully logged out!' })
  }

  // THEME TOGGLING
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [isDarkMode, setDarkMode] = useState(false)

  useEffect(() => {
    setDarkMode(theme === 'dark')
  }, [theme])

  const toggleDarkMode = checked => {
    setDarkMode(checked)
    toggleTheme()
  }

  // SUBMENU HANDLING
  function toggleSubmenu() {
    setDesktopMenuIsOpen(!desktopMenuIsOpen)
    setMobileMenuIsOpen(!mobileMenuIsOpen)
  }

  return (
    <nav className={`navbar-container ${onPathWithNav ? 'visible' : ''}`}>
      {/* Navbar */}
      <>
        <Link to='/browse' className='image-container'>
          <img src={logo} alt='FlixMate Logo' />
        </Link>
        <SearchBar />

        {/* Mobile */}
        {isMobile && (
          <>
            <DarkModeSwitch
              // style={{ marginBottom: '2rem' }}
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={'2rem'}
            />
            <Hamburger
              toggled={mobileMenuIsOpen}
              toggle={setMobileMenuIsOpen}
            />
          </>
        )}

        {/* Desktop */}
        {!isMobile && (
          <>
            {/* FIXME apply NavLink styles */}
            <NavLink to='/browse'>Movies</NavLink>
            <NavLink to='/rooms'>Rooms</NavLink>
            <DarkModeSwitch
              // style={{ marginBottom: '2rem' }}
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={'2rem'}
            />
            <NavSelectOption
              handleLogOut={handleLogOut}
              submenuVisible={desktopMenuIsOpen}
              toggleSubmenu={toggleSubmenu}
            />
          </>
        )}
      </>

      {/* Mobile NavBar Options*/}
      {isMobile && (
        <ul
          className={
            'option-container mobile' + (mobileMenuIsOpen ? ' isActive' : '')
          }
          onClick={toggleSubmenu}
        >
          <li>
            <NavLink to='/browse'>Movies</NavLink>
          </li>
          <li>
            <NavLink to='/rooms'>Rooms</NavLink>
          </li>
          <li>
            <NavLink to='/profile'>Profile</NavLink>
          </li>
          <li>
            <NavLink to='/auth' onClick={handleLogOut}>
              Log Out
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default NavBar
