import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import SearchBar from './SearchBar'
import NavSelectOption from './NavSelectOption'
import { Sling as Hamburger } from 'hamburger-react'

import logo from '../assets/images/logo.png'
import './NavBar.css'

function NavBar() {
	const isMobile = useMediaQuery({ query: '(max-width: 800px)' })

	function createRoom() {
		console.log('Creating a room...')
	}

	const [isOpen, setOpen] = useState(false)

	return (
		<div className='navbar-container'>
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
					<option>Log Out</option>
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
					<NavSelectOption />
				</>
			)}
		</div>
	)
}

export default NavBar
