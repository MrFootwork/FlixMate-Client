import './NavBar.css'
import logo from '../assets/images/logo.png'

import axios from 'axios'
import { useState, useContext, useEffect, useRef } from 'react'
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

function NavBar() {
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
  const [mobileMenuIsOpen, setMobileMenu] = useState(false)
  const [desktopMenuIsOpen, setDesktopMenuIsOpen] = useState(false)
  const navbarRef = useRef(null)

  function toggleSubmenu() {
    setDesktopMenuIsOpen(!desktopMenuIsOpen)
    setMobileMenu(!mobileMenuIsOpen)
  }

  function closeSubmenu() {
    console.log('CLOSING SUBMENUS')
    setDesktopMenuIsOpen(false)
    setMobileMenu(false)
  }

  // Close submenu if clicked outside the navbar
  useEffect(() => {
    // BUG doesn't work on first page load
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        console.log('clicked outside of NAV', event.target)
        if (desktopMenuIsOpen || mobileMenuIsOpen) closeSubmenu()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <nav
      className={`navbar-container ${onPathWithNav ? 'visible' : ''}`}
      ref={navbarRef}
    >
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
            <Hamburger toggled={mobileMenuIsOpen} toggle={setMobileMenu} />
          </>
        )}

        {/* Desktop */}
        {!isMobile && (
          <>
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
