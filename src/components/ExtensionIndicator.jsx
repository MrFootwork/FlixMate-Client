import React from 'react'
import icon from '../assets/images/extension.png'
import './ExtensionIndicator.css'

function ExtensionIndicator() {
	function openInstallationGuide() {
		console.log('Opening installation guide...')
	}

	return (
		<button
			className='extension-image-container'
			onClick={openInstallationGuide}
		>
			<img src={icon} alt='indicator for existence of extension' />
		</button>
	)
}

export default ExtensionIndicator
