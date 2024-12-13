import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

import React from 'react'

function SearchBar() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    if (e.key == 'Enter') navigate('/search?s=' + e.target.value)
  }

  return (
    <div className='searchbar-container'>
      <input
        type='text'
        name='movieInput'
        id='movieInput'
        placeholder='🔍 SearchBar'
        onKeyDown={handleSubmit}
      />
    </div>
  )
}

export default SearchBar
