import { Link } from 'react-router-dom'
import './NavBar.css'

import React from 'react'
import SearchBar from './SearchBar'
import NavSelectOption from './NavSelectOption'

function NavBar() {
	function createRoom() {
		console.log('Creating a room...')
	}

	return (
		<div className='navbar-container'>
			{/* Mobile */}
			{/* Desktop */}
			<div>Logo</div>
			<SearchBar />
			<Link onClick={createRoom}>Rooms</Link>
			<NavSelectOption />
		</div>
	)
}

export default NavBar
