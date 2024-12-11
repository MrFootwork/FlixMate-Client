import './NavSelectOption.css'
import profileIcon from '../assets/images/woman.png'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NavSelectOption() {
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
				<div className='options-container'>
					<option>Rooms</option>
					<option>Profile</option>
					<option>Log Out</option>
				</div>
			)}
		</div>
	)
}

export default NavSelectOption
