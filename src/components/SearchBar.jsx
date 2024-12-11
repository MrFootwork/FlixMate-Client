import './SearchBar.css'

import React from 'react'

function SearchBar() {
	return (
		<div className='searchbar-container'>
			<input
				type='text'
				name='movieInput'
				id='movieInput'
				placeholder='🔍 SearchBar'
			/>
		</div>
	)
}

export default SearchBar
