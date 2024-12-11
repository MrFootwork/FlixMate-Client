import { Link } from 'react-router-dom'
import './NavBar.css'

import React from 'react'

function NavBar() {
	function createRoom() {
		console.log('Creating a room...')
	}

	return (
		<div className='navbar-container'>
			<div>Logo</div>
			<div>SearchBar</div>
			<Link onClick={createRoom}>Rooms</Link>
			<div>Profile</div>
		</div>
	)
}

export default NavBar
