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
const pathBlackList = ['/', '/auth']

function NavBar() {
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })
  const [isOpen, setOpen] = useState(false)
  const [onRightPath, setOnRightPath] = useState(false)
  const { setMessage } = useContext(MessageContext)
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!pathBlackList.includes(location.pathname)) {
      setOnRightPath(true)
    } else {
      setOnRightPath(false)
    }
  }, [location])

  function createRoom() {
    console.log('Creating a room...')
  }

  async function handleLogOut() {
    const { data } = await axios.post(
      API_URL + '/auth/logout',
      {},
      { withCredentials: true }
    )
    console.log(data)
    setUser(null)
    window.localStorage.removeItem('flixmateToken')
    document.dispatchEvent(new Event('FlixMateDisconnect'))
    setMessage({ type: 'good', message: 'Succesfully logged out!' })
    navigate('/')
  }

  return (
    <div className={`navbar-container ${onRightPath ? 'visible' : ''}`}>
      {/* Mobile NavBar*/}
      {isMobile && (
        <>
          <div className='image-container'>
            <img src={logo} alt='FlixMate Logo' />
          </div>
          <SearchBar />
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </>
      )}

      {/* Mobile NavBar Options*/}
      {isMobile && (
        <div
          className={'option-container mobile' + (isOpen ? ' isActive' : '')}
        >
          <option>Rooms</option>
          <option>Profile</option>
          <option onClick={handleLogOut}>Log Out</option>
        </div>
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
