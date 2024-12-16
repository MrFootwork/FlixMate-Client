import './NavSelectOption.css'
import profileIcon from '../assets/images/profile.png'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function NavSelectOption({ handleLogOut }) {
  const [optionsAreVisible, setoptionsAreVisible] = useState(false)

  function toggleOptions() {
    setoptionsAreVisible(!optionsAreVisible)
  }

  return (
    <div className='select-container'>
      <button className='profile-button' onClick={toggleOptions}>
        <img src={profileIcon} alt='' />
      </button>

      {optionsAreVisible && (
        <ul
          className='options-container'
          onClick={() => {
            setoptionsAreVisible(!optionsAreVisible)
          }}
        >
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
    </div>
  )
}

export default NavSelectOption
