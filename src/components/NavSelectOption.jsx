import './NavSelectOption.css'
import profileIcon from '../assets/images/profile.png'
import { NavLink } from 'react-router-dom'

function NavSelectOption({ handleLogOut, submenuVisible, toggleSubmenu }) {
  // FIXME transition animate coming from above
  return (
    <div className='select-container'>
      <button className='profile-button' onClick={toggleSubmenu}>
        <img src={profileIcon} alt='' />
      </button>

      <ul
        className={`options-container ${submenuVisible ? 'visible' : ''}`}
        onClick={toggleSubmenu}
      >
        <div className='triangle'></div>
        <li>
          <NavLink to='/profile'>Profile</NavLink>
        </li>
        <li>
          <NavLink to='/auth' onClick={handleLogOut}>
            Log Out
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default NavSelectOption
